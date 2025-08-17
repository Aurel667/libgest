import { createContext, useContext, useState, useEffect } from "react";
import { getAllBooks, createBook, updateBook, deleteBook } from "../api/books";

const initialState = {
    books : [],
}

const BookContext = createContext(initialState);

export function BookProvider({ children }) {
    const [state, setState] = useState(initialState);
    useEffect(() => {
        const fetchBooks = async () => {
            const books = await getAllBooks();
            setState((prevState) => ({
                ...prevState,
                books: books || []
            }));
        };
        fetchBooks();
    }, []);
    return (
        <BookContext.Provider value={{
            books: state.books,
            create : async (payload) => {
                const book = await createBook(payload);
                setState((prevState) => ({
                    ...prevState,
                    books: [...prevState.books, book]
                }));
            },
            update: async (bookId, payload) => {
                const book = await updateBook(bookId, payload);
                setState((prevState) => ({
                    ...prevState,
                    books: prevState.books.map((b) => (b._id === bookId ? book : b))
                }));
            },
            delete: async (bookId) => {
                await deleteBook(bookId);
                setState((prevState) => ({
                    ...prevState,
                    books: prevState.books.filter((b) => b._id !== bookId)
                }));
            }
         }}>
            {children}
        </BookContext.Provider>
    );
}

export function useBookContext() {
    return useContext(BookContext);
}
