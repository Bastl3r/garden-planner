const STORAGE_KEY = 'garden-planner-plants-v1';
const LANGUAGE_KEY = 'garden-planner-language';
const GARDEN_PLANS_STORAGE_KEY = 'garden-planner-plans-v1';
const BACKUP_FORMAT = 'garden-planner-backup';
const BACKUP_VERSION = 1;
const GRID_CELLS_PER_METER = 20;
const MAX_PLAN_DIMENSION = 20;
const translations = {
    de: {
        brandLabel: 'Garden Planner Startseite', savedOnDevice: 'Lokal auf diesem Gerät gespeichert', gardenViews: 'Gartenansichten',
        plantLibrary: 'Pflanzenübersicht', inSeason: 'Saison', seasonOverview: 'Saisonübersicht', yourGarden: 'DEIN GARTEN', newAddition: 'NEUZUGANG',
        addPlant: 'Pflanze hinzufügen', editFormTitle: 'Pflanze bearbeiten', name: 'Name', namePlaceholder: 'z. B. Echter Lavendel', diameter: 'Durchmesser', height: 'Höhe',
        plantTraits: 'Merkmale', woodyPlant: 'Gehölz', evergreen: 'Immergrün', herbaceousPlant: 'Krautpflanze',
        blossomColor: 'Blütenfarbe', blossomBegins: 'Blüte beginnt', blossomEnds: 'Blüte endet', cancel: 'Abbrechen', growingList: 'PFLANZENLISTE',
        yourPlants: 'Deine Pflanzen', plant: 'Pflanze', size: 'Größe', blossom: 'Blüte', color: 'Farbe', actions: 'Aktionen',
        emptyPlants: 'Noch keine Pflanzen in deiner Liste.', gardenRightNow: 'DER GARTEN, JETZT', blossomWatch: 'BLÜTENKALENDER',
        floweringThisMonth: 'Blüte in diesem Monat', monthPlaceholder: 'Monat auswählen', exportBackup: 'Exportieren', importBackup: 'Importieren',
        exportSuccess: 'Sicherung wurde heruntergeladen.', importSuccess: 'Sicherung wurde importiert.', importConfirm: 'Der Import ersetzt deine gespeicherten Pflanzen, Gartenpläne und Sprache. Fortfahren?',
        importError: 'Diese Sicherungsdatei ist ungültig oder kann nicht gelesen werden.', appNameFooter: 'GARDEN PLANNER', storageNote: 'Deine Sammlung bleibt in diesem Browser.',
        language: 'Sprache', selectLanguage: 'Sprache auswählen', editPlant: '{name} bearbeiten', deletePlant: '{name} löschen',
        deleteConfirm: '{name} aus deiner Pflanzenliste löschen?', saveChanges: 'Änderungen speichern', updateDetails: 'DETAILS ÄNDERN',
        couldNotSave: 'Speichern nicht möglich. Der Browserspeicher ist möglicherweise voll.', blossomDateError: 'Das Blütenende muss im oder nach dem Startmonat liegen.',
        plantCountOne: 'Pflanze', plantCountMany: 'Pflanzen', plantsInLibrary: 'Pflanzen in deiner Sammlung', floweringCount: 'Blühen in diesem Monat',
        nextPrefix: 'Als Nächstes: {name}', noUpcoming: 'Keine bevorstehenden Blütentermine', nothingFlowering: 'Für diesen Monat ist keine Blüte eingetragen.',
        metersTall: '{height} m hoch',
        gardenPlanTab: 'Gartenplan', planEyebrow: 'GARTENENTWURF', gardenPlanTitle: 'Gartenplan', choosePlan: 'Plan auswählen',
        newPlan: 'Neuer Plan', deletePlan: 'Plan löschen', planEditor: 'Gartenplan-Editor', planName: 'Planname', planWidth: 'Breite', planHeight: 'Höhe',
        drawingTools: 'Zeichenwerkzeuge', drawOutlines: 'Umrisse zeichnen', pencilTool: 'Stift', fillPath: 'Fußweg füllen', paintBucketTool: 'Füllung',
        eraseDrawing: 'Umrisse und Fußwege entfernen', eraserTool: 'Radierer',
        placePlants: 'Pflanzen platzieren', placePlantTool: 'Pflanzen', selectPlant: 'Pflanze wählen', planCanvasLabel: 'Draufsicht des Gartenplans',
        placedPlants: 'IM PLAN', plantedTableTitle: 'Gepflanzte Pflanzen', position: 'Position', noPlacedPlants: 'Noch keine Pflanzen platziert.',
        defaultPlanName: 'Mein Garten', newPlanName: 'Garten {number}',
        confirmDeletePlan: '„{name}“ und alle zugehörigen Zeichnungen und Pflanzen löschen?', planSaveError: 'Der Gartenplan konnte nicht gespeichert werden.',
        planSizeError: 'Breite und Höhe müssen zwischen 1 und 20 Metern liegen.', noPlantsInLibrary: 'Keine Pflanzen in der Pflanzenübersicht.',
        choosePlantPlaceholder: 'Pflanze auswählen', selectPlacedPlant: '{name} auf dem Plan auswählen', removePlacedPlant: '{name} aus dem Plan entfernen',
        planPosition: '{x} m, {y} m',
        gardenPreviewTab: 'Gartenvorschau', gardenPreviewEyebrow: 'DREIDIMENSIONALE ANSICHT', gardenPreviewTitle: 'Gartenvorschau',
        previewMonth: 'VORSCHAU-MONAT', previewSceneLabel: '3D-Gartenvorschau', previewCanvasLabel: 'Drehbare 3D-Gartenansicht',
        resetPreview: 'Ansicht zurücksetzen', zoomIn: 'Vergrößern', zoomOut: 'Verkleinern', previewViewControls: 'Ansichtssteuerung',
        previewNoPlants: 'Keine Pflanzen in diesem Plan platziert.',
        previewBloomNone: 'Keine Pflanzen blühen', previewBloomOne: '1 Pflanze blüht', previewBloomMany: '{count} Pflanzen blühen',
    },
    en: {
        brandLabel: 'Garden Planner home', savedOnDevice: 'Saved on this device', gardenViews: 'Garden views',
        plantLibrary: 'Plant library', inSeason: 'In season', seasonOverview: 'In season', yourGarden: 'YOUR GARDEN', newAddition: 'NEW ADDITION',
        addPlant: 'Add a plant', editFormTitle: 'Edit plant', name: 'Name', namePlaceholder: 'e.g. French lavender', diameter: 'Diameter', height: 'Height',
        plantTraits: 'Traits', woodyPlant: 'Woody plant', evergreen: 'Evergreen', herbaceousPlant: 'Herbaceous',
        blossomColor: 'Blossom color', blossomBegins: 'Blossom begins', blossomEnds: 'Blossom ends', cancel: 'Cancel', growingList: 'GROWING LIST',
        yourPlants: 'Your plants', plant: 'Plant', size: 'Size', blossom: 'Blossom', color: 'Color', actions: 'Actions',
        emptyPlants: 'No plants in your library yet.', gardenRightNow: 'THE GARDEN, RIGHT NOW', blossomWatch: 'BLOSSOM WATCH',
        floweringThisMonth: 'Flowering this month', monthPlaceholder: 'Choose month', exportBackup: 'Export', importBackup: 'Import',
        exportSuccess: 'Backup downloaded.', importSuccess: 'Backup imported.', importConfirm: 'Importing replaces your saved plants, garden plans, and language. Continue?',
        importError: 'This backup file is invalid or could not be read.', appNameFooter: 'GARDEN PLANNER', storageNote: 'Your collection stays in this browser.',
        language: 'Language', selectLanguage: 'Choose language', editPlant: 'Edit {name}', deletePlant: 'Delete {name}',
        deleteConfirm: 'Delete {name} from your library?', saveChanges: 'Save changes', updateDetails: 'UPDATE DETAILS',
        couldNotSave: 'Could not save. Browser storage may be full.', blossomDateError: 'Blossom end must be in or after the start month.',
        plantCountOne: 'plant', plantCountMany: 'plants', plantsInLibrary: 'Plants in your library', floweringCount: 'Flowering this month',
        nextPrefix: 'Next: {name}', noUpcoming: 'No upcoming blossom dates', nothingFlowering: 'Nothing is marked as flowering this month.',
        metersTall: '{height} m tall',
        gardenPlanTab: 'Garden plan', planEyebrow: 'GARDEN DESIGN', gardenPlanTitle: 'Garden plan', choosePlan: 'Choose plan',
        newPlan: 'New plan', deletePlan: 'Delete plan', planEditor: 'Garden plan editor', planName: 'Plan name', planWidth: 'Width', planHeight: 'Height',
        drawingTools: 'Drawing tools', drawOutlines: 'Draw outlines', pencilTool: 'Pencil', fillPath: 'Fill footpath', paintBucketTool: 'Paint can',
        eraseDrawing: 'Erase outlines and footpaths', eraserTool: 'Eraser',
        placePlants: 'Place plants', placePlantTool: 'Plants', selectPlant: 'Select plant', planCanvasLabel: 'Bird’s-eye garden plan',
        placedPlants: 'ON THIS PLAN', plantedTableTitle: 'Planted plants', position: 'Position', noPlacedPlants: 'No plants placed yet.',
        defaultPlanName: 'My garden', newPlanName: 'Garden {number}',
        confirmDeletePlan: 'Delete “{name}” and all its drawings and plants?', planSaveError: 'Could not save this garden plan.',
        planSizeError: 'Width and height must be between 1 and 20 meters.', noPlantsInLibrary: 'No plants in the plant library.',
        choosePlantPlaceholder: 'Choose a plant', selectPlacedPlant: 'Select {name} on the plan', removePlacedPlant: 'Remove {name} from the plan',
        planPosition: '{x} m, {y} m',
        gardenPreviewTab: 'Garden preview', gardenPreviewEyebrow: 'THREE-DIMENSIONAL VIEW', gardenPreviewTitle: 'Garden preview',
        previewMonth: 'PREVIEW MONTH', previewSceneLabel: '3D garden preview', previewCanvasLabel: 'Rotatable 3D garden view',
        resetPreview: 'Reset view', zoomIn: 'Zoom in', zoomOut: 'Zoom out', previewViewControls: 'View controls',
        previewNoPlants: 'No plants placed in this plan.',
        previewBloomNone: 'No plants in bloom', previewBloomOne: '1 plant in bloom', previewBloomMany: '{count} plants in bloom',
    },
};

