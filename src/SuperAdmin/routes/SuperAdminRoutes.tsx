import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import SuperAdminLogin from "../pages/SuperAdminLogin";
import SuperAdminDashboard from "../pages/SuperAdminDashboard";

// ─────────────────────────────────────────────────────────────────────────────
// SuperAdminRoutes — shows Login or Dashboard based on auth state
// ─────────────────────────────────────────────────────────────────────────────

const SuperAdminRoutes: React.FC = () => {
  const isAuthenticated = useSelector(
    (s: RootState) => s.superAdmin.isAuthenticated
  );

  return isAuthenticated ? <SuperAdminDashboard /> : <SuperAdminLogin />;
};

export default SuperAdminRoutes;
