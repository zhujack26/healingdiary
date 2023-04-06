import axiosInstance from "./interceptor";

export const getNotification = async () => {
  try {
    const res = await axiosInstance.get("/notices");
    return res.data;
  } catch (e) {
    console.log("getNotification", e);
  }
};
