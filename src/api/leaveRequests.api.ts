import { axiosClient } from "./axiosClient";

export const getLeaveRequests = async (employeeId: String) => {
  const response = await axiosClient.get(`/leaverequests/${employeeId}`);
  return response.data;
};

export const createLeaveRequest = async (payload: any) => {
  const response = await axiosClient.post("/leaverequests", payload);
  return response.data;
};