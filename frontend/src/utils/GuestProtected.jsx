import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthSession";
const GuestProtected = () => {
    const { isLoggedIn } = useAuth();
    return !isLoggedIn ? <Outlet /> : <Navigate to="/books" />;
};

export default GuestProtected;
