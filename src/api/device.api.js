import api from "./axios";

export async function getalldevice() {
    const response = await api.get('/device/get-all-device')

    return response.data.data;
}

export async function getdevicebyqr(qrCode) {
    const response = await api.get(`/device/get-device?qr_code=${qrCode}`)

    return response.data.data;
}

export async function getdevicebyid(id) {
    const response = await api.get(`/device/get-device-detail/${id}`)

    return response.data.data;
}