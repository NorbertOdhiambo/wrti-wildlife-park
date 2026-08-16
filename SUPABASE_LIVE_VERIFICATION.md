# Live Supabase Verification Record

## Scope and security boundary

This record documents live verification using **only** the frontend-safe `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values. Neither value is printed, committed, or copied into source. No service-role key, schema mutation, RLS policy change, storage-policy change, migration, table creation, or data write is permitted in this workstream.

## Runtime configuration

| Check | Observed result |
|---|---|
| `VITE_SUPABASE_URL` available to the project process | Yes |
| `VITE_SUPABASE_ANON_KEY` available to the project process | Yes |
| URL safety checks | HTTPS Supabase domain |
| Anon-key shape | Present JWT with the `anon` role |

## Initial anonymous REST endpoint probe

The generic `GET /rest/v1/` OpenAPI root endpoint returned HTTP `401` with a sanitized message stating that the endpoint requires a service-role API key. This is **not** treated as a database-connectivity failure or a reason to use a service-role key. The next allowed verification step is a direct anonymous `select` probe against candidate public Tree resource names, which will distinguish a valid table read, an RLS denial, and a missing relation without changing Supabase.

## Status

Direct anonymous table probes have now verified real database connectivity, accessible Tree relations, and usable media URLs. The generic OpenAPI root remains unavailable to the anonymous key and is not required for this application.

## Verified anonymous data access

| Resource | Read result | Records observed | Verified runtime fields |
|---|---:|---:|---|
| `public.trees` | Successful anonymous `select` | 58 | `id`, `common_name`, `species`, `family`, `description`, `qr_code_url`, `qr_code_path`, `audio_url`, `lat`, `lng`, `fun_fact`, `created_at`, `updated_at` |
| `public.tree_images` | Successful anonymous `select` | 24 | `id`, `tree_id`, `image_path`, `caption`, `is_primary`, `is_main`, `file_size`, `created_at`, `updated_at` |
| `public.tree_audio` | Successful anonymous `select` | 57 | `id`, `tree_id`, `audio_path`, `audio_url`, `transcript`, `duration_seconds`, `created_at`, `updated_at` |

The runtime field observations demonstrate public read behavior for these three tables. `information_schema` is intentionally unavailable to the anonymous role (`PGRST106`), so database-declared SQL types and nullable constraints cannot be asserted beyond the observed public result shapes. No RLS status or policy definition was read directly; successful anonymous reads are the observed access behavior.

## Relationships and pagination

For a successfully retrieved Tree record, anonymous filtered reads returned one related `tree_images` row and one related `tree_audio` row using `tree_id`. A real ordered `trees` query returned five records for each of page one and page two, reported a total of 58, and produced different page results. This verifies public list/detail relationship reads and database pagination without fabricated counts.

## Verified media strategy

| Media | Persisted representation | Observed anonymous access | Application strategy |
|---|---|---|---|
| Tree image | Absolute URL in `tree_images.image_path` | Representative `HEAD` response: 200 | Preserve the verified absolute URL; do not synthesize a new storage URL. |
| Tree audio | Relative `trees/...` path in `tree_audio.audio_path` and absolute URL in `tree_audio.audio_url` | Representative absolute `audio_url` `HEAD` response: 200 | Prefer the verified absolute `audio_url`; retain the relative path as provenance only. |

`storage.listBuckets()` returned no visible buckets to the anonymous client. The verified media URLs are already anonymously readable; no bucket policy was changed, no bucket was made public, and signed URLs are not required for the observed public image and audio records.

## Live Discovery Journal integration

The existing `/discovery` placeholder is now the single approved screen connected to live Tree data. At 390px mobile width, the route loaded the real anonymous Tree collection and displayed the verified total of 58 records. The page keeps all Supabase and pagination details in the Tree feature boundary, exposes accessible loading, empty, error, retry, search, and pagination states, and retains the shared WRTI application shell.

The first live record contained a much longer database description than the prior placeholder could anticipate. Discovery card copy is therefore clamped to four lines so real data preserves the intended mobile card geometry without truncating the underlying database value or changing any Supabase data. The screenshot-confirmed rendered source uses real `trees` values; it does not display mocked records.

## Concrete repository and UI validation

The deferred Tree boundary is now backed by the verified public `trees`, `tree_images`, and `tree_audio` tables only. It maps observed nullable text and coordinate fields, preserves absolute image URLs, prefers verified absolute audio URLs, and uses the public table count for actual offset pagination. No storage bucket is assumed, no fabricated media path is generated, and no write capability is present.

The only screen connected to live data in this change is `/discovery`, which replaced an existing placeholder rather than altering an approved Stitch-driven screen. The route uses TanStack Query for list/search/pagination state and renders accessible loading, empty, error, retry, and pagination controls. The existing Map, ticket/payment, Landing, exploration, settings, offline, and other static content are unchanged.

Validation results: the anonymous live probe confirmed 58 public Tree records, real related image/audio reads, and different page-one/page-two results. The browser smoke test passed for live load, non-zero collection count, Next pagination when available, no-match empty state, restored collection state, and no browser-console errors. TypeScript, seven Vitest tests, and the production build passed. Mobile 390px and desktop 1280px screenshot checks confirmed the responsive Discovery collection and retained shared WRTI shell.

### Remaining live-data limitations

- A dedicated Tree detail route is not yet implemented; repository `getTreeById`, primary image, and primary audio operations are available for the next approved screen.
- `information_schema` and storage-bucket listing remain inaccessible to the anonymous client. Runtime-observed fields and successful public reads are documented; database-declared constraints and RLS policy definitions are not asserted.
- No client-side bookmark writes, profile data, Mapbox work, payment integration, migrations, storage-policy changes, or Supabase writes were added.
