import { Routes as RouterRoutes, Route, /*Navigate*/ } from "react-router-dom";
// import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/LoginPage";
import Register from "./pages/Registerpage";

// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuth();
  
//     return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
//   }


export default function Routes() {
    return (
        <RouterRoutes>
            <Route path="/login" element={<Login />} />
            <Route path="/register"element={<Register />}/>
        </RouterRoutes>
    );
}