function readLanguage() {
    try {
        const saved = localStorage.getItem(LANGUAGE_KEY);
        return saved === 'en' || saved === 'de' ? saved : 'de';
    } catch {
        return 'de';
    }
}

let currentLanguage = readLanguage();

const form = document.querySelector('#plantForm');
const rows = document.querySelector('#plantRows');
const emptyState = document.querySelector('#emptyState');
const formTitle = document.querySelector('#formTitle');
const formEyebrow = document.querySelector('#formEyebrow');
const saveButton = document.querySelector('#savePlant');
const cancelButton = document.querySelector('#cancelEdit');
const formMessage = document.querySelector('#formMessage');
const colorInput = document.querySelector('#color');
const languageSelect = document.querySelector('#languageSelect');
const backupFileInput = document.querySelector('#backupFile');
const backupMessage = document.querySelector('#backupMessage');
const gardenPlanSelect = document.querySelector('#gardenPlanSelect');
const gardenPlanName = document.querySelector('#gardenPlanName');
const gardenPlanWidth = document.querySelector('#gardenPlanWidth');
const gardenPlanHeight = document.querySelector('#gardenPlanHeight');
const planPlantSelect = document.querySelector('#planPlantSelect');
const planCanvas = document.querySelector('#planCanvas');
const planContext = planCanvas.getContext('2d', { willReadFrequently: true });
const planMessage = document.querySelector('#planMessage');
const plantedRows = document.querySelector('#plantedRows');
let gardenState = readGardenState();
let activePlanTool = 'pencil';
let selectedPlacementId = null;
let drawingPointer = null;
let lastDrawPoint = null;
let drawingSurface = null;
let planRenderFrame = null;
let plants = readPlants();
let editingId = null;

