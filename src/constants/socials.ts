import type { SocialKey, SocialLink } from "@/types/content";

export const SOCIALS: Record<SocialKey, SocialLink> = {
  github: { key: "github", label: "GitHub", href: "https://github.com/BerkCertel" },
  linkedin: { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/mehmet-berk-certel-38223b254" },
  upwork: { key: "upwork", label: "Upwork", href: "https://www.upwork.com/freelancers/~0111351e657d4f81f8" },
  bionluk: { key: "bionluk", label: "Bionluk", href: "https://bionluk.com/berkcertel" },
  instagram: { key: "instagram", label: "Instagram", href: "https://www.instagram.com/lberkcertel/" },
};

/** Hero shows the three most relevant profiles. */
export const HERO_SOCIALS: SocialKey[] = ["github", "linkedin", "upwork"];
/** Footer and contact page show all of them. */
export const ALL_SOCIALS: SocialKey[] = ["github", "linkedin", "upwork", "bionluk", "instagram"];
/** Freelance platforms on the contact page. */
export const FREELANCE_SOCIALS: SocialKey[] = ["upwork", "bionluk"];
