import type { Metadata } from "next";

import { SITE } from "@/constants/site";

import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE.name,
};

// Temporary root layout; replaced by src/app/[locale]/layout.tsx in step 02.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
