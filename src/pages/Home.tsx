import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Добро пожаловать в
          <span className="text-blue-600 block mt-2">POTIONMARKET</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Современный маркетплейс электроники с удобным интерфейсом и быстрой
          доставкой
        </p>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl"
          onClick={() => navigate("/marketplace")}
        >
          Перейти к покупкам 🛒
        </Button>
      </div>
    </div>
  );
};

export default Home;
