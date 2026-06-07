import { AxiosInstance } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";
import type { PlanType } from "../../utils/constant";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterOwnerPayload {
  fullName: string;
  email: string;
  password: string;
  gymName: string;
  plan: PlanType;
  paymentToken: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth APIs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Login — returns JWT token.
 * May return 403 if gym owner already has 2 active sessions.
 */
export const loginApi = async (payload: LoginPayload) => {
  const response = await AxiosInstance.post(apiRoutes.login, payload);
  return response;
};

/**
 * Logout — removes this session from the server's active session list,
 * freeing up a device slot. Always call this on explicit logout.
 */
export const logoutApi = async () => {
  const response = await AxiosInstance.post(apiRoutes.logout);
  return response;
};

/**
 * Step 3 of onboarding — Register a gym owner after successful payment.
 * Requires paymentToken from verifySignatureApi.
 */
export const registerOwnerApi = async (payload: RegisterOwnerPayload) => {
  const response = await AxiosInstance.post(apiRoutes.registerOwner, payload);
  return response;
};
