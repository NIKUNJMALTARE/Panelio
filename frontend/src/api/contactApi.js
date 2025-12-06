import axiosInstance from "./axiosInstance";

export const createContact = (data) => axiosInstance.post("/api/contact", data);
export const getContacts = () => axiosInstance.get("/api/contact");