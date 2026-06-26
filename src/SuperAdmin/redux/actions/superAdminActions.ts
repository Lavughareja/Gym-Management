import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDashboardStatsApi,
  fetchAllGymsApi,
  toggleGymStatusApi,
} from "../../services/superAdminApis";
import { AUTH_TOKEN_KEY } from "../../../utils/constant";
import { showSnackbar } from "../../../redux/slices/snackbarSlice";
import { loginApi } from "../../../services/apis/authApis";

// ─────────────────────────────────────────────────────────────────────────────
// Super Admin login (calls real backend login with seeded superadmin creds)
// ─────────────────────────────────────────────────────────────────────────────

export const superAdminLoginAction = createAsyncThunk(
  "superAdmin/login",
  async (
    payload: { email: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      // Authenticate against the backend using the provided credentials
      const response = await loginApi({
        email: payload.email,
        password: payload.password,
      });

      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("sa_auth_token", token);
        // Also set the shared token key so AxiosInstance attaches it
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      }

      const user = {
        fullName: response?.data?.fullName || "Super Admin",
        email:    response?.data?.email    || "superadmin@traininx.com",
        role:     response?.data?.role     || "superadmin",
      };
      localStorage.setItem("sa_user", JSON.stringify(user));

      dispatch(showSnackbar({ message: "Welcome, Super Admin!", type: "success" }));
      return { token, user };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Login failed. Check your credentials.";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// Fetch dashboard stats
// ─────────────────────────────────────────────────────────────────────────────

export const fetchSuperAdminDashboard = createAsyncThunk(
  "superAdmin/fetchDashboard",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchDashboardStatsApi();
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch dashboard stats.";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// Fetch all gyms (paginated)
// ─────────────────────────────────────────────────────────────────────────────

export const fetchAllGyms = createAsyncThunk(
  "superAdmin/fetchAllGyms",
  async (
    params: { page?: number; limit?: number; search?: string } = {},
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await fetchAllGymsApi(params);
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch gyms.";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// Toggle gym active/suspended status
// ─────────────────────────────────────────────────────────────────────────────

export const toggleGymStatus = createAsyncThunk(
  "superAdmin/toggleGymStatus",
  async (gymId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await toggleGymStatusApi(gymId);
      dispatch(
        showSnackbar({
          message: response.data.message || "Gym status updated.",
          type: "success",
        })
      );
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to update gym status.";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);
