import api from "./axios";

export async function login(crendentials) {
  const response = await api.post("/auth/login", crendentials);

  return response.data;
}

export async function signup(crendentials) {
  const response = await api.post("/auth/signup", crendentials);

  return response.data;
}

export async function getdetails() {
  const response = await api.get("/auth/me");

  return response.data;
}
