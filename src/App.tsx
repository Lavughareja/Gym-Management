import { lazy, Suspense, useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { SidebarLayout } from "./components/SidebarLayout";
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
export type AppMode = "public" | "register" | "dashboard" | "login" | "manager-setup" | "trainer-setup";

export interface DashboardUser {
  ownerName:  string;
  gymName:    string;
  ownerEmail: string;
  role?:      string;
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
  const [mode, setMode] = useState<AppMode>("public");
  const [paymentPayload, setPaymentPayload] = useState<PaymentVerifiedPayload | null>(null);
  const [dashUser,       setDashUser]       = useState<DashboardUser | null>(null);

  // Intercept URLs on mount
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/manager-setup") {
      setMode("manager-setup");
    } else if (path === "/trainer-setup") {
      setMode("trainer-setup");
    } else if (path === "/login") {
      setMode("login");
    }
  }, []);

  const handlePaymentVerified = (payload: PaymentVerifiedPayload) => {
    setPaymentPayload(payload);
    setMode("register");
  };

  const handleRegistrationSuccess = (gymName: string, ownerName: string) => {
    setDashUser({
      ownerName:  ownerName  || "Gym Owner",
      gymName:    gymName    || "My Gym",
      ownerEmail: paymentPayload?.email || "",
      role: "admin",
    });
    setPaymentPayload(null);
    setMode("dashboard");
    // Optionally clean URL if they were on a specific path
    window.history.pushState({}, "", "/");
  };

  const handleLoginSuccess = (userPayload: any) => {
    // For now we set dummy dashboard user details if not provided,
    // in real app, these should come from user profile API.
    setDashUser({
      ownerName:  "User",
      gymName:    "IronPulse Gym",
      ownerEmail: "",
      role: userPayload?.role || "member",
    });
    setMode("dashboard");
    window.history.pushState({}, "", "/");
  };

  const handleLogout = () => {
    setDashUser(null);
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

        {(mode === "manager-setup" || mode === "trainer-setup") && (
          <ManagerSetup onSuccess={handleLoginSuccess} role={mode === "trainer-setup" ? "Trainer" : "Manager"} />
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
          <GymDashboard
            ownerName={dashUser.ownerName}
            gymName={dashUser.gymName}
            ownerEmail={dashUser.ownerEmail}
            role={dashUser.role}
            onLogout={handleLogout}
          />
        )}

        {mode === "public" && (
          <SidebarLayout onLoginClick={() => { setMode("login"); window.history.pushState({}, "", "/login"); }}>
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
          </SidebarLayout>
        )}

      </Suspense>
    </>
  );
}

export default App;
