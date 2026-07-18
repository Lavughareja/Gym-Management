import React, { useState, useEffect } from "react";
import { Users, CheckCircle2, Dumbbell, CreditCard, ChevronRight, UserPlus, ClipboardList, UserCog, AlertTriangle, Activity, Target } from "lucide-react";
import { useAppSelector } from "../../utils/reduxHooks";
import { AxiosInstance } from "../../axios/axiosInstance";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
  const [dashboardData, setDashboardData] = useState<any>({
    totalMembers: members.length,
    activeMembers: members.filter((m: any) => m.status === "Active").length,
    membersJoinedThisMonth: 0,
    revenueThisMonth: 0,
    expiringMembersCount: 0,
    todayAttendanceCount: 0,
    pendingLeadsCount: 0,
    chartData: []
  });
  const [expiringTrials, setExpiringTrials] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await AxiosInstance.get('/dashboard/overview');
        if (response.data) {
          setDashboardData((prev: any) => ({
            ...prev,
            ...response.data
          }));
        }
      } catch (error) {
        console.error("Error fetching dashboard overview:", error);
      }
    };

    const fetchExpiringTrials = async () => {
      try {
        const response = await AxiosInstance.get('/trials');
        if (response.data && response.data.trials) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const expiring = response.data.trials.filter((t: any) => {
            if (t.status !== 'active') return false;
            const end = new Date(t.endDate);
            end.setHours(0, 0, 0, 0);
            return end.getTime() === today.getTime();
          });
          setExpiringTrials(expiring);
        }
      } catch (error) {
        console.error("Error fetching trials:", error);
      }
    };

    fetchDashboardData();
    fetchExpiringTrials();
  }, []);

  const stats = [
    { label: "Total Members", value: dashboardData.totalMembers, icon: Users, color: "#2563eb", bg: "rgba(37,99,235,0.1)" },
    { label: "Active Members", value: dashboardData.activeMembers, icon: CheckCircle2, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    { label: "Joined This Month", value: dashboardData.membersJoinedThisMonth, icon: UserPlus, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    { label: "Revenue (Mo.)", value: `₹${dashboardData.revenueThisMonth.toLocaleString('en-IN')}`, icon: CreditCard, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
    { label: "Expiring (7 Days)", value: dashboardData.expiringMembersCount, icon: AlertTriangle, color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
    { label: "Today's Footfall", value: dashboardData.todayAttendanceCount, icon: Activity, color: "#0ea5e9", bg: "rgba(14,165,233,0.1)" },
    { label: "Pending Leads", value: dashboardData.pendingLeadsCount, icon: Target, color: "#ec4899", bg: "rgba(236,72,153,0.1)" },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Welcome back, {ownerName.split(" ")[0]} 👋</h2>
        <p className="page-subtitle">Here's what's happening at {gymName} today.</p>
      </div>

      {expiringTrials.length > 0 && (
        <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 12, padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <AlertTriangle size={24} color="#d97706" />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0, color: '#92400e', fontSize: 16 }}>{expiringTrials.length} Trial(s) Expiring Today!</h4>
            <p style={{ margin: '4px 0 0', color: '#b45309', fontSize: 14 }}>
              {expiringTrials.map(t => t.name).join(', ')}. Reach out to convert them to members!
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('trial_members')}
            style={{ padding: '8px 16px', background: '#d97706', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
          >
            View Trials
          </button>
        </div>
      )}

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="gym-card stat-card" style={{ padding: "16px", minWidth: "220px", display: "flex", gap: "16px", alignItems: "center" }}>
            <div className="stat-icon-container" style={{ background: s.bg, padding: "12px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <s.icon size={26} style={{ color: s.color }} />
            </div>
            <div className="stat-info" style={{ display: "flex", flexDirection: "column" }}>
              <span className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.value}</span>
              <span className="stat-label" style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="gym-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>Member Joins (This Year)</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboardData.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color, #e5e7eb)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted, #6b7280)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-muted, #6b7280)" }} />
              <Tooltip 
                contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                cursor={{ fill: "rgba(37,99,235,0.05)" }}
              />
              <Bar dataKey="joined" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
