import { useAuth } from "../auth/useAuth";

export const useAuthRedirect = () => {
  const { auth } = useAuth();

  const getRedirectPath = () => !auth.token ? "/login" : "/dashboard";

  return {
    getRedirectPath,
  };
};
