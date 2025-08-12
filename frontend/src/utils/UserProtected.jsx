import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthSession";
const UserProtected = () => {
    const { isLoggedIn, role } = useAuth();
    return isLoggedIn && role === "user" ? <Outlet /> : <Navigate to="/login" />;
};

export default UserProtected;
