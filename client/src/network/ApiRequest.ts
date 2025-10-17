import { axiosClient } from "./ApiClient";

export const getRequest = (url: string, params?: any, signal?: AbortSignal) => {
  return axiosClient.get(url, { params: params, signal });
};

export const postRequest = (url: string, payload?: any | null) => {
  return axiosClient.post(url, payload);
};
