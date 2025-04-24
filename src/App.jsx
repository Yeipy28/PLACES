import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardGeneral from './pages/DashboardGeneral';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardGeneral />} />
    </Routes>
  );
}

export default App;
