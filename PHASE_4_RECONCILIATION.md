# Phase 4 Reconciliation Plan

## Executive Summary

This document reconciles Phase 3 findings with the existing Phase 1 & Phase 2 codebase, the approved WRTI product specifications, and the Stitch AI design export. It identifies genuine implementation gaps, visual-only differences, and future features that should not be implemented in this phase.

---

## 1. Phase 3 Findings Classification

### 1.1 Genuine Implementation Gaps (Must Implement)

These are real gaps in the Phase 2 design system that are required by the approved WRTI product architecture:

| Finding | Category | Action | Rationale |
|---------|----------|--------|-----------|
| Typography: Libre Caslon Text & Plus Jakarta Sans | Visual | Integrate fonts | Required for visual fidelity and brand identity |
| Color tokens: Extend semantic colors (primary-container, surface variants, etc.) | Visual | Extend tokens | Stitch uses granular semantic colors; Phase 2 needs extension |
| Icon architecture: Centralize Material Symbols | Visual | Create abstraction | Stitch uses Material Symbols; need centralized icon system |
| Header components (App, Detail, Map) | Component | Implement | Required by WRTI navigation model |
| Bottom Navigation component | Component | Implement | Required by WRTI navigation model (4-tab: Map, Discovery, Tickets, Profile) |
| MapLayout primitive | Component | Implement | Required by WRTI map-first architecture |
| ContentLayout primitive | Component | Implement | Required for detail pages, forms, informational screens |
| CollectionLayout primitive | Component | Implement | Required for list/grid views (species, tickets, settings) |
| BottomSheet foundation | Component | Implement | Required by WRTI interaction model for contextual content |
| Map control primitives (zoom, layers, locate, FAB) | Component | Implement | Required by WRTI map experience |
| Avatar component | Component | Implement | Required by profile and discovery screens |
| Offline Banner | Component | Implement | Required by WRTI offline support |
| Status indicators (sync, GPS, etc.) | Component | Implement | Required by WRTI system feedback |

### 1.2 Visual-Only Differences (No Implementation Required)

These are visual variations that Phase 2 already supports through existing component variants and theming:

| Finding | Phase 2 Support | Action |
|---------|-----------------|--------|
| Button variants (primary, secondary, outline, ghost, destructive, success) | Already supported | Use existing Button component |
| Card variants (standard, interactive, elevated, outlined) | Already supported | Use existing Card component |
| Badge variants (success, warning, danger, info, neutral) | Already supported | Use existing Badge component |
| Chip variants (selected, unselected, disabled, removable) | Already supported | Use existing Chip component |
| Input field states (empty, filled, focused, error, disabled) | Already supported | Use existing Input component |
| Dialog/Modal layouts | Already supported (shadcn/ui Dialog) | Use existing Dialog component |
| Progress indicators | Already supported | Use existing Progress component |
| Loading spinners | Already supported | Use existing Spinner component |
| Empty state components | Already supported | Use existing EmptyState component |
| Error state components | Already supported | Use existing ErrorState component |
| Responsive breakpoints | Already supported | Use existing useBreakpoint hook |

### 1.3 Future Features (Do NOT Implement)

These are features identified in Phase 3 that are not part of the approved MVP and should not be implemented in Phase 4:

| Feature | Reason for Deferral |
|---------|-------------------|
| `living_map_navigation` (dynamic real-time overlays) | Future phase feature |
| `botanical_directory_desktop_grid` (desktop-specific layout) | Desktop optimization, not MVP |
| `animated_splash_experience` (animated loading screen) | Visual enhancement, not critical |
| `wilderness_intelligence` (analytics dashboard) | Advanced feature, not MVP |
| `your_ecological_journey` (progress tracking) | Gamification, not MVP |
| `contextual_storytelling_the_understory` (immersive storytelling) | Advanced educational content, not MVP |
| `premium_park_packs` (premium upselling) | Monetization feature, not MVP |
| Audio player component | Feature-specific; implement during audio guide feature |
| QR code display component | Feature-specific; implement during ticket feature |
| Training module card | Feature-specific; implement during profile feature |
| Achievement card | Feature-specific; implement during profile feature |
| Nature insight card | Feature-specific; implement during tree detail feature |

