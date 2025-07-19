import { clientsDataRoutes, passesRoutes, reportsRoutes } from "@/lib/utils/app-routes";

export const routesConfig = new Map([
  [reportsRoutes.ROOT, "Reportes"],
  [passesRoutes.ROOT, "Tarjetas"],
  [passesRoutes.CREATE, "Crear tarjeta"],
  [clientsDataRoutes.ROOT, "Datos de clientes"],
]);
