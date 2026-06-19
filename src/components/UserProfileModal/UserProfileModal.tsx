import React, { useState } from "react";
import { User, KeyRound, X, Mail, Shield, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { changePasswordApi } from "../../services/apis/authApis";

interface Props {
  user: {
    fullName: string;
    email: string;
    role: string;
  };
  onClose: () => void;
  onSuccess?: () => void;
}

const UserProfileModal: React.FC<Props> = ({ user, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (oldPassword === newPassword) {
      setError("New password cannot be the same as the old password.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await changePasswordApi(oldPassword, newPassword, confirmPassword);
      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputField = (
    label: string,
    value: string,
    setValue: (v: string) => void,
    show: boolean,
    setShow: (v: boolean) => void,
    placeholder = "••••••••"
  ) => (
    <div style={{ textAlign: "left", marginBottom: 16 }}>
      <label className="form-label">{label}</label>
      <div style={{ position: "relative" }}>
        <Lock size={16} style={{ position: "absolute", left: 12, top: 12, color: "var(--text-muted)" }} />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="form-input"
          style={{ paddingLeft: 38, paddingRight: 38, fontSize: "0.9rem" }}
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{ position: "absolute", right: 12, top: 12, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="gym-card" style={{ width: "100%", maxWidth: 650, padding: 0, position: "relative", overflow: "hidden", display: "flex", flexDirection: "row", minHeight: 420 }}>
        
        {/* Left Sidebar (Tabs) */}
        <div style={{ width: 220, background: "var(--bg-secondary)", borderRight: "1px solid var(--border-color)", padding: "24px 16px", display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.2rem", margin: "0 0 32px 8px" }}>My Profile</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              onClick={() => setActiveTab("profile")}
              style={{
                background: activeTab === "profile" ? "var(--primary-light)" : "none",
                border: "none", cursor: "pointer", padding: "12px 16px",
                fontWeight: 600, fontSize: "0.95rem", borderRadius: 8,
                color: activeTab === "profile" ? "var(--primary)" : "var(--text-secondary)",
                display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                transition: "all 0.2s"
              }}
            >
              <User size={18} /> User Details
            </button>
            <button
              onClick={() => setActiveTab("password")}
              style={{
                background: activeTab === "password" ? "var(--primary-light)" : "none",
                border: "none", cursor: "pointer", padding: "12px 16px",
                fontWeight: 600, fontSize: "0.95rem", borderRadius: 8,
                color: activeTab === "password" ? "var(--primary)" : "var(--text-secondary)",
                display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                transition: "all 0.2s"
              }}
            >
              <KeyRound size={18} /> Change Password
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div style={{ flex: 1, padding: "32px", position: "relative", display: "flex", flexDirection: "column" }}>
          <div 
            onClick={onClose} 
            style={{ 
              position: "absolute", top: 16, right: 16, 
              width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text-secondary)", 
              borderRadius: "50%", background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--border-color)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--bg-secondary)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <X size={18} strokeWidth={2.5} />
          </div>
          
          <h4 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 24, marginTop: 0 }}>
            {activeTab === "profile" ? "User Information" : "Security"}
          </h4>

          {activeTab === "profile" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--primary-hover))", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 700 }}>
                  {user.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{user.fullName}</h4>
                  <span style={{ fontSize: "0.85rem", color: "var(--primary)", background: "var(--primary-light)", padding: "4px 8px", borderRadius: 12, display: "inline-block", marginTop: 4, fontWeight: 600 }}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>

              <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--bg-primary)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                    <User size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500, marginBottom: 2 }}>Full Name</div>
                    <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600 }}>{user.fullName}</div>
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--border-color)", margin: "0 4px" }} />

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--bg-primary)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                    <Mail size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500, marginBottom: 2 }}>Email Address</div>
                    <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600 }}>{user.email}</div>
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--border-color)", margin: "0 4px" }} />

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--bg-primary)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                    <Shield size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500, marginBottom: 2 }}>Account Role</div>
                    <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600 }}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {success ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <span style={{ fontSize: "1.5rem", color: "#16a34a" }}>✓</span>
                  </div>
                  <p style={{ fontWeight: 600, color: "#16a34a", fontSize: "1.1rem" }}>Password changed successfully!</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: 8 }}>You can now use your new password to sign in.</p>
                </div>
              ) : (
                <form onSubmit={handlePasswordSubmit}>
                  {error && (
                    <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", marginBottom: 20, color: "#dc2626", fontSize: "0.85rem" }}>
                      {error}
                    </div>
                  )}

                  {inputField("Old Password", oldPassword, setOldPassword, showOld, setShowOld)}
                  {inputField("New Password", newPassword, setNewPassword, showNew, setShowNew)}
                  {inputField("Confirm New Password", confirmPassword, setConfirmPassword, showConfirm, setShowConfirm)}

                  <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                    <button type="submit" className="btn-blue" style={{ flex: 1, justifyContent: "center", padding: "12px", display: "flex", alignItems: "center", gap: "8px" }} disabled={loading}>
                      {loading ? <><Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> Updating...</> : "Update Password"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
