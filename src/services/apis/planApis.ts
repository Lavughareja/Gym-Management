import { AxiosInstance } from '../../axios/axiosInstance';
import { apiRoutes } from '../../utils/ApiRoutes';

export const createPlanApi = async (data: any) => {
  return await AxiosInstance.post(apiRoutes.createPlan, data);
};

export const getPlansApi = async () => {
  return await AxiosInstance.get(apiRoutes.getPlans);
};

export const deletePlanApi = async (planId: string) => {
  return await AxiosInstance.delete(apiRoutes.deletePlan.replace(':planId', planId));
};
