import React, { useState } from "react";
import { ArrowLeft, Dumbbell, Loader, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "../utils/reduxHooks";
import { loginAction } from "../redux/actions/authActions";

interface Props {
  onSuccess: (user: any) => void;
  onBack: () => void;
}

export const Login: React.FC<Props> = ({ onSuccess, onBack }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    const action = await dispatch(loginAction({ email, password }));
    setLoading(false);

    if (loginAction.fulfilled.match(action)) {
      onSuccess(action.payload);
    }
  };

  return (
    <div className="page-container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-secondary)" }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="btn-blue-outline"
        style={{ position: "absolute", top: 24, left: 24, padding: "8px 16px" }}
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="gym-card" style={{ maxWidth: 420, width: "100%", padding: "40px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div className="brand-icon-wrapper" style={{ width: 48, height: 48 }}>
            <Dumbbell size={24} strokeWidth={2.5} />
          </div>
        </div>
        
        <h2 className="page-title" style={{ fontSize: "1.75rem", marginBottom: 8 }}>Welcome Back</h2>
        <p className="page-subtitle" style={{ marginBottom: 32 }}>Sign in to your IronPulse account</p>

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
                placeholder="••••••••"
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
              <a href="#" style={{ fontSize: "0.8rem", color: "var(--primary)", textDecoration: "none" }}>Forgot Password?</a>
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
        </form>
      </div>
    </div>
  );
};
