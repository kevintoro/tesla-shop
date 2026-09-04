import { tesloApi } from "@/api/teslo-api";
import type { Gender } from "@/interfaces/product.interface";
import type { ProductsResponse } from "@/interfaces/products.response";

export interface GetProductsActionProps {
  gender?: Gender;
  limit?: number | string;
  offset?: number | string;
  maxPrice?: number | string;
  minPrice?: number | string;
  sizes?: string | undefined;
  query?: string | undefined;
}

export const getProductsAction = async (
  options: GetProductsActionProps,
): Promise<ProductsResponse> => {
  const { gender, limit, offset, sizes, minPrice, maxPrice, query } = options;
  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    params: {
      gender: gender,
      limit,
      offset,
      sizes,
      minPrice,
      maxPrice,
      q: query,
    },
  });
  const productsWithImage = data.products.map((product) => {
    const images = product.images;
    const imagesWithUrl = images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    );
    return {
      ...product,
      images: imagesWithUrl,
    };
  });
  return {
    ...data,
    products: productsWithImage,
  };
};
