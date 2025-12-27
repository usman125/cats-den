import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { Outfit, DM_Sans } from "next/font/google";
import { SessionProvider } from "@/components/providers";
import { PreviewBanner } from "@/components/dato";
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from "@/components/seo";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://catsden.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF8F0" },
    { media: "(prefers-color-scheme: dark)", color: "#2D2D2D" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cat's Den | Premium Kittens for Loving Homes",
    template: "%s | Cat's Den",
  },
  description:
    "Find your perfect feline companion at Cat's Den. We offer healthy, well-socialized kittens from champion bloodlines including Ragdoll, Persian, Maine Coon, British Shorthair, and more.",
  keywords: [
    "kittens for sale",
    "cat breeder",
    "purebred kittens",
    "ragdoll kittens",
    "persian kittens",
    "maine coon kittens",
    "british shorthair kittens",
    "scottish fold kittens",
    "bengal kittens",
    "kitten adoption",
    "cat adoption",
    "healthy kittens",
    "pedigreed cats",
  ],
  authors: [{ name: "Cat's Den" }],
  creator: "Cat's Den",
  publisher: "Cat's Den",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Cat's Den",
    title: "Cat's Den | Premium Kittens for Loving Homes",
    description:
      "Find your perfect feline companion at Cat's Den. Healthy, well-socialized kittens from champion bloodlines.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cat's Den - Premium Kittens for Loving Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cat's Den | Premium Kittens for Loving Homes",
    description:
      "Find your perfect feline companion at Cat's Den. Healthy, well-socialized kittens from champion bloodlines.",
    images: ["/og-image.jpg"],
    creator: "@catsden",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  category: "shopping",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isPreviewMode } = await draftMode();

  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Structured Data for SEO */}
        <OrganizationSchema
          url={siteUrl}
          sameAs={[
            "https://facebook.com/catsden",
            "https://instagram.com/catsden",
            "https://twitter.com/catsden",
          ]}
        />
        <WebsiteSchema url={siteUrl} />
        <LocalBusinessSchema url={siteUrl} />
        
        <SessionProvider>
          {children}
          <PreviewBanner isEnabled={isPreviewMode} />
        </SessionProvider>
      </body>
    </html>
  );
}
