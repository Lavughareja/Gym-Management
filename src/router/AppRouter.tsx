import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import ProtectedRoute, { getStoredUser, getDashboardRoot, isAuthenticated } from "./ProtectedRoute";
import type { UserRole } from "./ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { resolveWhiteLabelAction } from "../redux/slices/whiteLabelSlice";
import type { RootState } from "../redux/store";

// ── Lazy-loaded pages ─────────────────────────────────────────────────────────
const Home = lazy(() => import("../pages/Home").then((m) => ({ default: m.Home })));
const Login = lazy(() => import("../pages/Login"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const OwnerOnboarding = lazy(() => import("../pages/OwnerOnboarding"));
const ManagerSetup = lazy(() => import("../pages/ManagerSetup"));
const MemberSetup = lazy(() => import("../pages/MemberSetup"));
const GymDashboard = lazy(() => import("../pages/GymDashboard"));
const MemberDashboard = lazy(() => import("../pages/MemberDashboard"));
const SuperAdminRoutes = lazy(() => import("../SuperAdmin/routes/SuperAdminRoutes"));

// ── Feature pages ─────────────────────────────────────────────────────────────
const FeatureDetail = lazy(() => import("../pages/FeatureDetail"));
const MemberManagement = lazy(() => import("../pages/features/MemberManagement").then((m) => ({ default: m.MemberManagement })));
const TrainerManagement = lazy(() => import("../pages/features/TrainerManagement").then((m) => ({ default: m.TrainerManagement })));
const PTManagement = lazy(() => import("../pages/features/PTManagement").then((m) => ({ default: m.PTManagement })));
const Announcements = lazy(() => import("../pages/features/Announcements").then((m) => ({ default: m.Announcements })));
const RolePermissions = lazy(() => import("../pages/features/RolePermissions").then((m) => ({ default: m.RolePermissions })));
const MobileFriendly = lazy(() => import("../pages/features/MobileFriendly").then((m) => ({ default: m.MobileFriendly })));
const CRMLeads = lazy(() => import("../pages/features/CRMLeads").then((m) => ({ default: m.CRMLeads })));
const AttendanceTracking = lazy(() => import("../pages/features/AttendanceTracking").then((m) => ({ default: m.AttendanceTracking })));
const BiometricQR = lazy(() => import("../pages/features/BiometricQR").then((m) => ({ default: m.BiometricQR })));
const WorkoutLibrary = lazy(() => import("../pages/features/WorkoutLibrary").then((m) => ({ default: m.WorkoutLibrary })));
const WorkoutTiming = lazy(() => import("../pages/features/WorkoutTiming").then((m) => ({ default: m.WorkoutTiming })));
const DailyChallenges = lazy(() => import("../pages/features/DailyChallenges").then((m) => ({ default: m.DailyChallenges })));
const AIDietGeneration = lazy(() => import("../pages/features/AIDietGeneration").then((m) => ({ default: m.AIDietGeneration })));
const BMIMacroReports = lazy(() => import("../pages/features/BMIMacroReports").then((m) => ({ default: m.BMIMacroReports })));
const WorkoutPlans = lazy(() => import("../pages/features/WorkoutPlans").then((m) => ({ default: m.WorkoutPlans })));
const PaymentTracking = lazy(() => import("../pages/features/PaymentTracking").then((m) => ({ default: m.PaymentTracking })));
const InvoicesBilling = lazy(() => import("../pages/features/InvoicesBilling").then((m) => ({ default: m.InvoicesBilling })));
const ExpenseTracking = lazy(() => import("../pages/features/ExpenseTracking").then((m) => ({ default: m.ExpenseTracking })));
const AnalyticsReports = lazy(() => import("../pages/features/AnalyticsReports").then((m) => ({ default: m.AnalyticsReports })));
const PlatformScreenshots = lazy(() => import("../pages/PlatformScreenshots").then((m) => ({ default: m.PlatformScreenshots })));
const PlatformIntegrations = lazy(() => import("../pages/PlatformIntegrationsPage").then((m) => ({ default: m.PlatformIntegrations })));
const PlatformTestimonials = lazy(() => import("../pages/PlatformTestimonialsPage").then((m) => ({ default: m.PlatformTestimonials })));
const BlogList = lazy(() => import("../pages/BlogList").then((m) => ({ default: m.BlogList })));
const BlogDetail = lazy(() => import("../pages/BlogDetail").then((m) => ({ default: m.BlogDetail })));
const NotFound = lazy(() => import("../pages/NotFound"));

// ── Loading Spinner ───────────────────────────────────────────────────────────
const PageLoader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
    <Loader size={36} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} />
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ── SmartRedirect — redirect "/" based on auth state ─────────────────────────
const SmartRedirect = () => {
  if (isAuthenticated()) {
    const user = getStoredUser();
    const role = user?.role as UserRole;
    return <Navigate to={getDashboardRoot(role)} replace />;
  }
  return <Home />;
};

// ── GuestRoute — redirect logged-in users away from login/signup ──────────────
const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  if (isAuthenticated()) {
    const user = getStoredUser();
    const role = user?.role as UserRole;
    return <Navigate to={getDashboardRoot(role)} replace />;
  }
  return <>{children}</>;
};

