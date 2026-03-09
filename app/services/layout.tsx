import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Vehicle Service Center",
  description:
    "Book your vehicle service appointment at Somoco Ghana's Service Center. We offer 18-month engine warranties, maintenance, repairs, and free basic education on vehicle upkeep.",
  keywords: [
    "Somoco service center",
    "Bajaj vehicle service Ghana",
    "motorcycle repair Ghana",
    "vehicle maintenance Accra",
    "Bajaj warranty Ghana",
    "tricycle service center",
    "Somoco repair",
  ],
  openGraph: {
    title: "Vehicle Service Center | Somoco Ghana Limited",
    description:
      "Book your vehicle service appointment at Somoco Ghana's Service Center. 18-month engine warranty on motorcycles and Bajaj RE tricycles.",
    url: "https://www.somocoghana.com/services",
    images: [
      {
        url: "/banners/service-banner.png",
        width: 1200,
        height: 630,
        alt: "Somoco Ghana Vehicle Service Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Service Center | Somoco Ghana Limited",
    description:
      "Book your vehicle service appointment at Somoco Ghana's Service Center.",
    images: ["/banners/service-banner.png"],
  },
  alternates: {
    canonical: "https://www.somocoghana.com/services",
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
