import { axiosClient } from "./axiosClient";
import { type CreateLeaveRequestPayload, type LeaveRequest } from "./leaveRequest.types";

export const getLeaveRequests = async (employeeId: string) => {
  const response = await axiosClient.get(`/leaverequests/${employeeId}`);
  return response.data;
};

export const createLeaveRequest = async (payload: CreateLeaveRequestPayload) => {
  const response = await axiosClient.post("/leaverequests", payload);
  return response.data;
};

export const updateStatusLeaveRquest = async (employeeId: string, payload: LeaveRequest) => {
  const response = await axiosClient.put(`/leaverequests/${employeeId}`, payload);
  return response.data;
}

export const deleteLeaveRequest = async (leaveRequestId: string, employeeId: string) => {
  const response = await axiosClient.delete(`/leaverequests/${leaveRequestId}/${employeeId}`);
  return response.data;
};