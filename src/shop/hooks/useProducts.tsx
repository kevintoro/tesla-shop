import { useParams, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { Gender } from "@/interfaces/product.interface";
import { getProductsAction } from "../actions/get-products.action";

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();
  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;
  const sizes = searchParams.get("sizes") || undefined;
  const price = searchParams.get("price") || "any";
  const query = searchParams.get("query") || undefined;

  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  switch (price) {
    case "0-50":
      minPrice = 0;
      maxPrice = 50;
      break;
    case "50-100":
      minPrice = 50;
      maxPrice = 100;
      break;
    case "100-200":
      minPrice = 100;
      maxPrice = 200;
      break;
    case "200+":
      minPrice = 200;
      maxPrice = undefined;
      break;
    default:
      minPrice = undefined;
      maxPrice = undefined;
      break;
  }

  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    queryKey: [
      "products",
      { limit, offset, sizes, gender, minPrice, maxPrice, query },
    ],
    queryFn: () =>
      getProductsAction({
        gender: gender as Gender | undefined,
        limit: isNaN(Number(limit)) ? 9 : Number(limit),
        maxPrice,
        minPrice,
        offset: isNaN(Number(offset)) ? 0 : Number(offset),
        sizes,
        query,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
