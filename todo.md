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
- [x] Correct the Bookmarked Flora grid to match the Stitch `grid-cols-2 md:grid-cols-3` layout and third-card visibility rule.

## Settings & Preferences Screen

- [x] Extract and inspect the complete Settings & Preferences Stitch export, screenshot, assets, icons, and interactions.
- [x] Extract exact settings content, visual tokens, responsive rules, functional controls, navigation, and motion behavior.
- [x] Implement the Settings & Preferences page body without duplicating the global shell.
- [x] Integrate source-defined controls with the existing settings architecture and persistence where appropriate.
- [x] Connect source-defined navigation to existing WRTI routes without inventing unsupported product areas.
- [x] Add the Settings route with the default global Header and Bottom Navigation.
- [x] Validate mobile-first fidelity, responsive behavior, keyboard accessibility, focus states, contrast, and reduced motion.
- [x] Run TypeScript/build checks, compare against the authoritative HTML, document notes, and save a checkpoint.

## Offline Downloads Screen

- [x] Locate and inspect the complete Offline Downloads Stitch export, authoritative HTML, assets, corrupted screenshot status, icons, and interactions.
- [x] Extract exact Offline Downloads content, visual tokens, responsive rules, download states, progress behavior, network treatment, and motion.
- [x] Reuse or extend the existing Offline architecture with a replaceable single-park package abstraction.
- [x] Implement the Offline Downloads page body without duplicating the global shell.
- [x] Implement realistic source-defined download, update, remove, retry, and progress interactions where represented.
- [x] Add the Offline Downloads route and connect source-defined entry points to it.
- [x] Validate mobile-first fidelity, responsive behavior, network-aware states, keyboard accessibility, focus states, contrast, and reduced motion.
- [x] Run TypeScript/build checks, compare against the authoritative HTML, document notes, and save a checkpoint.

## Landing Page Stitch Fidelity Correction

- [x] Locate and inspect the original Landing Page Stitch HTML, screenshot, assets, icons, and source-defined interactions.
- [x] Extract exact Landing composition, copy, palette, typography, hero crop, sections, responsive rules, and animation behavior.
- [x] Compare the current Landing route, shared shell, and existing assets against the Stitch specification and isolate fidelity gaps.
- [x] Reimplement the Landing page body and any safe Header/Bottom Navigation variants needed for Stitch fidelity without changing unrelated screens.
- [x] Connect source-defined purchase, map, discovery, and header actions to existing routes without fabricating backend behavior.
- [x] Validate mobile-first pixel fidelity, responsive behavior, accessibility, focus states, reduced motion, and interaction behavior.
- [x] Run TypeScript/build checks, document source notes and deviations, update the checklist, and save a checkpoint.

## Supabase Integration & Typed Data Layer

- [x] Record the no-live-credentials Supabase foundation boundary and avoid all schema, storage, credential, RLS, migration, and real-data assumptions.
- [x] Inspect existing Tree static-data migration points and document them without connecting screens to unverified data.
- [x] Install the frontend Supabase client dependency and document the platform-managed secret workflow; no local `.env` or `.env.example` was created.
- [x] Add an environment-only centralized client that has a clear configuration error path but no fallback credentials.
- [x] Create initial WRTI application contracts and schema-independent Tree repository interfaces, query keys, and disabled-until-configured hooks.
- [x] Add focused foundation tests, validate existing visual routes remain unchanged, and document the deferred live-schema work.
- [x] Read the full backend requirements and inspect the current data architecture, dependencies, environment configuration, TanStack Query setup, stores, Tree code, and tests.
- [x] Diagnose the Manus-managed `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` configuration, Vite runtime exposure, restart need, and local environment-file hygiene without reading or exposing secret values.
- [x] Report the unavailable runtime configuration and required secret-management path before attempting schema inspection or database integration.
- [x] Defer actual Supabase schema, storage configuration, and anonymous-client permission inspection until live public variables are available.
- [x] Document intended database-to-domain mappings and current access limitations without claiming verified schema findings.
- [x] Add a centralized environment-driven Supabase client at the architecture-compatible `src/utils/api.ts` boundary.
- [x] Add Tree, TreeImage, TreeAudio, location, pagination, and navigation application contracts without inventing database fields.
- [x] Implement reusable Tree repository interfaces for pagination, individual trees, images, audio, primary images, and storage URL resolution; live operations remain intentionally deferred.
- [x] Add TanStack Query hooks and query keys that keep server state outside Zustand and Supabase details out of components.
- [x] Add focused configuration and contract-boundary tests; validate TypeScript, build, and unchanged visual routes while deferring real anonymous access validation.
- [x] Document the reusable data layer, update the checklist, and save a checkpoint.
