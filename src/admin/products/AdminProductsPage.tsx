import { Link } from "react-router";
import { PencilIcon, PlusIcon } from "lucide-react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomSpinner } from "@/components/custom/CustomSpinner.tsx";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/currency-formatter";
import { useProducts } from "@/shop/hooks/useProducts.tsx";
import { AdminTitle } from "../components/AdminTitle";


export const AdminProductsPage = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <CustomSpinner />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aquí puedes ver y administrar los productos de tu negocio"
        />
        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button variant="default">
              <PlusIcon className="w-4 h-4" />
              Crear Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="p-10 shadow-xs border-gray-200 bg-white rounded-lg mb-10">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Género</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>
                <img
                  src={product.images[0]}
                  alt={product.slug}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>
                <Link
                  to={`/admin/products/${product.slug}`}
                  className="text-blue-950 hover:text-blue-700"
                >
                  {product.title}
                </Link>
              </TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.gender}</TableCell>
              <TableCell>{product.sizes.join(", ")}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Link to={`/admin/products/${product.slug}`}>
                  <PencilIcon className="w-4 h-4 text-gray-500 hover:text-blue-700" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination totalPages={data?.pages ?? 1} />
    </>
  );
};