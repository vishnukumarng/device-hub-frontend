import api from "./axios";

export async function checkoutList() {
    const response = await api.get('/checkout/get-all-list')

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

export async function reserveDevice(credentials) {
    const response = await api.post('/checkout/reserve', JSON.stringify(credentials))
    return response.data.data
}

export async function cancelReservation(checkoutId) {
    const response = await api.put(`/checkout/cancel/${checkoutId}`)
    return response.data.data
}

export async function claimReservation(checkoutId, credentials) {
    const response = await api.post(`/checkout/claim/${checkoutId}`, JSON.stringify(credentials))
    return response.data.data
}

export async function returnedhistory() {
    const response = await api.get('/checkout/get-return-list')
    return response.data
}