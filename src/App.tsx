import { lazy, Suspense, useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { TopNavLayout } from "./components/TopNavLayout";
import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar";
import "./App.css";
import type { PlanType } from "./utils/constant";

// ── Lazy load pages ─────────────────────────────────────────────────────────
const Home         = lazy(() => import("./pages/Home").then((m)     => ({ default: m.Home })));
const Features     = lazy(() => import("./pages/Features").then((m) => ({ default: m.Features })));
const Pricing      = lazy(() => import("./pages/Pricing").then((m)  => ({ default: m.Pricing })));
const About        = lazy(() => import("./pages/About").then((m)    => ({ default: m.About })));
const Contact      = lazy(() => import("./pages/Contact").then((m)  => ({ default: m.Contact })));
const RegisterOwner = lazy(() => import("./pages/RegisterOwner"));
const GymDashboard  = lazy(() => import("./pages/GymDashboard"));
const Login         = lazy(() => import("./pages/Login").then((m) => ({ default: m.Login })));
const ManagerSetup  = lazy(() => import("./pages/ManagerSetup").then((m) => ({ default: m.ManagerSetup })));
const MemberSetup   = lazy(() => import("./pages/MemberSetup").then((m) => ({ default: m.MemberSetup })));
const MemberDashboard = lazy(() => import("./pages/MemberDashboard").then((m) => ({ default: m.MemberDashboard })));
const ResetPassword = lazy(() => import("./pages/ResetPassword").then((m) => ({ default: m.ResetPassword })));
const SuperAdminRoutes = lazy(() => import("./SuperAdmin/routes/SuperAdminRoutes"));

// ── Shared page-level loading fallback ──────────────────────────────────────
const PageLoader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
    <Loader size={36} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} />
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────────────────────
export type AppMode = "public" | "register" | "dashboard" | "login" | "manager-setup" | "trainer-setup" | "member-setup" | "reset-password" | "super-admin";

export interface DashboardUser {
  ownerName:    string;
  email:        string;
  role:         "admin" | "superadmin" | "gymmanager" | "trainer" | "member";
  canAddMember?: boolean;
}

export interface PaymentVerifiedPayload {
  plan:         PlanType;
  email:        string;
  paymentToken: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// App root
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [mode, setMode] = useState<AppMode>(() => {
    // Super admin portal is completely isolated
    if (window.location.pathname === "/super-admin") {
      return "super-admin";
    }
    const hasDashUser = !!localStorage.getItem("dashUser");
    if (hasDashUser && window.location.pathname === "/") {
      return "dashboard";
    }
    return "public";
  });
  const [paymentPayload, setPaymentPayload] = useState<PaymentVerifiedPayload | null>(null);
  const [dashUser, setDashUser] = useState<DashboardUser | null>(() => {
    const saved = localStorage.getItem("dashUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Intercept URLs on mount
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/super-admin") {
      setMode("super-admin");
    } else if (path === "/manager-setup") {
      setMode("manager-setup");
    } else if (path === "/trainer-setup") {
      setMode("trainer-setup");
    } else if (path === "/member-setup") {
      setMode("member-setup");
    } else if (path === "/login") {
      setMode("login");
    } else if (path === "/reset-password") {
      setMode("reset-password");
    }
  }, []);

  const handlePaymentVerified = (payload: PaymentVerifiedPayload) => {
    setPaymentPayload(payload);
    setMode("register");
  };

  const handleRegistrationSuccess = (gymName: string, ownerName: string) => {
    const newUser: DashboardUser = {
      ownerName:  ownerName  || "Gym Owner",
      email:      paymentPayload?.email || "",
      role:       "admin",
      canAddMember: true
    };
    setDashUser(newUser);
    localStorage.setItem("dashUser", JSON.stringify(newUser));
    setPaymentPayload(null);
    setMode("dashboard");
    // Optionally clean URL if they were on a specific path
    window.history.pushState({}, "", "/");
  };

  const handleLoginSuccess = (userPayload: any) => {
    // For now we set dummy dashboard user details if not provided,
    // in real app, these should come from user profile API.
    const newUser: DashboardUser = {
      ownerName:    userPayload?.fullName || "User",
      email:        userPayload?.email || "",
      role:         userPayload?.role || "member",
      canAddMember: userPayload?.canAddMember || false
    };
    setDashUser(newUser);
    localStorage.setItem("dashUser", JSON.stringify(newUser));
    setMode("dashboard");
    window.history.pushState({}, "", "/");
  };

  const handleLogout = () => {
    setDashUser(null);
    localStorage.removeItem("dashUser");
    setMode("public");
    window.history.pushState({}, "", "/");
  };

  return (
    <>
      <GlobalSnackbar />
      <Suspense fallback={<PageLoader />}>

        {mode === "login" && (
          <Login 
            onSuccess={handleLoginSuccess}
            onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} 
          />
        )}

        {mode === "reset-password" && (
          <ResetPassword
            token={new URLSearchParams(window.location.search).get("token") || ""}
            onGoToLogin={() => { setMode("login"); window.history.pushState({}, "", "/login"); }}
          />
        )}

        {(mode === "manager-setup" || mode === "trainer-setup") && (
          <ManagerSetup onSuccess={handleLoginSuccess} role={mode === "trainer-setup" ? "Trainer" : "Manager"} />
        )}

        {mode === "member-setup" && (
          <MemberSetup onSuccess={handleLoginSuccess} />
        )}

        {mode === "register" && paymentPayload && (
          <RegisterOwner
            plan={paymentPayload.plan}
            email={paymentPayload.email}
            paymentToken={paymentPayload.paymentToken}
            onSuccess={handleRegistrationSuccess}
            onBack={() => {
              setPaymentPayload(null);
              setMode("public");
            }}
          />
        )}

        {mode === "dashboard" && dashUser && (
          dashUser.role === "member" ? (
            <MemberDashboard
              userName={dashUser.ownerName}
              onLogout={handleLogout}
            />
          ) : (
            <GymDashboard onLogout={handleLogout} />
          )
        )}

        {mode === "super-admin" && (
          <SuperAdminRoutes />
        )}

        {mode === "public" && (
          <TopNavLayout onLoginClick={() => { setMode("login"); window.history.pushState({}, "", "/login"); }}>
            {(activeTab) => (
              <Suspense fallback={<PageLoader />}>
                {activeTab === "home"     && <Home />}
                {activeTab === "features" && <Features />}
                {activeTab === "pricing"  && (
                  <Pricing onPaymentVerified={handlePaymentVerified} />
                )}
                {activeTab === "about"    && <About />}
                {activeTab === "contact"  && <Contact />}
                {!["home","features","pricing","about","contact"].includes(activeTab) && <Home />}
              </Suspense>
            )}
          </TopNavLayout>
        )}

      </Suspense>
    </>
  );
}

export default App;

