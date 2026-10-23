# Design update 01 — owner's decisions

This folder extends `docs/design/README.md`. Where they disagree, **this file wins**.

- `reference/choices.html` — open it in a browser. It is the visual and behavioural source of truth for everything below: copy sizes, colors, timings, hover and automatic animations from its `<style>` and `<script>` (grouped by comments). Port it to Tailwind + small CSS modules / client components that fit our structure; do not paste the demo page itself.
- `reference/*.png` — screenshots of every block: desktop light, desktop dark, mobile (390px).
- `messages-update.tr.json`, `messages-update.en.json` — new and changed copy. Deep-merge into `messages/tr.json` and `messages/en.json` (same keys in both). Do not reword.

Rich text: strings may contain `<mark>…</mark>` (yellow marker, see M3) and `<link>…</link>`. Render them with next-intl `t.rich`. Arrays (`points`, `sections`, `body`) are read with `t.raw`.

Copy rules that apply everywhere: no company names in any "About" text (companies appear only in Experience); no "live in 4 hotels" style claims outside Experience/About page texts given here; Antalya only on the contact page.

## 1. Navigation and footer

- Header menu: **Ana sayfa (/) · Projeler · Hakkımda · Blog · İletişim**. "Hizmetler" is not in the header.
- Footer menu: Ana sayfa · Projeler · Hakkımda · Hizmetler (/hizmetler) · Blog · İletişim. Bottom row: copyright (`footer.copyright`), email, privacy link (`footer.privacy` → /gizlilik), social icons.
- Link hover = **N3**: the label rolls up (overflow hidden on an inner wrapper) and a brand-colored copy rolls in (0.4s, ease-in-out). Active page = the yellow marker (same gradient as the hero name) behind the label, no dot. The mobile menu keeps its big numbered links; the active one gets the same yellow marker.
- Logo hover (header and footer): the mark's top layer moves up 3px, the bottom layer down 2.5px; the name "BerkCertel" waves letter by letter (each letter translateY(-4px), 35ms stagger), "Certel" turns from muted to ink. Respect reduced motion.
- Routes to add in `src/i18n/routing.ts`: `"/services": { tr: "/hizmetler", en: "/services" }`, `"/privacy": { tr: "/gizlilik", en: "/privacy" }`. Add them to the sitemap later (step 09).

## 2. Highlight marker (M1 + M3)

One reusable component (e.g. `common/Marker`) used in two ways; the marker paints from left to right (background-size 0 → 100%, 0.9s) when it enters the viewport, once. In dark mode the marker uses the sun color at ~45% opacity so light text stays readable. Without JS / reduced motion it is shown fully.

- **M1 — whole title:** the `h1` of inner pages: Projeler, Hakkımda, Hizmetler, Blog, İletişim ("Birlikte çalışalım"). Home section headings keep the blue bar (`SectionHeading`). Privacy and 404 titles stay plain.
- **M3 — key phrase:** only where the copy contains `<mark>`: hero lead, home About p1, services page lead. Max one per paragraph.
- Never use the marker on dark or brand-colored backgrounds (e.g. the blue CTA band).

## 3. Home page

Order: Hero → Hakkımda → Teknolojiler → Deneyim → Projeler → Girişimim (Sunflow) → Hizmetler → Çalışma sürecim → (Blog, step 08) → CTA band.

