import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import type { AlertColorType } from '../../utils/types';

interface TimedAlertProps {
    messaggeState: string | null;
    isOpen: boolean;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
    colorType: AlertColorType
}  

export const TimedAlert = ({
    messaggeState,
    isOpen,
    setIsOpen,
    colorType
}: TimedAlertProps
) => {
    const handleClose = (
      _event?: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsOpen(false);
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
            <Alert                
                onClose={handleClose}
                severity={colorType}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {messaggeState}
            </Alert>
        </Snackbar>
    );
}