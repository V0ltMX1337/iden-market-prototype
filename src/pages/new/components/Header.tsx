import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { User, TabType } from '../types';

interface HeaderProps {
  currentUser: User;
  onTabChange: (tab: TabType) => void;
  onNavigate: (type: string, data?: any) => void;
}

const Header = ({ currentUser, onTabChange, onNavigate }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('feed')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">TRIVO</span>
            </div>

            <div className="hidden md:block w-96">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Поиск..."
                  className="pl-10 bg-gray-100 border-0 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Icon name="Bell" size={24} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Настройки"
            >
              <Icon name="Settings" size={24} className="text-gray-600" />
            </button>
            <div 
              className="cursor-pointer"
              onClick={() => onTabChange('profile')}
            >
              <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-semibold text-lg">
                {currentUser.avatar}
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;