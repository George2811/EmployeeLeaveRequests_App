import { axiosClient } from "./axiosClient";

export const loginRequest = async (email: string, password: string) => {
  const response = await axiosClient.post("/auth/login", {
    email,
    password,
  });
  return response.data.token;
};