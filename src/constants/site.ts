/** Single source of truth for personal and contact details. */
export const SITE = {
  name: "Berk Certel",
  fullName: "Mehmet Berk Certel",
  jobTitle: "Full-Stack Developer",
  email: "m.berkcertel@outlook.com",
  phone: "+90 546 546 5857",
  phoneHref: "tel:+905465465857",
  whatsappHref: "https://wa.me/905465465857",
  location: { city: "Antalya", country: "Türkiye" },
  cv: {
    tr: "/cv/mehmet-berk-certel-cv-tr.pdf",
    en: "/cv/mehmet-berk-certel-cv-en.pdf",
  },
  sunflowUrl: "https://sunflowapp.com",
} as const;

/** Turkey time: post publish dates and the consent timestamp in contact mails. */
export const SITE_TIME_ZONE = "Europe/Istanbul";

/**
 * Dates of the current privacy notice and cookie policy (shown as "Last updated").
 * PRIVACY_UPDATED is also the notice version recorded with each consent in the contact mail.
 */
export const PRIVACY_UPDATED = "2026-10-25";
export const COOKIE_POLICY_UPDATED = "2026-10-25";
