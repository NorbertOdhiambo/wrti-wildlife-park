# Offline Downloads — Stitch Source Notes

## Authoritative source

- HTML: `/home/ubuntu/upload/offline_downloads/screen-reference.html`
- Screenshot: `/home/ubuntu/upload/offline_downloads/screen.png` — **corrupted; do not use for visual decisions**.
- Route target: `/offline-downloads`

## Exact source findings captured so far

- Page canvas: `#f0fbfe` with a repeating `radial-gradient(#cee9db 1px, transparent 1px)` texture at `20px 20px`; body uses `pb-32` to clear bottom navigation.
- Stitch shell: sticky translucent top bar with back arrow, centered `Offline Downloads`, and `cloud_sync`; application architecture requires the existing centralized WRTI shell instead of duplicate page shell markup unless the route explicitly opts out.
- Main content: max width `5xl`, mobile `20px` padding, desktop `64px` padding, `32px` section gaps, centered intro on mobile and left-aligned intro from md.
- Exact intro copy: `Manage Field Data` and `Download high-resolution maps and species databases for use in remote park areas without internet access.`
- Storage card: `Available Storage`, `14.2 GB Free of 64 GB`, storage icon `sd_storage`, hidden-on-mobile progress bar with a source-defined `78%` visual fill.
- Active Downloads section title: `Active Downloads`; two source cards are `Northern Sector Topography` / `450 MB Map Data` with `Downloading...` and `65% (292 MB)`, plus `Alpine Flora & Fauna DB` / `1.2 GB Offline Database` with `Queued` and `0%`. Both use cancel buttons.
- Active card icons: `map` and `pest_control`; card surfaces are white with outline-variant borders, rounded xl corners, shadows, and source green/secondary icon treatments.
- Map Regions & Data Packs section begins with a responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` layout. The first visible completed card is `Central Valley Base Map`, with `850 MB`, `Downloaded`, terrain/trails/primary facilities description, and `Remove` plus another action button; the source image is a remote `lh3.googleusercontent.com` asset and should be preserved only if needed after the remaining HTML inspection.

## Constraints to preserve

- Reproduce HTML rather than the corrupted screenshot; do not redesign the composition.
- Use existing WRTI green semantic tokens and the existing offline store/services; do not create a duplicate offline-management system.
- Keep downloadable content single-park and replaceable with a future real service; do not claim real Mapbox tiles are available.
- Implement source-defined stateful controls with realistic preparing/downloading/queued/completed/removal behavior where the source requires it, plus accessible progress semantics and reduced-motion support.

## Implementation and validation notes

- The corrupted screenshot was ignored for all visual decisions. The rendered React route was compared against the authoritative HTML structure, copy, palette, dotted texture, active progress cards, package cards, controls, and responsive grid behavior.
- The existing `/offline` placeholder route was upgraded in place rather than creating a duplicate `/offline-downloads` route. The centralized DetailHeader and BottomNavigation remain active through RootLayout.
- A replaceable `OfflineDownloadPackage` model, persisted through `useOfflineStore`, now feeds the page. `useOfflineDownloads` owns deterministic preparing, downloading, queued, downloaded, removing, online/offline guard, and browser network-event transitions.
- The exact Stitch Central Valley image is stored at `/manus-storage/central-valley-base-map_e4dd514f.jpg`. The screenshot's image is not used as a visual reference.
- The deterministic initial state preserves the source's 65% / 292 MB Northern Sector download on first render; newly started downloads advance on a one-second controller tick and can complete, cancel, or be removed.
- Validation completed at 390px mobile and 1280px desktop. The interaction smoke test passed for starting, progressing, canceling, offline blocking, removal confirmation, route loading, and browser-console error collection. TypeScript and production build checks passed.
