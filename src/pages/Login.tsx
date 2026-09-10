import React, { useState, useEffect } from "react";
import { ArrowLeft, Loader, Mail, Lock, Eye, EyeOff, X, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../utils/reduxHooks";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { loginAction } from "../redux/actions/authActions";
import { forgotPasswordApi } from "../services/apis/authApis";
import { resolveWhiteLabelByCode } from "../services/apis/whiteLabelApis";
import { setGymBranding, resetBranding } from "../redux/slices/whiteLabelSlice";
import { requestNotificationPermission } from "../utils/firebase";

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Login Page
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { branding } = useSelector((state: RootState) => state.whiteLabel);
  
  const [step, setStep] = useState<1 | 2>(branding?.gymId ? 2 : 1);
  const [gymCode, setGymCode] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeError, setCodeError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Forgot Password modal state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotError, setForgotError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    const action = await dispatch(loginAction({ email, password }));
    setLoading(false);

    if (loginAction.fulfilled.match(action)) {
      const payload = action.payload as any;
      const role: string = payload?.role || "";

      // Save to localStorage for ProtectedRoute
      const dashUser = {
        ownerName: payload?.fullName || "User",
        email: payload?.email || email,
        role,
        canAddMember: payload?.canAddMember || false,
        _id: payload?._id,
        gymId: payload?.gymId,
      };
      localStorage.setItem("dashUser", JSON.stringify(dashUser));

      // Navigate based on role
      if (role === "member") {
        navigate("/member/overview", { replace: true });
      } else {
        navigate("/dashboard/overview", { replace: true });
      }

      // Register device for push notifications (fire-and-forget, non-blocking)
      requestNotificationPermission().catch(() => {});
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gymCode) return;
    setCodeLoading(true);
    setCodeError("");
    try {
      const res = await resolveWhiteLabelByCode(gymCode);
      dispatch(setGymBranding(res.data));
      setStep(2);
    } catch (err: any) {
      setCodeError(err?.response?.data?.message || "Invalid gym code. Please try again.");
    } finally {
      setCodeLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotLoading(true);
    try {
      await forgotPasswordApi(forgotEmail);
      setForgotSent(true);
    } catch (err: any) {
      setForgotError(err?.response?.data?.message || "Failed to send reset link. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-secondary)" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="btn-blue-outline"
        style={{ position: "absolute", top: 24, left: 24, padding: "8px 16px" }}
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="gym-card" style={{ maxWidth: 420, width: "100%", padding: "40px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div className="brand-icon-wrapper" style={{ width: 48, height: 48, background: 'none', boxShadow: 'none' }}>
            {step === 2 && branding.logoUrl ? (
              <img src={branding.logoUrl} alt={branding.gymName} style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 10 }} />
            ) : (
              <img src="/logo.png" alt="Trainix Logo" style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 10 }} />
            )}
          </div>
        </div>
        
        <h2 className="page-title" style={{ fontSize: "1.75rem", marginBottom: 8 }}>
          {step === 1 ? "Enter Gym Code" : "Welcome Back"}
        </h2>
        <p className="page-subtitle" style={{ marginBottom: step === 2 && branding.tagline ? 8 : 32 }}>
          {step === 1 ? "Please enter your gym's code to continue" : `Sign in to your ${branding.gymName} account`}
        </p>
        {step === 2 && branding.tagline && <p className="page-subtitle" style={{ marginBottom: 32, fontSize: "0.85rem" }}>{branding.tagline}</p>}

        {step === 1 ? (
          <form onSubmit={handleCodeSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ textAlign: "left" }}>
              <label className="form-label">Gym Code</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={gymCode}
                  onChange={(e) => setGymCode(e.target.value.toUpperCase())}
                  className="form-input"
                  placeholder="e.g. GYM123"
                  required
                />
              </div>
              {codeError && <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: 4 }}>{codeError}</p>}
            </div>
            <button
              type="submit"
              className="btn-blue"
              style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: 8 }}
              disabled={codeLoading}
            >
              {codeLoading ? <Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ textAlign: "left" }}>
              <label className="form-label">Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--text-muted)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: 42 }}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div style={{ textAlign: "left" }}>
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--text-muted)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: 42, paddingRight: 42 }}
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14, top: 12, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ textAlign: "right", marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => { setShowForgot(true); setForgotSent(false); setForgotError(""); setForgotEmail(""); }}
                  style={{ fontSize: "0.8rem", color: "var(--primary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-blue"
              style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: 8 }}
              disabled={loading}
            >
              {loading ? <Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Sign In"}
            </button>
            
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <button
                type="button"
                onClick={() => { setStep(1); dispatch(resetBranding()); }}
                style={{ fontSize: "0.85rem", color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}
              >
                Change Gym Code
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="gym-card" style={{ width: "100%", maxWidth: 400, padding: "32px", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>Reset Password</h3>
              <button onClick={() => setShowForgot(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, borderRadius: 6 }}>
                <X size={20} />
              </button>
            </div>

            {forgotSent ? (
              <div style={{ textAlign: "center", padding: "10px 0 16px" }}>
                <CheckCircle size={48} style={{ color: "var(--primary)", margin: "0 auto 16px", display: "block" }} />
                <p style={{ fontWeight: 600, marginBottom: 8 }}>Reset link sent!</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 20 }}>
                  Check your email <strong>{forgotEmail}</strong> for the password reset link. It expires in 1 hour.
                </p>
                <button className="btn-blue-outline" style={{ width: "100%", justifyContent: "center" }} onClick={() => setShowForgot(false)}>
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 20 }}>
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                {forgotError && (
                  <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#dc2626", fontSize: "0.85rem" }}>
                    {forgotError}
                  </div>
                )}
                <div style={{ marginBottom: 16 }}>
                  <label className="form-label">Email Address</label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} style={{ position: "absolute", left: 12, top: 12, color: "var(--text-muted)" }} />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: 36 }}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button type="button" className="btn-blue-outline" style={{ flex: 1, justifyContent: "center", padding: "10px" }} onClick={() => setShowForgot(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-blue" style={{ flex: 1, justifyContent: "center", padding: "10px", display: "flex", alignItems: "center", gap: "8px" }} disabled={forgotLoading}>
                    {forgotLoading ? <><Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending...</> : "Send Link"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

// Named export kept for backward compatibility with any lazy imports
export { Login };



