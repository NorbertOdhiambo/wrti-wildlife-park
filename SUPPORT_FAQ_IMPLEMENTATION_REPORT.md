# Support & FAQ Implementation Report

## Summary

The `/help` route now renders the WRTI Support & FAQ screen from the authoritative Stitch `support_faq/screen-reference.html` source. The page is implemented as body content only and inherits the centralized WRTI Header and Bottom Navigation from `RootLayout`.

## Implemented

- Exact Stitch headline, subtitle, search placeholder, FAQ category labels, questions, answers, support-hours copy, and CTA label.
- Local Stitch semantic palette: mist background `#f0fbfe`, primary green `#006b2c`, low/lowest surfaces, outline colors, and semantic category colors.
- Libre Caslon Text display typography and Plus Jakarta Sans body typography.
- Responsive centered composition with mobile 20px gutters and desktop 64px gutters.
- Search input with visible search and microphone affordances.
- Single-open FAQ accordion with `aria-expanded`, `aria-controls`, a labeled answer region, chevron rotation, and source-matched transition timing.
- Local query filtering with a documented no-results state and clear-search action. This is a small usability enhancement because the Stitch source includes the search affordance but no search script.
- Contact Support presentation CTA with the exact source copy; no invented destination or support endpoint was introduced.
- Visible focus rings, semantic headings/sections, keyboard-operable buttons, and `prefers-reduced-motion` handling.

## Visual validation

The route was captured at 1280×900 and 390×844. Both compositions preserve the Stitch hierarchy, spacing rhythm, rounded accordion surfaces, category icon treatments, and contact card. The existing global shell remains responsible for route chrome; fixed bottom navigation may be omitted from full-page capture previews by the preview tool by design.

## Quality checks

- `npx tsc --noEmit`: passed.
- `pnpm run build`: passed.
- Existing non-blocking warnings remain for duplicate `skipLibCheck` in `tsconfig.json`, ignored legacy pnpm configuration keys, and a large generated JavaScript chunk. These warnings are unrelated to the Support & FAQ implementation.

## Source note

The uploaded `support_faq` export did not contain `code.html`; `screen-reference.html` was used as the authoritative HTML source. The implementation intentionally does not reproduce the source's duplicated Header/Bottom Navigation because the application-level shell correction requires those elements to live in `RootLayout`.
