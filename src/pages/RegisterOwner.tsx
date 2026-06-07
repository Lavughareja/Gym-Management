import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { registerOwnerAction } from "../redux/actions/authActions";
import { clearPaymentState } from "../redux/slices/paymentSlice";
import type { PlanType } from "../utils/constant";

// ─────────────────────────────────────────────────────────────────────────────
// RegisterOwner Page — Step 3 of onboarding
// Shown AFTER payment is verified. Collects owner details and registers.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  plan: PlanType;
  email: string;
  paymentToken: string;
  onSuccess: (gymName: string, ownerName: string) => void;  // passes data up to dashboard
  onBack: () => void;
}

const RegisterOwner: React.FC<Props> = ({ plan, email, paymentToken, onSuccess, onBack }) => {
  const dispatch  = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    fullName: "",
    email: email,
    password: "",
    confirmPassword: "",
    gymName: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  // Keep email in sync if parent changes it
  useEffect(() => {
    setForm((prev) => ({ ...prev, email }));
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    const result = await dispatch(
      registerOwnerAction({
        fullName:     form.fullName,
        email:        form.email,
        password:     form.password,
        gymName:      form.gymName,
        plan,
        paymentToken,
      })
    );

    if (registerOwnerAction.fulfilled.match(result)) {
      dispatch(clearPaymentState());
      onSuccess(form.gymName, form.fullName);
    }
  };

  const planLabels: Record<PlanType, string> = {
    without_biomatrix: "Basic (No Biometrics)",
    with_biomatrix:    "Pro (With Biometrics)",
    additional_plan:   "Additional Plan",
  };

  return (
    <div className="page-container" style={{ maxWidth: 540, margin: "0 auto", padding: "40px 20px" }}>
      <div className="gym-card" style={{ padding: "36px 32px" }}>
        {/* Header */}
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <div className="brand-icon-wrapper" style={{ width: 52, height: 52, margin: "0 auto 14px", borderRadius: "50%" }}>
            <span style={{ fontSize: 22 }}>🏋️</span>
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Create Your Gym Account
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 6 }}>
            Payment confirmed ✅ &nbsp;|&nbsp; Plan: <strong style={{ color: "var(--primary)" }}>{planLabels[plan]}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="owner@example.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Gym Name</label>
            <input
              name="gymName"
              value={form.gymName}
              onChange={handleChange}
              required
              placeholder="John's Fitness Hub"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Min. 6 characters"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter password"
              style={inputStyle}
            />
          </div>

          {/* Validation / API error */}
          {(validationError || error) && (
            <div style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 8,
              padding: "10px 14px",
              color: "#ef4444",
              fontSize: "0.85rem",
            }}>
              {validationError ?? error}
            </div>
          )}

          <button
            type="submit"
            className="btn-blue"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", padding: "13px", marginTop: 4 }}
          >
            {loading ? "Registering…" : "Complete Registration"}
          </button>

          <button
            type="button"
            className="btn-blue-outline"
            onClick={onBack}
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", padding: "11px" }}
          >
            ← Back to Plans
          </button>
        </form>
      </div>
    </div>
  );
};

// ── Inline styles ─────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 8,
  border: "1.5px solid var(--border)",
  background: "var(--bg-card)",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
};

export default RegisterOwner;
