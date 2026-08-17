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

- [x] Read the complete Dynamic Tree Detail requirements and inspect the Stitch export, current routes, repository operations, Tree contracts, and verified live media behavior.
- [x] Extract exact Stitch layout, copy, dynamic-field mappings, responsive rules, media states, and interaction contract.
- [x] Map only verified Tree, image, and audio fields to an explicit detail view model with safe fallbacks for missing optional fields.
- [x] Implement a dynamic `/trees/:treeId` route using existing Supabase repository and TanStack Query hooks without duplicating backend logic.
- [x] Preserve the centralized shell and connect only source-defined navigation and media interactions without adding Mapbox, payments, writes, or security changes.
- [x] Validate a real Tree record, invalid/loading/error/media-empty states, mobile/desktop fidelity, accessibility, reduced motion, tests, TypeScript, and production build.
- [x] Document verified field mappings, remaining limitations, update the checklist, and save a checkpoint.
- [x] Inspect the existing live Supabase client, repository, Tree types, query hooks, Discovery route, tests, and verification artifacts without code changes.
- [x] Re-run credential-safe read-only verification for runtime variable presence, Tree list/detail/image/audio reads, pagination, and anonymous access behavior.
- [x] Audit remaining Tree mock/static data and regression-check Landing, shared shell, routing, tests, and production build without modifying code.
- [x] Deliver a factual live-integration baseline covering verified fields, schema limits, mappings, query architecture, and the exact required final statuses.
- [x] Verify the running/build Vite environment exposes both required public Supabase variables without printing or committing their values.
- [x] Perform a minimal anonymous-client connectivity check and inspect the actual Tree, image, audio, storage, and public-read behavior without modifying Supabase.
- [x] Record verified schema, relationships, observed nullable fields, storage access, RLS observations, and database-to-application mappings before implementing concrete queries.
- [x] Implement concrete Tree list, detail, image, audio, storage, and pagination operations using only verified table and field names.
- [x] Connect exactly one approved Tree-related screen through TanStack Query while preserving its structure and leaving unrelated mock content untouched.
- [x] Validate live list/detail records, actual pagination, loading/empty/error states, anonymous permissions, accessibility, and visual fidelity without Mapbox or payment work.
- [x] Document remaining mock locations and verified live findings, then save a checkpoint.
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

## All Trees Directory

- [x] Inspect the full All Trees Directory requirements, Stitch export, and existing Tree repository, query hooks, Tree cards, and media-resolution behavior.
- [x] Audit existing support for real pagination, search, filters, sorting, Tree image retrieval, and card reuse; define only the smallest necessary extension.
- [x] Implement the dynamic All Trees Directory route using the established live Supabase Tree boundary with no hardcoded catalogue records or totals.
- [x] Reproduce source-defined responsive search, filters, sorting, pagination, loading, empty, missing-image, and card interactions using live Tree data.
- [x] Connect every displayed live Tree card to its existing dynamic detail route and preserve the centralized default shell unless the Stitch source explicitly requires an exception.
- [x] Validate real data behaviour, image robustness, keyboard accessibility, reduced motion, mobile/desktop fidelity, TypeScript, tests, and production build.
- [x] Document verified data mappings and limitations, update this checklist, save a checkpoint, and report the completed work.

## All Trees Directory Grid/List Toggle

- [x] Review the complete toggle requirements and current All Trees Directory implementation without changing the existing Tree data boundary.
- [x] Add a local default-grid presentation state and an accessible Grid/List segmented control in the existing directory control area.
- [x] Add a responsive list-row presentation that uses the same rendered Tree records, media-resolution logic, metadata, and dynamic detail links as the existing grid.
- [x] Preserve active search, Family/Species filters, pagination page, total count, and Tree results while switching presentation modes.
- [x] Validate Grid/List state changes, multiple live Tree-detail links, keyboard interactions, mobile/tablet/desktop layouts, reduced motion, TypeScript, tests, and production build.
- [x] Document the focused enhancement, update this checklist, save a checkpoint, and deliver the result.

## Mapbox Foundation and Live Tree Map

- [x] Read the complete Map phase requirements and inspect all approved Map specifications, Stitch source files, screenshots, assets, and current application implementation.
- [x] Audit the shared shell, routing, Tree repository/query hooks/types, media resolution, Discovery and Tree Detail screens, BottomSheet, existing map/location utilities, design tokens, offline behavior, and dependencies.
- [x] Verify the safe runtime presence of `VITE_MAPBOX_ACCESS_TOKEN` without reading, printing, committing, or duplicating configuration values.
- [x] Audit live Tree coordinate coverage and related nullable fields using read-only anonymous data access; do not fabricate coordinates or map records.
- [x] Define the smallest source-aligned Mapbox integration boundary, map state model, marker layer, selection behavior, camera constraints, search, location fallback, themes, and BottomSheet state flow.
- [x] Add Mapbox GL only if it is absent, then implement the real map surface, live markers, source-defined overlays, selected Tree preview, search, map controls, and existing dynamic Tree Detail transition.
- [x] Implement approved exploration/navigation state only where live routing/path data supports it; provide explicit graceful limitations where it does not.
- [x] Validate live marker data, mobile/tablet/desktop layouts, keyboard access, motion, location/offline/map-resource fallback states, tests, TypeScript, production build, and active browser console.
- [x] Document verified data mappings, supported behavior, technical limitations, validation evidence, update this checklist, save a checkpoint, and report the Map phase result.

