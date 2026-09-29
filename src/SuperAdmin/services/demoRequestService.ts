import { AxiosInstance } from '../../axios/axiosInstance';
import { apiRoutes } from '../../utils/ApiRoutes';

export const getDemoRequests = async () => {
  const response = await AxiosInstance.get(apiRoutes.demoRequests);
  return response.data;
};

export const updateDemoRequestStatus = async (id: string, status: string, notes: string) => {
  const response = await AxiosInstance.put(apiRoutes.demoRequestStatus.replace(':id', id), { status, notes });
  return response.data;
};

export const startTrialForRequest = async (id: string) => {
  const response = await AxiosInstance.post(apiRoutes.startTrial.replace(':id', id));
  return response.data;
};