function t(key, values = {}) {
    return (translations[currentLanguage][key] || key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

function formatNumber(value, maximumFractionDigits = 2) {
    return new Intl.NumberFormat(currentLanguage === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits }).format(value);
}

function notifyGardenUpdate(type) {
    window.dispatchEvent(new Event(`garden-planner:${type}`));
}

function applyTranslations() {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
        element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
        element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
    });
    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
        element.title = t(element.dataset.i18nTitle);
    });
    document.querySelector('#pageDescription').content = currentLanguage === 'de'
        ? 'Ein lokaler Gartenplaner zur Verwaltung deiner Pflanzen.'
        : 'A local-first garden planner for keeping track of your plants.';
    languageSelect.value = currentLanguage;
    updateMonthOptions();
    updateFormMode();
    renderPlants();
}

function updateMonthOptions() {
    const locale = currentLanguage === 'de' ? 'de-DE' : 'en-US';
    const formatter = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' });
    for (const select of [form.elements.blossomStart, form.elements.blossomEnd]) {
        const selectedMonth = select.value;
        select.replaceChildren(new Option(t('monthPlaceholder'), ''));
        for (let month = 1; month <= 12; month += 1) {
            const monthValue = String(month).padStart(2, '0');
            select.add(new Option(formatter.format(new Date(Date.UTC(2000, month - 1, 1))), monthValue));
        }
        select.value = selectedMonth;
    }
}

function updateFormMode() {
    formTitle.textContent = t(editingId ? 'editFormTitle' : 'addPlant');
    formEyebrow.textContent = t(editingId ? 'updateDetails' : 'newAddition');
    saveButton.querySelector('.button-label').textContent = t(editingId ? 'saveChanges' : 'addPlant');
    cancelButton.classList.toggle('is-hidden', !editingId);
}

function readPlants() {
    try {
        const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return Array.isArray(value) ? value.map((plant) => ({
            ...plant,
            blossomStart: normalizeMonth(plant?.blossomStart),
            blossomEnd: normalizeMonth(plant?.blossomEnd),
            isWoodyPlant: plant?.isWoodyPlant === true,
            isEvergreen: plant?.isEvergreen === true,
        })).filter(isPlant) : [];
    } catch {
        return [];
    }
}

function normalizeMonth(value) {
    return typeof value === 'string' ? value.match(/^(?:\d{4}-)?(0[1-9]|1[0-2])$/)?.[1] || '' : '';
}

