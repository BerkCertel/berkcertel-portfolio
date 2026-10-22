// The real root layout is src/app/[locale]/layout.tsx (it renders <html lang={locale}>).
// This pass-through exists because src/app/not-found.tsx needs a layout at the app root.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
