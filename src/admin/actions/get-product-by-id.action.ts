import { tesloApi } from "@/api/teslo-api";
import type { Product } from "@/interfaces/product.interface";

export const getProductByIdAction = async (id: string): Promise<Product> => {
  if (!id) {
    throw new Error("Product ID is required");
  }

  if (id === "new") {
    return {
      description: "",
      id: "new",
      images: [],
      gender: "unisex",
      price: 0,
      sizes: [],
      slug: "",
      stock: 0,
      tags: [],
      title: "",
    } as unknown as Product;
  }

  const { data } = await tesloApi.get<Product>(`/products/${id}`);
  const images = data.images.map((img) => {
    if (img.includes("http")) {
      return img;
    }

    return `${import.meta.env.VITE_API_URL}/files/product/${img}`;
  });
  return { ...data, images };
};
