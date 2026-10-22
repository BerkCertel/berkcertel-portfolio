import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TechIcon } from "./TechIcon";

describe("TechIcon", () => {
  it("renders a two-letter monogram when the tech has no icon", () => {
    render(<TechIcon tech="zustand" label="Zustand" />);

    expect(screen.getByTestId("tech-monogram")).toHaveTextContent("Zu");
  });

  it("renders the brand logo with its color", () => {
    const { container } = render(<TechIcon tech="react" label="React" />);

    expect(screen.queryByTestId("tech-monogram")).toBeNull();
    expect(container.querySelector("svg")).toHaveAttribute("fill", "#61DAFB");
  });

  it("uses the theme ink color for near-black brand logos", () => {
    const { container } = render(<TechIcon tech="nextjs" label="Next.js" />);

    const svg = container.querySelector("svg");
    expect(svg).not.toHaveAttribute("fill");
    expect(svg).toHaveClass("fill-ink");
  });
});
