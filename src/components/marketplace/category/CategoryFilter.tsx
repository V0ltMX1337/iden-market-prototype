import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const CategoryFilter = () => {
  const categories = [
    { name: "Персональные компьютеры", count: 1, active: true },
    { name: "Ноутбуки", count: 432, active: false },
    { name: "Планшеты", count: 234, active: false },
    { name: "Наушники", count: 891, active: false },
    { name: "Умные часы", count: 156, active: false },
    { name: "Аксессуары", count: 2341, active: false },
  ];

  const brands = ["PotionShop", "Xiaomi"];

  const features = [
    "Быстрая доставка",
    "Бесплатная доставка",
    "Высокий рейтинг",
    "Скидка",
  ];

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Цена</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input placeholder="от" className="text-sm" />
            <Input placeholder="до" className="text-sm" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>до 10 000 ₽</span>
              <span className="text-gray-500">(234)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>10 000 - 50 000 ₽</span>
              <span className="text-gray-500">(456)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>50 000 - 100 000 ₽</span>
              <span className="text-gray-500">(123)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>от 100 000 ₽</span>
              <span className="text-gray-500">(67)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Бренды</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <Input placeholder="Поиск бренда" className="text-sm" />
          </div>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input type="checkbox" className="rounded" />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-2 text-primary">
            Показать все бренды
          </Button>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Особенности</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {features.map((feature) => (
            <label
              key={feature}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{feature}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Clear filters */}
      <Button variant="outline" className="w-full">
        <Icon name="X" size={16} className="mr-2" />
        Очистить фильтры
      </Button>
    </div>
  );
};

export default CategoryFilter;
