# WRTI Global Application Shell

The visitor-facing application uses one shared shell in `client/src/layouts/RootLayout.tsx`. The shell owns the approved WRTI Header and Bottom Navigation so normal route changes do not require individual pages to recreate application chrome.

## Default behavior

Routes nested under the root layout inherit the following configuration:

```ts
{
  header: 'app',
  bottomNavigation: 'default',
  title: 'WRTI Wildlife Park',
}
```

The shell reads route metadata through React Router `handle.shell`. Child route metadata is merged over the defaults, which keeps the default-on behavior explicit while allowing a page to choose a Header variant or opt out intentionally.

## Supported route metadata

```ts
type WRTIShellConfig = {
  header?: 'app' | 'detail' | 'map' | 'hidden';
  bottomNavigation?: 'default' | 'hidden';
  activeNav?: string;
  title?: string;
  subtitle?: string;
};
```

Use `header: 'detail'` for detail, form, or transactional pages that need the approved back-navigation Header. Use `header: 'map'` for map-oriented experiences. Use `header: 'hidden'` and/or `bottomNavigation: 'hidden'` only when the screen specification explicitly calls for an immersive, transactional, onboarding, or system-level experience.

## Current route policy

| Route group | Header | Bottom Navigation | Active item | Rationale |
| --- | --- | --- | --- | --- |
| `/` | App | Default | None | Visitor landing page; no home tab exists in the four-item nav. |
| `/about` | App | Default | None | Visitor-facing informational content remains inside the global shell. |
| `/map` | Map | Default | Map | Map-specific search/profile controls are a Header variant, not a separate shell. |
| `/discovery` | App | Default | Discovery | Standard visitor destination. |
| `/tickets` | Detail | Default | Tickets | Ticket selection retains shared back-navigation Header and global navigation. |
| `/checkout` | Detail | Default | Tickets | Transactional flow still has visitor navigation available. |
| `/profile`, `/settings`, `/help`, `/offline` | App or Detail | Default | Profile where relevant | Visitor account and support experiences remain navigable. |
| `/payment-success` | Hidden | Hidden | None | Explicit immersive transactional confirmation exception. |
| `*` | Hidden | Hidden | None | System-level not-found state is intentionally outside visitor navigation. |

## Implementation rule

Page components should contain page content only. They must not import or render `AppHeader`, `DetailHeader`, `MapHeader`, or `BottomNavigation` directly unless a future screen is explicitly documented as a separate shell experience. New route-level shell exceptions must be documented in this file and declared in `client/src/routes/index.tsx`.

## Validation

The correction was validated at a 390×844 mobile viewport for `/`, `/about`, `/tickets`, `/map`, and `/payment-success`. TypeScript compilation and the production build pass. The build continues to report existing non-blocking warnings for a duplicate `skipLibCheck` key in `tsconfig.json` and a large JavaScript chunk; neither is caused by the shell correction.
