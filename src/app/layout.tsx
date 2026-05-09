import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15803d",
};

export const metadata: Metadata = {
  title: {
    default: "US Income Tax Calculator 2024-2025 | W-2 & 1099 | Take-Home Pay",
    template: "%s | US Tax Calculator",
  },
  description:
    "Free US income tax calculator. Compare W-2 vs 1099 take-home pay, estimate self-employment tax, federal brackets, Maryland state tax, and quarterly payments.",
  keywords: [
    "US income tax calculator",
    "W-2 tax calculator",
    "1099 tax calculator",
    "self-employment tax",
    "take-home pay",
    "federal tax brackets 2025",
    "Maryland tax calculator",
    "QBI deduction",
    "estimated quarterly payments",
    "FICA calculator",
  ],
  authors: [{ name: "US Tax Calculator" }],
  creator: "US Tax Calculator",
  metadataBase: new URL("https://ustaxcalc.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "US Tax Calculator",
    title: "US Income Tax Calculator 2024-2025",
    description: "Compare W-2 vs 1099 take-home pay. Free, accurate, mobile-friendly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "US Income Tax Calculator 2024-2025",
    description: "Compare W-2 vs 1099 take-home pay. Federal, state, FICA, SE tax.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}