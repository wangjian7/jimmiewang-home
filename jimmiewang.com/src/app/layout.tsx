import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jimmie Wang | Chronicle Grid Resume",
  description:
    "Jimmie Wang — technology leader with 20+ years across IBM, SAP, Ant Financial, Mastercard, and NUCC. Switching and clearing systems, big data platforms, and global delivery.",
  keywords: [
    "Jimmie Wang",
    "Jimmie",
    "Wang",
    "王健",
    "resume",
    "portfolio",
    "Mastercard",
    "Ant Financial",
    "SAP",
    "IBM",
    "NUCC",
    "payments",
    "switching and clearing",
  ],
  authors: [{ name: "Jimmie Wang" }],
  creator: "Jimmie Wang",
  alternates: {
    canonical: "https://jimmiewang.com",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://jimmiewang.com",
    siteName: "Jimmie Wang",
    title: "Jimmie Wang | Chronicle Grid Resume",
    description:
      "Technology leader with 20+ years across IBM, SAP, Ant Financial, Mastercard, and NUCC.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jimmie Wang | Chronicle Grid Resume",
    description:
      "Technology leader with 20+ years across IBM, SAP, Ant Financial, Mastercard, and NUCC.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jimmie Wang",
  url: "https://jimmiewang.com",
  email: "hi@jimmiewang.com",
  jobTitle: "Technology Leader",
  description:
    "Technology leader with 20+ years across IBM, SAP, Ant Financial, Mastercard, and NUCC. Switching and clearing systems, big data platforms, and global delivery.",
  worksFor: [
    { "@type": "Organization", name: "Mastercard" },
    { "@type": "Organization", name: "NUCC" },
  ],
  alumniOf: [
    { "@type": "Organization", name: "IBM" },
    { "@type": "Organization", name: "SAP" },
    { "@type": "Organization", name: "Ant Financial" },
  ],
  sameAs: ["https://github.com/wangjian7"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
