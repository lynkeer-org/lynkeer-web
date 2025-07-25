import { Skeleton } from "@lynkeer/ui/components/skeleton";
import { ByLynkeer } from "./byLynkeer";
import { PassContainer } from "./passContainer";
import "./styles.css";

const PassSkeleton = () => {
  return (
    <PassContainer backgroundColor="#ffffff" textColor="#000000">
      <div id="pass-header" className="pass-header">
        <Skeleton className="h-6 w-6 rounded-full mr-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div id="pass-strip" className="pass-strip">
        <Skeleton className="h-20 w-full" />
      </div>

      <div id="pass-fields" className="pass-fields">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-1/3" />
      </div>

      <div id="pass-qrcode" className="pass-qrcode">
        <Skeleton className="h-20 w-20" />
        <ByLynkeer />
      </div>
    </PassContainer>
  );
};

export { PassSkeleton };
