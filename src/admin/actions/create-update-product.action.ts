import { tesloApi } from "@/api/teslo-api";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleeper.ts";
import type { AdminProduct } from "../product/interfaces/admin-product.interface";

interface FileUploadResponse {
  fileName: string;
  secureUrl: string;
}

export const createUpdateProductAction = async (
  productLike: Partial<AdminProduct>,
): Promise<Product> => {
  delete productLike.user;
  const { id, images, ...postData } = productLike;
  const isCreating = id === "new" || !id;
  await sleep(1500);

  if (productLike.files && productLike.files.length > 0) {
    const newImageNames = await uploadFiles(productLike.files);
    images?.push(...newImageNames);
    delete postData.files;
  }

  const newImages = images?.map((image) => {
    if (image.includes("http")) {
      return image.split("/").pop() ?? "";
    }

    return image;
  });

  const { data } = await tesloApi({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: {
      ...postData,
      images: newImages,
    },
  });

  return {
    ...data,
    images: data.images.map((image: string) =>
      image.includes("http")
        ? image
        : `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  };
};

const uploadFiles = async (files: File[]): Promise<string[]> => {
  return Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await tesloApi.post<FileUploadResponse>(
        "/files/product",
        formData,
      );
      return data.fileName;
    }),
  );
};
