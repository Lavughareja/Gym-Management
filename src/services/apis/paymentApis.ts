import { AxiosInstance } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";
import type { PlanType } from "../../utils/constant";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CreateOrderPayload {
  email: string;
  plan: PlanType;
}

export interface VerifySignaturePayload {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Payment APIs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Step 1 — Create a Razorpay order for the selected plan.
 * Response contains `orderId` to pass to the Razorpay checkout SDK.
 */
export const createOrderApi = async (payload: CreateOrderPayload) => {
  const response = await AxiosInstance.post(apiRoutes.createOrder, payload);
  return response;
};

/**
 * Step 2 — Verify the Razorpay payment signature after checkout.
 * Response contains `paymentToken` required for owner registration.
 */
export const verifySignatureApi = async (payload: VerifySignaturePayload) => {
  const response = await AxiosInstance.post(apiRoutes.verifySignature, payload);
  return response;
};
