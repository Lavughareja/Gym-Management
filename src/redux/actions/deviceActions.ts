import type { AppDispatch } from "../store";
import {
  getDevicesApi,
  addDeviceApi,
  updateDeviceApi,
  deleteDeviceApi,
  testDeviceConnectionApi,
  syncDeviceLogsApi,
  syncAllDevicesApi,
  type DevicePayload,
} from "../../services/apis/biometricApis";
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

export const addDeviceAction = (deviceData: DevicePayload) => async (dispatch: AppDispatch) => {
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

export const updateDeviceAction = (id: string, deviceData: Partial<DevicePayload>) => async (dispatch: AppDispatch) => {
  try {
    await updateDeviceApi(id, deviceData);
    dispatch(showSnackbar({ message: "Device updated successfully", type: "success" }));
    dispatch(fetchDevicesAction());
    return true;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to update device", type: "error" }));
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

export const testDeviceConnectionAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await testDeviceConnectionApi(id);
    const msg = res.data?.message || "Connection test succeeded";
    const timeNote = res.data?.deviceTime ? ` (Device time: ${res.data.deviceTime})` : "";
    dispatch(showSnackbar({ message: `${msg}${timeNote}`, type: "success" }));
    dispatch(fetchDevicesAction());
    return res.data;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Connection test failed", type: "error" }));
    return null;
  }
};

export const syncDeviceLogsAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await syncDeviceLogsApi(id);
    const { message, totalFetched, matchedAndSaved, duplicatesSkipped } = res.data || {};
    const summary =
      typeof totalFetched === "number"
        ? `Fetched ${totalFetched}, saved ${matchedAndSaved ?? 0}, skipped ${duplicatesSkipped ?? 0}`
        : message || "Logs synced successfully";
    dispatch(showSnackbar({ message: summary, type: "success" }));
    dispatch(fetchDevicesAction());
    return res.data;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to sync logs", type: "error" }));
    return null;
  }
};

export const syncAllDevicesAction = () => async (dispatch: AppDispatch) => {
  try {
    const res = await syncAllDevicesApi();
    dispatch(showSnackbar({ message: res.data?.message || "All devices synced successfully", type: "success" }));
    dispatch(fetchDevicesAction());
    return res.data;
  } catch (error: any) {
    dispatch(showSnackbar({ message: error?.response?.data?.message || "Failed to sync all devices", type: "error" }));
    return null;
  }
};
