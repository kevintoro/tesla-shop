import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router";
import { CustomSpinner } from "@/components/custom/CustomSpinner";
import type { Product } from "@/interfaces/product.interface.ts";
import { useProduct } from "../hooks/useProduct";
import { ProductForm } from "./ui/ProductForm";

export const AdminProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, mutation } = useProduct(id ?? "");
  const navigate = useNavigate();

  const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
  const productSubtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading) {
    return <CustomSpinner />;
  }

  if (!data) {
    return <Navigate to="/admin/products" />;
  }

  const handleSubmit = async (productLike: Partial<Product>) => {
    toast.loading("Guardando producto...", {
      id: "saving-product",
      position: "top-right",
    });
    await mutation.mutateAsync(productLike, {
      onSuccess: (product) => {
        toast.dismiss("saving-product");
        toast.success("Producto guardado", {
          position: "top-right",
        });
        navigate(`/admin/products/${product.id}`);
      },
      onError: (error) => {
        toast.dismiss("saving-product");
        toast.error("Error al guardar el producto", {
          position: "top-right",
        });
        console.error(error);
      },
    });
  };

  return (
    <ProductForm
      title={productTitle}
      subtitle={productSubtitle}
      product={data}
      onSubmit={handleSubmit}
      isSubmitting={mutation.isPending}
    />
  );
};
