# WRTI Map — Live Implementation Verification & Fidelity Audit Brief

## Authoritative objective

This is a focused verification and correction pass for the completed `/map` route. The Map must remain grounded in approved WRTI specifications, authoritative Stitch materials, live Supabase Tree data, and real Mapbox behavior. It must not be rebuilt from scratch, expanded with major capabilities, or used as a reason to change unrelated screens.

## Mandatory audit areas

The pass must reconcile the verified 58 Tree records with the reported 52 rendered markers through a row-level diagnostic containing Tree ID, common name, latitude, longitude, mappability, and a precise exclusion reason. It must verify the repository → TanStack Query → live collection → Map marker path, stable Tree identities, complete non-paginated data collection, and the boundary conversion from WRTI `{ lat, lng }` to Mapbox `[lng, lat]`.

Marker selection, selected-marker styling, preview content, BottomSheet states, preview/media reuse, search-to-selection, selected Tree persistence, clearing selection, and Map-to-Tree Detail transition must all be exercised with real Tree records. Tree media must be checked for landscape, portrait, and missing-image behavior without unrelated or distorted imagery.

The Map must be audited for genuine browser-geolocation loading, granted, denied, and unavailable behavior; established Explore, Select, and Navigate concepts; source-approved theme/layer semantics; actual mobile, tablet, and desktop composition; BottomSheet/desktop-side-panel behavior; Mapbox lifecycle, query stability, marker recreation, camera updates, cleanup, and error/offline conditions.

## Scope boundaries

Do not add park trails, route geometry, conventional road-routing substitutions, conservation/habitat/AR/transport overlays, authentication, favourites, offline map packs, fake geographic data, or other major Map features. Navigation remains explicitly **not implemented — awaiting verified park navigation/path data**. Offline application recovery must remain distinct from offline Tree data, offline map tiles, and offline routing.

## Required final report

The final implementation record must state exact database totals and marker exclusions; Mapbox initialization, style, token configuration, camera, and controls; Tree repository/query/count/marker/coordinate-conversion status; selection, preview, BottomSheet, and search behavior; geolocation behavior; exact approved themes/layers; navigation limitations; offline distinctions; responsive and Stitch-fidelity findings; TypeScript/tests/browser/production/real-data checks; and all remaining limitations.
