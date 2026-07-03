import type { AppDispatch } from "../store";
import { getPlansApi, createPlanApi, deletePlanApi } from "../../services/apis/planApis";
import { fetchPlansStart, fetchPlansSuccess, fetchPlansFailure } from "../slices/planSlice";
import { showSnackbar } from "../slices/snackbarSlice";

export const fetchPlansAction = () => async (dispatch: AppDispatch) => {
  dispatch(fetchPlansStart());
  try {
    const res = await getPlansApi();
    dispatch(fetchPlansSuccess(res.data?.plans || []));
  } catch (error: any) {
    dispatch(fetchPlansFailure(error?.response?.data?.message || "Failed to fetch plans"));
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to fetch plans", type: "error" }));
  }
};

export const createPlanAction = (planData: any) => async (dispatch: AppDispatch) => {
  try {
    await createPlanApi(planData);
    dispatch(showSnackbar({ message: "Plan created!", type: "success" }));
    dispatch(fetchPlansAction());
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to create plan", type: "error" }));
    return false;
  }
};

export const deletePlanAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await deletePlanApi(id);
    dispatch(showSnackbar({ message: "Plan deleted!", type: "success" }));
    dispatch(fetchPlansAction());
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to delete plan", type: "error" }));
  }
};
