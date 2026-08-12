# Settings & Preferences — Stitch Source Notes

## Authoritative source

- HTML: `/home/ubuntu/upload/settings_preferences/screen-reference.html`
- Screenshot: `/home/ubuntu/upload/settings_preferences/screen.png`
- Implementation route: `/settings`

## Source findings

- The page uses the existing WRTI light palette with `#f0fbfe` as the background, `#006b2c` as the primary green, white lowest-surface cards, and soft outline dividers.
- The body is mobile-first: a `20px` horizontal gutter, a `32px` section rhythm, one-column Appearance cards on mobile, and three columns from the `sm` breakpoint.
- The source sections are ordered exactly as: page title, profile card, Appearance, Accessibility, and General.
- Profile copy is exactly `Alex Explorer`, `alex@example.com`, and `Edit`.
- Appearance controls are exactly `Light`, `Dark`, and `Outdoor Vis`, with Light selected in the supplied reference.
- Accessibility controls are exactly `Text Size` / `Medium (Default)` and `Color Blind Mode` / `Adjust map colors`.
- General controls are exactly `Offline Downloads` / `Map areas and species data`, `Map Themes`, and `Notifications`.
- Existing WRTI Header and Bottom Navigation remain supplied by `RootLayout`; no duplicate shell markup is rendered by the page.

## Functional integration decisions

- Theme buttons use the existing `ThemeProvider` plus persisted `useSettingsStore` theme preference.
- `Outdoor Vis` uses the existing high-contrast preference as the closest application-level representation of the source control.
- Color Blind Mode and Offline Downloads are persisted through the existing settings store as frontend-only preferences.
- Text Size cycles through the existing small, normal, and large font-size preferences while keeping the source row geometry.
- `Edit` navigates to the existing `/profile` route; `Map Themes` navigates to the existing `/map` route because no separate map-theme screen is implemented.

## Known architectural deviation

The Stitch screenshot includes a bespoke centered top app bar and a four-item `Map / Discover / History / Settings` bottom navigation. The application-level shell is intentionally not duplicated or replaced: the approved centralized WRTI Header and Bottom Navigation remain active, with Settings associated with the existing Profile navigation context.
