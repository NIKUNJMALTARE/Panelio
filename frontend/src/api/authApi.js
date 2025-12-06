import axiosInstance from "./axiosInstance";

export const loginAdmin = (email, password) =>
  axiosInstance.post("/api/auth/login", { email, password });