import * as THREE from './vendor/three.module.js';

const PLANTS_KEY = 'garden-planner-plants-v1';
const PLANS_KEY = 'garden-planner-plans-v1';
const GRID_CELLS_PER_METER = 20;
const viewport = document.querySelector('#gardenPreviewViewport');
const monthRange = document.querySelector('#previewMonthRange');
const monthName = document.querySelector('#previewMonthName');
const bloomCount = document.querySelector('#previewBloomCount');
const planName = document.querySelector('#previewPlanName');
const stagePlanName = document.querySelector('#previewStagePlan');
const emptyMessage = document.querySelector('#previewEmpty');
const resetButton = document.querySelector('#previewReset');
const zoomInButton = document.querySelector('#previewZoomIn');
const zoomOutButton = document.querySelector('#previewZoomOut');

let renderer;
let scene;
let camera;
let gardenGroup;
let groundMaterial;
let orbitTheta = Math.PI / 4;
let orbitPolar = 0.78;
let orbitDistance = 12;
let orbitTarget = new THREE.Vector3();
let gardenBounds = { width: 5, height: 5, maxPlantHeight: 1 };
let currentPlan;
let currentPlants = [];
let activeMonth = new Date().getMonth() + 1;
let pointerPosition = null;
const activePointers = new Map();
let pinchDistance = null;
let lastRenderedPlanSignature = '';

function readStoredValue(key, fallback) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
}

function currentLocale() {
    return document.documentElement.lang === 'en' ? 'en-US' : 'de-DE';
}

function translate(key, values = {}) {
    const strings = document.documentElement.lang === 'en'
        ? {
            noPlants: 'No plants in bloom', onePlant: '1 plant in bloom', manyPlants: '{count} plants in bloom',
        }
        : {
            noPlants: 'Keine Pflanzen blühen', onePlant: '1 Pflanze blüht', manyPlants: '{count} Pflanzen blühen',
        };
    return (strings[key] || key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

function isPlantBlooming(plant, month) {
    if (!plant) return false;
    const start = Number(String(plant.blossomStart).slice(-2));
    const end = Number(String(plant.blossomEnd).slice(-2));
    if (start < 1 || start > 12 || end < 1 || end > 12) return false;
    return start <= end ? month >= start && month <= end : month >= start || month <= end;
}

function decodeSurface(value, cellCount) {
    const surface = new Uint8Array(cellCount);
    if (!value) return surface;
    const packed = atob(value);
    for (let index = 0; index < cellCount; index += 1) {
        surface[index] = packed.charCodeAt(Math.floor(index / 4)) >> ((index % 4) * 2) & 3;
    }
    return surface;
}

function makeGroundTexture(plan) {
    const columns = Math.round(plan.width * GRID_CELLS_PER_METER);
    const rows = Math.round(plan.height * GRID_CELLS_PER_METER);
    const pixels = document.createElement('canvas');
    pixels.width = columns;
    pixels.height = rows;
    const context = pixels.getContext('2d');
    const image = context.createImageData(columns, rows);
    const colors = [[151, 180, 119], [59, 82, 60], [211, 190, 151]];
    const surface = decodeSurface(plan.surface, columns * rows);
    for (let index = 0; index < surface.length; index += 1) {
        const color = colors[surface[index]] || colors[0];
        const offset = index * 4;
        image.data[offset] = color[0];
        image.data[offset + 1] = color[1];
        image.data[offset + 2] = color[2];
        image.data[offset + 3] = 255;
    }
    context.putImageData(image, 0, 0);
    const texture = new THREE.CanvasTexture(pixels);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.center.set(0.5, 0.5);
    texture.rotation = -Math.PI;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return texture;
}

function addStem(group, start, end, radius, material) {
    const startPoint = new THREE.Vector3(...start);
    const endPoint = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(endPoint, startPoint);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.72, radius, direction.length(), 6), material);
    stem.position.copy(startPoint).add(endPoint).multiplyScalar(0.5);
    stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    stem.castShadow = true;
    group.add(stem);
}

