# Map Verification Live Findings

## Interaction evidence

The corrected `/map` route was opened against live data after the Map lifecycle and control-placement correction. The default experience exposed **52 live Tree locations**, one accessible marker control for each mappable record, the live in-map search input, zoom/settings/location controls, the reusable discovery BottomSheet, and the shared WRTI navigation shell.

Selecting a real marker updated the existing Map state without a route change: the current BottomSheet showed **Selected Tree**, the selected live record (`Wild olive`, ID `89`) retained its real family and scientific-name fields, and the preview linked to the established `/trees/89` detail route. This confirms the marker-to-selection-to-detail handoff uses a stable live Tree identity rather than fabricated map data.

## Visual evidence

Mobile (`390×844`) and desktop (`1280×900`) captures confirmed the corrected source-aligned right-side Map controls, lower location action, live marker canvas, in-map search, and discovery panel. The desktop Map keeps the approved visitor header and bottom navigation while the map and BottomSheet occupy the remaining immersive surface.

## Settings evidence

The Map settings panel contains the source-approved Map appearance radio choices — **Eco-Map**, **Satellite**, **Terrain**, and **Minimalist** — together with explicit unavailable labels for **Ecological Zones**, **Walking Paths**, and **Cycling Routes**. The visitor-facing note explains that live Tree locations are present while those overlays require verified geographic data. This preserves the verified live-map scope instead of presenting simulated route or spatial-overlay content.

The browser automation click on Satellite did not immediately change the rendered visual state in this session. The control’s own handler was then verified with a two-animation-frame wait: **Satellite** changed to `aria-checked="true"` and **Eco-Map** changed to `aria-checked="false"`. This confirms normal asynchronous React rendering rather than a Map settings state defect.

## Search and selected-preview evidence

The in-map search returned the real **Silky Oak** record for `Silky Oak`, including its live scientific name **Grevillea robusta**. Choosing that result cleared the search field, selected the same live marker record, updated the sheet to the selected-preview state, and resolved the Tree preview image through the existing Tree media path. The resulting detail destination was `/trees/94`, matching the live record identity rather than a positional or fabricated Map identifier.

## Marker identity and preview-fallback evidence

The browser’s pointer target did not reliably reach the African aloe marker in the stacked Mapbox canvas during the audit session. Invoking that marker’s own rendered button handler selected **African aloe** after two animation frames, confirming the marker remains wired to the real Tree selection path rather than a stale or positional identity. Once the selected-image query settled, African aloe showed the local tree-symbol media fallback with no fabricated preview image, while retaining the real `/trees/74` detail destination.

Collapsing the BottomSheet preserved the selected African aloe record and its focused marker/camera state while reducing the panel to its approved collapsed treatment. This confirms selection state is not coupled to the currently visible panel height.

Expanding the panel restored the same African aloe preview without changing its real identity or destination. A subsequent click on an empty Mapbox canvas area cleared that selection and restored the Nearby Discoveries state with the existing live African aloe, Silky Oak, and African Juniper records. This confirms the documented non-marker map-click clearing behavior and panel reset flow.

Selecting African aloe from the restored live discovery rows focused its valid marker and displayed the selected preview for the same live Tree ID (`74`). The preview’s detail action opened the established `/trees/74` route, where the Tree Detail view loaded the same live African aloe identity and media/audio-driven detail state. This confirms the Map does not use a surrogate identity or duplicate detail data source during the cross-screen handoff.

The existing Tree Detail `View on Map` action returned to `/map?treeId=74&mode=view`. The Map then restored African aloe as the selected live Tree, focused its same valid marker, and rendered the corresponding real preview. The return route preserved the selected record without claiming turn-by-turn routing or creating a second map-selection data path.

The real browser geolocation request entered its requesting state and, after the configured ten-second timeout, returned the source-approved live recovery message: `GPS signal unavailable. You can still explore live Tree locations on the map.` The button returned to its enabled state, while the selected African aloe marker, preview, and live marker layer remained available.

After a simulated browser `offline` event, the Map retained the selected African aloe marker, selected preview, 52 live Tree marker layer, and other available UI. The previously verified GPS-unavailable message remained visible from the independent geolocation test; no fabricated offline-map claim or synthetic Tree record was introduced.

The final active-console review contained no application-generated Mapbox, React, query, or route error. It retained one earlier `Page.evaluate` syntax message from an invalid audit-console expression; the immediately corrected single-expression offline dispatch completed successfully and did not represent an application defect.

An accessibility-name audit found **70** rendered interactive Map controls and no control lacking an accessible name. Keyboard `Tab` navigation reached the reusable BottomSheet drag handle, whose focused element reported the expected `role="button"` and `aria-label="Drag to resize"`.
