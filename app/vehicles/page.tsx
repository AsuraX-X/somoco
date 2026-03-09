import type { Metadata } from "next";
import ReusableProductsPage from "@/components/Products/ReusableProductsPage";
import VehicleGrid from "@/components/Products/VehicleGrid";

export const metadata: Metadata = {
  title: "Vehicles",
  description:
    "Browse Somoco Ghana's full range of Bajaj motorcycles, tricycles, and commercial vehicles. Find the right vehicle for your needs and request a quote today.",
  keywords: [
    "Bajaj motorcycles Ghana",
    "Bajaj tricycles Ghana",
    "Bajaj RE Ghana",
    "commercial vehicles Ghana",
    "motorcycles for sale Ghana",
    "Somoco vehicles",
  ],
  openGraph: {
    title: "Vehicles | Somoco Ghana Limited",
    description:
      "Browse our full range of Bajaj motorcycles, tricycles, and commercial vehicles available in Ghana.",
    url: "https://www.somocoghana.com/vehicles",
    images: [
      {
        url: "/banners/products-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Somoco Ghana – Vehicle Range",
      },
    ],
  },
  twitter: {
    title: "Vehicles | Somoco Ghana Limited",
    description:
      "Browse our full range of Bajaj motorcycles, tricycles, and commercial vehicles available in Ghana.",
    images: ["/banners/products-banner.jpg"],
  },
  alternates: {
    canonical: "https://www.somocoghana.com/vehicles",
  },
};

const VehiclesPage = () => {
  return (
    <ReusableProductsPage
      title="Vehicles"
      bannerImage="/banners/products-banner.jpg"
      bannerAlt="about us banner"
      contentType="vehicle"
      filterField="type"
      filterLabel="Type"
      searchPlaceholder="Search vehicles..."
      GridComponent={VehicleGrid}
    />
  );
};

export default VehiclesPage;
