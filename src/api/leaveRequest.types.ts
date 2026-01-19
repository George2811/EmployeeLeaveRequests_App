export interface CreateLeaveRequestPayload {
    employeeId: string;
    startDate: string;
    endDate: string;
    reason: string;
    status?: string;
}

export interface LeaveRequest {
    id: string;
    employeeId: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
}