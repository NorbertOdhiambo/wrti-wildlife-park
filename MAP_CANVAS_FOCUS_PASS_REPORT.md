# WRTI Map Canvas Focus Pass

## Purpose and source precedence

This pass focuses exclusively on the live visitor Map at `/map`. It applies the approved Map Canvas Focus requirements with the supplied Stitch HTML as the visual authority: `main_map_navigation/screen-reference.html` for the compact mobile canvas and `immersive_map_desktop_adaptation/screen-reference.html` for the persistent wider-screen Discovery rail. The existing global WRTI shell remains present under the project’s default-on shell rule.

The work does not change the existing Tree repository, Supabase project, database schema, RLS configuration, Mapbox token boundary, Mapbox GL integration model, media strategy, other visitor routes, or unsupported geographic-feature policy.

## Delivered composition

| Breakpoint | Composition | Tree presentation |
|---|---|---|
| `< 768px` | A map-first canvas with source-aligned search, pale circular controls, live markers, and the persistent global Bottom Navigation. | The mobile Tree-preview BottomSheet is deliberately not rendered for this pass, so no selected Tree card obscures the canvas. |
| `768px–1023px` | The left Discovery rail is visible and the live Mapbox canvas reflows alongside it, following the Stitch `md` layout behavior. | The rail presents the selected live Tree or nearby live Tree rows. |
| `≥ 1024px` | The wide Map canvas retains the source-authoritative left Discovery rail, floating search, and compact vertical controls. | The selected Tree card retains its existing live image fallback, taxonomy, scientific name, and Tree Detail handoff. |

## Mobile BottomSheet boundary

The reusable BottomSheet component, `BottomSheetState` contract, sheet-state handling, safe-area support, and existing shared `TreeDiscoveryContent` remain in the application. `TreeMap.tsx` introduces the explicitly named local boundary `MAP_MOBILE_TREE_PREVIEW_ENABLED`, currently set to `false`. The current Map camera calculation also reads that boundary so mobile selection no longer reserves height for an inactive sheet.

> The mobile sheet has been **deferred**, not removed. Re-enabling it is intentionally limited to changing the documented Map-level flag in a later approved phase.

## Map and live-data behavior

| Area | Result |
|---|---|
| Map runtime | Continues to use direct `mapbox-gl` through the existing `client/src/config/mapbox.ts` configuration boundary and the frontend-safe `VITE_MAPBOX_ACCESS_TOKEN` variable. No token value is embedded or documented. |
| Live Trees | Marker eligibility is still calculated at runtime from the established Tree query data using finite latitude/longitude checks and `(0, 0)` placeholder exclusion. The observed live result remained 52 mappable records from the 58-record collection; no count is hardcoded. |
| Markers | Each marker remains keyboard reachable and exposes a Tree-specific accessible label. Unselected markers use the WRTI botanical green treatment; selected markers use the stronger green selected state. |
| Selection and search | Marker activation and live search selection retain the existing camera focus behavior and update the same shared selection model used by the Discovery rail. Search was verified with the live record **Wild basil**. |
| Location | The retained browser-geolocation action now creates a real Mapbox visitor-location marker when a position is available. Permission denial, unavailable positioning, and unsupported-browser recovery stay explicit and do not fabricate a location. |
| Settings | The existing map-style selection and unavailable-layer disclosure remain interactive. Unsupported ecological zones, walking paths, and cycling routes remain explicitly unavailable. |

## Visual and interaction refinements

The Map keeps real Mapbox terrain rather than a synthetic cartographic background. Mobile prioritizes the broadest usable canvas, while larger widths use the rail-aware canvas offset and camera padding. The floating search surface, layer control, zoom group, and location action use the source-oriented pale-surface and green-icon treatment. On tablet and desktop, the control order is **zoom, locate, layers**; on compact mobile, it remains **layers, zoom, locate**.

No fabricated pins, ecological-zone polygons, visitor counters, rankings, routes, timelines, or achievement systems were introduced. The existing reduced-motion camera-duration guard remains active.

## Validation record

| Validation | Result |
|---|---|
| Mobile visual review | Reviewed `/map` at 390×844. The BottomSheet was absent, the live Mapbox canvas occupied the available content area, and the grouped controls, markers, search, and global Bottom Navigation were visible. |
| Tablet visual review | Reviewed `/map` at 768×1024. The left rail reflowed the live map canvas and the ordered controls did not overlap. |
| Desktop visual review | Reviewed `/map` at 1280×900. The Discovery rail, offset canvas, floating search, live markers, and compact control stack rendered together. |
| Browser interaction smoke test | Confirmed live marker activation, selected Tree rail state, `Wild basil` search and selection, retained `/trees/71` Tree Detail link, and the existing Map appearance panel. |
| Accessibility and console | Confirmed accessible marker, search, settings, zoom, location, and navigation controls in the live page inspection. Current browser console inspection reported no output. |
| TypeScript | `pnpm run check` passed. |
| Automated tests | `pnpm exec vitest run` passed: 2 files and 7 tests. |
| Production build | `pnpm run build` passed. Pre-existing non-blocking duplicate `skipLibCheck`, sourcemap-location, package-configuration, and bundle-size warnings remain. |

## Deferred scope and limits

This pass intentionally does not re-enable the mobile Tree-preview BottomSheet, add map routing, add turn-by-turn navigation, add unverified spatial layers, invent tree-location data, change Tree image storage, add write operations, or modify any approved non-Map screen. The next approved mobile detail phase may set `MAP_MOBILE_TREE_PREVIEW_ENABLED` to `true` after a dedicated BottomSheet implementation and validation pass.
