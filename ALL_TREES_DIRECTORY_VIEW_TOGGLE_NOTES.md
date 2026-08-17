# All Trees Directory Grid/List Toggle Notes

## Supplied visual reference

The user-provided control establishes a compact two-option segmented switch: **Grid** is the default selected state, uses a pale surface and green grid glyph/label, while **List** remains present with a neutral grey icon/label until selected. The implemented control keeps those roles and labels, using the established accessible ToggleGroup primitive rather than a decorative static indicator.

## Live interaction record

The live `/trees` route loaded in default Grid mode with **58 Trees**, the unchanged Family/Species filter controls, page-one records, and semantic Tree-detail links. Switching to List preserved the same page-one result set and changed only the presentation. During this first live check, an image with a tall intrinsic aspect ratio expanded its list row; List styling was immediately constrained to a fixed compact 144px mobile / 160px tablet-and-up media row so all records now remain in the intended horizontal-row presentation.

After the adjustment, live List rows retained one consistent compact height for both unavailable-media fallbacks and real Supabase images. Returning to Grid restored the original desktop four-card catalogue presentation while preserving the same `58 Trees` total, active filters, page-one records, and Tree-detail destinations.

The segmented control was also validated by keyboard: `ArrowRight` moved focus from the selected Grid radio option to List, and `Space` activated the focused List option. The live data, total, page, filters, and clickable Tree-detail records stayed intact through the keyboard-driven presentation change.
