import { Routes, Route } from 'react-router-dom';
import MfoPage from '@/pages/mfo/MfoPage';

const MfoRoutes = () => {
  return (
    <Routes>
      <Route path="/mfo" element={<MfoPage />} />
    </Routes>
  );
};

export default MfoRoutes;
