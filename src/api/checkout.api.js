import api from "./axios";

export async function checkoutList() {
    const response = await api.get('/checkout/me')

    return response.data.data;
}

export async function checkoutDevice(credentials) {
    const response = await api.post('/checkout/book', credentials)

    return response.data.data
}

export async function returnDevice(id) {
    const response = await api.post(`/checkout/return/${id}`)

    return response.data.data
}