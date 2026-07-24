import React, { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle, Loader } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordApi } from "../services/apis/authApis";

// ─────────────────────────────────────────────────────────────────────────────
// ResetPassword Page
// ─────────────────────────────────────────────────────────────────────────────

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordApi(token, newPassword, confirmPassword);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-secondary)" }}>
      <div className="gym-card" style={{ maxWidth: 420, width: "100%", padding: "40px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div className="brand-icon-wrapper" style={{ width: 48, height: 48, background: 'none', boxShadow: 'none' }}>
            <img src="/logo.png" alt="Trainix Logo" style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 10 }} />
          </div>
        </div>

        {success ? (
          <div>
            <CheckCircle size={48} style={{ color: "var(--primary)", margin: "0 auto 16px", display: "block" }} />
            <h2 className="page-title" style={{ fontSize: "1.5rem", marginBottom: 8 }}>Password Reset!</h2>
            <p className="page-subtitle" style={{ marginBottom: 24 }}>Your password has been changed successfully. You can now sign in with your new password.</p>
            <button
              className="btn-blue"
              style={{ width: "100%", justifyContent: "center", padding: "12px" }}
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <h2 className="page-title" style={{ fontSize: "1.75rem", marginBottom: 8 }}>Set New Password</h2>
            <p className="page-subtitle" style={{ marginBottom: 32 }}>Enter your new password below.</p>

            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#dc2626", fontSize: "0.9rem", textAlign: "left" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ textAlign: "left" }}>
                <label className="form-label">New Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--text-muted)" }} />
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: 42, paddingRight: 42 }}
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} style={{ position: "absolute", right: 14, top: 12, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}>
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: "left" }}>
                <label className="form-label">Confirm New Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--text-muted)" }} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: 42, paddingRight: 42 }}
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: 14, top: 12, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}>
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-blue"
                style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: 8 }}
                disabled={loading}
              >
                {loading ? <Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

// Named export kept for backward compat
export { ResetPassword };
