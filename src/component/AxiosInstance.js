// src/axiosInstance.js
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://pet-booking-eta.vercel.app",
});

AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosInstance;
