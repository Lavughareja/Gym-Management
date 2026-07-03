import type { AppDispatch } from "../store";
import { getDevicesApi, addDeviceApi, deleteDeviceApi } from "../../services/apis/biometricApis";
import { fetchDevicesStart, fetchDevicesSuccess, fetchDevicesFailure } from "../slices/deviceSlice";
import { showSnackbar } from "../slices/snackbarSlice";

export const fetchDevicesAction = () => async (dispatch: AppDispatch) => {
  dispatch(fetchDevicesStart());
  try {
    const res = await getDevicesApi();
    dispatch(fetchDevicesSuccess(res.data.devices || []));
  } catch (error: any) {
    dispatch(fetchDevicesFailure(error?.response?.data?.message || "Failed to fetch devices"));
  }
};

export const addDeviceAction = (deviceData: any) => async (dispatch: AppDispatch) => {
  try {
    await addDeviceApi(deviceData);
    dispatch(showSnackbar({ message: "Device added successfully", type: "success" }));
    dispatch(fetchDevicesAction());
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to add device", type: "error" }));
    return false;
  }
};

export const deleteDeviceAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await deleteDeviceApi(id);
    dispatch(showSnackbar({ message: "Device removed successfully", type: "success" }));
    dispatch(fetchDevicesAction());
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to remove device", type: "error" }));
  }
};
