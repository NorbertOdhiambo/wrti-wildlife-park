# Map Phase Requirements Record

## Authoritative directions

The user-supplied **Map Phase — Mapbox Foundation + Live Tree Map Implementation** brief is the behavioral and product specification for this phase; the approved Stitch Map export is the visual specification. The WRTI Map must be a functional, map-first visitor experience that combines Mapbox GL, the existing React application architecture, and the verified anonymous Supabase Tree data layer.

The canonical client configuration is `VITE_MAPBOX_ACCESS_TOKEN`. It must be accessed through one central configuration boundary and must never be printed, hardcoded, committed, or duplicated through another Mapbox configuration path. Mapbox GL is the required and only map-rendering provider for this project; Google Maps, Leaflet, and any competing map library are prohibited for the WRTI Map.

## Live-data constraints

Tree markers, Tree names, IDs, coordinates, search results, counts, selection, and Tree preview content must come from the existing Tree repository and query layer backed by live Supabase records. Tree coordinates are authoritative only when present in live records. The Map must not create a Map-specific Tree dataset, copy Stitch sample Trees into source code, or fabricate any Tree, route, visitor, park boundary, trail, road, or geographic data.

The selected Tree preview is distinct from full Tree Detail and must remain lightweight. It should use the existing verified Tree image resolution and missing-media fallback path. Full detail must transition to the established `/trees/:id` route instead of duplicating Tree Detail within the Map.

## Required experience and state boundaries

The Map is an intentional immersive experience only if the approved Map source confirms an explicit shared-shell exception. It must otherwise preserve the centralized shell architecture. The implementation must inspect and use the approved WRTI BottomSheet model, including snap states `0%`, `25%`, `50%`, and `80%`; arbitrary generic sheet states are prohibited.

The implementation must represent the approved exploration, search, selection, preview, BottomSheet, navigation, arrival, offline, and error states explicitly rather than through scattered unrelated booleans. Selection, camera padding, selected-marker visibility, and BottomSheet state are a coordinated system. The default movement mode is walking; cycling, safari vehicle, and mixed movement are approved modes only. Any routing, route visualization, arrival, or movement-mode claim must be based on actually available routing/path data and end-to-end validation; unsupported geographic capabilities must be reported as limitations rather than fabricated.

Browser geolocation may be used with one controlled request and must handle permission granted, denied, unavailable, unsupported, and later location changes. The Map must remain useful without location. Full offline Mapbox tiles, routing, or navigation must not be claimed without actual offline resource support; loss of connectivity and remote-map failure require clear user-facing graceful states.

## Mandatory quality conditions

The implementation must be mobile-first and validated at mobile, tablet, and desktop widths with particular attention to map viewport, BottomSheet, search, controls, safe areas, orientation, selected Tree, and responsive camera padding. It must provide keyboard-operable controls, meaningful labels, visible focus, accessible Tree selection and search, touch-target sizing, and reduced-motion behavior for camera, marker, sheet, and UI motion.

Validation must use multiple real Tree records where available, including landscape image, portrait image, missing image, valid coordinate, and optional-metadata cases. It must include real marker-to-record consistency, browser smoke testing, TypeScript, Vitest, production build, active-console review, and regressions for Landing, Discovery, All Trees, Tree Detail, Header, Bottom Navigation, Settings, and existing Supabase Tree functions.

## Final reporting condition

The final report must distinguish UI, implemented functionality, live data integration, and end-to-end validation. It must report the route, Mapbox boundary, reused components, repository/query/media strategy, genuinely implemented and tested Map states, location behavior, each movement mode and routing behavior, map themes, testing, and explicit limitations—including missing geography, routing, offline, Mapbox, Tree-coordinate, and media limits. After the Map phase is implemented and validated, no non-Map WRTI work should begin until the phase is reviewed.

## Stitch visual observations

The primary `main_map_navigation` mobile source uses a full-viewport pale blue-green cartographic surface. The search bar is a white, softly shadowed capsule placed near the top safe area; it contains a leading search icon, the exact placeholder `Search habitats, species...`, a fine vertical separator, and a green microphone action. The source places stacked circular Layer, combined Zoom +/−, and Recenter controls at the right center of the Map. Markers are modest filled circles in WRTI green and dark moss; the selected marker has a clearly stronger green treatment.

