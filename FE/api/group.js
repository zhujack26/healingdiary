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

export const getGroupMemebrList = async (data) => {
  try {
    const res = await axiosInstance(getDataConfig(`/clubs/${data}/members`));
    return res.data;
  } catch (e) {
    console.log("getGroupMemberList", e);
  }
};

export const getInviteGroupMemberList = async (data) => {
  try {
    const res = await axiosInstance(
      getDataConfig(`/clubs/${data}/invitation?`)
    );
    return res.data;
  } catch (e) {
    console.log("getInviteGroupMemberList", e);
  }
};

export const getClubList = async () => {
  try {
    const res = await axiosInstance(getConfig("/clubs?all=true"));
    return res.data;
  } catch (e) {
    console.log("getClubList", e);
  }
};
