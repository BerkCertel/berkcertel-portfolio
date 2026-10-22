export const CONTACT_SUBJECTS = ["webApp", "mobileApp", "backend", "website", "jobOffer"] as const;
export const CONTACT_TIMELINES = ["asap", "months", "thisYear", "notSure"] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];
export type ContactTimeline = (typeof CONTACT_TIMELINES)[number];

export const CONTACT_LIMITS = {
  nameMax: 80,
  messageMin: 10,
  messageMax: 2000,
} as const;
