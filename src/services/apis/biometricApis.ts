import { AxiosInstance } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";

export interface AddDevicePayload {
  name: string;
  serialNumber: string;
  provider: string;
}

export const getDevicesApi = async () => {
  const response = await AxiosInstance.get(apiRoutes.devices);
  return response;
};

export const addDeviceApi = async (payload: AddDevicePayload) => {
  const response = await AxiosInstance.post(apiRoutes.devices, payload);
  return response;
};
