import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import StationCanvasLoader from "@/components/StationCanvasLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arthur | Full Stack Engineer",
  description:
    "Full Stack Engineer specialized in scalable systems, frontend excellence and premium user experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <StationCanvasLoader />
        <div className="relative z-10 flex flex-col min-h-full">{children}</div>
      </body>
    </html>
  );
}
