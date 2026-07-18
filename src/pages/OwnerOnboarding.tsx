import React, { useState } from "react";
import { useAppDispatch } from "../utils/reduxHooks";
import { registerOwnerAction } from "../redux/actions/authActions";
import { createOrderAction, verifySignatureAction } from "../redux/actions/paymentActions";
import { Check, Loader, Lock, Mail, Smartphone, Globe, Eye, EyeOff } from "lucide-react";
import type { PlanType } from "../utils/constant";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) { resolve(true); return; }
    const script = document.createElement("script");
    script.id  = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

interface Props {
  onSuccess: (gymName: string, ownerName: string) => void;
  onBack: () => void;
}

export const OwnerOnboarding: React.FC<Props> = ({ onSuccess, onBack }) => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1 State
  const [country, setCountry] = useState("India - Billed in INR");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2 State
  const [gymName, setGymName] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [whatsappOtp, setWhatsappOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSendOtp = () => {
    if (!gymName) {
      setError("Please enter Gym Name first.");
      return;
    }
    setError(null);
    setLoading(true);
    // Mock OTP API call
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1000);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gymName || !emailOtp || !whatsappOtp) {
      setError("Please fill in all fields including OTPs.");
      return;
    }
    setError(null);
    setStep(3);
  };

  const handleStartTrial = async (plan: PlanType, price: number) => {
    setLoading(true);
    setError(null);
    
    // 1. Create order
    const orderResult = await dispatch(
      createOrderAction({ email, plan })
    );

    if (!createOrderAction.fulfilled.match(orderResult)) {
      setError((orderResult.payload as string) || "Failed to initialize payment. Please try again.");
      setLoading(false);
      return;
    }

    const orderId  = orderResult.payload?.order?.orderId;
    const currency = orderResult.payload?.order?.currency ?? "INR";
    const isMock   = orderResult.payload?.isMock === true;

    const verifyAndProceed = async (rzpOrderId: string, rzpPaymentId?: string, rzpSignature?: string) => {
      const verifyResult = await dispatch(
        verifySignatureAction({
          razorpayOrderId:   rzpOrderId,
          razorpayPaymentId: rzpPaymentId ?? "",
          razorpaySignature: rzpSignature ?? "",
        })
      );

      if (verifySignatureAction.fulfilled.match(verifyResult)) {
        const token = verifyResult.payload?.paymentToken as string;
        
        // Now register the owner!
        const regResult = await dispatch(
          registerOwnerAction({
            fullName,
            email,
            mobileNo: phone,
            password,
            gymName,
            plan,
            paymentToken: token,
            dateOfBirth: "2000-01-01",
          })
        );
        if (registerOwnerAction.fulfilled.match(regResult)) {
          onSuccess(gymName, fullName);
        } else {
          setError("Failed to register account after payment. Please contact support.");
          setLoading(false);
        }
      } else {
        setError("Payment verification failed.");
        setLoading(false);
      }
    };

    if (isMock) {
      await verifyAndProceed(orderId);
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setError("Razorpay SDK failed to load. Check your internet connection.");
      setLoading(false);
      return;
    }

    const rzpOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID ?? "",
      amount: price * 100,
      currency,
      name: "Trainix Gym",
      description: `${plan} Plan Membership`,
      order_id: orderId,
      prefill: { email, name: fullName, contact: phone },
      theme: { color: "#6366f1" },
      handler: async (response: any) => {
        await verifyAndProceed(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        );
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(rzpOptions);
    rzp.open();
  };

  const plans = [
    { name: "Starter", apiPlan: "starter" as PlanType, price: 29, desc: "For small gyms just getting started." },
    { name: "Plus", apiPlan: "plus" as PlanType, price: 79, desc: "Perfect for growing fitness centers." },
    { name: "Professional", apiPlan: "professional" as PlanType, price: 149, desc: "Everything you need to scale rapidly." }
  ];

  return (
    <div className="page-container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc" }}>
      {/* Header / Brand */}
      <div style={{ padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={onBack}>
          <img src="/logo.png" alt="Trainix" style={{ width: 32, height: 32 }} />
          <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>Trainix</span>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
        
        {/* Step Indicator */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40, width: "100%", maxWidth: 600, justifyContent: "center" }}>
          <StepBadge num={1} label="Account" active={step >= 1} current={step === 1} />
          
          <div style={{ flex: 1, height: 2, background: "#e2e8f0", margin: "0 20px", position: "relative", borderRadius: 2 }}>
            <div style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "var(--primary)", borderRadius: 2, width: step >= 2 ? "100%" : "0%", transition: "width 0.5s ease" }}></div>
          </div>
          
          <StepBadge num={2} label="Your Gym" active={step >= 2} current={step === 2} />
          
          <div style={{ flex: 1, height: 2, background: "#e2e8f0", margin: "0 20px", position: "relative", borderRadius: 2 }}>
            <div style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "var(--primary)", borderRadius: 2, width: step >= 3 ? "100%" : "0%", transition: "width 0.5s ease" }}></div>
          </div>
          
          <StepBadge num={3} label="Plan" active={step >= 3} current={step === 3} />
        </div>

        {/* Form Card */}
        <div className="gym-card" style={{ width: "100%", maxWidth: step === 3 ? 900 : 480, padding: "40px", background: "white" }}>
          
          {error && (
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "12px", marginBottom: 24, color: "#dc2626", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleStep1Submit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ textAlign: "center", marginBottom: 12 }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)" }}>Create your account</h2>
                <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>Join Trainix today and manage your gym seamlessly</p>
              </div>

              <div>
                <label className="form-label">Where is your business based?</label>
                <div style={{ position: "relative" }}>
                  <Globe size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--text-muted)" }} />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: 42, appearance: "none" }}
                  >
                    <option value="India - Billed in INR">IN India — Billed in ₹ INR</option>
                    <option value="US - Billed in USD">US United States — Billed in $ USD</option>
                    <option value="UK - Billed in GBP">UK United Kingdom — Billed in £ GBP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="form-label">Email</label>
                <div style={{ position: "relative" }}>
                  <Mail size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--text-muted)" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: 42 }}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Phone</label>
                <div style={{ display: "flex", gap: 10 }}>
                  <select className="form-input" style={{ width: 100 }} defaultValue="+91">
                    <option value="+91">IN +91</option>
                    <option value="+1">US +1</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    style={{ flex: 1 }}
                    placeholder="9876543210"
                    required
                  />
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 6 }}>We'll verify this with a one-time code.</p>
              </div>

              <div>
                <label className="form-label">Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--text-muted)" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: 42, paddingRight: 42 }}
                    placeholder="Create a strong password"
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
              </div>

              <button type="submit" className="btn-blue" style={{ width: "100%", justifyContent: "center", padding: "14px", marginTop: 8 }}>
                Continue →
              </button>

              <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 12 }}>
                By continuing, you agree to our <a href="#" style={{ color: "var(--primary)" }}>Terms of Service</a> and <a href="#" style={{ color: "var(--primary)" }}>Privacy Policy</a>
              </p>
              <p style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: 8 }}>
                Already have an account? <span onClick={onBack} style={{ color: "var(--primary)", cursor: "pointer", fontWeight: 600 }}>Sign in</span>
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2Submit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ textAlign: "center", marginBottom: 12 }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)" }}>Your Gym Details</h2>
                <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>Let's set up your workspace and verify your details.</p>
              </div>

              <div>
                <label className="form-label">Gym Name</label>
                <input
                  type="text"
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                  className="form-input"
                  placeholder="e.g. FitPro Studio"
                  required
                />
              </div>

              {!otpSent ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <button type="button" className="btn-blue-outline" onClick={handleSendOtp} disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
                    {loading ? <Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> : "Send Verification OTPs"}
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ background: "#f8fafc", padding: 20, borderRadius: 12, border: "1px solid var(--border)" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 16 }}>Verify Email & WhatsApp</h4>
                    
                    <div style={{ marginBottom: 16 }}>
                      <label className="form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Mail size={14} /> Email OTP
                      </label>
                      <input
                        type="text"
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value)}
                        className="form-input"
                        placeholder="Enter 6-digit code sent to email"
                        maxLength={6}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Smartphone size={14} /> WhatsApp OTP
                      </label>
                      <input
                        type="text"
                        value={whatsappOtp}
                        onChange={(e) => setWhatsappOtp(e.target.value)}
                        className="form-input"
                        placeholder="Enter 6-digit code sent to WhatsApp"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className="btn-blue" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
                    Verify & Continue →
                  </button>
                </>
              )}

              <button type="button" className="gc-btn-ghost" onClick={() => setStep(1)} style={{ width: "100%", justifyContent: "center", marginTop: -10 }}>
                ← Back
              </button>
            </form>
          )}

          {step === 3 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)" }}>Select Your Plan</h2>
                <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>Choose a plan to continue. You can upgrade or downgrade later.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
                {plans.map((p) => (
                  <div key={p.name} style={{ border: "1px solid var(--border)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", background: "#f8fafc" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 8 }}>{p.name}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", minHeight: 40 }}>{p.desc}</p>
                    <div style={{ margin: "20px 0" }}>
                      <span style={{ fontSize: "2rem", fontWeight: 800 }}>${p.price}</span>
                      <span style={{ color: "var(--text-secondary)" }}>/mo</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", gap: 12, display: "flex", flexDirection: "column", flex: 1 }}>
                      <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem" }}><Check size={16} color="var(--primary)" /> No setup fees</li>
                      <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem" }}><Check size={16} color="var(--primary)" /> Full Access</li>
                    </ul>
                    <button
                      className="btn-blue"
                      style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}
                      onClick={() => handleStartTrial(p.apiPlan, p.price)}
                      disabled={loading}
                    >
                      {loading ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Pay Now"}
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: 24 }}>
                <button type="button" className="gc-btn-ghost" onClick={() => setStep(2)} disabled={loading}>
                  ← Back to Gym Details
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Helper for step indicator
const StepBadge = ({ num, label, active, current }: { num: number, label: string, active: boolean, current: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ 
      width: 32, height: 32, borderRadius: "50%", 
      display: "flex", alignItems: "center", justifyContent: "center",
      background: active ? "var(--primary)" : "#f1f5f9",
      color: active ? "white" : "#94a3b8",
      fontWeight: 600, fontSize: "0.9rem",
      boxShadow: current ? "0 0 0 6px rgba(99,102,241,0.15)" : "none",
      transition: "all 0.3s ease"
    }}>
      {active && !current ? <Check size={16} /> : num}
    </div>
    <span style={{ fontWeight: current ? 700 : 500, color: active ? "var(--text-primary)" : "#94a3b8", fontSize: "0.9rem" }}>
      {label}
    </span>
  </div>
);

export default OwnerOnboarding;
