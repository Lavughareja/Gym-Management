import { AxiosInstance } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";

export const generateDietPlanApi = async (data: { bmiReportId: string; goal?: string }) => {
  return await AxiosInstance.post(apiRoutes.dietGenerate, data);
};

export const getMemberDietHistoryApi = async (memberId: string) => {
  return await AxiosInstance.get(`${apiRoutes.dietMember}/${memberId}`);
};
