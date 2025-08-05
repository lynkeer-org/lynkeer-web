import { auth } from "@/features/auth/lib/auth";
import { base } from "@/lib/axios/base";

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
    return Promise.reject(error);
  },
);

export { privateApi };
