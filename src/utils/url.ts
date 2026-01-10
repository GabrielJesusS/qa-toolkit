const DOMAIN_REGEX = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/gim;

export function truncateUrl(url: string, max = 60) {
  if (url.length <= max) return url;

  return `${url.slice(0, 35)}…${url.slice(-15)}`;
}

export function getURLDomain(url?: string) {
  if (!url) return null;
  return url?.match(DOMAIN_REGEX)?.[0];
}

export function formatUrl(url: string) {
  return `[${truncateUrl(url)}](${url})`;
}
