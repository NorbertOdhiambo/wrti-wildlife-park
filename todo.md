# About WRTI Wildlife Park — Implementation Checklist

## Support & FAQ Screen

- [x] Inspect the complete `support_faq` Stitch HTML, styles, assets, icons, and interactions.
- [x] Extract exact Support & FAQ content, visual tokens, responsive rules, and motion behavior.
- [x] Implement the Support & FAQ page body without duplicating the global shell.
- [x] Implement source-defined FAQ search, category/filter behavior, accordions, contact actions, and empty states.
- [x] Add the Support route with the default global Header and Bottom Navigation unless an explicit exception is found.
- [x] Validate responsive behavior, keyboard accessibility, focus states, and reduced motion.
- [x] Run TypeScript/build checks and compare the React route against the authoritative HTML.
- [x] Document implementation notes and save a checkpoint.

## Contact Support Screen

- [x] Inspect the complete `contact_support` Stitch HTML, assets, icons, and interactions.
- [x] Extract exact Contact Support content, visual tokens, responsive rules, form states, and motion behavior.
- [x] Implement the Contact Support page body without duplicating the global shell.
- [x] Implement frontend-only form interaction, validation, loading, error, and non-fabricated submission states.
- [x] Add the Contact Support route and connect it from Support & FAQ where appropriate.
- [x] Validate responsive behavior, keyboard accessibility, focus states, and reduced motion.
- [x] Run TypeScript/build checks and compare the React route against the authoritative HTML.
- [x] Document implementation notes and save a checkpoint.

## Global Application Shell Correction

- [x] Inspect the current router, RootLayout, Header, Bottom Navigation, and page-level shell usage.
- [x] Define a shared route-level shell configuration with default-on Header and Bottom Navigation.
- [x] Configure explicit documented opt-outs for transactional or immersive routes only where required.
- [x] Move global shell rendering to the shared application layout without changing page bodies.
- [x] Remove duplicate Header and Bottom Navigation implementations from individual pages.
- [x] Validate all visitor-facing routes for consistent shell behavior and correct active navigation state.
- [x] Validate responsive behavior, accessibility, TypeScript, and production build health.
- [x] Document the shell architecture and save a final checkpoint.

- [x] Inspect the complete `about_wrti_wildlife_park` Stitch HTML and identify its exact source filename.
- [x] Extract the About page body structure, exact copy, colors, typography, assets, responsive rules, and motion.
- [x] Ignore the corrupted About screenshot and omit the Stitch global header/navigation from the page body.
- [x] Implement the About page as a dedicated React route using the existing WRTI architecture.
- [x] Reuse existing WRTI primitives only where they preserve Stitch fidelity.
- [x] Preserve exact imagery, content, layout relationships, and section ordering from the Stitch HTML.
- [x] Add reduced-motion support and accessible semantics/focus states.
- [x] Validate mobile portrait first, then mobile landscape, tablet, and desktop layouts.
- [x] Run TypeScript, build, and visual validation checks without modifying completed screens.
- [x] Document any remaining HTML-to-React differences and save a final project checkpoint.

## Exploration Progress Screen

- [x] Extract and inspect the complete Exploration Progress Stitch export, screenshot, assets, icons, and interactions.
- [x] Extract exact Exploration Progress content, visual tokens, responsive rules, and motion behavior.
- [x] Implement the Exploration Progress page body without duplicating the global shell.
- [x] Implement only source-defined progress interactions and isolate replaceable screen data.
- [x] Connect the source-defined View All action to the existing Discovery route without implementing Mapbox.
- [x] Add the Exploration Progress route with the default global Header and Bottom Navigation.
- [x] Validate mobile-first responsive behavior, semantic progress indicators, keyboard accessibility, focus states, and reduced motion.
- [x] Run TypeScript/build checks, compare the React route against the authoritative HTML, document notes, and save a checkpoint.
