# berkcertel-portfolio

Personal portfolio of Mehmet Berk Certel (full-stack developer) — berkcertel.com. Bilingual (TR default at `/`, EN at `/en`), light/dark theme, SEO-first.

## Read first

- `docs/design/README.md` — what every page and section looks like and how it moves.
- `docs/design/tokens.css` — colors, fonts, radii, keyframes (already merged into `src/app/globals.css` after step 01).
- `docs/design/canvas/` — the original design markup + `site.css`. When unsure about a size, spacing or effect, copy it from there.
- `docs/design/screenshots/` — how pages must look.
- `messages/tr.json`, `messages/en.json` — **all** UI copy. Do not invent or rewrite copy; if a string is missing, add it to both files with matching meaning and tell the owner.

## Stack

- Next.js (App Router, latest stable), React, TypeScript (strict), Bun as package manager and script runner.
- Tailwind CSS v4 + shadcn/ui (new-york style, `lucide-react` icons). Add shadcn components only with `bun run ui:add <name>` (the registry imports cn from the "cn" package; the script rewrites it to @/lib/utils).
- next-intl (localized pathnames, see `src/i18n/routing.ts`). In this Next.js version the request interceptor file is `src/proxy.ts` (formerly `middleware.ts`).
- Fonts via `next/font/google`: Bricolage Grotesque, Geist, Geist Mono. Put the font CSS variables (`--font-bricolage`, `--font-geist`, `--font-geist-mono`) on `<html>`, not `<body>`.
- Theme: own tiny ThemeProvider + inline script in `<head>` that sets `.dark` before paint (no `next-themes`; it triggers a React script warning). Stores `theme` in localStorage, falls back to `prefers-color-scheme`.
- Forms: react-hook-form + zod (`@hookform/resolvers`). Contact form posts to a Server Action.
- Mail: Nodemailer over Gmail SMTP (Google app password) — `src/lib/mail.ts`.
- Spam protection: Cloudflare Turnstile (`@marsidev/react-turnstile` on the client, server-side verification in the action).
- Blog: MDX files in `content/blog/{tr,en}/*.mdx` rendered with `@next/mdx`; each file exports `metadata` (see `src/types/blog.ts`).
- Tests: Vitest (unit) + Playwright (smoke/e2e, **max 3 workers**). Lint: ESLint + Prettier (`prettier-plugin-tailwindcss`).

## Folder structure

```
content/blog/{tr,en}/          MDX posts
docs/design/                   design spec, tokens, canvas, screenshots
messages/{tr,en}.json          next-intl messages (all copy)
public/brand/                  logo + mark SVGs (light/dark)
public/cv/                     CV PDFs (tr/en)
public/icons/                  PWA icons (192, 512, maskable)
src/
  app/
    [locale]/                  pages (layout, page, about, projects, projects/michat, blog, blog/[slug], contact, not-found)
    sitemap.ts robots.ts manifest.ts favicon.ico icon.svg apple-icon.png globals.css
  actions/                     server actions (contact.ts)
  components/
    ui/                        shadcn primitives (generated, keep untouched where possible)
    common/                    app-level building blocks: AppButton, AppLink, AppField, AppInput, AppTextarea, AppSelect,
                               AppChip, Container, Section, SectionHeading, Reveal, Logo, ThemeToggle, LanguageSwitch,
                               SocialLinks, TechIcon, TechChip, CodeCard, Breadcrumb, JsonLd
    layout/                    Header, MobileMenu, Footer, CtaBand
    sections/
      home/                    Hero, LayerStack, AboutPreview, TechStack, Marquee, Experience, ProjectList, SunflowPromo,
                               Services, Process, BlogPreview
      about/ projects/ contact/ blog/   page-specific pieces
  constants/                   data that is not copy: site.ts, socials.ts, navigation.ts, tech-stack.ts, tech-icons.ts,
                               projects.ts, experience.ts, services.ts, process.ts, contact.ts, code-card.ts
  hooks/                       use-in-view.ts, use-copy-to-clipboard.ts …
  i18n/                        routing.ts, navigation.ts, request.ts
  lib/                         utils.ts (cn), env.ts, seo.ts, json-ld.ts, mail.ts, turnstile.ts, blog.ts
  providers/                   theme-provider.tsx
  schemas/                     zod schemas (contact.ts)
  types/                       shared TypeScript types
  proxy.ts                     next-intl locale routing
```

Files in `src/constants`, `src/types` and `src/i18n/routing.ts` were provided with the kit — extend them, do not rename keys.

## Coding rules

- KISS, DRY, YAGNI. Small, single-purpose components. No speculative abstractions, no unused props or files.
- Server Components by default; `"use client"` only where state/effects/browser APIs are needed, as low in the tree as possible.
- Text: always `useTranslations` / `getTranslations`. Data: always from `src/constants`. Types: from `src/types` (or `z.infer` from `src/schemas`).
- Reuse `components/common` everywhere (e.g. never style a raw `<button>` — use `AppButton`; never a raw `<input>` — use `AppField` + `AppInput`). `App*` components wrap shadcn primitives and add the design's variants via `cva`.
- Internal links only through `Link` from `@/i18n/navigation` (localized pathnames). External links: `target="_blank" rel="noopener noreferrer"` handled once inside `AppLink`.
- Styling: Tailwind utilities with the tokens (`bg-bg`, `text-ink`, `text-subtle`, `border-line`, `bg-brand`, `bg-sun`, `font-display`, `font-mono` …). No hex values in components. Complex effects (layer stack, process arrows) may use a colocated CSS module.
- Accessibility: semantic landmarks, one `h1` per page, labelled icon buttons, `aria-pressed` on toggles/filters, visible focus, alt text, color contrast AA, keyboard-usable menu (Esc closes, focus returns).
- Performance: no layout shift, images via `next/image`, icons inline SVG, no heavy animation libraries (CSS + IntersectionObserver only).
- Env: read env vars only through `src/lib/env.ts` (zod-validated; server-only secrets never imported in client code).
- Content rules: copy is first person and factual. Never add stats, claims, clients or testimonials that are not in `messages/*.json`. Sunflow never gets a GitHub link (private repo). Do not mention AI tools anywhere in the UI.

## Git rules

- Never `git push`, never create remote branches or PRs. The owner pushes.
- Commit at the end of every step with Conventional Commits in English (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`, `style:`), small and meaningful; several commits per step are fine.
- No AI attribution in commit messages (no "Co-Authored-By", no "Generated with").
- Never commit `.env*` files except `.env.example`.

## Commands

```
bun dev            # local dev
bun run lint       # eslint
bun run typecheck  # tsc --noEmit
bun run test       # vitest
bun run test:e2e   # playwright (3 workers)
bun run build      # production build
```

Before finishing a step: `bun run lint && bun run typecheck && bun run build` must pass.
