import type { Metadata } from "next";
import ReusableProductsPage from "@/components/Products/ReusableProductsPage";
import TyreGrid from "@/components/Products/TyreGrid";

export const metadata: Metadata = {
  title: "Tyres",
  description:
    "Browse Somoco Ghana's range of quality tyres for motorcycles, tricycles, and commercial vehicles. Find the right tyre size and brand for your vehicle.",
  keywords: [
    "tyres Ghana",
    "Bajaj tyres",
    "motorcycle tyres Ghana",
    "tricycle tyres",
    "commercial vehicle tyres",
    "Somoco tyres",
  ],
  openGraph: {
    title: "Tyres | Somoco Ghana Limited",
    description:
      "Browse our range of quality tyres for motorcycles, tricycles, and commercial vehicles in Ghana.",
    url: "https://www.somocoghana.com/tyres",
    images: [
      {
        url: "/banners/tyres-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Somoco Ghana Tyres",
      },
    ],
  },
  alternates: {
    canonical: "https://www.somocoghana.com/tyres",
  },
};

const TyresPage = () => {
  return (
    <ReusableProductsPage
      title="Tyres"
      bannerImage="/banners/tyres-banner.jpg"
      bannerAlt="tyres banner"
      contentType="tyres"
      filterField="brand"
      filterLabel="Brand"
      searchPlaceholder="Search tyres..."
      GridComponent={TyreGrid}
    />
  );
};

export default TyresPage;
