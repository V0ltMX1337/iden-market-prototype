import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCard {
  id: string;
  title: string;
  price: number;
  photoUrl: string;
}

interface SimilarProductsProps {
  products: ProductCard[];
  onViewAllClick: () => void;
}

const SimilarProducts = ({ products, onViewAllClick }: SimilarProductsProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Похожие объявления</h3>
      <div className="grid grid-cols-2 gap-4">
        {products.map(({ id, title, price, photoUrl }) => (
          <Card key={id} className="h-48 flex flex-col">
            <img src={photoUrl} alt={title} className="h-28 object-cover rounded-t-lg" />
            <CardContent className="p-2 flex flex-col justify-between flex-1">
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-sm text-gray-700 font-bold">{price.toLocaleString()} ₽</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        variant="outline"
        className="mt-4 w-full h-10 border-blue-600 text-blue-600 hover:bg-blue-50"
        onClick={onViewAllClick}
      >
        Смотреть все похожие
      </Button>
    </div>
  );
};

export default SimilarProducts;
