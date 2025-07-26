const defaultRoute = process.env.NEXT_PUBLIC_DEFAULT_ROUTE;
const apiMocking = process.env.NEXT_PUBLIC_API_MOCKING;
const baseAppUrl = process.env.NEXT_PUBLIC_APP_URL;
const passTypeIdentifier = process.env.APPLE_PASS_TYPE_IDENTIFIER;
const appleWwdrPemBase64 = process.env.APPLE_WWDR_PEM_BASE64;
const appleCertificatePemBase64 = process.env.APPLE_CERTIFICATE_PEM_BASE64;
const appleKeyPemBase64 = process.env.APPLE_KEY_PEM_BASE64;

export const defaultRouteEnv = defaultRoute || "/";
export const apiMockingEnv = apiMocking;
export const passTypeIdentifierEnv = passTypeIdentifier;
export const baseAppUrlEnv = baseAppUrl;
export const defaultLogoUrlEnv = `${baseAppUrl}/images/defaultStore.png`;
export const appleWwdrPemBase64Env = appleWwdrPemBase64;
export const appleCertificatePemBase64Env = appleCertificatePemBase64;
export const appleKeyPemBase64Env = appleKeyPemBase64;
