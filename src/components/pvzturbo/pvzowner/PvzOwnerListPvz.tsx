import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const myPvz = [
  {
    id: "pvz-001",
    name: "ПВЗ Центральный",
    address: "г. Москва, ул. Ленина, 10",
    status: "Открыт",
  },
  {
    id: "pvz-002",
    name: "ПВЗ Южный",
    address: "г. Москва, ул. Южная, 25",
    status: "Закрыт",
  },
];

const PvzOwnerListPvz = () => {
  const navigation = useNavigate();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Мои ПВЗ</h2>

      <Button onClick={() => navigation("/pvzturboowner/point/create")} className="mb-4">
        Создать ПВЗ
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myPvz.map((pvz) => (
          <Card key={pvz.id}>
            <CardHeader>
              <CardTitle>{pvz.name}</CardTitle>
              <CardDescription>{pvz.address}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <span
                className={`text-sm font-medium px-2 py-1 rounded-full ${
                  pvz.status === "Открыт"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {pvz.status}
              </span>
              <Button
                size="sm"
                onClick={() => navigation(`/pvzturboowner/overview/${pvz.id}`)}
              >
                Перейти к управлению
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PvzOwnerListPvz;
