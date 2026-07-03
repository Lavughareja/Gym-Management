import React, { useState, useEffect } from "react";
import { Search, X, Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { fetchHealthDataAction, uploadBmiReportAction } from "../../redux/actions/healthActions";

const overlayStyle: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000,
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20
};

const BmiPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { members, loading: isMembersLoading } = useAppSelector((state) => state.member);
  const { bmiPhotos, dietPlans, loading: isHealthLoading } = useAppSelector((state) => state.health);

  const [bmiMemberSearch, setBmiMemberSearch] = useState("");
  const [selectedBmiMember, setSelectedBmiMember] = useState<any>(null);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string>("Weight Loss");
  const [isUploadingBmi, setIsUploadingBmi] = useState(false);

  const filteredBmiMembers = members.filter((m: any) =>
    m.name.toLowerCase().includes(bmiMemberSearch.toLowerCase()) ||
    m.email?.toLowerCase().includes(bmiMemberSearch.toLowerCase()) ||
    m.mobileNo?.includes(bmiMemberSearch)
  );

  useEffect(() => {
    if (selectedBmiMember) {
      dispatch(fetchHealthDataAction(selectedBmiMember.id.toString()));
    }
  }, [selectedBmiMember, dispatch]);

  const handleUploadBmi = async () => {
    if (!selectedPhotoFile || !selectedBmiMember) return;
    setIsUploadingBmi(true);
    const formData = new FormData();
    formData.append("image", selectedPhotoFile);
    formData.append("memberId", selectedBmiMember.id.toString());
    formData.append("goal", selectedGoal);

    const success = await dispatch(uploadBmiReportAction(formData, selectedBmiMember.id.toString()));
    if (success) {
      setSelectedPhotoFile(null);
    }
    setIsUploadingBmi(false);
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">BMI & Diet Reports</h2>
          <p className="page-subtitle">Manage health reports and AI diet plans for your members</p>
        </div>
      </div>

      <div className="gym-card" style={{ padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <Search size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
        <input
          value={bmiMemberSearch}
          onChange={e => setBmiMemberSearch(e.target.value)}
          placeholder="Search members by name, email, or phone…"
          style={{ border: "none", outline: "none", background: "transparent", fontSize: "0.9rem", color: "var(--text-primary)", width: "100%" }}
        />
      </div>

      {selectedBmiMember && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 600, width: "100%", padding: "32px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Health & Diet: {selectedBmiMember.name}</h3>
              <button onClick={() => setSelectedBmiMember(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>

            <div>
              {isHealthLoading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}><Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ border: "1px dashed var(--border-color)", padding: 16, borderRadius: 8 }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>Upload New BMI Report</h4>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <input type="file" accept="image/*" onChange={e => setSelectedPhotoFile(e.target.files?.[0] || null)} style={{ flex: 1, fontSize: "0.85rem" }} />
                      <button className="btn-blue" disabled={isUploadingBmi || !selectedPhotoFile} onClick={handleUploadBmi} style={{ padding: "6px 12px" }}>
                        {isUploadingBmi ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Upload"}
                      </button>
                    </div>
                  </div>

                  {bmiPhotos.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>Latest BMI Report</h4>
                      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
                        <img src={bmiPhotos[0].reportImageUrl.startsWith("http") ? bmiPhotos[0].reportImageUrl : `http://localhost:5000${bmiPhotos[0].reportImageUrl}`} alt="BMI Report" style={{ width: 200, height: "auto", borderRadius: 8, border: "1px solid var(--border-color)" }} />
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 8 }}>Uploaded on: {new Date(bmiPhotos[0].createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {dietPlans.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>Current Diet Plan</h4>
                      <div style={{ background: "var(--bg-secondary)", padding: 16, borderRadius: 8, border: "1px solid var(--border-color)" }}>
                        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                          <div style={{ flex: 1 }}><strong style={{ color: "var(--primary)" }}>Calories:</strong> {dietPlans[0].macros?.calories || "N/A"}</div>
                          <div style={{ flex: 1 }}><strong style={{ color: "var(--primary)" }}>Protein:</strong> {dietPlans[0].macros?.protein || "N/A"}</div>
                          <div style={{ flex: 1 }}><strong style={{ color: "var(--primary)" }}>Carbs:</strong> {dietPlans[0].macros?.carbs || "N/A"}</div>
                        </div>
                        <div style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: 8 }}>
                          <div><strong style={{ color: "var(--primary)" }}>Breakfast:</strong> {dietPlans[0].breakfast || "N/A"}</div>
                          <div><strong style={{ color: "var(--primary)" }}>Lunch:</strong> {dietPlans[0].lunch || "N/A"}</div>
                          <div><strong style={{ color: "var(--primary)" }}>Dinner:</strong> {dietPlans[0].dinner || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button className="btn-blue" style={{ width: "100%", justifyContent: "center", marginTop: 20 }} onClick={() => setSelectedBmiMember(null)}>Close</button>
          </div>
        </div>
      )}

      <div className="gym-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Member</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Plan</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Joined</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBmiMembers.map((member: any) => (
                <tr key={member.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div className="checkin-avatar" style={{ background: "var(--primary-light)", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 700 }}>
                        {member.avatar}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>
                        {member.name}
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>{member.email} | {member.mobileNo}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>{member.plan}</td>
                  <td style={{ padding: "14px 16px" }}>
                    {(() => {
                      let derivedStatus = member.status;
                      if (member.planEndDate) {
                        const today = new Date();
                        today.setHours(0,0,0,0);
                        const endDate = new Date(member.planEndDate);
                        derivedStatus = endDate >= today ? "Active" : "Inactive";
                      }
                      return (
                        <span className={`checkin-status ${derivedStatus === "Active" ? "status-active" : "status-inactive"}`}>{derivedStatus}</span>
                      );
                    })()}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>{member.joined}</td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 10px" }} onClick={() => setSelectedBmiMember(member)}>Manage Health</button>
                  </td>
                </tr>
              ))}
              {filteredBmiMembers.length === 0 && !isMembersLoading && (
                <tr><td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>No members found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BmiPanel;
