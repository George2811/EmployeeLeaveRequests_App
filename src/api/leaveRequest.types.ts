import type { Employee } from "./employee.types";

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

export interface LeaveRequestReadOnly {
    id: string;
    employee: Employee;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
}