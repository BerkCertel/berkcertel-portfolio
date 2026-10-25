import { LegalDocument } from "@/components/sections/legal/LegalDocument";
import { COOKIE_POLICY_UPDATED } from "@/constants/site";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = () => pageMetadata("cookies", "/cookies");

/** Cookie policy: sections from messages.cookies. */
export default function CookiesPage() {
  return <LegalDocument namespace="cookies" updated={COOKIE_POLICY_UPDATED} />;
}
