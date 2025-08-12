import {books, options} from "./api"

export async function createBook(bookData) {
    try {
        const response = await fetch(books, {
            ...options,
            method: "POST",
            body: JSON.stringify(bookData)
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating book:", error);
    }
}

export async function getAllBooks() {
    try {
        const response = await fetch(books, {
            ...options,
            method: "GET",
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

export async function getBookById(bookId) {
    try {
        const response = await fetch(`${books}/${bookId}`, {
            ...options,
            method: "GET",
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching book by ID:", error);
    }
}

export async function updateBook(bookId, bookData) {
    try {
        const response = await fetch(`${books}/${bookId}`, {
            ...options,
            method: "PUT",
            body: JSON.stringify(bookData)
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating book:", error);
    }
}

export async function deleteBook(bookId) {
    try {
        const response = await fetch(`${books}/${bookId}`, {
            ...options,
            method: "DELETE",
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}