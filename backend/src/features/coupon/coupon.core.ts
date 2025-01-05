export function getHostname(url: string): string {
  const hostname = new URL(url).hostname;
  return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
}
