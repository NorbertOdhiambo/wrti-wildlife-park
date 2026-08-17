# Map Phase Implementation Record

## Delivered scope

The WRTI Map route at `/map` is now a **Mapbox GL JS** experience driven by the established live Supabase Tree feature boundary. It uses the single frontend-safe Mapbox configuration boundary at `client/src/config/mapbox.ts`; the runtime reads `VITE_MAPBOX_ACCESS_TOKEN` without printing, committing, duplicating, or exposing the value through a second configuration path.

The implementation replaces the previous placeholder map experience without changing approved non-Map screens. The existing shared Map shell remains intentional: WRTI Header and Bottom Navigation continue to frame the immersive map surface while `MapLayout` composes the in-map search, controls, and BottomSheet overlays.

| Area | Delivered behavior |
| --- | --- |
| Map surface | A real Mapbox GL canvas fills the map viewport using the approved daylight and dusk style choices. |
| Live marker layer | The page loads the existing Tree collection through TanStack Query and renders only records with valid non-zero coordinates. |
| Map camera | Initial bounds derive from valid live Tree coordinates instead of legacy placeholder camera values. |
| Tree selection | Marker, Nearby Discoveries item, and search-result selection each focus the same live Tree, update the preview state, and move the camera. |
| Search | In-map typeahead filters the same live marker records by common name, species, and family. |
| Discovery panel | The reusable BottomSheet supports collapsed, peek, half, and full states, uses live nearby-list records, and preserves the marker canvas behind it. |
| Detail transition | Selected preview opens the established dynamic `/trees/:id` detail route. |
| Map settings | Daylight/Dusk styles are supported; overlays that require unavailable geographic datasets are visibly marked unavailable. |
| Location | The location control requests browser geolocation, then safely shows the approved GPS-unavailable recovery treatment when it fails or times out. |

## Live data contract and marker coverage

The Map continues to consume the existing `Tree`, repository, `resolveStorageUrl`, and Tree query architecture. No page-level Supabase client, duplicate repository, mock map record, service-role key, database write, schema edit, RLS modification, or persistent visitor state was introduced.

| Verified source | Map use | Null and invalid-data policy |
| --- | --- | --- |
| `trees.id` | Stable marker, selection, search, and Tree Detail destination identity. | Records without an identifier are not rendered. |
| `trees.common_name` | Marker label, search text, discovery row, and selected preview. | The existing Tree fallback label is used where needed. |
| `trees.species`, `trees.family` | Search enrichment and preview metadata. | Empty values are omitted rather than fabricated. |
| `trees.lat`, `trees.lng` | Marker coordinates and initial camera bounds. | Null, non-finite, out-of-range, and repeated `(0, 0)` placeholder pairs are excluded. |
| `tree_images` and `resolveStorageUrl` | Selected Tree preview image. | A local, labelled missing-image treatment is used for that preview only. |

The read-only coordinate audit found **58** live Tree records, with **52** valid, non-zero mappable Tree locations. The remaining records do not create fabricated markers or influence the initial map bounds.

## State and interaction model

The Map uses a focused local state model for map readiness, query/load failure, selection, search text, BottomSheet snap state, map appearance, location status, and the existing `treeId` / `mode` URL handoff. It does not expand the legacy global map-store’s placeholder viewport contract into the new Mapbox camera logic.

| State | Visitor-visible result |
| --- | --- |
| Default explore | Valid live Tree markers, source-aligned in-map controls, and the live Nearby Discoveries sheet. |
| Selected Tree | Selected marker treatment, focused camera, real preview metadata/image, and Tree Detail transition. |
| Search selection | A matching live Tree becomes the selected map record and receives the same focused preview flow. |
| `?treeId=:id&mode=navigate` | Focuses the requested valid Tree and communicates the explicit exploration-only limitation when no path-network geometry exists. |
| Location unavailable | `GPS signal unavailable. You can still explore live Tree locations on the map.` while the current marker layer remains available. |
| Unsupported overlays | Settings label the unavailable layers rather than drawing invented conservation, trail, AR, or transport geography. |
| Missing map configuration or resource failure | A readable fallback keeps the visitor in the WRTI experience and allows recovery rather than displaying a synthetic map. |

## Deliberately unavailable capabilities

The supplied Map materials depict several states whose data or platform dependencies are not present in the approved application. The implementation does not simulate any of them.

| Capability not implemented | Reason |
| --- | --- |
| Turn-by-turn routing and trail-following camera | There is no verified trail graph, route geometry, or navigation service in the current Tree contracts. |
| True distance and arrival calculation | There is no verified visitor location or route-distance source. |
| Conservation, specimen, biodiversity, transport, and AR overlays | There are no corresponding verified geographic datasets or map-layer services. |
| Persistent favourites, visitor progress, or map preferences | The current visitor-facing project has no approved authenticated persistence model for these states. |
| Full offline vector tiles | Mapbox resources require network access; the Map preserves graceful recovery messaging but does not claim full offline map packs. |
| Marker clustering | With 52 valid coordinates and duplicate filtering, individual accessible markers remain clear and traceable to their live Tree records. |

## Validation record

| Check | Outcome |
| --- | --- |
| Runtime map configuration | Confirmed present without exposing its value. |
| Live marker coverage | Rendered all 52 valid non-zero live Tree locations. |
| Marker and discovery selection | Confirmed with live Tree selection, camera focus, and preview state. |
| Search-to-selection | Confirmed using live `Silky Oak` data. |
| Map appearance | Confirmed Daylight/Dusk selection on the real Mapbox canvas. |
| Active-navigation handoff | Confirmed `/map?treeId=74&mode=navigate` selection and supported Map-preview-to-`/trees/74` transition. |
| BottomSheet | Confirmed full snap state with the unchanged live discovery records and marker layer. |
| GPS fallback | Confirmed timeout recovery message while the Map remained usable. |
| Offline event | Confirmed the existing live marker layer and recovery treatment remain available after a simulated offline event. |
| Responsive review | Reviewed live map layout at `390×844`, `768×1024`, and `1280×900`. |
| Accessibility smoke tests | Confirmed labelled map canvas, labelled markers, labelled controls, search input, focusable BottomSheet controls, and Tree Detail handoff. |
| Browser console | No active client-side console output after interaction validation. |
| Production validation | `pnpm run check`, `pnpm test --run`, and `pnpm run build` all passed. |

The existing duplicate `skipLibCheck` configuration warning, pnpm configuration relocation warning, and build-size advisory remain unchanged from prior approved work. Mapbox increases the client bundle; no server-side integration, long-running process, or external hosting change was introduced.
