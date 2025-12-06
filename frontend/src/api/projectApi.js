// frontend/src/api/projectApi.js
import axiosInstance from "./axiosInstance";

export const getProjects = () => axiosInstance.get("/api/projects");

export const createProject = (formData) =>
  axiosInstance.post("/api/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