// ── withBack — wraps pages that still expect an onBack prop ───────────────────
function WithBack<T extends { onBack: () => void }>(Component: React.ComponentType<T>) {
  return function WrappedWithBack(props: Omit<T, 'onBack'>) {
    const navigate = useNavigate();
    return <Component {...(props as T)} onBack={() => navigate(-1)} />;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// AppRouter
// ─────────────────────────────────────────────────────────────────────────────

const AppRouter = () => {
  const dispatch = useDispatch();
  const { branding } = useSelector((state: RootState) => state.whiteLabel);

  // Detect subdomain on app load
  useEffect(() => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    const reserved = ['www', 'app', 'localhost'];
    if (parts.length >= 3 && !reserved.includes(parts[0])) {
      dispatch(resolveWhiteLabelAction(parts[0]) as any);
    }
  }, []);

  // Apply primary/secondary colors as CSS variables whenever branding changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', branding.primaryColor);
    root.style.setProperty('--primary-hover', branding.secondaryColor);
  }, [branding.primaryColor, branding.secondaryColor]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* ── Public / Landing ──────────────────────────────────────────── */}
        <Route path="/" element={<SmartRedirect />} />
        <Route path="/screenshots" element={React.createElement(WithBack(PlatformScreenshots as any))} />
        <Route path="/integrations" element={React.createElement(WithBack(PlatformIntegrations as any))} />
        <Route path="/testimonials" element={React.createElement(WithBack(PlatformTestimonials as any))} />
        <Route path="/blogs" element={React.createElement(WithBack(BlogList as any))} />
        <Route path="/blogs/:slug" element={React.createElement(WithBack(BlogDetail as any))} />

        {/* Feature detail pages */}
        <Route path="/features/member-management" element={React.createElement(WithBack(MemberManagement as any))} />
        <Route path="/features/trainer-management" element={React.createElement(WithBack(TrainerManagement as any))} />
        <Route path="/features/pt-management" element={React.createElement(WithBack(PTManagement as any))} />
        <Route path="/features/announcements" element={React.createElement(WithBack(Announcements as any))} />
        <Route path="/features/role-permissions" element={React.createElement(WithBack(RolePermissions as any))} />
        <Route path="/features/mobile-friendly" element={React.createElement(WithBack(MobileFriendly as any))} />
        <Route path="/features/crm-leads" element={React.createElement(WithBack(CRMLeads as any))} />
        <Route path="/features/attendance-tracking" element={React.createElement(WithBack(AttendanceTracking as any))} />
        <Route path="/features/biometric-qr" element={React.createElement(WithBack(BiometricQR as any))} />
        <Route path="/features/workout-library" element={React.createElement(WithBack(WorkoutLibrary as any))} />
        <Route path="/features/workout-timing" element={React.createElement(WithBack(WorkoutTiming as any))} />
        <Route path="/features/daily-challenges" element={React.createElement(WithBack(DailyChallenges as any))} />
        <Route path="/features/ai-diet-generation" element={React.createElement(WithBack(AIDietGeneration as any))} />
        <Route path="/features/bmi-macro-reports" element={React.createElement(WithBack(BMIMacroReports as any))} />
        <Route path="/features/workout-plans" element={React.createElement(WithBack(WorkoutPlans as any))} />
        <Route path="/features/payment-tracking" element={React.createElement(WithBack(PaymentTracking as any))} />
        <Route path="/features/invoices-billing" element={React.createElement(WithBack(InvoicesBilling as any))} />
        <Route path="/features/expense-tracking" element={React.createElement(WithBack(ExpenseTracking as any))} />
        <Route path="/features/analytics-reports" element={React.createElement(WithBack(AnalyticsReports as any))} />
        <Route path="/features/:featureId" element={React.createElement(WithBack(FeatureDetail as any))} />

        {/* ── Auth / Setup Routes (guest-only) ──────────────────────────── */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/owner-onboarding" element={<OwnerOnboarding />} />
        <Route path="/manager-setup" element={<ManagerSetup role="Manager" />} />
        <Route path="/trainer-setup" element={<ManagerSetup role="Trainer" />} />
        <Route path="/member-setup" element={<MemberSetup />} />

        {/* ── Super Admin (isolated) ────────────────────────────────────── */}
        <Route path="/super-admin/*" element={<SuperAdminRoutes />} />

        {/* ── Staff Dashboard (owner / admin / gymmanager / trainer) ───── */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "owner", "gymmanager", "trainer"]}>
              <GymDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested routes handled inside GymDashboard via Outlet */}
        </Route>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["admin", "owner", "gymmanager", "trainer"]}>
              <GymDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Member Dashboard ──────────────────────────────────────────── */}
        <Route
          path="/member/*"
          element={
            <ProtectedRoute allowedRoles={["member"]}>
              <MemberDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Fallback / 404 ────────────────────────────────────────────── */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />

      </Routes>
    </Suspense>
  );
};

export default AppRouter;
