import React, { useState } from "react";
import { Plus, X, Dumbbell, Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { inviteTrainerAction, resendTrainerInviteAction, deleteTrainerAction, updateTrainerPermissionAction } from "../../redux/actions/trainerActions";

interface Props {
  role: string;
  showAddTrainer: boolean;
  setShowAddTrainer: (show: boolean) => void;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000,
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20
};

const TrainersPanel: React.FC<Props> = ({ role, showAddTrainer, setShowAddTrainer }) => {
  const dispatch = useAppDispatch();
  const { trainers, loading } = useAppSelector((state) => state.trainer);

  const [newTrainer, setNewTrainer] = useState({ fullName: "", email: "", mobileNo: "", canAddMember: false, dateOfBirth: "" });
  const [inviteTrainerLoading, setInviteTrainerLoading] = useState(false);

  const handleInviteTrainer = async () => {
    if (!newTrainer.fullName || !newTrainer.email || !newTrainer.mobileNo) return;
    setInviteTrainerLoading(true);
    const success = await dispatch(inviteTrainerAction(newTrainer));
    setInviteTrainerLoading(false);
    if (success) {
      setShowAddTrainer(false);
      setNewTrainer({ fullName: "", email: "", mobileNo: "", canAddMember: false, dateOfBirth: "" });
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Trainers</h2>
          <p className="page-subtitle">{trainers.length} trainers on your team</p>
        </div>
        {role !== "trainer" && (
          <button className="btn-blue" onClick={() => setShowAddTrainer(true)}>
            <Plus size={16} /> Add Trainer
          </button>
        )}
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
              <div>
                <label className="form-label">Date of Birth</label>
                <input type="date" value={newTrainer.dateOfBirth} onChange={e => setNewTrainer({ ...newTrainer, dateOfBirth: e.target.value })} className="form-input" />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4, marginBottom: 8, padding: "8px 0" }}>
                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>Can Add Members</h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>Allow this trainer to register new members</p>
                </div>
                <div
                  onClick={() => setNewTrainer({ ...newTrainer, canAddMember: !newTrainer.canAddMember })}
                  style={{
                    width: 44, height: 24, borderRadius: 12, background: newTrainer.canAddMember ? "var(--primary)" : "var(--border)",
                    position: "relative", cursor: "pointer", transition: "all 0.3s ease"
                  }}
                >
                  <div style={{
                    width: 20, height: 20, background: "#fff", borderRadius: "50%",
                    position: "absolute", top: 2, left: newTrainer.canAddMember ? 22 : 2,
                    transition: "all 0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                  }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={inviteTrainerLoading}
                  onClick={handleInviteTrainer}>
                  {inviteTrainerLoading ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Send Invite"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddTrainer(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}><Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
      ) : trainers.length === 0 ? (
        <div className="gym-card" style={{ textAlign: "center", padding: "60px 32px" }}>
          <Dumbbell size={48} style={{ color: "var(--text-muted)", margin: "0 auto 16px" }} />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>No Trainers Yet</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: 24 }}>Add trainers to your team to start managing your members.</p>
          {role !== "trainer" && (
            <button className="btn-blue" style={{ justifyContent: "center" }} onClick={() => setShowAddTrainer(true)}>
              <Plus size={16} /> Add Trainer
            </button>
          )}
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
                  {(role === "admin" || role === "superadmin" || role === "gymmanager") && (
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Can Add Members</th>
                  )}
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainers.map((t: any) => (
                  <tr key={t._id || t.id} style={{ borderBottom: "1px solid var(--border-color)", transition: "background 0.1s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-secondary)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(245,158,11,0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>
                          {t.fullName?.slice(0, 2).toUpperCase() || t.name?.slice(0, 2).toUpperCase() || "??"}
                        </div>
                        {t.fullName || t.name}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>{t.email}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span className={`checkin-status ${t.isActive || t.status === 'Active' ? "status-active" : "status-inactive"}`}>
                        {t.isActive || t.status === 'Active' ? "Active" : "Pending Setup"}
                      </span>
                    </td>
                    {(role === "admin" || role === "superadmin" || role === "gymmanager") && (
                      <td style={{ padding: "14px 16px" }}>
                        {(t.isActive || t.status === 'Active') && (
                          <label className="switch" style={{ transform: "scale(0.8)", margin: 0 }}>
                            <input
                              type="checkbox"
                              checked={!!t.canAddMember}
                              onChange={(e) => dispatch(updateTrainerPermissionAction(t._id || t.id, e.target.checked))}
                            />
                            <span className="slider" />
                          </label>
                        )}
                      </td>
                    )}
                    <td style={{ padding: "14px 16px" }}>
                      {(!t.isActive && t.status !== 'Active') && (
                        <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px" }}
                          onClick={() => dispatch(resendTrainerInviteAction(t.email))}>
                          Resend Invite
                        </button>
                      )}
                      {(role === "admin" || role === "superadmin" || role === "gymmanager") && (
                        <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px", borderColor: "#ef4444", color: "#ef4444", marginLeft: "8px" }}
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${t.fullName || t.name}?`)) {
                              dispatch(deleteTrainerAction(t._id || t.id));
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

export default TrainersPanel;
