import ReusableProductsPage from "@/components/Products/ReusableProductsPage";
import BatteryGrid from "@/components/Products/BatteryGrid";

const BatteriesPage = () => {
  return (
    <ReusableProductsPage
      title="Batteries"
      bannerImage="/banners/products-banner.jpg"
      bannerAlt="batteries banner"
      contentType="battery"
      filterField="brand"
      filterLabel="Brand"
      searchPlaceholder="Search batteries..."
      GridComponent={BatteryGrid}
    />
  );
};

export default BatteriesPage;