function createId() {
    return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createGardenPlan(name = t('defaultPlanName')) {
    return { id: createId(), name, width: 5, height: 5, surface: '', placements: [] };
}

function gardenGridSize(plan) {
    return {
        columns: Math.round(plan.width * GRID_CELLS_PER_METER),
        rows: Math.round(plan.height * GRID_CELLS_PER_METER),
    };
}

function unpackSurface(encoded, cellCount) {
    const surface = new Uint8Array(cellCount);
    if (!encoded) return surface;
    const binary = atob(encoded);
    if (binary.length !== Math.ceil(cellCount / 4)) throw new Error('Invalid plan surface');
    for (let index = 0; index < cellCount; index += 1) {
        const value = binary.charCodeAt(Math.floor(index / 4)) >> ((index % 4) * 2) & 3;
        if (value > 2) throw new Error('Invalid plan surface cell');
        surface[index] = value;
    }
    return surface;
}

function packSurface(surface) {
    const packed = new Uint8Array(Math.ceil(surface.length / 4));
    for (let index = 0; index < surface.length; index += 1) {
        packed[Math.floor(index / 4)] |= surface[index] << ((index % 4) * 2);
    }
    let binary = '';
    for (let offset = 0; offset < packed.length; offset += 0x8000) {
        binary += String.fromCharCode(...packed.subarray(offset, offset + 0x8000));
    }
    return btoa(binary);
}

function normalizeGardenPlan(value) {
    const width = Number(value?.width);
    const height = Number(value?.height);
    if (!value || typeof value.id !== 'string' || !value.id || typeof value.name !== 'string'
        || !value.name.trim() || !Number.isFinite(width) || !Number.isFinite(height)
        || width < 1 || height < 1 || width > MAX_PLAN_DIMENSION || height > MAX_PLAN_DIMENSION
        || Math.round(width * GRID_CELLS_PER_METER) * Math.round(height * GRID_CELLS_PER_METER) > 160000
        || typeof value.surface !== 'string' || !Array.isArray(value.placements)) {
        throw new Error('Invalid garden plan');
    }
    const { columns, rows: gridRows } = gardenGridSize({ width, height });
    unpackSurface(value.surface, columns * gridRows);
    const placements = value.placements.map((placement) => {
        const normalized = {
            id: placement?.id,
            plantId: placement?.plantId,
            name: typeof placement?.name === 'string' ? placement.name.trim() : '',
            diameter: Number(placement?.diameter),
            height: Number(placement?.height),
            color: placement?.color,
            isWoodyPlant: placement?.isWoodyPlant === true,
            isEvergreen: placement?.isEvergreen === true,
            x: Number(placement?.x),
            y: Number(placement?.y),
        };
        if (typeof normalized.id !== 'string' || !normalized.id || typeof normalized.plantId !== 'string'
            || !normalized.name || !Number.isFinite(normalized.diameter) || normalized.diameter < 0
            || !Number.isFinite(normalized.height) || normalized.height < 0 || !/^#[\da-f]{6}$/i.test(normalized.color)
            || !Number.isFinite(normalized.x) || !Number.isFinite(normalized.y)
            || normalized.x < 0 || normalized.x > width || normalized.y < 0 || normalized.y > height) {
            throw new Error('Invalid plant placement');
        }
        return normalized;
    });
    if (new Set(placements.map((placement) => placement.id)).size !== placements.length) {
        throw new Error('Duplicate placement IDs');
    }
    return { id: value.id, name: value.name.trim(), width, height, surface: value.surface, placements };
}

function normalizeGardenState(value) {
    if (!value || !Array.isArray(value.plans) || !value.plans.length) throw new Error('Invalid garden plans');
    const plans = value.plans.map(normalizeGardenPlan);
    if (new Set(plans.map((plan) => plan.id)).size !== plans.length) throw new Error('Duplicate plan IDs');
    return {
        selectedId: plans.some((plan) => plan.id === value.selectedId) ? value.selectedId : plans[0].id,
        plans,
    };
}

function readGardenState() {
    try {
        const saved = localStorage.getItem(GARDEN_PLANS_STORAGE_KEY);
        return saved ? normalizeGardenState(JSON.parse(saved)) : (() => {
            const plan = createGardenPlan();
            return { selectedId: plan.id, plans: [plan] };
        })();
    } catch {
        const plan = createGardenPlan();
        return { selectedId: plan.id, plans: [plan] };
    }
}

function persistGardenState() {
    try {
        localStorage.setItem(GARDEN_PLANS_STORAGE_KEY, JSON.stringify(gardenState));
        planMessage.textContent = '';
        notifyGardenUpdate('plans-updated');
        return true;
    } catch {
        planMessage.textContent = t('planSaveError');
        return false;
    }
}

function getCurrentGardenPlan() {
    return gardenState.plans.find((plan) => plan.id === gardenState.selectedId) || gardenState.plans[0];
}

function renderGardenPlan() {
    const plan = getCurrentGardenPlan();
    const { columns, rows: gridRows } = gardenGridSize(plan);
    gardenPlanSelect.replaceChildren(...gardenState.plans.map((item) => new Option(item.name, item.id)));
    gardenPlanSelect.value = plan.id;
    gardenPlanName.value = plan.name;
    gardenPlanWidth.value = String(plan.width);
    gardenPlanHeight.value = String(plan.height);
    document.querySelector('#deleteGardenPlan').disabled = gardenState.plans.length < 2;

    const previousPlantId = planPlantSelect.value;
    planPlantSelect.replaceChildren(new Option(t(plants.length ? 'choosePlantPlaceholder' : 'noPlantsInLibrary'), ''));
    plants.forEach((plant) => planPlantSelect.add(new Option(plant.name, plant.id)));
    planPlantSelect.value = plants.some((plant) => plant.id === previousPlantId) ? previousPlantId : '';

    document.querySelectorAll('[data-plan-tool]').forEach((button) => {
        const active = button.dataset.planTool === activePlanTool;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
        if (button.dataset.planTool === 'plant') button.disabled = plants.length === 0;
    });
    planCanvas.className = `plan-canvas tool-${activePlanTool}`;
    planCanvas.width = columns;
    planCanvas.height = gridRows;
    drawPlanCanvas(plan, columns, gridRows);
    renderPlantedRows(plan);
}

function drawPlanCanvas(plan, columns, gridRows, drawingSurfaceOverride = null) {
    const surface = drawingSurfaceOverride || unpackSurface(plan.surface, columns * gridRows);
    const pixels = planContext.createImageData(columns, gridRows);
    const surfaceColors = [[153, 179, 124, 255], [56, 76, 57, 255], [211, 190, 151, 255]];
    for (let index = 0; index < surface.length; index += 1) {
        const offset = index * 4;
        const color = surfaceColors[surface[index]];
        pixels.data[offset] = color[0];
        pixels.data[offset + 1] = color[1];
        pixels.data[offset + 2] = color[2];
        pixels.data[offset + 3] = color[3];
    }
    planContext.putImageData(pixels, 0, 0);

    planContext.save();
    planContext.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    planContext.lineWidth = 0.55;
    for (let column = GRID_CELLS_PER_METER; column < columns; column += GRID_CELLS_PER_METER) {
        planContext.beginPath();
        planContext.moveTo(column, 0);
        planContext.lineTo(column, gridRows);
        planContext.stroke();
    }
    for (let row = GRID_CELLS_PER_METER; row < gridRows; row += GRID_CELLS_PER_METER) {
        planContext.beginPath();
        planContext.moveTo(0, row);
        planContext.lineTo(columns, row);
        planContext.stroke();
    }

    for (const placement of plan.placements) {
        const centerX = placement.x * GRID_CELLS_PER_METER;
        const centerY = placement.y * GRID_CELLS_PER_METER;
        const radius = Math.max(placement.diameter / 100 * GRID_CELLS_PER_METER / 2, 1.5);
        planContext.beginPath();
        planContext.arc(centerX, centerY, radius, 0, Math.PI * 2);
        planContext.fillStyle = placement.color;
        planContext.fill();
        planContext.lineWidth = Math.max(0.8, radius * 0.08);
        planContext.strokeStyle = '#fffefa';
        planContext.stroke();
        if (placement.id === selectedPlacementId) {
            planContext.beginPath();
            planContext.arc(centerX, centerY, radius + 2.2, 0, Math.PI * 2);
            planContext.lineWidth = 1.4;
            planContext.strokeStyle = '#111';
            planContext.stroke();
        }
    }
    planContext.restore();
}

function renderPlantedRows(plan) {
    plantedRows.innerHTML = plan.placements.map((placement) => `
        <tr class="${placement.id === selectedPlacementId ? 'is-selected' : ''}">
            <td><button class="planted-select" type="button" data-select-placement="${placement.id}" aria-pressed="${placement.id === selectedPlacementId}" aria-label="${t('selectPlacedPlant', { name: escapeHtml(placement.name) })}"><i style="background:${placement.color}"></i><span>${escapeHtml(placement.name)}</span></button></td>
            <td>${t('planPosition', { x: formatNumber(placement.x), y: formatNumber(placement.y) })}</td>
            <td><button class="icon-button delete" type="button" data-remove-placement="${placement.id}" aria-label="${t('removePlacedPlant', { name: escapeHtml(placement.name) })}" title="${t('removePlacedPlant', { name: escapeHtml(placement.name) })}">×</button></td>
        </tr>`).join('');
    document.querySelector('#plantedCount').textContent = String(plan.placements.length);
    document.querySelector('#plantedEmpty').hidden = plan.placements.length > 0;
}

function schedulePlanRender() {
    if (planRenderFrame !== null) return;
    planRenderFrame = requestAnimationFrame(() => {
        planRenderFrame = null;
        const plan = getCurrentGardenPlan();
        const { columns, rows: gridRows } = gardenGridSize(plan);
        drawPlanCanvas(plan, columns, gridRows, drawingSurface);
    });
}

function pointOnPlan(event) {
    const plan = getCurrentGardenPlan();
    const { columns, rows: gridRows } = gardenGridSize(plan);
    const bounds = planCanvas.getBoundingClientRect();
    return {
        column: Math.max(0, Math.min(columns - 1, Math.floor((event.clientX - bounds.left) / bounds.width * columns))),
        row: Math.max(0, Math.min(gridRows - 1, Math.floor((event.clientY - bounds.top) / bounds.height * gridRows))),
    };
}

function drawOutlineSegment(plan, surface, start, end, surfaceValue = 1) {
    const { columns, rows: gridRows } = gardenGridSize(plan);
    const distance = Math.max(Math.abs(end.column - start.column), Math.abs(end.row - start.row));
    const steps = Math.max(1, distance * 2);
    for (let step = 0; step <= steps; step += 1) {
        const ratio = step / steps;
        const centerX = Math.round(start.column + (end.column - start.column) * ratio);
        const centerY = Math.round(start.row + (end.row - start.row) * ratio);
        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
            for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
                const column = centerX + offsetX;
                const row = centerY + offsetY;
                if (column >= 0 && column < columns && row >= 0 && row < gridRows) {
                    surface[cellIndex(column, row, columns)] = surfaceValue;
                }
            }
        }
    }
}

