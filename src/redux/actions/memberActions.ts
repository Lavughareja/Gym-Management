import type { AppDispatch } from "../store";
import {
  getMembersApi,
  addMemberApi,
  bulkImportMembersApi,
  resendMemberInvitationApi,
  updateMemberDeviceUserApi,
  syncMemberToDeviceApi,
} from "../../services/apis/memberApis";
import { fetchMembersStart, fetchMembersSuccess, fetchMembersFailure } from "../slices/memberSlice";
import { showSnackbar } from "../slices/snackbarSlice";

export const fetchMembersAction = () => async (dispatch: AppDispatch) => {
  dispatch(fetchMembersStart());
  try {
    const res = await getMembersApi();
    if (res.data?.members) {
      const formattedMembers = res.data.members.map((m: any) => ({
        ...m,
        id: m._id,
        name: m.fullName,
        email: m.email || "",
        mobileNo: m.mobileNo || "",
        avatar: m.fullName.substring(0, 2).toUpperCase(),
        plan: m.planId?.name || "No Plan",
        status: m.isActive ? "Active" : "Inactive",
        joined: new Date(m.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }),
      }));
      dispatch(fetchMembersSuccess(formattedMembers));
    } else {
      dispatch(fetchMembersSuccess([]));
    }
  } catch (error: any) {
    dispatch(fetchMembersFailure(error?.response?.data?.message || "Failed to fetch members"));
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to fetch members", type: "error" }));
  }
};

export const addMemberAction = (memberData: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await addMemberApi(memberData);
    const deviceUserId = res.data?.user?.deviceUserId;
    const msg = deviceUserId
      ? `Member added successfully (Device User ID: ${deviceUserId})`
      : "Member added successfully!";
    dispatch(showSnackbar({ message: msg, type: "success" }));
    dispatch(fetchMembersAction());
    return res.data || true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to add member", type: "error" }));
    return false;
  }
};

export const bulkImportMembersAction = (formData: FormData) => async (dispatch: AppDispatch) => {
  try {
    const res = await bulkImportMembersApi(formData);
    dispatch(showSnackbar({ message: res.data?.message || "Members imported successfully!", type: "success" }));
    dispatch(fetchMembersAction());
    return res.data || true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to import members", type: "error" }));
    return false;
  }
};

export const updateMemberDeviceUserAction = (
  memberId: string,
  data: { deviceUserId: number | string; biometricDeviceId?: string; pushToDevice?: boolean }
) => async (dispatch: AppDispatch) => {
  try {
    const res = await updateMemberDeviceUserApi(memberId, data);
    dispatch(showSnackbar({ message: res.data?.message || "Machine User ID updated", type: "success" }));
    dispatch(fetchMembersAction());
    return res.data;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to update Machine User ID", type: "error" }));
    return null;
  }
};

export const syncMemberToDeviceAction = (
  memberId: string,
  data?: { biometricDeviceId?: string }
) => async (dispatch: AppDispatch) => {
  try {
    const res = await syncMemberToDeviceApi(memberId, data);
    dispatch(showSnackbar({ message: res.data?.message || "Member pushed to machine", type: "success" }));
    dispatch(fetchMembersAction());
    return res.data;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to push member to machine", type: "error" }));
    return null;
  }
};

export const resendMemberInvitationAction = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await resendMemberInvitationApi({ email });
    dispatch(showSnackbar({ message: res.data?.message || "Invitation sent successfully!", type: "success" }));
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to send invitation", type: "error" }));
    return false;
  }
};
