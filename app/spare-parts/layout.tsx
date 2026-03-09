import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spare Parts",
  description:
    "Order genuine spare parts for Bajaj motorcycles, tricycles, and commercial vehicles from Somoco Ghana Limited. Filters, brake pads, body parts and more — fast delivery across Ghana.",
  keywords: [
    "spare parts Ghana",
    "Bajaj spare parts",
    "motorcycle spare parts",
    "tricycle spare parts",
    "genuine spare parts",
    "Somoco spare parts",
    "vehicle parts Ghana",
  ],
  openGraph: {
    title: "Spare Parts | Somoco Ghana Limited",
    description:
      "Order genuine spare parts for Bajaj motorcycles, tricycles, and commercial vehicles. Fast delivery across Ghana.",
    url: "https://www.somocoghana.com/spare-parts",
    images: [
      {
        url: "/banners/Spares.jpg",
        width: 1200,
        height: 630,
        alt: "Somoco Ghana Spare Parts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spare Parts | Somoco Ghana Limited",
    description:
      "Order genuine spare parts for Bajaj motorcycles, tricycles, and commercial vehicles from Somoco Ghana.",
    images: ["/banners/Spares.jpg"],
  },
  alternates: {
    canonical: "https://www.somocoghana.com/spare-parts",
  },
};

export default function SparePartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
