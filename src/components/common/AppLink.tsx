import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

type InternalHref = React.ComponentProps<typeof Link>["href"];
type ExternalHref = `http${string}` | `mailto:${string}` | `tel:${string}`;

type AppLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: InternalHref | ExternalHref;
};

const isExternal = (href: AppLinkProps["href"]): href is ExternalHref =>
  typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);

/**
 * The only link component: localized `Link` for internal pages, a plain <a> otherwise.
 * http(s) links open in a new tab with a screen-reader hint; mailto/tel stay in place.
 */
export function AppLink({
  href,
  children,
  // Link-only props: forwarded to Link, never rendered onto a raw <a>.
  prefetch,
  locale,
  scroll,
  replace,
  ...props
}: AppLinkProps) {
  const t = useTranslations("common");

  if (!isExternal(href)) {
    return (
      <Link
        href={href}
        prefetch={prefetch}
        locale={locale}
        scroll={scroll}
        replace={replace}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (!href.startsWith("http")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> ({t("external")})</span>
    </a>
  );
}
