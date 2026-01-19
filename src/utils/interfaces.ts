import type { AlignmentType, ColumnIdType, ColumnType } from "./types";

export interface Column {
    id: ColumnIdType;
    label: string;
    minWidth?: number;
    align?: AlignmentType;
    type?: ColumnType;
}
