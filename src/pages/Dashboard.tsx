import { Container, Typography, Grid } from "@mui/material";
import LeaveRequestList from "../features/leaveRequest/LeaveRequestList";
import { useAuth } from "../auth/useAuth";

export default function Dashboard() {
    const { auth } = useAuth();

    console.log(auth.user?.id);

    return (
    <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
        Employee Leave Requests
        </Typography>

        <Grid container spacing={2}>
            <Grid size={12}>
                <LeaveRequestList employeeId={auth.user?.id || ""} />
            </Grid>
        </Grid>
    </Container>
    );
}
