import * as repo from "../meta/repo";
import handleMetaResponse from "./fetch/handleMetaResponse";
import makeMetaRequest from "./fetch/makeMetaRequest";
import fetch, { HeadersInit } from "node-fetch";
import { GetMeta } from "..";
import { JsonInput } from "../util";

export type NodeFetchParams = {
  readonly url: string;
  readonly headers?: HeadersInit;
};

export const getMeta = async (
  params: NodeFetchParams
): Promise<JsonInput<repo.Metadata>> => {
  const [info, init] = makeMetaRequest(params.url, params.headers);
  const res = await fetch(info, init);
  return await handleMetaResponse(res);
};

export const make = (params: NodeFetchParams): GetMeta =>
  getMeta.bind(this, params);

export default make;