function addFlower(group, x, y, z, size, material, centerMaterial) {
    const flower = new THREE.Group();
    flower.position.set(x, y, z);
    const petalGeometry = new THREE.SphereGeometry(size * 0.62, 8, 6);
    for (let index = 0; index < 5; index += 1) {
        const angle = index / 5 * Math.PI * 2;
        const petal = new THREE.Mesh(petalGeometry, material);
        petal.position.set(Math.cos(angle) * size * 0.58, 0, Math.sin(angle) * size * 0.58);
        petal.scale.set(1, 0.54, 0.72);
        flower.add(petal);
    }
    const center = new THREE.Mesh(new THREE.SphereGeometry(size * 0.36, 8, 6), centerMaterial);
    center.position.y = size * 0.12;
    flower.add(center);
    group.add(flower);
}

function createPlant(placement, libraryPlant, plan) {
    const plant = new THREE.Group();
    const height = Math.max(0.12, Number(libraryPlant?.height ?? placement.height) || 0.12);
    const diameter = Math.max(0.08, Number(libraryPlant?.diameter ?? placement.diameter) / 100 || 0.08);
    const sourcePlant = libraryPlant || placement;
    const isWoodyPlant = sourcePlant.isWoodyPlant === true;
    const isEvergreen = sourcePlant.isEvergreen === true;
    const losesWinterLeaves = isWoodyPlant && !isEvergreen && [11, 12, 1, 2].includes(activeMonth);
    const branchMaterial = new THREE.MeshStandardMaterial({
        color: isWoodyPlant ? 0x65513c : 0x536b40,
        roughness: 0.9,
    });
    const flowerStemMaterial = new THREE.MeshStandardMaterial({ color: 0x536b40, roughness: 0.9 });
    const foliageMaterial = new THREE.MeshStandardMaterial({
        color: isWoodyPlant ? 0x294a36 : 0x668653,
        roughness: 0.92,
    });
    const lightFoliageMaterial = new THREE.MeshStandardMaterial({
        color: isWoodyPlant ? 0x365940 : 0x78985e,
        roughness: 0.92,
    });
    const leafGeometry = new THREE.IcosahedronGeometry(1, 1);
    const foliageGroup = new THREE.Group();
    foliageGroup.visible = !losesWinterLeaves;

    if (isWoodyPlant) {
        const shootCount = 4;
        for (let index = 0; index < shootCount; index += 1) {
            const angle = index / shootCount * Math.PI * 2 + 0.22;
            const base = [Math.cos(angle) * diameter * 0.025, 0.012, Math.sin(angle) * diameter * 0.025];
            const shootEnd = [Math.cos(angle) * diameter * 0.22, height * (0.52 + (index % 2) * 0.035), Math.sin(angle) * diameter * 0.22];
            addStem(plant, base, shootEnd, Math.min(diameter * 0.027, 0.032), branchMaterial);

            for (let split = 0; split < 2; split += 1) {
                const side = split === 0 ? -1 : 1;
                const branchStart = [
                    shootEnd[0] * 0.48,
                    height * (0.26 + split * 0.09),
                    shootEnd[2] * 0.48,
                ];
                const branchAngle = angle + side * 0.86;
                const branchEnd = [
                    branchStart[0] + Math.cos(branchAngle) * diameter * 0.2,
                    height * (0.39 + (index % 3) * 0.045),
                    branchStart[2] + Math.sin(branchAngle) * diameter * 0.2,
                ];
                addStem(plant, branchStart, branchEnd, Math.min(diameter * 0.016, 0.02), branchMaterial);

                const leaf = new THREE.Mesh(leafGeometry, (index + split) % 2 ? lightFoliageMaterial : foliageMaterial);
                leaf.position.set(branchEnd[0] + Math.cos(branchAngle) * diameter * 0.055, branchEnd[1] + height * 0.025, branchEnd[2] + Math.sin(branchAngle) * diameter * 0.055);
                leaf.scale.set(diameter * 0.105, height * 0.052, diameter * 0.075);
                leaf.rotation.y = -branchAngle;
                leaf.castShadow = true;
                leaf.receiveShadow = true;
                foliageGroup.add(leaf);
            }
        }
    } else {
        for (let index = 0; index < 4; index += 1) {
            const angle = index / 4 * Math.PI * 2 + 0.2;
            const leafX = Math.cos(angle) * diameter * 0.2;
            const leafZ = Math.sin(angle) * diameter * 0.2;
            addStem(plant, [0, 0.012, 0], [leafX, height * 0.16, leafZ], Math.min(diameter * 0.014, 0.016), flowerStemMaterial);
            const leaf = new THREE.Mesh(leafGeometry, index % 2 ? lightFoliageMaterial : foliageMaterial);
            leaf.position.set(leafX * 0.88, height * 0.15, leafZ * 0.88);
            leaf.scale.set(diameter * 0.135, height * 0.04, diameter * 0.08);
            leaf.rotation.y = -angle;
            leaf.castShadow = true;
            foliageGroup.add(leaf);
        }
    }
    plant.add(foliageGroup);

    const flowerGroup = new THREE.Group();
    flowerGroup.visible = isPlantBlooming(sourcePlant, activeMonth);
    const flowerMaterial = new THREE.MeshStandardMaterial({ color: placement.color, roughness: 0.48 });
    const centerMaterial = new THREE.MeshStandardMaterial({ color: 0xf1c65d, roughness: 0.6 });
    const flowerCount = Math.max(4, Math.min(12, Math.round(diameter * 8)));
    for (let index = 0; index < flowerCount; index += 1) {
        const angle = index / flowerCount * Math.PI * 2;
        const distance = diameter * (0.24 + (index % 3) * 0.035);
        const flowerX = Math.cos(angle) * distance;
        const flowerZ = Math.sin(angle) * distance;
        const flowerY = height * (0.46 + (index % 4) * 0.075);
        const flowerStart = [flowerX * 0.12, 0.015, flowerZ * 0.12];
        addStem(flowerGroup, flowerStart, [flowerX, flowerY, flowerZ], Math.min(diameter * 0.012, 0.014), flowerStemMaterial);
        addFlower(flowerGroup, flowerX, flowerY, flowerZ, Math.max(0.035, Math.min(diameter * 0.085, 0.12)), flowerMaterial, centerMaterial);
    }
    flowerGroup.traverse((object) => {
        if (object.isMesh) object.castShadow = true;
    });
    plant.add(flowerGroup);
    plant.position.set(placement.x - plan.width / 2, 0, plan.height / 2 - placement.y);
    plant.userData.height = height;
    plant.userData.placementId = placement.id;
    plant.userData.flowerGroup = flowerGroup;
    plant.userData.foliageGroup = foliageGroup;
    return plant;
}

