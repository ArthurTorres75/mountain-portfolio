import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SITE_META, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_META.title,
    template: `%s | Arthur Torres`,
  },
  description: SITE_META.description,
  authors: [{ name: SITE_META.author }],
  creator: SITE_META.author,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_META.title,
    description: SITE_META.description,
    siteName: "Arthur Torres Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.title,
    description: SITE_META.description,
    creator: SITE_META.twitterHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
