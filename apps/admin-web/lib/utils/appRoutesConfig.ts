import { clientsDataRoutes, passesRoutes, reportsRoutes } from "@/lib/utils/appRoutes";

export const routesConfig = new Map([
  [reportsRoutes.ROOT, "Reportes"],
  [passesRoutes.ROOT, "Tarjetas"],
  [passesRoutes.CREATE, "Crear tarjeta"],
  [passesRoutes.DETAILS, "Detalle de la tarjeta"],
  [clientsDataRoutes.ROOT, "Datos de clientes"],
]);

/**
 * Checks if a path matches a dynamic route pattern
 * @param path - The path to check
 * @param pattern - The route pattern that may contain dynamic parameters (e.g., ":passUuid")
 * @returns True if the path matches the pattern, false otherwise
 * @example
 * matchesDynamicRoute("/passes/123", "/passes/:passUuid") // returns true
 * matchesDynamicRoute("/passes/123", "/passes/static") // returns false
 */
function matchesDynamicRoute(path: string, pattern: string): boolean {
  if (path === pattern) {
    return true;
  }

  if (!pattern.includes(":")) {
    return false;
  }

  // Transform "/passes/:passUuid" → "^/passes/[^/]+$"
  const regexPattern = pattern.replace(/:[^/]+/g, "[^/]+").replace(/\//g, "\\/");

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}

/**
 * Gets route information including existence and label in a single operation
 * @param path - The route path to check
 * @returns An object with exists (boolean) and label (string | undefined) properties
 * @example
 * getRouteInfo("/reports") // returns { exists: true, label: "Reportes" }
 * getRouteInfo("/passes/123") // returns { exists: true, label: "Detalles de la tarjeta" }
 * getRouteInfo("/invalid-route") // returns { exists: false, label: undefined }
 */
export function getRouteInfo(path: string): { exists: boolean; label: string | undefined } {
  for (const [routePattern, label] of routesConfig) {
    if (matchesDynamicRoute(path, routePattern)) {
      return { exists: true, label };
    }
  }
  return { exists: false, label: undefined };
}
