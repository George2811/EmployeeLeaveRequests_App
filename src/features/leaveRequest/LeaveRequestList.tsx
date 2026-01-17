import { useEffect, useState } from "react";
import { tableCellClasses } from '@mui/material/TableCell';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RowActionsMenu from "../../components/common/RowActionsMenu";
import { getLeaveRequests } from "../../api/leaveRequests.api";

interface LeaveRequestListProps {
  employeeId: string;
}

interface Column {
  id: "actions" | "start_date" | "end_date" | "reason" | "status";
  label: string;
  minWidth?: number;
  align?: "left" | "right";
}

const columns: readonly Column[] = [
  { id: "actions", label: "Actions", minWidth: 50, align: "right" },
  { id: "start_date", label: "Start Date", minWidth: 100 },
  { id: "end_date", label: "End Date", minWidth: 100 },
  { id: "reason", label: "Reason", minWidth: 300 },
  { id: "status", label: "Status", minWidth: 120 }
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

  // interface Data {
  //   id: string;
  //   start_date: string;
  //   end_date: string;
  //   reason: string;
  //   status: string;
  // }
  // function createData(
  //   id: string,
  //   start_date: string,
  //   end_date: string,
  //   reason: string,
  //   status: string
  // ) :
  //   Data {
  //   return { id, start_date, end_date, reason, status };
  // }

  useEffect(() => {
    getLeaveRequests(employeeId).then(setData);
    // setData([
    //   createData('1','01/01/2026','30/01/2026', 'Vacaciones', 'Approved'),
    //   createData('2','01/01/2026','30/01/2026', 'Vacaciones', 'Approved'),
    //   createData('3','01/01/2026','30/01/2026', 'Vacaciones', 'Approved'),
    // ]);
  }, [employeeId]);

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
                    {column.id === "actions" ? (
                      <RowActionsMenu
                        rowId={row.id}
                        onView={(id) => console.log("View", id)}
                        onEdit={(id) => console.log("Edit", id)}
                        onDelete={(id) => console.log("Delete", id)}
                      />
                    ) : (
                      row[column.id]
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
