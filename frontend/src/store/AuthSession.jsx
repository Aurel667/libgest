import { createContext, useContext, useState } from "react";
import { logout as apiLogout } from "../api/auth";

const initialState = {
    user : {},
    role : "",
    isLoggedIn: false,
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    return (
        <AuthContext.Provider value={{
            user: state.user,
            role: state.role,
            isLoggedIn: state.isLoggedIn,
            login: (user) => {
                setState({
                    user,
                    role: user.role,
                    isLoggedIn: true
                });
            },
            logout: async () => {
                try {
                    await apiLogout();
                    setState(initialState);
                } catch (error) {
                    console.error("Error during logout:", error);
                }
            }

        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
