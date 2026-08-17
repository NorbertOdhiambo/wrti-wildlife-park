# All Trees Directory Implementation Record

## Completed scope

The live **All Trees Directory** is available at `/trees`. It recreates the supplied mobile-first Stitch composition while retaining the approved global WRTI Header and Bottom Navigation. The route is part of the existing Discovery navigation grouping; it is not a new shell or information architecture.

The directory consumes the established Supabase Tree repository and TanStack Query architecture. It does not add a direct page-level Supabase query, a second client, mocked Tree content, authentication, writes, Mapbox, payment logic, schema changes, storage changes, RLS changes, or service-role credentials.

| Directory capability | Live implementation | Source-safe behavior |
| --- | --- | --- |
| Tree catalogue | Paginated `trees` collection ordered by `common_name` | The rendered total, page count, and records come from live data. |
| Search | Debounced common-name, species, and family search | Search uses the existing collection boundary, resets pagination, and supports an explicit empty state. |
| Taxonomy filters | Live Family and Species values | Options are derived only from non-empty values in the connected Tree collection. |
| Card media | Batched primary image lookup through `tree_images` | One collection media query avoids an N+1 card request pattern. A missing or failed image affects only its own card. |
| Card information | `common_name`, `species`, and `family` | Missing optional values show a clearly labelled unavailable value rather than invented tree data. |
| Card navigation | Semantic links to `/trees/:id` | Every rendered record opens the established dynamic Tree Detail experience. |

## Focused Tree feature extension

The smallest required extension was added inside the existing Tree feature boundary. `TreeListInput` now accepts optional `family` and `species` filters; `SupabaseTreeRepository.getTrees` applies those filters together with the existing search and pagination. `getPrimaryTreeImages(treeIds)` resolves collection media in one `tree_images` query, and `getTreeTaxonomyFacets()` provides distinct live Family and Species values for the filter controls.

The corresponding TanStack Query hooks reuse the existing Tree query-key family. They are guarded by the established configuration test and retain bounded retry and stale-time behavior. The page itself remains a consumer of this public feature API rather than a repository owner.

## Source fidelity and intentional limits

The page retains the source’s pale `#f0fbfe` surface, 48px search control, green active filter treatment, 192px card-media band, family chip, display/italic type hierarchy, responsive `1 → 2 → 3 → 4` grid, pagination controls, visible focus treatment, and reduced-motion-safe interaction treatment. The shared application shell supplies the source’s surrounding visitor navigation instead of duplicating it in the page.

The supplied Stitch presentation includes a discovery-progress count, nearby/favourites/recently-discovered filters, conservation overlay codes, and active bookmarks. No verified visitor-progress, geolocation, favourite persistence, conservation-status, or authenticated visitor capability exists in the current application contracts. These unsupported behaviours are deliberately not fabricated. The status pill therefore displays the live collection total; taxonomy filters are retained because their values are verified live data.

## Validation record

| Check | Outcome |
| --- | --- |
| Live catalogue data | Confirmed 58 live records and five real result pages. |
| Primary image and missing-image cases | Confirmed on the initial and second live result pages. |
| Scientific-name search | `Grevillea` returned the one live `Silky Oak` record. |
| Family filter | `Apocynaceae` returned the two matching live records. |
| Empty state | A non-matching term returned `0 Trees` with the recovery action. |
| Pagination | Next advanced from Page 1 of 5 to Page 2 of 5 with the next live records. |
| Card navigation | A filtered `Climbing num-num` card opened `/trees/70`. |
| Responsive visual checks | Reviewed at mobile `390×844` and desktop `1280×900`. |
| Browser console | No active client-side output after the interaction checks. |
| TypeScript | `pnpm run check` passed. |
| Test and production build command | `pnpm test --run && pnpm run build` completed successfully. |

The project retains its pre-existing, non-blocking build notices: duplicate `skipLibCheck` configuration and a bundle-size advisory. Earlier, stale development-server log entries about `DiscoveryJournal.css` did not recur in the active browser or TypeScript validation and did not affect the completed directory route.
