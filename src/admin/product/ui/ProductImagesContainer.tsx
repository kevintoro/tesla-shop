import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImagesContainerProps {
  title: string;
  images: string[];
  className?: string;
}

export const ProductImagesContainer = ({
  images,
  title,
  className,
}: ProductImagesContainerProps) => {
  return (
    <div className={cn("mt-6 space-y-3", className)}>
      <h3 className="text-sm font-medium text-slate-700">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
              <img
                src={image}
                alt="Product"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <button
              type="button"
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="mt-1 text-xs text-slate-600 truncate">{image}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