function cellIndex(column, row, columns) {
    return row * columns + column;
}

function fillFootpath(plan, column, row) {
    const { columns, rows: gridRows } = gardenGridSize(plan);
    const surface = unpackSurface(plan.surface, columns * gridRows);
    const startIndex = cellIndex(column, row, columns);
    const originalValue = surface[startIndex];
    if (originalValue === 1) return false;
    const replacementValue = originalValue === 0 ? 2 : 0;
    const queue = new Int32Array(surface.length);
    let head = 0;
    let tail = 0;
    queue[tail++] = startIndex;
    surface[startIndex] = replacementValue;
    while (head < tail) {
        const index = queue[head++];
        const neighbors = [index - columns, index + columns, index - 1, index + 1];
        for (let direction = 0; direction < neighbors.length; direction += 1) {
            const neighbor = neighbors[direction];
            if (neighbor < 0 || neighbor >= surface.length
                || direction === 2 && index % columns === 0
                || direction === 3 && index % columns === columns - 1
                || surface[neighbor] !== originalValue) continue;
            surface[neighbor] = replacementValue;
            queue[tail++] = neighbor;
        }
    }
    plan.surface = packSurface(surface);
    return true;
}

function saveCurrentGardenPlan() {
    if (!persistGardenState()) return false;
    renderGardenPlan();
    return true;
}

function validateBackup(backup) {
    if (backup?.format !== BACKUP_FORMAT || backup.version !== BACKUP_VERSION
        || !Array.isArray(backup.data?.plants) || !['de', 'en'].includes(backup.data.language)) {
        throw new Error('Unsupported backup format');
    }

    const importedPlants = backup.data.plants.map((plant) => {
        const diameter = typeof plant?.diameter === 'number' || typeof plant?.diameter === 'string' && plant.diameter.trim()
            ? Number(plant.diameter) : Number.NaN;
        const height = typeof plant?.height === 'number' || typeof plant?.height === 'string' && plant.height.trim()
            ? Number(plant.height) : Number.NaN;
        const normalized = {
            id: plant?.id,
            name: typeof plant?.name === 'string' ? plant.name.trim() : '',
            diameter,
            height,
            color: plant?.color,
            blossomStart: normalizeMonth(plant?.blossomStart),
            blossomEnd: normalizeMonth(plant?.blossomEnd),
            isWoodyPlant: plant?.isWoodyPlant === true,
            isEvergreen: plant?.isEvergreen === true,
        };
        if (!normalized.id || !Number.isFinite(diameter) || diameter < 0 || !Number.isFinite(height) || height < 0
            || !normalized.name || !isPlant(normalized)) {
            throw new Error('Invalid plant record');
        }
        return normalized;
    });
    if (new Set(importedPlants.map((plant) => plant.id)).size !== importedPlants.length) {
        throw new Error('Duplicate plant IDs');
    }

    const importedGarden = backup.data.gardenPlans
        ? normalizeGardenState(backup.data.gardenPlans)
        : (() => {
            const plan = createGardenPlan();
            return { selectedId: plan.id, plans: [plan] };
        })();
    return { plants: importedPlants, language: backup.data.language, gardenPlans: importedGarden };
}

