import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "SIXTEEN TRAVEL | Your Ultimate Touring Partner in Mauritius",
  description: "Bespoke tourism services in Mauritius. Exclusive tours, adventure activities, and seamless travel experiences with instant confirmation and best price guaranteed.",
  openGraph: {
    title: "SIXTEEN TRAVEL | Your Ultimate Touring Partner in Mauritius",
    description: "Bespoke tourism services in Mauritius. Exclusive tours, adventure activities, and seamless travel experiences with instant confirmation and best price guaranteed.",
    url: "https://16-travel.vercel.app/",
    siteName: "Sixteen Travel",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/sixteentravel.firebasestorage.app/o/products%2Fmauritius-1-8_wd%20(1).webp?alt=media&token=b15b879f-96f4-48e3-b815-88766c33b13e",
        width: 1200,
        height: 630,
        alt: "Sixteen Travel Mauritius",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIXTEEN TRAVEL | Your Ultimate Touring Partner in Mauritius",
    description: "Bespoke tourism services in Mauritius. Exclusive tours, adventure activities, and seamless travel experiences with instant confirmation and best price guaranteed.",
    images: ["https://firebasestorage.googleapis.com/v0/b/sixteentravel.firebasestorage.app/o/products%2Fmauritius-1-8_wd%20(1).webp?alt=media&token=b15b879f-96f4-48e3-b815-88766c33b13e"],
  },
  alternates: {
    canonical: "https://16-travel.vercel.app/",
  },
};

import { CookieConsent } from "@/components/CookieConsent";
import { Preloader } from "@/components/Preloader";
import { HashScrollHandler } from "@/components/HashScrollHandler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body className="antialiased">
        <HashScrollHandler />
        <Preloader />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
