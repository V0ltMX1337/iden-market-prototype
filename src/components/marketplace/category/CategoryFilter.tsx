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

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Цена</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
                от
              </span>
              <Input
                placeholder="28930"
                className="pl-8 text-sm border-2 border-gray-200 rounded-lg"
              />
            </div>
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
                до
              </span>
              <Input
                placeholder="785940"
                className="pl-8 text-sm border-2 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <Slider
            defaultValue={[28930, 785940]}
            max={1000000}
            min={0}
            step={1000}
            className="w-full"
          />
        </div>
      </div>

      {/* Color Filter */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Цвет</h3>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors ${color.color} hover:scale-110 transform`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Platform Filter */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Платформа</h3>
        <div className="space-y-3">
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
