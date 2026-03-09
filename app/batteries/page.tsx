import type { Metadata } from "next";
import ReusableProductsPage from "@/components/Products/ReusableProductsPage";
import BatteryGrid from "@/components/Products/BatteryGrid";

export const metadata: Metadata = {
  title: "Batteries",
  description:
    "Browse Somoco Ghana's range of automotive batteries. Quality batteries for motorcycles, tricycles, and commercial vehicles — trusted brands, reliable performance.",
  keywords: [
    "batteries Ghana",
    "automotive batteries",
    "motorcycle battery",
    "Bajaj battery",
    "vehicle battery Ghana",
    "Somoco batteries",
  ],
  openGraph: {
    title: "Batteries | Somoco Ghana Limited",
    description:
      "Quality automotive batteries for motorcycles, tricycles, and commercial vehicles available at Somoco Ghana.",
    url: "https://www.somocoghana.com/batteries",
    images: [
      {
        url: "/banners/battery-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Somoco Ghana Batteries",
      },
    ],
  },
  alternates: {
    canonical: "https://www.somocoghana.com/batteries",
  },
};

const BatteriesPage = () => {
  return (
    <ReusableProductsPage
      title="Batteries"
      bannerImage="/banners/battery-banner.jpg"
      bannerAlt="batteries banner"
      bannerContain
      contentType="battery"
      filterField="brand"
      filterLabel="Brand"
      searchPlaceholder="Search batteries..."
      GridComponent={BatteryGrid}
    />
  );
};

export default BatteriesPage;
