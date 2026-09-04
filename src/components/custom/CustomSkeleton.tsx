import { Skeleton } from "@/components/ui/skeleton";

export const CustomSkeleton = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-xs flex-col gap-7">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-16 w-full" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-16 w-full" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
};
