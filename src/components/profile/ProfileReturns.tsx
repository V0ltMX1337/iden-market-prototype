import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ProfileReturns = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Возвраты</h1>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Поиск по возвратам"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
          >
            <Icon name="Search" size={16} className="text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Empty State */}
      <Card>
        <CardContent className="flex items-center justify-center py-24">
          <div className="text-center max-w-md space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <Icon name="RotateCcw" size={32} className="text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                У вас пока нет возвратов
              </h3>
              <p className="text-gray-500">
                Здесь будут отображаться все созданные заявки на возврат
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileReturns;
