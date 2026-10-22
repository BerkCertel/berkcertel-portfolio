# Design spec — "Layer by layer"

The source of truth is the design canvas in `docs/design/canvas/` (open any `*.dc.html` as plain HTML to read the markup; all styles are in `canvas/site.css`). Screenshots of every page are in `docs/design/screenshots/` (light, dark, mobile). This file summarises what to build and how it should behave.

- Tokens: `docs/design/tokens.css` (colors, fonts, radii, keyframes). Canvas class `.is-dark` = our `.dark`.
- Canvas variables map 1:1 to tokens: `--bg → --c-bg`, `--ink → --c-ink`, `--muted → --c-muted`, `--accent → --c-accent`, etc.
- Fonts: **Bricolage Grotesque** 500/600/700 (display, headings), **Geist** 400/500/600 (body), **Geist Mono** 400/500 (labels, code). Load with `next/font/google`, `display: "swap"`, subsets `latin` + `latin-ext` (Turkish characters).
- Container: max width 1280px, side padding 48px (desktop) / 20px (≤760px). Breakpoints used by the design: 1080px, 900px, 760px.
- Section rhythm: 120px vertical padding desktop, 80px mobile. Section heading = plain title (`h2`, Bricolage 700, clamp(36px, 4.6vw, 60px), tracking -0.045em) with a 44×3px brand-colored bar underneath that grows in, and an optional right-aligned link ("Tümünü gör →").
- Copy: every visible string comes from `messages/{tr,en}.json`. Never hard-code text in components.

## Global parts

**Header** (sticky, blurred background, bottom hairline)
- Left: logo (mark + "Berk" ink + "Certel" muted, Bricolage 700, 21px).
- Center: nav links Projeler · Hakkımda · Hizmetler · Blog · İletişim (pill hover, current page bold/ink).
- Right: language switch, theme toggle, primary button "İletişime geç →", burger (≤900px).
- **Language switch**: pill with two buttons (TR / EN) and a sliding ink-colored thumb behind the active one (transform 0.45s ease-in-out). Uses next-intl `useRouter().replace(pathname, { locale })` so the current page is kept.
- **Theme toggle**: 44px round icon button; sun and moon icons swap with a rotate + scale transition; button rotates −20° on hover.
- **Mobile menu**: full-width panel under the header; big Bricolage links (44px) numbered 01–05 that rise in one by one; bottom row = primary button + language switch.

**Footer** (simple, like the prototype)
- Top row: logo left, footer nav right.
- Dashed separator, then bottom row: "© 2026 Mehmet Berk Certel" (year from `new Date()`), email link, social icon buttons (GitHub, LinkedIn, Upwork, Bionluk "bi" monogram, Instagram).

**CTA band** (end of Home, About, Projects)
- Brand-blue rounded block (28px radius), huge "Birlikte çalışalım", text + "İletişime geç" (inverted button) + WhatsApp ghost button, large faint layer mark in the corner.

## Home — section order

1. **Hero** — two columns.
   - Left: eyebrow "Full-Stack Developer", `h1` "Merhaba,<br>ben **Berk.**" (name uses `.text-highlight`), lead, buttons "Projelere göz at →" (primary) + "✉ İletişime geç" (ghost), then 3 social icon buttons (GitHub, LinkedIn, Upwork). Each child rises in with 80ms stagger.
   - Right: **3D layer stack** — three isometric planes (L1 Veri = dark rows, L2 Servisler = gateway/user/chat/mail/queue boxes with wires, L3 Arayüz = mini UI) that tilt in, separate, and then float slowly; legend card below (L3/L2/L1 with tech names). Copy the exact markup/CSS from `canvas/Main.dc.html` + `site.css` (`.stack-wrap`, `.stage`, `.stk`, `.pl-*`, `.legend`). Decorative: `aria-hidden` on the planes, `role="img"` + label on the wrapper.
