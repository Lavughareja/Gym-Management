import { AxiosInstance } from "../../axios/axiosInstance";

// ─────────────────────────────────────────────────────────────────────────────
// Workout Library — Member-only API calls  →  /api/workout-library/*
// ─────────────────────────────────────────────────────────────────────────────

export const getWorkoutCategoriesApi = () =>
  AxiosInstance.get("/workout-library/categories");

export const getWorkoutCategoryApi = (categoryId: string) =>
  AxiosInstance.get(`/workout-library/categories/${categoryId}`);
