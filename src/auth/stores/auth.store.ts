import { AxiosError } from "axios";
import { create } from "zustand";
import type { User } from "@/interfaces/user.interface";
import { checkAuthAction } from "../actions/check-auth.action";
import { loginAction } from "../actions/login.action";
import { signUpAction } from "../actions/signup.action";

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

type AuthStore = {
  authStatus: AuthStatus;
  user: User | null;
  userInitials: string;
  token: string | null;

  // Getters
  isAdmin: () => boolean;

  // Actions
  checkAuth: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signUp: (
    email: string,
    fullName: string,
    password: string,
  ) => Promise<boolean>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  authStatus: "checking",
  user: null,
  userInitials: "NA",
  token: null,
  isAdmin: () => {
    const user = get().user;
    return user ? user.roles.includes("admin") : false;
  },
  checkAuth: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user,
        userInitials: getUserInitials(user),
        token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      console.error("Auth error:", error);
      set({ authStatus: "not-authenticated" });
      return false;
    }
  },
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      sessionStorage.setItem("token", data.token);
      set({
        user: data.user,
        userInitials: getUserInitials(data.user),
        token: data.token,
        authStatus: "authenticated",
      });

      return true;
    } catch (error) {
      console.error("Error en login:", error);
      sessionStorage.removeItem("token");
      set({ authStatus: "not-authenticated" });
      return false;
    }
  },
  logout: () => {
    sessionStorage.removeItem("token");
    set({
      user: null,
      token: null,
      userInitials: "NA",
      authStatus: "not-authenticated",
    });
  },
  signUp: async (email: string, fullName: string, password: string) => {
    try {
      const { token, user } = await signUpAction(email, fullName, password);
      sessionStorage.setItem("token", token);
      set({
        user,
        userInitials: getUserInitials(user),
        token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return false;
        }
      }
      throw error;
    }
  },
}));

const getUserInitials = (user: User | null) => {
  if (!user) return "NA";
  return user.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
};
