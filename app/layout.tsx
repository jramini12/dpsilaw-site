import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DPSI Law: Interpreter Prep",
  description:
    "Flashcards and karaoke-style courtroom practice scenarios for UK DPSI Law candidates. Build legal vocabulary and rehearse live interpreting drills.",
  metadataBase: new URL("https://dpsi-law.vercel.app"),
  openGraph: {
    title: "DPSI Law: Interpreter Prep",
    description:
      "Flashcards and karaoke-style courtroom practice scenarios for UK DPSI Law candidates.",
    url: "https://dpsi-law.vercel.app",
    siteName: "DPSI Law: Interpreter Prep",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        <header className="border-b border-stone-200/70 bg-white/80 backdrop-blur sticky top-0 z-10">
          <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span
                aria-hidden
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white text-xs font-bold"
              >
                DL
              </span>
              <span>DPSI Law</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-stone-600">
              <Link href="/" className="hover:text-stone-900 transition-colors">
                Home
              </Link>
              <Link href="/privacy" className="hover:text-stone-900 transition-colors">
                Privacy
              </Link>
              <Link href="/support" className="hover:text-stone-900 transition-colors">
                Support
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200/70 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-stone-500">
            <p>
              {new Date().getFullYear()} DPSI Law: Interpreter Prep. Independent study aid.
              Not affiliated with or endorsed by the Chartered Institute of Linguists.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-stone-900 transition-colors">
                Privacy
              </Link>
              <Link href="/support" className="hover:text-stone-900 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
