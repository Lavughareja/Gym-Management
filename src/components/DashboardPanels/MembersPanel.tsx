import React, { useState } from "react";
import { Upload, Plus, Search, X, Fingerprint, Copy, Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { addMemberAction, bulkImportMembersAction, fetchMembersAction } from "../../redux/actions/memberActions";
import { showSnackbar } from "../../redux/slices/snackbarSlice";
import { updateMemberStatus } from "../../redux/slices/memberSlice";

interface Props {
  role: string;
  canAddMember: boolean;
  showAddMember: boolean;
  setShowAddMember: (show: boolean) => void;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000,
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20
};

const MembersPanel: React.FC<Props> = ({ role, canAddMember, showAddMember, setShowAddMember }) => {
  const dispatch = useAppDispatch();
  const { members, loading } = useAppSelector((state) => state.member);

  const [memberSearch, setMemberSearch] = useState("");
  const [newMember, setNewMember] = useState({ name: "", planId: "", durationMonths: "1", extraDays: "0", email: "", mobileNo: "", secondaryPhone: "", emergencyNumber: "", bloodGroup: "", amountPaid: "", startDate: "", dateOfBirth: "" });
  const [addingMember, setAddingMember] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [importing, setImporting] = useState(false);

  const handleAddMember = async () => {
    if (!newMember.name.trim() || !newMember.email.trim() || !newMember.durationMonths || !(newMember as any).startDate) {
      dispatch(showSnackbar({ message: "Please fill all required fields.", type: "error" }));
      return;
    }
    setAddingMember(true);
    const success = await dispatch(addMemberAction({
      fullName: newMember.name,
      email: newMember.email,
      mobileNo: newMember.mobileNo || "0000000000",
      durationMonths: newMember.durationMonths,
      extraDays: (newMember as any).extraDays,
      secondaryPhone: (newMember as any).secondaryPhone,
      emergencyNumber: (newMember as any).emergencyNumber,
      bloodGroup: (newMember as any).bloodGroup,
      amountPaid: (newMember as any).amountPaid,
      startDate: (newMember as any).startDate,
      dateOfBirth: (newMember as any).dateOfBirth,
    }));
    setAddingMember(false);
    if (success) {
      setShowAddMember(false);
      setNewMember({ name: "", planId: "", durationMonths: "1", extraDays: "0", email: "", mobileNo: "", secondaryPhone: "", emergencyNumber: "", bloodGroup: "", amountPaid: "", startDate: "", dateOfBirth: "" });
    }
  };

  const handleImportMembers = async () => {
    if (!importFile) return;
    setImporting(true);
    const formData = new FormData();
    formData.append("file", importFile);
    const success = await dispatch(bulkImportMembersAction(formData));
    setImporting(false);
    if (success) {
      setShowImportModal(false);
      setImportFile(null);
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Members</h2>
          <p className="page-subtitle">{members.length} total members registered</p>
        </div>
        {(canAddMember || role === "admin" || role === "superadmin") && (
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-blue-outline" onClick={() => setShowImportModal(true)}>
              <Upload size={16} /> Import Members
            </button>
            <button className="btn-blue" onClick={() => setShowAddMember(true)}>
              <Plus size={16} /> Add Member
            </button>
          </div>
        )}
      </div>

      <div className="gym-card" style={{ padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <Search size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
        <input
          value={memberSearch}
          onChange={e => setMemberSearch(e.target.value)}
          placeholder="Search members by name, email, phone or plan…"
          style={{ border: "none", outline: "none", background: "transparent", fontSize: "0.9rem", color: "var(--text-primary)", width: "100%" }}
        />
      </div>

      {showAddMember && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add New Member</h3>
              <button onClick={() => setShowAddMember(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Full Name", field: "name", placeholder: "John Doe", type: "text" },
                { label: "Email", field: "email", placeholder: "john@example.com", type: "email" },
                { label: "Mobile", field: "mobileNo", placeholder: "1234567890", type: "tel" },
                { label: "Secondary Phone (Optional)", field: "secondaryPhone", placeholder: "0987654321", type: "tel" },
                { label: "Emergency Number (Optional)", field: "emergencyNumber", placeholder: "1122334455", type: "tel" },
                { label: "Blood Group (Optional)", field: "bloodGroup", placeholder: "O+", type: "text" },
                { label: "Date of Birth", field: "dateOfBirth", placeholder: "", type: "date" },
              ].map(({ label, field, placeholder, type }) => (
                <div key={field}>
                  <label className="form-label">{label}</label>
                  <input
                    type={type}
                    value={(newMember as any)[field]}
                    onChange={e => setNewMember({ ...newMember, [field]: e.target.value })}
                    placeholder={placeholder}
                    className="form-input"
                  />
                </div>
              ))}
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    value={(newMember as any).startDate}
                    onChange={e => setNewMember({ ...newMember, startDate: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Duration (Months)</label>
                  <input
                    type="number"
                    min="1"
                    value={newMember.durationMonths}
                    onChange={e => setNewMember({ ...newMember, durationMonths: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Extra Days (Optional)</label>
                  <input
                    type="number"
                    min="0"
                    value={(newMember as any).extraDays}
                    onChange={e => setNewMember({ ...newMember, extraDays: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Calculated End Date</label>
                  <div style={{ padding: "10px 12px", background: "var(--bg-primary)", borderRadius: 6, border: "1px solid var(--border-color)", fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {(() => {
                      if (!(newMember as any).startDate || !newMember.durationMonths) return "-";
                      const end = new Date((newMember as any).startDate);
                      end.setMonth(end.getMonth() + Number(newMember.durationMonths));
                      if ((newMember as any).extraDays) end.setDate(end.getDate() + Number((newMember as any).extraDays));
                      return end.toLocaleDateString();
                    })()}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label className="form-label">Amount Paid</label>
                <input
                  type="number"
                  value={(newMember as any).amountPaid}
                  onChange={e => setNewMember({ ...newMember, amountPaid: e.target.value })}
                  placeholder="e.g. 5000"
                  className="form-input"
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={addingMember}
                  onClick={handleAddMember}>
                  {addingMember ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Add Member"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddMember(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Import Members via CSV</h3>
              <button onClick={() => { setShowImportModal(false); setImportFile(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                Upload a CSV file containing members data. Make sure it follows the required format.
                <br /><a href="#" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>Download Sample CSV</a>
              </p>
              <div>
                <label className="form-label">Select CSV File</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={e => setImportFile(e.target.files?.[0] || null)}
                  className="form-input"
                  style={{ padding: "8px" }}
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={!importFile || importing}
                  onClick={handleImportMembers}>
                  {importing ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Upload"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => { setShowImportModal(false); setImportFile(null); }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMember && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 600, width: "100%", padding: "32px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Member Profile</h3>
              <button onClick={() => setSelectedMember(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div className="checkin-avatar" style={{ width: 64, height: 64, fontSize: "1.5rem", background: "var(--primary-light)", color: "var(--primary)" }}>
                {selectedMember.avatar}
              </div>
              <div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 4px 0", color: "var(--text-primary)" }}>{selectedMember.name}</h4>
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{selectedMember.plan} · Joined {selectedMember.joined}</div>
              </div>
            </div>
            <div style={{ background: "var(--bg-secondary)", padding: "16px", borderRadius: "12px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-primary)", fontWeight: 600 }}>
                  <Fingerprint size={18} style={{ color: "var(--primary)" }} /> Biometric ID
                </div>
                <span className={`checkin-status status-active`}>Registered</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {selectedMember.biometricId || Math.floor(100 + Math.random() * 900)}
                </span>
                <button
                  style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "0.875rem", fontWeight: 600 }}
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMember.biometricId || "105");
                    dispatch(showSnackbar({ message: "Copied to clipboard", type: "success" }));
                  }}
                >
                  <Copy size={14} /> Copy
                </button>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 8 }}>
                Enter this ID into the biometric device to register the member's fingerprint/face.
              </p>
            </div>
            <button className="btn-blue" style={{ width: "100%", justifyContent: "center", marginTop: 20 }} onClick={() => setSelectedMember(null)}>Close</button>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}><Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
      ) : (
        <div className="gym-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                  {["Member", "Plan", "Status", "Joined", "Expires On", ""].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.filter((m: any) => 
                  m.name.toLowerCase().includes(memberSearch.toLowerCase()) || 
                  m.plan.toLowerCase().includes(memberSearch.toLowerCase()) ||
                  (m.email && m.email.toLowerCase().includes(memberSearch.toLowerCase())) ||
                  (m.mobileNo && m.mobileNo.includes(memberSearch))
                ).map((m: any, i: number) => (
                  <tr key={m.id} style={{ borderBottom: "1px solid var(--border-color)", transition: "background 0.1s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-secondary)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div className="checkin-avatar" style={{ background: "var(--primary-light)", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 700 }}>{m.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{m.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>#{String(i + 1).padStart(4, "0")}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>{m.plan}</td>
                    <td style={{ padding: "14px 16px" }}>
                      {(() => {
                        let derivedStatus = m.status;
                        if (m.planEndDate) {
                          const today = new Date();
                          today.setHours(0,0,0,0);
                          const endDate = new Date(m.planEndDate);
                          derivedStatus = endDate >= today ? "Active" : "Inactive";
                        }
                        return (
                          <span className={`checkin-status ${derivedStatus === "Active" ? "status-active" : "status-inactive"}`}>{derivedStatus}</span>
                        );
                      })()}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{m.joined}</td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{m.planEndDate ? new Date(m.planEndDate).toLocaleDateString() : "-"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setSelectedMember(m)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.8rem", padding: "4px 8px", borderRadius: 6, transition: "background 0.1s", fontWeight: 600 }}>
                          View
                        </button>
                      </div>
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

export default MembersPanel;
