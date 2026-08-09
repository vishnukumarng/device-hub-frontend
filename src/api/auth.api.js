import api from "./axios";

export async function login(crendentials) {
  const response = await api.post("/auth/login", JSON.stringify(crendentials));

  return response.data.data;
}

export async function signup(crendentials) {
  const response = await api.post("/auth/signup", JSON.stringify(crendentials));

  return response.data;
}

export async function getdetails() {
  const response = await api.get("/auth/me");

  return response.data.data;
}
