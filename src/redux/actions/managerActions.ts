import type { AppDispatch } from "../store";
import { getManagersApi, inviteManagerApi, resendInvitationApi, deleteManagerApi } from "../../services/apis/managerApis";
import { updatePermissionApi } from "../../services/apis/permissionApis";
import { fetchManagersStart, fetchManagersSuccess, fetchManagersFailure, updateManagerStatus } from "../slices/managerSlice";
import { showSnackbar } from "../slices/snackbarSlice";

export const fetchManagersAction = () => async (dispatch: AppDispatch) => {
  dispatch(fetchManagersStart());
  try {
    const res = await getManagersApi();
    dispatch(fetchManagersSuccess(res.data.managers || []));
  } catch (error: any) {
    dispatch(fetchManagersFailure(error?.response?.data?.message || "Failed to fetch managers"));
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to fetch managers", type: "error" }));
  }
};

export const inviteManagerAction = (managerData: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await inviteManagerApi(managerData);
    dispatch(showSnackbar({ message: res.data.message || "Invitation sent!", type: "success" }));
    dispatch(fetchManagersAction());
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to invite manager", type: "error" }));
    return false;
  }
};

export const resendManagerInviteAction = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await resendInvitationApi({ email });
    dispatch(showSnackbar({ message: res.data.message || "Invitation resent!", type: "success" }));
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to resend invite", type: "error" }));
  }
};

export const deleteManagerAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await deleteManagerApi(id);
    dispatch(showSnackbar({ message: "Manager deleted", type: "success" }));
    dispatch(fetchManagersAction());
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to delete manager", type: "error" }));
  }
};

export const updateManagerPermissionAction = (id: string, canAddMember: boolean) => async (dispatch: AppDispatch) => {
  try {
    await updatePermissionApi(id, { canAddMember });
    dispatch(updateManagerStatus({ id, canAddMember }));
    dispatch(showSnackbar({ message: "Permissions updated", type: "success" }));
  } catch (error: any) {
    dispatch(updateManagerStatus({ id, canAddMember: !canAddMember }));
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to update permissions", type: "error" }));
  }
};
