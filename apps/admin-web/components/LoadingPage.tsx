import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <Loader2 absoluteStrokeWidth size={50} className="animate-spin text-primary" />
    </div>
  );
};

export { LoadingPage };
