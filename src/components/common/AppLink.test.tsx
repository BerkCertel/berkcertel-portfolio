import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import messages from "../../../messages/tr.json";

import { AppLink } from "./AppLink";

const renderWithIntl = (ui: React.ReactNode) =>
  render(
    <NextIntlClientProvider locale="tr" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );

describe("AppLink", () => {
  it("opens external links in a new tab with a screen-reader hint", () => {
    renderWithIntl(<AppLink href="https://github.com/BerkCertel">GitHub</AppLink>);

    const link = screen.getByRole("link", { name: /GitHub/ });
    expect(link).toHaveAttribute("href", "https://github.com/BerkCertel");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveTextContent("yeni sekmede açılır");
  });

  it("keeps mailto links in the same tab", () => {
    renderWithIntl(<AppLink href="mailto:hi@example.com">Mail</AppLink>);

    const link = screen.getByRole("link", { name: "Mail" });
    expect(link).not.toHaveAttribute("target");
  });
});
