import { API_END_POINT, KAKAO_LOGIN, REST_API_KEY } from "../constants/index";

export const getConfig = (url) => {
  return {
    method: "GET",
    url: API_END_POINT + url,
  };
};

export const postConfig = (url, data) => {
  return {
    method: "POST",
    url: API_END_POINT + url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
};

export const kakakoConfig = (code) => {
  return {
    method: "POST",
    url: KAKAO_LOGIN,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: API_END_POINT,
      code: code,
    },
  };
};
