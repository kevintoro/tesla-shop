import { useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const currentPage = isNaN(+page) ? 1 : +page;

  const handleSetPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => handleSetPage(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          variant={index + 1 === currentPage ? "default" : "outline"}
          size="sm"
          key={index}
          onClick={() => handleSetPage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => handleSetPage(currentPage + 1)}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
