import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import AuthLayout from "../components/layout/AuthLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export const AppRouter = () => (
  <Routes>
    {/* Auth pages */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
    </Route>

    {/* App pages */}
    <Route
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route path="*" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/createrequest" element={<Dashboard />} />
      <Route path="/managerview" element={<Dashboard />} />
      {/* futuras páginas */}
    </Route>
  </Routes>
);
