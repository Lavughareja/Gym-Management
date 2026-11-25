import { AxiosInstance } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";

export type DeviceProvider =
  | "zkteco"
  | "essl"
  | "realtime"
  | "hikvision"
  | "suprema"
  | "matrix"
  | "custom"
  | "mock";

export interface BiometricDevice {
  _id: string;
  id?: string;
  name: string;
  deviceId?: string;
  serialNumber: string;
  machineDeviceId?: number;
  provider: DeviceProvider | string;
  ipAddress?: string;
  port?: number;
  hasCommPassword?: boolean;
  status?: string;
  lastPing?: string;
  lastSyncAt?: string;
}

export interface DevicePayload {
  name: string;
  serialNumber: string;
  provider: DeviceProvider | string;
  ipAddress?: string;
  port?: number;
  commPassword?: string;
  machineDeviceId?: number;
}

export interface MachineUser {
  uid: number | string;
  deviceUserId: number | string;
  machineName: string;
  linkedMember?: {
    _id?: string;
    id?: string;
    fullName?: string;
    email?: string;
    biometricId?: string;
    deviceUserId?: number | string;
  } | null;
}

export const getDevicesApi = async () => {
  return await AxiosInstance.get(apiRoutes.devices);
};

export const addDeviceApi = async (payload: DevicePayload) => {
  return await AxiosInstance.post(apiRoutes.devices, payload);
};

export const updateDeviceApi = async (id: string, payload: Partial<DevicePayload>) => {
  return await AxiosInstance.put(`${apiRoutes.devices}/${id}`, payload);
};

export const deleteDeviceApi = async (id: string) => {
  return await AxiosInstance.delete(`${apiRoutes.devices}/${id}`);
};

export const testDeviceConnectionApi = async (id: string) => {
  return await AxiosInstance.post(`${apiRoutes.devices}/${id}/test-connection`);
};

export const syncDeviceLogsApi = async (id: string) => {
  return await AxiosInstance.post(`${apiRoutes.devices}/${id}/sync-logs`);
};

export const getMachineUsersApi = async (id: string) => {
  return await AxiosInstance.get(`${apiRoutes.devices}/${id}/machine-users`);
};

export const syncAllDevicesApi = async () => {
  return await AxiosInstance.post(`${apiRoutes.devices}/sync-all`);
};
