import { getConfig } from "./config";
import axiosInstance from "./interceptor";

export const getRecommendGroup = async () => {
  try {
    const res = await axiosInstance(getConfig("/clubs/recommendation"));
    return res.data.content;
  } catch (e) {
    console.log("getRecommendGroup", e);
  }
};
