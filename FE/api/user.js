import axios from "./interceptor";
import { kakakoConfig, getConfig } from "./config";

export const getToken = async (code) => {
  const response = await axios(kakakoConfig(code));
  return response;
};

export const kakaoLogin = async () => {
  const response = await axios(getConfig("/auth/account/kakao/login"));
  return response;
};
