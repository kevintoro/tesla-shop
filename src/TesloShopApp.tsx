import type { PropsWithChildren } from "react";
import { RouterProvider } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appRouter } from "./app.router";
import { useAuthStore } from "./auth/stores/auth.store";
import { CustomSpinner } from "./components/custom/CustomSpinner";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuth } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    retry: false,
    refetchInterval: 1000 * 60 * 60 * 1.5, // Refetch every 1.5 hours
  });
  if (isLoading) {
    return <CustomSpinner />;
  }
  return children;
};

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
