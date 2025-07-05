import { auth } from "@/features/auth/lib/auth";
import { base } from "@/lib/axios/base";
import { redirect } from "next/navigation";

const privateApi = base;

privateApi.interceptors.request.use(
  async (config) => {
    const session = await auth.auth();
    const token = session?.user.accessToken;

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
