import type { AppDispatch } from "../store";
import { getMemberBmiHistoryApi, uploadBmiReportApi } from "../../services/apis/bmiApis";
import { getMemberDietHistoryApi } from "../../services/apis/dietApis";
import { fetchHealthDataStart, fetchHealthDataSuccess, fetchHealthDataFailure } from "../slices/healthSlice";
import { showSnackbar } from "../slices/snackbarSlice";

export const fetchHealthDataAction = (memberId: string) => async (dispatch: AppDispatch) => {
  if (!memberId) return;
  dispatch(fetchHealthDataStart());
  try {
    const [bmiRes, dietRes] = await Promise.all([
      getMemberBmiHistoryApi(memberId),
      getMemberDietHistoryApi(memberId)
    ]);
    dispatch(fetchHealthDataSuccess({
      bmiPhotos: bmiRes.data.reports || bmiRes.data.bmiReports || [],
      dietPlans: dietRes.data.dietPlans || []
    }));
  } catch (error: any) {
    dispatch(fetchHealthDataFailure(error?.response?.data?.message || "Failed to fetch health data"));
  }
};

export const uploadBmiReportAction = (formData: FormData, memberId: string) => async (dispatch: AppDispatch) => {
  try {
    await uploadBmiReportApi(formData);
    dispatch(showSnackbar({ message: "BMI Photo Uploaded!", type: "success" }));
    dispatch(fetchHealthDataAction(memberId));
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to upload photo", type: "error" }));
    return false;
  }
};
