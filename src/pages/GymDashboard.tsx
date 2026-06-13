import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, Dumbbell, UserCog, Settings,
  LogOut, Menu, X, Plus, Search, ChevronRight,
  CreditCard, UserPlus, ClipboardList, CheckCircle2, Sun, Moon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { logoutAction } from "../redux/actions/authActions";
import { getManagersApi, inviteManagerApi, resendInvitationApi } from "../services/apis/managerApis";
import { getTrainersApi, inviteTrainerApi, resendTrainerInvitationApi } from "../services/apis/trainerApis";
import { showSnackbar } from "../redux/slices/snackbarSlice";
import { Loader } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type DashTab = "overview" | "members" | "trainers" | "managers" | "plans" | "settings";

interface Member {
  id: number; name: string; plan: string; status: "Active" | "Inactive"; joined: string; avatar: string;
}
interface Trainer {
  id: number; name: string; specialty: string; members: number; status: "Active" | "On Leave"; rating: number;
}

// ── Seed data ──────────────────────────────────────────────────────────────
const MEMBERS: Member[] = [
  { id: 1, name: "Aarav Shah",    plan: "Pro Athlete",    status: "Active",   joined: "Jan 12, 2025", avatar: "AS" },
  { id: 2, name: "Priya Mehta",   plan: "Basic Strength", status: "Active",   joined: "Feb 3, 2025",  avatar: "PM" },
  { id: 3, name: "Rohan Desai",   plan: "VIP Elite",      status: "Active",   joined: "Mar 8, 2025",  avatar: "RD" },
  { id: 4, name: "Sneha Kapoor",  plan: "Pro Athlete",    status: "Inactive", joined: "Apr 1, 2025",  avatar: "SK" },
  { id: 5, name: "Vikram Nair",   plan: "Basic Strength", status: "Active",   joined: "Apr 22, 2025", avatar: "VN" },
  { id: 6, name: "Ananya Joshi",  plan: "VIP Elite",      status: "Active",   joined: "May 5, 2025",  avatar: "AJ" },
];

const TRAINERS: Trainer[] = [
  { id: 1, name: "Raj Fitness",   specialty: "Strength & Conditioning", members: 18, status: "Active",   rating: 4.9 },
  { id: 2, name: "Meera Yoga",    specialty: "Yoga & Flexibility",      members: 12, status: "Active",   rating: 4.7 },
  { id: 3, name: "Arjun Cardio",  specialty: "HIIT & Cardio",           members: 22, status: "On Leave", rating: 4.8 },
  { id: 4, name: "Divya Pilates", specialty: "Pilates & Core",          members: 10, status: "Active",   rating: 4.6 },
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
}

