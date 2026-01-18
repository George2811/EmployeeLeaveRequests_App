import { useEffect, useState } from "react";
import { tableCellClasses } from '@mui/material/TableCell';
import dayjs from 'dayjs';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RowActionsMenu from "./RowActionsMenu";
import { getLeaveRequests } from "../../api/leaveRequests.api";
import type { LeaveRequestStatus } from "../../api/leaveRequest.types";

interface LeaveRequestListProps {
  employeeId: string;
}

interface Column {
  id: "actions" | "startDate" | "endDate" | "reason" | "status";
  label: string;
  minWidth?: number;
  align?: "left" | "right";
  type?: 'date' | 'highlight' | 'text' | 'number' | 'actions';
}

type StatusColor = "default" | "success" | "error" | "warning" | "primary" | "secondary" | "info";

const columns: readonly Column[] = [
  { id: "actions", label: "Actions", minWidth: 50, type: "actions", align: "right" },
  { id: "startDate", label: "Start Date", minWidth: 100, type: "date" },
  { id: "endDate", label: "End Date", minWidth: 100, type: "date" },
  { id: "reason", label: "Reason", minWidth: 300, type: "text" },
  { id: "status", label: "Status", minWidth: 120, type: "highlight"}
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function LeaveRequestList({ employeeId }: LeaveRequestListProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getLeaveRequests(employeeId).then(setData);
  }, [employeeId]);

  const statusColor = (status: LeaveRequestStatus) : StatusColor => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";  
      case "Rejected":
        return "error";  
      default:
        return "info";
    }
  }
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.id}>
                  {columns.map((column) => (
                    <StyledTableCell key={column.id} align={column.align}>
                    {column.type === "actions" ? (
                      <RowActionsMenu
                        rowId={row.id}
                        onView={(id) => console.log("View", id)}
                        onEdit={(id) => console.log("Edit", id)}
                        onDelete={(id) => console.log("Delete", id)}
                      />
                    ) : (
                      column.type === 'date'?
                      (dayjs(row[column.id]).format('DD/MM/YYYY'))
                      : (
                        column.type === 'highlight'?
                        (<Chip label={row[column.id]} color={statusColor(row[column.id])} />)
                        :
                        row[column.id]
                      )
                    )}
                  </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>

      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />
    </Paper>
  );
}
