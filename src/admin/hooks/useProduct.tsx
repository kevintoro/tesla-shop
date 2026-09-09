import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import { getProductByIdAction } from "../actions/get-product-by-id.action";

export const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: async () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: async (product) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["product"] }),
        queryClient.setQueryData(["products", { id: product.id }], product)
      ]);
    }
  });

  return {
    ...query,
    mutation
  };
};
