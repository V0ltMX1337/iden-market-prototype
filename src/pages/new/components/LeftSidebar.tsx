import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '../types';

interface LeftSidebarProps {
  currentUser: User;
  onNavigate: (type: string, data?: any) => void;
}

const LeftSidebar = ({ currentUser, onNavigate }: LeftSidebarProps) => {
  return (
    <div className="w-60 space-y-3">
      <Card>
        <CardContent className="p-3">
          <div 
            className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            onClick={() => onNavigate('profile')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg">
              {currentUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{currentUser.name}</div>
              <div className="text-xs text-gray-600">Мой профиль</div>
            </div>
          </div>
          
          <div className="space-y-1 text-sm">
            <div 
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => onNavigate('friends')}
            >
              <span className="text-gray-700">Друзья</span>
              <span className="font-semibold text-gray-900">{currentUser.friendsCount}</span>
            </div>
            <div 
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => onNavigate('profile')}
            >
              <span className="text-gray-700">Подписчики</span>
              <span className="font-semibold text-gray-900">{currentUser.followersCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="text-xs font-semibold text-gray-500 mb-2 px-2">БЫСТРЫЙ ДОСТУП</div>
          <div className="space-y-1">
            {[
              { icon: 'Bookmark', label: 'Закладки', count: 0, action: 'profile' },
              { icon: 'Image', label: 'Фотографии', count: 0, action: 'profile' },
              { icon: 'Video', label: 'Видео', count: 0, action: 'video' },
              { icon: 'Music', label: 'Аудиозаписи', count: 0, action: 'music' },
            ].map((item) => (
              <div 
                key={item.label} 
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer text-sm"
                onClick={() => onNavigate(item.action)}
              >
                <Icon name={item.icon as any} size={18} className="text-gray-600" />
                <span className="flex-1">{item.label}</span>
                {item.count > 0 && <span className="text-xs text-gray-500">{item.count}</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="text-xs font-semibold text-gray-500 mb-2 px-2">МОИ СООБЩЕСТВА</div>
          <div className="space-y-2">
            {['🌍', '💻', '📸'].map((emoji, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => onNavigate('communities')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                  {emoji}
                </div>
                <span className="flex-1 text-sm truncate">Сообщество {idx + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftSidebar;