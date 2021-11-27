import axios, { AxiosRequestConfig } from "axios";
import { GetMeta } from "../MetaRepo";
import { validateMetadata } from "../meta/repo.validator";

export type AxiosParams = Omit<AxiosRequestConfig, "responseType"> & {
  url: string;
};

export const getMeta = async (params: AxiosParams) => {
  const res = await axios.request<unknown>({
    ...params,
    responseType: "json",
  });
  return validateMetadata(res.data);
};

export const makeFetchMeta = (params: AxiosParams): GetMeta =>
  getMeta.bind(this, params);

export default makeFetchMeta;
