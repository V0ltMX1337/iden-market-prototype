import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

const CategoryFilter = () => {
  const platforms = [
    { name: "iOS", checked: true },
    { name: "Android", checked: false },
  ];

  const colors = [
    { name: "Серый", color: "bg-gray-500" },
    { name: "Розовый", color: "bg-pink-400" },
    { name: "Синий", color: "bg-blue-500" },
    { name: "Серебристый", color: "bg-gray-300" },
    { name: "Оранжевый", color: "bg-orange-500" },
    { name: "Голубой", color: "bg-cyan-400" },
    { name: "Зеленый", color: "bg-green-500" },
    { name: "Желтый", color: "bg-yellow-400" },
    { name: "Фиолетовый", color: "bg-purple-400" },
    { name: "Красный", color: "bg-red-500" },
    { name: "Мятный", color: "bg-teal-300" },
  ];

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Цена</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input placeholder="28930" className="text-sm" />
            <span className="flex items-center text-gray-500">до</span>
            <Input placeholder="785940" className="text-sm" />
          </div>
          <Slider
            defaultValue={[28930, 785940]}
            max={1000000}
            min={0}
            step={1000}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Color Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Цвет</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors ${color.color}`}
                title={color.name}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Платформа</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex items-center space-x-2">
              <Checkbox
                id={platform.name}
                defaultChecked={platform.checked}
                className="rounded"
              />
              <label
                htmlFor={platform.name}
                className="text-sm font-medium cursor-pointer"
              >
                {platform.name}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Temperature Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Максимальная цветовая температура, K
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="4000" className="text-sm" />
        </CardContent>
      </Card>

      {/* Clear filters */}
      <Button variant="outline" className="w-full">
        <Icon name="RotateCcw" size={16} className="mr-2" />
        Сбросить фильтры
      </Button>
    </div>
  );
};

export default CategoryFilter;
