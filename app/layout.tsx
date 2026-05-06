import type { Metadata, Viewport } from "next";
import "./tailwind.css";
import "./globals.css";

function getSiteUrl() {
  const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://inhouseos.com").trim();
  const normalizedSiteUrl = /^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`;
  return normalizedSiteUrl.replace(/\/+$/, "");
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "InHouseOS | Restaurant Back Office OS",
    template: "%s | InHouseOS",
  },
  description:
    "InHouseOS is a restaurant back office operating system for Live P&L, purchasing, inventory, waste, labor, payroll review, and AI owner briefs.",
  applicationName: "InHouseOS",
  keywords: [
    "restaurant back office",
    "restaurant operating system",
    "restaurant P&L",
    "restaurant inventory",
    "restaurant labor management",
    "restaurant purchasing",
    "food service software",
  ],
  authors: [{ name: "InHouseOS" }],
  creator: "InHouseOS",
  publisher: "InHouseOS",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "InHouseOS | Restaurant Back Office OS",
    description:
      "Run restaurant sales, purchasing, inventory, waste, labor, payroll review, Live P&L, and AI owner briefs from one operating layer.",
    siteName: "InHouseOS",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "InHouseOS restaurant back office OS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "InHouseOS | Restaurant Back Office OS",
    description:
      "Restaurant back office OS for margin control, daily operating entries, labor review, and AI owner briefs.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#030817",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
