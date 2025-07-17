import { Skeleton } from "@lynkeer/ui/components/skeleton";
import { PassContainer } from "./passContainer";
import { ByLynkeer } from "./byLynkeer";
import "./styles.css";

const PassSkeleton = () => {
  return (
    <PassContainer backgroundColor="#ffffff" textColor="#000000">
      <div id="pass-header" className="pass-header">
        <Skeleton className="h-6 w-6 rounded-full mr-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div id="pass-strip" className="pass-strip">
        <Skeleton className="h-10 w-full" />
      </div>

      <div id="pass-fields" className="pass-fields">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <div id="pass-qrcode" className="pass-qrcode">
        <Skeleton className="h-20 w-20" />
        <ByLynkeer />
      </div>
    </PassContainer>
  );
};

export { PassSkeleton };
