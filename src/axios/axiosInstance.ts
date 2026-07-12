import axios from "axios";
import { AUTH_TOKEN_KEY, BASE_URL } from "../utils/constant";

// ─────────────────────────────────────────────────────────────────────────────
// Axios Instance
// Reads environment from constant.ts → IS_LOCAL / IS_LIVE flags.
// Usage: import { AxiosInstance } from "../axios/axiosInstance";
// ─────────────────────────────────────────────────────────────────────────────

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request Interceptor ───────────────────────────────────────────────────────
// Attaches the JWT auth token to every outgoing request (if present).
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────────────────────────
// Handles 401 globally → clears token and redirects to login.
// Handles 403 (device-limit) → lets the caller handle it via rejectWithValue.
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      const isLoginRequest = error?.config?.url?.includes('/login');
      
      if (!isLoginRequest) {
        // Token expired / unauthorized — clear storage and redirect
        localStorage.removeItem(AUTH_TOKEN_KEY);
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    // 403 (device limit reached) is intentionally NOT redirected here;
    // the redux action catches it and shows a proper UI message.
    return Promise.reject(error);
  }
);
