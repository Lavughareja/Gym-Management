import React, { useState } from "react";
import { Lock, Eye, EyeOff, X, Loader } from "lucide-react";
import { changePasswordApi } from "../../services/apis/authApis";

interface Props {
  onClose: () => void;
  onSuccess?: () => void;
}

const ChangePasswordModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
      <div className="gym-card" style={{ width: "100%", maxWidth: 420, padding: "32px", position: "relative" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.2rem", margin: 0 }}>Change Password</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, borderRadius: 6 }}>
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <span style={{ fontSize: "1.5rem" }}>✓</span>
            </div>
            <p style={{ fontWeight: 600, color: "#16a34a" }}>Password changed successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#dc2626", fontSize: "0.85rem" }}>
                {error}
              </div>
            )}

            {inputField("Old Password", oldPassword, setOldPassword, showOld, setShowOld)}
            {inputField("New Password", newPassword, setNewPassword, showNew, setShowNew)}
            {inputField("Confirm New Password", confirmPassword, setConfirmPassword, showConfirm, setShowConfirm)}

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button type="button" className="btn-blue-outline" style={{ flex: 1, justifyContent: "center", padding: "10px" }} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-blue" style={{ flex: 1, justifyContent: "center", padding: "10px" }} disabled={loading}>
                {loading ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Update Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;
