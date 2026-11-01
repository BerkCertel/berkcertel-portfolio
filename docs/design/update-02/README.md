# Update 02 — Technologies: static view + About

Reference: `reference/tech-views.html` (open in a browser). It contains several options; **only these are chosen**:

| Where | Chosen | Ignore |
|---|---|---|
| Home → Technologies, desktop | **G1 "Satır satır, hepsi görünür"** as the second (static) view + the view switch | G2, G3 |
| Home → Technologies, mobile (≤760px) | **Only the static list** (right phone frame, "İkinci görünüm · hepsi"). No switch, no tabs, no lanes on mobile | left phone (tabs) |
| About page | **A3 "Katmanlarda teknolojiler"** (layered bands) | A1, A2 |

Screenshots: `g1-flow*.png`, `g1-grid*.png`, `mobile-list*.png`, `about-a3*.png` (light + dark).
Visuals, sizes, colors, timings and hover must match the reference HTML (`.vs`, `.g1`, `.mall`/`.mrow`/`.mchip`, `.a3`/`.band` CSS + `wire()` JS).

## 1. View switch (desktop, >760px)
- Right of the "Teknolojiler" section heading, same pill style as the TR/EN language switch, sliding dark thumb (`.vs`, `.th`).
- Two icon-only buttons: lanes icon (animated lines when active) = current flowing lanes (default), 2×2 grid icon = static G1.
- No visible text. Tooltip on hover/focus + `aria-label` (TR: "Akan görünüm" / "Hepsini göster"; EN: "Flowing view" / "Show all").
- `role="radiogroup"` with `role="radio"` + `aria-checked`, ArrowLeft/ArrowRight toggles, visible focus ring.
- On switch, the newly shown view replays the short rise animation (`.enter`). Reduced motion: no animation, everything visible.
- State is local (no URL, no storage, no cookie). Default = flowing lanes.

## 2. G1 static view
- Same rows as the lanes (category icon, name, count badge), but tiles are static and wrap: every technology visible.
- Reuse the existing TechTile / category data (single source, e.g. `TECH_CATEGORIES`); no duplicated lists.

## 3. Mobile (≤760px)
- Replace the current tabbed mobile layout with the static all-categories list (category header with icon + count, small logo chips below).
- The switch is hidden on mobile; lanes are not rendered there. Remove the now-unused mobile tab code/messages.

## 4. About page — A3
- New full-width section **above Experience**: title "Kullandığım teknolojiler" / EN "Technologies I use".
- Four bands, slightly tilted (`perspective rotateX(7deg)`), straighten + accent border/shadow on hover:
  - Arayüz / Interface — Frontend · Mobile · Languages
  - Servisler / Services — Backend · Auth
  - Veri / Data — Database & ORM (**dark band**)
  - Araçlar / Tools — DevOps & Tools
- Chips = same logo chips, generated from the same tech data (dedupe by name). ≤860px: label above chips (one column).
- No company names, no extra text.
