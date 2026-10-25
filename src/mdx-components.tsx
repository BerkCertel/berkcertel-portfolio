import type { MDXComponents } from "mdx/types";
import { Children, isValidElement } from "react";

import { AppLink } from "@/components/common/AppLink";
import { slugify } from "@/lib/slugify";

/** Plain text of a heading's children (for its anchor id). */
function textOf(node: React.ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (isValidElement<{ children?: React.ReactNode }>(child)) return textOf(child.props.children);
      return "";
    })
    .join("");
}

/** Highlighted note inside a post: `<Callout title="Not">…</Callout>`. */
function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="flex gap-3.5 rounded-2xl border border-l-0 border-line bg-surface px-6 py-[22px] text-[17px]">
      <b className="flex-none pt-[3px] font-mono text-[13px] tracking-[0.06em] text-brand uppercase">
        {title}
      </b>
      <div>{children}</div>
    </aside>
  );
}

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2
      id={slugify(textOf(children))}
      className="mt-[22px] scroll-mt-28 font-display text-[34px] leading-[1.1] font-bold tracking-[-0.035em] max-[760px]:text-[28px]"
    >
      {children}
    </h2>
  ),
  ul: ({ children }) => <ul className="flex flex-col gap-2.5">{children}</ul>,
  li: ({ children }) => (
    <li className="flex gap-3 before:mt-[13px] before:size-1.5 before:flex-none before:rounded-[2px] before:bg-brand before:content-['']">
      <div>{children}</div>
    </li>
  ),
  a: ({ href = "", children }) => (
    <AppLink
      href={href as React.ComponentProps<typeof AppLink>["href"]}
      className="text-brand underline underline-offset-4"
    >
      {children}
    </AppLink>
  ),
  code: ({ children }) => (
    <code className="rounded-[5px] bg-sunk px-1.5 py-0.5 font-mono text-[0.86em]">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-2xl bg-deep px-6 py-[22px] font-mono text-sm leading-[1.75] whitespace-pre text-on-deep [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[inherit]">
      {children}
    </pre>
  ),
  Callout,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
