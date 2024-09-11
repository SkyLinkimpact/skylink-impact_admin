import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("siak");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, 
(error) => {
  return Promise.reject(new Error(error));
});

export default api;
