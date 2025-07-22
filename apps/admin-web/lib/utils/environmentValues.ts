const defaultRoute = process.env.NEXT_PUBLIC_DEFAULT_ROUTE;
const apiMocking = process.env.NEXT_PUBLIC_API_MOCKING;
const baseAppUrl = process.env.VERCEL_URL || "https://admin-web.lynkeer.com";
const passTypeIdentifier = process.env.APPLE_PASS_TYPE_IDENTIFIER;

export const defaultRouteEnv = defaultRoute || "/";
export const apiMockingEnv = apiMocking;
export const passTypeIdentifierEnv = passTypeIdentifier;
export const baseAppUrlEnv = baseAppUrl;
export const defaultLogoUrlEnv = `${baseAppUrl}/images/defaultStore.png`;
