export const auth = `${import.meta.env.VITE_API_GATEWAY_URL}/auth`
export const books = `${import.meta.env.VITE_API_GATEWAY_URL}/books`
export const lendings = `${import.meta.env.VITE_API_GATEWAY_URL}/lendings`

export const options = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'GET'
}