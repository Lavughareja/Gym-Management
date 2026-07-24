import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "owner" | "gymmanager" | "trainer" | "member" | "superadmin";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Roles that are allowed to access this route. Empty = any authenticated user. */
  allowedRoles?: UserRole[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper — read stored user info
// ─────────────────────────────────────────────────────────────────────────────

export function getStoredUser(): { role: UserRole; [key: string]: any } | null {
  const stored = localStorage.getItem("dashUser");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem("gym_auth_token");
  const user = getStoredUser();
  return !!(token && user);
}

/** Given a role, return the default dashboard root path */
export function getDashboardRoot(role: UserRole): string {
  switch (role) {
    case "member":
      return "/member/overview";
    case "admin":
    case "owner":
    case "gymmanager":
    case "trainer":
      return "/dashboard/overview";
    default:
      return "/login";
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ProtectedRoute Component
// ─────────────────────────────────────────────────────────────────────────────

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const location = useLocation();

  // Not authenticated → go to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const user = getStoredUser();
  const role = user?.role as UserRole;

  // If specific roles are required, check them
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(role)) {
      // Redirect to their correct dashboard root
      return <Navigate to={getDashboardRoot(role)} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
