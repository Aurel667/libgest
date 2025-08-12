export const auth = import.meta.env.VITE_AUTH_API_URL
export const books = import.meta.env.VITE_BOOKS_API_URL
export const lendings = import.meta.env.VITE_LENDINGS_API_URL

export const options = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'GET'
}