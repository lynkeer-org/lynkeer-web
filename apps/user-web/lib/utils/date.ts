export function formatDateOnly(input: Date | string): string {
  const d = input instanceof Date ? input : new Date(input);

  // Always in UTC to avoid timezone shifts
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
