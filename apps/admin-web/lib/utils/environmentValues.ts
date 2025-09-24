const defaultRoute = process.env.NEXT_PUBLIC_DEFAULT_ROUTE;
const apiMocking = process.env.NEXT_PUBLIC_API_MOCKING;
const baseAppUrl = process.env.NEXT_PUBLIC_APP_URL;
const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
const baseUserAppUrl = process.env.NEXT_PUBLIC_USER_APP_URL;

const passTypeIdentifier = process.env.APPLE_PASS_TYPE_IDENTIFIER;
const appleWwdrPemBase64 = process.env.APPLE_WWDR_PEM_BASE64;
const appleCertificatePemBase64 = process.env.APPLE_CERTIFICATE_PEM_BASE64;
const appleKeyPemBase64 = process.env.APPLE_KEY_PEM_BASE64;
const appleCertPassword = process.env.APPLE_CERT_PASSWORD;

const googleWalletClientEmail = process.env.GOOGLE_WALLET_CLIENT_EMAIL;
const googleWalletPrivateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY;
const googleWalletIssuerId = process.env.GOOGLE_WALLET_ISSUER_ID;

const serviceToken = process.env.SERVICE_TOKEN;

export const defaultRouteEnv = defaultRoute || "/";
export const apiMockingEnv = apiMocking;
export const baseAppUrlEnv = baseAppUrl;
export const baseUrlApiEnv = baseUrlApi;
export const baseUserAppUrlEnv = baseUserAppUrl;

export const passTypeIdentifierEnv = passTypeIdentifier;
export const defaultLogoUrlEnv = `${baseAppUrl}/images/defaultStore.png`;
export const appleWwdrPemBase64Env = appleWwdrPemBase64;
export const appleCertificatePemBase64Env = appleCertificatePemBase64;
export const appleKeyPemBase64Env = appleKeyPemBase64;
export const appleCertPasswordEnv = appleCertPassword;

export const googleWalletClientEmailEnv = googleWalletClientEmail;
export const googleWalletPrivateKeyEnv = googleWalletPrivateKey;
export const googleWalletIssuerIdEnv = googleWalletIssuerId;

export const serviceTokenEnv = serviceToken;
