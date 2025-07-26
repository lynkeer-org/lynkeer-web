import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);
  const [isDetectingDevice, setIsDetectingDevice] = React.useState<boolean>(true);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      setIsDetectingDevice(false);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    setIsDetectingDevice(false);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return { isMobile, isDetectingDevice };
}
