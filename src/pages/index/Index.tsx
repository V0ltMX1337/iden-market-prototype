import Header from "@/components/marketplace/Header";
import SellersStories from "@/components/marketplace/seller/SellersStories";
import ProductSlider from "@/components/marketplace/product/ProductSlider";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SellersStories />
    </div>
  );
};

export default Index;
