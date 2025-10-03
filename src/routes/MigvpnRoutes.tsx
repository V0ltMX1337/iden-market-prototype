import { Routes, Route } from 'react-router-dom';
import SubscriptionPage from '@/pages/migvpn/SubscriptionPage';

const MigvpnRoutes = () => {
  return (
    <Routes>
      <Route path="/migvpn/sub/:token" element={<SubscriptionPage />} />
    </Routes>
  );
};

export default MigvpnRoutes;