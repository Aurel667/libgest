import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthSession";
import { getAllLendings, getMyLendings, createLending, updateLending, deleteLending } from "../api/lending";

const initialState = {
    lendings: [],
}

const LendingContext = createContext(initialState);

export function LendingProvider({ children }) {
    const [state, setState] = useState(initialState);
    const { user } = useAuth();
    useEffect(() => {
        const fetchLendings = async () => {
            const data = user?.role === "admin" ? await getAllLendings() : await getMyLendings();
            console.log(data)
            setState((prevState) => ({
                ...prevState,
                lendings: Array.isArray(data) ? data : []
            }));
        };
        if (user && user.role) fetchLendings();
    }, [user]);

    return (
        <LendingContext.Provider value={{
            lendings: state.lendings,
            create: async (payload) => {
                const lending = await createLending(payload);
                setState((prevState) => ({
                    ...prevState,
                    lendings: [...prevState.lendings, lending]
                }));
            },
            update: async (lendingId, payload) => {
                const lending = await updateLending(lendingId, payload);
                setState((prevState) => ({
                    ...prevState,
                    lendings: prevState.lendings.map((l) => (l._id === lendingId ? lending : l))
                }));
            },
            delete: async (lendingId) => {
                await deleteLending(lendingId);
                setState((prevState) => ({
                    ...prevState,
                    lendings: prevState.lendings.filter((l) => l._id !== lendingId)
                }));
            }
        }}>
            {children}
        </LendingContext.Provider>
    );
}

export function useLendingContext() {
    return useContext(LendingContext);
}
