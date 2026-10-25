# Privacy and cookies: what the site does today

The privacy notice (`/gizlilik`, `/en/privacy`) and the cookie policy (`/cerez-politikasi`, `/en/cookie-policy`) describe exactly this setup. Copy lives in `messages/*.json` (`privacy`, `cookies`).

- **Contact form:** name, email, subject, timeline, message and form language are emailed to the owner over SMTP (Gmail). Nothing is stored in a database.
- **Spam check:** Cloudflare Turnstile, loaded only on the contact page; the server sends the token and the visitor's IP to Cloudflare's siteverify API.
- **Consent:** a short notice (KVKK art. 10, links to the privacy notice) sits above a separate, required checkbox for explicit consent to the transfer abroad (KVKK art. 9), validated on the client and in the Server Action. A note under the button offers plain email instead.
- **Consent record:** every contact mail ends with "Açık rıza (yurt dışına aktarım): verildi · {date time, Europe/Istanbul} · Aydınlatma Metni sürümü {PRIVACY_UPDATED}". Bump `PRIVACY_UPDATED` whenever the notice text changes.
- **Hosting:** Vercel processes every visitor's IP address and browser information in its server logs (KVKK art. 5/2-f); both legal pages say so.
- **Browser storage:** only `localStorage.theme` (light/dark), written when the visitor uses the theme toggle. The site sets no cookies (next-intl's locale cookie is turned off).
- **No cookie banner,** because nothing needs consent.

## Before adding analytics, marketing or any third-party embed

Any tool that sets non-essential cookies or uses similar storage (analytics, ads, pixels, chat widgets, video embeds …) needs a consent mechanism **before** it loads:

1. Add a consent banner with accept / reject options that are equally easy to choose; load the tool only after the visitor accepts.
2. Update the cookie policy (`messages.cookies`) and the privacy notice (`messages.privacy`: data, purposes, legal bases, transfers) in both languages, and bump `COOKIE_POLICY_UPDATED` / `PRIVACY_UPDATED` in `src/constants/site.ts`.
3. If the tool changes what the contact form sends or where it goes, update this file too.
