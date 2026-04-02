export function formatWithCommas(value: number | string): string {
  if (value === undefined || value === null || value === "") return "";
  const number =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
  if (isNaN(number)) return "0";
  return number.toLocaleString("en-US");
}

export function formatCurrency(
  value: number | string,
  currency: string = "NGN",
  locale: string = "en-NG",
): string {
  if (value === undefined || value === null || value === "") return "";
  const number =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
  if (isNaN(number)) return "0.00";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(number);
}
