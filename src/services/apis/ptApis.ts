import { AxiosInstance } from "../../axios/axiosInstance";

// ── Assignment APIs ────────────────────────────────────────────────────────
export const assignPtApi = (data: { memberId: string; trainerId?: string }) =>
  AxiosInstance.post('/pt/assign', data);

export const removePtAssignmentApi = (id: string) =>
  AxiosInstance.delete(`/pt/assignments/${id}`);

export const getAllPtAssignmentsApi = () =>
  AxiosInstance.get('/pt/assignments');

export const getMyPtMembersApi = () =>
  AxiosInstance.get('/pt/my-members');

export const getMemberPtInfoApi = (memberId: string) =>
  AxiosInstance.get(`/pt/member/${memberId}`);

// ── Workout Plan APIs ──────────────────────────────────────────────────────
export const createPtWorkoutPlanApi = (data: {
  memberId: string;
  date: string;
  exercises: { name: string; sets: number; reps: string; weight?: string; notes?: string }[];
  generalNotes?: string;
}) => AxiosInstance.post('/pt/workout-plan', data);

export const getPtWorkoutPlansApi = (memberId: string, date?: string) =>
  AxiosInstance.get(`/pt/workout-plan/${memberId}${date ? `?date=${date}` : ''}`);

export const deletePtWorkoutPlanApi = (id: string) =>
  AxiosInstance.delete(`/pt/workout-plan/${id}`);

// ── Diet Plan APIs (Manual — No AI) ───────────────────────────────────────
export const createPtDietPlanApi = (data: {
  memberId: string;
  date: string;
  meals: { mealType: string; foodItems: string; calories?: number; notes?: string }[];
  waterIntake?: number;
  generalNotes?: string;
}) => AxiosInstance.post('/pt/diet-plan', data);

export const getPtDietPlansApi = (memberId: string, date?: string) =>
  AxiosInstance.get(`/pt/diet-plan/${memberId}${date ? `?date=${date}` : ''}`);

export const deletePtDietPlanApi = (id: string) =>
  AxiosInstance.delete(`/pt/diet-plan/${id}`);

// ── Measurement APIs ───────────────────────────────────────────────────────
export const createPtMeasurementApi = (data: {
  memberId: string;
  date: string;
  weight?: number;
  height?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
  shoulders?: number;
  bodyFat?: number;
  bmi?: number;
  notes?: string;
}) => AxiosInstance.post('/pt/measurement', data);

export const getPtMeasurementsApi = (memberId: string, date?: string) =>
  AxiosInstance.get(`/pt/measurement/${memberId}${date ? `?date=${date}` : ''}`);

export const deletePtMeasurementApi = (id: string) =>
  AxiosInstance.delete(`/pt/measurement/${id}`);
