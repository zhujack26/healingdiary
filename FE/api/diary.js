import { getConfig, getDataConfig } from "./config";
import axiosInstance from "./interceptor";

export const getRecommendDiary = async () => {
  try {
    const res = await axiosInstance(getConfig("/diaries/recommendation"));
    return res.data;
  } catch (e) {
    console.log("getRecommendDiary", e);
  }
};

export const getGroupDiary = async (data) => {
  try {
    const res = await axiosInstance(
      getDataConfig(`/diaries?all=true&clubId=${data}`)
    );
    return res.data;
  } catch (e) {
    console.log("getGroupDiary", e);
  }
};
