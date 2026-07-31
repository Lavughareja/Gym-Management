import React, { useState, useEffect } from "react";
import { Loader, Lock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { managerSetupApi } from "../services/apis/authApis";
import { AUTH_TOKEN_KEY } from "../utils/constant";
import { useAppDispatch } from "../utils/reduxHooks";
import { showSnackbar } from "../redux/slices/snackbarSlice";

// ─────────────────────────────────────────────────────────────────────────────
// ManagerSetup / TrainerSetup Page
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  role?: "Manager" | "Trainer";
}

export const ManagerSetup: React.FC<Props> = ({ role = "Manager" }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const t = searchParams.get("token");
    if (t) {
      setToken(t);
    } else {
      setErrorMsg("Invalid or missing invitation token.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      dispatch(showSnackbar({ message: "Please fill all fields", type: "error" }));
      return;
    }

    if (password !== confirmPassword) {
      dispatch(showSnackbar({ message: "Passwords do not match", type: "error" }));
      return;
    }

    setLoading(true);
    try {
      const response = await managerSetupApi({ token, password, confirmPassword });
      
      dispatch(showSnackbar({ message: response.data.message || "Setup successful! Please login with your credentials.", type: "success" }));

      // Navigate to login so they can log in with their new credentials,
      // without forcefully logging out the current session (if owner is testing).
      navigate("/login", { replace: true });
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
          <div className="brand-icon-wrapper" style={{ width: 48, height: 48, background: 'none', boxShadow: 'none' }}>
            <img src="/logo.png" alt="Trainix Logo" style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 10 }} />
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

export default ManagerSetup;
