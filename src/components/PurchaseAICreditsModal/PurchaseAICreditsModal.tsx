import React, { useState } from "react";
import { X, Plus, Minus, Loader } from "lucide-react";
import { createAiCreditOrderApi, verifyAiCreditSignatureApi } from "../../services/apis/paymentApis";
import { useAppDispatch } from "../../utils/reduxHooks";
import { showSnackbar } from "../../redux/slices/snackbarSlice";

// Declare Razorpay on window
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Props {
  onClose: () => void;
  onSuccess: (newTotalCredits: number) => void;
  userEmail: string;
}

const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export const PurchaseAICreditsModal: React.FC<Props> = ({ onClose, onSuccess, userEmail }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const pricePerCredit = 5;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handlePayNow = async () => {
    setLoading(true);
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        dispatch(showSnackbar({ message: "Razorpay SDK failed to load. Check your internet connection.", type: "error" }));
        setLoading(false);
        return;
      }

      // Create Order
      const orderRes = await createAiCreditOrderApi({ quantity });
      const { orderId, amount, currency } = orderRes.data.order;

      if (orderRes.data.isMock) {
        // Mock Flow
        const verifyRes = await verifyAiCreditSignatureApi({
          razorpayOrderId: orderId,
          razorpayPaymentId: "mock_payment_id",
          razorpaySignature: "mock_signature"
        });
        dispatch(showSnackbar({ message: "Mock Payment Successful! Credits added.", type: "success" }));
        onSuccess(verifyRes.data.aiCredits);
        onClose();
        return;
      }

      // Real Flow
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "YOUR_RAZORPAY_KEY",
        amount: amount.toString(),
        currency,
        name: "Trainix Gym",
        description: `Purchase ${quantity} AI Credits`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await verifyAiCreditSignatureApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            dispatch(showSnackbar({ message: "Payment Successful! Credits added.", type: "success" }));
            onSuccess(verifyRes.data.aiCredits);
            onClose();
          } catch (err: any) {
            dispatch(showSnackbar({ message: err?.response?.data?.message || "Payment verification failed", type: "error" }));
          }
        },
        prefill: {
          email: userEmail,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        dispatch(showSnackbar({ message: response.error.description || "Payment failed", type: "error" }));
      });
      rzp.open();

    } catch (err: any) {
      dispatch(showSnackbar({ message: err?.response?.data?.message || "Failed to initiate payment", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000 }}>
      <div className="modal-content" style={{ background: "var(--bg-primary)", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "400px", position: "relative", border: "1px solid var(--border-color)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
          <X size={20} />
        </button>

        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>Purchase AI Credits</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "24px" }}>Generate personalized diet plans using AI.</p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--bg-secondary)", borderRadius: "8px", marginBottom: "20px" }}>
          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Price Per Credit</span>
          <span style={{ fontWeight: 700, color: "var(--primary)" }}>₹{pricePerCredit}</span>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--text-primary)", fontSize: "0.95rem" }}>Select Quantity</label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              style={{ padding: "8px", borderRadius: "8px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", cursor: quantity > 1 ? "pointer" : "not-allowed", color: "var(--text-primary)" }}
            >
              <Minus size={18} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setQuantity(val > 0 ? val : 1);
              }}
              style={{ flex: 1, padding: "10px", textAlign: "center", border: "1px solid var(--border-color)", borderRadius: "8px", background: "var(--bg-primary)", color: "var(--text-primary)", fontWeight: 700, fontSize: "1.1rem" }}
            />
            <button
              onClick={handleIncrement}
              style={{ padding: "8px", borderRadius: "8px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", cursor: "pointer", color: "var(--text-primary)" }}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div style={{ background: "var(--primary-light)", padding: "16px", borderRadius: "8px", marginBottom: "24px", border: "1px solid var(--primary)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>Total Credits:</span>
            <span style={{ color: "var(--primary)", fontWeight: 700 }}>{quantity}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>Total Amount:</span>
            <span style={{ color: "var(--primary)", fontWeight: 800, fontSize: "1.1rem" }}>₹{quantity * pricePerCredit}</span>
          </div>
        </div>

        <button
          onClick={handlePayNow}
          disabled={loading || quantity <= 0}
          className="btn-blue"
          style={{ width: "100%", padding: "12px", justifyContent: "center", fontSize: "1rem", opacity: (loading || quantity <= 0) ? 0.7 : 1 }}
        >
          {loading ? <Loader size={20} style={{ animation: "spin 1s linear infinite" }} /> : `Pay ₹${quantity * pricePerCredit} Now`}
        </button>
      </div>
    </div>
  );
};

export default PurchaseAICreditsModal;
