import {auth, options} from './api';

export const login = async (credentials) => {
    try {
        const response = await fetch(`${auth}/login`, {
            ...options,
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        return await response.json();
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

export const getMe = async () => {
    try {
        const response = await fetch(`${auth}/me`, {
            ...options,
            method: 'GET',
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`${auth}/logout`, {
            ...options,
            method: 'POST',
        });
        return await response.json();
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const register = async (userData) => {
    try {
        const response = await fetch(`${auth}/register`, {
            ...options,
            method: 'POST',
            body: JSON.stringify(userData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error registering:", error);
    }
};
