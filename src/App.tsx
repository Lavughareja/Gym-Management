import { lazy, Suspense, useState, useEffect } from "react";
import { Loader } from "lucide-react";
import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar";
import "./App.css";
import type { PlanType } from "./utils/constant";

// ── Lazy load pages ─────────────────────────────────────────────────────────
const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const OwnerOnboarding = lazy(() => import("./pages/OwnerOnboarding"));
const GymDashboard = lazy(() => import("./pages/GymDashboard"));
const Login = lazy(() => import("./pages/Login").then((m) => ({ default: m.Login })));
const ManagerSetup = lazy(() => import("./pages/ManagerSetup").then((m) => ({ default: m.ManagerSetup })));
const MemberSetup = lazy(() => import("./pages/MemberSetup").then((m) => ({ default: m.MemberSetup })));
const MemberDashboard = lazy(() => import("./pages/MemberDashboard").then((m) => ({ default: m.MemberDashboard })));
const ResetPassword = lazy(() => import("./pages/ResetPassword").then((m) => ({ default: m.ResetPassword })));
const SuperAdminRoutes = lazy(() => import("./SuperAdmin/routes/SuperAdminRoutes"));
const FeatureDetail = lazy(() => import("./pages/FeatureDetail"));
const MemberManagement = lazy(() => import("./pages/features/MemberManagement").then(m => ({ default: m.MemberManagement })));
const TrainerManagement = lazy(() => import("./pages/features/TrainerManagement").then(m => ({ default: m.TrainerManagement })));
const PTManagement = lazy(() => import("./pages/features/PTManagement").then(m => ({ default: m.PTManagement })));
const Announcements = lazy(() => import("./pages/features/Announcements").then(m => ({ default: m.Announcements })));
const RolePermissions = lazy(() => import("./pages/features/RolePermissions").then(m => ({ default: m.RolePermissions })));
const MobileFriendly = lazy(() => import("./pages/features/MobileFriendly").then(m => ({ default: m.MobileFriendly })));
const CRMLeads = lazy(() => import("./pages/features/CRMLeads").then(m => ({ default: m.CRMLeads })));
const AttendanceTracking = lazy(() => import("./pages/features/AttendanceTracking").then(m => ({ default: m.AttendanceTracking })));
const BiometricQR = lazy(() => import("./pages/features/BiometricQR").then(m => ({ default: m.BiometricQR })));
const WorkoutLibrary = lazy(() => import("./pages/features/WorkoutLibrary").then(m => ({ default: m.WorkoutLibrary })));
const WorkoutTiming = lazy(() => import("./pages/features/WorkoutTiming").then(m => ({ default: m.WorkoutTiming })));
const DailyChallenges = lazy(() => import("./pages/features/DailyChallenges").then(m => ({ default: m.DailyChallenges })));
const AIDietGeneration = lazy(() => import("./pages/features/AIDietGeneration").then(m => ({ default: m.AIDietGeneration })));
const BMIMacroReports = lazy(() => import("./pages/features/BMIMacroReports").then(m => ({ default: m.BMIMacroReports })));
const WorkoutPlans = lazy(() => import("./pages/features/WorkoutPlans").then(m => ({ default: m.WorkoutPlans })));
const PaymentTracking = lazy(() => import("./pages/features/PaymentTracking").then(m => ({ default: m.PaymentTracking })));
const InvoicesBilling = lazy(() => import("./pages/features/InvoicesBilling").then(m => ({ default: m.InvoicesBilling })));
const ExpenseTracking = lazy(() => import("./pages/features/ExpenseTracking").then(m => ({ default: m.ExpenseTracking })));
const AnalyticsReports = lazy(() => import("./pages/features/AnalyticsReports").then(m => ({ default: m.AnalyticsReports })));
const PlatformScreenshots = lazy(() => import("./pages/PlatformScreenshots").then(m => ({ default: m.PlatformScreenshots })));
const PlatformIntegrations = lazy(() => import("./pages/PlatformIntegrationsPage").then(m => ({ default: m.PlatformIntegrations })));
const PlatformTestimonials = lazy(() => import("./pages/PlatformTestimonialsPage").then(m => ({ default: m.PlatformTestimonials })));
const BlogList = lazy(() => import("./pages/BlogList").then(m => ({ default: m.BlogList })));
const BlogDetail = lazy(() => import("./pages/BlogDetail").then(m => ({ default: m.BlogDetail })));



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
export type AppMode = "public" | "register" | "dashboard" | "login" | "manager-setup" | "trainer-setup" | "member-setup" | "reset-password" | "super-admin" | "feature-detail" | "screenshots" | "integrations" | "testimonials" | "owner-onboarding" | "blogs" | "blog-detail";

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
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("feature")) {
      return "feature-detail";
    }
    if (searchParams.has("page") && searchParams.get("page") === "screenshots") {
      return "screenshots";
    }
    if (searchParams.has("page") && searchParams.get("page") === "integrations") {
      return "integrations";
    }
    if (searchParams.has("page") && searchParams.get("page") === "testimonials") {
      return "testimonials";
    }
    if (searchParams.has("page") && searchParams.get("page") === "blogs") {
      return "blogs";
    }
    if (searchParams.has("page") && searchParams.get("page") === "blog-detail") {
      return "blog-detail";
    }
    return "public";
  });
  const [featureId, setFeatureId] = useState<string | null>(() => {
    return new URLSearchParams(window.location.search).get("feature");
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
    } else if (path === "/owner-onboarding") {
      setMode("owner-onboarding");
    }

    const search = new URLSearchParams(window.location.search);
    if (search.has("feature")) {
      setFeatureId(search.get("feature"));
      setMode("feature-detail");
    } else if (search.has("page") && search.get("page") === "screenshots") {
      setMode("screenshots");
    } else if (search.has("page") && search.get("page") === "integrations") {
      setMode("integrations");
    } else if (search.has("page") && search.get("page") === "testimonials") {
      setMode("testimonials");
    } else if (search.has("page") && search.get("page") === "blogs") {
      setMode("blogs");
    } else if (search.has("page") && search.get("page") === "blog-detail") {
      setMode("blog-detail");
    }

    // Handle logo click → go home
    const handlePopState = () => {
      const s = new URLSearchParams(window.location.search);
      if (s.has("feature")) {
        setFeatureId(s.get("feature"));
        setMode("feature-detail");
      } else if (s.has("page") && s.get("page") === "screenshots") {
        setMode("screenshots");
        setFeatureId(null);
      } else if (s.has("page") && s.get("page") === "integrations") {
        setMode("integrations");
        setFeatureId(null);
      } else if (s.has("page") && s.get("page") === "testimonials") {
        setMode("testimonials");
        setFeatureId(null);
      } else if (s.has("page") && s.get("page") === "blogs") {
        setMode("blogs");
        setFeatureId(null);
      } else if (s.has("page") && s.get("page") === "blog-detail") {
        setMode("blog-detail");
        setFeatureId(null);
      } else if (window.location.pathname === "/owner-onboarding") {
        setMode("owner-onboarding");
        setFeatureId(null);
      } else if (window.location.pathname === "/") {
        setMode("public");
        setFeatureId(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handlePaymentVerified = (payload: PaymentVerifiedPayload) => {
    setPaymentPayload(payload);
    setMode("register");
  };

  const handleRegistrationSuccess = (gymName: string, ownerName: string) => {
    const newUser: DashboardUser = {
      ownerName: ownerName || "Gym Owner",
      email: paymentPayload?.email || "",
      role: "admin",
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
      ownerName: userPayload?.fullName || "User",
      email: userPayload?.email || "",
      role: userPayload?.role || "member",
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

        {mode === "owner-onboarding" && (
          <OwnerOnboarding
            onSuccess={handleRegistrationSuccess}
            onBack={() => {
              setMode("public");
              window.history.pushState({}, "", "/");
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
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        )}

        {mode === "feature-detail" && featureId && (
          <Suspense fallback={<PageLoader />}>
            {featureId === 'member-management' ? (
              <MemberManagement onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'trainer-management' ? (
              <TrainerManagement onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'pt-management' ? (
              <PTManagement onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'announcements' ? (
              <Announcements onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'role-permissions' ? (
              <RolePermissions onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'mobile-friendly' ? (
              <MobileFriendly onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'crm-leads' ? (
              <CRMLeads onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'attendance-tracking' ? (
              <AttendanceTracking onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'biometric-qr' ? (
              <BiometricQR onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'workout-library' ? (
              <WorkoutLibrary onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'workout-timing' ? (
              <WorkoutTiming onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'daily-challenges' ? (
              <DailyChallenges onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'ai-diet-generation' ? (
              <AIDietGeneration onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'bmi-macro-reports' ? (
              <BMIMacroReports onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'workout-plans' ? (
              <WorkoutPlans onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'payment-tracking' ? (
              <PaymentTracking onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'invoices-billing' ? (
              <InvoicesBilling onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'expense-tracking' ? (
              <ExpenseTracking onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : featureId === 'analytics-reports' ? (
              <AnalyticsReports onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            ) : (
              <FeatureDetail featureId={featureId} onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
            )}
          </Suspense>
        )}

        {mode === "screenshots" && (
          <Suspense fallback={<PageLoader />}>
            <PlatformScreenshots onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
          </Suspense>
        )}

        {mode === "integrations" && (
          <Suspense fallback={<PageLoader />}>
            <PlatformIntegrations onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
          </Suspense>
        )}

        {mode === "testimonials" && (
          <Suspense fallback={<PageLoader />}>
            <PlatformTestimonials onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
          </Suspense>
        )}

        {mode === "blogs" && (
          <BlogList onBack={() => { setMode("public"); window.history.pushState({}, "", "/"); }} />
        )}

        {mode === "blog-detail" && (
          <BlogDetail onBack={() => { setMode("blogs"); window.history.pushState({}, "", "/?page=blogs"); }} />
        )}

      </Suspense>
    </>
  );
}

export default App;