function showBackupMessage(key) {
    backupMessage.textContent = t(key);
    backupMessage.hidden = false;
}

function clearBackupMessage() {
    backupMessage.textContent = '';
    backupMessage.hidden = true;
}

function exportBackup() {
    const backup = {
        format: BACKUP_FORMAT,
        version: BACKUP_VERSION,
        exportedAt: new Date().toISOString(),
        data: { plants, language: currentLanguage, gardenPlans: gardenState },
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `garden-planner-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showBackupMessage('exportSuccess');
}

async function importBackup(file) {
    if (!file || !window.confirm(t('importConfirm'))) return;
    try {
        const parsed = JSON.parse(await file.text());
        const imported = validateBackup(parsed);
        const oldPlants = localStorage.getItem(STORAGE_KEY);
        const oldLanguage = localStorage.getItem(LANGUAGE_KEY);
        const oldGardenPlans = localStorage.getItem(GARDEN_PLANS_STORAGE_KEY);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(imported.plants));
            localStorage.setItem(LANGUAGE_KEY, imported.language);
            localStorage.setItem(GARDEN_PLANS_STORAGE_KEY, JSON.stringify(imported.gardenPlans));
        } catch (error) {
            try {
                oldPlants === null ? localStorage.removeItem(STORAGE_KEY) : localStorage.setItem(STORAGE_KEY, oldPlants);
                oldLanguage === null ? localStorage.removeItem(LANGUAGE_KEY) : localStorage.setItem(LANGUAGE_KEY, oldLanguage);
                oldGardenPlans === null ? localStorage.removeItem(GARDEN_PLANS_STORAGE_KEY) : localStorage.setItem(GARDEN_PLANS_STORAGE_KEY, oldGardenPlans);
            } catch {
            }
            throw error;
        }
        plants = imported.plants;
        currentLanguage = imported.language;
        gardenState = imported.gardenPlans;
        editingId = null;
        form.reset();
        colorInput.value = '#d66e59';
        document.querySelector('#colorValue').textContent = colorInput.value.toUpperCase();
        formMessage.textContent = '';
        applyTranslations();
        notifyGardenUpdate('data-restored');
        showBackupMessage('importSuccess');
    } catch {
        showBackupMessage('importError');
    }
}

function isPlant(value) {
    return value && typeof value.id === 'string' && typeof value.name === 'string'
        && Number.isFinite(Number(value.diameter)) && Number.isFinite(Number(value.height))
        && typeof value.isWoodyPlant === 'boolean' && typeof value.isEvergreen === 'boolean'
        && /^#[\da-f]{6}$/i.test(value.color)
        && /^(?:0[1-9]|1[0-2])$/.test(value.blossomStart) && /^(?:0[1-9]|1[0-2])$/.test(value.blossomEnd);
}

function persistPlants() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
        formMessage.textContent = '';
        notifyGardenUpdate('plants-updated');
        return true;
    } catch {
        formMessage.textContent = t('couldNotSave');
        return false;
    }
}

function displayMonth(value) {
    const month = Number(value.slice(-2));
    return new Intl.DateTimeFormat(currentLanguage === 'de' ? 'de-DE' : 'en-US', { month: 'short', timeZone: 'UTC' })
        .format(new Date(Date.UTC(2000, month - 1, 1)));
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[character]);
}

function renderPlants() {
    const sorted = [...plants].sort((first, second) => first.name.localeCompare(second.name));
    rows.innerHTML = sorted.map((plant) => `
    <tr>
      <td><span class="plant-name-cell"><i class="plant-dot" style="background:${plant.color}"></i>${escapeHtml(plant.name)}</span></td>
    <td class="size-cell">${formatNumber(Number(plant.diameter), 1)} cm &times; ${formatNumber(Number(plant.height))} m</td>
      <td>${displayMonth(plant.blossomStart)} &ndash; ${displayMonth(plant.blossomEnd)}</td>
      <td><span class="color-chip"><i style="background:${plant.color}"></i>${plant.color}</span></td>
    <td><span class="trait-list">${plant.isWoodyPlant ? `<span class="trait-chip">${t('woodyPlant')}</span>` : ''}${plant.isEvergreen ? `<span class="trait-chip">${t('evergreen')}</span>` : ''}${!plant.isWoodyPlant && !plant.isEvergreen ? `<span class="trait-none">${t('herbaceousPlant')}</span>` : ''}</span></td>
      <td><span class="row-actions">
        <button class="icon-button" type="button" data-edit="${plant.id}" aria-label="${t('editPlant', { name: escapeHtml(plant.name) })}" title="${t('editPlant', { name: escapeHtml(plant.name) })}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>
        </button>
        <button class="icon-button delete" type="button" data-delete="${plant.id}" aria-label="${t('deletePlant', { name: escapeHtml(plant.name) })}" title="${t('deletePlant', { name: escapeHtml(plant.name) })}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/></svg>
        </button>
      </span></td>
    </tr>`).join('');

    const count = plants.length;
    document.querySelector('#plantCount').textContent = `${count} ${t(count === 1 ? 'plantCountOne' : 'plantCountMany')}`;
    document.querySelector('#collectionCount').textContent = String(count);
    emptyState.classList.toggle('is-visible', count === 0);
    renderSeason();
    renderGardenPlan();
}

function renderSeason() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const flowering = plants.filter((plant) => {
        const start = Number(plant.blossomStart);
        const end = Number(plant.blossomEnd);
        return start <= end ? month >= start && month <= end : month >= start || month <= end;
    });
    const next = plants.map((plant) => ({
        ...plant,
        monthsUntil: (Number(plant.blossomStart) - month + 12) % 12 || 12,
    })).sort((first, second) => first.monthsUntil - second.monthsUntil)[0];

    document.querySelector('#seasonMonth').textContent = new Intl.DateTimeFormat(currentLanguage === 'de' ? 'de-DE' : 'en-US', { month: 'long', year: 'numeric' }).format(now);
    document.querySelector('#seasonSummary').innerHTML = `
    <div class="summary-item"><span class="summary-value">${plants.length}</span><span class="summary-label">${t('plantsInLibrary')}</span></div>
    <div class="summary-item"><span class="summary-value">${flowering.length}</span><span class="summary-label">${t('floweringCount')}</span></div>
    <div class="summary-item"><span class="summary-value">${next ? escapeHtml(displayMonth(next.blossomStart)) : '—'}</span><span class="summary-label">${next ? t('nextPrefix', { name: escapeHtml(next.name) }) : t('noUpcoming')}</span></div>`;
    document.querySelector('#seasonList').innerHTML = flowering.length
        ? flowering.map((plant) => `<div class="season-row"><span class="season-plant"><i class="plant-dot" style="background:${plant.color}"></i>${escapeHtml(plant.name)}</span><span class="season-dates">${displayMonth(plant.blossomStart)} &ndash; ${displayMonth(plant.blossomEnd)}</span><span class="season-size">${t('metersTall', { height: formatNumber(Number(plant.height)) })}</span></div>`).join('')
        : `<p class="season-empty">${t('nothingFlowering')}</p>`;
}

function resetForm() {
    form.reset();
    colorInput.value = '#d66e59';
    document.querySelector('#colorValue').textContent = colorInput.value.toUpperCase();
    editingId = null;
    updateFormMode();
    formMessage.textContent = '';
}

function editPlant(id) {
    const plant = plants.find((item) => item.id === id);
    if (!plant) return;
    editingId = id;
    for (const key of ['name', 'diameter', 'height', 'color', 'blossomStart', 'blossomEnd']) {
        form.elements[key].value = plant[key];
    }
    form.elements.isWoodyPlant.checked = plant.isWoodyPlant;
    form.elements.isEvergreen.checked = plant.isEvergreen;
    document.querySelector('#colorValue').textContent = plant.color.toUpperCase();
    updateFormMode();
    formMessage.textContent = '';
    document.querySelector('#plantsPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelector('#name').focus({ preventScroll: true });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const blossomStart = formData.get('blossomStart');
    const blossomEnd = formData.get('blossomEnd');

    const plant = {
        id: editingId || (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`),
        name: formData.get('name').trim(),
        diameter: Number(formData.get('diameter')),
        height: Number(formData.get('height')),
        color: formData.get('color'),
        blossomStart,
        blossomEnd,
        isWoodyPlant: form.elements.isWoodyPlant.checked,
        isEvergreen: form.elements.isEvergreen.checked,
    };
    const previous = plants;
    plants = editingId ? plants.map((item) => item.id === editingId ? plant : item) : [...plants, plant];
    if (!persistPlants()) {
        plants = previous;
        return;
    }
    renderPlants();
    resetForm();
});

