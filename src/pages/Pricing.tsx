import React, { useState } from "react";
import { Check, X, ShieldCheck, HelpCircle, Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { createOrderAction, verifySignatureAction } from "../redux/actions/paymentActions";
import type { PlanType } from "../utils/constant";
import type { PaymentVerifiedPayload } from "../App";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface PlanFeature { text: string; included: boolean; }
interface PricingPlan {
  name: string;
  apiPlan: PlanType;
  priceMonthly: number;
  priceYearly: number;
  desc: string;
  features: PlanFeature[];
  featured: boolean;
  ctaText: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Declare Razorpay on window (loaded via CDN script tag)
// ─────────────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Load Razorpay SDK script once dynamically
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// Pricing Page Component
// ─────────────────────────────────────────────────────────────────────────────
interface PricingProps {
  onPaymentVerified?: (payload: PaymentVerifiedPayload) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onPaymentVerified }) => {
  const dispatch = useAppDispatch();
  const { loading: paymentLoading } = useAppSelector((state) => state.payment);

  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  // "plans"   → plan cards grid
  // "confirm" → confirm modal (collect email + call create-order → Razorpay)
  type FlowStep = "plans" | "confirm";
  const [step, setStep]                = useState<FlowStep>("plans");
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [ownerEmail, setOwnerEmail]    = useState("");
  const [emailError, setEmailError]    = useState("");

  // ─────────────────────────────────────────────────────────────────────────
  const plans: PricingPlan[] = [
    {
      name: "Basic Strength",
      apiPlan: "starter",
      priceMonthly: 29,
      priceYearly: 23,
      desc: "Perfect for self-starters who want premium gym floor access.",
      features: [
        { text: "Full access to gym floor & equipment", included: true },
        { text: "Locker rooms & hot showers",           included: true },
        { text: "24/7 facility access",                 included: false },
        { text: "All Group fitness classes",            included: false },
        { text: "Custom diet & workout plans",          included: false },
        { text: "Personal trainer sessions",            included: false },
      ],
      featured: false,
      ctaText: "Choose Basic Plan",
    },
    {
      name: "Pro Athlete",
      apiPlan: "plus",
      priceMonthly: 59,
      priceYearly: 47,
      desc: "Our most popular plan. Access classes and extra benefits.",
      features: [
        { text: "Full access to gym floor & equipment", included: true },
        { text: "Locker rooms & hot showers",           included: true },
        { text: "24/7 facility access",                 included: true },
        { text: "All Group fitness classes",            included: true },
        { text: "Custom diet & workout plans",          included: false },
        { text: "Personal trainer sessions",            included: false },
      ],
      featured: true,
      ctaText: "Get Started with Pro",
    },
    {
      name: "VIP Elite",
      apiPlan: "professional",
      priceMonthly: 99,
      priceYearly: 79,
      desc: "The ultimate fitness journey. Complete with dedicated coaches.",
      features: [
        { text: "Full access to gym floor & equipment", included: true },
        { text: "Locker rooms & hot showers",           included: true },
        { text: "24/7 facility access",                 included: true },
        { text: "All Group fitness classes",            included: true },
        { text: "Custom diet & workout plans",          included: true },
        { text: "5x Personal Trainer sessions / mo",   included: true },
      ],
      featured: false,
      ctaText: "Go VIP Elite",
    },
  ];

  // ── Step 1: open confirm modal ────────────────────────────────────────────
  const handleChoosePlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setOwnerEmail("");
    setEmailError("");
    setStep("confirm");
  };

  // ── Step 2: Create order → open Razorpay → Verify signature ──────────────
  const handleConfirmAndPay = async () => {
    if (!selectedPlan) return;
    if (!ownerEmail.trim() || !/\S+@\S+\.\S+/.test(ownerEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // 2a. Create order on backend → POST /api/payment/create-order
    const orderResult = await dispatch(
      createOrderAction({ email: ownerEmail, plan: selectedPlan.apiPlan })
    );

    if (!createOrderAction.fulfilled.match(orderResult)) return; // error snackbar already shown

    const orderId  = orderResult.payload?.order?.orderId;
    const currency = orderResult.payload?.order?.currency ?? "INR";
    const isMock   = orderResult.payload?.isMock === true;
    const price    = billingPeriod === "monthly"
      ? selectedPlan.priceMonthly
      : selectedPlan.priceYearly;

    // Helper: call verify-signature — on success call onPaymentVerified and hand off to App
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
        // Hand off to App.tsx
        if (onPaymentVerified && selectedPlan) {
          onPaymentVerified({ plan: selectedPlan.apiPlan, email: ownerEmail, paymentToken: token });
        }
      }
    };

    // MOCK mode: skip Razorpay SDK entirely, verify directly
    if (isMock) {
      await verifyAndProceed(orderId);
      return;
    }

    // LIVE mode: load Razorpay SDK only now (lazy, only when needed)
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    // 2c. Open Razorpay checkout
    const rzpOptions = {
      key:         import.meta.env.VITE_RAZORPAY_KEY_ID ?? "", // set in .env
      amount:      price * 100,   // Razorpay expects paise
      currency,
      name:        "IronPulse Gym",
      description: `${selectedPlan.name} Membership`,
      order_id:    orderId,
      prefill:     { email: ownerEmail },
      theme:       { color: "#6366f1" },

      handler: async (response: {
        razorpay_order_id:   string;
        razorpay_payment_id: string;
        razorpay_signature:  string;
      }) => {
        await verifyAndProceed(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        );
      },

      modal: {
        ondismiss: () => {
          // User closed the Razorpay modal — stay on confirm step
        },
      },
    };

    const rzp = new window.Razorpay(rzpOptions);
    rzp.open();
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  // Steps 1 & 2 — Plan grid + Confirm modal
  return (
    <div className="page-container">
      {/* ── Confirm Modal Overlay (step === "confirm") ──────────────────── */}
      {step === "confirm" && selectedPlan && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 460, width: "100%", padding: "36px 32px", textAlign: "center", position: "relative" }}>
            {/* Close */}
            <button onClick={() => setStep("plans")} style={closeBtnStyle} aria-label="Close">✕</button>

            <div className="brand-icon-wrapper" style={{ width: 52, height: 52, margin: "0 auto 16px", borderRadius: "50%" }}>
              <ShieldCheck size={26} />
            </div>

            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 8 }}>Confirm & Pay</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: 22, lineHeight: 1.6 }}>
              You're subscribing to&nbsp;
              <strong style={{ color: "var(--text-primary)" }}>{selectedPlan.name}</strong>
              &nbsp;at&nbsp;
              <strong style={{ color: "var(--primary)" }}>
                ${billingPeriod === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceYearly}
                {billingPeriod === "monthly" ? "/mo" : "/mo (billed yearly)"}
              </strong>.
            </p>

            {/* Email input */}
            <div style={{ textAlign: "left", marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Your Email (for account creation)
              </label>
              <input
                type="email"
                value={ownerEmail}
                onChange={(e) => { setOwnerEmail(e.target.value); setEmailError(""); }}
                placeholder="owner@example.com"
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 8,
                  border: emailError ? "1.5px solid #ef4444" : "1.5px solid var(--border)",
                  background: "var(--bg-card)", color: "var(--text-primary)",
                  fontSize: "0.9rem", outline: "none", boxSizing: "border-box",
                }}
              />
              {emailError && (
                <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: 4 }}>{emailError}</p>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                className="btn-blue"
                style={{ width: "100%", justifyContent: "center", padding: "13px" }}
                onClick={handleConfirmAndPay}
                disabled={paymentLoading}
              >
                {paymentLoading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> Processing…
                  </span>
                ) : "Proceed to Payment →"}
              </button>
              <button
                className="btn-blue-outline"
                style={{ width: "100%", justifyContent: "center", padding: "11px" }}
                onClick={() => setStep("plans")}
                disabled={paymentLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Plan Grid ───────────────────────────────────────────────────── */}
      <div className="pricing-header-container">
        <h2 className="page-title">Membership Tiers</h2>
        <p className="page-subtitle">Simple, transparent pricing to power your health journey. No hidden activation fees.</p>
        <div className="billing-toggle">
          <button onClick={() => setBillingPeriod("monthly")} className={`toggle-option ${billingPeriod === "monthly" ? "active" : ""}`}>Monthly Billing</button>
          <button onClick={() => setBillingPeriod("yearly")}  className={`toggle-option ${billingPeriod === "yearly"  ? "active" : ""}`}>Yearly Billing (20% Off)</button>
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => {
          const price = billingPeriod === "monthly" ? plan.priceMonthly : plan.priceYearly;
          return (
            <div key={index} className={`gym-card pricing-card ${plan.featured ? "featured" : ""}`}>
              {plan.featured && <div className="pricing-badge">Popular</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, minHeight: "45px" }}>{plan.desc}</p>
              <div className="plan-price-wrapper">
                <span className="plan-price">${price}</span>
                <span className="plan-period">/month</span>
              </div>
              <ul className="plan-features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`plan-feature-item ${!feature.included ? "disabled" : ""}`}>
                    {feature.included ? <Check size={16} className="check" /> : <X size={16} className="cross" />}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <button
                className={plan.featured ? "btn-blue" : "btn-blue-outline"}
                style={{ width: "100%", marginTop: "auto", justifyContent: "center" }}
                onClick={() => handleChoosePlan(plan)}
              >
                {plan.ctaText}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ Banner */}
      <div className="gym-card" style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
        <HelpCircle size={24} style={{ color: "var(--primary)", flexShrink: 0 }} />
        <div style={{ textAlign: "left" }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>Need custom business corporate plans?</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            We provide multi-user memberships and manager dashboards for corporate offices. Contact our support for customized onboarding solutions.
          </p>
        </div>
      </div>

      {/* Loader spin keyframes */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};



// ── Styles ───────────────────────────────────────────────────────────────────
const overlayStyle: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(4px)",
  zIndex: 10000,
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: "20px",
};

const closeBtnStyle: React.CSSProperties = {
  position: "absolute", right: 16, top: 16,
  border: "none", background: "none", cursor: "pointer",
  color: "var(--text-muted)", fontSize: 18, lineHeight: 1,
};