- **Hero (H3 "Canlı sistem"):** remove the L3/L2/L1 legend card completely (and `STACK_LAYERS`, `hero.layers`). Keep the 3D stack; add: a cursor that moves to the UI button and clicks it (3s loop), service boxes lighting up one after another (2.4s loop, staggered), data rows shrinking/growing like queries (3s loop). Hover on the stack: layers move further apart and get a brand glow; hover on one layer: that layer glows stronger. Keep `hero.stackLabel` as the `aria-label`. Hero lead uses `<mark>`.
- **Hakkımda:** remove the Sunflow card. Texts `about.home.p1` (with marker) and `about.home.p2`, then CV buttons, code card on the right. Delete the old keys `about.paragraph1`, `about.paragraph2`, `about.homeSummary`.
- **Teknolojiler (T3 "Akan şeritler"):** replaces both the old marquee strip and the category cards. One lane per category: left = dark icon tile + category name + count; right = tiles scrolling horizontally forever (duplicated list, edge fade mask), alternating direction per lane, duration ≈ 18s + 2s per item, hover pauses the lane. Tiles keep the brand-color glow and logo tilt on hover. Mobile: label above the lane. `MARQUEE_ITEMS` can be deleted. (T4 in the reference is a backup; do not build it.)
- **Deneyim (scroll progress, blue):** a grey rail plus a fill line (gradient brand blue → light blue `color-mix(in srgb, var(--c-accent) 45%, #9FD8FF)`, soft blue glow) that grows as the page scrolls (start when the timeline top reaches 65% of the viewport). Items the fill has passed: dot becomes filled brand with halo, date brand color, title and text go from 45% opacity to 100% (title also slides 6px right → 0). Small client component, passive scroll listener + requestAnimationFrame. Reduced motion: fully filled, all items lit. Same component on the About page.
- **Projeler:** remove "Canlı demo" from Note App and Expense Tracker (constants), remove the Sunflow "4 otelde canlı" badge and `projects.live` (delete `LiveBadge` if unused). Under the list: `projects.moreNote` + ghost button `projects.moreCta` ↗ → GitHub profile. Shared component, also used on the Projects page.
- **Girişimim:** `SectionHeading` with `sunflow.title` above the promo card; remove the "Girişimim" pill inside the card. No award badge.
- **Hizmetler (home):** layout stays the current 2×2 cards. Remove the tech tags (`ServiceItem.tags`, constants, `services.tags`). New descriptions from the messages file. Add "Tümünü gör →" (`services.viewAll`) → /hizmetler. The `id="services"` anchor can go (no header link anymore).

## 4. New page: Hizmetler (`/hizmetler`, `/en/services`)

- Header: breadcrumb, `h1` with M1 marker, lead `services.pageLead` (with M3), **V1 "Veri akışı"** on the right: Tarayıcı → API → (Servis, Kuyruk) → Veritabanı boxes connected by lines, small glowing dots travel along the lines in a 2.4s loop (blue to Servis, yellow to Kuyruk), box border turns brand on hover. Inline SVG with `<animateMotion>` like the reference. Below 1080px the visual goes under the text (max 420px).
- **S1 list:** numbered rows (big muted number 01–04, title, description, round arrow button). Hover: brand line grows across the top, number turns brand, the `points` chips expand open below the description (grid-template-rows 0fr → 1fr), arrow button turns ink and rotates −45°. Keyboard focus shows the same state. On touch devices the points are always visible.
- Then the existing Process section and the CTA band. Metadata from `metadata.pages.services`.

## 5. Other pages (apply in their own steps)

- **Projeler page (step 06):** header with M1 title and **V3 "Commit grafiği"** on the right (main line draws, feature branch draws and merges back, commit dots pop in; 7s loop). Projects note + GitHub button under the list.
- **Hakkımda page (step 06):** M1 title, texts `about.page.p1–p3`, Sunflow button (kept), CV links, code card, Experience with scroll progress.
- **Blog page (step 08):** header with M1 title and **V4 "Web + mobil senkron"** on the right (a browser window and a phone; a highlighted card appears in both, phone slightly later; 4s loop).
- **İletişim page (step 07):** M1 title, **V5 "Katmana düşen mesaj"** on the right (a blue message card drops onto two isometric layers; 3.2s loop; also replays once when the form is sent successfully). Under the submit button: `contact.privacyNote` (12.5px, muted, `<link>` → /gizlilik).
- V2 (terminal) is not used.

## 6. New page: Gizlilik (`/gizlilik`, `/en/privacy`)

Simple text page (max-width ~70ch): breadcrumb, plain `h1` (`privacy.title`), `privacy.updated` with the date formatted by next-intl (use the date of this change as a constant), then each `privacy.sections[]` as `h2` + paragraphs. Metadata from `metadata.pages.privacy`. Linked from the footer and the contact form. Before finishing, check whether the app sets any cookie; if it does, tell the owner so the "Tarayıcında tutulanlar" section can be updated.

## 7. Back-to-top button

Fixed bottom-right (24px, 16px on mobile), 48px round (44px on mobile), blurred surface background, line border, arrow-up icon. Hidden until `scrollY > 1.5 × viewport height`; then fades and slides in (0.3s); hides again near the top. Smooth scroll to top (instant with reduced motion). `aria-label` = `common.scrollTop`. No bounce or pulse, never covers the mobile menu (hide while it is open). Rendered once in the locale layout.
