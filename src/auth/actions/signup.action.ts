import { tesloApi } from "@/api/teslo-api";
import type { AuthResponse } from "../interfaces/auth.response";

export const signUpAction = async (
  email: string,
  fullName: string,
  password: string,
): Promise<AuthResponse> => {
  const { data } = await tesloApi.post<AuthResponse>("/auth/register", {
    email,
    fullName,
    password,
  });
  return data;
};
