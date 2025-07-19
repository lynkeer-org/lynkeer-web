import { buildBreadcrumbs } from "@/lib/breadcrumb/build-breadcrumbs";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function useBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = useMemo(() => buildBreadcrumbs(pathname), [pathname]);

  return { breadcrumbs };
}
