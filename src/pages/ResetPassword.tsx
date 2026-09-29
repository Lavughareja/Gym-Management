import React, { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle, Loader } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordApi } from "../services/apis/authApis";

// ─────────────────────────────────────────────────────────────────────────────
// ResetPassword Page
// ─────────────────────────────────────────────────────────────────────────────
import "./ResetPassword.css";
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
  return <div className="reset-password-inline-1">
      <div className="gym-card reset-password-inline-2">
        <div className="reset-password-inline-3">
          <div className="brand-icon-wrapper reset-password-inline-4">
            <img src="/logo.png" alt="Trainix Logo" className="reset-password-inline-5" />
          </div>
        </div>

        {success ? <div>
            <CheckCircle size={48} className="reset-password-inline-6" />
            <h2 className="page-title reset-password-inline-7">Password Reset!</h2>
            <p className="page-subtitle reset-password-inline-8">Your password has been changed successfully. You can now sign in with your new password.</p>
            <button className="btn-blue reset-password-inline-9" onClick={() => navigate("/login")}>
              Back to Login
            </button>
          </div> : <>
            <h2 className="page-title reset-password-inline-10">Set New Password</h2>
            <p className="page-subtitle reset-password-inline-11">Enter your new password below.</p>

            {error && <div className="reset-password-inline-12">
                {error}
              </div>}

            <form onSubmit={handleSubmit} className="reset-password-inline-13">
              <div className="reset-password-inline-14">
                <label className="form-label">New Password</label>
                <div className="reset-password-inline-15">
                  <Lock size={18} className="reset-password-inline-16" />
                  <input type={showNew ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="form-input reset-password-inline-17" placeholder="••••••••" required />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="reset-password-inline-18">
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="reset-password-inline-19">
                <label className="form-label">Confirm New Password</label>
                <div className="reset-password-inline-20">
                  <Lock size={18} className="reset-password-inline-21" />
                  <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-input reset-password-inline-22" placeholder="••••••••" required />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="reset-password-inline-23">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-blue reset-password-inline-24" disabled={loading}>
                {loading ? <Loader size={18} className="reset-password-inline-25" /> : "Reset Password"}
              </button>
            </form>
          </>}
      </div>
    </div>;
};
export default ResetPassword;

// Named export kept for backward compat
export { ResetPassword };