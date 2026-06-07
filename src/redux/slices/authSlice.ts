import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  registerOwnerAction,
} from "../actions/authActions";
import { AUTH_TOKEN_KEY } from "../../utils/constant";

// ─────────────────────────────────────────────────────────────────────────────
// Auth Slice
// ─────────────────────────────────────────────────────────────────────────────

interface AuthState {
  user: Record<string, unknown> | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  // Specific flag for the 2-device limit scenario (403 response)
  deviceLimitReached: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(AUTH_TOKEN_KEY),
  isAuthenticated: !!localStorage.getItem(AUTH_TOKEN_KEY),
  loading: false,
  error: null,
  deviceLimitReached: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.deviceLimitReached = false;
    },
    clearDeviceLimitFlag: (state) => {
      state.deviceLimitReached = false;
    },
  },
  extraReducers: (builder) => {
    // ── Login ──────────────────────────────────────────────────────────────
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deviceLimitReached = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.isAuthenticated = true;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as { message: string; isDeviceLimit?: boolean };
        state.error = payload?.message;
        if (payload?.isDeviceLimit) {
          state.deviceLimitReached = true;
        }
      });

    // ── Logout ─────────────────────────────────────────────────────────────
    builder
      .addCase(logoutAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.deviceLimitReached = false;
      })
      .addCase(logoutAction.rejected, (state) => {
        // Even if server logout fails, clear local state
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // ── Register Owner ─────────────────────────────────────────────────────
    builder
      .addCase(registerOwnerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerOwnerAction.fulfilled, (state) => {
        state.loading = false;
        // Registration success → user should now login
      })
      .addCase(registerOwnerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearDeviceLimitFlag } = authSlice.actions;
export default authSlice.reducer;
