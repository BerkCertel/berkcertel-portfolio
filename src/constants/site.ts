/** Single source of truth for personal and contact details. */
export const SITE = {
  name: "Berk Certel",
  fullName: "Mehmet Berk Certel",
  jobTitle: "Full-Stack Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://berkcertel.com",
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

/** Date of the current privacy notice (shown as "Last updated"). */
export const PRIVACY_UPDATED = "2026-10-23";
