import { axiosClient } from "./axiosClient";
import { type CreateLeaveRequestPayload } from "./leaveRequest.types";

export const getLeaveRequests = async (employeeId: string) => {
  const response = await axiosClient.get(`/leaverequests/${employeeId}`);
  return response.data;
};

export const createLeaveRequest = async (payload: CreateLeaveRequestPayload) => {
  const response = await axiosClient.post("/leaverequests", payload);
  return response.data;
};

export const updateStatusLeaveRquest = async (leaveRequestId: string, payload: CreateLeaveRequestPayload) => {
  const response = await axiosClient.put(`/leaverequests/${leaveRequestId}`, payload);
  return response.data;
}

export const cancelLeaveRequests = async (leaveRequestId: string, employeeId: string) => {
  const response = await axiosClient.delete(`/leaverequests/${leaveRequestId}/${employeeId}`);
  return response.data;
};