import { Skeleton } from "@lynkeer/ui/components/skeleton";

/**
 * FormSkeleton component that displays a loading state
 */
const FormSkeleton = () => {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 grid-cols-1 items-start lg:grid-cols-2">
        {/* Pass name field skeleton */}
        <div className="grid gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Stamp goal field skeleton */}
        <div className="grid gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Submit button skeleton */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export { FormSkeleton };
