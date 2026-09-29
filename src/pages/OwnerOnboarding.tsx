import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../utils/reduxHooks";
import { registerOwnerAction } from "../redux/actions/authActions";
import { createOrderAction, verifySignatureAction } from "../redux/actions/paymentActions";
import { Check, Loader, Lock, Mail, Smartphone, Globe, Eye, EyeOff } from "lucide-react";
import type { PlanType } from "../utils/constant";
import { sendOtpApi, verifyOtpApi } from "../services/apis/authApis";
import "./OwnerOnboarding.css";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}
const loadRazorpayScript = (): Promise<boolean> => new Promise(resolve => {
  if (document.getElementById("razorpay-script")) {
    resolve(true);
    return;
  }
  const script = document.createElement("script");
  script.id = "razorpay-script";
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});
export const OwnerOnboarding: React.FC = () => {
  const navigate = useNavigate();
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
    const orderResult = await dispatch(createOrderAction({
      email,
      plan
    }));
    if (!createOrderAction.fulfilled.match(orderResult)) {
      setError(orderResult.payload as string || "Failed to initialize payment. Please try again.");
      setLoading(false);
      return;
    }
    const orderId = orderResult.payload?.order?.orderId;
    const currency = orderResult.payload?.order?.currency ?? "INR";
    const isMock = orderResult.payload?.isMock === true;
    const verifyAndProceed = async (rzpOrderId: string, rzpPaymentId?: string, rzpSignature?: string) => {
      const verifyResult = await dispatch(verifySignatureAction({
        razorpayOrderId: rzpOrderId,
        razorpayPaymentId: rzpPaymentId ?? "",
        razorpaySignature: rzpSignature ?? ""
      }));
      if (verifySignatureAction.fulfilled.match(verifyResult)) {
        const token = verifyResult.payload?.paymentToken as string;

        // Now register the owner!
        const regResult = await dispatch(registerOwnerAction({
          fullName,
          email,
          mobileNo: phone,
          password,
          gymName,
          plan,
          paymentToken: token,
          dateOfBirth: "2000-01-01"
        }));
        if (registerOwnerAction.fulfilled.match(regResult)) {
          // Save dashUser for ProtectedRoute
          const regPayload = regResult.payload as any;
          const dashUser = {
            ownerName: fullName || "Owner",
            email,
            role: "admin",
            canAddMember: true,
            _id: regPayload?._id || regPayload?.user?._id,
            gymId: regPayload?.gymId || regPayload?.user?.gymId
          };
          localStorage.setItem("dashUser", JSON.stringify(dashUser));
          navigate("/dashboard/overview", {
            replace: true
          });
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
      prefill: {
        email,
        name: fullName,
        contact: phone
      },
      theme: {
        color: "#6366f1"
      },
      handler: async (response: any) => {
        await verifyAndProceed(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
        }
      }
    };
    const rzp = new window.Razorpay(rzpOptions);
    rzp.open();
  };
  const plans = [{
    name: "Starter",
    apiPlan: "starter" as PlanType,
    price: 29,
    desc: "For small gyms just getting started."
  }, {
    name: "Plus",
    apiPlan: "plus" as PlanType,
    price: 79,
    desc: "Perfect for growing fitness centers."
  }, {
    name: "Professional",
    apiPlan: "professional" as PlanType,
    price: 149,
    desc: "Everything you need to scale rapidly."
  }];
  return <div className="page-container owner-onboarding-inline-1">
      {/* Header / Brand */}
      <div className="owner-onboarding-inline-2">
        <div onClick={() => navigate("/")} className="owner-onboarding-inline-3">
          <img src="/logo.png" alt="Trainix" className="owner-onboarding-inline-4" />
          <span className="owner-onboarding-inline-5">Trainix</span>
        </div>
      </div>

      <div className="owner-onboarding-inline-6">
        
        {/* Step Indicator */}
        <div className="owner-onboarding-inline-7">
          <StepBadge num={1} label="Account" active={step >= 1} current={step === 1} />
          
          <div className="owner-onboarding-inline-8">
            <div style={{
            width: step >= 2 ? "100%" : "0%"
          }} className="owner-onboarding-inline-9"></div>
          </div>
          
          <StepBadge num={2} label="Your Gym" active={step >= 2} current={step === 2} />
          
          <div className="owner-onboarding-inline-10">
            <div style={{
            width: step >= 3 ? "100%" : "0%"
          }} className="owner-onboarding-inline-11"></div>
          </div>
          
          <StepBadge num={3} label="Plan" active={step >= 3} current={step === 3} />
        </div>

        {/* Form Card */}
        <div className="gym-card owner-onboarding-inline-12" style={{
        maxWidth: step === 3 ? 900 : 480
      }}>
          
          {error && <div className="owner-onboarding-inline-13">
              {error}
            </div>}

          {step === 1 && <form onSubmit={handleStep1Submit} className="owner-onboarding-inline-14">
              <div className="owner-onboarding-inline-15">
                <h2 className="owner-onboarding-inline-16">Create your account</h2>
                <p className="owner-onboarding-inline-17">Join Trainix today and manage your gym seamlessly</p>
              </div>

              <div>
                <label className="form-label">Where is your business based?</label>
                <div className="owner-onboarding-inline-18">
                  <Globe size={18} className="owner-onboarding-inline-19" />
                  <select value={country} onChange={e => setCountry(e.target.value)} className="form-input owner-onboarding-inline-20">
                    <option value="India - Billed in INR">IN India — Billed in ₹ INR</option>
                    <option value="US - Billed in USD">US United States — Billed in $ USD</option>
                    <option value="UK - Billed in GBP">UK United Kingdom — Billed in £ GBP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Full Name</label>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="form-input" placeholder="John Doe" required />
              </div>

              <div>
                <label className="form-label">Email</label>
                <div className="owner-onboarding-inline-21">
                  <Mail size={18} className="owner-onboarding-inline-22" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input owner-onboarding-inline-23" placeholder="you@example.com" required />
                </div>
              </div>

              <div>
                <label className="form-label">Phone</label>
                <div className="owner-onboarding-inline-24">
                  <select className="form-input owner-onboarding-inline-25" defaultValue="+91">
                    <option value="+91">IN +91</option>
                    <option value="+1">US +1</option>
                  </select>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="form-input owner-onboarding-inline-26" placeholder="9876543210" required />
                </div>
                <p className="owner-onboarding-inline-27">We'll verify this with a one-time code.</p>
              </div>

              <div>
                <label className="form-label">Password</label>
                <div className="owner-onboarding-inline-28">
                  <Lock size={18} className="owner-onboarding-inline-29" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="form-input owner-onboarding-inline-30" placeholder="Create a strong password" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="owner-onboarding-inline-31">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-blue owner-onboarding-inline-32">
                Continue →
              </button>

              <p className="owner-onboarding-inline-33">
                By continuing, you agree to our <a href="#" className="owner-onboarding-inline-34">Terms of Service</a> and <a href="#" className="owner-onboarding-inline-35">Privacy Policy</a>
              </p>
              <p className="owner-onboarding-inline-36">
                Already have an account? <span onClick={() => navigate("/login")} className="owner-onboarding-inline-37">Sign in</span>
              </p>
            </form>}

          {step === 2 && <form onSubmit={handleStep2Submit} className="owner-onboarding-inline-38">
              <div className="owner-onboarding-inline-39">
                <h2 className="owner-onboarding-inline-40">Your Gym Details</h2>
                <p className="owner-onboarding-inline-41">Let's set up your workspace and verify your details.</p>
              </div>

              <div>
                <label className="form-label">Gym Name</label>
                <input type="text" value={gymName} onChange={e => setGymName(e.target.value)} className="form-input" placeholder="e.g. FitPro Studio" required />
              </div>

              {!otpSent ? <div className="owner-onboarding-inline-42">
                  <button type="button" className="btn-blue-outline owner-onboarding-inline-43" onClick={handleSendOtp} disabled={loading}>
                    {loading ? <Loader size={18} className="owner-onboarding-inline-44" /> : "Send Verification OTPs"}
                  </button>
                </div> : <>
                  <div className="owner-onboarding-inline-45">
                    <h4 className="owner-onboarding-inline-46">Verify Email & WhatsApp</h4>
                    
                    <div className="owner-onboarding-inline-47">
                      <label className="form-label owner-onboarding-inline-48">
                        <Mail size={14} /> Email OTP
                      </label>
                      <input type="text" value={emailOtp} onChange={e => setEmailOtp(e.target.value)} className="form-input" placeholder="Enter 6-digit code sent to email" maxLength={6} required />
                    </div>

                    <div>
                      <label className="form-label owner-onboarding-inline-49">
                        <Smartphone size={14} /> WhatsApp OTP
                      </label>
                      <input type="text" value={whatsappOtp} onChange={e => setWhatsappOtp(e.target.value)} className="form-input" placeholder="Enter 6-digit code sent to WhatsApp" maxLength={6} required />
                    </div>
                  </div>
                  
                  <button type="submit" className="btn-blue owner-onboarding-inline-50">
                    Verify & Continue →
                  </button>
                </>}

              <button type="button" className="gc-btn-ghost owner-onboarding-inline-51" onClick={() => setStep(1)} style={{
            marginTop: -10
          }}>
                ← Back
              </button>
            </form>}

          {step === 3 && <div>
              <div className="owner-onboarding-inline-52">
                <h2 className="owner-onboarding-inline-53">Select Your Plan</h2>
                <p className="owner-onboarding-inline-54">Choose a plan to continue. You can upgrade or downgrade later.</p>
              </div>

              <div className="owner-onboarding-inline-55">
                {plans.map(p => <div key={p.name} className="owner-onboarding-inline-56">
                    <h3 className="owner-onboarding-inline-57">{p.name}</h3>
                    <p className="owner-onboarding-inline-58">{p.desc}</p>
                    <div className="owner-onboarding-inline-59">
                      <span className="owner-onboarding-inline-60">${p.price}</span>
                      <span className="owner-onboarding-inline-61">/mo</span>
                    </div>
                    <ul className="owner-onboarding-inline-62">
                      <li className="owner-onboarding-inline-63"><Check size={16} color="var(--primary)" /> No setup fees</li>
                      <li className="owner-onboarding-inline-64"><Check size={16} color="var(--primary)" /> Full Access</li>
                    </ul>
                    <button className="btn-blue owner-onboarding-inline-65" onClick={() => handleStartTrial(p.apiPlan, p.price)} disabled={loading}>
                      {loading ? <Loader size={16} className="owner-onboarding-inline-66" /> : "Pay Now"}
                    </button>
                  </div>)}
              </div>

              <div className="owner-onboarding-inline-67">
                <button type="button" className="gc-btn-ghost" onClick={() => setStep(2)} disabled={loading}>
                  ← Back to Gym Details
                </button>
              </div>
            </div>}

        </div>
      </div>
    </div>;
};

// Helper for step indicator
const StepBadge = ({
  num,
  label,
  active,
  current
}: {
  num: number;
  label: string;
  active: boolean;
  current: boolean;
}) => <div className="owner-onboarding-inline-68">
    <div style={{
    background: active ? "var(--primary)" : "#f1f5f9",
    color: active ? "white" : "#94a3b8",
    boxShadow: current ? "0 0 0 6px rgba(99,102,241,0.15)" : "none"
  }} className="owner-onboarding-inline-69">
      {active && !current ? <Check size={16} /> : num}
    </div>
    <span style={{
    fontWeight: current ? 700 : 500,
    color: active ? "var(--text-primary)" : "#94a3b8"
  }} className="owner-onboarding-inline-70">
      {label}
    </span>
  </div>;
export default OwnerOnboarding;