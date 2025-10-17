import { useState } from 'react';
import { Helmet } from 'react-helmet';
import TrivoidAuth from './TrivoidAuth';
import FeedTab from './tabs/FeedTab';
import MessagesTab from './tabs/MessagesTab';
import FriendsTab from './tabs/FriendsTab';
import AdsTab from './tabs/AdsTab';
import CommunitiesTab from './tabs/CommunitiesTab';
import VideoTab from './tabs/VideoTab';
import TaxiTab from './tabs/TaxiTab';
import MusicTab from './tabs/MusicTab';
import ProfileTab from './tabs/ProfileTab';
import ServicesTab from './tabs/ServicesTab';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import UserProfileView from './views/UserProfileView';
import SettingsView from './views/SettingsView';
import { User, TabType } from './types';

type ViewType = 'tab' | 'user-profile' | 'settings';

const NewPage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [viewType, setViewType] = useState<ViewType>('tab');
  const [viewData, setViewData] = useState<any>(null);

  if (!currentUser) {
    return <TrivoidAuth onSuccess={setCurrentUser} />;
  }

  const handleNavigate = (type: string, data?: any) => {
    if (type === 'user-profile') {
      setViewType('user-profile');
      setViewData(data);
    } else if (type === 'settings') {
      setViewType('settings');
    } else if (type === 'profile') {
      setActiveTab('profile');
      setViewType('tab');
    } else {
      setActiveTab(type as TabType);
      setViewType('tab');
    }
  };

  const handleBack = () => {
    setViewType('tab');
    setViewData(null);
  };

  const handleUserUpdate = (user: User) => {
    setCurrentUser(user);
  };

  const renderContent = () => {
    if (viewType === 'user-profile' && viewData) {
      return (
        <UserProfileView
          user={viewData}
          currentUser={currentUser}
          onBack={handleBack}
        />
      );
    }

    if (viewType === 'settings') {
      return (
        <SettingsView
          currentUser={currentUser}
          onBack={handleBack}
          onUpdate={handleUserUpdate}
        />
      );
    }

    switch (activeTab) {
      case 'feed':
        return <FeedTab currentUser={currentUser} onNavigate={handleNavigate} />;
      case 'messages':
        return <MessagesTab currentUser={currentUser} />;
      case 'friends':
        return <FriendsTab currentUser={currentUser} onNavigate={handleNavigate} />;
      case 'ads':
        return <AdsTab currentUser={currentUser} />;
      case 'communities':
        return <CommunitiesTab currentUser={currentUser} />;
      case 'video':
        return <VideoTab currentUser={currentUser} />;
      case 'taxi':
        return <TaxiTab />;
      case 'music':
        return <MusicTab />;
      case 'profile':
        return <ProfileTab currentUser={currentUser} onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesTab onTabChange={(tab) => setActiveTab(tab as TabType)} />;
      default:
        return <FeedTab currentUser={currentUser} onNavigate={handleNavigate} />;
    }
  };

  const isWideLayout = ['messages', 'communities', 'services'].includes(activeTab);

  return (
    <>
      <Helmet>
        <title>TRIVO — Главная</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header currentUser={currentUser} onTabChange={(tab) => {
          setActiveTab(tab);
          setViewType('tab');
        }} onNavigate={handleNavigate} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar activeTab={activeTab} onTabChange={(tab) => {
            setActiveTab(tab);
            setViewType('tab');
          }} />

          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className={isWideLayout ? 'h-full' : 'max-w-2xl mx-auto py-4 px-3'}>
              {renderContent()}
            </div>
          </main>
        </div>

        <MobileNav activeTab={activeTab} onTabChange={(tab) => {
          setActiveTab(tab);
          setViewType('tab');
        }} />
      </div>
    </>
  );
};

export default NewPage;