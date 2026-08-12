# Exploration Progress Source Notes

The uploaded `screen-reference.html` is the authoritative source for the `/progress` screen. It specifies a light `#f0fbfe` canvas, Libre Caslon Text headings, Plus Jakarta Sans body text, the established green palette led by `#006b2c`, a 128px circular milestone badge, exact exploration copy, four zone progress cards, a bookmarked-flora image grid, and a Recent Finds timeline. The mobile HTML uses two flora cards and hides the third until the `md` breakpoint; desktop uses a twelve-column bento layout with the timeline spanning four columns and sticking below the top navigation.

The source-referenced assets are the Sword Fern, Ghost Orchid, Coastal Redwood, and Amanita muscaria images. They were downloaded from the supplied Stitch references and uploaded to stable WebDev storage without substituting stock or generated imagery.

The global shell remains owned by `RootLayout`. The route therefore keeps the WRTI Header and Bottom Navigation even though the Stitch body export contains its own illustrative navigation. The approved application shell uses the existing four-tab Map, Discovery, Tickets, and Profile model; the source's History state is represented by the detail route title while preserving the product shell contract.

The focused Bookmarked Flora correction preserves the source's `grid-cols-2 md:grid-cols-3` contract: two cards are visible side by side below 768px, the third card is hidden below 768px, and all three cards are visible in three columns from the md breakpoint. Mobile and 768px comparisons confirm this behavior alongside the summary card, typography hierarchy, green progress treatment, section rhythm, flora imagery, timeline, and persistent shell.
