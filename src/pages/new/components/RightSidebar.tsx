import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RightSidebarProps {
  onNavigate: (type: string, data?: any) => void;
}

const RightSidebar = ({ onNavigate }: RightSidebarProps) => {
  const suggestions = [
    { id: 1, name: 'Алсу Малекова', avatar: '👩', mutualFriends: 12 },
    { id: 2, name: 'Анна Горбунова', avatar: '👩', mutualFriends: 8 },
    { id: 3, name: 'Ангелина Романенко', avatar: '👩', mutualFriends: 5 },
  ];

  return (
    <div className="w-72 space-y-3">
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Возможные друзья</div>
            <Button variant="ghost" size="sm" className="text-xs h-auto p-0 text-blue-600">
              Все
            </Button>
          </div>
          
          <div className="space-y-3">
            {suggestions.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg cursor-pointer"
                  onClick={() => onNavigate('user-profile', user)}
                >
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div 
                    className="font-medium text-sm truncate cursor-pointer hover:underline"
                    onClick={() => onNavigate('user-profile', user)}
                  >
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">{user.mutualFriends} общих</div>
                </div>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <Icon name="UserPlus" size={14} className="mr-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="text-sm font-semibold mb-3">Реклама</div>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">🎁</div>
            <div className="text-sm font-medium mb-1">Специальное предложение</div>
            <div className="text-xs text-gray-600">Реклама здесь</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:underline">О платформе</a>
              <a href="#" className="hover:underline">Помощь</a>
              <a href="#" className="hover:underline">Правила</a>
              <a href="#" className="hover:underline">Реклама</a>
            </div>
            <div className="text-xs">© 2024 MyPlatform</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSidebar;
