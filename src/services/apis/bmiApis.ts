import { AxiosInstance } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";

export const uploadBmiReportApi = async (formData: FormData) => {
  // Use multipart/form-data for file upload
  return await AxiosInstance.post(apiRoutes.bmi, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMemberBmiHistoryApi = async (memberId: string) => {
  return await AxiosInstance.get(`${apiRoutes.bmiMember}/${memberId}`);
};

export const getLatestBmiReportApi = async (memberId: string) => {
  return await AxiosInstance.get(`${apiRoutes.bmiLatest}/${memberId}`);
};
