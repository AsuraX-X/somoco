import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Somoco Ghana Limited, the Mohinani Group, and Bajaj Auto. Discover our history, mission, and commitment to delivering quality vehicles and services across Ghana.",
  keywords: [
    "Somoco Ghana about",
    "Mohinani Group",
    "Bajaj Auto Ghana",
    "Somoco history",
    "authorized Bajaj distributor Ghana",
    "Somoco mission",
  ],
  openGraph: {
    title: "About Us | Somoco Ghana Limited",
    description:
      "Learn about Somoco Ghana Limited, the Mohinani Group, and Bajaj Auto — delivering quality vehicles and services across Ghana.",
    url: "https://www.somocoghana.com/about",
    images: [
      {
        url: "/banners/about-somoco.jpg",
        width: 1200,
        height: 630,
        alt: "About Somoco Ghana Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Somoco Ghana Limited",
    description:
      "Learn about Somoco Ghana Limited, the Mohinani Group, and Bajaj Auto.",
    images: ["/banners/about-somoco.jpg"],
  },
  alternates: {
    canonical: "https://www.somocoghana.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
