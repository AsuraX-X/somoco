import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/General/Header";
import Footer from "@/components/General/Footer";
import StudioGuard from "@/components/General/StudioGuard";
import { QuoteRequestProvider } from "@/components/General/QuoteRequestContext";
import QuoteRequestOverlay from "@/components/General/QuoteRequestOverlay";

const ceraPro = localFont({
  src: [
    {
      path: "../public/cera-pro/Cera-Pro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/cera-pro/Cera-Pro-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-cera-pro",
});

const ceraStencil = localFont({
  src: [
    {
      path: "../public/cera-stencil/Cera-Stencil-Regular-Demo.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/cera-stencil/Cera-Stencil-Bold-Demo.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cera-stencil",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.somocoghana.com"),

  title: {
    default: "Somoco Ghana Limited",
    template: "%s | Somoco Ghana Limited",
  },

  description:
    "Somoco Ghana Limited is the authorized distributor for Bajaj vehicles, tyres, and batteries in Ghana. Explore our range of motorcycles, tricycles, and commercial vehicles.",

  keywords: [
    "Somoco",
    "Somoco Ghana",
    "Somoco Ghana Limited",
    "Bajaj",
    "Bajaj Ghana",
    "motorcycles Ghana",
    "tricycles Ghana",
    "Bajaj RE",
    "commercial vehicles Ghana",
    "tyres Ghana",
    "batteries Ghana",
    "Mohinani Group",
    "authorized Bajaj dealer",
    "vehicle service Ghana",
    "spare parts Ghana",
  ],

  authors: [{ name: "Somoco Ghana Limited", url: "https://www.somocoghana.com" }],
  creator: "Somoco Ghana Limited",
  publisher: "Somoco Ghana Limited",

  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://www.somocoghana.com",
    siteName: "Somoco Ghana Limited",
    title: "Somoco Ghana Limited | Bajaj Vehicles, Tyres & Batteries",
    description:
      "Authorized distributor for Bajaj vehicles, tyres, and batteries in Ghana. Motorcycles, tricycles, commercial vehicles and more.",
    images: [
      {
        url: "/banners/banner.png",
        width: 1200,
        height: 630,
        alt: "Somoco Ghana Limited – Authorized Bajaj Distributor",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Somoco Ghana Limited | Bajaj Vehicles, Tyres & Batteries",
    description:
      "Authorized distributor for Bajaj vehicles, tyres, and batteries in Ghana.",
    images: ["/banners/banner.png"],
  },

  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [{ url: "/favicon_io/apple-touch-icon.png" }],
    other: [
      {
        rel: "icon",
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  manifest: "/favicon_io/site.webmanifest",

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

  alternates: {
    canonical: "https://www.somocoghana.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ceraPro.variable} ${ceraStencil.variable}`}>
      <body className={`${ceraPro.className} mt-14 antialiased`}>
        <QuoteRequestProvider>
          <StudioGuard header={<Header />} footer={<Footer />}>
            {children}
          </StudioGuard>
          <QuoteRequestOverlay />
        </QuoteRequestProvider>
      </body>
    </html>
  );
}
