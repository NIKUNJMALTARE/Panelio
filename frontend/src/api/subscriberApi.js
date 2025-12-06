import axiosInstance from "./axiosInstance";

export const createSubscriber = (data) =>
  axiosInstance.post("/api/subscribe", data);
export const getSubscribers = () => axiosInstance.get("/api/subscribe");