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
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import { User, TabType } from './types';

const NewPage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('feed');

  if (!currentUser) {
    return <TrivoidAuth onSuccess={setCurrentUser} />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedTab currentUser={currentUser} />;
      case 'messages':
        return <MessagesTab currentUser={currentUser} />;
      case 'friends':
        return <FriendsTab currentUser={currentUser} />;
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
        return <ProfileTab currentUser={currentUser} />;
      default:
        return <FeedTab currentUser={currentUser} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>MyPlatform — Главная</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header currentUser={currentUser} onTabChange={setActiveTab} />

        <div className="flex">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="flex-1 pb-16 md:pb-0">
            {renderTab()}
          </main>
        </div>

        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </>
  );
};

export default NewPage;
