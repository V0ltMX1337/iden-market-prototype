import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'feed' as TabType, icon: 'Home', label: 'Лента', badge: null },
    { id: 'messages' as TabType, icon: 'MessageCircle', label: 'Сообщения', badge: 5 },
    { id: 'friends' as TabType, icon: 'Users', label: 'Друзья', badge: 3 },
    { id: 'communities' as TabType, icon: 'UsersRound', label: 'Сообщества', badge: null },
    { id: 'video' as TabType, icon: 'Video', label: 'Видео', badge: null },
    { id: 'ads' as TabType, icon: 'ShoppingBag', label: 'Объявления', badge: null },
    { id: 'taxi' as TabType, icon: 'Car', label: 'Такси', badge: null },
    { id: 'music' as TabType, icon: 'Music', label: 'Музыка', badge: null },
  ];

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon name={item.icon as any} size={22} />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <Badge className="bg-red-500 text-white">{item.badge}</Badge>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
