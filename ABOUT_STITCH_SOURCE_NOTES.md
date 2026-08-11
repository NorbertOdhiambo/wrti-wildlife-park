# About WRTI Wildlife Park — Stitch Source Notes

The authoritative source is `/home/ubuntu/upload/about_wrti_wildlife_park/screen-reference.html`. The companion screenshot at `/home/ubuntu/upload/about_wrti_wildlife_park/screen.png` is corrupted and must not be used for visual validation.

## HTML-derived body structure

The page body contains a 530px mobile / 618px desktop rounded hero with a rainforest background, gradient overlay, and glass mission panel; a three-card responsive bento section; a wide Conservation Technology card; a Botanical Archives card; and a full-width Heritage card with a timeline CTA and archival image.

## Exact source assets

- Hero image source: `https://lh3.googleusercontent.com/aida-public/AB6AXuDm4fggxmrrFyfyVKf4HnGQc68uSmYQx8cUTeCNW6IsoxSW42l0EuQC8-wS962DcEql5XeUxCN3y0Gmu9rYQpUJPrQwlSpd679G5k1QuVr01yTnzfe7ALfgEGpNHhLwFK1nj76UKtUQH1xwRFL-lFyEZEkCgsfH_HZxrhybMGoHFH4eQ2cJ0ZA7ao957SD59QSrhyhyJ87W3bCcpJt4iE5-_tKFCeKzLuAiWkAtVevOuMyLKLmNTmpxag72Xd7FAagdSsmPl0TqyVWQ`
- Heritage image source: `https://lh3.googleusercontent.com/aida-public/AB6AXuBtWHdz_2moEo1LNdPgNbxv7zB9fovF6GM68Wy7Pg9odVq13yVVzrnImO4wQVtoT5iK6ws9YUoDYKvJUDeMPAyNHw3bZPDgzkGbPgT-rnKPdGHYssZtUUTLGEue15IJ1nqqNgS6_1Eq7_L1QD8O6VKa9h4oXKHrbh9ex9Aq3XeVI-fA67I45aDjNMk5DQp7owkN3lphT-2vj7EojWdQ03PXiWikvOkK4lUMDOI5qncD0rOOtLrqu9k0-A65TaqTU-9QjsQSk9x2hQiO`

The implementation stores those exact downloaded assets at `/manus-storage/hero-rainforest_19577ed4.jpg` and `/manus-storage/heritage-archive_bc679199.jpg`.

## Key visual tokens

`#f0fbfe` background/surface, `#006b2c` primary, `#2a8542` primary container, `#a4f5b6` secondary container, `#496156` tertiary, `#617a6e` tertiary container, `#131d1f` on-surface, `#3e4a3d` on-surface-variant, `#bdcaba` outline variant. Typography uses Plus Jakarta Sans for body/labels and Libre Caslon Text for display/headline text.

## Source typography and responsive rules

Display is 48px/56px with -0.02em tracking; mobile display is reduced locally to 36px/44px. Body-lg is 18px/28px and body-md is 16px/24px. The bento grid is one column below 768px and 12 columns at 768px+, with spans 8/4/12. Heritage stacks on mobile and becomes a two-column row on desktop. The global Stitch header/navigation is excluded from the page body implementation.
