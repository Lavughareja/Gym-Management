import DemoRequests from './DemoRequests';
import './SuperAdminDashboard.css';
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
import BlogManagement from "./BlogManagement";

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
            <div className="page">
              <div className="section-title">
                <BarChart3 size={18} /> Platform Overview
                {statsLoading && <span className="loading-pill">Loading…</span>}
              </div>

              {/* Stats cards */}
              <div className="stats-grid">
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
                  <div className="section-title" style={{marginTop: 36 }}>
                    <CreditCard size={18} /> Subscription Plan Breakdown
                  </div>
                  <div className="plan-grid">
                    {stats.planBreakdown.map((p) => (
                      <div key={p._id} className="plan-card">
                        <div className="plan-name">{p._id?.toUpperCase() || "—"}</div>
                        <div className="plan-count">{p.count}</div>
                        <div className="plan-label">gyms</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Recent gyms */}
              {stats && stats.recentGyms.length > 0 && (
                <>
                  <div className="section-title" style={{marginTop: 36 }}>
                    <Clock size={18} /> Recently Joined Gyms
                  </div>
                  <div className="recent-grid">
                    {stats.recentGyms.map((g: any) => (
                      <div key={g._id} className="recent-card">
                        <div className="recent-name">{g.name}</div>
                        <div className="recent-email">{g.email}</div>
                        <div className="recent-date">
                          {new Date(g.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
                        </div>
                        <span
                          className="active-dot" style={{background: g.isActive ? "#4ade80" : "#f87171",
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
            <div className="page">
              <div className="section-title">
                <Dumbbell size={18} /> All Registered Gyms
                <span className="count-pill">
                  {pagination?.total ?? 0} total
                </span>
              </div>

              <div className="table-card">
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

          {/* ─── BLOG MANAGEMENT TAB ────────────────────────────────────────── */}
          {activeTab === "blogs" && <BlogManagement />}

          {/* ─── DEMO REQUESTS TAB ────────────────────────────────────────── */}
          {activeTab === "demo-requests" && <DemoRequests />}
        </>
      )}
    </SuperAdminLayout>
  );
};



export default SuperAdminDashboard;
