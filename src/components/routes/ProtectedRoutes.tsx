import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/auth/stores/auth.store";
import { CustomSpinner } from "../custom/CustomSpinner";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();
  if (authStatus === "checking") {
    return <CustomSpinner />;
  }

  if (authStatus === "not-authenticated") {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "authenticated") {
    return <Navigate to="/" />;
  }

  return children;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { authStatus, isAdmin } = useAuthStore();
  if (authStatus === "checking") {
    return <CustomSpinner />;
  }

  if (authStatus === "not-authenticated") {
    return <Navigate to="/auth/login" />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  return children;
};
