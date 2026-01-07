export function truncateUrl(url: string, max = 60) {
  if (url.length <= max) return url;

  return `${url.slice(0, 35)}…${url.slice(-15)}`;
}

export function getURLDomain() {}

export function formatUrl(url: string) {
  `[${truncateUrl(url)}](${url})`;
}
