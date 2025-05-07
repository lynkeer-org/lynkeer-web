import { base } from "@/lib/axios/base";
import { redirect } from "next/navigation";

const privateApi = base;

privateApi.interceptors.request.use(
  (config) => {
    const token = null; // TODO: Get token from next session

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.status === 401) {
      redirect("/auth/sign-out");
    }
  },
);

export { privateApi };
