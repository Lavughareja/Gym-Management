import React, { useState, useEffect } from "react";
import { LogOut, Settings, Sun, Moon, Dumbbell, Users, ClipboardList, Activity, LayoutDashboard, UserCog, UserCheck, Menu, Bell } from "lucide-react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { logoutAction } from "../redux/actions/authActions";
import { removeFcmToken } from "../utils/firebase";

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
import { updateUser } from "../redux/slices/authSlice";
import CrmPanel from "../components/DashboardPanels/CrmPanel";
import TrialMembersPanel from "../components/DashboardPanels/TrialMembers/TrialMembersPanel.tsx";
import ExpenseTrackerPanel from "../components/DashboardPanels/ExpenseTrackerPanel";
import UserProfileModal from "../components/UserProfileModal/UserProfileModal";
import TrialBanner from "../components/TrialBanner/TrialBanner";

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Route Map â€” maps URL segments to panel IDs
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import "./GymDashboard.css";
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
  settings: "/dashboard/settings"
};

/** Derive the active panel id from the current pathname */
function getPanelFromPath(pathname: string): string {
  if (pathname === "/dashboard" || pathname === "/dashboard/") return "overview";
  const seg = pathname.replace("/dashboard/", "").replace("/dashboard", "");
  const found = Object.entries(PANEL_ROUTE_MAP).find(([, path]) => path === `/dashboard/${seg}` || path === pathname);
  return found ? found[0] : "not_found";
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// GymDashboard
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface GymDashboardProps {
  onLogout?: () => void;
}
const GymDashboard: React.FC<GymDashboardProps> = ({
  onLogout
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    user
  } = useAppSelector(state => state.auth);
  const {
    branding
  } = useSelector((state: RootState) => state.whiteLabel);
  const localUserStr = localStorage.getItem("dashUser");
  const localUser = localUserStr ? JSON.parse(localUserStr) : null;
  const userObj = {
    name: (user as any)?.firstName || localUser?.firstName || (user as any)?.lastName || localUser?.lastName ? `${(user as any)?.firstName || localUser?.firstName || ''} ${(user as any)?.lastName || localUser?.lastName || ''}`.trim() : (user as any)?.fullName || localUser?.ownerName || localUser?.fullName,
    fullName: (user as any)?.fullName || localUser?.fullName || localUser?.ownerName,
    firstName: (user as any)?.firstName || localUser?.firstName,
    lastName: (user as any)?.lastName || localUser?.lastName,
    email: (user as any)?.email || localUser?.email,
    profilePicture: (user as any)?.profilePicture || localUser?.profilePicture,
    role: (user as any)?.role || localUser?.role,
    canAddMember: (user as any)?.canAddMember || localUser?.canAddMember,
    _id: (user as any)?._id || localUser?._id,
    gymId: (user as any)?.gymId || localUser?.gymId
  };

  // Derive active panel from URL â€” always in sync
  const activeTab = getPanelFromPath(location.pathname);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Initial Fetch
  useEffect(() => {
    dispatch(fetchMembersAction());
    if (userObj?.role !== "trainer") {
      dispatch(fetchTrainersAction());
    }
    if (userObj?.role === "admin" || userObj?.role === "owner") {
      dispatch(fetchManagersAction());
    }
    dispatch(fetchPlansAction());
  }, [dispatch, userObj?.role]);

  // If at exactly /dashboard, redirect to /dashboard/overview
  useEffect(() => {
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
      navigate("/dashboard/overview", {
        replace: true
      });
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

  // Update browser tab title with gym name
  useEffect(() => {
    document.title = branding.gymName;
  }, [branding.gymName]);
  const handleLogout = async () => {
    await removeFcmToken().catch(() => {});
    await dispatch(logoutAction());
    localStorage.removeItem("dashUser");
    if (onLogout) {
      onLogout();
    } else {
      navigate("/login", {
        replace: true
      });
    }
  };

  /** Navigate to a panel by id */
  const goToPanel = (panelId: string) => {
    const path = PANEL_ROUTE_MAP[panelId] || "/dashboard/overview";
    navigate(path);
    setSidebarOpen(false);
  };
  const navItems = [{
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard
  }, {
    id: "crm",
    label: "CRM (Leads)",
    icon: Activity,
    hide: userObj?.role !== "admin" && userObj?.role !== "owner"
  }, {
    id: "trial_members",
    label: "Trial Members",
    icon: Users,
    hide: userObj?.role !== "admin" && userObj?.role !== "owner"
  }, {
    id: "members",
    label: "Members",
    icon: Users
  }, {
    id: "bmi",
    label: "BMI & Diet",
    icon: Activity
  }, {
    id: "trainers",
    label: "Trainers",
    icon: Dumbbell,
    hide: userObj?.role === "trainer"
  }, {
    id: "managers",
    label: "Managers",
    icon: UserCog,
    hide: userObj?.role === "gymmanager" || userObj?.role === "trainer"
  }, {
    id: "pt",
    label: "PT Management",
    icon: UserCheck
  }, {
    id: "events",
    label: "Announcements",
    icon: Bell
  }, {
    id: "plans",
    label: "Plans",
    icon: ClipboardList
  }, {
    id: "expenses",
    label: "Expense Tracker",
    icon: Activity,
    hide: userObj?.role !== "admin" && userObj?.role !== "owner"
  }, {
    id: "attendance",
    label: "Attendance",
    icon: Users
  }, {
    id: "settings",
    label: "Settings",
    icon: Settings,
    hide: userObj?.role === "trainer"
  }];
  return <div className="app-container">
      <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon-wrapper gym-dashboard-inline-1">
            {branding.logoUrl ? <img src={branding.logoUrl} alt={branding.gymName} className="gym-dashboard-inline-2" /> : <img src="/logo.png" alt="Trainix" className="gym-dashboard-inline-3" />}
          </div>
          <div>
            <h1 className="brand-name">{branding.gymName.toUpperCase()}</h1>
            <p className="brand-subtitle">Gym Dashboard</p>
          </div>
        </div>

        <nav className="gym-dashboard-inline-4">
          <ul className="sidebar-menu">
            {navItems.filter(item => !item.hide).map(item => <li key={item.id}>
                <a className={`sidebar-menu-item ${activeTab === item.id ? "active" : ""} gym-dashboard-inline-5`} onClick={() => goToPanel(item.id)}>
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </a>
              </li>)}
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

          <div className="profile-card gym-dashboard-inline-6" onClick={() => setShowProfileModal(true)}>
            <div className="gym-dashboard-inline-7">
              <div className="profile-avatar gym-dashboard-inline-8" style={{
              background: userObj.profilePicture ? "transparent" : "var(--primary)"
            }}>
                {userObj.profilePicture ? <img src={userObj.profilePicture} alt="Profile" className="gym-dashboard-inline-9" /> : userObj?.name?.slice(0, 2).toUpperCase() || "U"}
              </div>
              <div className="profile-info">
                <span className="profile-name">{userObj?.name || "User"}</span>
                <span className="profile-email gym-dashboard-inline-10">{userObj?.role || "Admin"}</span>
              </div>
            </div>
            <button onClick={e => {
            e.stopPropagation();
            handleLogout();
          }} title="Logout" className="gym-dashboard-inline-11">
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
          <div className="gym-dashboard-inline-12">
            {branding.logoUrl ? <img src={branding.logoUrl} alt={branding.gymName} className="gym-dashboard-inline-13" /> : <img src="/logo.png" alt="Logo" className="gym-dashboard-inline-14" />}
            <span className="brand-name gym-dashboard-inline-15">{branding.gymName.toUpperCase()}</span>
          </div>
          <div className="gym-dashboard-inline-16" />
        </header>

        {/* Trial countdown banner — only visible to unpaid admin/owner users */}
        <TrialBanner
          planEndDate={(user as any)?.planEndDate || localUser?.planEndDate || ''}
          paymentStatus={!!(user as any)?.paymentStatus || !!localUser?.paymentStatus}
          role={userObj.role || 'admin'}
        />

        {activeTab === "overview" && <OverviewPanel ownerName={userObj?.name || "Admin"} gymName={userObj?.gymId?.name || userObj?.name + "'s Gym" || "Your Gym"} role={userObj?.role || "admin"} canAddMember={!!userObj?.canAddMember} setActiveTab={(id: string) => goToPanel(id)} setShowAddMember={setShowAddMember} setShowAddTrainer={setShowAddTrainer} />}
        {activeTab === "crm" && <CrmPanel role={userObj?.role || "admin"} gymName={userObj?.gymId?.name || "Your Gym"} />}
        {activeTab === "trial_members" && <TrialMembersPanel />}
        {activeTab === "members" && <MembersPanel role={userObj?.role || "admin"} canAddMember={!!userObj?.canAddMember} showAddMember={showAddMember} setShowAddMember={setShowAddMember} />}
        {activeTab === "bmi" && <BmiPanel />}
        {activeTab === "trainers" && <TrainersPanel role={userObj?.role || "admin"} showAddTrainer={showAddTrainer} setShowAddTrainer={setShowAddTrainer} />}
        {activeTab === "managers" && <ManagersPanel role={userObj?.role || "admin"} />}
        {activeTab === "pt" && <PtManagementPanel role={userObj?.role || "admin"} userId={userObj?._id} />}
        {activeTab === "events" && (userObj?.role === "admin" || userObj?.role === "owner" ? <AnnouncementsPanel /> : <EventsViewPanel />)}
        {activeTab === "plans" && <PlansPanel gymName={userObj?.gymId?.name || "Your Gym"} />}
        {activeTab === "expenses" && <ExpenseTrackerPanel />}
        {activeTab === "attendance" && <AttendancePanel />}
        {activeTab === "settings" && (userObj?.role === "admin" || userObj?.role === "owner" ? <SettingsPanel gymName={userObj?.gymId?.name || "Your Gym"} /> : <div className="panel gym-dashboard-inline-17">
              <h2 className="gym-dashboard-inline-18">Coming Soon</h2>
              <p className="gym-dashboard-inline-19">Your profile settings will be available here shortly.</p>
            </div>)}
      </main>

      {showProfileModal && <UserProfileModal user={{
      id: userObj._id,
      fullName: userObj.fullName || "",
      firstName: userObj.firstName || "",
      lastName: userObj.lastName || "",
      email: userObj.email || "",
      role: userObj.role || "",
      profilePicture: userObj.profilePicture || ""
    }} onClose={() => setShowProfileModal(false)} onSuccess={updatedUser => {
      dispatch(updateUser(updatedUser));
      if (localUserStr) {
        const parsed = JSON.parse(localUserStr);
        const merged = {
          ...parsed,
          ...updatedUser
        };
        localStorage.setItem("dashUser", JSON.stringify(merged));
      }
    }} />}
    </div>;
};
export default GymDashboard;