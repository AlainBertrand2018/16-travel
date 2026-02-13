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
  title: "SIXTEEN TRAVEL | Your Ultimate Touring Partner in Mauritius",
  description: "Bespoke tourism services in Mauritius. Exclusive tours, adventure activities, and seamless travel experiences with instant confirmation and best price guaranteed.",
  openGraph: {
    title: "SIXTEEN TRAVEL | Your Ultimate Touring Partner in Mauritius",
    description: "Bespoke tourism services in Mauritius. Exclusive tours, adventure activities, and seamless travel experiences with instant confirmation and best price guaranteed.",
    url: "https://16-travel.vercel.app/",
    siteName: "Sixteen Travel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIXTEEN TRAVEL | Your Ultimate Touring Partner in Mauritius",
    description: "Bespoke tourism services in Mauritius. Exclusive tours, adventure activities, and seamless travel experiences with instant confirmation and best price guaranteed.",
  },
  alternates: {
    canonical: "https://16-travel.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
