import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, Dumbbell, UserCog, Settings,
  LogOut, Menu, X, Plus, Search, ChevronRight,
  CreditCard, UserPlus, ClipboardList, CheckCircle2, Sun, Moon,
  Activity, Upload, Lock, Clock, Copy, Fingerprint, RefreshCw, KeyRound
} from "lucide-react";
import ChangePasswordModal from "../components/ChangePasswordModal/ChangePasswordModal";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { logoutAction } from "../redux/actions/authActions";
import { getManagersApi, inviteManagerApi, resendInvitationApi, deleteManagerApi } from "../services/apis/managerApis";
import { getTrainersApi, inviteTrainerApi, resendTrainerInvitationApi, deleteTrainerApi } from "../services/apis/trainerApis";
import { updatePermissionApi } from "../services/apis/permissionApis";
import { showSnackbar } from "../redux/slices/snackbarSlice";
import { Loader } from "lucide-react";
import { getDevicesApi, addDeviceApi, deleteDeviceApi } from "../services/apis/biometricApis";
import { getTodayAttendanceApi } from "../services/apis/attendanceApis";
import { bulkImportMembersApi, addMemberApi, getMembersApi } from "../services/apis/memberApis";
import { getPlansApi, createPlanApi, deletePlanApi } from "../services/apis/planApis";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type DashTab = "overview" | "members" | "trainers" | "managers" | "plans" | "settings" | "attendance";

interface Member {
  id: number; name: string; plan: string; status: "Active" | "Inactive"; joined: string; avatar: string; biometricId?: string;
}
interface Trainer {
  id: number; name: string; specialty: string; members: number; status: "Active" | "On Leave"; rating: number;
}

// ── Seed data ──────────────────────────────────────────────────────────────
const MEMBERS: Member[] = [
  { id: 1, name: "Aarav Shah", plan: "Pro Athlete", status: "Active", joined: "Jan 12, 2025", avatar: "AS" },
  { id: 2, name: "Priya Mehta", plan: "Basic Strength", status: "Active", joined: "Feb 3, 2025", avatar: "PM" },
  { id: 3, name: "Rohan Desai", plan: "VIP Elite", status: "Active", joined: "Mar 8, 2025", avatar: "RD" },
  { id: 4, name: "Sneha Kapoor", plan: "Pro Athlete", status: "Inactive", joined: "Apr 1, 2025", avatar: "SK" },
  { id: 5, name: "Vikram Nair", plan: "Basic Strength", status: "Active", joined: "Apr 22, 2025", avatar: "VN" },
  { id: 6, name: "Ananya Joshi", plan: "VIP Elite", status: "Active", joined: "May 5, 2025", avatar: "AJ" },
];

