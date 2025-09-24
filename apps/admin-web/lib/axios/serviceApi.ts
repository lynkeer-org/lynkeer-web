import { base } from "@/lib/axios/base";
import { serviceTokenEnv } from "@/lib/utils/environmentValues";

// Crear una instancia específica de serviceApi basada en 'base' con header Authorization adicional
const serviceApi = base.create({
  headers: {
    ...base.defaults.headers,
    Authorization: `Bearer ${serviceTokenEnv}`, // TODO: Cambiar a ApiKey
  },
});

export { serviceApi };
