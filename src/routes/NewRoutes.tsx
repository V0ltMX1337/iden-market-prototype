import { Routes, Route } from 'react-router-dom';
import NewPage from '@/pages/new/NewPage';

const NewRoutes = () => {
  return (
    <Routes>
      <Route path="/new" element={<NewPage />} />
    </Routes>
  );
};

export default NewRoutes;
