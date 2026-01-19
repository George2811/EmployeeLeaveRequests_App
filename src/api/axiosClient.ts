import axios from "axios";
import { env } from "../config/env";

export const axiosClient = axios.create({
  baseURL: "https://localhost:44347/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});