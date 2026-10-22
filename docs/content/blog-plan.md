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
