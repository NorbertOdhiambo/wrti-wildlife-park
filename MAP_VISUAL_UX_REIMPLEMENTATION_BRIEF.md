# WRTI Map Visual / UX Reimplementation Brief

## Authoritative objective

The existing WRTI Mapbox and live Supabase foundation must be retained where it is correct, but the `/map` experience must be substantially rebuilt from a generic functional prototype into a convincing, Stitch-driven WRTI Nature / Wildlife Park Navigator. This is a visual, interaction, and responsive-composition reimplementation; it is not authorization to add routing, geographic overlays, authentication, offline map packs, or a new data architecture.

## Fixed data and Mapbox constraints

The live source contains 58 Tree records, six of which have no coordinates. The Map must derive the mappable subset from valid database coordinates and therefore currently show 52 real markers without hardcoding that count or excluding additional valid coordinate records. The required direct mapping library is `mapbox-gl`; the only canonical client environment variable is `VITE_MAPBOX_ACCESS_TOKEN`. The final record must report the installed Mapbox GL version, runtime variable, runtime presence, token-hardcoding result, map initialization, and cleanup without exposing the token.

## Responsive composition requirement

| Viewport family | Required composition |
| --- | --- |
| Mobile / small screens | Dominant map canvas, source-aligned floating controls, mobile search composition, and the existing responsive BottomSheet architecture. The sheet remains touch-friendly, expandable/collapsible, and able to show a selected Tree preview without obscuring the entire map unnecessarily. |
| Desktop / large screens | Dominant map canvas with an intentional right-side Tree / Map information rail. The Map must reflow for this rail; it must not use an enlarged mobile BottomSheet. The rail responds to selection and disappears or transitions appropriately when selection clears. |
| Tablet | A deliberately chosen breakpoint treatment documented after inspecting Stitch, existing WRTI architecture, and practical interaction behavior. It must not inherit desktop or mobile behavior by accident. |

## Source-faithful experience requirements

The actual Stitch HTML, screenshots, assets, dimensions, typography, colors, control hierarchy, marker treatment, panel behavior, and responsive patterns are authoritative. If an image is unreliable, the HTML is authoritative. The Map must use the existing WRTI identity and visual language through designed markers, selected state, controls, preview composition, panel styling, environmental treatment, spacing, and motion—not generic Mapbox default UI.

### Source findings

The default source is [`main_map_navigation/screen-reference.html`](../upload/main_map_navigation/screen-reference.html). It defines the WRTI palette (`#006b2c` primary, `#f0fbfe` surface, `#131d1f` ink, `#3e4a3d` muted), Libre Caslon Text display hierarchy, Plus Jakarta Sans interface text, a pale cartographic environmental surface, 40px mobile controls, translucent white panels, forest marker circles, and a 32px-radius mobile discovery sheet. Its responsive reference explicitly gives the discovery surface a 400px desktop side-panel width, desktop full-height clearance, vertically stacked cards, and a mobile horizontal-card sheet.

The desktop source is [`immersive_map_desktop_adaptation/screen-reference.html`](../upload/immersive_map_desktop_adaptation/screen-reference.html). It specifies a persistent 400px desktop Discovery rail with a pale translucent surface, thin botanical outline, independent vertical scroll, a panel heading, a short descriptive line, soft taxonomy/filter pills, and compact horizontal image-led list cards. The desktop map remains the dominant adjacent canvas; its search floats at the map’s upper left and 48px glass controls sit on the right. The desktop reference’s panel is shown on the **left**, but the current authorized brief overrides its side placement with an intentional **right-side** Tree/Map information rail; the same hierarchy, width, material, and reflow principle apply.

Both sources use source-defined copy that refers to species/habitats rather than fabricated map measurements. Since verified Tree contracts do not provide distance or activity values, the reimplementation must omit those unsupported source placeholders rather than assigning made-up distances, categories, or conservation statuses.

The selected Tree flow uses existing live Tree identity, common name, species, family, resolved image, and verified location availability. The canonical preview architecture, including `TreeCard variant="preview"` where it exists, must be reused instead of creating a parallel Map card model.

## Required live interactions and explicit boundaries

Live search, marker selection, camera focus, selected preview, browser geolocation states, settings/layer controls that exist in Stitch, existing Tree Detail handoff, media fallback, and accessible marker/control behavior must remain connected to the established Supabase → Tree repository → TanStack Query → coordinate adapter → Mapbox GL flow.

There must be no hardcoded Tree markers, IDs, coordinates, mock data, separate search dataset, fabricated visitor location, fake routing, road-routing substitute, invented trails, conservation/habitat/park overlays, AR overlays, offline map-pack claims, authentication, or persistent preferences. Unsupported data must be absent or clearly deferred rather than simulated.

## Completion evidence

The final implementation record must cover direct Mapbox package/version/runtime-token safety, real Tree marker derivation, desktop side-panel composition, mobile BottomSheet composition, tablet breakpoint decision, live search synchronization, genuine location recovery, screenshot-based Stitch comparison, known deviations, TypeScript, tests, browser testing, production build, accessibility, and the explicitly deferred capabilities.
