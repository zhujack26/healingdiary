import { deleteConfig } from "./config";
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

export const getDiaryDetail = async (diaryId) => {
  try {
    const res = await axiosInstance(getDataConfig(`/diaries/${diaryId}`));
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

export const getSearchDiary = async (keyword) => {
  try {
    const res = await axiosInstance(
      getConfig(`/diaries?all=true&keyword=${keyword}`)
    );
    return res;
  } catch (e) {
    console.log("getSearchDiary", e);
  }
};

export const getSearchTagDiary = async (tag) => {
  try {
    const res = await axiosInstance(getConfig(`/diaries?all=true&tag=${tag}`));
    return res;
  } catch (e) {
    console.log("getSearchTagDiary", e);
  }
};

export const getRecentDiary = async () => {
  try {
    const res = await axiosInstance("/diaries?all=false&size=5");
    return res.data;
  } catch (e) {
    console.log("getRecentDiary", e);
  }
};

export const getCalendarDiary = async (year, month) => {
  try {
    const res = await axiosInstance(
      getDataConfig(`/diaries/calendar?year=${year}&month=${month}`)
    );
    return res.data;
  } catch (e) {
    console.log("getCalendarDiary", e);
  }
};

export const getStatisticsDiary = async (year, month) => {
  try {
    const res = await axiosInstance(
      getDataConfig(`/diaries/emotion?year=${year}&month=${month}`)
    );
    return res.data;
  } catch (e) {
    console.log("getCalendarDiary", e);
  }
};
export const getCalendarDetailDiary = async (year, month, day) => {
  try {
    const res = await axiosInstance(
      getConfig(`/diaries?all=false&year=${year}&month=${month}&day=${day}`)
    );
    return res;
  } catch (e) {
    console.log("getCalendarDetailDiary", e);
  }
};

export const deleteDiary = async (diaryId) => {
  try {
    const res = await axiosInstance(deleteConfig(`/diaries/${diaryId}`));
    return res;
  } catch (e) {
    console.log("deleteDiary", e);
  }
};
