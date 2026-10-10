# Garden Planner

A small installable, offline-capable plant planner. Plant details are stored in this browser with `localStorage`; no account or server-side database is used.

## Features
- Manage a plant collection, including dimensions, color, and blossom months.
- Switch between German and English; the selected language is saved in the browser.
- Export a versioned JSON backup containing all persisted app data (plants and language), or import one to replace the saved data after confirmation.
- Install the app and use its cached shell offline.

## Running
Go to https://bastl3r.github.io/garden-planner/index.html

## Plant library
Add plants with their dimensions, blossom color, and start/end month. Use the row actions to edit or delete an entry. Changes are saved automatically in the current browser profile.