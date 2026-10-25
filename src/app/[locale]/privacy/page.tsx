import { LegalDocument } from "@/components/sections/legal/LegalDocument";
import { PRIVACY_UPDATED } from "@/constants/site";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata("privacy", "/privacy");

/** Privacy notice (KVKK art. 10): sections from messages.privacy. */
export default function PrivacyPage() {
  return <LegalDocument namespace="privacy" updated={PRIVACY_UPDATED} />;
}
