import React, { useState, useEffect } from "react";
import { LogOut, Settings, Sun, Moon, Dumbbell, Users, ClipboardList, Activity, LayoutDashboard, UserCog, UserCheck, Menu, Bell } from "lucide-react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { logoutAction } from "../redux/actions/authActions";

// Dashboard Panels
import OverviewPanel from "../components/DashboardPanels/OverviewPanel";
import MembersPanel from "../components/DashboardPanels/MembersPanel";
import BmiPanel from "../components/DashboardPanels/BmiPanel";
import TrainersPanel from "../components/DashboardPanels/TrainersPanel";
import ManagersPanel from "../components/DashboardPanels/ManagersPanel";
import PlansPanel from "../components/DashboardPanels/PlansPanel";
import AttendancePanel from "../components/DashboardPanels/AttendancePanel";
import SettingsPanel from "../components/DashboardPanels/SettingsPanel";
import PtManagementPanel from "../components/DashboardPanels/PtManagementPanel";
import AnnouncementsPanel from "../components/DashboardPanels/AnnouncementsPanel";
import EventsViewPanel from "../components/DashboardPanels/EventsViewPanel";

// Actions
import { fetchMembersAction } from "../redux/actions/memberActions";
import { fetchTrainersAction } from "../redux/actions/trainerActions";
import { fetchManagersAction } from "../redux/actions/managerActions";
import { fetchPlansAction } from "../redux/actions/planActions";
import CrmPanel from "../components/DashboardPanels/CrmPanel";
import TrialMembersPanel from "../components/DashboardPanels/TrialMembers/TrialMembersPanel.tsx";
import ExpenseTrackerPanel from "../components/DashboardPanels/ExpenseTrackerPanel";

// ─────────────────────────────────────────────────────────────────────────────
// Route Map — maps URL segments to panel IDs
// ─────────────────────────────────────────────────────────────────────────────

const PANEL_ROUTE_MAP: Record<string, string> = {
  overview: "/dashboard/overview",
  crm: "/dashboard/crm",
  trial_members: "/dashboard/trial-members",
  members: "/dashboard/members",
  bmi: "/dashboard/bmi",
  trainers: "/dashboard/trainers",
  managers: "/dashboard/managers",
  pt: "/dashboard/pt",
  events: "/dashboard/announcements",
  plans: "/dashboard/plans",
  expenses: "/dashboard/expenses",
  attendance: "/dashboard/attendance",
  settings: "/dashboard/settings",
};

/** Derive the active panel id from the current pathname */
function getPanelFromPath(pathname: string): string {
  if (pathname === "/dashboard" || pathname === "/dashboard/") return "overview";
  const seg = pathname.replace("/dashboard/", "").replace("/dashboard", "");
  const found = Object.entries(PANEL_ROUTE_MAP).find(([, path]) =>
    path === `/dashboard/${seg}` || path === pathname
  );
  return found ? found[0] : "not_found";
}

// ─────────────────────────────────────────────────────────────────────────────
// GymDashboard
// ─────────────────────────────────────────────────────────────────────────────

interface GymDashboardProps {
  onLogout?: () => void;
}

