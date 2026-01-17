import { useState } from "react";
import { Button, TextField, Container, Stack } from "@mui/material";
import { loginRequest } from "../api/auth.api";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = await loginRequest(email, password);
    login(token);
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={2}>
        <TextField fullWidth label="Email" onChange={e => setEmail(e.target.value)} />
        <TextField fullWidth type="password" label="Password" onChange={e => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </Stack>
    </Container>
  );
}
