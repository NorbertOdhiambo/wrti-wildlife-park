# WRTI — Live Supabase Integration Verification Checkpoint

**Date:** 2026-08-16  
**Scope:** Read-only verification and documentation. No application code, Supabase schema, table, relationship, RLS policy, Storage policy, migration, Mapbox, or payment behavior was changed for this checkpoint.

## 1. Supabase runtime configuration

| Check | Result | Evidence |
|---|---|---|
| `VITE_SUPABASE_URL` available to the project runtime | **YES** | Current read-only verifier reported `urlPresent: true`. |
| `VITE_SUPABASE_ANON_KEY` available to the project runtime | **YES** | Current read-only verifier reported `anonKeyPresent: true`. |
| Anonymous Supabase request succeeds | **YES** | Direct anonymous `select` requests against `public.trees`, `public.tree_images`, and `public.tree_audio` succeeded. |

Neither public configuration value was printed, copied, or committed. The client is initialized only through `client/src/utils/api.ts` and does not contain fallback credentials.

## 2. Actual database resources and fields

> **Important distinction:** The table and field names below were observed through successful anonymous reads. PostgreSQL-declared SQL types, primary-key declarations, foreign-key declarations, `NOT NULL` constraints, and RLS policy definitions were **not anonymously inspectable**. A direct anonymous attempt to query `information_schema.columns` failed with `42P01`; therefore this document does not infer or invent database declarations.

### `public.trees`

Anonymous `select` access succeeded, and the exact count returned was **58**. The application uses the following observed fields.

| Observed database field | Database SQL type / nullability | WRTI application mapping | Notes |
|---|---|---|---|
| `id` | Not anonymously verifiable | `number` | Used as the Tree identifier and query parameter. |
| `common_name` | Not anonymously verifiable | `string` | Used for database ordering, database `ilike` search, and Discovery card title. |
| `species` | Not anonymously verifiable | `string \| null` | Rendered with family when present. |
| `family` | Not anonymously verifiable | `string \| null` | Rendered with species when present. |
| `description` | Not anonymously verifiable | `string \| null` | Rendered in Discovery with a UI-only fallback when null. |
| `lat` | Not anonymously verifiable | input `string \| number \| null`; output `number \| null` | `mapTreeRow` normalizes finite coordinates to numbers. |
| `lng` | Not anonymously verifiable | input `string \| number \| null`; output `number \| null` | `mapTreeRow` normalizes finite coordinates to numbers. |
| `qr_code_url` | Not anonymously verifiable | `string \| null` | Carried in the application contract; not rendered in `/discovery`. |
| `qr_code_path` | Not anonymously verifiable | `string \| null` | Carried in the application contract; not rendered in `/discovery`. |
| `audio_url` | Not anonymously verifiable | `string \| null` | Carried in the application contract; media detail uses `tree_audio` as the verified source. |
| `fun_fact` | Not anonymously verifiable | `string \| null` | Carried in the application contract; not rendered in `/discovery`. |
| `created_at` | Not anonymously verifiable | `string` | Carried in the application contract. |
| `updated_at` | Not anonymously verifiable | `string` | Carried in the application contract. |

### `public.tree_images`

Anonymous `select` access succeeded; the prior and current probes observed **24** rows. A current read-only query found a representative image row whose owning Tree was also anonymously readable. The repository treats the first `is_main` or `is_primary` image as the primary image, falling back to the first image only when neither flag is set.

| Observed database field | Database SQL type / nullability | WRTI application mapping | Notes |
|---|---|---|---|
| `id` | Not anonymously verifiable | `string` | Image record identifier. |
| `tree_id` | Not anonymously verifiable | `number` | Repository relationship key to `trees.id`. |
| `image_path` | Not anonymously verifiable | `string` | Verified primary representation is an absolute public URL. |
| `caption` | Not anonymously verifiable | `string \| null` | Carried in the application contract. |
| `is_primary` | Not anonymously verifiable | `boolean` | Used by primary-image preference logic. |
| `is_main` | Not anonymously verifiable | `boolean` | Used before `is_primary` by the repository preference ordering. |
| `file_size` | Not anonymously verifiable | `number \| null` | Carried in the application contract. |
| `created_at` | Not anonymously verifiable | `string` | Used as the final deterministic image ordering field. |
| `updated_at` | Not anonymously verifiable | `string` | Carried in the application contract. |

### `public.tree_audio`

