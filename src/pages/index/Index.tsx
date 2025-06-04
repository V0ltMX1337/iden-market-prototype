import Header from "@/components/marketplace/Header";
import Footer from "@/components/marketplace/Footer";
import SellersSlider from "@/components/marketplace/seller/SellersSlider";
import CategoriesGrid from "@/components/marketplace/categories/CategoriesGrid";
import LeadersSection from "@/components/marketplace/leaders/LeadersSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <SellersSlider />
        <CategoriesGrid />
        <LeadersSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
