import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
import type { RootState, AppDispatch } from "../../redux/store";
import { toggleGymStatus } from "../redux/actions/superAdminActions";
import type { GymItem } from "../redux/slices/superAdminSlice";

// ─────────────────────────────────────────────────────────────────────────────
// GymTable — Shows all registered gyms with plan, members, revenue, status
// ─────────────────────────────────────────────────────────────────────────────

interface GymTableProps {
  gyms: GymItem[];
  onSearch: (q: string) => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  search: string;
}

const PLAN_COLORS: Record<string, string> = {
  starter:      "#6366f1",
  plus:         "#8b5cf6",
  professional: "#a855f7",
  enterprise:   "#ec4899",
};

const STATUS_COLORS: Record<string, string> = {
  active:    "#4ade80",
  expired:   "#f87171",
  suspended: "#f59e0b",
  pending:   "#94a3b8",
};

const GymTable: React.FC<GymTableProps> = ({
  gyms,
  onSearch,
  onPageChange,
  currentPage,
  totalPages,
  loading,
  search,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const togglingGymId = useSelector((s: RootState) => s.superAdmin.togglingGymId);
  const [localSearch, setLocalSearch] = useState(search);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(localSearch);
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  const fmtCurrency = (paise: number) => {
    const rupees = paise / 100;
    return rupees >= 1000
      ? `₹${(rupees / 1000).toFixed(1)}K`
      : `₹${fmt(rupees)}`;
  };

  return (
    <div style={styles.wrapper}>
      {/* Search */}
      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}><Search size={16} color="#64748b" /></span>
          <input
            id="sa-gym-search"
            style={styles.searchInput}
            placeholder="Search gym name or email…"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <button
            id="sa-gym-search-btn"
            style={styles.searchBtn}
            onClick={() => onSearch(localSearch)}
          >
            Search
          </button>
        </div>
        {loading && <span style={styles.loadingTag}>Loading…</span>}
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["#", "Gym Name", "Owner", "Plan", "Sub Status", "Members", "Revenue", "Joined", "Active", "Action"].map(
                (h) => (
                  <th key={h} style={styles.th}>{h}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {gyms.length === 0 && !loading ? (
              <tr>
                <td colSpan={10} style={{ ...styles.td, textAlign: "center", padding: 40, color: "#64748b" }}>
                  No gyms found.
                </td>
              </tr>
            ) : (
              gyms.map((gym, idx) => {
                const planColor = PLAN_COLORS[gym.subscription?.plan || ""] || "#64748b";
                const subColor  = STATUS_COLORS[gym.subscription?.status || ""] || "#94a3b8";
                const isToggling = togglingGymId === gym._id;

                return (
                  <tr key={gym._id} style={styles.tr} className="sa-gym-row">
                    <td style={styles.td}>
                      <span style={styles.idx}>{(currentPage - 1) * 20 + idx + 1}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.gymName}>{gym.name}</div>
                      <div style={styles.gymEmail}>{gym.email}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.ownerName}>{gym.owner?.fullName || "—"}</div>
                      <div style={styles.gymEmail}>{gym.owner?.email || ""}</div>
                    </td>
                    <td style={styles.td}>
                      {gym.subscription?.plan ? (
                        <span style={{ ...styles.badge, background: planColor + "22", color: planColor, border: `1px solid ${planColor}55` }}>
                          {gym.subscription.plan.toUpperCase()}
                        </span>
                      ) : (
                        <span style={styles.na}>—</span>
                      )}
                    </td>
                    <td style={styles.td}>
                      {gym.subscription?.status ? (
                        <span style={{ ...styles.badge, background: subColor + "22", color: subColor, border: `1px solid ${subColor}55` }}>
                          {gym.subscription.status}
                        </span>
                      ) : (
                        <span style={styles.na}>—</span>
                      )}
                    </td>
                    <td style={styles.td}>
                      <span style={styles.number}>{gym.memberCount}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ ...styles.number, color: "#4ade80" }}>
                        {fmtCurrency(gym.totalRevenue)}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.date}>
                        {new Date(gym.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.dot,
                        background: gym.isActive ? "#4ade80" : "#f87171",
                        boxShadow: gym.isActive ? "0 0 8px #4ade8088" : "0 0 8px #f8717188",
                      }} />
                    </td>
                    <td style={styles.td}>
                      <button
                        id={`sa-toggle-gym-${gym._id}`}
                        style={{
                          ...styles.toggleBtn,
                          background: gym.isActive
                            ? "rgba(248,113,113,0.12)"
                            : "rgba(74,222,128,0.12)",
                          color: gym.isActive ? "#f87171" : "#4ade80",
                          border: gym.isActive
                            ? "1px solid rgba(248,113,113,0.3)"
                            : "1px solid rgba(74,222,128,0.3)",
                          opacity: isToggling ? 0.5 : 1,
                        }}
                        disabled={isToggling}
                        onClick={() => dispatch(toggleGymStatus(gym._id))}
                      >
                        {isToggling ? "…" : gym.isActive ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            id="sa-gym-prev"
            style={{ ...styles.pageBtn, opacity: currentPage <= 1 ? 0.4 : 1 }}
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            ← Prev
          </button>
          <span style={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            id="sa-gym-next"
            style={{ ...styles.pageBtn, opacity: currentPage >= totalPages ? 0.4 : 1 }}
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next →
          </button>
        </div>
      )}

      <style>{`
        .sa-gym-row:hover td { background: #f8fafc !important; }
      `}</style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: { display: "flex", flexDirection: "column", gap: 0 },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid #e2e8f0",
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f8fafc",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    padding: "0 12px",
  },
  searchIcon: { display: "flex", alignItems: "center" },
  searchInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#0f172a",
    fontSize: 14,
    padding: "9px 4px",
    width: 260,
  },
  searchBtn: {
    background: "#3b82f6",
    border: "none",
    borderRadius: 7,
    color: "#ffffff",
    fontSize: 13,
    padding: "6px 14px",
    cursor: "pointer",
    fontWeight: 600,
  },
  loadingTag: {
    color: "#6366f1",
    fontSize: 13,
    fontStyle: "italic",
  },
  tableWrap: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
  th: {
    padding: "12px 16px",
    color: "#64748b",
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    textAlign: "left",
    borderBottom: "1px solid #e2e8f0",
    whiteSpace: "nowrap",
  },
  tr: { transition: "background 0.15s" },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #e2e8f0",
    verticalAlign: "middle",
    color: "#475569",
  },
  idx: { color: "#64748b", fontWeight: 600 },
  gymName: { color: "#0f172a", fontWeight: 600, marginBottom: 2 },
  gymEmail: { color: "#64748b", fontSize: 11 },
  ownerName: { color: "#334155", fontWeight: 500 },
  badge: {
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.04em",
  },
  na: { color: "#94a3b8" },
  number: { fontWeight: 700, color: "#0f172a" },
  date: { color: "#94a3b8", fontSize: 12 },
  dot: {
    display: "inline-block",
    width: 10,
    height: 10,
    borderRadius: "50%",
  },
  toggleBtn: {
    padding: "5px 12px",
    borderRadius: 7,
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: "16px 20px",
    borderTop: "1px solid #e2e8f0",
  },
  pageBtn: {
    background: "#f8fafc",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    color: "#475569",
    fontSize: 13,
    padding: "7px 16px",
    cursor: "pointer",
    fontWeight: 600,
  },
  pageInfo: { color: "#64748b", fontSize: 13 },
};

export default GymTable;
