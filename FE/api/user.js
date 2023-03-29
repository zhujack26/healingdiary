import axiosInstance from "./interceptor";
import axios from "axios";

import { kakakoConfig, kakaoGetConfig } from "./config";

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
