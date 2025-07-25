import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface SellerInfoProps {
  seller: {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl?: string;
    registrationDate: string;
    city: { name: string };
  };
  averageRating?: number; // сделал необязательным на всякий случай
}

const SellerInfo = ({ seller, averageRating = 0 }: SellerInfoProps) => {
  const navigate = useNavigate();

  const formattedDate = new Date(seller.registrationDate).toLocaleDateString("ru-RU");
  const safeRating = typeof averageRating === "number" ? averageRating : 0;

  return (
    <Card className="mt-6 h-fit">
      <CardContent className="p-4">
        <h3 className="font-bold mb-3">Продавец</h3>
        <div className="flex items-start gap-4">
          {seller.photoUrl ? (
            <img
              src={seller.photoUrl}
              alt={`${seller.firstName} ${seller.lastName}`}
              className="w-12 h-12 rounded-full object-cover mb-4 border border-gray-300"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Icon name="User" size={32} className="text-white" />
            </div>
          )}

          <div className="flex-1">
            <h4 className="font-semibold">
              {seller.firstName} {seller.lastName}
            </h4>
            <div className="text-sm text-gray-500 mb-1">
              • Пользователь с {formattedDate}
            </div>
            <div className="mb-2">{seller.city.name}</div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className={i < Math.floor(safeRating) ? "fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="font-semibold">{safeRating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full mt-3 h-10 hover:bg-gray-50 transition-colors"
          onClick={() => navigate(`/user/${seller.id}`)}
        >
          Все объявления продавца
        </Button>
      </CardContent>
    </Card>
  );
};

export default SellerInfo;
