import type { LEAVE_REQUEST_STATUS } from "./Constants";

export type StatusColorType = "success" | "error" | "warning" | "primary" | "secondary" | "info";

export type AlertColorType = "success" | "error" | "warning" | "info";

export type ColumnType = "date" | "highlight" | "text" | "number" | "actions" | "child_text";

export type ColumnIdType = "employee" | "actions" | "startDate" | "endDate" | "reason" | "status";

export type AlignmentType = "left" | "right";

export type LeaveRequestStatusType = typeof LEAVE_REQUEST_STATUS[keyof typeof LEAVE_REQUEST_STATUS];