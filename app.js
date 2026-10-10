const STORAGE_KEY = 'garden-planner-plants-v1';
const LANGUAGE_KEY = 'garden-planner-language';
const BACKUP_FORMAT = 'garden-planner-backup';
const BACKUP_VERSION = 1;
const translations = {
    de: {
        brandLabel: 'Garden Planner Startseite', savedOnDevice: 'Lokal auf diesem Gerät gespeichert', gardenViews: 'Gartenansichten',
        plantLibrary: 'Pflanzenübersicht', inSeason: 'Saison', seasonOverview: 'Saisonübersicht', yourGarden: 'DEIN GARTEN', newAddition: 'NEUZUGANG',
        addPlant: 'Pflanze hinzufügen', editFormTitle: 'Pflanze bearbeiten', name: 'Name', namePlaceholder: 'z. B. Echter Lavendel', diameter: 'Durchmesser', height: 'Höhe',
        blossomColor: 'Blütenfarbe', blossomBegins: 'Blüte beginnt', blossomEnds: 'Blüte endet', cancel: 'Abbrechen', growingList: 'PFLANZENLISTE',
        yourPlants: 'Deine Pflanzen', plant: 'Pflanze', size: 'Größe', blossom: 'Blüte', color: 'Farbe', actions: 'Aktionen',
        emptyPlants: 'Noch keine Pflanzen in deiner Liste.', gardenRightNow: 'DER GARTEN, JETZT', blossomWatch: 'BLÜTENKALENDER',
        floweringThisMonth: 'Blüte in diesem Monat', monthPlaceholder: 'Monat auswählen', exportBackup: 'Exportieren', importBackup: 'Importieren',
        exportSuccess: 'Sicherung wurde heruntergeladen.', importSuccess: 'Sicherung wurde importiert.', importConfirm: 'Der Import ersetzt deine gespeicherten Pflanzen und Sprache. Fortfahren?',
        importError: 'Diese Sicherungsdatei ist ungültig oder kann nicht gelesen werden.', appNameFooter: 'GARDEN PLANNER', storageNote: 'Deine Sammlung bleibt in diesem Browser.',
        language: 'Sprache', selectLanguage: 'Sprache auswählen', editPlant: '{name} bearbeiten', deletePlant: '{name} löschen',
        deleteConfirm: '{name} aus deiner Pflanzenliste löschen?', saveChanges: 'Änderungen speichern', updateDetails: 'DETAILS ÄNDERN',
        couldNotSave: 'Speichern nicht möglich. Der Browserspeicher ist möglicherweise voll.', blossomDateError: 'Das Blütenende muss im oder nach dem Startmonat liegen.',
        plantCountOne: 'Pflanze', plantCountMany: 'Pflanzen', plantsInLibrary: 'Pflanzen in deiner Sammlung', floweringCount: 'Blühen in diesem Monat',
        nextPrefix: 'Als Nächstes: {name}', noUpcoming: 'Keine bevorstehenden Blütentermine', nothingFlowering: 'Für diesen Monat ist keine Blüte eingetragen.',
        metersTall: '{height} m hoch',
    },
    en: {
        brandLabel: 'Garden Planner home', savedOnDevice: 'Saved on this device', gardenViews: 'Garden views',
        plantLibrary: 'Plant library', inSeason: 'In season', seasonOverview: 'In season', yourGarden: 'YOUR GARDEN', newAddition: 'NEW ADDITION',
        addPlant: 'Add a plant', editFormTitle: 'Edit plant', name: 'Name', namePlaceholder: 'e.g. French lavender', diameter: 'Diameter', height: 'Height',
        blossomColor: 'Blossom color', blossomBegins: 'Blossom begins', blossomEnds: 'Blossom ends', cancel: 'Cancel', growingList: 'GROWING LIST',
        yourPlants: 'Your plants', plant: 'Plant', size: 'Size', blossom: 'Blossom', color: 'Color', actions: 'Actions',
        emptyPlants: 'No plants in your library yet.', gardenRightNow: 'THE GARDEN, RIGHT NOW', blossomWatch: 'BLOSSOM WATCH',
        floweringThisMonth: 'Flowering this month', monthPlaceholder: 'Choose month', exportBackup: 'Export', importBackup: 'Import',
        exportSuccess: 'Backup downloaded.', importSuccess: 'Backup imported.', importConfirm: 'Importing replaces your saved plants and language. Continue?',
        importError: 'This backup file is invalid or could not be read.', appNameFooter: 'GARDEN PLANNER', storageNote: 'Your collection stays in this browser.',
        language: 'Language', selectLanguage: 'Choose language', editPlant: 'Edit {name}', deletePlant: 'Delete {name}',
        deleteConfirm: 'Delete {name} from your library?', saveChanges: 'Save changes', updateDetails: 'UPDATE DETAILS',
        couldNotSave: 'Could not save. Browser storage may be full.', blossomDateError: 'Blossom end must be in or after the start month.',
        plantCountOne: 'plant', plantCountMany: 'plants', plantsInLibrary: 'Plants in your library', floweringCount: 'Flowering this month',
        nextPrefix: 'Next: {name}', noUpcoming: 'No upcoming blossom dates', nothingFlowering: 'Nothing is marked as flowering this month.',
        metersTall: '{height} m tall',
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
let plants = readPlants();
let editingId = null;

function t(key, values = {}) {
    return (translations[currentLanguage][key] || key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

function formatNumber(value, maximumFractionDigits = 2) {
    return new Intl.NumberFormat(currentLanguage === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits }).format(value);
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
        })).filter(isPlant) : [];
    } catch {
        return [];
    }
}

function normalizeMonth(value) {
    return typeof value === 'string' ? value.match(/^(?:\d{4}-)?(0[1-9]|1[0-2])$/)?.[1] || '' : '';
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

    return { plants: importedPlants, language: backup.data.language };
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
        data: { plants, language: currentLanguage },
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
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(imported.plants));
            localStorage.setItem(LANGUAGE_KEY, imported.language);
        } catch (error) {
            try {
                oldPlants === null ? localStorage.removeItem(STORAGE_KEY) : localStorage.setItem(STORAGE_KEY, oldPlants);
                oldLanguage === null ? localStorage.removeItem(LANGUAGE_KEY) : localStorage.setItem(LANGUAGE_KEY, oldLanguage);
            } catch {
            }
            throw error;
        }
        plants = imported.plants;
        currentLanguage = imported.language;
        editingId = null;
        form.reset();
        colorInput.value = '#d66e59';
        document.querySelector('#colorValue').textContent = colorInput.value.toUpperCase();
        formMessage.textContent = '';
        applyTranslations();
        showBackupMessage('importSuccess');
    } catch {
        showBackupMessage('importError');
    }
}

function isPlant(value) {
    return value && typeof value.id === 'string' && typeof value.name === 'string'
        && Number.isFinite(Number(value.diameter)) && Number.isFinite(Number(value.height))
        && /^#[\da-f]{6}$/i.test(value.color)
        && /^(?:0[1-9]|1[0-2])$/.test(value.blossomStart) && /^(?:0[1-9]|1[0-2])$/.test(value.blossomEnd);
}

function persistPlants() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
        formMessage.textContent = '';
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
});
colorInput.addEventListener('input', () => {
    document.querySelector('#colorValue').textContent = colorInput.value.toUpperCase();
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

if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => { }));
}