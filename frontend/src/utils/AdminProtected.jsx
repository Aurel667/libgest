import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthSession";

const AdminProtected = () => {
    const { isLoggedIn, role } = useAuth();
    return isLoggedIn && role === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtected;
