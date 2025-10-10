import { Routes, Route } from 'react-router-dom';
import GruzPage from '@/pages/gruz/GruzPage';

const GruzRoutes = () => {
  return (
    <Routes>
      <Route path="/gruz" element={<GruzPage />} />
    </Routes>
  );
};

export default GruzRoutes;
