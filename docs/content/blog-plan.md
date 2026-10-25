# Blog plan (step 09)

The site launches with 4 posts, each in TR and EN (same `translationKey`). The miChat post is already written. The other three are drafted in step 09 from the outlines below, in Berk's voice (first person, short sentences, no invented numbers, clients or results). Before writing the Sunflow post, ask Berk 3–4 questions and use only his answers for any Sunflow-specific detail.

| # | translationKey | Category | TR title | EN title |
|---|---|---|---|---|
| 1 | michat-microservices | engineering | Bir mesajlaşma uygulamasını Turborepo ile mikroservislere bölmek | Splitting a messaging app into microservices with Turborepo |
| 2 | auth-choice | engineering | Better Auth, Clerk ya da düz JWT? | Better Auth, Clerk or plain JWT? |
| 3 | web-or-mobile | guides | Web uygulaması mı, mobil uygulama mı? | Web app or mobile app? |
| 4 | hotel-qr-ordering | tourism | Oteller QR siparişten aslında ne bekliyor? | What do hotels really expect from QR ordering? |

## 2 · Better Auth, Clerk ya da düz JWT? (~5 min)
- I have used all three: Better Auth (miChat, Note App), Clerk (Spotlight), JWT (Expense Tracker).
- When a hosted service (Clerk) makes sense: fast start, mobile + web, no user table to manage.
- When a library in my own database (Better Auth) makes sense: data ownership, Drizzle/PostgreSQL schema, sessions.
- When plain JWT is enough: small APIs; what you must handle yourself (refresh, revoke, storage).
- Short decision checklist.

## 3 · Web uygulaması mı, mobil uygulama mı? (~5 min)
- Start from the users: where they are, how often they use it, do they need the camera/notifications/offline.
- A responsive web app is the fastest way to test an idea; React Native + Expo when the phone is the product.
- Sharing logic and types between the two (TypeScript, one backend/API).
- Short checklist for someone preparing to ask a developer for a quote.

## 4 · Oteller QR siparişten aslında ne bekliyor? (~4 min)
- Written from Berk's answers only (ask first). Possible angles: multilingual menus (TR, EN, DE, FR, RU), orders reaching the right bar/kitchen, staff screens, reporting.

## Weekly posts after launch (scheduled)

Same rules: TR + EN with the same `translationKey`, first person, short sentences, only general technical knowledge and what really exists in Berk's projects (this repo, `src/constants/projects.ts`, miChat's structure). Code that is not copied from a real repo is labelled as a simplified or general example.

| # | Date | translationKey | Category | TR slug | EN slug |
|---|---|---|---|---|---|
| 5 | 2026-11-22 | next-intl | engineering | next-intl-ile-cok-dilli-nextjs | multilingual-nextjs-with-next-intl |
| 6 | 2026-11-29 | turborepo-monorepo | engineering | turborepo-ile-monorepo | monorepo-with-turborepo |
| 7 | 2026-12-06 | docker-compose-local | guides | docker-compose-ile-yerel-gelistirme | local-development-with-docker-compose |
| 8 | 2026-12-13 | react-native-expo | guides | react-native-expo-ile-mobil-uygulama | building-mobile-apps-with-react-native-expo |
| 9 | 2026-12-20 | drizzle-vs-prisma | engineering | drizzle-mi-prisma-mi | drizzle-or-prisma |

- **5 · next-intl:** this site's real routing settings (`localePrefix: "as-needed"`, TR default, no locale detection or cookie, localized pathnames), `Link`, the language switch with `getPathname`, `translationKey` for posts, typed messages, canonical + hreflang.
- **6 · Turborepo:** why one repo for miChat, its `apps/` + `packages/` layout, using workspace packages, a general `turbo.json`, caching.
- **7 · Docker Compose:** miChat's `infra/docker-compose.yaml` idea (PostgreSQL, Redis, RabbitMQ) as a simplified example, commands, volumes, env URLs.
- **8 · React Native + Expo:** Spotlight's stack (Expo, Convex, Clerk, NativeWind); general points: real devices, both platforms, secure token storage, live queries, safe areas.
- **9 · Drizzle or Prisma:** general comparison (schema, queries, code generation, migrations), Drizzle in miChat and Note App, shared schema package.
