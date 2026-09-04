import { Navigate, useParams } from "react-router";
import { CustomSpinner } from "@/components/custom/CustomSpinner";
import { useProduct } from "../hooks/useProduct";
import { ProductForm } from "./ui/productForm";

export const AdminProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useProduct(id ?? "");

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

  return (
    <ProductForm
      title={productTitle}
      subtitle={productSubtitle}
      product={data}
    />
  );
};
