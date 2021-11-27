import handleMetaResponse from "./fetch/handleMetaResponse";
import makeMetaRequest from "./fetch/makeMetaRequest";
import { GetMeta } from "../MetaRepo";

export type FetchParams = {
  readonly url: string;
  readonly headers?: HeadersInit;
};

export const getMeta = async (params: FetchParams) => {
  const [info, init] = makeMetaRequest(params.url, params.headers);
  const res = await fetch(info, init);
  return await handleMetaResponse(res);
};

export const make = (params: FetchParams): GetMeta =>
  getMeta.bind(this, params);

export default make;
