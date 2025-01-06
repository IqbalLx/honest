export function isValidHostname(hostname: string): boolean {
  const hostnameRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63})*$/;
  return hostnameRegex.test(hostname);
}

export function getHostname(url: string): string {
  if (isValidHostname(url)) return url;

  const hostname = new URL(url).hostname;
  return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
}
