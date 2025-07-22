import { normalizePath } from "./normalize";
import { routesConfig } from "./routes-config";
import type { BreadcrumbItemType } from "./types";

export function buildBreadcrumbs(pathname: string): BreadcrumbItemType[] {
  const breadcrumbs: BreadcrumbItemType[] = [];
  const cleanPath = normalizePath(pathname);

  // Split "/a/b/c" → ["/a", "/a/b", "/a/b/c"]
  const segments = cleanPath
    .split("/")
    .filter(Boolean)
    .map((_, index, array) => `/${array.slice(0, index + 1).join("/")}`);

  for (const segment of segments) {
    if (routesConfig.has(segment)) {
      breadcrumbs.push({ path: segment, label: routesConfig.get(segment) as string });
    }
  }

  return breadcrumbs;
}