function removeGardenObjects() {
    if (!gardenGroup) return;
    scene.remove(gardenGroup);
    gardenGroup.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else if (object.material) object.material.dispose();
    });
    if (groundMaterial?.map) groundMaterial.map.dispose();
    groundMaterial?.dispose();
}

function updatePreviewLabels(plan, plants) {
    const locale = currentLocale();
    const date = new Date(2026, activeMonth - 1, 1);
    monthName.textContent = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
    monthRange.style.setProperty('--month-progress', `${(activeMonth - 1) / 11 * 100}%`);
    monthRange.setAttribute('aria-valuetext', monthName.textContent);
    document.querySelectorAll('[data-preview-month]').forEach((tick) => {
        const month = Number(tick.dataset.previewMonth);
        tick.textContent = new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(2026, month - 1, 1));
    });
    const placements = plan?.placements || [];
    const bloomingCount = placements.reduce((count, placement) => {
        const plant = plants.find((item) => item.id === placement.plantId);
        return count + (isPlantBlooming(plant, activeMonth) ? 1 : 0);
    }, 0);
    bloomCount.textContent = bloomingCount === 0
        ? translate('noPlants')
        : bloomingCount === 1 ? translate('onePlant') : translate('manyPlants', { count: bloomingCount });
    planName.textContent = plan?.name || '';
    stagePlanName.textContent = plan?.name || '';
    emptyMessage.hidden = placements.length > 0;
}

