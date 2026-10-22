import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

/** Display font: headings, logo, big numbers. */
export const bricolage = Bricolage_Grotesque({
  weight: ["500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-bricolage",
});

/** Body font. */
export const geist = Geist({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist",
});

/** Mono font: labels, code. */
export const geistMono = Geist_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist-mono",
});

/** Font CSS variable classes — goes on <html> (not <body>) so tokens resolve everywhere. */
export const fontVariables = `${bricolage.variable} ${geist.variable} ${geistMono.variable}`;
