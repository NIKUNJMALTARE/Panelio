// frontend/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import { isAdminAuthenticated } from "./utils/auth";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = isAdminAuthenticated();
  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
};

const PublicAdminLoginRoute = () => {
  const isLoggedIn = isAdminAuthenticated();
  return isLoggedIn ? <Navigate to="/admin" replace /> : <AdminLoginPage />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Admin login (redirects to /admin if already logged in) */}
      <Route path="/admin/login" element={<PublicAdminLoginRoute />} />

      {/* Admin dashboard protected route */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboardPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
