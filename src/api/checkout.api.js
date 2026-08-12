import api from "./axios";

export async function checkoutList() {
    const response = await api.get('/checkout/me')

    return response.data;
}

export async function checkoutDevice(credentials) {
    const response = await api.post('/checkout/book', JSON.stringify(credentials))

    return response.data.data
}

export async function returndevice(checkoutId) {
    const response = await api.put(`/checkout/return/${checkoutId}`)

    return response.data.data
}