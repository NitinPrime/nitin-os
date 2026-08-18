import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { AppShell } from "@/components/navigation/app-shell";
import { profile } from "@/data/profile";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Nitin S is a software engineer working across full-stack products, AI/ML systems, and robotics. Currently at EnviroApps INC. Previously Founding Engineer at ChiefPulse. Selected work: autonomous indoor drone, NyayaLens, AI SaaS, backend systems.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.fullName} — Software Engineer`,
    template: `%s — ${profile.fullName}`,
  },
  description,
  authors: [{ name: profile.fullName, url: profile.github }],
  keywords: [
    "Nitin S",
    "Nitin",
    "Software Engineer",
    "Full Stack",
    "AI",
    "Machine Learning",
    "EnviroApps",
    "ChiefPulse",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    title: `${profile.fullName} — Software Engineer`,
    description,
    type: "website",
    locale: "en_US",
    siteName: "NITIN.OS",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} — Software Engineer`,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: "AI Full Stack Engineer",
    email: profile.email,
    telephone: profile.phone,
    url: profile.siteUrl,
    sameAs: [profile.github, profile.linkedin, profile.resume],
    alumniOf: "PSG College of Technology",
    worksFor: {
      "@type": "Organization",
      name: "EnviroApps INC",
      address: "Orlando, Florida",
    },
    image: `${profile.siteUrl}${profile.photo}`,
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body className="grain min-h-screen bg-base font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppShell>
          <main id="main">{children}</main>
        </AppShell>
      </body>
    </html>
  );
}
