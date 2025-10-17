import Icon from '@/components/ui/icon';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'feed' as TabType, icon: 'Home', label: 'Лента' },
    { id: 'messages' as TabType, icon: 'MessageCircle', label: 'Сообщения', count: 5 },
    { id: 'friends' as TabType, icon: 'Users', label: 'Друзья', count: 3 },
    { id: 'communities' as TabType, icon: 'UsersRound', label: 'Сообщества' },
    { id: 'video' as TabType, icon: 'Video', label: 'Видео' },
    { id: 'music' as TabType, icon: 'Music', label: 'Музыка' },
    { id: 'services' as TabType, icon: 'Grid3x3', label: 'Сервисы' },
  ];

  return (
    <aside className="hidden md:flex w-20 lg:w-64 bg-white border-r border-gray-200 h-[calc(100vh-56px)] sticky top-14 flex-col">
      <nav className="flex-1 py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors relative ${
              activeTab === item.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {activeTab === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
            )}
            <Icon name={item.icon as any} size={24} className="flex-shrink-0" />
            <span className="hidden lg:block font-medium text-[15px]">{item.label}</span>
            {item.count && (
              <span className="hidden lg:block ml-auto bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
