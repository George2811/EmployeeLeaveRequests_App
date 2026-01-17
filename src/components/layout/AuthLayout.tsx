import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* <Container maxWidth="xs"> */}
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
}