### 1.4 Stitch Screens: Routes vs. States/Variants

The Stitch export contains 40 screens. Not all are separate routes; many are states, variants, or supporting experiences:

| Screen | Classification | Route? | Notes |
|--------|-----------------|--------|-------|
| `landing_page` | Route | Yes | Entry point |
| `main_map_navigation` | Route | Yes | Primary map experience |
| `discovery_map` | Route | Yes | Discovery journal view |
| `active_navigation` | State | No | State of `main_map_navigation` when route is active |
| `living_map_navigation` | Future variant | No | Future enhancement of `main_map_navigation` |
| `tree_detail_giant_sequoia` | Route | Yes | Species detail (template) |
| `species_detail` | Route | Yes | Generic species detail |
| `species_exploration` | Route | Yes | Species browsing/filtering |
| `all_trees_directory` | Route | Yes | Complete species directory |
| `botanical_directory_desktop_grid` | Responsive variant | No | Desktop variant of `all_trees_directory` |
| `ticket_selection` | Route | Yes | Ticket purchase flow |
| `tickets_wallet` | Route | Yes | Ticket management |
| `qr_ticket_experience` | Route | Yes | QR code display (detail of ticket) |
| `payment_page` | Route | Yes | Payment form |
| `payment_processing` | State | No | Loading state during payment |
| `payment_success` | State | No | Success state after payment |
| `payment_failure` | State | No | Error state during payment |
| `unlock_map_access` | Dialog/Modal | No | Feature gate (modal overlay) |
| `premium_park_packs` | Route | Deferred | Future monetization feature |
| `contextual_storytelling_the_understory` | Route | Deferred | Future educational feature |
| `your_ecological_journey` | Route | Deferred | Future gamification feature |
| `exploration_progress` | Route | Deferred | Future progress tracking |
| `wilderness_intelligence` | Route | Deferred | Future analytics feature |
| `search_discovery` | Route | Yes | Search interface |
| `offline_mode_explorer` | State | No | Offline mode indicator (state of any screen) |
| `offline_downloads` | Route | Yes | Offline content manager |
| `gps_signal_unavailable` | Dialog/Modal | No | GPS error (modal overlay) |
| `syncing_live_data` | State | No | Loading state (overlay) |
| `explorer_profile` | Route | Yes | User profile |
| `settings_preferences` | Route | Yes | Settings hub |
| `map_settings` | Route | Yes | Map-specific settings |
| `support_faq` | Route | Yes | FAQ support |
| `contact_support` | Route | Yes | Support contact form |
| `about_wrti_wildlife_park` | Route | Yes | About page |
| `adaptive_environmental_theme_dusk` | Variant | No | Theme variant (not a route) |
| `immersive_map_desktop_adaptation` | Responsive variant | No | Desktop variant of map |
| `animated_splash_experience` | Route | Deferred | Animated loading screen (future) |
| `splash_screen` | Route | Yes | Static loading screen |
| `empty_favorites_journal` | State | No | Empty state of `discovery_map` |
| `no_search_results` | State | No | Empty state of `search_discovery` |

**Summary**: Of 40 Stitch screens, approximately 24 are distinct routes, 10 are states/variants, 4 are deferred future features, and 2 are responsive variants.

---

## 2. Component Extension vs. New Implementation

### 2.1 Components to Extend (Phase 2 → Phase 4)

These components exist in Phase 2 but need visual alignment or prop extensions:

