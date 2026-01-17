import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/LoginPage";
import Register from "./pages/Registerpage";
import Dairy from "./pages/DairyPage";
import Dairies from "./pages/DairiesPage";
import ErrorPage from "./pages/ErrorPage";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  }

export default function Routes() {
    return (
        <RouterRoutes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/"element={<Navigate to="/daily" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/daily" element={<PrivateRoute><Dairy /></PrivateRoute>} />
            <Route path="/dairies" element={<PrivateRoute><Dairies /></PrivateRoute>} />
        </RouterRoutes>
    );``
}