function rebuildGarden() {
    const plansState = readStoredValue(PLANS_KEY, null);
    const plants = readStoredValue(PLANTS_KEY, []);
    currentPlants = Array.isArray(plants) ? plants : [];
    currentPlan = plansState?.plans?.find((plan) => plan.id === plansState.selectedId) || plansState?.plans?.[0] || null;
    updatePreviewLabels(currentPlan, currentPlants);
    if (!renderer || !scene || !currentPlan) return;

    removeGardenObjects();
    const width = Number(currentPlan.width) || 5;
    const depth = Number(currentPlan.height) || 5;
    gardenBounds.width = width;
    gardenBounds.height = depth;
    gardenBounds.maxPlantHeight = Math.max(1, ...currentPlan.placements.map((placement) => {
        const source = currentPlants.find((plant) => plant.id === placement.plantId);
        return Number(source?.height ?? placement.height) || 0;
    }));
    gardenGroup = new THREE.Group();
    const texture = makeGroundTexture(currentPlan);
    groundMaterial = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.96, metalness: 0 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    gardenGroup.add(ground);

    const edgeGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(width, 0.018, depth));
    const edge = new THREE.LineSegments(edgeGeometry, new THREE.LineBasicMaterial({ color: 0x405542, transparent: true, opacity: 0.72 }));
    edge.position.y = 0.008;
    gardenGroup.add(edge);

    for (const placement of currentPlan.placements) {
        const sourcePlant = currentPlants.find((plant) => plant.id === placement.plantId);
        gardenGroup.add(createPlant(placement, sourcePlant, currentPlan));
    }
    scene.add(gardenGroup);
    orbitTarget.set(0, gardenBounds.maxPlantHeight * 0.28, 0);
    const planSignature = `${currentPlan.id}:${width}:${depth}`;
    if (planSignature !== lastRenderedPlanSignature) {
        lastRenderedPlanSignature = planSignature;
        resetOrbit();
    } else {
        setCameraPosition();
    }
}

function updateSeasonalVisibility() {
    updatePreviewLabels(currentPlan, currentPlants);
    gardenGroup?.children.forEach((object) => {
        if (!object.userData.placementId || !object.userData.flowerGroup) return;
        const placement = currentPlan.placements.find((item) => item.id === object.userData.placementId);
        const plant = currentPlants.find((item) => item.id === placement?.plantId);
        object.userData.flowerGroup.visible = isPlantBlooming(plant, activeMonth);
    });
    if (renderer && scene && camera) renderer.render(scene, camera);
}

function setCameraPosition() {
    if (!camera) return;
    const sinPolar = Math.sin(orbitPolar);
    camera.position.set(
        orbitTarget.x + orbitDistance * sinPolar * Math.sin(orbitTheta),
        orbitTarget.y + orbitDistance * Math.cos(orbitPolar),
        orbitTarget.z + orbitDistance * sinPolar * Math.cos(orbitTheta),
    );
    camera.lookAt(orbitTarget);
    renderer.render(scene, camera);
}

function resetOrbit() {
    orbitTheta = Math.PI / 4;
    orbitPolar = 0.78;
    orbitDistance = Math.max(gardenBounds.width, gardenBounds.height) * 1.6 + gardenBounds.maxPlantHeight * 0.55;
    setCameraPosition();
}

function zoomBy(scale) {
    orbitDistance = THREE.MathUtils.clamp(orbitDistance * scale, 2.5, 60);
    setCameraPosition();
}

function pointerDistance() {
    const [first, second] = [...activePointers.values()];
    return Math.hypot(first.x - second.x, first.y - second.y);
}

function resizeRenderer() {
    if (!renderer || !camera) return;
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}

