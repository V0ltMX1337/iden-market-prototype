import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const CategoryFilter = () => {
  const [priceRange, setPriceRange] = useState([28930, 785940]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const platforms = [
    { name: "iOS", checked: true },
    { name: "Android", checked: false },
  ];

  const colors = [
    { name: "Темно-серый", color: "bg-slate-600" },
    { name: "Розовый", color: "bg-pink-400" },
    { name: "Синий", color: "bg-blue-600" },
    { name: "Серебристый", color: "bg-gray-300" },
    { name: "Оранжевый", color: "bg-orange-500" },
    { name: "Голубой", color: "bg-sky-400" },
    { name: "Зеленый", color: "bg-green-500" },
    { name: "Желтый", color: "bg-yellow-400" },
    { name: "Фиолетовый", color: "bg-purple-400" },
    { name: "Красный", color: "bg-red-500" },
    { name: "Мятный", color: "bg-teal-300" },
  ];

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, "")) || 0;
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, "")) || 1000000;
    setPriceRange([priceRange[0], value]);
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName],
    );
  };

  return (
    <div className="space-y-8">
      {/* Price Range */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-6 text-gray-900">Цена</h3>
        <div className="space-y-6">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <span className="absolute left-4 top-3 text-gray-500 text-sm font-medium">
                от
              </span>
              <Input
                value={priceRange[0].toLocaleString()}
                onChange={handleMinPriceChange}
                className="pl-10 text-sm border-2 border-purple-200 rounded-xl h-12 bg-white focus:border-purple-400 font-medium"
              />
            </div>
            <div className="relative flex-1">
              <span className="absolute left-4 top-3 text-gray-500 text-sm font-medium">
                до
              </span>
              <Input
                value={priceRange[1].toLocaleString()}
                onChange={handleMaxPriceChange}
                className="pl-10 text-sm border-2 border-purple-200 rounded-xl h-12 bg-white focus:border-purple-400 font-medium"
              />
            </div>
          </div>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={1000000}
              min={0}
              step={1000}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Color Filter */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-6 text-gray-900">Цвет</h3>
        <div className="grid grid-cols-5 gap-4">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`w-12 h-12 rounded-full border-3 transition-all duration-200 hover:scale-110 transform relative ${
                selectedColors.includes(color.name)
                  ? "border-purple-500 ring-2 ring-purple-200"
                  : "border-gray-300 hover:border-gray-400"
              } ${color.color}`}
              title={color.name}
            >
              {selectedColors.includes(color.name) && (
                <Icon
                  name="Check"
                  size={16}
                  className="absolute inset-0 m-auto text-white"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Filter */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-6 text-gray-900">Платформа</h3>
        <div className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex items-center space-x-3">
              <Checkbox
                id={platform.name}
                defaultChecked={platform.checked}
                className="rounded data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor={platform.name}
                className="text-sm font-medium cursor-pointer text-gray-700"
              >
                {platform.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
