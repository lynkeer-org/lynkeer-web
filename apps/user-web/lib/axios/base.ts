import { baseAdminAppUrlEnv, baseUrlApiEnv } from "@/lib/utils/environmentValues";
import axios from "axios";
import camelCaseKeys from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";

const base = axios.create({
  baseURL: `${baseUrlApiEnv}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    (data) => {
      if (data) {
        return JSON.stringify(snakeCaseKeys(data, { deep: true }));
      }
      return data;
    },
    ...(axios.defaults.transformRequest as []),
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as []),
    (data) => {
      try {
        if (typeof data === "object" && data !== null) {
          return camelCaseKeys(data, { deep: true });
        }

        if (typeof data === "string") {
          const parsed = JSON.parse(data);
          return camelCaseKeys(parsed, { deep: true });
        }

        // Return data as is if it's not an object or string
        return data;
      } catch (_error) {
        return data;
      }
    },
  ],
});

const internal = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const adminBase = axios.create({
  baseURL: `${baseAdminAppUrlEnv}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { base, internal, adminBase };
