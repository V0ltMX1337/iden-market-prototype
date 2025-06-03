import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const ProfileReturns = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <Icon name="RotateCcw" size={48} className="mx-auto text-gray-400" />
          <p className="text-gray-600">Раздел возвратов в разработке</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileReturns;
