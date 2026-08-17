# Dynamic Tree Detail Implementation Record

## Scope completed

The WRTI Tree Detail screen is now available at `/trees/:id`. It follows the authoritative `tree_detail_giant_sequoia` Stitch HTML for hierarchy, visual tokens, type system, tactile panels, media treatment, and mobile-first responsive composition. The screen uses the existing live, anonymous Supabase Tree feature boundary; it does not introduce another Supabase client, a write operation, a service-role key, Mapbox, payment logic, or a schema change.

The route is an intentional shared-shell exception. The Stitch source defines a translucent fixed task header with back and favorite actions and explicitly omits Bottom Navigation. The route therefore sets both shared shell regions to hidden and renders this source-specific local task header only for Tree Detail.

| Stitch region | Dynamic source | Verified missing-data behavior |
| --- | --- | --- |
| Hero display name | `trees.common_name` | Tree not-found state for an absent record. |
| Hero scientific name | `trees.species` | “Scientific name not recorded”. |
| Classification chip and botanical family | `trees.family` | “Park Tree” chip and “Not recorded” value. |
| Story body | `trees.description` | “A detailed description has not been recorded for this tree yet.” |
| Hero media | Primary `tree_images.image_path`, resolved through `resolveStorageUrl` | A clearly labelled image-unavailable hero treatment. |
| Audio Guide | `tree_audio.audio_url`, then `tree_audio.audio_path`, then `trees.audio_url` | “Audio is not available for this tree.” |
| Audio duration | Native metadata, with `tree_audio.duration_seconds` as an initial fallback | “Audio available” if no duration is known. |
| Nature Insight | `trees.fun_fact` | “A nature insight has not been recorded for this tree yet.” |
| Map actions | `trees.lat` and `trees.lng` | Disabled actions and a location-unavailable message. |

The source’s Average Height, Lifespan, Native Region, Conservation Status, IUCN link, and related-species records have no verified backing fields or relationships in the existing anonymous Tree contracts. They deliberately display an explicit unavailable state rather than inventing Giant Sequoia values for other real records.

## Interaction and accessibility coverage

Discovery Journal cards now use semantic keyboard-accessible links to `/trees/:id`. Tree Detail provides a back path, an `aria-pressed` favourite control, a labelled play/pause button, keyboard-accessible audio seeking, visible focus treatments, disabled map actions when coordinates are absent, error/not-found/loading states, and a `prefers-reduced-motion` override.

The real Tree Detail route was smoke-tested using the live `African aloe` record at `/trees/74`. The card navigation reached the real detail route; the real audio guide changed from the labelled Play state to Pause and back again. Mobile `390×844` and desktop `1280×900` captures confirmed the intended mobile stack and desktop two-column content arrangements.

## Validation

| Check | Outcome |
| --- | --- |
| TypeScript (`pnpm run check`) | Passed. |
| Unit test command (`pnpm test --run`) | Passed as part of the validation command chain. |
| Production build (`pnpm run build`) | Passed. |
| Real record route and Discovery-to-detail navigation | Passed with `/trees/74`. |
| Audio play/pause state | Passed with live audio data. |
| Mobile and desktop visual checks | Passed at `390×844` and `1280×900`. |

Existing non-blocking project warnings remain unchanged: a duplicate `skipLibCheck` TypeScript configuration warning, the pnpm configuration relocation notice, and the production bundle-size advisory.
