import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const ProfileMessages = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <Icon
            name="MessageCircle"
            size={48}
            className="mx-auto text-gray-400"
          />
          <p className="text-gray-600">Раздел сообщений в разработке</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileMessages;
