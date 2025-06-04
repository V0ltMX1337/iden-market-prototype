import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import Home from "@/pages/Home";
import MarketplaceHome from "@/pages/marketplace/MarketplaceHome";
import MarketplaceCategory from "@/pages/marketplace/MarketplaceCategory";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<MarketplaceHome />} />
          <Route
            path="/marketplace/category"
            element={<MarketplaceCategory />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
