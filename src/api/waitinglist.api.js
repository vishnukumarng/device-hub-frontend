import api from "./axios";

export async function waitingList() {
    const response = await api.get('/reservation/me')

    return response.data;
}

export async function joinWaitingList(credentials) {
    const response = await api.post('/reservation/join', credentials)

    return response.data.data;
}

export async function cancelWaitingList(id) {
    const response = await api.put(`/reservation/cancel/${id}`)

    return response.data;
}