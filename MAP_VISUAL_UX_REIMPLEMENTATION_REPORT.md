# WRTI Map Visual / UX Reimplementation Report

## Scope and source priority

This focused phase rebuilt the **presentation layer** of the live `/map` route from the approved Stitch sources while preserving the approved Mapbox and Supabase integration boundaries. The authoritative mobile source is `main_map_navigation/screen-reference.html`; the authoritative desktop source is `immersive_map_desktop_adaptation/screen-reference.html`. Where prior notes described a right rail, the desktop HTML is decisive: it specifies a **left-side**, 400px-class discovery panel followed by the map canvas.

The shared application shell remains intentionally present under the project-wide default-on navigation policy. No unrelated route, data model, database schema, RLS policy, storage configuration, auth state, payment flow, or geographic overlay was changed.

## Implemented responsive composition

| Viewport | Implemented presentation | Live data behavior |
|---|---|---|
| Mobile and tablet below 1024px | Existing map-first canvas, floating source-aligned search and controls, plus the reusable interactive BottomSheet | Shows the same selected Tree card or nearby Tree rows as before; sheet snap controls and selection behavior remain available. |
| Desktop at 1024px and above | Source-aligned left discovery rail with the exact desktop Stitch header copy: **“Discovery”** and **“Explore species and habitats near you.”** The map canvas is reflowed to begin beside the rail. | Shows the same live selected Tree record or the first live nearby records, with the existing media fallback and Tree Detail link. |

`TreeDiscoveryContent` now owns the shared selected/nearby Tree markup. Both render modes receive the same already-loaded `mappableTrees`, selected Tree, resolved image, and selection callback. This avoids a second live query and keeps selection, search, marker, rail, and BottomSheet state in one flow.

## Technical changes

| Area | Change |
|---|---|
| `TreeMap.tsx` | Added a desktop-aware camera-padding branch, shared live Tree discovery content, a responsive desktop rail, and an unchanged mobile BottomSheet consumer. |
| `MapLayout.tsx` | Added a generic `sideOverlay` slot for responsive map-side information surfaces. |
| `TreeMap.css` | Uses the existing desktop rail and map-region rules to hide the rail on mobile, offset the live Mapbox canvas on desktop, and preserve source-oriented visual hierarchy. |
| Mapbox and Supabase | No configuration, query, credential, token, coordinate, marker-count, repository, or network behavior was duplicated or modified. The canonical `mapboxConfig` boundary and existing Tree repository remain authoritative. |

The Map continues to derive markers only from live records with valid non-placeholder coordinates. The current runtime result is 52 mappable records from the approved 58-record Tree collection; that number is rendered from the computed array and is not hardcoded.

## Validation evidence

| Check | Result |
|---|---|
| TypeScript | `pnpm run check` passed. |
| Unit tests | `pnpm exec vitest run` passed: 2 files and 7 tests. |
| Production build | `pnpm run build` passed. Existing non-blocking duplicate `skipLibCheck`, sourcemap-location, and bundle-size advisories remain. |
| Mobile visual review | The 390×844 Map viewport preserves the interactive nearby-discoveries BottomSheet, floating controls, and live map canvas. |
| Desktop visual review | The 1280×900 Map viewport renders the source-aligned left discovery rail, offset Mapbox canvas, controls, and rail selection card. |
| Browser smoke tests | Verified 52 marker elements, marker-to-rail selection, live search for **Wild basil**, search-result selection, and the existing `/trees/71` Tree Detail handoff. |

## Accessibility and limits

The established visible focus styling, semantic buttons/links, keyboard-operable marker and search-result controls, and reduced-motion guard remain in place. The implementation still does not claim unsupported routes, path navigation, ecological zones, walking paths, or cycling overlays. Missing Tree media continues to use the existing explicit fallback rather than invented imagery.
