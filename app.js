const STORAGE_KEY = 'garden-planner-plants-v1';

const form = document.querySelector('#plantForm');
const rows = document.querySelector('#plantRows');
const emptyState = document.querySelector('#emptyState');
const formTitle = document.querySelector('#formTitle');
const formEyebrow = document.querySelector('#formEyebrow');
const saveButton = document.querySelector('#savePlant');
const cancelButton = document.querySelector('#cancelEdit');
const formMessage = document.querySelector('#formMessage');
const colorInput = document.querySelector('#color');
let plants = readPlants();
let editingId = null;

function readPlants() {
    try {
        const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return Array.isArray(value) ? value.filter(isPlant) : [];
    } catch {
        return [];
    }
}

function isPlant(value) {
    return value && typeof value.id === 'string' && typeof value.name === 'string'
        && Number.isFinite(Number(value.diameter)) && Number.isFinite(Number(value.height))
        && /^#[\da-f]{6}$/i.test(value.color)
        && /^\d{4}-\d{2}$/.test(value.blossomStart) && /^\d{4}-\d{2}$/.test(value.blossomEnd);
}

function persistPlants() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
        formMessage.textContent = '';
        return true;
    } catch {
        formMessage.textContent = 'Could not save. Browser storage may be full.';
        return false;
    }
}

function displayMonth(value) {
    const [year, month] = value.split('-').map(Number);
    return new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric', timeZone: 'UTC' })
        .format(new Date(Date.UTC(year, month - 1, 1)));
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
      <td class="size-cell">${Number(plant.diameter)} cm &times; ${Number(plant.height)} m</td>
      <td>${displayMonth(plant.blossomStart)} &ndash; ${displayMonth(plant.blossomEnd)}</td>
      <td><span class="color-chip"><i style="background:${plant.color}"></i>${plant.color}</span></td>
      <td><span class="row-actions">
        <button class="icon-button" type="button" data-edit="${plant.id}" aria-label="Edit ${escapeHtml(plant.name)}" title="Edit plant">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>
        </button>
        <button class="icon-button delete" type="button" data-delete="${plant.id}" aria-label="Delete ${escapeHtml(plant.name)}" title="Delete plant">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/></svg>
        </button>
      </span></td>
    </tr>`).join('');

    const count = plants.length;
    document.querySelector('#plantCount').textContent = `${count} ${count === 1 ? 'plant' : 'plants'}`;
    document.querySelector('#collectionCount').textContent = String(count);
    emptyState.classList.toggle('is-visible', count === 0);
    renderSeason();
}

function renderSeason() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const monthValue = `${year}-${String(month).padStart(2, '0')}`;
    const flowering = plants.filter((plant) => {
        const start = Number(plant.blossomStart.slice(5));
        const end = Number(plant.blossomEnd.slice(5));
        return start <= end ? month >= start && month <= end : month >= start || month <= end;
    });
    const next = plants.filter((plant) => plant.blossomStart > monthValue)
        .sort((first, second) => first.blossomStart.localeCompare(second.blossomStart))[0];

    document.querySelector('#seasonMonth').textContent = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(now);
    document.querySelector('#seasonSummary').innerHTML = `
    <div class="summary-item"><span class="summary-value">${plants.length}</span><span class="summary-label">Plants in your library</span></div>
    <div class="summary-item"><span class="summary-value">${flowering.length}</span><span class="summary-label">Flowering this month</span></div>
    <div class="summary-item"><span class="summary-value">${next ? escapeHtml(displayMonth(next.blossomStart)) : '—'}</span><span class="summary-label">${next ? `Next: ${escapeHtml(next.name)}` : 'No upcoming blossom dates'}</span></div>`;
    document.querySelector('#seasonList').innerHTML = flowering.length
        ? flowering.map((plant) => `<div class="season-row"><span class="season-plant"><i class="plant-dot" style="background:${plant.color}"></i>${escapeHtml(plant.name)}</span><span class="season-dates">${displayMonth(plant.blossomStart)} &ndash; ${displayMonth(plant.blossomEnd)}</span><span class="season-size">${Number(plant.height)} m tall</span></div>`).join('')
        : '<p class="season-empty">Nothing is marked as flowering this month.</p>';
}

function resetForm() {
    form.reset();
    colorInput.value = '#d66e59';
    document.querySelector('#colorValue').textContent = colorInput.value.toUpperCase();
    editingId = null;
    formTitle.textContent = 'Add a plant';
    formEyebrow.textContent = 'NEW ADDITION';
    saveButton.innerHTML = '<span aria-hidden="true">+</span> Add plant';
    cancelButton.classList.add('is-hidden');
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
    formTitle.textContent = 'Edit plant';
    formEyebrow.textContent = 'UPDATE DETAILS';
    saveButton.innerHTML = 'Save changes';
    cancelButton.classList.remove('is-hidden');
    formMessage.textContent = '';
    document.querySelector('#plantsPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelector('#name').focus({ preventScroll: true });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const blossomStart = formData.get('blossomStart');
    const blossomEnd = formData.get('blossomEnd');
    if (blossomEnd < blossomStart) {
        formMessage.textContent = 'Blossom end must be in or after the start month.';
        document.querySelector('#blossomEnd').focus();
        return;
    }

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
        if (!plant || !window.confirm(`Delete ${plant.name} from your library?`)) return;
        const previous = plants;
        plants = plants.filter((item) => item.id !== plant.id);
        if (!persistPlants()) plants = previous;
        renderPlants();
        if (editingId === plant.id) resetForm();
    }
});

cancelButton.addEventListener('click', resetForm);
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

renderPlants();

if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => { }));
}