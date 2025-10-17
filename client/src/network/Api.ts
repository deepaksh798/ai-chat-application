import { getRequest, postRequest } from "./ApiRequest";
import { ENDPOINTS } from "./EndPoints";

//  AUTH API's -------
export const loginApi = (payload: any) => {
  return postRequest(ENDPOINTS.LOGIN, payload);
};

export const signupApi = (payload: any) => {
  return postRequest(ENDPOINTS.SIGNUP, payload);
};

// chat api

export const sendMessageApi = (payload: any) => {
  return postRequest(ENDPOINTS.CHAT, payload);
};
