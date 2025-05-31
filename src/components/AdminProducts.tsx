import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AdminProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Системный блок игровой AMD Ryzen 3 1200",
      sku: "MRKT-4518VU1AVTQDZER",
      category: "Настольные компьютеры",
      price: 58800,
      stock: 88,
      sales: 1,
      image:
        "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=300",
      status: "active",
    },
    {
      id: 2,
      name: "Чернитель резины GRASS Black rubber",
      sku: "MRKT-QR715FXR",
      category: "Полироли для шин",
      price: 560,
      stock: 100,
      sales: 1,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300",
      status: "active",
    },
    {
      id: 3,
      name: "Зарядное USB-устройство в салон авто",
      sku: "MRKT-LFD475E",
      category: "Автомобильные зарядные устройства",
      price: 560,
      stock: 72,
      sales: 1,
      image:
        "https://images.unsplash.com/photo-1609281369376-df4e2a8a2992?w=300",
      status: "active",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Товары</h2>
          <p className="text-gray-600">Управление каталогом товаров</p>
        </div>
        <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
          <Icon name="Plus" size={16} />
          Добавить товар
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">
                  Товар
                </th>
                <th className="text-left p-4 font-medium text-gray-900">SKU</th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Категория
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Статус
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Остаток
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Цена
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Продажи
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 font-mono text-sm">
                    {product.sku}
                  </td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Готов к продаже
                    </span>
                  </td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4 font-medium">
                    {product.price.toLocaleString()} ₽
                  </td>
                  <td className="p-4">{product.sales}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
