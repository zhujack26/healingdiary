import {
  deleteConfig,
  getConfig,
  getDataConfig,
  patchConfig,
  postConfig,
  postFormConfig,
} from "./config";
import axiosInstance from "./interceptor";

export const getRecommendGroup = async () => {
  try {
    const res = await axiosInstance(getConfig("/clubs/recommendation"));
    return res.data;
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
    const res = await axiosInstance(getDataConfig(`/clubs/${data}/invitation`));
    return res.data.content;
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

export const getMyClubList = async () => {
  try {
    const res = await axiosInstance(getConfig("/clubs?all=false"));
    return res.data;
  } catch (e) {
    console.log("getMyClubList", e);
  }
};

export const inviteGroupMember = async (groupId, memberId) => {
  try {
    const res = await axiosInstance(
      postConfig(`/clubs/${groupId}/invitation`, { memberId })
    );

    return res.data;
  } catch (e) {
    console.log("inviteGroup", e);
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const res = await axiosInstance(deleteConfig(`/clubs/${groupId}`));
    return res;
  } catch (e) {
    console.log("exitGroup", e);
  }
};

export const joinGroup = async (data) => {
  try {
    const res = await axiosInstance(postConfig(`/clubs/${data}/join`));
    return res;
  } catch (e) {
    console.log("joinGroup", e);
  }
};

export const groupApplyList = async (data) => {
  try {
    const res = await axiosInstance(getConfig(`/clubs/${data}/application`));
    return res;
  } catch (e) {
    console.log("getGroupApplyList", e);
  }
};

export const approvalMember = async (data) => {
  try {
    const res = await axiosInstance(patchConfig(`/clubs/${data}/approval`));
    return res;
  } catch (e) {
    console.log("approvalMember", e);
  }
};

export const rejectAndExitMember = async (data) => {
  try {
    const res = await axiosInstance(
      deleteConfig(`/clubs/${data?.clubId}/${data?.memberId}`)
    );

    return res;
  } catch (e) {
    console.log("callMemberReject", e);
  }
};

export const searchGroup = async (keyword) => {
  try {
    const res = await axiosInstance(
      getConfig(`/clubs?all=true&keyword=${keyword}`)
    );
    return res;
  } catch (e) {
    console.log("searchGroup", e);
  }
};
