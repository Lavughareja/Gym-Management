import React, { useState, useEffect } from "react";
import { Dumbbell, Loader, Lock } from "lucide-react";
import { managerSetupApi } from "../services/apis/authApis";
import { AUTH_TOKEN_KEY } from "../utils/constant";
import { useAppDispatch } from "../utils/reduxHooks";
import { showSnackbar } from "../redux/slices/snackbarSlice";

interface Props {
  onSuccess: (user: any) => void;
  role?: "Manager" | "Trainer";
}

export const ManagerSetup: React.FC<Props> = ({ onSuccess, role = "Manager" }) => {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Extract token from URL
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (t) {
      setToken(t);
    } else {
      setErrorMsg("Invalid or missing invitation token.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) return;

    if (password !== confirmPassword) {
      dispatch(showSnackbar({ message: "Passwords do not match", type: "error" }));
      return;
    }

    setLoading(true);
    try {
      const response = await managerSetupApi({ token, password, confirmPassword });
      const jwtToken = response.data.token;
      if (jwtToken) {
        localStorage.setItem(AUTH_TOKEN_KEY, jwtToken);
      }
      dispatch(showSnackbar({ message: response.data.message || "Setup successful!", type: "success" }));
      
      // Auto login success
      onSuccess({ role: response.data.role });
    } catch (error: any) {
      const message = error?.response?.data?.message || "Setup failed. Please try again.";
      dispatch(showSnackbar({ message, type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  if (errorMsg) {
    return (
      <div className="page-container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-secondary)" }}>
        <div className="gym-card" style={{ maxWidth: 420, width: "100%", padding: "40px", textAlign: "center" }}>
           <h2 className="page-title" style={{ color: "var(--danger)" }}>Error</h2>
           <p className="page-subtitle">{errorMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-secondary)" }}>
      <div className="gym-card" style={{ maxWidth: 420, width: "100%", padding: "40px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div className="brand-icon-wrapper" style={{ width: 48, height: 48 }}>
            <Dumbbell size={24} strokeWidth={2.5} />
          </div>
        </div>
        
        <h2 className="page-title" style={{ fontSize: "1.75rem", marginBottom: 8 }}>{role} Setup</h2>
        <p className="page-subtitle" style={{ marginBottom: 32 }}>Set your password to activate your account</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ textAlign: "left" }}>
            <label className="form-label">Create Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--text-muted)" }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: 42 }}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
          </div>

          <div style={{ textAlign: "left" }}>
            <label className="form-label">Confirm Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--text-muted)" }} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: 42 }}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-blue"
            style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: 8 }}
            disabled={loading}
          >
            {loading ? <Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Activate Account"}
          </button>
        </form>
      </div>
    </div>
  );
};
