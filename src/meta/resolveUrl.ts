const resolveUrl = (url: string, baseUrl?: string): string =>
  new URL(url, baseUrl).toString();

export default resolveUrl;
