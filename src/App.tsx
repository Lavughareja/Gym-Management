import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar";
import AppRouter from "./router/AppRouter";
import "./App.css";
import type { PlanType } from "./utils/constant";

// ─────────────────────────────────────────────────────────────────────────────
// Shared types (kept here for backward compat with existing imports)
// ─────────────────────────────────────────────────────────────────────────────
export type AppMode =
  | "public" | "register" | "dashboard" | "login"
  | "manager-setup" | "trainer-setup" | "member-setup"
  | "reset-password" | "super-admin" | "feature-detail"
  | "screenshots" | "integrations" | "testimonials"
  | "owner-onboarding" | "blogs" | "blog-detail";

export interface DashboardUser {
  ownerName: string;
  email: string;
  role: "admin" | "superadmin" | "gymmanager" | "trainer" | "member";
  canAddMember?: boolean;
}

export interface PaymentVerifiedPayload {
  plan: PlanType;
  email: string;
  paymentToken: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// App root — all routing is handled by AppRouter
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <GlobalSnackbar />
      <AppRouter />
    </>
  );
}

export default App;
