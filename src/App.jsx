import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardGeneral from './pages/DashboardGeneral'; // <- nuevo dashboard
import StoreDetails from './pages/StoreDetails'; // <- tienda específica

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardGeneral />} /> {/* nuevo componente */}
      <Route path="/store/:storeId" element={<StoreDetails />} />
    </Routes>
  );
}

export default App;



