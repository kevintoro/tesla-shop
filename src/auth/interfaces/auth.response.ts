import type { User } from "@/interfaces/user.interface";

export interface AuthResponse {
  token: string;
  user: User;
}
