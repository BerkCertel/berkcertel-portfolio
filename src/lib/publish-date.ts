/** Posts go live on their date in Turkey's time zone. */
const PUBLISH_TIME_ZONE = "Europe/Istanbul";

/** Today's date in Turkey as "YYYY-MM-DD" (the en-CA format is ISO-like). */
export function todayInTurkey(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: PUBLISH_TIME_ZONE }).format(now);
}

/** True when an ISO post date ("2026-11-01") is today or earlier in Turkey. */
export function isPublished(date: string, now = new Date()) {
  return date <= todayInTurkey(now);
}
