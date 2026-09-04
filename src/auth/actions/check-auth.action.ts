import { tesloApi } from "@/api/teslo-api";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");
    sessionStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    sessionStorage.removeItem("token");
    throw new Error("Invalid token: " + error);
  }
};
