# Map Live Implementation Verification & Fidelity Audit

## Audit conclusion

The WRTI Map at `/map` is confirmed as a real **Mapbox GL JS** implementation backed by the existing anonymous-read Supabase Tree feature boundary. This verification pass did not add a new Map capability, a second data path, hardcoded Tree locations, mock markers, a service-role key, a schema change, or a new persistence layer. It corrected only confirmed source-fidelity and lifecycle issues: source-approved map-style choices, right-side control positioning, safe camera clearance for selected markers, and marker lifecycle dependencies that could have recreated markers during ordinary selection changes.

The audit reviewed the supplied Map verification brief, the default, active-navigation, GPS-unavailable, settings, and dusk Map source materials, the existing `TreeMap`, `MapLayout`, `BottomSheet`, Tree repository, TanStack Query hooks, configuration module, styles, and the live browser implementation. The complete per-record coordinate diagnostic is retained in [`MAP_TREE_COORDINATE_DIAGNOSTIC.md`](./MAP_TREE_COORDINATE_DIAGNOSTIC.md); live browser findings are retained in [`MAP_VERIFICATION_LIVE_FINDINGS.md`](./MAP_VERIFICATION_LIVE_FINDINGS.md).

## Live Tree coverage and marker data flow

The Map uses the existing `useTreesQuery` query boundary to request the complete live collection in a single bounded page. It does not paginate markers, concatenate placeholder data, query another endpoint, or derive marker identities from array indices. Each valid Tree produces one Mapbox marker keyed by the real `trees.id`; selection, search, preview, and Tree Detail handoff all retain that same identity.

| Verification item | Confirmed implementation | Result |
| --- | --- | --- |
| Live collection | Repository-backed Tree collection, queried through TanStack Query | All **58** currently readable Tree records audited. |
| Coordinate conversion | Verified `trees.lat`, `trees.lng` are mapped only as `[lng, lat]` | Correct Mapbox coordinate order. |
| Mappable records | Finite, in-range, non-null coordinates excluding the repeated `(0, 0)` placeholder pair | **52** live markers rendered. |
| Excluded records | Six live records with the `(0, 0)` placeholder pair | Explicitly excluded; no fabricated marker or camera influence. |
| Marker identity | Real numeric Tree ID | Stable across marker, sheet, search, and `/trees/:id` route handoffs. |
| Search | Filters the same mappable live marker collection by common name, species, and family | Verified with the live **Silky Oak** record. |
| Preview media | Uses the existing image-query and `resolveStorageUrl` path for selected Tree preview only | No per-marker image request fan-out. |

> **Coordinate evidence.** The companion coordinate diagnostic provides a table for every audited live Tree record, including Tree ID, common name, latitude, longitude, mappable decision, and exact exclusion reason. The initial camera bounds derive only from the verified mappable subset.

## Verified interactions and state transitions

The map selection model is consistent across every tested entry point. Selecting a real marker, choosing a live Nearby Discoveries record, selecting a search result, opening the detail page, and returning with `?treeId=:id&mode=view` all use the same Tree ID and selected Tree state. A non-marker Mapbox canvas click clears the selection and restores the discovery state. Collapsing and expanding the BottomSheet leaves the selected Tree and camera focus intact.

| Interaction | Live verification outcome |
| --- | --- |
| Marker selection | Live marker selection retained a selected-marker treatment, focused the camera, and updated the same BottomSheet preview. |
| Nearby Discoveries | The selected discovery row focused the matching live marker and preview. |
| Typeahead | **Silky Oak** selected the correct live Tree without replacing the marker dataset. |
| Selected preview | Live Tree name, family/species metadata, and selected image/fallback state rendered from existing Tree data. |
| Tree Detail handoff | Selected **African aloe** opened the established `/trees/74` detail route. |
| Detail-to-Map handoff | The existing Tree Detail action returned to `/map?treeId=74&mode=view` and restored the same live Tree selection. |
| Canvas clearing | A non-marker map click cleared selection and restored the discovery panel. |
| BottomSheet persistence | Collapsed and expanded sheet states preserved the selected live Tree and marker focus. |

