import { lazy, Suspense, useState } from "react";
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
// These are loaded ONLY after payment / registration — keeps initial bundle small
const RegisterOwner = lazy(() => import("./pages/RegisterOwner"));
const GymDashboard  = lazy(() => import("./pages/GymDashboard"));

// ── Shared page-level loading fallback ──────────────────────────────────────
const PageLoader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
    <Loader size={36} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} />
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Shared types — exported so Pricing / RegisterOwner can import them
// ─────────────────────────────────────────────────────────────────────────────
export type AppMode = "public" | "register" | "dashboard";

export interface DashboardUser {
  ownerName:  string;
  gymName:    string;
  ownerEmail: string;
}

// Payload passed from Pricing → App when payment is verified
export interface PaymentVerifiedPayload {
  plan:         PlanType;
  email:        string;
  paymentToken: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// App root
// Three top-level modes that completely replace each other (no sidebar overlap):
//   "public"    → landing site with sidebar (Home / Features / Pricing …)
//   "register"  → full-screen RegisterOwner form (after payment success)
//   "dashboard" → full-screen GymDashboard (after registration success)
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [mode, setMode] = useState<AppMode>("public");
  const [paymentPayload, setPaymentPayload] = useState<PaymentVerifiedPayload | null>(null);
  const [dashUser,       setDashUser]       = useState<DashboardUser | null>(null);

  // ── Called by Pricing when payment verify-signature succeeds ──────────────
  const handlePaymentVerified = (payload: PaymentVerifiedPayload) => {
    setPaymentPayload(payload);
    setMode("register"); // ← switch to FULL-SCREEN register, no sidebar
  };

  // ── Called by RegisterOwner when registration API succeeds ────────────────
  const handleRegistrationSuccess = (gymName: string, ownerName: string) => {
    setDashUser({
      ownerName:  ownerName  || "Gym Owner",
      gymName:    gymName    || "My Gym",
      ownerEmail: paymentPayload?.email || "",
    });
    setPaymentPayload(null);
    setMode("dashboard"); // ← switch to FULL-SCREEN dashboard
  };

  // ── Called by GymDashboard logout button ──────────────────────────────────
  const handleLogout = () => {
    setDashUser(null);
    setMode("public");
  };

  return (
    <>
      {/* Global MUI Snackbar — shown in every mode */}
      <GlobalSnackbar />

      <Suspense fallback={<PageLoader />}>

        {/* ── MODE: register — full screen, NO sidebar ─────────────────── */}
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

        {/* ── MODE: dashboard — full screen, NO sidebar ────────────────── */}
        {mode === "dashboard" && dashUser && (
          <GymDashboard
            ownerName={dashUser.ownerName}
            gymName={dashUser.gymName}
            ownerEmail={dashUser.ownerEmail}
            onLogout={handleLogout}
          />
        )}

        {/* ── MODE: public — landing site with sidebar ─────────────────── */}
        {mode === "public" && (
          <SidebarLayout>
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
