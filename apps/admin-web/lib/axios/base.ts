import axios from "axios";
import camelCaseKeys from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";

const base = axios.create({
  baseURL: `${process.env.BASE_URL_API}/api`,
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
        const parsed = JSON.parse(data);
        return camelCaseKeys(parsed, { deep: true });
      } catch {
        return data;
      }
    },
  ],
});

export { base };
