import { Container, Typography, Grid } from "@mui/material";
import LeaveRequestList from "../components/common/LeaveRequestList";
import { useAuth } from "../auth/useAuth";
import type { Column } from "../utils/interfaces";
import { ROLES } from "../utils/Constants";

const employeeColumns: Column[] = [
    { id: "actions", label: "Actions", minWidth: 50, type: "actions", align: "right" },
    { id: "startDate", label: "Start Date", minWidth: 100, type: "date" },
    { id: "endDate", label: "End Date", minWidth: 100, type: "date" },
    { id: "reason", label: "Reason", minWidth: 300, type: "text" },
    { id: "status", label: "Status", minWidth: 120, type: "highlight"}
];

const managerColumns: Column[] = [
    { id: "actions", label: "Actions", minWidth: 50, type: "actions", align: "right" },
    { id: "name", label: "Employee", minWidth: 50, type: "text", align: "right" },
    { id: "startDate", label: "Start Date", minWidth: 100, type: "date" },
    { id: "endDate", label: "End Date", minWidth: 100, type: "date" },
    { id: "reason", label: "Reason", minWidth: 300, type: "text" },
    { id: "status", label: "Status", minWidth: 120, type: "highlight"}
];

export default function Dashboard() {
    const { auth } = useAuth();

    const getColumns = () : Column[] => {
        switch (auth.user?.role) {
            case ROLES.MANAGER:
                return managerColumns;
            case ROLES.EMPLOYEE:
                return employeeColumns;
            default:
                return [];
        }
    }

    return (
    <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
            Employee Leave Requests
        </Typography>

        <Grid container spacing={2}>
            <Grid size={12}>
                <LeaveRequestList employeeId={auth.user?.id || ""} columns={getColumns()} />
            </Grid>
        </Grid>
    </Container>
    );
}
