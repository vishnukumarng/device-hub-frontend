import api from "./axios";

export async function fetchDashboardStats() {
  const response = await api.get("/admin/dashboard");
  return response.data.data;
}

export async function fetchAdminDevices() {
  const response = await api.get("/admin/devices");
  return response.data.data;
}

export async function createDevice(deviceData) {
  const response = await api.post("/admin/devices", deviceData);
  return response.data.data;
}

export async function updateDevice(id, updateData) {
  const response = await api.put(`/admin/devices/${id}`, updateData);
  return response.data.data;
}

export async function deleteDevice(id) {
  const response = await api.delete(`/admin/devices/${id}`);
  return response.data;
}

export async function fetchAdminCheckouts() {
  const response = await api.get("/admin/checkouts");
  return response.data.data;
}

export async function forceReturnCheckout(checkoutId) {
  const response = await api.put(`/admin/checkouts/force-return/${checkoutId}`);
  return response.data.data;
}

export async function fetchAdminWaitlist() {
  const response = await api.get("/admin/waitlist");
  return response.data.data;
}

export async function fetchAdminUsers() {
  const response = await api.get("/admin/users");
  return response.data.data;
}

export async function updateUserRole(userId, role) {
  const response = await api.put(`/admin/users/${userId}/role`, { role });
  return response.data.data;
}