| Component | Current State | Required Extension |
|-----------|---------------|-------------------|
| Typography (H1-H4, Display, Body, etc.) | Exists | Map to Libre Caslon Text and Plus Jakarta Sans; adjust sizes/weights |
| Button | Exists | Ensure all Stitch variants are supported |
| Card | Exists | Ensure all Stitch variants are supported |
| Badge | Exists | Ensure all Stitch variants are supported |
| Chip | Exists | Ensure all Stitch variants are supported |
| Input | Exists | Ensure all Stitch variants are supported |
| Dialog | Exists (shadcn/ui) | Ensure visual alignment with Stitch |
| Progress | Exists | Ensure visual alignment with Stitch |
| Spinner | Exists | Ensure visual alignment with Stitch |
| EmptyState | Exists | Ensure visual alignment with Stitch |
| ErrorState | Exists | Ensure visual alignment with Stitch |
| Stack/HStack/Grid | Exists | Already support Stitch spacing |
| Container/Section | Exists | Already support Stitch spacing |

### 2.2 Components to Implement (New in Phase 4)

These components do not exist in Phase 2 and must be implemented:

| Component | Purpose | Ownership |
|-----------|---------|-----------|
| App Header | Top navigation for main screens | Design System |
| Detail Header | Back button + title for detail screens | Design System |
| Map Header | Search + profile for map screens | Design System |
| Bottom Navigation | 4-tab persistent navigation | Design System |
| MapLayout | Full-screen map + overlays | Design System |
| ContentLayout | Scrollable content with hero section | Design System |
| CollectionLayout | List/grid + header/footer | Design System |
| BottomSheet | Draggable bottom panel | Design System |
| Map Controls | Zoom, layers, locate buttons | Design System |
| Floating Action Button (FAB) | Floating action button | Design System |
| Avatar | User profile image | Design System |
| Offline Banner | Offline status indicator | Design System |
| Icon abstraction | Centralized icon system | Design System |

---

## 3. Reconciliation Decisions

### 3.1 Typography Decision

**Decision**: Integrate Libre Caslon Text and Plus Jakarta Sans into the existing typography system.

**Rationale**: The Stitch designs use these specific fonts for visual identity. Phase 2 already has a robust typography component system; we extend it with the correct font families.

**Implementation**:
1. Add Google Fonts links to `client/index.html`
2. Update Tailwind `font-sans` and `font-serif` in `client/src/index.css` to use the new fonts
3. Map existing typography components to the correct fonts:
   - Display, H1, H2, H3 → Libre Caslon Text (serif)
   - Body, Label, Caption, Button → Plus Jakarta Sans (sans-serif)
4. Adjust font sizes and weights to match Stitch designs

### 3.2 Color Token Decision

**Decision**: Extend Phase 2 color tokens with Stitch semantic colors, converting hex to OKLCH.

**Rationale**: Stitch uses granular semantic colors (primary-container, surface variants, etc.) that Phase 2 doesn't fully support. We extend the token system without replacing it.

**Implementation**:
1. Review Stitch color palette (extracted in Phase 3)
2. Map Stitch colors to semantic meanings
3. Convert hex colors to OKLCH format
4. Add new tokens to `client/src/design-system/tokens.ts`
5. Update CSS variables in `client/src/index.css`
6. Preserve light/dark theme architecture

### 3.3 Icon Architecture Decision

**Decision**: Create a centralized icon abstraction that uses Material Symbols Outlined, with fallback to Lucide where Material Symbols are unavailable.

**Rationale**: Stitch uses Material Symbols, but Lucide is already integrated. Rather than ripping out Lucide, we create a clean abstraction that allows us to use Material Symbols where needed while maintaining compatibility.

**Implementation**:
1. Create `client/src/design-system/icons/index.ts` as the centralized icon export
2. Integrate Material Symbols Outlined (via Google Fonts or CDN)
3. Create an `Icon` component that wraps Material Symbols
4. Document the icon mapping for common use cases
5. Gradually migrate from Lucide to Material Symbols as needed

### 3.4 Component Ownership Decision

**Decision**: All reusable components implemented in Phase 4 belong to the Design System, not individual features.

**Rationale**: These are foundational UI primitives required by multiple screens and features. They should be feature-agnostic and reusable.

**Implementation**:
1. All new components go into `client/src/design-system/components/`
2. Feature-specific components (e.g., TreeCard, DiscoveryCard) will be implemented in their respective feature modules during Phase 5+
3. Document the distinction clearly

---