const TRAINERS: Trainer[] = [
  { id: 1, name: "Raj Fitness", specialty: "Strength & Conditioning", members: 18, status: "Active", rating: 4.9 },
  { id: 2, name: "Meera Yoga", specialty: "Yoga & Flexibility", members: 12, status: "Active", rating: 4.7 },
  { id: 3, name: "Arjun Cardio", specialty: "HIIT & Cardio", members: 22, status: "On Leave", rating: 4.8 },
  { id: 4, name: "Divya Pilates", specialty: "Pilates & Core", members: 10, status: "Active", rating: 4.6 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard Component
// ─────────────────────────────────────────────────────────────────────────────
interface Props {
  onLogout: () => void;
  ownerName?: string;
  gymName?: string;
  ownerEmail?: string;
  role?: string;
  canAddMember?: boolean;
}

const GymDashboard: React.FC<Props> = ({
  onLogout,
  ownerName = "Gym Owner",
  gymName = "Trainix Gym",
  ownerEmail = "owner@gymmanagement.com",
  role = "admin",
  canAddMember = false,
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.auth);

  const [activeTab, setActiveTab] = useState<DashTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark-theme"));
  const [memberSearch, setMemberSearch] = useState("");
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [isMembersLoading, setIsMembersLoading] = useState(false);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [isTrainersLoading, setIsTrainersLoading] = useState(false);
  const [inviteTrainerLoading, setInviteTrainerLoading] = useState(false);

  // Manager State
  const [managers, setManagers] = useState<any[]>([]);
  const [showAddManager, setShowAddManager] = useState(false);
  const [newManager, setNewManager] = useState({ fullName: "", email: "", mobileNo: "", canAddMember: false });
  const [isManagersLoading, setIsManagersLoading] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);

  // Plans State
  const [plans, setPlans] = useState<any[]>([]);
  const [isPlansLoading, setIsPlansLoading] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: "", level: "", basePrice: "", durationMonths: "1", features: "" });
  const [addingPlan, setAddingPlan] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (role === "admin" || role === "superadmin") {
      fetchManagers();
    }
    if (role === "admin" || role === "superadmin" || role === "gymmanager") {
      fetchTrainers();
      fetchMembers();
    }
    fetchPlans();
  }, [role]);

  const fetchMembers = async () => {
    try {
      setIsMembersLoading(true);
      const res = await getMembersApi();
      if (res.data?.members) {
        setMembers(res.data.members.map((m: any) => ({
          ...m,
          id: m._id,
          name: m.fullName,
          avatar: m.fullName.substring(0, 2).toUpperCase(),
          plan: m.planId?.name || "No Plan",
          status: m.isActive ? "Active" : "Inactive",
          joined: new Date(m.createdAt).toLocaleDateString(),
        })));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsMembersLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      setIsPlansLoading(true);
      const res = await getPlansApi();
      if (res.data?.plans) setPlans(res.data.plans);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPlansLoading(false);
    }
  };

  const fetchManagers = async () => {
    try {
      setIsManagersLoading(true);
      const res = await getManagersApi();
      setManagers(res.data.managers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsManagersLoading(false);
    }
  };

  const fetchTrainers = async () => {
    try {
      setIsTrainersLoading(true);
      const res = await getTrainersApi();
      setTrainers(res.data.trainers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTrainersLoading(false);
    }
  };

  // ── Theme toggle ────────────────────────────────────────────────────────
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  };

  // ── Logout ──────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await dispatch(logoutAction());
    onLogout();
  };

  // ── Stats ───────────────────────────────────────────────────────────────
  const stats = [
    { label: "Total Members", value: members.length, icon: Users, color: "#2563eb", bg: "rgba(37,99,235,0.1)" },
    { label: "Active Members", value: members.filter(m => m.status === "Active").length, icon: CheckCircle2, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    { label: "Trainers", value: trainers.length, icon: Dumbbell, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    { label: "Revenue (Mo.)", value: "₹1,24,500", icon: CreditCard, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  ];

  const navItems: { id: DashTab; label: string; icon: React.FC<{ size?: number }> }[] = [
    { id: "overview" as DashTab, label: "Overview", icon: LayoutDashboard as any },
    { id: "attendance" as DashTab, label: "Attendance", icon: Activity as any },
    { id: "members" as DashTab, label: "Members", icon: Users as any },
    { id: "trainers" as DashTab, label: "Trainers", icon: Dumbbell as any },
    { id: "managers" as DashTab, label: "Managers", icon: UserCog as any },
    { id: "plans" as DashTab, label: "Plans", icon: CreditCard as any },
    { id: "settings" as DashTab, label: "Settings", icon: Settings as any },
  ].filter(item => {
    if (role === "trainer" && (item.id === "plans" || item.id === "managers")) return false;
    if (role === "gymmanager" && item.id === "managers") return false;
    return true;
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sidebar
  // ─────────────────────────────────────────────────────────────────────────
  const Sidebar = (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay show"
          style={{ display: "block" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon-wrapper" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
            <img src="/logo.png" alt="Trainix Logo" style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 10 }} />
          </div>
          <div>
            <h1 className="brand-name">TRAINIX</h1>
            <p className="brand-subtitle">Management Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <ul className="sidebar-menu">
            {navItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <a
                  className={`sidebar-menu-item ${activeTab === id ? "active" : ""}`}
                  onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Theme */}
          <div className="theme-switch-container">
            <span className="theme-switch-label">
              {isDark ? <Moon size={16} /> : <Sun size={16} />}
              <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
            </span>
            <label className="switch">
              <input type="checkbox" checked={isDark} onChange={toggleTheme} />
              <span className="slider" />
            </label>
          </div>

          {/* Profile */}
          <div className="profile-card" style={{ justifyContent: "space-between" }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
              onClick={() => setShowChangePassword(true)}
              title="Click to change password"
            >
              <div className="profile-avatar">
                {ownerName.slice(0, 2).toUpperCase()}
              </div>
              <div className="profile-info">
                <span className="profile-name">{ownerName}</span>
                <span className="profile-email" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <KeyRound size={10} /> Change Password
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              title="Logout"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, borderRadius: 6, transition: "color 0.15s" }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // PANELS
  // ─────────────────────────────────────────────────────────────────────────

  // ── Overview panel ───────────────────────────────────────────────────────
  const OverviewPanel = (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Welcome back, {ownerName.split(" ")[0]} 👋</h2>
        <p className="page-subtitle">Here's what's happening at {gymName} today.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="gym-card stat-card">
            <div className="stat-icon-container" style={{ background: s.bg }}>
              <s.icon size={22} style={{ color: s.color }} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard grid */}
      <div className="dashboard-grid">
        {/* Recent Members */}
        <div className="gym-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Recent Members</h3>
            <button className="btn-blue-outline" style={{ fontSize: "0.78rem", padding: "5px 12px" }} onClick={() => setActiveTab("members")}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="checkin-list">
            {members.slice(0, 5).map((m) => (
              <div key={m.id} className="checkin-item">
                <div className="checkin-member">
                  <div className="checkin-avatar" style={{ background: "var(--primary-light)", color: "var(--primary)", fontSize: "0.78rem", fontWeight: 700 }}>
                    {m.avatar}
                  </div>
                  <div>
                    <div className="checkin-name">{m.name}</div>
                    <div className="checkin-time">{m.plan} · {m.joined}</div>
                  </div>
                </div>
                <span className={`checkin-status ${m.status === "Active" ? "status-active" : "status-inactive"}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions + Trainer Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="gym-card">
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Quick Actions</h3>
            <div className="actions-grid">
              {[
                { label: "Add Member", icon: UserPlus, action: () => { setActiveTab("members"); setShowAddMember(true); }, hide: !canAddMember },
                { label: "Add Trainer", icon: Dumbbell, action: () => { setActiveTab("trainers"); setShowAddTrainer(true); }, hide: role === "trainer" },
                { label: "View Plans", icon: ClipboardList, action: () => setActiveTab("plans") },
                { label: "Managers", icon: UserCog, action: () => setActiveTab("managers"), hide: role === "gymmanager" },
              ].filter(a => !a.hide).map(({ label, icon: Icon, action }) => (
                <button key={label} className="action-btn" onClick={action}>
                  <Icon size={20} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="gym-card">
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Trainers On Duty</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {trainers.filter(t => t.status === "Active").map(t => (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="checkin-avatar" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", fontSize: "0.75rem", fontWeight: 700, width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.specialty}</div>
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, background: "rgba(16,185,129,0.1)", color: "#10b981", padding: "3px 8px", borderRadius: 12, flexShrink: 0 }}>Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Members panel ────────────────────────────────────────────────────────
  const [newMember, setNewMember] = useState({ name: "", planId: "", durationMonths: "1", extraDays: "0", email: "", mobileNo: "", secondaryPhone: "", emergencyNumber: "", bloodGroup: "", amountPaid: "", startDate: "" });
  const [addingMember, setAddingMember] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [importing, setImporting] = useState(false);

  const MembersPanel = (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Members</h2>
          <p className="page-subtitle">{members.length} total members registered</p>
        </div>
        {(canAddMember || role === "admin" || role === "superadmin") && (
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-blue-outline" onClick={() => setShowImportModal(true)}>
              <Upload size={16} /> Import Members
            </button>
            <button className="btn-blue" onClick={() => setShowAddMember(true)}>
              <Plus size={16} /> Add Member
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="gym-card" style={{ padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <Search size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
        <input
          value={memberSearch}
          onChange={e => setMemberSearch(e.target.value)}
          placeholder="Search members by name or plan…"
          style={{ border: "none", outline: "none", background: "transparent", fontSize: "0.9rem", color: "var(--text-primary)", width: "100%" }}
        />
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add New Member</h3>
              <button onClick={() => setShowAddMember(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Full Name", field: "name", placeholder: "John Doe", type: "text" },
                { label: "Email", field: "email", placeholder: "john@example.com", type: "email" },
                { label: "Mobile", field: "mobileNo", placeholder: "1234567890", type: "tel" },
                { label: "Secondary Phone (Optional)", field: "secondaryPhone", placeholder: "0987654321", type: "tel" },
                { label: "Emergency Number (Optional)", field: "emergencyNumber", placeholder: "1122334455", type: "tel" },
                { label: "Blood Group (Optional)", field: "bloodGroup", placeholder: "O+", type: "text" },
              ].map(({ label, field, placeholder, type }) => (
                <div key={field}>
                  <label className="form-label">{label}</label>
                  <input
                    type={type}
                    value={(newMember as any)[field]}
                    onChange={e => setNewMember({ ...newMember, [field]: e.target.value })}
                    placeholder={placeholder}
                    className="form-input"
                  />
                </div>
              ))}
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    value={(newMember as any).startDate}
                    onChange={e => setNewMember({ ...newMember, startDate: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Duration (Months)</label>
                  <input
                    type="number"
                    min="1"
                    value={newMember.durationMonths}
                    onChange={e => setNewMember({ ...newMember, durationMonths: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Extra Days (Optional)</label>
                  <input
                    type="number"
                    min="0"
                    value={(newMember as any).extraDays}
                    onChange={e => setNewMember({ ...newMember, extraDays: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Calculated End Date</label>
                  <div style={{ padding: "10px 12px", background: "var(--bg-primary)", borderRadius: 6, border: "1px solid var(--border-color)", fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {(() => {
                      if (!(newMember as any).startDate || !newMember.durationMonths) return "-";
                      const end = new Date((newMember as any).startDate);
                      end.setMonth(end.getMonth() + Number(newMember.durationMonths));
                      if ((newMember as any).extraDays) end.setDate(end.getDate() + Number((newMember as any).extraDays));
                      return end.toLocaleDateString();
                    })()}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label className="form-label">Amount Paid</label>
                <input
                  type="number"
                  value={(newMember as any).amountPaid}
                  onChange={e => setNewMember({ ...newMember, amountPaid: e.target.value })}
                  placeholder="e.g. 5000"
                  className="form-input"
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={addingMember}
                  onClick={async () => {
                    if (!newMember.name.trim() || !newMember.email.trim() || !newMember.durationMonths || !(newMember as any).startDate) {
                      dispatch(showSnackbar({ message: "Please fill all required fields.", type: "error" }));
                      return;
                    }
                    setAddingMember(true);
                    try {
                      await addMemberApi({
                        fullName: newMember.name,
                        email: newMember.email,
                        mobileNo: newMember.mobileNo || "0000000000",
                        durationMonths: newMember.durationMonths,
                        extraDays: (newMember as any).extraDays,
                        secondaryPhone: (newMember as any).secondaryPhone,
                        emergencyNumber: (newMember as any).emergencyNumber,
                        bloodGroup: (newMember as any).bloodGroup,
                        amountPaid: (newMember as any).amountPaid,
                        startDate: (newMember as any).startDate,
                      });
                      dispatch(showSnackbar({ message: "Member added successfully!", type: "success" }));
                      setShowAddMember(false);
                      setNewMember({ name: "", planId: "", durationMonths: "1", extraDays: "0", email: "", mobileNo: "", secondaryPhone: "", emergencyNumber: "", bloodGroup: "", amountPaid: "", startDate: "" });
                      fetchMembers();
                    } catch (error: any) {
                      dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to add member", type: "error" }));
                    } finally {
                      setAddingMember(false);
                    }
                  }}>
                  {addingMember ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Add Member"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddMember(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Members Modal */}
      {showImportModal && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Import Members via CSV</h3>
              <button onClick={() => { setShowImportModal(false); setImportFile(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                Upload a CSV file containing members data. Make sure it follows the required format.
                <br /><a href="#" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>Download Sample CSV</a>
              </p>
              <div>
                <label className="form-label">Select CSV File</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={e => setImportFile(e.target.files?.[0] || null)}
                  className="form-input"
                  style={{ padding: "8px" }}
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={!importFile || importing}
                  onClick={async () => {
                    if (!importFile) return;
                    setImporting(true);
                    try {
                      const formData = new FormData();
                      formData.append("file", importFile);
                      await bulkImportMembersApi(formData);
                      dispatch(showSnackbar({ message: "Members imported successfully!", type: "success" }));
                      setShowImportModal(false);
                      setImportFile(null);
                      // In a real app, refetch members here
                    } catch (error: any) {
                      dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to import members", type: "error" }));
                    } finally {
                      setImporting(false);
                    }
                  }}>
                  {importing ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Upload"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => { setShowImportModal(false); setImportFile(null); }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Profile Modal */}
      {selectedMember && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Member Profile</h3>
              <button onClick={() => setSelectedMember(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div className="checkin-avatar" style={{ width: 64, height: 64, fontSize: "1.5rem", background: "var(--primary-light)", color: "var(--primary)" }}>
                {selectedMember.avatar}
              </div>
              <div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 4px 0", color: "var(--text-primary)" }}>{selectedMember.name}</h4>
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{selectedMember.plan} · Joined {selectedMember.joined}</div>
              </div>
            </div>

            <div style={{ background: "var(--bg-secondary)", padding: "16px", borderRadius: "12px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-primary)", fontWeight: 600 }}>
                  <Fingerprint size={18} style={{ color: "var(--primary)" }} /> Biometric ID
                </div>
                <span className={`checkin-status status-active`}>Registered</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {selectedMember.biometricId || Math.floor(100 + Math.random() * 900)}
                </span>
                <button
                  style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "0.875rem", fontWeight: 600 }}
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMember.biometricId || "105");
                    dispatch(showSnackbar({ message: "Copied to clipboard", type: "success" }));
                  }}
                >
                  <Copy size={14} /> Copy
                </button>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 8 }}>
                Enter this ID into the biometric device to register the member's fingerprint/face.
              </p>
            </div>

            <button className="btn-blue" style={{ width: "100%", justifyContent: "center" }} onClick={() => setSelectedMember(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="gym-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                {["Member", "Plan", "Status", "Joined", "Expires On", ""].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.filter(m => m.name.toLowerCase().includes(memberSearch.toLowerCase()) || m.plan.toLowerCase().includes(memberSearch.toLowerCase())).map((m, i) => (
                <tr key={m.id} style={{ borderBottom: "1px solid var(--border-color)", transition: "background 0.1s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-secondary)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div className="checkin-avatar" style={{ background: "var(--primary-light)", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 700 }}>{m.avatar}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{m.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>#{String(i + 1).padStart(4, "0")}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>{m.plan}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className={`checkin-status ${m.status === "Active" ? "status-active" : "status-inactive"}`}>{m.status}</span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{m.joined}</td>
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{m.planEndDate ? new Date(m.planEndDate).toLocaleDateString() : "-"}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setSelectedMember(m)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.8rem", padding: "4px 8px", borderRadius: 6, transition: "background 0.1s", fontWeight: 600 }}>
                        View
                      </button>
                      <button onClick={() => setMembers(prev => prev.map(x => x.id === m.id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x))}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.8rem", padding: "4px 8px", borderRadius: 6, transition: "background 0.1s" }}>
                        Toggle
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ── Trainers panel ───────────────────────────────────────────────────────
  const [newTrainer, setNewTrainer] = useState({ fullName: "", email: "", mobileNo: "", canAddMember: false });

  const TrainersPanel = (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Trainers</h2>
          <p className="page-subtitle">{trainers.length} trainers on your team</p>
        </div>
        {role !== "trainer" && (
          <button className="btn-blue" onClick={() => setShowAddTrainer(true)}>
            <Plus size={16} /> Add Trainer
          </button>
        )}
      </div>

      {showAddTrainer && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add New Trainer</h3>
              <button onClick={() => setShowAddTrainer(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="form-label">Full Name</label>
                <input type="text" value={newTrainer.fullName} onChange={e => setNewTrainer({ ...newTrainer, fullName: e.target.value })} placeholder="Trainer Name" className="form-input" />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input type="email" value={newTrainer.email} onChange={e => setNewTrainer({ ...newTrainer, email: e.target.value })} placeholder="trainer@example.com" className="form-input" />
              </div>
              <div>
                <label className="form-label">Mobile Number</label>
                <input type="tel" value={newTrainer.mobileNo} onChange={e => setNewTrainer({ ...newTrainer, mobileNo: e.target.value })} placeholder="1234567890" className="form-input" />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4, marginBottom: 8, padding: "8px 0" }}>
                  <div>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>Can Add Members</h4>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>Allow this trainer to register new members</p>
                  </div>
                  <div
                    onClick={() => setNewTrainer({ ...newTrainer, canAddMember: !newTrainer.canAddMember })}
                    style={{
                      width: 44, height: 24, borderRadius: 12, background: newTrainer.canAddMember ? "var(--primary)" : "var(--border)",
                      position: "relative", cursor: "pointer", transition: "all 0.3s ease"
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, background: "#fff", borderRadius: "50%",
                      position: "absolute", top: 2, left: newTrainer.canAddMember ? 22 : 2,
                      transition: "all 0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                    }} />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={inviteTrainerLoading}
                  onClick={async () => {
                    if (!newTrainer.fullName || !newTrainer.email || !newTrainer.mobileNo) return;
                    setInviteTrainerLoading(true);
                    try {
                      const res = await inviteTrainerApi(newTrainer);
                      dispatch(showSnackbar({ message: res.data.message || "Invitation sent!", type: "success" }));
                      setShowAddTrainer(false);
                      setNewTrainer({ fullName: "", email: "", mobileNo: "", canAddMember: false });
                      fetchTrainers();
                    } catch (error: any) {
                      dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to invite trainer", type: "error" }));
                    } finally {
                      setInviteTrainerLoading(false);
                    }
                  }}>
                  {inviteTrainerLoading ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Send Invite"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddTrainer(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTrainersLoading ? (
        <div style={{ textAlign: "center", padding: "40px" }}><Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
      ) : trainers.length === 0 ? (
        <div className="gym-card" style={{ textAlign: "center", padding: "60px 32px" }}>
          <Dumbbell size={48} style={{ color: "var(--text-muted)", margin: "0 auto 16px" }} />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>No Trainers Yet</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: 24 }}>Add trainers to your team to start managing your members.</p>
          {role !== "trainer" && (
            <button className="btn-blue" style={{ justifyContent: "center" }} onClick={() => setShowAddTrainer(true)}>
              <Plus size={16} /> Add Trainer
            </button>
          )}
        </div>
      ) : (
        <div className="gym-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Name</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Email</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Status</th>
                  {(role === "admin" || role === "superadmin" || role === "gymmanager") && (
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Can Add Members</th>
                  )}
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainers.map(t => (
                  <tr key={t._id} style={{ borderBottom: "1px solid var(--border-color)", transition: "background 0.1s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-secondary)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(245,158,11,0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>
                          {t.fullName?.slice(0, 2).toUpperCase() || "??"}
                        </div>
                        {t.fullName}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>{t.email}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span className={`checkin-status ${t.isActive ? "status-active" : "status-inactive"}`}>
                        {t.isActive ? "Active" : "Pending Setup"}
                      </span>
                    </td>
                    {(role === "admin" || role === "superadmin" || role === "gymmanager") && (
                      <td style={{ padding: "14px 16px" }}>
                        {t.isActive && (
                          <label className="switch" style={{ transform: "scale(0.8)", margin: 0 }}>
                            <input
                              type="checkbox"
                              checked={!!t.canAddMember}
                              onChange={async (e) => {
                                const val = e.target.checked;
                                setTrainers(prev => prev.map(tr => tr._id === t._id ? { ...tr, canAddMember: val } : tr));
                                try {
                                  await updatePermissionApi(t._id, { canAddMember: val });
                                  dispatch(showSnackbar({ message: "Permissions updated", type: "success" }));
                                } catch (err: any) {
                                  setTrainers(prev => prev.map(tr => tr._id === t._id ? { ...tr, canAddMember: !val } : tr));
                                  dispatch(showSnackbar({ message: err?.response?.data?.message || "Failed to update permissions", type: "error" }));
                                }
                              }}
                            />
                            <span className="slider" />
                          </label>
                        )}
                      </td>
                    )}
                    <td style={{ padding: "14px 16px" }}>
                      {!t.isActive && (
                        <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px" }}
                          onClick={async () => {
                            try {
                              const res = await resendTrainerInvitationApi({ email: t.email });
                              dispatch(showSnackbar({ message: res.data.message || "Invitation resent!", type: "success" }));
                            } catch (err: any) {
                              dispatch(showSnackbar({ message: err?.response?.data?.message || "Failed to resend invite", type: "error" }));
                            }
                          }}>
                          Resend Invite
                        </button>
                      )}
                      {(role === "admin" || role === "superadmin" || role === "gymmanager") && (
                        <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px", borderColor: "#ef4444", color: "#ef4444" }}
                          onClick={async () => {
                            if (!window.confirm(`Are you sure you want to delete ${t.fullName}?`)) return;
                            try {
                              await deleteTrainerApi(t._id);
                              dispatch(showSnackbar({ message: "Trainer deleted", type: "success" }));
                              fetchTrainers();
                            } catch (err: any) {
                              dispatch(showSnackbar({ message: err?.response?.data?.message || "Failed to delete trainer", type: "error" }));
                            }
                          }}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  // ── Managers panel ───────────────────────────────────────────────────────
  const ManagersPanel = (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Managers</h2>
          <p className="page-subtitle">Manage your gym branch managers and their access.</p>
        </div>
        <button className="btn-blue" onClick={() => setShowAddManager(true)}>
          <Plus size={16} /> Invite Manager
        </button>
      </div>

      {showAddManager && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Invite New Manager</h3>
              <button onClick={() => setShowAddManager(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="form-label">Full Name</label>
                <input type="text" value={newManager.fullName} onChange={e => setNewManager({ ...newManager, fullName: e.target.value })} placeholder="John Doe" className="form-input" />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input type="email" value={newManager.email} onChange={e => setNewManager({ ...newManager, email: e.target.value })} placeholder="john@example.com" className="form-input" />
              </div>
              <div>
                <label className="form-label">Mobile Number</label>
                <input type="tel" value={newManager.mobileNo} onChange={e => setNewManager({ ...newManager, mobileNo: e.target.value })} placeholder="1234567890" className="form-input" />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4, marginBottom: 8, padding: "8px 0" }}>
                  <div>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>Can Add Members</h4>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>Allow this manager to register new members</p>
                  </div>
                  <div
                    onClick={() => setNewManager({ ...newManager, canAddMember: !newManager.canAddMember })}
                    style={{
                      width: 44, height: 24, borderRadius: 12, background: newManager.canAddMember ? "var(--primary)" : "var(--border)",
                      position: "relative", cursor: "pointer", transition: "all 0.3s ease"
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, background: "#fff", borderRadius: "50%",
                      position: "absolute", top: 2, left: newManager.canAddMember ? 22 : 2,
                      transition: "all 0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                    }} />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={inviteLoading}
                  onClick={async () => {
                    if (!newManager.fullName || !newManager.email || !newManager.mobileNo) return;
                    setInviteLoading(true);
                    try {
                      const res = await inviteManagerApi(newManager);
                      dispatch(showSnackbar({ message: res.data.message || "Invitation sent!", type: "success" }));
                      setShowAddManager(false);
                      setNewManager({ fullName: "", email: "", mobileNo: "", canAddMember: false });
                      fetchManagers();
                    } catch (error: any) {
                      dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to invite manager", type: "error" }));
                    } finally {
                      setInviteLoading(false);
                    }
                  }}>
                  {inviteLoading ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Send Invite"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddManager(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isManagersLoading ? (
        <div style={{ textAlign: "center", padding: "40px" }}><Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
      ) : managers.length === 0 ? (
        <div className="gym-card" style={{ textAlign: "center", padding: "60px 32px" }}>
          <UserCog size={48} style={{ color: "var(--text-muted)", margin: "0 auto 16px" }} />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>No Managers Yet</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: 24 }}>Assign trusted staff as branch managers to help run operations.</p>
          <button className="btn-blue" style={{ justifyContent: "center" }} onClick={() => setShowAddManager(true)}>
            <Plus size={16} /> Invite Manager
          </button>
        </div>
      ) : (
        <div className="gym-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Name</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Email</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Status</th>
                  {(role === "admin" || role === "superadmin") && (
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Can Add Members</th>
                  )}
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {managers.map(m => (
                  <tr key={m._id} style={{ borderBottom: "1px solid var(--border-color)", transition: "background 0.1s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-secondary)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{m.fullName}</td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>{m.email}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span className={`checkin-status ${m.isActive ? "status-active" : "status-inactive"}`}>
                        {m.isActive ? "Active" : "Pending Setup"}
                      </span>
                    </td>
                    {(role === "admin" || role === "superadmin") && (
                      <td style={{ padding: "14px 16px" }}>
                        {m.isActive && (
                          <label className="switch" style={{ transform: "scale(0.8)", margin: 0 }}>
                            <input
                              type="checkbox"
                              checked={!!m.canAddMember}
                              onChange={async (e) => {
                                const val = e.target.checked;
                                setManagers(prev => prev.map(mgr => mgr._id === m._id ? { ...mgr, canAddMember: val } : mgr));
                                try {
                                  await updatePermissionApi(m._id, { canAddMember: val });
                                  dispatch(showSnackbar({ message: "Permissions updated", type: "success" }));
                                } catch (err: any) {
                                  setManagers(prev => prev.map(mgr => mgr._id === m._id ? { ...mgr, canAddMember: !val } : mgr));
                                  dispatch(showSnackbar({ message: err?.response?.data?.message || "Failed to update permissions", type: "error" }));
                                }
                              }}
                            />
                            <span className="slider" />
                          </label>
                        )}
                      </td>
                    )}
                    <td style={{ padding: "14px 16px" }}>
                      {!m.isActive && (
                        <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px" }}
                          onClick={async () => {
                            try {
                              const res = await resendInvitationApi({ email: m.email });
                              dispatch(showSnackbar({ message: res.data.message || "Invitation resent!", type: "success" }));
                            } catch (err: any) {
                              dispatch(showSnackbar({ message: err?.response?.data?.message || "Failed to resend invite", type: "error" }));
                            }
                          }}>
                          Resend Invite
                        </button>
                      )}
                      {(role === "admin" || role === "superadmin") && (
                        <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px", borderColor: "#ef4444", color: "#ef4444", marginLeft: "8px" }}
                          onClick={async () => {
                            if (!window.confirm(`Are you sure you want to delete ${m.fullName}?`)) return;
                            try {
                              await deleteManagerApi(m._id);
                              dispatch(showSnackbar({ message: "Manager deleted", type: "success" }));
                              fetchManagers();
                            } catch (err: any) {
                              dispatch(showSnackbar({ message: err?.response?.data?.message || "Failed to delete manager", type: "error" }));
                            }
                          }}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  // ── Plans panel ──────────────────────────────────────────────────────────
  const PlansPanel = (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Membership Plans</h2>
          <p className="page-subtitle">Plans currently active at {gymName}.</p>
        </div>
        <button className="btn-blue" onClick={() => setShowAddPlan(true)}>
          <Plus size={16} /> Add Plan
        </button>
      </div>

      {showAddPlan && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add New Plan</h3>
              <button onClick={() => setShowAddPlan(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="form-label">Plan Name</label>
                <input type="text" value={newPlan.name} onChange={e => setNewPlan({ ...newPlan, name: e.target.value })} placeholder="e.g. Gold Plan" className="form-input" />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Level</label>
                  <input type="text" value={newPlan.level} onChange={e => setNewPlan({ ...newPlan, level: e.target.value })} placeholder="e.g. Advanced" className="form-input" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Base Price</label>
                  <input type="number" value={newPlan.basePrice} onChange={e => setNewPlan({ ...newPlan, basePrice: e.target.value })} placeholder="e.g. 1999" className="form-input" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Duration</label>
                  <select value={newPlan.durationMonths} onChange={e => setNewPlan({ ...newPlan, durationMonths: e.target.value })} className="form-input">
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Features (comma separated)</label>
                <textarea
                  value={newPlan.features}
                  onChange={e => setNewPlan({ ...newPlan, features: e.target.value })}
                  placeholder="BMI Report, Personal Trainer..."
                  className="form-input"
                  rows={3}
                  style={{ resize: "vertical", fontFamily: "inherit" }}
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={addingPlan}
                  onClick={async () => {
                    if (!newPlan.name || !newPlan.level || !newPlan.basePrice) return;
                    setAddingPlan(true);
                    try {
                      await createPlanApi({
                        name: newPlan.name,
                        level: newPlan.level,
                        basePrice: Number(newPlan.basePrice),
                        durationMonths: Number(newPlan.durationMonths) || 1,
                        features: newPlan.features.split(',').map(f => f.trim()).filter(f => f)
                      });
                      dispatch(showSnackbar({ message: "Plan created!", type: "success" }));
                      setShowAddPlan(false);
                      setNewPlan({ name: "", level: "", basePrice: "", durationMonths: "1", features: "" });
                      fetchPlans();
                    } catch (error: any) {
                      dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to create plan", type: "error" }));
                    } finally {
                      setAddingPlan(false);
                    }
                  }}>
                  {addingPlan ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Create Plan"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddPlan(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPlansLoading ? (
        <div style={{ textAlign: "center", padding: "40px" }}><Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
      ) : plans.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>No plans created yet. Add one to get started!</p>
      ) : (
        <div className="pricing-grid">
          {plans.map(p => (
            <div key={p._id} className="gym-card pricing-card" style={{ borderTop: `3px solid var(--primary)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 className="plan-name">{p.name}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Level: {p.level}</p>
                </div>
                <button style={{ background: "none", border: "none", color: "var(--danger)", cursor: "pointer" }} onClick={async () => {
                  if (window.confirm("Delete this plan?")) {
                    await deletePlanApi(p._id);
                    fetchPlans();
                  }
                }}>
                  <X size={16} />
                </button>
              </div>
              <div className="plan-price-wrapper">
                <span className="plan-price" style={{ color: "var(--primary)" }}>₹{p.basePrice}</span>
                <span className="plan-period">/ {p.durationMonths} month(s)</span>
              </div>
              <ul style={{ paddingLeft: 20, fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 10 }}>
                {p.features.map((f: string, i: number) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ── Attendance panel ───────────────────────────────────────────────────────
  const [attendanceEvents, setAttendanceEvents] = useState<any[]>([]);
  const [isAttendanceLoading, setIsAttendanceLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "attendance") {
      const fetchAttendance = async () => {
        try {
          const res = await getTodayAttendanceApi();
          // Mock data if API fails or returns empty for now
          if (res.data?.attendance?.length > 0) {
            setAttendanceEvents(res.data.attendance);
          } else {
            setAttendanceEvents([
              { id: 1, memberName: "John Doe", time: new Date().toLocaleTimeString(), status: "SUCCESS", avatar: "JD" },
              { id: 2, memberName: "Jane Smith", time: new Date(Date.now() - 500000).toLocaleTimeString(), status: "MEMBERSHIP_EXPIRED", avatar: "JS" },
              { id: 3, memberName: "Unknown User", time: new Date(Date.now() - 1000000).toLocaleTimeString(), status: "DENIED_OTHER", avatar: "??" }
            ]);
          }
        } catch (error) {
          console.error("Failed to fetch attendance", error);
          // Fallback to mock data
          setAttendanceEvents([
            { id: 1, memberName: "John Doe", time: new Date().toLocaleTimeString(), status: "SUCCESS", avatar: "JD" },
            { id: 2, memberName: "Jane Smith", time: new Date(Date.now() - 500000).toLocaleTimeString(), status: "MEMBERSHIP_EXPIRED", avatar: "JS" },
            { id: 3, memberName: "Unknown User", time: new Date(Date.now() - 1000000).toLocaleTimeString(), status: "DENIED_OTHER", avatar: "??" }
          ]);
        }
      };

      fetchAttendance();
      const interval = setInterval(fetchAttendance, 5000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const AttendancePanel = (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Live Attendance</h2>
          <p className="page-subtitle">Real-time biometric punch-ins for today.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--primary)", fontSize: "0.875rem", fontWeight: 600 }}>
          <RefreshCw size={16} style={{ animation: "spin 2s linear infinite" }} /> Live
        </div>
      </div>

      <div className="gym-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Member</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Time</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceEvents.map((event, i) => (
                <tr key={event.id || i} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div className="checkin-avatar" style={{ background: "var(--primary-light)", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 700 }}>
                        {event.avatar || event.memberName?.slice(0, 2).toUpperCase() || "??"}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{event.memberName}</div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Clock size={14} style={{ color: "var(--text-muted)" }} /> {event.time}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    {event.status === "SUCCESS" && <span className="checkin-status status-active">Access Granted</span>}
                    {event.status === "MEMBERSHIP_EXPIRED" && <span className="checkin-status" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>Expired - Renew</span>}
                    {event.status === "DENIED_OTHER" && <span className="checkin-status status-inactive">Access Denied</span>}
                  </td>
                </tr>
              ))}
              {attendanceEvents.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                    No punch-ins yet today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ── Settings panel ───────────────────────────────────────────────────────
  const [devices, setDevices] = useState<any[]>([]);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: "", serialNumber: "", provider: "mock" });
  const [addingDevice, setAddingDevice] = useState(false);
  const [gymPlan] = useState<"starter" | "plus" | "professional" | "enterprise">("plus"); // Mocked gym plan
  const [fetchingDevices, setFetchingDevices] = useState(false);

  const fetchDevices = async () => {
    setFetchingDevices(true);
    try {
      const res = await getDevicesApi();
      if (res.data?.devices) setDevices(res.data.devices);
    } catch (error) {
      console.error("Failed to fetch devices", error);
    } finally {
      setFetchingDevices(false);
    }
  };

  useEffect(() => {
    if (activeTab === "settings" && gymPlan !== "starter") {
      fetchDevices();
    }
  }, [activeTab, gymPlan]);

  const SettingsPanel = (
    <div className="page-container" style={{ maxWidth: 700 }}>
      <div style={{ marginBottom: 28 }}>
        <h2 className="page-title">Settings</h2>
        <p className="page-subtitle">Manage your gym profile and account.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div className="gym-card">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>Gym Profile</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Gym Name", val: gymName, placeholder: "Your Gym Name" },
              { label: "Owner Name", val: ownerName, placeholder: "Full Name" },
              { label: "Email", val: ownerEmail, placeholder: "Email Address" },
              { label: "Phone", val: "", placeholder: "+91 00000 00000" },
            ].map(f => (
              <div key={f.label}>
                <label className="form-label">{f.label}</label>
                <input defaultValue={f.val} placeholder={f.placeholder} className="form-input" />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <label className="form-label">Address</label>
            <textarea className="form-input" style={{ minHeight: 80, resize: "vertical" }} placeholder="Gym address…" />
          </div>
          <button className="btn-blue" style={{ marginTop: 20, justifyContent: "center" }}>Save Changes</button>
        </div>

        {/* Biometric Devices Section */}
        <div className="gym-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Biometric Devices</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Manage physical access control devices.</p>
            </div>
            {gymPlan !== "starter" && (
              <button className="btn-blue-outline" onClick={() => setShowAddDevice(true)}>
                <Plus size={16} /> Add Device
              </button>
            )}
          </div>

          {gymPlan === "starter" ? (
            <div style={{ background: "rgba(245,158,11,0.1)", padding: "20px", borderRadius: "8px", textAlign: "center", border: "1px solid rgba(245,158,11,0.2)" }}>
              <Lock size={32} style={{ color: "#f59e0b", margin: "0 auto 12px" }} />
              <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>Upgrade Required</h4>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Upgrade to Plus, Professional, or Enterprise to use Biometric Attendance.</p>
            </div>
          ) : fetchingDevices ? (
            <div style={{ textAlign: "center", padding: "20px" }}><Loader size={24} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
          ) : devices.length === 0 ? (
            <div style={{ background: "var(--bg-secondary)", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
              <Fingerprint size={32} style={{ color: "var(--text-muted)", margin: "0 auto 12px" }} />
              <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>No Devices Registered</h4>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Click 'Add Device' to register a new ZKTeco, eSSL, or other supported machine.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {devices.map((device, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "8px", borderRadius: "6px" }}><Fingerprint size={16} /></div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{device.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{device.provider} · SN: {device.serialNumber}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className={`checkin-status ${device.status === "Online" ? "status-active" : "status-inactive"}`}>{device.status || "Offline"}</span>
                    <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px", borderColor: "#ef4444", color: "#ef4444" }}
                      onClick={async () => {
                        if (!window.confirm(`Are you sure you want to remove ${device.name}?`)) return;
                        try {
                          await deleteDeviceApi(device.id);
                          dispatch(showSnackbar({ message: "Device removed successfully", type: "success" }));
                          fetchDevices();
                        } catch (err: any) {
                          dispatch(showSnackbar({ message: err?.response?.data?.message || "Failed to remove device", type: "error" }));
                        }
                      }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Device Modal */}
        {showAddDevice && (
          <div style={overlayStyle}>
            <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add Biometric Device</h3>
                <button onClick={() => setShowAddDevice(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label className="form-label">Device Name</label>
                  <input type="text" value={newDevice.name} onChange={e => setNewDevice({ ...newDevice, name: e.target.value })} placeholder="Front Door Fingerprint" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Serial Number</label>
                  <input type="text" value={newDevice.serialNumber} onChange={e => setNewDevice({ ...newDevice, serialNumber: e.target.value })} placeholder="Found on the physical machine" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Provider</label>
                  <select value={newDevice.provider} onChange={e => setNewDevice({ ...newDevice, provider: e.target.value })} className="form-input" style={{ cursor: "pointer" }}>
                    <option value="mock">Mock Provider</option>
                    <option value="zkteco">ZKTeco</option>
                    <option value="essl">eSSL</option>
                    <option value="hikvision">Hikvision</option>
                    <option value="suprema">Suprema</option>
                    <option value="matrix">Matrix</option>
                    <option value="custom">Custom Provider</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                    disabled={addingDevice || !newDevice.name || !newDevice.serialNumber}
                    onClick={async () => {
                      setAddingDevice(true);
                      try {
                        const res = await addDeviceApi(newDevice);
                        dispatch(showSnackbar({ message: "Device added successfully!", type: "success" }));
                        fetchDevices();
                        setShowAddDevice(false);
                        setNewDevice({ name: "", serialNumber: "", provider: "mock" });
                      } catch (error: any) {
                        dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to add device", type: "error" }));
                      } finally {
                        setAddingDevice(false);
                      }
                    }}>
                    {addingDevice ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Register Device"}
                  </button>
                  <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddDevice(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="gym-card">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--danger)", marginBottom: 8 }}>Danger Zone</h3>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: 16 }}>Logging out will remove your session from this device.</p>
          <button className="btn-blue-outline" style={{ justifyContent: "center", borderColor: "var(--danger)", color: "var(--danger)" }} onClick={handleLogout} disabled={loading}>
            <LogOut size={15} /> {loading ? "Logging out…" : "Logout from this device"}
          </button>
        </div>
      </div>
    </div>
  );

  const panels: Record<DashTab, React.ReactNode> = {
    overview: OverviewPanel,
    attendance: AttendancePanel,
    members: MembersPanel,
    trainers: TrainersPanel,
    managers: ManagersPanel,
    plans: PlansPanel,
    settings: SettingsPanel,
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="app-container">
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
      {Sidebar}

      <div className="main-content">
        {/* Mobile header */}
        <header className="mobile-header">
          <button className="menu-toggle-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8 }} />
            <span className="brand-name" style={{ fontSize: "1rem" }}>TRAINIX</span>
          </div>
          <div style={{ width: 40 }} />
        </header>

        {/* Active panel */}
        {panels[activeTab]}
      </div>
    </div>
  );
};

// ── Shared overlay style ──────────────────────────────────────────────────────
const overlayStyle: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
  zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
};

export default GymDashboard;
