# All Trees Directory — Stitch Source Notes

## Authoritative sources reviewed

- `/home/ubuntu/upload/all_trees_directory/screen-reference.html` is the visual and interaction authority.
- `/home/ubuntu/upload/all_trees_directory/screen.png` is the secondary visual reference.
- The live Supabase Tree collection is the content authority. Stitch's four sample cards, user avatar, discovery count, conservation chips, and bookmark controls are reference presentation only and must not become static application content.

## Page and shell composition

The Stitch HTML is a mobile-first visitor directory on `#f0fbfe`, set in Libre Caslon Text for headings and Plus Jakarta Sans for body/UI text. It defines a fixed translucent 64px top bar, a sticky search-and-filter block below that bar, a `1 → 2 → 3 → 4` card grid at the `sm`, `lg`, and `xl` breakpoints, and a mobile Bottom Navigation. The established WRTI global shell must supply Header and Bottom Navigation rather than duplicating those source structures within the page.

## Source-defined controls

| Region | Source treatment | Dynamic implementation constraint |
| --- | --- | --- |
| Search | Full-width, 48px high, rounded pill with leading search icon and placeholder “Search the botanical collection...” | Must query/filter real Tree data and debounce database-triggering input. |
| Status pill | Eco icon plus “Discovered 42/150” | No verified visitor-discovery capability: do not fabricate counts. |
| View toggle | Single grid-view icon button | No second source view is defined; preserve as non-invented visual control only if needed. |
| Filter chips | All Trees, Nearby, Favorites, Species, Family, Recently Discovered | Nearby, Favorites, and Recently Discovered require unsupported visitor/location/history data and must not be fabricated. Species and Family must use only real, data-derived values if retained. |
| Cards | White rounded cards; fixed 192px media band; cover image; lower-left conservation code; upper-right bookmark; common name, italic species, family pill | Tree names, images, metadata, status, and bookmarks are all dynamic or must use graceful unavailable/no-auth fallbacks. No sample content may be copied. |
| Bottom Navigation | Mobile only, Directory active | Supplied by the approved global WRTI shell; do not duplicate it. |

## Visual tokens and responsive rules

The source uses `#006b2c` primary, `#f0fbfe` background/surface, `#ffffff` card surface, `#bdcaba` outline variant, `#3e4a3d` muted foreground, `#a4f5b6`/`#88d89c` secondary greens, 12px card radius, 16px standard gaps, 20px mobile gutters, and 64px desktop gutters. Tree images use `object-fit: cover`; hover scale is limited to 105% over 500ms, and cards raise only from small to medium shadow. The visual hierarchy is title, italic species, then a family chip.

## Dynamic-data constraints established from the source and task

- Use the existing `useTrees`, Tree repository, TanStack Query keys, primary-image resolver, and media URL resolver; do not create a direct Supabase page query or another client/repository.
- Derive displayed records, total count, pagination, real search results, filtering options, and card links from live data.
- Missing images need a deliberate non-deceptive nature fallback in the 192px image region; an image failure must affect only that card.
- No verified conservation-status field is available for card overlays, so no Stitch sample code may be shown.
- No favorites, visitor discovery count, nearby state, recently discovered state, Mapbox, payments, authentication writes, or backend/schema/RLS/storage changes are permitted.
- All card links must resolve to the real existing `/trees/:id` Tree Detail route.

## Initial rendered validation findings

The live route rendered 58 Tree records with the source-defined `1 / 2 / 3 / 4` responsive grid. At `390×844`, the page retained its one-column card sequence, 20px mobile gutter, 48px search pill, live count, filter controls, and the existing global header. At `1280×900`, the first paginated result set rendered in four image-led columns with the source-defined card proportions, image fallback treatment, family pill, and pagination controls. The test data includes both real primary images and no-image records, and each condition visibly received its intended per-card presentation without blocking the collection.

The live search accepted the verified scientific-name term `Grevillea` and reduced the result count from 58 to the one real `Silky Oak` record. This confirms the implemented live search boundary covers verified common-name, species, and family fields rather than only source sample copy.

The Family control opened an accessible listbox populated with values derived from the connected collection, including `Acanthaceae`, `Apocynaceae`, `Asphodeleaceae`, `Asteraceae`, and `PROTEACEAE`. The control retained its source-style pill appearance while avoiding unsupported static filter options.

Selecting the live `Apocynaceae` filter returned exactly two real records, `Climbing num-num` and `Common oleander`, and updated the visible count to `2 Trees`. Opening `Climbing num-num` from the filtered card reached the existing live detail route at `/trees/70`, which rendered that Tree's real narrative, family, and available audio metadata. This confirms directory cards use the established record identity and do not route to static sample content.

A deliberately non-matching live search term produced the intended zero-result state: `0 Trees`, “No trees match your search.”, the source-compatible recovery text, and the “Clear search and filters” action. The result state stayed within the existing WRTI shell and did not fail, spin indefinitely, or replace live collection content with mock records.

The first-page Next control advanced to `Page 2 of 5` and replaced the visible cards with the next live alphabetical records, including `Curve-leaf yucca`, `Diamond-leaved Euclea`, and `Dragon’s blood tree or orange-milk tree`. Pagination remains client state over the existing repository pagination contract; it does not preload or hardcode the complete record set.
