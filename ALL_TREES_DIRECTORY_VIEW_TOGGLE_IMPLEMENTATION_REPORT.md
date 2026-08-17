# All Trees Directory Grid/List Toggle Implementation Record

## Completed enhancement

The live `/trees` directory now includes a compact local **Grid / List** segmented control in the existing search-and-status control area. **Grid** is the default presentation and remains visually selected on first load, as established by the supplied reference. **List** changes only the rendering layout of the already-loaded page result; no search, filter, pagination, media, route, repository, or Supabase behaviour is recreated or replaced.

| Concern | Implemented behavior |
| --- | --- |
| Control semantics | The existing Radix-backed `ToggleGroup` provides a labelled single-selection radio group with active state and visible keyboard focus. |
| Default state | Component-local `viewMode` starts as `grid`. |
| Grid presentation | Preserves the established responsive `1 → 2 → 3 → 4` live catalogue grid. |
| List presentation | Reuses each same `DirectoryCard`, `Tree`, resolved primary image, fallback state, family label, and `/trees/:id` link in a compact horizontal row. |
| Responsive media rows | Rows use a fixed 144px mobile / 160px tablet-and-up height, preventing portrait-oriented source images from expanding a list record. |
| Data preservation | Switching presentation leaves active query parameters, the loaded page, result count, filters, and detail destinations unchanged. |

## Accessibility and scope limits

Both choices include icon and text labels, accessible radio semantics, active-state feedback, keyboard focus treatment, and keyboard navigation/activation. The associated Tree cards remain full-row semantic links with their existing descriptive labels. The page-local CSS continues to respect `prefers-reduced-motion`.

The toggle is intentionally a **local, ephemeral presentation preference**. It is not persisted, written to Supabase, added to global state, or encoded in the URL. This preserves the requirement that Grid/List must not become a new data, navigation, or product-preference architecture.

## Validation record

| Check | Outcome |
| --- | --- |
| Default Grid state | Confirmed on the live 58-record collection. |
| Pointer toggle | Grid → List → Grid changed only presentation and retained the page-one live records and filters. |
| Compact list rows | Confirmed with both unavailable-media fallbacks and real Supabase images. |
| Keyboard interaction | `ArrowRight` moved focus from Grid to List; `Space` selected List. The active DOM state became `role="radio"`, `aria-checked="true"`, and `data-state="on"` for List. |
| Responsive grid presentation | Reviewed at `390×844`, `768×1024`, and `1280×900`. |
| TypeScript | `pnpm run check` passed. |
| Tests and production build | `pnpm test --run && pnpm run build` passed. |

The pre-existing duplicate `skipLibCheck` warning and production bundle-size advisory remain unchanged. The live directory itself compiled, loaded, and completed all interaction checks without a new client-side error.
