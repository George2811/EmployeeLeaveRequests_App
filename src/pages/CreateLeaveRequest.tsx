import { useState } from 'react';
import { useAuth } from "../auth/useAuth";
import { Container, Box } from '@mui/material';
import {
  Button,
  CircularProgress,
  TextField,
  Stack,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { createLeaveRequest } from '../api/leaveRequests.api';
import { type CreateLeaveRequestPayload } from '../api/leaveRequest.types';
import { TimedAlert } from '../components/common/TimedAlert';

interface FormErrors {
  startDate?: string;
  endDate?: string;
  reason?: string;
}

export const CreateLeaveRequest = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const { auth } = useAuth();
  const employeeId : string  = auth.user?.id || "";

  const cleanForm = () => {
    setStartDate(null);
    setEndDate(null);
    setReason('');
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!startDate) {
      newErrors.startDate = 'Start Date is required';
    }

    if (!endDate) {
      newErrors.endDate = 'End Date is required';
    }

    if (startDate && endDate && (startDate.isAfter(endDate) || startDate.isSame(endDate))) {
      newErrors.endDate = 'End Date must be after Start Date';
    }

    if (!reason.trim()) {
      newErrors.reason = 'Reason is required';
    } else if (reason.length > 250) {
      newErrors.reason = 'Reason cannot exceed 250 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiSuccess(null);
    setApiError(null);

    if (!validate()) return;

    const payload : CreateLeaveRequestPayload = {
      employeeId,
      startDate: startDate!.toISOString(),
      endDate: endDate!.toISOString(),
      reason: reason.trim()
    };

    setIsSubmitting(true);

    createLeaveRequest(payload).then(() => {
      setApiSuccess("Leave Request created successfully.");
      cleanForm();
      setSuccessAlertOpen(true);
    }).catch(() => {
      setApiError('Something went wrong. Please try again.');
      setErrorAlertOpen(true);
    }).finally(() => {
      setIsSubmitting(false);
    });

  };

  return (
    <Box
      sx={{
        maxHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}
    >
      <Container
        maxWidth="sm"
      >        
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <Typography  variant="h4" gutterBottom>
              Create Leave Request
            </Typography>

            {apiSuccess &&
              <TimedAlert messaggeState={apiSuccess} isOpen={successAlertOpen} setIsOpen={setSuccessAlertOpen} colorType='success' />
            }
            {apiError && 
              <TimedAlert messaggeState={apiError} isOpen={errorAlertOpen} setIsOpen={setErrorAlertOpen} colorType='error' />
            }

            <DatePicker
              minDate={dayjs()}
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              slotProps={{
                textField: {
                  required: true,
                  error: Boolean(errors.startDate),
                  helperText: errors.startDate
                }
              }}
            />

            <DatePicker
              minDate={dayjs()}
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              slotProps={{
                textField: {
                  required: true,
                  error: Boolean(errors.endDate),
                  helperText: errors.endDate
                }
              }}
            />

            <TextField
              label="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              multiline
              minRows={3}
              slotProps={{ htmlInput: {maxLength: 250} }}
              error={Boolean(errors.reason)}
              helperText={errors.reason ?? `${reason.length}/250`}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? 'Submitting...' : 'Create Leave Request'}
            </Button>
          </Stack>
        </form>
        {/* <CreateLeaveRequestForm employeeId={employeeId} /> */}
        
      </Container>
    </Box>
    
  );
};
