import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  fetchSuperAdminDashboard,
  fetchAllGyms,
} from "../redux/actions/superAdminActions";
import { 
  BarChart3, 
  Dumbbell, 
  Calendar, 
  Wallet, 
  Coins, 
  CheckCircle, 
  XCircle, 
  Users,
  CreditCard,
  Clock
} from "lucide-react";
import SuperAdminLayout from "../components/SuperAdminLayout";
import StatsCard from "../components/StatsCard";
import GymTable from "../components/GymTable";
import WorkoutLibrary from "./WorkoutLibrary";
import FaqManagement from "./FaqManagement";

// ─────────────────────────────────────────────────────────────────────────────
// SuperAdminDashboard — Main dashboard page for the super admin portal
// ─────────────────────────────────────────────────────────────────────────────

const SuperAdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { stats, gyms, pagination, statsLoading, gymsLoading } = useSelector(
    (s: RootState) => s.superAdmin
  );

  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");

  // Load dashboard stats once
  useEffect(() => {
    dispatch(fetchSuperAdminDashboard());
  }, [dispatch]);

  // Load gyms list
  useEffect(() => {
    dispatch(fetchAllGyms({ page, limit: 20, search }));
  }, [dispatch, page, search]);

  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
  };

  const fmtCurrency = (paise: number) => {
    const rupees = paise / 100;
    if (rupees >= 100000) return `₹${(rupees / 100000).toFixed(1)}L`;
    if (rupees >= 1000)   return `₹${(rupees / 1000).toFixed(1)}K`;
    return `₹${rupees.toFixed(0)}`;
  };

  const growthPct = (current: number, prev: number) => {
    if (!prev) return current > 0 ? "+100%" : "—";
    const pct = (((current - prev) / prev) * 100).toFixed(0);
    return (Number(pct) >= 0 ? "+" : "") + pct + "%";
  };

  return (
    <SuperAdminLayout>
      {(activeTab) => (
        <>
          {/* ─── DASHBOARD TAB ──────────────────────────────────────────────── */}
          {activeTab === "dashboard" && (
            <div style={styles.page}>
              <div style={styles.sectionTitle}>
                <BarChart3 size={18} /> Platform Overview
                {statsLoading && <span style={styles.loadingPill}>Loading…</span>}
              </div>

              {/* Stats cards */}
              <div style={styles.statsGrid}>
                <StatsCard
                  icon={<Dumbbell size={24} color="#fff" />}
                  label="Total Gyms"
                  value={stats?.totalGyms ?? "—"}
                  sub="registered on platform"
                  color="linear-gradient(135deg,#6366f1,#818cf8)"
                  trend={
                    stats
                      ? stats.gymsThisMonth >= stats.gymsLastMonth ? "up" : "down"
                      : "neutral"
                  }
                  trendValue={
                    stats
                      ? growthPct(stats.gymsThisMonth, stats.gymsLastMonth)
                      : undefined
                  }
                />
                <StatsCard
                  icon={<Calendar size={24} color="#fff" />}
                  label="New Gyms This Month"
                  value={stats?.gymsThisMonth ?? "—"}
                  sub="joined this month"
                  color="linear-gradient(135deg,#0ea5e9,#38bdf8)"
                  trend={
                    stats
                      ? stats.gymsThisMonth >= stats.gymsLastMonth ? "up" : "down"
                      : "neutral"
                  }
                  trendValue={
                    stats
                      ? growthPct(stats.gymsThisMonth, stats.gymsLastMonth)
                      : undefined
                  }
                />
                <StatsCard
                  icon={<Wallet size={24} color="#fff" />}
                  label="Total Revenue"
                  value={stats ? fmtCurrency(stats.totalRevenue) : "—"}
                  sub="all time (completed payments)"
                  color="linear-gradient(135deg,#10b981,#34d399)"
                  trend={
                    stats
                      ? stats.revenueThisMonth >= stats.revenueLastMonth ? "up" : "down"
                      : "neutral"
                  }
                  trendValue={
                    stats
                      ? growthPct(stats.revenueThisMonth, stats.revenueLastMonth)
                      : undefined
                  }
                />
                <StatsCard
                  icon={<Coins size={24} color="#fff" />}
                  label="Revenue This Month"
                  value={stats ? fmtCurrency(stats.revenueThisMonth) : "—"}
                  sub="current month earnings"
                  color="linear-gradient(135deg,#f59e0b,#fbbf24)"
                  trend={
                    stats
                      ? stats.revenueThisMonth >= stats.revenueLastMonth ? "up" : "down"
                      : "neutral"
                  }
                  trendValue={
                    stats
                      ? growthPct(stats.revenueThisMonth, stats.revenueLastMonth)
                      : undefined
                  }
                />
                <StatsCard
                  icon={<CheckCircle size={24} color="#fff" />}
                  label="Active Gyms"
                  value={stats?.activeGyms ?? "—"}
                  sub="currently operational"
                  color="linear-gradient(135deg,#22c55e,#4ade80)"
                />
                <StatsCard
                  icon={<XCircle size={24} color="#fff" />}
                  label="Suspended Gyms"
                  value={stats?.inactiveGyms ?? "—"}
                  sub="deactivated gyms"
                  color="linear-gradient(135deg,#ef4444,#f87171)"
                />
                <StatsCard
                  icon={<Users size={24} color="#fff" />}
                  label="Total Members"
                  value={stats?.totalMembers ?? "—"}
                  sub="across all gyms"
                  color="linear-gradient(135deg,#a855f7,#d8b4fe)"
                />
              </div>

              {/* Plan breakdown */}
              {stats && stats.planBreakdown.length > 0 && (
                <>
                  <div style={{ ...styles.sectionTitle, marginTop: 36 }}>
                    <CreditCard size={18} /> Subscription Plan Breakdown
                  </div>
                  <div style={styles.planGrid}>
                    {stats.planBreakdown.map((p) => (
                      <div key={p._id} style={styles.planCard}>
                        <div style={styles.planName}>{p._id?.toUpperCase() || "—"}</div>
                        <div style={styles.planCount}>{p.count}</div>
                        <div style={styles.planLabel}>gyms</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Recent gyms */}
              {stats && stats.recentGyms.length > 0 && (
                <>
                  <div style={{ ...styles.sectionTitle, marginTop: 36 }}>
                    <Clock size={18} /> Recently Joined Gyms
                  </div>
                  <div style={styles.recentGrid}>
                    {stats.recentGyms.map((g: any) => (
                      <div key={g._id} style={styles.recentCard}>
                        <div style={styles.recentName}>{g.name}</div>
                        <div style={styles.recentEmail}>{g.email}</div>
                        <div style={styles.recentDate}>
                          {new Date(g.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
                        </div>
                        <span
                          style={{
                            ...styles.activeDot,
                            background: g.isActive ? "#4ade80" : "#f87171",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ─── GYMS TAB ───────────────────────────────────────────────────── */}
          {activeTab === "gyms" && (
            <div style={styles.page}>
              <div style={styles.sectionTitle}>
                <Dumbbell size={18} /> All Registered Gyms
                <span style={styles.countPill}>
                  {pagination?.total ?? 0} total
                </span>
              </div>

              <div style={styles.tableCard}>
                <GymTable
                  gyms={gyms}
                  loading={gymsLoading}
                  search={search}
                  currentPage={page}
                  totalPages={pagination?.pages ?? 1}
                  onSearch={handleSearch}
                  onPageChange={(p) => setPage(p)}
                />
              </div>
            </div>
          )}
          {/* ─── WORKOUT LIBRARY TAB ────────────────────────────────────── */}
          {activeTab === "workout-library" && (
            <WorkoutLibrary />
          )}

          {/* ─── FAQ MANAGEMENT TAB ────────────────────────────────────── */}
          {activeTab === "faq" && (
            <FaqManagement />
          )}
        </>
      )}
    </SuperAdminLayout>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#94a3b8",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  loadingPill: {
    fontSize: 11,
    background: "#e0e7ff",
    color: "#4f46e5",
    borderRadius: 20,
    padding: "4px 10px",
    fontWeight: 600,
    letterSpacing: "0.04em",
  },
  countPill: {
    fontSize: 11,
    background: "#e0e7ff",
    color: "#4f46e5",
    borderRadius: 20,
    padding: "4px 10px",
    fontWeight: 600,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
    marginBottom: 4,
  },
  planGrid: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
  },
  planCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: "18px 24px",
    textAlign: "center",
    minWidth: 120,
  },
  planName: {
    fontSize: 11,
    fontWeight: 700,
    color: "#4f46e5",
    letterSpacing: "0.08em",
    marginBottom: 4,
  },
  planCount: {
    fontSize: 32,
    fontWeight: 800,
    color: "#0f172a",
    lineHeight: 1,
  },
  planLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  recentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 12,
  },
  recentCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "14px 16px",
    position: "relative",
  },
  recentName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 2,
  },
  recentEmail: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 6,
  },
  recentDate: {
    fontSize: 11,
    color: "#94a3b8",
  },
  activeDot: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "block",
  },
  tableCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
  },
};

export default SuperAdminDashboard;