Anonymous `select` access succeeded; the prior and current probes observed **57** rows. A current read-only query confirmed an audio row for the current sample Tree and an absolute `audio_url` alongside a relative `audio_path`.

| Observed database field | Database SQL type / nullability | WRTI application mapping | Notes |
|---|---|---|---|
| `id` | Not anonymously verifiable | `string` | Audio record identifier. |
| `tree_id` | Not anonymously verifiable | `number` | Repository relationship key to `trees.id`. |
| `audio_path` | Not anonymously verifiable | `string` | Observed as a relative path; retained as provenance. |
| `audio_url` | Not anonymously verifiable | `string \| null` | Observed as an absolute public URL; preferred by the application. |
| `transcript` | Not anonymously verifiable | `string \| null` | Carried in the application contract. |
| `duration_seconds` | Not anonymously verifiable | `number \| null` | Carried in the application contract. |
| `created_at` | Not anonymously verifiable | `string` | Used for deterministic first-audio ordering. |
| `updated_at` | Not anonymously verifiable | `string` | Carried in the application contract. |

## 3. Observed application relationships

```text
public.trees
  ├── public.tree_images   (repository query: tree_images.tree_id = trees.id)
  └── public.tree_audio    (repository query: tree_audio.tree_id = trees.id)
```

The **application assumption** is one-to-many for each related resource: `getTreeImages(treeId)` returns an ordered list; `getTreeAudio(treeId)` returns the earliest related row; `getPrimaryTreeImage(treeId)` selects an `is_main` image, then an `is_primary` image, then the first image. Read-only anonymous probes demonstrated that at least one image-bearing Tree and one audio-bearing Tree relationship can be read. Database-declared foreign-key constraints and cardinality rules were not inspected and are not asserted.

## 4. Supabase Storage and media resolution

| Media | Verified representation | Resolution mechanism | Public / signed conclusion |
|---|---|---|---|
| Tree image | Absolute `tree_images.image_path` URL | The repository preserves absolute URLs unchanged. | **Public URL observed**; no signed URL is requested. |
| Tree audio | Relative `audio_path` plus absolute `audio_url` | The repository prefers the absolute `audio_url`; the path remains provenance. | **Public URL observed**; no signed URL is requested. |

Anonymous `storage.listBuckets()` completed with **zero visible buckets**. Consequently, no bucket name, path convention, or bucket public/private policy can be documented from the anonymous client. The application does contain a generic `resolveStorageUrl()` helper for an explicit absolute URL or `bucket/object` path, but the verified Tree media implementation does not need to synthesize Storage URLs for currently observed records.

## 5. Anonymous access and RLS

Anonymous `select` reads are confirmed for the three observed resources. The verified successful operations include Tree collection reads, an exact count query, an individual Tree read, filtered image/audio reads, and pagination ranges. No service-role key was used, and no RLS policy, Storage policy, or database permission was changed.

RLS **enabled/disabled status and exact policy definitions are not verifiable from the anonymous client**. The factual observation is that anonymous read access exists for the listed resources. Generic OpenAPI-root access is not available to the anonymous role and is not required by the application.

## 6. Application type mapping

```text
Supabase row
  ↓  `SupabaseTreeRepository` / row mappers
WRTI `Tree`, `TreeImage`, `TreeAudio` application contracts
  ↓  `treeRepository`
TanStack Query hooks (`useTrees`, `useTree`, `useTreeImages`, `useTreeAudio`)
  ↓  React component
`DiscoveryJournal` (`/discovery`)
```

| Stage | Relevant file | Responsibility |
|---|---|---|
| Public environment and singleton client | `client/src/utils/api.ts` | Reads only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; throws a clear configuration error if absent. |
| Database-shaped rows and mapping | `client/src/features/trees/api/treeRepository.ts` | Queries verified tables and maps coordinate inputs to application coordinates. |
| Application contracts | `client/src/features/trees/types/tree.ts` | Separates observed fields from UI and data-access logic. |
| Cache / remote state | `client/src/features/trees/api/treeQueries.ts` | Owns query keys, 60-second stale time, and one retry. |
| Real-data screen | `client/src/pages/DiscoveryJournal.tsx` | Renders only `common_name`, `species`, `family`, `description`, and location availability. |

