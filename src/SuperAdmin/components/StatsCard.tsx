import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// StatsCard — A premium animated stat card for the super admin dashboard
// ─────────────────────────────────────────────────────────────────────────────

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;        // CSS gradient string e.g. "linear-gradient(...)"
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  label,
  value,
  sub,
  color,
  trend,
  trendValue,
}) => {
  const trendColor =
    trend === "up" ? "#16a34a" : trend === "down" ? "#ef4444" : "#64748b";
  const trendArrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";

  return (
    <div style={styles.card}>
      <div style={{ ...styles.iconWrap, background: color }}>{icon}</div>
      <div style={styles.content}>
        <span style={styles.label}>{label}</span>
        <span style={styles.value}>{value}</span>
        {(sub || trendValue) && (
          <span style={styles.sub}>
            {trendValue && (
              <span style={{ color: trendColor, marginRight: 4 }}>
                {trendArrow} {trendValue}
              </span>
            )}
            {sub}
          </span>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: "20px 24px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 24,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  label: {
    fontSize: 12,
    color: "#475569",
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  value: {
    fontSize: 26,
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.2,
  },
  sub: {
    fontSize: 12,
    color: "#64748b",
  },
};

export default StatsCard;
