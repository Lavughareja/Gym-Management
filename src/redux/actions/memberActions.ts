import type { AppDispatch } from "../store";
import { getMembersApi, addMemberApi, bulkImportMembersApi } from "../../services/apis/memberApis";
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
        joined: new Date(m.createdAt).toLocaleDateString(),
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
    await addMemberApi(memberData);
    dispatch(showSnackbar({ message: "Member added successfully!", type: "success" }));
    dispatch(fetchMembersAction());
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to add member", type: "error" }));
    return false;
  }
};

export const bulkImportMembersAction = (formData: FormData) => async (dispatch: AppDispatch) => {
  try {
    await bulkImportMembersApi(formData);
    dispatch(showSnackbar({ message: "Members imported successfully!", type: "success" }));
    dispatch(fetchMembersAction());
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to import members", type: "error" }));
    return false;
  }
};
