# About WRTI Wildlife Park — Implementation Checklist

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
