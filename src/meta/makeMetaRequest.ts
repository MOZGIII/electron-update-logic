const makeMetaRequest = (
  url: string,
  headers: Headers
): [string, RequestInit] => [
  url,
  {
    headers,
    cache: "reload",
    redirect: "follow",
    keepalive: false,
  },
];

export default makeMetaRequest;