## Map Live Implementation Verification & Fidelity Audit

- [x] Read the complete verification brief and establish the required data, interaction, visual-fidelity, responsiveness, performance, and failure-state checks without expanding Map scope.
- [x] Audit all 58 live Tree records into an explicit diagnostic table showing ID, name, coordinates, mappability, and the precise reason for every excluded marker.
- [x] Verify the Map query uses the complete repository-backed live collection, stable real Tree IDs, and correct `lat,lng` to `[lng,lat]` conversion without pagination, hardcoding, or duplicate data sources.
- [x] Verify marker selection, selected-marker treatment, selected preview, BottomSheet state persistence, existing Tree Detail handoff, and selection clearing using real records.
- [x] Verify the Map reuses the established BottomSheet and Tree-preview/media architecture; correct only documented alignment issues.
- [x] Verify live search, Tree image landscape/portrait/missing states, browser geolocation behavior, Map state handling, source-approved settings/layer semantics, and Stitch fidelity.
- [x] Verify actual mobile, tablet, and desktop interaction behaviour, including the approved desktop panel arrangement, safe areas, camera padding, controls, and touch targets.
- [x] Audit Mapbox lifecycle, query stability, marker lifecycle, event cleanup, camera updates, and genuine configuration/query/GPS/offline error handling; correct verified issues only.
- [x] Run focused regression, accessibility, console, TypeScript, tests, and production-build checks; document the diagnostic data, findings, corrections, limitations, and checkpoint result.

## WRTI Map Visual / UX Reimplementation

- [x] Complete the major Map reimplementation brief and inspect the supplied Map Stitch source, code, visual states, assets, responsive behavior, and current Mapbox package/configuration boundary.
- [x] Confirm direct `mapbox-gl` usage, installed version, canonical runtime token variable, runtime token presence, and absence of hardcoded token values without exposing credentials.
- [x] Reconfirm the live 58-record Tree collection and data-driven mappable subset without hardcoding a marker count or excluding valid coordinates.
- [x] Audit the existing reusable TreeCard preview variant, MapLayout, BottomSheet desktop-side-panel support, and current TreeMap implementation before changing the responsive composition.
- [x] Rebuild the Map visual system from the authoritative Stitch source: WRTI control styling, custom marker hierarchy, search, environmental treatment, selected Tree preview, and source-aligned motion.
- [x] Implement an intentional desktop Map composition with a dedicated responsive left-side Tree/Map information rail that reflows the map canvas, as specified by the authoritative desktop HTML; retain the shared BottomSheet architecture for mobile only.
- [x] Preserve live Supabase Tree data, stable Tree IDs, coordinate adapter, direct Mapbox GL integration, selected Tree camera behavior, search, media fallback, Tree Detail handoff, settings, location recovery, and no fabricated geographic data.
- [x] Validate real marker count derivation, selected/unselected states, search-to-preview flow, desktop side-panel behavior, mobile BottomSheet behavior, responsive camera clearance, keyboard access, reduced motion, live error recovery, screenshots, TypeScript, tests, and production build.
- [x] Document the reimplementation scope, Mapbox package/version/token safety, data behavior, visual corrections, responsive states, limitations, validation evidence, update this checklist, save a checkpoint, and deliver the Map result.

## WRTI Map Canvas Focus Pass

- [x] Read the complete Map Canvas Focus Pass requirements, the authoritative mobile and desktop Stitch HTML, and the current Map implementation without changing the established live data boundary.
- [x] Verify direct `mapbox-gl` usage, package version, canonical `VITE_MAPBOX_ACCESS_TOKEN` configuration, live coordinate validation, and existing Map lifecycle without exposing credentials.
- [x] Temporarily defer mobile BottomSheet rendering through a clear Map-level boundary while preserving all BottomSheet components, types, states, safe-area support, and future re-enable path.
- [x] Refine the source-faithful Map canvas, live Tree markers, selected-marker state, search, controls, geolocation recovery, camera behavior, and desktop Discovery rail without fabricating spatial data or adding unsupported features.
- [x] Define and implement source-supported desktop, tablet, and mobile compositions; preserve the desktop left Discovery rail only where the authoritative HTML specifies it.
- [x] Validate live marker derivation, Mapbox lifecycle, marker/search/selection flows, location handling, keyboard and reduced-motion behavior, mobile/tablet/desktop screenshots, approved route regressions, TypeScript, tests, and production build.
- [x] Document exact Mapbox/data/responsive/deferred behavior and remaining visual deviations, complete the checklist, save a checkpoint, and report only the Map Canvas Focus Pass as complete.