const GymDashboard: React.FC<Props> = ({
  onLogout,
  ownerName = "Gym Owner",
  gymName   = "IronPulse Gym",
  ownerEmail = "owner@gymmanagement.com",
  role = "admin",
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.auth);

  const [activeTab,      setActiveTab]      = useState<DashTab>("overview");
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [isDark,         setIsDark]         = useState(() => document.documentElement.classList.contains("dark-theme"));
  const [memberSearch,   setMemberSearch]   = useState("");
  const [showAddMember,  setShowAddMember]  = useState(false);
  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [members,        setMembers]        = useState<Member[]>(MEMBERS);
  const [trainers,       setTrainers]       = useState<any[]>([]);
  const [isTrainersLoading, setIsTrainersLoading] = useState(false);
  const [inviteTrainerLoading, setInviteTrainerLoading] = useState(false);
  
  // Manager State
  const [managers,       setManagers]       = useState<any[]>([]);
  const [showAddManager, setShowAddManager] = useState(false);
  const [newManager,     setNewManager]     = useState({ fullName: "", email: "", mobileNo: "" });
  const [isManagersLoading, setIsManagersLoading] = useState(false);
  const [inviteLoading,  setInviteLoading]  = useState(false);

  useEffect(() => {
    if (role === "admin" || role === "superadmin") {
      fetchManagers();
    }
    if (role === "admin" || role === "superadmin" || role === "gymmanager") {
      fetchTrainers();
    }
  }, [role]);

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
    { label: "Total Members",  value: members.length,                       icon: Users,       color: "#2563eb", bg: "rgba(37,99,235,0.1)"  },
    { label: "Active Members", value: members.filter(m => m.status === "Active").length, icon: CheckCircle2, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    { label: "Trainers",       value: trainers.length,                      icon: Dumbbell,    color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    { label: "Revenue (Mo.)",  value: "₹1,24,500",                          icon: CreditCard,  color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  ];

  const navItems: { id: DashTab; label: string; icon: React.FC<{size?: number}> }[] = [
    { id: "overview" as DashTab,  label: "Overview",    icon: LayoutDashboard as any },
    { id: "members" as DashTab,   label: "Members",     icon: Users as any },
    { id: "trainers" as DashTab,  label: "Trainers",    icon: Dumbbell as any },
    { id: "managers" as DashTab,  label: "Managers",    icon: UserCog as any },
    { id: "plans" as DashTab,     label: "Plans",       icon: CreditCard as any },
    { id: "settings" as DashTab,  label: "Settings",    icon: Settings as any },
  ].filter(item => {
    // Hide managers tab from gym managers
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
          <div className="brand-icon-wrapper">
            <Dumbbell size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="brand-name">{gymName.toUpperCase().slice(0, 10)}</h1>
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
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="profile-avatar">
                {ownerName.slice(0, 2).toUpperCase()}
              </div>
              <div className="profile-info">
                <span className="profile-name">{ownerName}</span>
                <span className="profile-email">{ownerEmail}</span>
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
                { label: "Add Member",  icon: UserPlus,     action: () => { setActiveTab("members"); setShowAddMember(true); } },
                { label: "Add Trainer", icon: Dumbbell,     action: () => { setActiveTab("trainers"); setShowAddTrainer(true); } },
                { label: "View Plans",  icon: ClipboardList, action: () => setActiveTab("plans") },
                { label: "Managers",    icon: UserCog,      action: () => setActiveTab("managers"), hide: role === "gymmanager" },
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
  const [newMember, setNewMember] = useState({ name: "", plan: "Pro Athlete", email: "" });

  const MembersPanel = (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Members</h2>
          <p className="page-subtitle">{members.length} total members registered</p>
        </div>
        <button className="btn-blue" onClick={() => setShowAddMember(true)}>
          <Plus size={16} /> Add Member
        </button>
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
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add New Member</h3>
              <button onClick={() => setShowAddMember(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Full Name", field: "name", placeholder: "John Doe", type: "text" },
                { label: "Email",     field: "email", placeholder: "john@example.com", type: "email" },
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
              <div>
                <label className="form-label">Plan</label>
                <select
                  value={newMember.plan}
                  onChange={e => setNewMember({ ...newMember, plan: e.target.value })}
                  className="form-input"
                  style={{ cursor: "pointer" }}
                >
                  {["Basic Strength", "Pro Athlete", "VIP Elite"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => {
                    if (!newMember.name.trim()) return;
                    const initials = newMember.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                    setMembers(prev => [...prev, { id: Date.now(), name: newMember.name, plan: newMember.plan, status: "Active", joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), avatar: initials }]);
                    setNewMember({ name: "", plan: "Pro Athlete", email: "" });
                    setShowAddMember(false);
                  }}>
                  Add Member
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddMember(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="gym-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                {["Member", "Plan", "Status", "Joined", ""].map(h => (
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
                  <td style={{ padding: "14px 16px" }}>
                    <button onClick={() => setMembers(prev => prev.map(x => x.id === m.id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x))}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.8rem", padding: "4px 8px", borderRadius: 6, transition: "background 0.1s" }}>
                      Toggle
                    </button>
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
  const [newTrainer, setNewTrainer] = useState({ fullName: "", email: "", mobileNo: "" });

  const TrainersPanel = (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Trainers</h2>
          <p className="page-subtitle">{trainers.length} trainers on your team</p>
        </div>
        <button className="btn-blue" onClick={() => setShowAddTrainer(true)}>
          <Plus size={16} /> Add Trainer
        </button>
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
                      setNewTrainer({ fullName: "", email: "", mobileNo: "" });
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {isTrainersLoading ? (
          <div style={{ textAlign: "center", padding: "40px", gridColumn: "1 / -1" }}><Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
        ) : trainers.map(t => (
          <div key={t._id} className="gym-card">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(245,158,11,0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 700, flexShrink: 0 }}>
                  {t.fullName?.slice(0, 2).toUpperCase() || "??"}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>{t.fullName}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Trainer</div>
                </div>
              </div>
              <span className={`checkin-status ${t.isActive ? "status-active" : "status-inactive"}`}>{t.isActive ? "Active" : "Pending Setup"}</span>
            </div>
            {!t.isActive && (
              <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px", width: "100%", justifyContent: "center", marginTop: "10px" }}
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
            {t.isActive && (
              <div style={{ display: "flex", gap: 20, paddingTop: 14, borderTop: "1px solid var(--border-color)", marginTop: "10px" }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>0</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>Members</div>
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f59e0b" }}>⭐ 5.0</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>Rating</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
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
                      setNewManager({ fullName: "", email: "", mobileNo: "" });
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
      <div style={{ marginBottom: 24 }}>
        <h2 className="page-title">Membership Plans</h2>
        <p className="page-subtitle">Plans currently active at {gymName}.</p>
      </div>
      <div className="pricing-grid">
        {[
          { name: "Basic Strength",  price: "₹999",   desc: "Gym floor access, locker rooms.",                  count: members.filter(m => m.plan === "Basic Strength").length,  color: "#2563eb" },
          { name: "Pro Athlete",     price: "₹1,999", desc: "All classes, 24/7 access.",                        count: members.filter(m => m.plan === "Pro Athlete").length,     color: "#10b981" },
          { name: "VIP Elite",       price: "₹4,999", desc: "Personal trainer, custom plans.",                   count: members.filter(m => m.plan === "VIP Elite").length,       color: "#8b5cf6" },
        ].map(p => (
          <div key={p.name} className="gym-card pricing-card" style={{ borderTop: `3px solid ${p.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h3 className="plan-name">{p.name}</h3>
              <span style={{ fontSize: "0.72rem", background: "var(--bg-secondary)", color: "var(--text-muted)", padding: "3px 8px", borderRadius: 12, fontWeight: 600 }}>
                {p.count} members
              </span>
            </div>
            <div className="plan-price-wrapper">
              <span className="plan-price" style={{ color: p.color }}>{p.price}</span>
              <span className="plan-period">/month</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Settings panel ───────────────────────────────────────────────────────
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
              { label: "Gym Name",     val: gymName,     placeholder: "Your Gym Name" },
              { label: "Owner Name",   val: ownerName,   placeholder: "Full Name" },
              { label: "Email",        val: ownerEmail,  placeholder: "Email Address" },
              { label: "Phone",        val: "",          placeholder: "+91 00000 00000" },
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
    members:  MembersPanel,
    trainers: TrainersPanel,
    managers: ManagersPanel,
    plans:    PlansPanel,
    settings: SettingsPanel,
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="app-container">
      {Sidebar}

      <div className="main-content">
        {/* Mobile header */}
        <header className="mobile-header">
          <button className="menu-toggle-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="brand-icon-wrapper" style={{ width: 32, height: 32 }}>
              <Dumbbell size={16} />
            </div>
            <span className="brand-name" style={{ fontSize: "1rem" }}>{gymName.toUpperCase().slice(0, 10)}</span>
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
