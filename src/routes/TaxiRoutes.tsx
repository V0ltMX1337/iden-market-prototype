import { Routes, Route } from 'react-router-dom';
import TaxiLanding from '@/pages/taxi/TaxiLanding';
import TaxiAuth from '@/pages/taxi/TaxiAuth';
import TaxiOrder from '@/pages/taxi/TaxiOrder';
import TaxiOrderTracking from '@/pages/taxi/TaxiOrderTracking';
import TaxiProfile from '@/pages/taxi/TaxiProfile';
import ClientDashboard from '@/pages/taxi/dashboards/ClientDashboard';
import DriverDashboard from '@/pages/taxi/dashboards/DriverDashboard';
import ManagerDashboard from '@/pages/taxi/dashboards/ManagerDashboard';
import AdminDashboard from '@/pages/taxi/dashboards/AdminDashboard';
import DriverOrderScreen from '@/pages/taxi/DriverOrderScreen';
import ClientRideScreen from '@/pages/taxi/ClientRideScreen';
import PaymentScreen from '@/pages/taxi/PaymentScreen';
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
            <Route path="/tracking/:orderId" element={<TaxiOrderTracking />} />
            <Route path="/profile" element={<TaxiProfile />} />
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="/dashboard/driver" element={<DriverDashboard />} />
            <Route path="/dashboard/manager" element={<ManagerDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/driver-order" element={<DriverOrderScreen />} />
            <Route path="/client-ride" element={<ClientRideScreen />} />
            <Route path="/payment" element={<PaymentScreen orderData={{price: 280, from: 'Аэропорт', to: 'Центр', distance: '12 км', duration: '15 мин'}} onPaymentComplete={() => {}} />} />
          </Routes>
        </TaxiAuthProvider>
      } />
    </Routes>
  );
};

export default TaxiRoutes;