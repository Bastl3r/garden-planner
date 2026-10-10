# Garden Planner

A small installable, offline-capable plant planner. Plant details are stored in this browser with `localStorage`; no account or server-side database is used.

## Features
- Manage a plant collection, including dimensions, color, blossom months, woody-plant status, and evergreen status.
- Draw and erase planter outlines, fill and erase footpaths, and place scaled plants on multiple saved garden plans.
- Explore a rotatable, above-ground 3D view with sparse herbaceous foliage, low woody shrubs, and seasonal leaf drop; scrub through the months to preview flowering plants.
- Switch between German and English; the selected language is saved in the browser.
- Export a versioned JSON backup containing all persisted app data (plants, language, and garden plans), or import one to replace the saved data after confirmation.
- Install the app and use its cached shell offline.

## Running
Go to https://bastl3r.github.io/garden-planner/index.html

The preview uses a locally hosted Three.js module so it remains available offline. After changing the pinned Three.js dependency, run `npm install` and `npm run vendor:three` before publishing.

## Plant library
Add plants with their dimensions, blossom color, and start/end month. Use the row actions to edit or delete an entry. Changes are saved automatically in the current browser profile.