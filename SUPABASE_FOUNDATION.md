# WRTI Supabase Application Foundation

## Status

> **Supabase application integration foundation prepared; live connection and schema verification remain pending environment configuration.**

No public Supabase environment variables are currently available to the Vite application. The data layer therefore does not make a live network query, create a client during import, assume database table names, inspect RLS, resolve storage URLs, or claim real Tree data.

| Boundary | Current implementation | Deferred until environment and schema verification |
|---|---|---|
| Client configuration | Lazy `getSupabaseClient()` in `client/src/utils/api.ts`, guarded by environment validation | Supplying the real project URL and anon key through approved project configuration |
| Data contracts | Intended WRTI `Tree`, `TreeImage`, `TreeAudio`, location, navigation, and pagination types | Mapping these contracts to actual rows, tables, columns, and relations |
| Data operations | `TreeRepository` contract and explicit deferred implementation | Supabase query functions, filtering, search, total-count behavior, and mapping |
| Media | Contract fields for `image_path`, `audio_path`, and `audio_url` | Storage bucket, public/private status, signed URLs, and real URL resolution |
| UI integration | Stable TanStack Query keys and disabled-until-verified hooks | Connecting approved screens to live Tree data without visual changes |

## Environment safety

The approved project-secret workflow must provide only these public browser variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

No values are committed, and no local environment file or template has been created. Local `.env`, `.env.local`, `.env.development.local`, `.env.test.local`, and `.env.production.local` files remain ignored. No service-role key is used or required by this frontend foundation.

## Current migration points

The application has no verified Tree database integration today. Existing Tree-adjacent data remains screen-specific and must not be globally replaced until the real schema is verified.

| Current area | Current role | Future migration consideration |
|---|---|---|
| `client/src/pages/ExplorationProgress.tsx` | Stitch-defined bookmarked flora snapshot and local bookmark state | Replace only through a view-model adapter that preserves its approved card composition and copy rules |
| `client/src/stores/map.store.ts` | Selected or hovered Tree IDs and map layer UI state | Map state can consume verified Tree IDs later; Mapbox remains explicitly deferred |
| `client/src/stores/discovery.store.ts` | Discovery filters containing a Tree ID | Connect only once actual discovery-to-tree relationship is verified |
| `client/src/services/offline-downloads.ts` | Static offline package snapshot | Keep independent until offline synchronization requirements and data schema are verified |
| `client/src/types/index.ts` | Existing UI-oriented Tree type for legacy map/offline vocabulary | Do not replace in this phase; the new feature-level types are separate intended data contracts |

## Next live-integration step

When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` become available to the Vite runtime, the next task is to inspect the external Supabase project, verify its actual schema and RLS policies, determine media storage behavior, then implement row-to-domain mapping and real repository queries. No database, migration, RLS change, or external Supabase project change has been made in this phase.
