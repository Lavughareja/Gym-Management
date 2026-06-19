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
  mobileNo: string;
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

export interface ManagerSetupPayload {
  token: string;
  password?: string;
  confirmPassword?: string;
}

export const managerSetupApi = async (payload: ManagerSetupPayload) => {
  const response = await AxiosInstance.post(apiRoutes.managerSetup, payload);
  return response;
};

export const forgotPasswordApi = async (email: string) => {
  const response = await AxiosInstance.post(apiRoutes.forgotPassword, { email });
  return response;
};

export const resetPasswordApi = async (token: string, newPassword: string, confirmPassword: string) => {
  const response = await AxiosInstance.post(apiRoutes.resetPassword, { token, newPassword, confirmPassword });
  return response;
};

export const changePasswordApi = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
  const response = await AxiosInstance.post(apiRoutes.changePassword, { currentPassword, newPassword, confirmPassword });
  return response;
};
