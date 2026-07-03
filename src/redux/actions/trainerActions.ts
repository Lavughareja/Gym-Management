import type { AppDispatch } from "../store";
import { getTrainersApi, inviteTrainerApi, resendTrainerInvitationApi, deleteTrainerApi } from "../../services/apis/trainerApis";
import { updatePermissionApi } from "../../services/apis/permissionApis";
import { fetchTrainersStart, fetchTrainersSuccess, fetchTrainersFailure, updateTrainerStatus } from "../slices/trainerSlice";
import { showSnackbar } from "../slices/snackbarSlice";

export const fetchTrainersAction = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTrainersStart());
  try {
    const res = await getTrainersApi();
    dispatch(fetchTrainersSuccess(res.data.trainers || []));
  } catch (error: any) {
    dispatch(fetchTrainersFailure(error?.response?.data?.message || "Failed to fetch trainers"));
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to fetch trainers", type: "error" }));
  }
};

export const inviteTrainerAction = (trainerData: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await inviteTrainerApi(trainerData);
    dispatch(showSnackbar({ message: res.data.message || "Invitation sent!", type: "success" }));
    dispatch(fetchTrainersAction());
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to invite trainer", type: "error" }));
    return false;
  }
};

export const resendTrainerInviteAction = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await resendTrainerInvitationApi({ email });
    dispatch(showSnackbar({ message: res.data.message || "Invitation resent!", type: "success" }));
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to resend invite", type: "error" }));
  }
};

export const deleteTrainerAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await deleteTrainerApi(id);
    dispatch(showSnackbar({ message: "Trainer deleted", type: "success" }));
    dispatch(fetchTrainersAction());
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to delete trainer", type: "error" }));
  }
};

export const updateTrainerPermissionAction = (id: string, canAddMember: boolean) => async (dispatch: AppDispatch) => {
  try {
    // Optimistic update could go here
    await updatePermissionApi(id, { canAddMember });
    dispatch(updateTrainerStatus({ id, canAddMember }));
    dispatch(showSnackbar({ message: "Permissions updated", type: "success" }));
  } catch (error: any) {
    // Revert logic on failure can be added
    dispatch(updateTrainerStatus({ id, canAddMember: !canAddMember }));
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to update permissions", type: "error" }));
  }
};
