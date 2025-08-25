const baseAdminAppUrl = process.env.NEXT_PUBLIC_ADMIN_APP_URL;
const baseUserAppUrl = process.env.NEXT_PUBLIC_USER_APP_URL;
const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
const defaultRoute = process.env.NEXT_PUBLIC_DEFAULT_ROUTE;
const apiMocking = process.env.NEXT_PUBLIC_API_MOCKING;

export const baseAdminAppUrlEnv = baseAdminAppUrl;
export const baseUserAppUrlEnv = baseUserAppUrl;
export const baseUrlApiEnv = baseUrlApi;
export const defaultRouteEnv = defaultRoute || "/";
export const apiMockingEnv = apiMocking;