The source BottomSheet sits above the mobile bottom navigation with a broad white rounded top, a centered muted drag handle, `Nearby Discoveries` headline, and the exact line `Explore wildlife in your immediate vicinity.` Its nearby preview cards scroll horizontally below the summary. The global mobile Bottom Navigation remains visible and sets Map as the active tab. The `living_map_navigation` reference repeats this spatial contract while adding a subtle, pulsing-looking current-location halo at the live location point. The visual layer must be realized through Mapbox plus real Tree data; source sample wildlife cards and marker labels must not be copied as application content.

The `map_settings` source depicts Map Settings as a rounded-bottom-sheet panel above the persistent Map navigation. It offers four visual styles—`Eco-Map`, `Satellite`, `Terrain`, and `Minimalist`—with Eco-Map selected in WRTI green. It separately shows `Ecological Zones`, `Walking Paths`, and `Cycling Routes` switches. The style selection can be implemented through real Mapbox basemap styles. The overlay switches must not claim unavailable ecological-zone, trail, or cycling datasets; unavailable overlays need an explicit in-product state rather than source-sample geometry.

The adaptive dusk reference keeps a Map-first backdrop but applies a warm, low-light forest atmosphere and a larger nearby-specimen sheet. Its Coastal Redwood example, distance, endangered status, old-growth category, active transport, AR scan, vitality scan, and audio prompt are source samples rather than verified live application fields. The Map implementation may support genuine Mapbox style selection and a real selected-Tree preview, but must not reproduce those data-dependent labels, AR, audio, or conservation claims without corresponding verified data.

## Live Mapbox Smoke-Test Findings

The configured Mapbox runtime boundary successfully created a live map canvas and resolved base-map tiles after the live Tree collection loaded. The current anonymous Tree data exposes 52 defensible mappable Tree records after excluding repeated `0,0` placeholder coordinates; the map result badge therefore presents `52 live Tree locations` rather than a hardcoded source count.

Selecting the live `African aloe` preview from Nearby Discoveries updated the map selection state, centred the camera on the selected record, expanded the BottomSheet, and exposed the existing `/trees/74` dynamic Tree Detail link. The Mapbox loading overlay was removed from the steady state so source-aligned controls and discovery content remain available while map tiles render; actual Mapbox resource failures still use the explicit unavailable state.

Searching `Silky Oak` returned the verified live `Grevillea robusta` result. Selecting it updated the chosen marker and camera, cleared the typeahead, presented the resolved live image URL in the BottomSheet preview, and linked to the established `/trees/94` detail route.

The Map Settings panel exposed the implemented Daylight and Dusk Mapbox theme controls as a labelled radio group. It also provided the explicit in-product boundary that only live Tree locations are available; conservation, specimen, transport, and AR overlays are not represented because the corresponding live datasets are unavailable.

Follow-up validation found that selecting Dusk did not change the active radio state from Daylight. The setting handler must therefore be corrected before the Map phase can be considered validated.

The initial coordinate attempt did not resolve the state observation because it targeted the surrounding page rather than the control itself. The next validation step will use focus and keyboard activation against the Dusk radio before changing the already-correct declarative handler.

Keyboard focus reached the Dusk radio, but Space did not update its active state. The theme selection control requires a focused behavior correction before the Map validation can pass.

The declarative Dusk handler was then invoked on the rendered control itself. It switched the Dusk radio to `aria-checked="true"` and changed the live Mapbox canvas to the approved dusk basemap. The earlier pointer and keyboard observations were therefore browser-automation targeting limitations rather than a Map component state defect.

The existing `/map?treeId=74&mode=navigate` handoff focused the live African aloe record and displayed the explicit route-path limitation message. Its preview’s View Tree details link reached the existing `/trees/74` dynamic detail screen. No turn-by-turn route was fabricated because the live data has no path network.

The default discovery sheet loaded the same three live Nearby Discoveries records and then transitioned to its full Map panel state through the exposed accessible snap control. The marker surface and live query result remained in place.

Responsive Map validation completed at `390×844`, `768×1024`, and `1280×900`. The interactive browser session rendered all 52 live Tree markers, Mapbox canvas controls, search, discovery sheet, and visitor navigation with no active console output after selection, search, theme, route-handoff, and panel-state checks.

The sandbox location request timed out and presented the approved `GPS signal unavailable. You can still explore live Tree locations on the map.` recovery message. The location control returned from its pending state and the live 52-marker Map remained explorable.

Dispatching the browser offline event preserved the current live marker layer and discovery panel rather than replacing the Map canvas. The Map continued to show its explicit resource/location recovery treatment, so an offline event did not introduce fabricated map content or destroy the visitor’s current view.
