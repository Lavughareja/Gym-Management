import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { 
  LayoutDashboard, 
  Dumbbell, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  BookOpen
} from "lucide-react";
import type { AppDispatch } from "../../redux/store";
import { saLogout } from "../redux/slices/superAdminSlice";

// ─────────────────────────────────────────────────────────────────────────────
// SuperAdminLayout — Sidebar + topbar shell for all super admin pages
// ─────────────────────────────────────────────────────────────────────────────

type NavTab = "dashboard" | "gyms" | "workout-library";

interface SuperAdminLayoutProps {
  children: (tab: NavTab) => React.ReactNode;
}

const NAV_ITEMS: { id: NavTab; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard",       label: "Dashboard",        icon: <LayoutDashboard size={20} /> },
  { id: "gyms",            label: "All Gyms",          icon: <Dumbbell size={20} /> },
  { id: "workout-library", label: "Workout Videos",   icon: <BookOpen size={20} /> },
];

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(saLogout());
    localStorage.removeItem("gym_auth_token");
    window.history.pushState({}, "", "/super-admin");
    window.location.reload();
  };

  return (
    <div style={styles.root}>
      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? 240 : 68 }}>
        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <img src="/logo.png" alt="Logo" style={{ width: 32, height: 32, display: "block" }} />
          </div>
          {sidebarOpen && (
            <span style={styles.logoText}>
              Trainin<span style={{ color: "#3b82f6" }}>X</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav style={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              id={`sa-nav-${item.id}`}
              style={{
                ...styles.navItem,
                background:
                  activeTab === item.id
                    ? "rgba(59, 130, 246, 0.1)"
                    : "transparent",
                borderLeft:
                  activeTab === item.id
                    ? "3px solid #3b82f6"
                    : "3px solid transparent",
                color: activeTab === item.id ? "#3b82f6" : "#475569",
              }}
              onClick={() => setActiveTab(item.id)}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {sidebarOpen && <span style={styles.navLabel}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={styles.sidebarBottom}>
          <button
            id="sa-logout-btn"
            style={{ ...styles.logoutBtn, justifyContent: sidebarOpen ? "flex-start" : "center" }}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div style={styles.main}>
        {/* Topbar */}
        <header style={styles.topbar}>
          <div style={styles.topbarLeft}>
            <span style={styles.pageTitle}>
              {NAV_ITEMS.find((n) => n.id === activeTab)?.icon}{" "}
              {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
            </span>
            <span style={styles.superAdminBadge}>SUPER ADMIN</span>
          </div>
          <div style={styles.topbarRight}>
            <div style={styles.avatarWrap}>
              <div style={styles.avatar}>SA</div>
              <span style={styles.avatarName}>Super Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={styles.content}>{children(activeTab)}</main>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    background: "#f8fafc",
    fontFamily: "'Inter', 'Outfit', sans-serif",
    color: "#0f172a",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    transition: "width 0.25s ease",
    overflow: "hidden",
    flexShrink: 0,
    height: "100vh",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "0 24px",
    height: "72px",
    borderBottom: "1px solid #e2e8f0",
    flexShrink: 0,
  },
  logoIcon: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: 800,
    color: "#0f172a",
    whiteSpace: "nowrap",
    letterSpacing: "-0.02em",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "16px 10px",
    flex: 1,
    overflowY: "auto",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "11px 12px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    transition: "background 0.18s, color 0.18s",
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  navIcon: { display: "flex", alignItems: "center", flexShrink: 0 },
  navLabel: {},
  sidebarBottom: {
    padding: "12px 10px",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  collapseBtn: {
    background: "transparent",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    padding: "8px",
    borderRadius: 8,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 10,
    color: "#ef4444",
    fontSize: 13,
    fontWeight: 600,
    padding: "10px 12px",
    cursor: "pointer",
    overflow: "hidden",
    whiteSpace: "nowrap",
    transition: "background 0.18s",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    height: "100vh",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
    height: "72px",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    flexShrink: 0,
  },
  topbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  pageTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.01em",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  superAdminBadge: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    background: "#e0e7ff",
    color: "#4f46e5",
    padding: "4px 8px",
    borderRadius: 6,
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatarWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#3b82f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 13,
    color: "#fff",
  },
  avatarName: {
    fontSize: 13,
    fontWeight: 600,
    color: "#475569",
  },
  content: {
    flex: 1,
    padding: "28px",
    overflowY: "auto",
  },
};

export default SuperAdminLayout;
