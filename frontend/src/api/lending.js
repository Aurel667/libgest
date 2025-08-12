import {lendings, options} from "./api"

export const getAllLendings = async () => {
    try {
        const response = await fetch(`${lendings}`, {
            ...options,
            method: 'GET',
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching lendings:", error);
    }
};

export const getMyLendings = async () => {
    try {
        const response = await fetch(`${lendings}/my`, {
            ...options,
            method: 'GET',
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching my lendings:", error);
    }
};

export const createLending = async (lendingData) => {
    try {
        const response = await fetch(`${lendings}`, {
            ...options,
            method: 'POST',
            body: JSON.stringify(lendingData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating lending:", error);
    }
};

export const updateLending = async (lendingId, lendingData) => {
    try {
        const response = await fetch(`${lendings}/${lendingId}`, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(lendingData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating lending:", error);
    }
};

export const deleteLending = async (lendingId) => {
    try {
        const response = await fetch(`${lendings}/${lendingId}`, {
            ...options,
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting lending:", error);
    }
};

export const getLendingById = async (lendingId) => {
    try {
        const response = await fetch(`${lendings}/${lendingId}`, {
            ...options,
            method: 'GET',
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching lending by ID:", error);
    }
};

export const returnLending = async (lendingId) => {
    try {
        const response = await fetch(`${lendings}/${lendingId}/return`, {
            ...options,
            method: 'PUT',
        });
        return await response.json();
    } catch (error) {
        console.error("Error returning lending:", error);
    }
};