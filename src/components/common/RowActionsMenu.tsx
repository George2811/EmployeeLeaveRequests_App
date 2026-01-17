import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface RowActionsMenuProps {
  rowId: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function RowActionsMenu({
  rowId,
  onView,
  onEdit,
  onDelete
}: RowActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onView?.(rowId);
            handleClose();
          }}
        >
          Approve
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEdit?.(rowId);
            handleClose();
          }}
        >
          Reject
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            onDelete?.(rowId);
            handleClose();
          }}
        >
          Cancel
        </MenuItem>
      </Menu>
    </>
  );
}
