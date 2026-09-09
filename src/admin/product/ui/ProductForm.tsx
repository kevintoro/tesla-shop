import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Loader2, Plus, SaveAll, Tag, Upload, X } from "lucide-react";
import { AdminTitle } from "@/admin/components/AdminTitle";
import { Button } from "@/components/ui/button";
import type { Product, Size } from "@/interfaces/product.interface";
import { cn } from "@/lib/utils";
import type { AdminProduct } from "../interfaces/admin-product.interface";
import { ProductImagesContainer } from "./ProductImagesContainer";
import { ProductStatus } from "./ProductStatus";

interface Props {
  title: string;
  subtitle: string;
  product: AdminProduct;
  onSubmit: (data: Partial<Product>) => Promise<void>;
  isSubmitting: boolean;
}

const availableSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({
  title,
  subtitle,
  product,
  onSubmit,
  isSubmitting,
}: Props) => {
  const [dragActive, setDragActive] = useState(false);
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<AdminProduct>({
    defaultValues: product,
  });

  const tagRef = useRef<HTMLInputElement>(null);

  const selectedSizes = watch("sizes");
  const selectedTags = watch("tags");
  const currentStock = watch("stock");
  const uploadedFiles = watch("files") || [];
  const navigate = useNavigate();

  const addTag = () => {
    const newTagSet = new Set(getValues("tags"));
    const newTag = tagRef.current!.value.trim();
    if (newTag.length === 0) {
      return;
    }
    newTagSet.add(newTag);
    setValue("tags", Array.from(newTagSet));
    tagRef.current!.value = "";
  };

  const removeTag = (tagToRemove: string) => {
    const newTagSet = new Set(getValues("tags"));
    newTagSet.delete(tagToRemove);
    setValue("tags", Array.from(newTagSet));
  };

  const addSize = (size: Size) => {
    const sizeSet = new Set(getValues("sizes"));
    sizeSet.add(size);
    setValue("sizes", Array.from(sizeSet));
  };

  const removeSize = (sizeToRemove: Size) => {
    const sizeSet = new Set(getValues("sizes"));
    sizeSet.delete(sizeToRemove);
    setValue("sizes", Array.from(sizeSet));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (!files) {
      return;
    }
    saveUploadedFiles(Array.from(files));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    saveUploadedFiles(Array.from(files));
  };

  const saveUploadedFiles = (files: File[]) => {
    const currentFiles = getValues("files") || [];
    setValue("files", [...currentFiles, ...files]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex justify-between items-center">
        <AdminTitle title={title} subtitle={subtitle} />
        <div className="flex justify-end mb-10 gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate("/admin/products")}
          >
            <Link to="/admin/products" className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancelar
            </Link>
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <SaveAll className="w-4 h-4" />
            )}
            Guardar cambios
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Información del producto
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Título del producto
                  </label>
                  <input
                    type="text"
                    className={cn(
                      "custom-product-input",
                      errors.title && "border-red-500",
                    )}
                    placeholder="Título del producto"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      El título del producto es obligatorio
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Precio ($)
                    </label>
                    <input
                      type="number"
                      className={cn(
                        "custom-product-input",
                        errors.price && "border-red-500",
                      )}
                      placeholder="Precio del producto"
                      {...register("price", {
                        valueAsNumber: true,
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        El precio del producto es obligatorio
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Stock del producto
                    </label>
                    <input
                      type="number"
                      className={cn(
                        "custom-product-input",
                        errors.stock && "border-red-500",
                      )}
                      placeholder="Stock del producto"
                      {...register("stock", {
                        valueAsNumber: true,
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm mt-1">
                        El stock del producto es obligatorio
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Slug del producto
                  </label>
                  <input
                    type="text"
                    className={cn(
                      "custom-product-input",
                      errors.slug && "border-red-500",
                    )}
                    placeholder="Slug del producto"
                    {...register("slug", {
                      required: true,
                      validate: (value) =>
                        /\S/.test(value) ||
                        "El slug no puede contener espacios",
                    })}
                  />
                  {errors.slug && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.slug.message ||
                        "El slug del producto es obligatorio"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Género del producto
                  </label>
                  <select
                    className={cn(
                      "custom-product-input",
                      errors.gender && "border-red-500",
                    )}
                    {...register("gender")}
                  >
                    <option value="men">Hombre</option>
                    <option value="women">Mujer</option>
                    <option value="unisex">Unisex</option>
                    <option value="kids">Niño</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descripción del producto
                  </label>
                  <textarea
                    rows={5}
                    className={cn(
                      "custom-product-input",
                      "resize-none",
                      errors.description && "border-red-500",
                    )}
                    placeholder="Descripción del producto"
                    {...register("description", { required: true })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      "La descripción del producto es obligatoria"
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Tallas disponibles
              </h2>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <span
                      key={size}
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200",
                        {
                          hidden: !selectedSizes.includes(size),
                        },
                      )}
                    >
                      {size}
                      <button
                        onClick={() => removeSize(size)}
                        className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                  <span className="text-sm text-slate-600 mr-2">
                    Añadir tallas:
                  </span>
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
                        selectedSizes.includes(size)
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer",
                      )}
                      onClick={() => addSize(size)}
                      disabled={selectedSizes.includes(size)}
                      type="button"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Etiquetas
              </h2>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    ref={tagRef}
                    placeholder="Añadir nueva etiqueta..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <Button onClick={addTag} className="px-4 py-2rounded-lg ">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Images */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Imágenes del producto
              </h2>

              {/* Drag & Drop Zone */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  <div>
                    <p className="text-lg font-medium text-slate-700">
                      Arrastra las imágenes aquí
                    </p>
                    <p className="text-sm text-slate-500">
                      o haz clic para buscar
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">
                    PNG, JPG, WebP hasta 10MB cada una
                  </p>
                </div>
              </div>

              {/* Current Images */}
              <ProductImagesContainer
                images={product.images}
                title="Imágenes actuales"
              />

              {/* Uploading images */}
              <ProductImagesContainer
                images={uploadedFiles.map((file) => URL.createObjectURL(file))}
                title="Imágenes cargadas"
                className={uploadedFiles.length > 0 ? "" : "hidden"}
              />
            </div>

            {/* Product Status */}
            <ProductStatus
              currentStock={currentStock}
              product={product}
              selectedSizes={selectedSizes}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
