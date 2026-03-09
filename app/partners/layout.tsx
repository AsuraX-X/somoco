import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Our Partners",
  description:
    "Find authorized Somoco Ghana dealers, service partners, and warranty touch points near you. Search by region and location across Ghana.",
  keywords: [
    "Somoco dealers Ghana",
    "Bajaj dealers Ghana",
    "authorized Bajaj dealer",
    "Somoco service partners",
    "where to buy Bajaj Ghana",
    "Somoco warranty touch points",
    "vehicle dealers Ghana",
  ],
  openGraph: {
    title: "Our Partners & Dealers | Somoco Ghana Limited",
    description:
      "Find authorized Somoco Ghana dealers, service partners, and warranty touch points near you across Ghana.",
    url: "https://www.somocoghana.com/partners",
    images: [
      {
        url: "/banners/banner.png",
        width: 1200,
        height: 630,
        alt: "Somoco Ghana Partners & Dealers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Partners & Dealers | Somoco Ghana Limited",
    description:
      "Find authorized Somoco Ghana dealers, service partners, and warranty touch points near you.",
    images: ["/banners/banner.png"],
  },
  alternates: {
    canonical: "https://www.somocoghana.com/partners",
  },
};

export default function PartnersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
