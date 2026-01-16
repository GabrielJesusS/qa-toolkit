export function formatLocaleDate(date: Date, locale: string = "en-US"): string {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: userTimezone,
  }).format(date);
}
