import React, { useState } from "react";
import { Plus, X, UserCog, Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { inviteManagerAction, resendManagerInviteAction, deleteManagerAction, updateManagerPermissionAction } from "../../redux/actions/managerActions";

interface Props {
  role: string;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000,
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20
};

const ManagersPanel: React.FC<Props> = ({ role }) => {
  const dispatch = useAppDispatch();
  const { managers, loading } = useAppSelector((state) => state.manager);

  const [showAddManager, setShowAddManager] = useState(false);
  const [newManager, setNewManager] = useState({ fullName: "", email: "", mobileNo: "", canAddMember: false, dateOfBirth: "" });
  const [inviteLoading, setInviteLoading] = useState(false);

  const handleInviteManager = async () => {
    if (!newManager.fullName || !newManager.email || !newManager.mobileNo) return;
    setInviteLoading(true);
    const success = await dispatch(inviteManagerAction(newManager));
    setInviteLoading(false);
    if (success) {
      setShowAddManager(false);
      setNewManager({ fullName: "", email: "", mobileNo: "", canAddMember: false, dateOfBirth: "" });
    }
  };

  return (
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
              <div>
                <label className="form-label">Date of Birth</label>
                <input type="date" value={newManager.dateOfBirth} onChange={e => setNewManager({ ...newManager, dateOfBirth: e.target.value })} className="form-input" />
              </div>
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
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={inviteLoading}
                  onClick={handleInviteManager}>
                  {inviteLoading ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Send Invite"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddManager(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
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
                {managers.map((m: any) => (
                  <tr key={m._id || m.id} style={{ borderBottom: "1px solid var(--border-color)", transition: "background 0.1s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-secondary)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{m.fullName}</td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>{m.email}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span className={`checkin-status ${m.isActive || m.status === 'Active' ? "status-active" : "status-inactive"}`}>
                        {m.isActive || m.status === 'Active' ? "Active" : "Pending Setup"}
                      </span>
                    </td>
                    {(role === "admin" || role === "superadmin") && (
                      <td style={{ padding: "14px 16px" }}>
                        {(m.isActive || m.status === 'Active') && (
                          <label className="switch" style={{ transform: "scale(0.8)", margin: 0 }}>
                            <input
                              type="checkbox"
                              checked={!!m.canAddMember}
                              onChange={(e) => dispatch(updateManagerPermissionAction(m._id || m.id, e.target.checked))}
                            />
                            <span className="slider" />
                          </label>
                        )}
                      </td>
                    )}
                    <td style={{ padding: "14px 16px" }}>
                      {(!m.isActive && m.status !== 'Active') && (
                        <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px" }}
                          onClick={() => dispatch(resendManagerInviteAction(m.email))}>
                          Resend Invite
                        </button>
                      )}
                      {(role === "admin" || role === "superadmin") && (
                        <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px", borderColor: "#ef4444", color: "#ef4444", marginLeft: "8px" }}
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${m.fullName}?`)) {
                              dispatch(deleteManagerAction(m._id || m.id));
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
};

export default ManagersPanel;
