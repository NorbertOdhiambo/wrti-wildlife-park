# Contact Support Stitch Source Notes

## Authoritative Source

- **Source**: `/home/ubuntu/upload/contact_support/screen-reference.html`
- **Screenshot**: `/home/ubuntu/upload/contact_support/screen.png` (Placeholder only, ignored)

## Visual Specification

### Colors
- **Background**: `#f0fbfe` (mist)
- **Primary**: `#006b2c` (green)
- **On-Primary**: `#ffffff`
- **Surface-Container-Lowest**: `#ffffff`
- **On-Surface**: `#131d1f`
- **On-Surface-Variant**: `#3e4a3d`
- **Outline-Variant**: `#3e4a3d` (with opacity)
- **Secondary-Container**: `#d1e8d7` (approx, from secondary-container class)
- **Tertiary-Container**: `#d0e4ff` (approx, from tertiary-container class)

### Typography
- **Headlines**: `Libre Caslon Text`, bold, tracking-tight.
- **Body/Labels**: `Plus Jakarta Sans`.
- **Sizes**:
  - Page Title: `headline-lg` (mobile: `headline-lg-mobile`).
  - Card Titles: `label-md`.
  - Body: `body-md`.

### Layout & Components
- **Header**: Centered title and subtitle.
- **Bento Grid**: 2-column (desktop) / 1-column (mobile) grid for contact cards.
- **Form Card**: 
  - Max-width: `3xl` (approx 768px).
  - Glassmorphism: `backdrop-blur-lg`, `bg-surface-container-lowest/80`.
  - Top accent: Gradient from primary to secondary.
  - Fields: Name (icon: `person`), Email (icon: `alternate_email`), Message (textarea).
  - Footer: Security indicator (icon: `lock`) and Submit button (icon: `send`).

### Interactions
- **Hover**: Cards scale/shadow, buttons change background.
- **Active**: Button scale `0.95`.
- **Transitions**: `duration-300` or `duration-200`.

## Implementation Strategy

- Use `RootLayout` with `header: 'detail'` and `title: 'Contact Support'`.
- Implement the page body exactly as defined in the HTML.
- Use `Material Symbols Outlined` for all icons.
- Preserve the exact copy and form structure.
