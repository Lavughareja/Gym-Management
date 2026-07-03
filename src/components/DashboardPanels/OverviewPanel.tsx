import React from "react";
import { Users, CheckCircle2, Dumbbell, CreditCard, ChevronRight, UserPlus, ClipboardList, UserCog } from "lucide-react";
import { useAppSelector } from "../../utils/reduxHooks";

interface Props {
  ownerName: string;
  gymName: string;
  role: string;
  canAddMember: boolean;
  setActiveTab: (tab: any) => void;
  setShowAddMember: (show: boolean) => void;
  setShowAddTrainer: (show: boolean) => void;
}

const OverviewPanel: React.FC<Props> = ({
  ownerName,
  gymName,
  role,
  canAddMember,
  setActiveTab,
  setShowAddMember,
  setShowAddTrainer,
}) => {
  const { members } = useAppSelector((state) => state.member);
  const { trainers } = useAppSelector((state) => state.trainer);

  const stats = [
    { label: "Total Members", value: members.length, icon: Users, color: "#2563eb", bg: "rgba(37,99,235,0.1)" },
    { label: "Active Members", value: members.filter((m: any) => m.status === "Active").length, icon: CheckCircle2, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    { label: "Trainers", value: trainers.length, icon: Dumbbell, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    { label: "Revenue (Mo.)", value: "₹1,24,500", icon: CreditCard, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Welcome back, {ownerName.split(" ")[0]} 👋</h2>
        <p className="page-subtitle">Here's what's happening at {gymName} today.</p>
      </div>

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

      <div className="dashboard-grid">
        <div className="gym-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Recent Members</h3>
            <button className="btn-blue-outline" style={{ fontSize: "0.78rem", padding: "5px 12px" }} onClick={() => setActiveTab("members")}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="checkin-list">
            {members.slice(0, 5).map((m: any) => (
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
              {trainers.filter((t: any) => t.status === "Active" || t.isActive).map((t: any) => (
                <div key={t._id || t.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="checkin-avatar" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", fontSize: "0.75rem", fontWeight: 700, width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {t.name?.slice(0, 2).toUpperCase() || t.fullName?.slice(0, 2).toUpperCase() || "??"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name || t.fullName}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.specialty || "Fitness Trainer"}</div>
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
};

export default OverviewPanel;
