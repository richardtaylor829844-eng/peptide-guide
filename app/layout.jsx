import { SITE_URL, SITE_NAME, S } from "@/lib/data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DisclaimerGate } from "@/components/DisclaimerGate";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Plain-English Peptide Research`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Plain-English education on peptides researchers have studied for recovery, weight loss, anti-aging, sleep, immunity, and more.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Plain-English Peptide Research`,
    description: "Plain-English education on peptides researchers have studied for recovery, weight loss, anti-aging, sleep, immunity, and more.",
    images: [{ url: "/logo.png", width: 600, height: 220, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Plain-English peptide research education.",
    images: ["/logo.png"],
  },
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "Peptide Ref",
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  themeColor: "#0B1120",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: S.bg, color: S.t, fontFamily: S.f, minHeight: "100vh" }}>
        <DisclaimerGate />
        <Nav />
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
