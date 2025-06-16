import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import PartnerProductForm from "@/components/partner/PartnerProductForm";
import ProductWizardForm from "./ProductWizardForm";

const PartnerProducts = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
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
        <Button onClick={() => setIsFormOpen(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить товар
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.sku}</p>
                    <p className="text-xs text-gray-400">{product.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium">
                      {product.price.toLocaleString()} ₽
                    </p>
                    <p className="text-sm text-gray-500">
                      В наличии: {product.stock}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct(product.id)}
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {isFormOpen && <ProductWizardForm onClose={() => setIsFormOpen(false)} />}

      {editingProduct && (
        <PartnerProductForm
          productId={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default PartnerProducts;
