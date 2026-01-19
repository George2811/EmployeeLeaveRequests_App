import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "../../auth/useAuth";
import type { LeaveRequest } from "../../api/leaveRequest.types";
import { LEAVE_REQUEST_STATUS } from "../../utils/Constants";
import type { LeaveRequestStatusType } from "../../utils/types";

interface RowActionsMenuProps {
  row: LeaveRequest;
  onDelete: (id: string, employeeId: any) => void;
  onUpdateStatus: (
    id: string,
    row: LeaveRequest,
    status: LeaveRequestStatusType
  ) => void;
}

export default function RowActionsMenu({
  row,
  onDelete,
  onUpdateStatus
}: RowActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { auth } = useAuth();
  const currentUserId  = auth.user?.id || '';

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const approveLeaveRequest = () => {
    onUpdateStatus(currentUserId, row, LEAVE_REQUEST_STATUS.APPROVED);
  }

  const rejectLeaveRequest = () => {
    onUpdateStatus(currentUserId, row, LEAVE_REQUEST_STATUS.REJECTED);
  }

  const cancelLeaveRequest = () => {
    onDelete(row.id, row.employeeId);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {
          auth.user?.role == 'Manager' &&
          <>
            <MenuItem         
              sx={{ color: "success.main" }}   
              onClick={() => {
                approveLeaveRequest();
                handleClose();
              }}
            >
              Approve
            </MenuItem>

            <MenuItem
              sx={{ color: "error.main" }}
              onClick={() => {
                rejectLeaveRequest();
                handleClose();
              }}
            >
              Reject
            </MenuItem>
          </>
        }
        {
          auth.user?.role == 'Employee' &&
          <MenuItem
            sx={{ color: "error.main" }}
            onClick={() => {
              cancelLeaveRequest();
              handleClose();
            }}
          >
            Cancel
          </MenuItem>
        }
      </Menu>
    </>
  );
}
