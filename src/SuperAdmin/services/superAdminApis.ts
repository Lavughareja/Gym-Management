import { AxiosInstance } from "../../axios/axiosInstance";

// ─────────────────────────────────────────────────────────────────────────────
// Super Admin API calls  →  /api/superadmin/*
// ─────────────────────────────────────────────────────────────────────────────

export const fetchDashboardStatsApi = () =>
  AxiosInstance.get("/superadmin/dashboard");

export const fetchAllGymsApi = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => AxiosInstance.get("/superadmin/gyms", { params });

export const fetchGymDetailApi = (gymId: string) =>
  AxiosInstance.get(`/superadmin/gym/${gymId}`);

export const toggleGymStatusApi = (gymId: string) =>
  AxiosInstance.patch(`/superadmin/gym/${gymId}/toggle-status`);