function initializeRenderer() {
    if (renderer) {
        resizeRenderer();
        rebuildGarden();
        return;
    }
    try {
        renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power', preserveDrawingBuffer: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.04;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        viewport.append(renderer.domElement);
        renderer.domElement.setAttribute('aria-hidden', 'true');

        scene = new THREE.Scene();
        scene.background = new THREE.Color('#e7eee4');
        camera = new THREE.PerspectiveCamera(42, 1, 0.1, 180);
        scene.add(new THREE.HemisphereLight(0xf4f7e9, 0x6c795c, 2.15));
        const sunlight = new THREE.DirectionalLight(0xffefcf, 2.4);
        sunlight.position.set(-6, 12, 7);
        sunlight.castShadow = true;
        sunlight.shadow.mapSize.set(2048, 2048);
        sunlight.shadow.camera.left = -15;
        sunlight.shadow.camera.right = 15;
        sunlight.shadow.camera.top = 15;
        sunlight.shadow.camera.bottom = -15;
        sunlight.shadow.bias = -0.0005;
        scene.add(sunlight);
        scene.add(new THREE.AmbientLight(0xd4e1cf, 0.38));

        new ResizeObserver(resizeRenderer).observe(viewport);
        resizeRenderer();
        rebuildGarden();
    } catch {
        viewport.classList.add('preview-unavailable');
        bloomCount.textContent = document.documentElement.lang === 'en'
            ? '3D preview unavailable' : '3D-Vorschau nicht verfügbar';
    }
}

monthRange.value = String(activeMonth);
monthRange.addEventListener('input', () => {
    activeMonth = Number(monthRange.value);
    rebuildGarden();
});

document.querySelector('#previewTab').addEventListener('click', () => {
    requestAnimationFrame(initializeRenderer);
});

resetButton.addEventListener('click', resetOrbit);
zoomInButton.addEventListener('click', () => zoomBy(0.88));
zoomOutButton.addEventListener('click', () => zoomBy(1.14));

viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-orbiting');
    if (activePointers.size === 1) {
        pointerPosition = { id: event.pointerId, x: event.clientX, y: event.clientY };
    } else {
        pointerPosition = null;
        pinchDistance = pointerDistance();
    }
});

viewport.addEventListener('pointermove', (event) => {
    if (!activePointers.has(event.pointerId)) return;
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activePointers.size >= 2) {
        const nextDistance = pointerDistance();
        if (pinchDistance && nextDistance > 0) zoomBy(pinchDistance / nextDistance);
        pinchDistance = nextDistance;
        return;
    }
    if (!pointerPosition || pointerPosition.id !== event.pointerId) return;
    const deltaX = event.clientX - pointerPosition.x;
    const deltaY = event.clientY - pointerPosition.y;
    pointerPosition.x = event.clientX;
    pointerPosition.y = event.clientY;
    orbitTheta -= deltaX * 0.008;
    orbitPolar = THREE.MathUtils.clamp(orbitPolar + deltaY * 0.006, 0.12, 1.48);
    setCameraPosition();
});

function stopOrbit(event) {
    activePointers.delete(event.pointerId);
    if (activePointers.size === 1) {
        const [id, point] = activePointers.entries().next().value;
        pointerPosition = { id, ...point };
        pinchDistance = null;
    } else if (activePointers.size === 0) {
        pointerPosition = null;
        pinchDistance = null;
        viewport.classList.remove('is-orbiting');
    } else {
        pinchDistance = pointerDistance();
    }
}

viewport.addEventListener('pointerup', stopOrbit);
viewport.addEventListener('pointercancel', stopOrbit);
viewport.addEventListener('wheel', (event) => {
    event.preventDefault();
    zoomBy(Math.exp(event.deltaY * 0.001));
}, { passive: false });

viewport.addEventListener('keydown', (event) => {
    const keyMoves = {
        ArrowLeft: [-0.12, 0], ArrowRight: [0.12, 0], ArrowUp: [0, -0.1], ArrowDown: [0, 0.1],
    };
    if (keyMoves[event.key]) {
        event.preventDefault();
        orbitTheta += keyMoves[event.key][0];
        orbitPolar = THREE.MathUtils.clamp(orbitPolar + keyMoves[event.key][1], 0.12, 1.48);
        setCameraPosition();
    } else if (event.key === '+' || event.key === '=') {
        zoomBy(0.9);
    } else if (event.key === '-') {
        zoomBy(1.1);
    }
});

for (const eventName of ['plans-updated', 'plants-updated', 'language-updated', 'data-restored']) {
    window.addEventListener(`garden-planner:${eventName}`, rebuildGarden);
}

window.addEventListener('storage', rebuildGarden);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => updatePreviewLabels(null, []), { once: true });
} else {
    updatePreviewLabels(null, []);
}