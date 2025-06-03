import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "2.5М+", label: "Товаров" },
    { value: "50К+", label: "Продавцов" },
    { value: "1М+", label: "Покупателей" },
    { value: "99.8%", label: "Довольных клиентов" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30">
                🚀 Новая эра покупок
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Твой <span className="text-yellow-300">идеальный</span>{" "}
                маркетплейс
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Миллионы товаров, тысячи продавцов, одна платформа. Покупай
                выгодно, продавай успешно.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => navigate("/marketplace")}
              >
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Начать покупки
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                onClick={() => navigate("/admin/register")}
              >
                <Icon name="Store" size={20} className="mr-2" />
                Стать продавцом
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Статистика платформы</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