## 4. Implementation Scope for Phase 4

### 4.1 Must Implement

1. Typography alignment (Libre Caslon Text, Plus Jakarta Sans)
2. Color token extension (Stitch semantic colors in OKLCH)
3. Icon architecture (Material Symbols + centralized abstraction)
4. App Header component
5. Detail Header component
6. Map Header component
7. Bottom Navigation component
8. MapLayout primitive
9. ContentLayout primitive
10. CollectionLayout primitive
11. BottomSheet foundation
12. Map control primitives (zoom, layers, locate, FAB)
13. Avatar component
14. Offline Banner component
15. Status indicator extensions
16. Responsive design for all components
17. Accessibility compliance for all components
18. Component documentation
19. Component tests (basic)

### 4.2 Must NOT Implement

1. Mapbox integration
2. Tree markers or discovery logic
3. Search functionality
4. Filtering logic
5. Navigation routing
6. GPS tracking
7. Discovery tracking
8. Tree Detail business logic
9. Offline data synchronization
10. API integrations
11. Mock backend data
12. Application pages/screens
13. Feature-specific business logic

---

## 5. Assumptions Made

1. **Fonts**: Libre Caslon Text and Plus Jakarta Sans are available via Google Fonts
2. **Material Symbols**: Material Symbols Outlined can be integrated via Google Fonts or CDN
3. **Color Conversion**: Stitch hex colors can be accurately converted to OKLCH format
4. **Responsive Design**: Stitch provides sufficient reference for mobile, tablet, and desktop breakpoints
5. **Accessibility**: WCAG 2.1 AA compliance is the target
6. **Component API**: Existing Phase 2 component APIs are sufficient; no breaking changes needed
7. **Routing**: React Router v7 (already installed) will handle navigation; Phase 4 doesn't implement routes

---

## 6. Unresolved Technical Questions

1. **Material Symbols Integration**: Should we use Google Fonts CDN or npm package? (Decision: CDN for simplicity)
2. **Icon Fallback**: How should we handle Material Symbols that don't exist in Lucide? (Decision: Use Material Symbols directly; document mapping)
3. **BottomSheet Animation**: Which animation library should we use? (Decision: Framer Motion, already installed)
4. **MapLayout Provider**: Should MapLayout be agnostic to map provider? (Decision: Yes, map-provider agnostic)
5. **Responsive Breakpoints**: Should we use Tailwind defaults or custom breakpoints from Stitch? (Decision: Tailwind defaults + custom tokens where Stitch specifies)

---

## 7. Next Steps

1. **Phase 2**: Implement typography alignment
2. **Phase 3**: Extend color tokens
3. **Phase 4**: Establish icon architecture
4. **Phase 5**: Implement header components
5. **Phase 6**: Implement bottom navigation
6. **Phase 7**: Implement layout primitives (MapLayout, ContentLayout, CollectionLayout)
7. **Phase 8**: Implement BottomSheet foundation
8. **Phase 9**: Implement map control primitives
9. **Phase 10**: Implement supporting UI components
10. **Phase 11-13**: Ensure responsive and accessible design
11. **Phase 14**: Create documentation and tests
12. **Phase 15**: Final review and delivery

---

## 8. Success Criteria for Phase 4

- [ ] Typography visually aligns with Stitch designs
- [ ] Color tokens extend Phase 2 system without breaking changes
- [ ] Icon architecture is centralized and documented
- [ ] All header components are implemented and reusable
- [ ] Bottom navigation is implemented and configurable
- [ ] Layout primitives (MapLayout, ContentLayout, CollectionLayout) are implemented
- [ ] BottomSheet foundation supports all required states
- [ ] Map control primitives are implemented
- [ ] Supporting UI components (Avatar, Offline Banner, Status) are implemented
- [ ] All components are responsive across breakpoints
- [ ] All components meet WCAG 2.1 AA accessibility standards
- [ ] Component documentation is complete
- [ ] Basic tests are in place
- [ ] No application features have been implemented
- [ ] Codebase is ready for Phase 5 (screen implementation)