rows.addEventListener('click', (event) => {
    const editButton = event.target.closest('[data-edit]');
    const deleteButton = event.target.closest('[data-delete]');
    if (editButton) editPlant(editButton.dataset.edit);
    if (deleteButton) {
        const plant = plants.find((item) => item.id === deleteButton.dataset.delete);
        if (!plant || !window.confirm(t('deleteConfirm', { name: plant.name }))) return;
        const previous = plants;
        plants = plants.filter((item) => item.id !== plant.id);
        if (!persistPlants()) plants = previous;
        renderPlants();
        if (editingId === plant.id) resetForm();
    }
});

cancelButton.addEventListener('click', resetForm);
document.querySelector('#exportBackup').addEventListener('click', exportBackup);
document.querySelector('#importBackup').addEventListener('click', () => backupFileInput.click());
backupFileInput.addEventListener('change', async () => {
    await importBackup(backupFileInput.files[0]);
    backupFileInput.value = '';
});
languageSelect.addEventListener('change', () => {
    currentLanguage = languageSelect.value === 'en' ? 'en' : 'de';
    try {
        localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    } catch {
    }
    formMessage.textContent = '';
    clearBackupMessage();
    applyTranslations();
    notifyGardenUpdate('language-updated');
});
colorInput.addEventListener('input', () => {
    document.querySelector('#colorValue').textContent = colorInput.value.toUpperCase();
});

document.querySelectorAll('[data-plan-tool]').forEach((button) => {
    button.addEventListener('click', () => {
        if (button.disabled) return;
        activePlanTool = button.dataset.planTool;
        renderGardenPlan();
    });
});

planCanvas.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    const plan = getCurrentGardenPlan();
    const point = pointOnPlan(event);
    if (activePlanTool === 'plant') {
        placeSelectedPlant(plan, point);
        return;
    }
    if (activePlanTool === 'bucket') {
        const changed = fillFootpath(plan, point.column, point.row);
        if (changed) saveCurrentGardenPlan();
        return;
    }
    drawingPointer = event.pointerId;
    drawingSurface = unpackSurface(plan.surface, planCanvas.width * planCanvas.height);
    lastDrawPoint = point;
    planCanvas.setPointerCapture(event.pointerId);
    drawOutlineSegment(plan, drawingSurface, point, point, activePlanTool === 'eraser' ? 0 : 1);
    schedulePlanRender();
});

planCanvas.addEventListener('pointermove', (event) => {
    if (drawingPointer !== event.pointerId || !lastDrawPoint || !drawingSurface) return;
    const nextPoint = pointOnPlan(event);
    drawOutlineSegment(getCurrentGardenPlan(), drawingSurface, lastDrawPoint, nextPoint, activePlanTool === 'eraser' ? 0 : 1);
    lastDrawPoint = nextPoint;
    schedulePlanRender();
});

