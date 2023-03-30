import axiosInstance from "./interceptor";
import axios from "axios";

import {
  kakakoConfig,
  kakaoGetConfig,
  kakaoPostConfig,
  postConfig,
} from "./config";

export const getToken = async (code, token) => {
  const response = await axios(kakakoConfig(code, token));
  return response.data;
};

export const kakaoLogin = async (token) => {
  const response = await axios(
    kakaoGetConfig("/auth/account/kakao/login", token)
  );
  return response.data;
};

export const kakaoSignup = async (token, data) => {
  try {
    const response = await axios(
      kakaoPostConfig("/auth/account/signup", token, data)
    );
    return response;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return error.response;
    } else {
      console.log("other error occurred:", error);
    }
  }
};

export const duplicationNickname = async (token, data) => {
  const response = await axios(postConfig("/members/nickname", token, data));
  return response.data.result;
};