2. **Hakkımda (summary)** — two columns, top hairline.
   - Left: section heading with "Devamı →" link to /about, big paragraph (`about.paragraph1`), muted paragraph (`about.homeSummary`), one startup card (sun icon, "Girişimim", **Sunflow**, ghost button "sunflowapp.com ↗"), then "CV’yi indir" (primary, downloads the PDF for the current locale) + "English CV" text link (other locale's PDF).
   - Right: **code card** (`berk.ts`): dark editor window, 3 dots, TS tab, numbered lines from `constants/code-card.ts`, lines rise in one by one (100ms stagger), blinking yellow caret at the end. Slightly rotated (1.2°), straightens on hover.
3. **Teknolojiler** — marquee strip (big muted words separated by small rotated brand squares, infinite scroll, edge fade mask), then heading and a 3-column grid of category cards (`constants/tech-stack.ts`, `span` = columns). Card header: dark icon tile + mono uppercase title + count badge ("11"). Tiles: brand logo (from `TECH_ICONS`, dark logos use ink color) + label; hover lifts 3px, border and soft glow in the brand color (`--c` CSS var per tile), logo scales/rotates slightly. Cards and tiles stagger in. 2 columns ≤1080px, 1 column ≤760px.
4. **Deneyim** — sticky left title, right vertical timeline: gradient line (brand → line color), dots (current = filled brand dot with halo), mono period in brand color, "Role · Company" (company muted), description. Items rise in with stagger.
5. **Projeler** — list (not cards), "Tümünü gör →" link. Each row: mono index `01`, kind pill (startup = yellow), live badge with pulsing green dot ("4 otelde canlı"), big name, description, up to 4 tech chips with logos + "+N" chip (title attr lists the rest), action buttons on the right (site/demo = primary, GitHub = ghost with GitHub icon, details = primary → internal). Hover: brand line grows across the top, soft brand gradient background, index turns brand color. Rows stack on mobile.
6. **Sunflow promo** — rounded card, two columns: left dark art panel (drifting radial gradients, floating order ticket "Havuz Bar · Masa 12 / Yeni sipariş / Mojito ×1 / Club sandviç ×1 / ● Hazırlanıyor", language chips TR EN DE FR RU bottom-left); right: yellow "Girişimim" pill, huge "Sunflow", one sentence, primary button "sunflowapp.com ↗". No award badge on the home page.
7. **Hizmetler** (`id="services"`) — 2×2 grid with hairline gaps; each: dark icon tile (turns brand + rotates on hover), mono eyebrow, title, description, mono tags.
8. **Çalışma sürecim** — 5 step cards in a row with arrows between them (prototype structure). Entrance: card i rises at `i × 0.6s`, its text opens at `+0.25s`, the arrow after it draws its line at `+0.5s` and shows its head at `+0.9s`. After the entrance, an endless highlight walks the steps (icon tile turns brand + tilts, a brand bar sweeps the card bottom; 1.2s apart, 6s loop). ≤1080px: 2 columns, no arrows. ≤760px: vertical with downward arrows.
9. **Blog** — heading + "Tüm yazılar →", 3 post cards (category, reading time, title, summary, "Yazıyı oku →").
10. **CTA band**.

## Other pages

- **Hakkımda** (`/hakkimda`): breadcrumb, `h1` "Hakkımda", two paragraphs, startup card, CV row, languages line (mono), code card on the right; then the Deneyim timeline; CTA band.
- **Projeler** (`/projeler`): breadcrumb, huge `h1`, lead, filter chips (Tümü / Web / Mobil / Full-stack / Girişim, `aria-pressed`) + count ("5 proje"), the same project list; CTA band. Filter state in the URL (`?filter=web`) so it is shareable.
- **miChat** (`/projeler/michat`): breadcrumb, `h1`, lead + GitHub button, all tech chips, 4-column meta grid (Rol, Tür, Teknolojiler, Altyapı), architecture diagram (apps/web → api-gateway → user/chat/mail → packages/auth · cache · database, infra caption), two text blocks (Amaç, Yapı with bullet list), "Sonraki proje: Sunflow" big link.
- **Blog** (`/blog`): breadcrumb, `h1`, lead, category chips, featured post (dark code-tree art + copy), grid of the other posts.
- **Blog post** (`/blog/[slug]`): breadcrumb, title, lead, meta (author · reading time · date), sticky table of contents (active heading highlighted while scrolling), article body (prose: h2, lists with brand square bullets, callout box, dark code blocks, inline code), author row, "Diğer yazılar" (3 cards).
- **İletişim** (`/iletisim`): `h1` "Birlikte çalışalım", lead; left: channel rows (E-posta + copy button, Telefon + "Ara", WhatsApp + primary button, Freelance: Upwork/Bionluk, Konum: Antalya, Türkiye) and social icons; right: form card (Ad, E-posta, Konu chips, Zaman planı select, Mesaj, Turnstile widget, "Mesajı gönder"), success state (brand check tile, "Teşekkürler, {ad}.", text, "Yeni mesaj yaz"). Antalya appears only on this page.
- **404**: eyebrow "Hata 404 · Katman bulunamadı", huge "404", lead, two buttons, three planes falling in (L3 "Kayıp" plane outlined in brand color).

## Shared component look

- **Buttons** (pill, 48px tall, 22px padding, Geist 500 15px): `primary` = ink bg / bg text, hover → brand; `accent` = brand bg; `ghost` = transparent + line border, hover → ink border; `mini` size (38px). Trailing arrow nudges on hover; external links use ↗.
- **Fields**: 50px tall, 12px radius, bg = page bg, line border, brand focus ring; label = small mono uppercase; error text in danger color below.
- **Chips / filter chips**: pill, line border; active = ink bg.
- **Tags**: 26px, 6px radius, sunk bg, mono 12px.
- **Kind pill**: mono 11px uppercase, line border; startup = sun bg.
- **Focus**: 2px brand outline, 3px offset everywhere.

## Motion rules

- Entrance animations use the `rise` keyframe (opacity + `translate`, never `transform`, so hover transforms keep working) with `both` fill. Elements must be fully visible when animations are disabled.
- Below-the-fold sections animate when they enter the viewport: a small `Reveal` client component (IntersectionObserver, `threshold: 0.15`, once) sets `data-visible="true"`; CSS runs the entrance animations only then. Content is hidden before that only when JavaScript is running (`html.js` class set by the inline theme script), so it is never invisible without JS, for crawlers, or with reduced motion.
- `prefers-reduced-motion: reduce` → everything shows instantly (handled globally in tokens.css).
