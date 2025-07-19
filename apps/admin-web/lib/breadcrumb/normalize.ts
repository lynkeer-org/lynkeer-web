export function normalizePath(pathname: string) {
  // Strip query string/hash and make sure it always starts with "/"
  return pathname?.split("?")[0]?.split("#")[0]?.replace(/\/+$/, "") || "/";
}
