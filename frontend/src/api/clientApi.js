import axiosInstance from "./axiosInstance";

export const getClients = () => axiosInstance.get("/api/clients");

export const createClient = (formData) =>
  axiosInstance.post("/api/clients", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