planCanvas.addEventListener('pointerup', finishOutlineDrawing);
planCanvas.addEventListener('pointercancel', finishOutlineDrawing);
planCanvas.addEventListener('contextmenu', (event) => event.preventDefault());

plantedRows.addEventListener('click', (event) => {
    const selectButton = event.target.closest('[data-select-placement]');
    const removeButton = event.target.closest('[data-remove-placement]');
    const plan = getCurrentGardenPlan();
    if (selectButton) {
        selectedPlacementId = selectButton.dataset.selectPlacement;
        renderGardenPlan();
    }
    if (removeButton) {
        plan.placements = plan.placements.filter((placement) => placement.id !== removeButton.dataset.removePlacement);
        if (selectedPlacementId === removeButton.dataset.removePlacement) selectedPlacementId = null;
        saveCurrentGardenPlan();
    }
});

gardenPlanSelect.addEventListener('change', () => {
    gardenState.selectedId = gardenPlanSelect.value;
    selectedPlacementId = null;
    saveCurrentGardenPlan();
});

gardenPlanName.addEventListener('change', () => {
    const plan = getCurrentGardenPlan();
    plan.name = gardenPlanName.value.trim() || t('defaultPlanName');
    saveCurrentGardenPlan();
});

gardenPlanWidth.addEventListener('change', resizeCurrentGardenPlan);
gardenPlanHeight.addEventListener('change', resizeCurrentGardenPlan);

document.querySelector('#newGardenPlan').addEventListener('click', () => {
    let planName = t('newPlanName', { number: gardenState.plans.length + 1 });
    let number = gardenState.plans.length + 1;
    while (gardenState.plans.some((plan) => plan.name === planName)) {
        number += 1;
        planName = t('newPlanName', { number });
    }
    const plan = createGardenPlan(planName);
    gardenState.plans.push(plan);
    gardenState.selectedId = plan.id;
    selectedPlacementId = null;
    saveCurrentGardenPlan();
});

document.querySelector('#deleteGardenPlan').addEventListener('click', () => {
    if (gardenState.plans.length < 2) return;
    const plan = getCurrentGardenPlan();
    if (!window.confirm(t('confirmDeletePlan', { name: plan.name }))) return;
    gardenState.plans = gardenState.plans.filter((item) => item.id !== plan.id);
    gardenState.selectedId = gardenState.plans[0].id;
    selectedPlacementId = null;
    saveCurrentGardenPlan();
});

document.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const tabs = [...document.querySelectorAll('[role="tab"]')];
        const index = tabs.indexOf(tab);
        const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
            : (index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
        activateTab(tabs[nextIndex]);
        tabs[nextIndex].focus();
    });
});

function activateTab(tab) {
    document.querySelectorAll('[role="tab"]').forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        panel.hidden = !active;
        panel.classList.toggle('is-hidden', !active);
    });
}

applyTranslations();
persistGardenState();

if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => { }));
}

function resizeCurrentGardenPlan() {
    const plan = getCurrentGardenPlan();
    const width = Number(gardenPlanWidth.value);
    const height = Number(gardenPlanHeight.value);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1
        || width > MAX_PLAN_DIMENSION || height > MAX_PLAN_DIMENSION
        || Math.round(width * GRID_CELLS_PER_METER) * Math.round(height * GRID_CELLS_PER_METER) > 160000) {
        planMessage.textContent = t('planSizeError');
        gardenPlanWidth.value = String(plan.width);
        gardenPlanHeight.value = String(plan.height);
        return;
    }
    if (width === plan.width && height === plan.height) return;
    const oldSize = gardenGridSize(plan);
    const oldSurface = unpackSurface(plan.surface, oldSize.columns * oldSize.rows);
    plan.width = width;
    plan.height = height;
    const newSize = gardenGridSize(plan);
    const newSurface = new Uint8Array(newSize.columns * newSize.rows);
    const copyColumns = Math.min(oldSize.columns, newSize.columns);
    const copyRows = Math.min(oldSize.rows, newSize.rows);
    for (let row = 0; row < copyRows; row += 1) {
        newSurface.set(oldSurface.subarray(row * oldSize.columns, row * oldSize.columns + copyColumns), row * newSize.columns);
    }
    plan.surface = packSurface(newSurface);
    plan.placements.forEach((placement) => {
        placement.x = Math.min(placement.x, width);
        placement.y = Math.min(placement.y, height);
    });
    saveCurrentGardenPlan();
}

function finishOutlineDrawing() {
    if (drawingPointer === null) return;
    drawingPointer = null;
    lastDrawPoint = null;
    const plan = getCurrentGardenPlan();
    plan.surface = packSurface(drawingSurface);
    drawingSurface = null;
    saveCurrentGardenPlan();
}

function placeSelectedPlant(plan, point) {
    const selectedPlant = plants.find((plant) => plant.id === planPlantSelect.value);
    if (!selectedPlant) {
        planMessage.textContent = t(plants.length ? 'choosePlantPlaceholder' : 'noPlantsInLibrary');
        return;
    }
    const placement = {
        id: createId(),
        plantId: selectedPlant.id,
        name: selectedPlant.name,
        diameter: Number(selectedPlant.diameter),
        height: Number(selectedPlant.height),
        color: selectedPlant.color,
        isWoodyPlant: selectedPlant.isWoodyPlant,
        isEvergreen: selectedPlant.isEvergreen,
        x: (point.column + 0.5) / GRID_CELLS_PER_METER,
        y: (point.row + 0.5) / GRID_CELLS_PER_METER,
    };
    plan.placements.push(placement);
    selectedPlacementId = placement.id;
    saveCurrentGardenPlan();
}