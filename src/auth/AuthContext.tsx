import { createContext } from "react";
import { type AuthState } from "./auth.types";

type AuthContextType = {
  auth: AuthState;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);