# Dynamic Tree Detail — Stitch Source Notes

## Source authority

The Tree Detail source is `/home/ubuntu/upload/tree_detail_giant_sequoia/screen-reference.html`. The supplied HTML is the authoritative specification; the corresponding `screen.png` is the secondary visual reference.

## Initial verified structure

- The source uses the established WRTI palette: background `#f0fbfe`, primary `#006b2c`, secondary `#1a6c3b`, on-surface `#131d1f`, and the existing Libre Caslon Text / Plus Jakarta Sans pairing.
- It specifies a 64px translucent fixed task header with back and favorite actions, a 530px mobile / 618px md hero, category chips, display title, and italic scientific name.
- The detail body begins with a two-column narrative/audio section, then botanical information and conservation content. The source uses a real image hero, a simulated waveform, 12px/16px/32px/64px spacing rhythm, and a persistent lower-page space for navigation.
- Source content and fixed giant-sequoia values must become a dynamic view model only where verified Tree data can safely populate them. Unverified facts must use explicit UI fallbacks rather than fabricated data.

## Complete source contract

- The primary content order is: Story of the Giant; Audio Guide; Botanical Profile; Conservation Status; Nature Insight; View on Map / Navigate Here actions; then a horizontally scrollable Related Species row.
- The HTML source uses two initial related cards, 200px minimum width, 128px image heights, source labels, and italic scientific names. The task header shows back and favorite actions; its source comment explicitly suppresses Bottom Navigation on detail pages.
- Botanical Profile uses the four source labels `Family`, `Average Height`, `Lifespan`, and `Native Region`. The status panel has a warning icon, `Conservation Status`, `Endangered`, and `IUCN Data`; the insight panel contains the source `Nature Insight` heading.
- The mobile screenshot confirms a 487px-wide stacked composition, translucent 64px header, hero canopy/trunk crop, 530px source hero height, chip/title overlay near the lower hero edge, 16px outer margins, 16px card padding, the audio bar below narrative text, full-width stacked actions, and the Related Species horizontal scroller.
- Source copy and hero imagery depict Giant Sequoia specifically. In the dynamic implementation, only verified database fields will replace those content values. If a verified field is absent, the screen must show a clear, minimal fallback rather than reuse Giant Sequoia facts for another Tree.

## Explicit implementation boundary

- The existing `getTree`, `getTreeImages`, `getTreeAudio`, `getPrimaryTreeImage`, and storage/media resolution logic are the only approved data-access path. No duplicate Supabase client, schema query layer, storage assumption, RLS adjustment, Mapbox integration, payment work, or write feature is needed.
- Route-shell behavior must follow the user’s supplied global-shell rule. The source’s hidden bottom navigation is an explicit detail-page exception; the shared shell must use that exception rather than adding navigation markup inside the page.
