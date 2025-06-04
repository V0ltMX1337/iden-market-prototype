import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  textColor: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "iPhone 12 Pro",
    subtitle: "и Pro Max",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop",
    bgColor: "bg-purple-600",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Привет,",
    subtitle: "фиолет!",
    image:
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=200&h=200&fit=crop",
    bgColor: "bg-purple-300",
    textColor: "text-purple-900",
  },
  {
    id: 3,
    title: "Samsung",
    subtitle: "Galaxy S21",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=200&fit=crop",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Игровая",
    subtitle: "консоль",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop",
    bgColor: "bg-gradient-to-br from-blue-400 to-teal-300",
    textColor: "text-white",
  },
  {
    id: 5,
    title: "iPhone 12 Pro",
    subtitle: "и Pro Max",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 6,
    title: "Привет,",
    subtitle: "фиолет!",
    image:
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=200&h=200&fit=crop",
    bgColor: "bg-purple-300",
    textColor: "text-purple-900",
  },
];

const ProductSlider = () => {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`${product.bgColor} ${product.textColor} min-w-[140px] h-[140px] rounded-2xl border-0 cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col justify-between p-4 relative overflow-hidden`}
            >
              <div className="flex flex-col">
                <h3 className="font-semibold text-sm leading-tight">
                  {product.title}
                </h3>
                <p className="text-xs opacity-90 mt-1">{product.subtitle}</p>
              </div>

              <div className="absolute bottom-2 right-2 w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