const GymDashboard: React.FC<GymDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const localUserStr = localStorage.getItem("dashUser");
  const localUser = localUserStr ? JSON.parse(localUserStr) : null;
  const userObj = {
    name: (user as any)?.fullName || localUser?.ownerName,
    role: (user as any)?.role || localUser?.role,
    canAddMember: (user as any)?.canAddMember || localUser?.canAddMember,
    _id: (user as any)?._id || localUser?._id,
    gymId: (user as any)?.gymId || localUser?.gymId,
  };

  // Derive active panel from URL — always in sync
  const activeTab = getPanelFromPath(location.pathname);

  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddTrainer, setShowAddTrainer] = useState(false);

  // Initial Fetch
  useEffect(() => {
    dispatch(fetchMembersAction());
    dispatch(fetchTrainersAction());
    dispatch(fetchManagersAction());
    dispatch(fetchPlansAction());
  }, [dispatch]);

  // If at exactly /dashboard, redirect to /dashboard/overview
  useEffect(() => {
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
      navigate("/dashboard/overview", { replace: true });
    }
  }, [location.pathname, navigate]);

  if (activeTab === "not_found") {
    return <Navigate to="/404" replace />;
  }

  // Theme logic
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    await dispatch(logoutAction());
    localStorage.removeItem("dashUser");
    if (onLogout) {
      onLogout();
    } else {
      navigate("/login", { replace: true });
    }
  };

  /** Navigate to a panel by id */
  const goToPanel = (panelId: string) => {
    const path = PANEL_ROUTE_MAP[panelId] || "/dashboard/overview";
    navigate(path);
    setSidebarOpen(false);
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "crm", label: "CRM (Leads)", icon: Activity, hide: userObj?.role !== "admin" && userObj?.role !== "owner" },
    { id: "trial_members", label: "Trial Members", icon: Users, hide: userObj?.role !== "admin" && userObj?.role !== "owner" },
    { id: "members", label: "Members", icon: Users },
    { id: "bmi", label: "BMI & Diet", icon: Activity },
    { id: "trainers", label: "Trainers", icon: Dumbbell, hide: userObj?.role === "trainer" },
    { id: "managers", label: "Managers", icon: UserCog, hide: userObj?.role === "gymmanager" || userObj?.role === "trainer" },
    { id: "pt", label: "PT Management", icon: UserCheck },
    { id: "events", label: "Announcements", icon: Bell },
    { id: "plans", label: "Plans", icon: ClipboardList },
    { id: "expenses", label: "Expense Tracker", icon: Activity, hide: userObj?.role !== "admin" && userObj?.role !== "owner" },
    { id: "attendance", label: "Attendance", icon: Users },
    { id: "settings", label: "Settings", icon: Settings, hide: userObj?.role === "trainer" },
  ];

  return (
    <div className="app-container">
      <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon-wrapper" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
            <img src="/logo.png" alt="Trainix" style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 10 }} />
          </div>
          <div>
            <h1 className="brand-name">TRAINIX</h1>
            <p className="brand-subtitle">Gym Dashboard</p>
          </div>
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <ul className="sidebar-menu">
            {navItems.filter(item => !item.hide).map((item) => (
              <li key={item.id}>
                <a
                  className={`sidebar-menu-item ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => goToPanel(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="theme-switch-container">
            <span className="theme-switch-label">
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
              <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </span>
            <label className="switch">
              <input type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
              <span className="slider" />
            </label>
          </div>

          <div className="profile-card" style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="profile-avatar">
                {userObj?.name?.slice(0, 2).toUpperCase() || "U"}
              </div>
              <div className="profile-info">
                <span className="profile-name">{userObj?.name || "User"}</span>
                <span className="profile-email" style={{ textTransform: "capitalize" }}>{userObj?.role || "Admin"}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, borderRadius: 6, transition: "color 0.15s" }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Mobile header */}
        <header className="mobile-header">
          <button className="menu-toggle-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8 }} />
            <span className="brand-name" style={{ fontSize: "1rem" }}>TRAINIX</span>
          </div>
          <div style={{ width: 40 }} />
        </header>

        {activeTab === "overview" && (
          <OverviewPanel
            ownerName={userObj?.name || "Admin"}
            gymName={userObj?.gymId?.name || userObj?.name + "'s Gym" || "Your Gym"}
            role={userObj?.role || "admin"}
            canAddMember={!!userObj?.canAddMember}
            setActiveTab={(id: string) => goToPanel(id)}
            setShowAddMember={setShowAddMember}
            setShowAddTrainer={setShowAddTrainer}
          />
        )}
        {activeTab === "crm" && (
          <CrmPanel
            role={userObj?.role || "admin"}
            gymName={userObj?.gymId?.name || "Your Gym"}
          />
        )}
        {activeTab === "trial_members" && (
          <TrialMembersPanel />
        )}
        {activeTab === "members" && (
          <MembersPanel
            role={userObj?.role || "admin"}
            canAddMember={!!userObj?.canAddMember}
            showAddMember={showAddMember}
            setShowAddMember={setShowAddMember}
          />
        )}
        {activeTab === "bmi" && <BmiPanel />}
        {activeTab === "trainers" && (
          <TrainersPanel
            role={userObj?.role || "admin"}
            showAddTrainer={showAddTrainer}
            setShowAddTrainer={setShowAddTrainer}
          />
        )}
        {activeTab === "managers" && <ManagersPanel role={userObj?.role || "admin"} />}
        {activeTab === "pt" && <PtManagementPanel role={userObj?.role || "admin"} userId={userObj?._id} />}
        {activeTab === "events" && ((userObj?.role === "admin" || userObj?.role === "owner") ? <AnnouncementsPanel /> : <EventsViewPanel />)}
        {activeTab === "plans" && <PlansPanel gymName={userObj?.gymId?.name || "Your Gym"} />}
        {activeTab === "expenses" && <ExpenseTrackerPanel />}
        {activeTab === "attendance" && <AttendancePanel />}
        {activeTab === "settings" && (
          (userObj?.role === "admin" || userObj?.role === "owner") ? (
            <SettingsPanel gymName={userObj?.gymId?.name || "Your Gym"} />
          ) : (
            <div className="panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Coming Soon</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Your profile settings will be available here shortly.</p>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default GymDashboard;
