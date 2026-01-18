import { useEffect } from 'react';

interface UseAlertTimerProps {
  success: string | null;
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  timeout?: number;
}

const DEFAULT_TIMEOUT = 4000;

export const useAlertTimer = ({
  success,
  setSuccess,
  error,
  setError,
  timeout = DEFAULT_TIMEOUT
}: UseAlertTimerProps) => {
  useEffect(() => {
    if (!success && !error) return;

    const timer = setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, timeout);

    return () => clearTimeout(timer);
  }, [success, error]);
};