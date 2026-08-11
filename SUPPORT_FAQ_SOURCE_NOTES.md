# Support & FAQ — Source Notes

## Authoritative source

- Stitch export folder: `/home/ubuntu/upload/support_faq`
- Required primary source: `/home/ubuntu/upload/support_faq/code.html`
- The supplied Support & FAQ screenshot is corrupted and must not be used for visual comparison.

## Product constraints

- Implement this as a new visitor-facing React screen without redesigning completed screens.
- Preserve the centralized WRTI shell; do not duplicate Header or Bottom Navigation inside the page.
- Keep Header and Bottom Navigation enabled by default unless route architecture reveals an explicit exception.
- Reproduce exact HTML content, colors, typography, layout, icons, assets, responsive behavior, and source-defined interactions.
- Implement only interactions present in the source, including any FAQ accordion, search, filters, contact actions, and empty states.
- Use local typed presentation data, keeping the page ready for a future API without adding a backend in this task.
- Preserve semantic controls, `aria-expanded`, `aria-controls`, keyboard access, visible focus, and reduced-motion behavior.

## HTML findings

The actual export contains `screen-reference.html` rather than the requested `code.html`; that file is the authoritative source used for implementation. The source defines a sticky translucent top bar, a centered `max-w-3xl` body, and a mobile-only fixed pill navigation. The current WRTI shell supersedes those duplicated global chrome elements, so only the body content will be reproduced in React.

The body content is headed by **“How can we help?”** and **“Find answers to common questions or reach out to our park rangers.”** It includes a search field with placeholder **“Search for tickets, map, rules...”** and a microphone affordance, followed by three FAQ categories: **Tickets & Admission**, **Navigation & Trails**, and **Conservation Rules**. The source questions and answers are:

| Category | Question | Answer |
| --- | --- | --- |
| Tickets & Admission | Do I need to book in advance? | While walk-ins are welcome, we highly recommend booking online during peak seasons (Spring and Summer) to guarantee entry, as the park occasionally reaches maximum capacity to protect local wildlife. |
| Tickets & Admission | Are there discounts for seniors or students? | Yes! We offer a 15% discount for seniors (65+) and students with a valid ID. Please select the appropriate ticket type during checkout and present your ID at the gate. |
| Navigation & Trails | How accurate is the app's GPS? | Our app uses advanced geolocation that works offline in most park areas. However, deep within the ancient forest sectors, GPS signals may drift. We recommend downloading the offline map before your visit. |
| Conservation Rules | Can I feed the animals? | Strictly no. Feeding wild animals alters their natural foraging behavior and can be harmful to their health. Please observe wildlife quietly from designated trails. |

The page ends with a **“Still need help?”** contact card, the exact support-hours copy **“Our park rangers and support team are available from 8 AM to 6 PM daily to assist you with any inquiries.”**, and a **“Contact Support”** CTA with a chat icon. The source CTA has no destination or script behavior, so it should remain a presentational button unless approved project routing supplies a target.

## Interaction findings

The source defines a single-open accordion: opening one item closes all other `.accordion-item` elements. The active item toggles on click, with `max-height`, opacity, padding, and chevron rotation transitions over 0.3 seconds. The source has no search/filter JavaScript, no result-count or empty-state markup, and no contact action handler. Therefore the React implementation should provide the visible search affordance without inventing backend search behavior; if local filtering is added for usability, it must be documented as a minimal enhancement rather than source-defined behavior.

## Exact source tokens

The primary colors are `#f0fbfe` for background, `#006b2c` for primary, `#ffffff` for primary-on, `#ebf6f8` for low surface, `#ffffff` for lowest surface, `#d9e4e7` for high surface/borders, `#bdcaba` for outline variant, `#131d1f` for on-surface, `#3e4a3d` for on-surface-variant, `#1a6c3b` for secondary, `#a4f5b6` for secondary container, `#617a6e` for tertiary container, and `#6e7b6c` for outline. Typography uses Libre Caslon Text for display/headline styles and Plus Jakarta Sans for body/label styles. Responsive spacing uses 20px mobile margins, 64px desktop margins, 8/16/32/64px stacks, and 16px gutters.
