import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSuperAdminDashboard,
  fetchAllGyms,
  toggleGymStatus,
} from "../actions/superAdminActions";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface GymSubscription {
  plan: string;
  status: string;
  expiresAt: string;
  startDate: string;
}

export interface GymOwner {
  fullName: string;
  email: string;
  mobileNo: string;
}

export interface GymItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;
  owner: GymOwner | null;
  subscription: GymSubscription | null;
  memberCount: number;
  totalRevenue: number;
}

export interface PlanBreakdown {
  _id: string;
  count: number;
}

export interface DashboardStats {
  totalGyms: number;
  gymsThisMonth: number;
  gymsLastMonth: number;
  activeGyms: number;
  inactiveGyms: number;
  totalRevenue: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  totalMembers: number;
  planBreakdown: PlanBreakdown[];
  recentGyms: any[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface SuperAdminState {
  isAuthenticated: boolean;
  stats: DashboardStats | null;
  gyms: GymItem[];
  pagination: Pagination | null;
  statsLoading: boolean;
  gymsLoading: boolean;
  statsError: string | null;
  gymsError: string | null;
  togglingGymId: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Initial state
// ─────────────────────────────────────────────────────────────────────────────

const initialState: SuperAdminState = {
  isAuthenticated: !!localStorage.getItem("sa_auth_token"),
  stats: null,
  gyms: [],
  pagination: null,
  statsLoading: false,
  gymsLoading: false,
  statsError: null,
  gymsError: null,
  togglingGymId: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────────────────────────────────────

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState,
  reducers: {
    setSaAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    saLogout(state) {
      state.isAuthenticated = false;
      state.stats = null;
      state.gyms = [];
      localStorage.removeItem("sa_auth_token");
      localStorage.removeItem("sa_user");
    },
  },
  extraReducers: (builder) => {
    // ── Dashboard stats ──────────────────────────────────────────────────────
    builder
      .addCase(fetchSuperAdminDashboard.pending, (state) => {
        state.statsLoading = true;
        state.statsError = null;
      })
      .addCase(fetchSuperAdminDashboard.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload.stats;
      })
      .addCase(fetchSuperAdminDashboard.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = (action.payload as string) || "Failed to load dashboard";
      });

    // ── All gyms ─────────────────────────────────────────────────────────────
    builder
      .addCase(fetchAllGyms.pending, (state) => {
        state.gymsLoading = true;
        state.gymsError = null;
      })
      .addCase(fetchAllGyms.fulfilled, (state, action) => {
        state.gymsLoading = false;
        state.gyms = action.payload.gyms;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllGyms.rejected, (state, action) => {
        state.gymsLoading = false;
        state.gymsError = (action.payload as string) || "Failed to load gyms";
      });

    // ── Toggle gym status ────────────────────────────────────────────────────
    builder
      .addCase(toggleGymStatus.pending, (state, action) => {
        state.togglingGymId = action.meta.arg;
      })
      .addCase(toggleGymStatus.fulfilled, (state, action) => {
        state.togglingGymId = null;
        const gymId = action.meta.arg;
        const gym = state.gyms.find((g) => g._id === gymId);
        if (gym) gym.isActive = action.payload.isActive;
      })
      .addCase(toggleGymStatus.rejected, (state) => {
        state.togglingGymId = null;
      });
  },
});

export const { setSaAuthenticated, saLogout } = superAdminSlice.actions;
export default superAdminSlice.reducer;
