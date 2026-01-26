import ReusableProductsPage from "@/components/Products/ReusableProductsPage";
import VehicleGrid from "@/components/Products/VehicleGrid";

const VehiclesPage = () => {
  return (
    <ReusableProductsPage
      title="Products"
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
