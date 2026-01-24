import ReusableProductsPage from "@/components/Products/ReusableProductsPage";
import TyreGrid from "@/components/Products/TyreGrid";

const TyresPage = () => {
  return (
    <ReusableProductsPage
      title="Tyres"
      bannerImage="/banners/products-banner.jpg"
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
