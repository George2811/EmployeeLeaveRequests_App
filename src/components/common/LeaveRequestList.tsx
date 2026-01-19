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
import { deleteLeaveRequest, getLeaveRequests, updateStatusLeaveRquest } from "../../api/leaveRequests.api";
import type { LeaveRequestStatusType } from "../../utils/types"; 
import type { StatusColorType } from "../../utils/types";
import { LEAVE_REQUEST_STATUS } from "../../utils/Constants";
import type { Column } from "../../utils/interfaces";
import { TimedAlert } from "./TimedAlert";

interface LeaveRequestListProps {
  employeeId: string;
  columns: Column[];
}

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

export default function LeaveRequestList({ employeeId, columns }: LeaveRequestListProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<any[]>([]);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);


  useEffect(() => {
    getLeaveRequests(employeeId).then(r => {
      setData(r);
      console.log(r);
    });
  }, [employeeId]);

  const statusColor = (status: LeaveRequestStatusType) : StatusColorType => {
    switch (status) {
      case LEAVE_REQUEST_STATUS.APPROVED:
        return "success";
      case LEAVE_REQUEST_STATUS.PENDING:
        return "warning";  
      case LEAVE_REQUEST_STATUS.REJECTED:
        return "error";  
      default:
        return "info";
    }
  }
  const handleUpdateStatus = async (
    id: string,
    row: any,
    status: LeaveRequestStatusType
  ) => {
    setApiSuccess(null);
    setApiError(null);

    updateStatusLeaveRquest(id, {...row, status}).then(() => {
      setData((prev) =>
        prev.map((record) =>
        record.id === row.id
        ? { ...record, status }
        : record
        )
      );
      setSuccessAlertOpen(true);
      setApiSuccess("Leave Request updated successfully.");
    })
    .catch(e => {
      let msg = e?.response?.data || 'Something went wrong. Please try again.';
      setApiError(msg);
      setErrorAlertOpen(true);
    });
  };

  const cancelLeaveRequest = (id: string, employeeId: string) => {
    setApiSuccess(null);
    setApiError(null);
    deleteLeaveRequest(id, employeeId).then(() => {
      setApiSuccess("Leave Request canceled successfully.");
      setData((prev: any) => prev.filter((record: any) => record.id !== id));
    });
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {apiSuccess &&
        <TimedAlert messaggeState={apiSuccess} isOpen={successAlertOpen} setIsOpen={setSuccessAlertOpen} colorType='success' />
      }
      {apiError && 
        <TimedAlert messaggeState={apiError} isOpen={errorAlertOpen} setIsOpen={setErrorAlertOpen} colorType='error' />
      }
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
                        row={row}
                        onDelete={cancelLeaveRequest}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    ) : (
                      column.type === 'date'?
                      (dayjs(row[column.id]).format('DD/MM/YYYY'))
                      : (
                        column.type === 'highlight'?
                        (<Chip label={row[column.id]} color={statusColor(row[column.id])} />)
                        :
                        ( column.type === 'child_text'?
                          row[column.id]?.name
                          :
                          row[column.id]
                        )
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
