import { Spinner } from "../ui/spinner";

export const CustomSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-8 my-10 w-full h-full min-h-[500px] flex-col">
      <Spinner />
      <p className="text-sm text-muted-foreground">Cargando...</p>
    </div>
  );
};
