import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { User, TabType } from '../types';

interface HeaderProps {
  currentUser: User;
  onTabChange: (tab: TabType) => void;
  onNavigate: (type: string, data?: any) => void;
}

const Header = ({ currentUser, onTabChange, onNavigate }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center gap-2"
            onClick={() => onTabChange('feed')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900 hidden sm:block">TRIVO</span>
          </button>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Поиск"
              className="pl-9 h-9 bg-gray-100 border-0 rounded-full text-sm focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Icon name="Bell" size={20} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Icon name="Settings" size={20} className="text-gray-600" />
          </button>
          <button
            onClick={() => onTabChange('profile')}
            className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {currentUser.avatar}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