## Source-fidelity and component-alignment corrections

The pass preserved the approved map-first composition and shared WRTI shell. It reuses the existing `MapLayout` and `BottomSheet` primitives instead of creating parallel overlay or panel systems. At desktop widths, the discovery panel uses the approved side-panel arrangement while mobile and tablet retain the source-aligned bottom-sheet experience. The correction adds only a route-scoped MapLayout placement override, preserving default behavior for other consumers.

| Area corrected or verified | Final behavior |
| --- | --- |
| Map styles | Settings offer source-approved **Eco-Map**, **Satellite**, **Terrain**, and **Minimalist** appearances and call the corresponding real Mapbox style configuration. |
| Unsupported settings layers | Layers with no verified geographic dataset remain explicitly unavailable; no conservation, transport, AR, or invented overlay is drawn. |
| Map controls | Search and zoom/location/settings controls are on the source-aligned right side with safe-area offsets and accessible labels. |
| Camera movement | Selection uses camera padding that keeps the selected marker visible above the active Map panel. |
| Marker lifecycle | Marker rebuilding responds to material marker-coordinate changes; ordinary selection and sheet-state changes do not destroy/recreate the Mapbox instance or marker layer. |
| Preview media | Real landscape and resolved selected media display correctly; the local unavailable-image treatment is scoped to the selected preview rather than changing marker behavior. |

## Failure-state, accessibility, and performance evidence

The focused validation used real browser behavior where possible. Geolocation was not mocked: a request timed out in the sandbox and the source-approved recovery state appeared while the selected Tree and live marker layer remained usable. An offline event was dispatched only to verify the existing recovery treatment and then immediately restored to online; it did not mutate live Tree or Mapbox data.

| Check | Evidence and outcome |
| --- | --- |
| GPS unavailable | Real request entered requesting state, timed out after the configured ten seconds, then showed `GPS signal unavailable. You can still explore live Tree locations on the map.` |
| Offline event | Selected preview and all 52 live markers remained available; no false claim of offline vector-map packs was introduced. |
| Configuration/resource fallback | Source code retains a readable recovery branch for absent configuration or a Mapbox resource failure; no alternate map provider is used. |
| Map accessibility | The canvas exposes `role="region"` with a Map label; markers are semantic labelled buttons; search, controls, settings, BottomSheet actions, and detail link all have accessible names. |
| Interactive-name audit | **70** rendered interactive controls were checked; none lacked an accessible name. |
| Keyboard path | Tab navigation reached the reusable BottomSheet drag handle, reported as `role="button"` and labelled `Drag to resize`. |
| Motion | The Map and BottomSheet retain existing reduced-motion treatment; no non-essential animation was added in this audit. |
| Responsive validation | Real Map route reviewed at **390×844**, **768×1024**, and **1280×900**. |
| Console | No application-generated Mapbox, React, query, or route error was present after the live checks. One earlier invalid audit-console expression was corrected and is not an application error. |

## Production and regression results

`pnpm test --run`, `pnpm run check`, and `pnpm run build` completed successfully after the final corrections. Existing non-blocking project notices remain unchanged: the duplicate `skipLibCheck` configuration warning, pnpm configuration relocation notice, sourcemap-reporting warning for the existing toggle-group package, and the production bundle-size advisory. Mapbox remains an intentionally client-side dependency; no backend service, hosting change, or long-running background process was added.

## Deliberate limits

Turn-by-turn navigation, route geometry, distance estimates, conservation/specimen/transport/AR overlays, persistent favourites, and full offline vector tiles remain unavailable because the current verified application data and platform contracts do not support them. The Map presents those boundaries explicitly rather than creating fictional data or navigation behavior.
