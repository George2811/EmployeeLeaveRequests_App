import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import { type User } from "./auth.types";

type Props = { children: React.ReactNode };

type JwtPayload = {
  sub: string,
  name: string,
  email: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
};

const parseJWTtoUser = (decoded: JwtPayload) : User => {
  return {
    id: decoded.sub,
    name: decoded.name,
    email: decoded.email,
    role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
  };
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return { user: null, token: null };

    const decoded = jwtDecode<JwtPayload>(token);
    const user = parseJWTtoUser(decoded);
    return { user, token };
  });

  const login = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token);
    const user = parseJWTtoUser(decoded);    
    localStorage.setItem("token", token);
    setAuth({ user, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
