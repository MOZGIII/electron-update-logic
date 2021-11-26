import * as repo from "./meta/repo";
import handleMetaResponse from "./meta/handleMetaResponse";
import makeMetaRequest from "./meta/makeMetaRequest";
import fetch, { HeadersInit } from "node-fetch";

export type FetchMetaParams = {
  readonly url: string;
  readonly headers: HeadersInit;
};

const fetchMeta = async (params: FetchMetaParams): Promise<repo.Metadata> => {
  const [info, init] = makeMetaRequest(params.url, params.headers);
  const res = await fetch(info, init);
  return await handleMetaResponse(res);
};

export default fetchMeta;
