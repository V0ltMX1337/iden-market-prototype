import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import AdminProductForm from "@/components/AdminProductForm";
import AdminAnalytics from "@/components/AdminAnalytics";
import AdminOrders from "@/components/AdminOrders";

const AdminDashboard = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [products] = useState([
    {
      id: 1,
      name: "Смартфон iPhone 14",
      price: 89999,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
      views: 1250,
      orders: 12,
    },
    {
      id: 2,
      name: "Ноутбук MacBook Air",
      price: 149999,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300",
      views: 890,
      orders: 8,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Панель продавца
            </h1>
            <Button
              onClick={() => setShowProductForm(true)}
              className="flex items-center gap-2"
            >
              <Icon name="Plus" size={16} />
              Создать товар
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      {product.price.toLocaleString()} ₽
                    </p>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>Просмотры: {product.views}</span>
                      <span>Заказы: {product.orders}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>

          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>
        </Tabs>
      </div>

      {showProductForm && (
        <AdminProductForm onClose={() => setShowProductForm(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;
