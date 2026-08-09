import type { AppDispatch, RootState } from "../store";
import { showSnackbar } from "../slices/snackbarSlice";
import {
  ptRequestStart,
  ptRequestFailure,
  setAssignments,
  setMyMembers,
  setMemberPtInfo,
  removeAssignmentById,
  setWorkoutPlans,
  addWorkoutPlan,
  removeWorkoutPlan,
  setDietPlans,
  addDietPlan,
  removeDietPlan,
  setMeasurements,
  addMeasurement,
  removeMeasurement,
  clearMemberPtData,
} from "../slices/ptSlice";
import {
  assignPtApi,
  removePtAssignmentApi,
  getAllPtAssignmentsApi,
  getMyPtMembersApi,
  getMemberPtInfoApi,
  createPtWorkoutPlanApi,
  getPtWorkoutPlansApi,
  deletePtWorkoutPlanApi,
  createPtDietPlanApi,
  getPtDietPlansApi,
  deletePtDietPlanApi,
  createPtMeasurementApi,
  getPtMeasurementsApi,
  deletePtMeasurementApi,
} from "../../services/apis/ptApis";

// ── Assignment Thunks ──────────────────────────────────────────────────────

export const fetchAllPtAssignmentsAction = () => async (dispatch: AppDispatch) => {
  dispatch(ptRequestStart());
  try {
    const res = await getAllPtAssignmentsApi();
    dispatch(setAssignments(res.data.assignments || []));
  } catch (error: any) {
    const msg = error?.response?.data?.message || "Failed to fetch assignments";
    dispatch(ptRequestFailure(msg));
    dispatch(showSnackbar({ message: msg, type: "error" }));
  }
};

export const fetchMyPtMembersAction = () => async (dispatch: AppDispatch) => {
  dispatch(ptRequestStart());
  try {
    const res = await getMyPtMembersApi();
    dispatch(setMyMembers(res.data.assignments || []));
  } catch (error: any) {
    const msg = error?.response?.data?.message || "Failed to fetch your PT members";
    dispatch(ptRequestFailure(msg));
    dispatch(showSnackbar({ message: msg, type: "error" }));
  }
};

export const fetchMemberPtInfoAction = (memberId: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await getMemberPtInfoApi(memberId);
    dispatch(setMemberPtInfo(res.data.assignment || null));
  } catch (error: any) {
    dispatch(setMemberPtInfo(null));
  }
};

export const assignPtAction = (memberId: string, trainerId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    // If trainerId is empty string, trainer is self-assigning — backend handles it
    await assignPtApi({ memberId, ...(trainerId ? { trainerId } : {}) });
    dispatch(showSnackbar({ message: "PT assigned successfully!", type: "success" }));
    const role = getState().auth.user?.role;
    if (role === 'trainer') {
      dispatch(fetchMyPtMembersAction());
    } else {
      dispatch(fetchAllPtAssignmentsAction());
    }
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to assign PT", type: "error" }));
    return false;
  }
};

export const removePtAssignmentAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await removePtAssignmentApi(id);
    dispatch(removeAssignmentById(id));
    dispatch(showSnackbar({ message: "PT assignment removed", type: "success" }));
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to remove assignment", type: "error" }));
  }
};

// ── Workout Plan Thunks ────────────────────────────────────────────────────

export const fetchPtWorkoutPlansAction = (memberId: string, date?: string) => async (dispatch: AppDispatch) => {
  dispatch(ptRequestStart());
  try {
    const res = await getPtWorkoutPlansApi(memberId, date);
    dispatch(setWorkoutPlans(res.data.plans || []));
  } catch (error: any) {
    dispatch(ptRequestFailure(error?.response?.data?.message || "Failed to fetch workout plans"));
  }
};

export const createPtWorkoutPlanAction = (data: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await createPtWorkoutPlanApi(data);
    dispatch(addWorkoutPlan(res.data.plan));
    dispatch(showSnackbar({ message: "Workout plan created!", type: "success" }));
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to create workout plan", type: "error" }));
    return false;
  }
};

export const deletePtWorkoutPlanAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await deletePtWorkoutPlanApi(id);
    dispatch(removeWorkoutPlan(id));
    dispatch(showSnackbar({ message: "Workout plan deleted", type: "success" }));
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to delete workout plan", type: "error" }));
  }
};

// ── Diet Plan Thunks (Manual — No AI) ─────────────────────────────────────

export const fetchPtDietPlansAction = (memberId: string, date?: string) => async (dispatch: AppDispatch) => {
  dispatch(ptRequestStart());
  try {
    const res = await getPtDietPlansApi(memberId, date);
    dispatch(setDietPlans(res.data.plans || []));
  } catch (error: any) {
    dispatch(ptRequestFailure(error?.response?.data?.message || "Failed to fetch diet plans"));
  }
};

export const createPtDietPlanAction = (data: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await createPtDietPlanApi(data);
    dispatch(addDietPlan(res.data.plan));
    dispatch(showSnackbar({ message: "Diet plan created!", type: "success" }));
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to create diet plan", type: "error" }));
    return false;
  }
};

export const deletePtDietPlanAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await deletePtDietPlanApi(id);
    dispatch(removeDietPlan(id));
    dispatch(showSnackbar({ message: "Diet plan deleted", type: "success" }));
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to delete diet plan", type: "error" }));
  }
};

// ── Measurement Thunks ─────────────────────────────────────────────────────

export const fetchPtMeasurementsAction = (memberId: string, date?: string) => async (dispatch: AppDispatch) => {
  dispatch(ptRequestStart());
  try {
    const res = await getPtMeasurementsApi(memberId, date);
    dispatch(setMeasurements(res.data.measurements || []));
  } catch (error: any) {
    dispatch(ptRequestFailure(error?.response?.data?.message || "Failed to fetch measurements"));
  }
};

export const createPtMeasurementAction = (data: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await createPtMeasurementApi(data);
    dispatch(addMeasurement(res.data.measurement));
    dispatch(showSnackbar({ message: "Measurement recorded!", type: "success" }));
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to record measurement", type: "error" }));
    return false;
  }
};

export const deletePtMeasurementAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await deletePtMeasurementApi(id);
    dispatch(removeMeasurement(id));
    dispatch(showSnackbar({ message: "Measurement deleted", type: "success" }));
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to delete measurement", type: "error" }));
  }
};

export { clearMemberPtData };
