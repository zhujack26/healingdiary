import { API_END_POINT, KAKAO_LOGIN, REST_API_KEY } from "../constants/index";

export const getConfig = (url) => {
  return {
    method: "GET",
    url: API_END_POINT + url,
  };
};

export const getDataConfig = (url, data) => {
  return {
    method: "GET",
    url: API_END_POINT + url,
    data: data,
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

export const postFormConfig = (url, data) => {
  return {
    method: "POST",
    url: API_END_POINT + url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };
};
export const kakakoConfig = (code, token) => {
  return {
    method: "POST",
    url: KAKAO_LOGIN,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: API_END_POINT,
      code: code,
    },
  };
};

export const kakaoGetConfig = (url, token) => {
  return {
    method: "GET",
    url: API_END_POINT + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const kakaoPostConfig = (url, token, data) => {
  return {
    method: "POST",
    url: API_END_POINT + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
};
