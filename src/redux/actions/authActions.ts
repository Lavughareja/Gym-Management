import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  logoutApi,
  registerOwnerApi,
} from "../../services/apis/authApis";
import type {
  LoginPayload,
  RegisterOwnerPayload,
} from "../../services/apis/authApis";
import { AUTH_TOKEN_KEY } from "../../utils/constant";
import { showSnackbar } from "../slices/snackbarSlice";

// ─────────────────────────────────────────────────────────────────────────────
// Auth Actions (Async Thunks)
// ─────────────────────────────────────────────────────────────────────────────

export const loginAction = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginApi(payload);
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      }
      dispatch(showSnackbar({ message: response?.data?.message || "Login successful!", type: "success" }));
      return response.data;
    } catch (error: any) {
      const status  = error?.response?.status;
      const message = error?.response?.data?.message || "Login failed. Please try again.";
      dispatch(showSnackbar({ message, type: "error" }));
      if (status === 403) {
        return rejectWithValue({ message, isDeviceLimit: true });
      }
      return rejectWithValue({ message, isDeviceLimit: false });
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await logoutApi();
      localStorage.removeItem(AUTH_TOKEN_KEY);
      dispatch(showSnackbar({ message: response?.data?.message || "Logged out successfully.", type: "info" }));
      return response.data;
    } catch (error: any) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      const message = error?.response?.data?.message || "Logout failed on server side.";
      dispatch(showSnackbar({ message, type: "warning" }));
      return rejectWithValue(message);
    }
  }
);

export const registerOwnerAction = createAsyncThunk(
  "auth/registerOwner",
  async (payload: RegisterOwnerPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await registerOwnerApi(payload);
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      }
      dispatch(showSnackbar({ message: response?.data?.message || "Registration successful!", type: "success" }));
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Registration failed. Please try again.";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);
