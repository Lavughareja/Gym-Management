import React, { useState, useEffect } from "react";
import { Loader, Lock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { managerSetupApi } from "../services/apis/authApis";
import { AUTH_TOKEN_KEY } from "../utils/constant";
import { useAppDispatch } from "../utils/reduxHooks";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { showSnackbar } from "../redux/slices/snackbarSlice";

// ─────────────────────────────────────────────────────────────────────────────
// ManagerSetup / TrainerSetup Page
// ─────────────────────────────────────────────────────────────────────────────
import "./ManagerSetup.css";
interface Props {
  role?: "Manager" | "Trainer";
}
export const ManagerSetup: React.FC<Props> = ({
  role = "Manager"
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const {
    branding
  } = useSelector((state: RootState) => state.whiteLabel);
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
      dispatch(showSnackbar({
        message: "Please fill all fields",
        type: "error"
      }));
      return;
    }
    if (password !== confirmPassword) {
      dispatch(showSnackbar({
        message: "Passwords do not match",
        type: "error"
      }));
      return;
    }
    setLoading(true);
    try {
      const response = await managerSetupApi({
        token,
        password,
        confirmPassword
      });
      dispatch(showSnackbar({
        message: response.data.message || "Setup successful! Please login with your credentials.",
        type: "success"
      }));

      // Navigate to login so they can log in with their new credentials,
      // without forcefully logging out the current session (if owner is testing).
      navigate("/login", {
        replace: true
      });
    } catch (error: any) {
      const message = error?.response?.data?.message || "Setup failed. Please try again.";
      dispatch(showSnackbar({
        message,
        type: "error"
      }));
    } finally {
      setLoading(false);
    }
  };
  if (errorMsg) {
    return <div className="page-container manager-setup-inline-1">
        <div className="gym-card manager-setup-inline-2">
          <h2 className="page-title manager-setup-inline-3">Error</h2>
          <p className="page-subtitle">{errorMsg}</p>
        </div>
      </div>;
  }
  return <div className="page-container manager-setup-inline-4">
      <div className="gym-card manager-setup-inline-5">
        <div className="manager-setup-inline-6">
          <div className="brand-icon-wrapper manager-setup-inline-7">
            {branding.logoUrl ? <img src={branding.logoUrl} alt={branding.gymName} className="manager-setup-inline-8" /> : <img src="/logo.png" alt="Trainix Logo" className="manager-setup-inline-9" />}
          </div>
        </div>
        
        <h2 className="page-title manager-setup-inline-10">{role} Setup</h2>
        <p className="page-subtitle manager-setup-inline-11">Set your password to activate your {branding.gymName} account</p>

        <form onSubmit={handleSubmit} className="manager-setup-inline-12">
          <div className="manager-setup-inline-13">
            <label className="form-label">Create Password</label>
            <div className="manager-setup-inline-14">
              <Lock size={18} className="manager-setup-inline-15" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input manager-setup-inline-16" placeholder="••••••••" required minLength={8} />
            </div>
          </div>

          <div className="manager-setup-inline-17">
            <label className="form-label">Confirm Password</label>
            <div className="manager-setup-inline-18">
              <Lock size={18} className="manager-setup-inline-19" />
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-input manager-setup-inline-20" placeholder="••••••••" required minLength={8} />
            </div>
          </div>

          <button type="submit" className="btn-blue manager-setup-inline-21" disabled={loading}>
            {loading ? <Loader size={18} className="manager-setup-inline-22" /> : "Activate Account"}
          </button>
        </form>
      </div>
    </div>;
};
export default ManagerSetup;