import { MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { AppButton } from "@/components/common/AppButton";
import { AppLink } from "@/components/common/AppLink";
import { BrandIcon } from "@/components/common/icons";
import { SocialLinks } from "@/components/common/SocialLinks";
import { SITE } from "@/constants/site";
import { ALL_SOCIALS, FREELANCE_SOCIALS, SOCIALS } from "@/constants/socials";

import { CopyButton } from "./CopyButton";

/** One channel row: mono label + big value on the left, an action on the right. */
function Channel({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-line py-5 first:border-t">
      <div className="min-w-0">
        <span className="eyebrow">{label}</span>
        <p className="mt-1 font-display text-[22px] font-semibold tracking-[-0.025em] [overflow-wrap:anywhere]">
          {value}
        </p>
      </div>
      {children}
    </li>
  );
}

const ICON_CLASS = "size-3.5";

/** Contact channels (email, phone, WhatsApp, freelance, location) and all social profiles. */
export function ContactChannels() {
  const t = useTranslations("contact.channels");

  return (
    <div className="flex flex-col gap-7">
      <ul>
        <Channel label={t("email")} value={SITE.email}>
          <CopyButton text={SITE.email} />
        </Channel>
        <Channel label={t("phone")} value={SITE.phone}>
          <AppButton
            asChild
            variant="ghost"
            size="mini"
            leftIcon={<Phone className={ICON_CLASS} strokeWidth={1.75} aria-hidden="true" />}
          >
            <AppLink href={SITE.phoneHref}>{t("call")}</AppLink>
          </AppButton>
        </Channel>
        <Channel label={t("whatsapp")} value={t("whatsappText")}>
          <AppButton asChild size="mini" leftIcon={<BrandIcon name="whatsapp" />}>
            <AppLink href={SITE.whatsappHref}>{t("whatsappCta")}</AppLink>
          </AppButton>
        </Channel>
        <Channel
          label={t("freelance")}
          value={FREELANCE_SOCIALS.map((key) => SOCIALS[key].label).join(" · ")}
        >
          <div className="flex gap-2">
            {FREELANCE_SOCIALS.map((key) => (
              <AppButton key={key} asChild variant="ghost" size="mini">
                <AppLink href={SOCIALS[key].href}>{SOCIALS[key].label}</AppLink>
              </AppButton>
            ))}
          </div>
        </Channel>
        <Channel label={t("location")} value={t("locationValue")}>
          <MapPin className="size-[18px] text-subtle" strokeWidth={1.75} aria-hidden="true" />
        </Channel>
      </ul>
      <SocialLinks items={ALL_SOCIALS} />
    </div>
  );
}
