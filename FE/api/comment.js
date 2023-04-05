import { getConfig, postConfig } from "./config";
import axiosInstance from "./interceptor";

export const getDiaryComment = async (diaryId) => {
  try {
    const res = await axiosInstance(getConfig(`/comments?diaryId=${diaryId}`));
    return res;
  } catch (e) {
    console.log("getDiaryComment", e);
  }
};

export const createComment = async (data) => {
  try {
    const res = await axiosInstance(postConfig(`/comments`, data));
    return res;
  } catch (e) {
    console.log("createComment", e);
  }
};
