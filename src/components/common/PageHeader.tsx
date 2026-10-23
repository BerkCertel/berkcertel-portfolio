import { useTranslations } from "next-intl";

import { Breadcrumb } from "./Breadcrumb";
import { Marker } from "./Marker";

interface PageHeaderProps {
  /** h1 id, for the section's aria-labelledby. */
  id: string;
  title: string;
  /** Breadcrumb label when it differs from the title (e.g. "İletişim" vs "Birlikte çalışalım"). */
  crumb?: string;
  lead: React.ReactNode;
  /** Small animated visual on the right (V1, V3, V5 …); goes under the text below 1080px. */
  visual: React.ReactNode;
}

/** Inner page header: breadcrumb, M1-marked h1, lead, and a visual on the right. */
export function PageHeader({ id, title, crumb = title, lead, visual }: PageHeaderProps) {
  const t = useTranslations("common");

  return (
    <section
      aria-labelledby={id}
      className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-10 pt-[72px] max-[1080px]:grid-cols-1 max-[760px]:pt-11"
    >
      <div>
        <Breadcrumb items={[{ label: t("home"), href: "/" }, { label: crumb }]} />
        <h1
          id={id}
          className="mt-[18px] font-display text-[clamp(56px,8vw,120px)] leading-[0.95] font-bold tracking-[-0.05em]"
        >
          <Marker>{title}</Marker>
        </h1>
        <p className="mt-[18px] max-w-[46ch] text-[19px] leading-[1.55] text-subtle max-[760px]:text-[17px]">
          {lead}
        </p>
      </div>
      <div className="w-full max-[1080px]:max-w-[420px]">{visual}</div>
    </section>
  );
}
