import { getConfig, getDataConfig, postFormConfig } from "./config";
import axiosInstance from "./interceptor";

export const getRecommendGroup = async () => {
  try {
    const res = await axiosInstance(getConfig("/clubs/recommendation"));
    return res.data.content;
  } catch (e) {
    console.log("getRecommendGroup", e);
  }
};

export const createGroup = async (data) => {
  try {
    const res = await axiosInstance(postFormConfig("/clubs", data));
    return res;
  } catch (e) {
    console.log("createGroup", e);
  }
};

export const getGroupDetail = async (data) => {
  try {
    const res = await axiosInstance(getDataConfig(`/clubs/${data}`));
    return res.data;
  } catch (e) {
    console.log("getGroupDetail", e);
  }
};
