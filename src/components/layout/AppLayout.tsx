import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../common/NavBar";
import { useAuth } from "../../auth/useAuth";

export default function AppLayout() {
  const { auth } = useAuth();

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <NavBar role={auth.user?.role} />
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          padding: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
