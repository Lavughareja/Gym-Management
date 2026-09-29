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
import "./Login.css";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    branding
  } = useSelector((state: RootState) => state.whiteLabel);
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
    const action = await dispatch(loginAction({
      email,
      password
    }));
    setLoading(false);
    if (loginAction.fulfilled.match(action)) {
      const payload = action.payload as any;
      const role: string = payload?.role || "";

      // Save to localStorage for ProtectedRoute
      const dashUser = {
        ownerName: payload?.fullName || "User",
        email: payload?.email || email,
        role,
        paymentStatus: payload?.paymentStatus,
        planEndDate: payload?.planEndDate,
        canAddMember: payload?.canAddMember || false,
        _id: payload?._id,
        gymId: payload?.gymId
      };
      localStorage.setItem("dashUser", JSON.stringify(dashUser));

      // Navigate based on role
      if (role === "member") {
        navigate("/member/overview", {
          replace: true
        });
      } else {
        navigate("/dashboard/overview", {
          replace: true
        });
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
  return <div className="page-container login-inline-1">
      {/* Back Button */}
      <button onClick={() => navigate("/")} className="btn-blue-outline login-inline-2">
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="gym-card login-inline-3">
        <div className="login-inline-4">
          <div className="brand-icon-wrapper login-inline-5">
            {step === 2 && branding.logoUrl ? <img src={branding.logoUrl} alt={branding.gymName} className="login-inline-6" /> : <img src="/logo.png" alt="Trainix Logo" className="login-inline-7" />}
          </div>
        </div>
        
        <h2 className="page-title login-inline-8">
          {step === 1 ? "Enter Gym Code" : "Welcome Back"}
        </h2>
        <p className="page-subtitle" style={{
        marginBottom: step === 2 && branding.tagline ? 8 : 32
      }}>
          {step === 1 ? "Please enter your gym's code to continue" : `Sign in to your ${branding.gymName} account`}
        </p>
        {step === 2 && branding.tagline && <p className="page-subtitle login-inline-9">{branding.tagline}</p>}

        {step === 1 ? <form onSubmit={handleCodeSubmit} className="login-inline-10">
            <div className="login-inline-11">
              <label className="form-label">Gym Code</label>
              <div className="login-inline-12">
                <input type="text" value={gymCode} onChange={e => setGymCode(e.target.value.toUpperCase())} className="form-input" placeholder="e.g. GYM123" required />
              </div>
              {codeError && <p className="login-inline-13">{codeError}</p>}
            </div>
            <button type="submit" className="btn-blue login-inline-14" disabled={codeLoading}>
              {codeLoading ? <Loader size={18} className="login-inline-15" /> : "Continue"}
            </button>
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button 
                type="button" 
                onClick={() => setStep(2)} 
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}
              >
                Log in as Gym Owner
              </button>
            </div>
          </form> : <form onSubmit={handleSubmit} className="login-inline-16">
            <div className="login-inline-17">
              <label className="form-label">Email Address</label>
              <div className="login-inline-18">
                <Mail size={18} className="login-inline-19" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input login-inline-20" placeholder="john@example.com" required />
              </div>
            </div>

            <div className="login-inline-21">
              <label className="form-label">Password</label>
              <div className="login-inline-22">
                <Lock size={18} className="login-inline-23" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="form-input login-inline-24" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="login-inline-25">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="login-inline-26">
                <button type="button" onClick={() => {
              setShowForgot(true);
              setForgotSent(false);
              setForgotError("");
              setForgotEmail("");
            }} className="login-inline-27">
                  Forgot Password?
                </button>
              </div>
            </div>

            <button type="submit" className="btn-blue login-inline-28" disabled={loading}>
              {loading ? <Loader size={18} className="login-inline-29" /> : "Sign In"}
            </button>
            
            <div className="login-inline-30">
              <button type="button" onClick={() => {
            setStep(1);
            dispatch(resetBranding());
          }} className="login-inline-31">
                Change Gym Code
              </button>
            </div>
          </form>}
      </div>

      {/* Forgot Password Modal */}
      {showForgot && <div className="login-inline-32">
          <div className="gym-card login-inline-33">
            <div className="login-inline-34">
              <h3 className="login-inline-35">Reset Password</h3>
              <button onClick={() => setShowForgot(false)} className="login-inline-36">
                <X size={20} />
              </button>
            </div>

            {forgotSent ? <div className="login-inline-37">
                <CheckCircle size={48} className="login-inline-38" />
                <p className="login-inline-39">Reset link sent!</p>
                <p className="login-inline-40">
                  Check your email <strong>{forgotEmail}</strong> for the password reset link. It expires in 1 hour.
                </p>
                <button className="btn-blue-outline login-inline-41" onClick={() => setShowForgot(false)}>
                  Back to Login
                </button>
              </div> : <form onSubmit={handleForgotPassword}>
                <p className="login-inline-42">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                {forgotError && <div className="login-inline-43">
                    {forgotError}
                  </div>}
                <div className="login-inline-44">
                  <label className="form-label">Email Address</label>
                  <div className="login-inline-45">
                    <Mail size={16} className="login-inline-46" />
                    <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} className="form-input login-inline-47" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="login-inline-48">
                  <button type="button" className="btn-blue-outline login-inline-49" onClick={() => setShowForgot(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-blue login-inline-50" disabled={forgotLoading}>
                    {forgotLoading ? <><Loader size={16} className="login-inline-51" /> Sending...</> : "Send Link"}
                  </button>
                </div>
              </form>}
          </div>
        </div>}
    </div>;
};
export default Login;

// Named export kept for backward compatibility with any lazy imports
export { Login };