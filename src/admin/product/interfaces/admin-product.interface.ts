import type { Product } from "@/interfaces/product.interface";

export interface AdminProduct extends Product {
  files?: File[];
}
