import React, { useEffect, useState } from "react";
import { Search, History, Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { fetchLiveAttendanceAction } from "../../redux/actions/attendanceActions";

const AttendancePanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading } = useAppSelector((state) => state.attendance);
  const [attendanceSearch, setAttendanceSearch] = useState("");

  useEffect(() => {
    dispatch(fetchLiveAttendanceAction());
    const interval = setInterval(() => {
      dispatch(fetchLiveAttendanceAction());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const filteredEvents = events.filter((e: any) => e.memberName?.toLowerCase().includes(attendanceSearch.toLowerCase()));

  return (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Live Attendance</h2>
          <p className="page-subtitle">Real-time biometric check-ins</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="pulse-indicator">
            <div className="pulse-dot"></div>
          </div>
          <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}>Live Feed Active</span>
        </div>
      </div>

      <div className="gym-card" style={{ padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <Search size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
        <input
          value={attendanceSearch}
          onChange={e => setAttendanceSearch(e.target.value)}
          placeholder="Search attendance by member name…"
          style={{ border: "none", outline: "none", background: "transparent", fontSize: "0.9rem", color: "var(--text-primary)", width: "100%" }}
        />
      </div>

      <div className="gym-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-secondary)", display: "flex", alignItems: "center", gap: 10 }}>
          <History size={18} style={{ color: "var(--primary)" }} />
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Recent Scans</h3>
          {loading && events.length === 0 && <Loader size={16} style={{ animation: "spin 1s linear infinite", marginLeft: "auto", color: "var(--primary)" }} />}
        </div>
        <div style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
          {filteredEvents.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
              No recent attendance records found.
            </div>
          ) : (
            filteredEvents.map((record: any, index: number) => {
              let statusColor = "#10b981";
              let statusBg = "rgba(16,185,129,0.1)";
              let statusLabel = "Success";

              if (record.status !== "SUCCESS") {
                statusColor = "#ef4444";
                statusBg = "rgba(239,68,68,0.1)";
                statusLabel = record.status.replace(/_/g, ' ');
              }

              return (
                <div key={index} style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between", animation: "slideIn 0.3s ease forwards" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div className="checkin-avatar" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                      {record.avatar || "??"}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>{record.memberName}</h4>
                      <p style={{ margin: "4px 0 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>{record.time}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: statusColor, background: statusBg, padding: "4px 10px", borderRadius: 12 }}>
                    {statusLabel}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePanel;
