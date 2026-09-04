import { useParams } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomSpinner } from "@/components/custom/CustomSpinner";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";

export const GenderPage = () => {
  const { gender } = useParams();
  const { data, isLoading } = useProducts();

  if (isLoading || !data) {
    return <CustomSpinner />;
  }

  const getGenderTitle = () => {
    switch (gender) {
      case "men":
        return "Productos para Hombres";
      case "women":
        return "Productos para Mujeres";
      case "kid":
        return "Productos para Niños";
      default:
        return "Productos para Todos";
    }
  };

  return (
    <>
      <CustomJumbotron
        title={getGenderTitle()}
        subtitle="Ropa minimalista y elegante inspirada en el diseño futurista de Tesla. Calidad premium para un estilo atemporal."
      />
      <ProductsGrid products={data.products} />
      <CustomPagination totalPages={data.pages} />
    </>
  );
};
