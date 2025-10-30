import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AdminTitle } from "../components/AdminTitle";

export const AdminProductsPage = () => {
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
            <TableHead>Categoría</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>
              <img src="https://placehold.co/100x100" alt="product image" />
            </TableCell>
            <TableCell>Nombre del producto</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>Categoría del producto</TableCell>
            <TableCell>XS, S, M, L, XL</TableCell>
            <TableCell>100</TableCell>
            <TableCell>
              <Link to={`/admin/products/t-shirt-1`}>
                <Button variant="outline" size="sm" className="mr-2">
                  Editar
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CustomPagination totalPages={5} />
    </>
  );
};
