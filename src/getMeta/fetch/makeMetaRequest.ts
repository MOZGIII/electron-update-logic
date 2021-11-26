export type MetaRequestInit<H> = {
  readonly headers: H;
  readonly cache: "reload";
  readonly redirect: "follow";
  readonly keepalive: false;
};

const makeMetaRequest = <H>(
  url: string,
  headers: H
): [string, MetaRequestInit<H>] => [
  url,
  {
    headers,
    cache: "reload",
    redirect: "follow",
    keepalive: false,
  },
];

export default makeMetaRequest;
