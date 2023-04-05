import { getConfig, getDataConfig, postFormConfig } from "./config";
import axiosInstance from "./interceptor";

export const createDiary = async (data) => {
  try {
    const res = await axiosInstance(postFormConfig("/diaries", data));
    return res;
  } catch (e) {
    console.log("createDiary", e);
  }
};

export const getDetailDiary = async () => {
  try {
    const res = await axiosInstance(getDataConfig("/diaries/${diaryID}"));
    return res.data;
  } catch (e) {
    console.log("getDetailDiary", e);
  }
};

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
