import Icon from '@/components/ui/icon';
import { TabType } from '../types';

interface MobileNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const MobileNav = ({ activeTab, onTabChange }: MobileNavProps) => {
  const navItems = [
    { id: 'feed' as TabType, icon: 'Home', label: 'Лента' },
    { id: 'messages' as TabType, icon: 'MessageCircle', label: 'Чаты', badge: 5 },
    { id: 'video' as TabType, icon: 'Video', label: 'Видео' },
    { id: 'communities' as TabType, icon: 'UsersRound', label: 'Группы' },
    { id: 'profile' as TabType, icon: 'User', label: 'Профиль' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg relative ${
              activeTab === item.id ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Icon name={item.icon as any} size={24} />
            <span className="text-xs">{item.label}</span>
            {item.badge && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
