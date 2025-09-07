import { Routes, Route } from 'react-router-dom';
import TaxiLanding from '@/pages/taxi/TaxiLanding';
import TaxiAuth from '@/pages/taxi/TaxiAuth';
import TaxiOrder from '@/pages/taxi/TaxiOrder';
import TaxiProfile from '@/pages/taxi/TaxiProfile';
import ClientDashboard from '@/pages/taxi/dashboards/ClientDashboard';
import { TaxiAuthProvider } from '@/contexts/TaxiAuthContext';

const TaxiRoutes = () => {
  return (
    <Routes>
      <Route path="/migalki" element={<TaxiLanding />} />
      <Route path="/migalki/*" element={
        <TaxiAuthProvider>
          <Routes>
            <Route path="/auth" element={<TaxiAuth />} />
            <Route path="/order" element={<TaxiOrder />} />
            <Route path="/profile" element={<TaxiProfile />} />
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            {/* Для других ролей пока перенаправляем на клиентский дашборд */}
            <Route path="/dashboard/driver" element={<ClientDashboard />} />
            <Route path="/dashboard/manager" element={<ClientDashboard />} />
            <Route path="/dashboard/admin" element={<ClientDashboard />} />
          </Routes>
        </TaxiAuthProvider>
      } />
    </Routes>
  );
};

export default TaxiRoutes;