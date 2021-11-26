import * as repo from "../meta/repo";
import axios, { AxiosRequestConfig } from "axios";
import { GetMeta } from "..";
import { DeepPartial } from "tsdef";

export type AxiosParams = Omit<AxiosRequestConfig, "responseType"> & {
  url: string;
};

export const getMeta = async (params: AxiosParams) => {
  const res = await axios.request<DeepPartial<repo.Metadata>>({
    ...params,
    responseType: "json",
  });
  return res.data;
};

export const makeFetchMeta = (params: AxiosParams): GetMeta =>
  getMeta.bind(this, params);

export default makeFetchMeta;