The requested fields are handled as follows: `id`, `common_name`, `species`, `family`, `description`, `lat`, `lng`, `qr_code_url`, `qr_code_path`, `audio_url`, `fun_fact`, and `created_at` exist in the observed Tree result and are carried by `Tree`; `imgUrl` does **not** exist in the observed `trees` row and is represented through `TreeImage.image_path`; `audio_url` also exists in `tree_audio` and is preferred there when a detail screen needs audio. `lat` and `lng` are normalized to `number | null`; values that cannot be converted to finite numbers become `null` at the application boundary.

## 7. Real data verification

| Capability | Result | Current read-only evidence |
|---|---|---|
| Real Tree collection retrieved | **YES** | Successful anonymous list query with an exact count of **58**. |
| `getTreeById` equivalent succeeds | **YES** | Successful anonymous single-Tree query by the selected `id`; repository uses the same table/filter/`maybeSingle()` pattern. |
| Primary image retrieval succeeds | **YES** | Successful anonymous image read for an image-bearing Tree; representative image is marked `is_primary` or `is_main`, uses an absolute URL, and its owning Tree is readable. |
| Audio retrieval succeeds | **YES** | Successful anonymous filtered audio read for the selected Tree; observed absolute `audio_url` and relative `audio_path`. |
| Database pagination works | **YES** | Ordered first and second `range()` pages each returned five records, differed, and returned total count **58**. |
| `/discovery` displays real database records | **YES** | The route invokes `useTrees` with `enabled: true` and renders the returned Tree collection and total. |

## 8. TanStack Query architecture

The Tree feature defines five stable query-key families: `['trees']`, list (`['trees', 'list', input]`), detail, images, and audio. The available hooks are `useTrees`, `useTree`, `useTreeImages`, and `useTreeAudio`. Each uses the repository boundary, is enabled only when both runtime variables exist, has an explicit **60,000 ms stale time**, and retries once. No tree server state is stored in Zustand.

Repository methods are `getTrees`, `getTree`, `getTreeImages`, `getTreeAudio`, `getPrimaryTreeImage`, and `resolveStorageUrl`. The current `/discovery` list hook performs **server-side/database filtering** with `ilike('common_name', '%term%')`, not client-side filtering.

## 9. Current `/discovery` behavior

`/discovery` is the only live-data screen. It requests 12 real Tree rows per page, reports the exact returned Supabase count, and submits a common-name search that resets to page one. Its search is database-side, pagination is offset/range-based at the Supabase layer, and variable real descriptions are visually clamped to four lines only after retrieval.

The screen includes loading skeletons, an error alert with retry, a no-match empty state, disabled-aware Previous/Next buttons, `aria-busy`, accessible search labeling, live count announcements, and a responsive collection grid. It currently displays a botanical icon and location-availability badge rather than Tree images; therefore live image retrieval is verified in the repository but not yet rendered in this list screen.

## 10. Remaining Tree mock/static data audit

| Screen / component | Current data source | Supabase migration status |
|---|---|---|
| `ExplorationProgress` / Bookmarked Flora and Recent Finds | `client/src/features/exploration-progress/explorationProgressData.ts` static source-defined data and stored visual assets | **Planned but not started.** Keep static until this approved Stitch screen receives a dedicated real-data integration. |
| Landing reserve cards and guided content | Stitch-authored static page data / source imagery | **Not planned in this Tree milestone.** |
| Map and map-related placeholders | Existing static / placeholder application data | **Deferred.** No Mapbox work in this milestone. |
| `/discovery` | Live `public.trees` through TanStack Query | **Completed.** |

## 11. Regression verification

Landing/Home, Header, Bottom Navigation, existing routing, and all previously approved static screens remain outside the live Tree integration. Representative landing, settings, and offline visual checks were completed during the preceding foundation work, and the live Discovery route retains the shared shell. The live Tree change passed TypeScript, seven focused Vitest tests, a production build, browser smoke testing, and mobile/desktop Discovery screenshot checks. No route was redesigned in this verification checkpoint.

## 12. Final status

```text
LIVE SUPABASE CONNECTION: VERIFIED

REAL TREE DATA: VERIFIED

DATABASE SCHEMA: DOCUMENTED

FIRST REAL-DATA SCREEN: VERIFIED
```

### Issues and uncertainties

The anonymous role cannot inspect database-declared SQL types, nullability constraints, primary/foreign-key definitions, RLS status/policy text, or Storage bucket metadata. This report therefore documents only observed public result shapes and verified read behavior. The first current collection sample did not itself have a related image, while a separate read-only image-bearing Tree probe did verify primary-image retrieval. A dedicated Tree detail screen has not yet been built; the verified repository methods are available for that future route.
