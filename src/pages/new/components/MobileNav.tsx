import Icon from '@/components/ui/icon';
import { TabType } from '../types';

interface MobileNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const MobileNav = ({ activeTab, onTabChange }: MobileNavProps) => {
  const navItems = [
    { id: 'feed' as TabType, icon: 'Home' },
    { id: 'messages' as TabType, icon: 'MessageCircle', badge: 5 },
    { id: 'video' as TabType, icon: 'Video' },
    { id: 'communities' as TabType, icon: 'UsersRound' },
    { id: 'profile' as TabType, icon: 'User' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-inset-bottom">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex-1 flex flex-col items-center justify-center py-2 relative transition-colors ${
              activeTab === item.id ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Icon name={item.icon as any} size={24} />
            {item.badge && (
              <span className="absolute top-1 right-1/4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
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
