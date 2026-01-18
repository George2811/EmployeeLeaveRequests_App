export interface CreateLeaveRequestPayload {
    employeeId: string;
    startDate: string;
    endDate: string;
    reason: string;
    status?: string;
}

export interface LeaveRequest {
    id: string,
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
}

export type LeaveRequestStatus = "Approved" | "Rejected" | "Pending";