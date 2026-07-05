import { AxiosInstance } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";

export const bulkImportMembersApi = async (formData: FormData) => {
  const response = await AxiosInstance.post(apiRoutes.bulkImportMembers, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const addMemberApi = async (data: { fullName: string; email: string; mobileNo: string; planId?: string; durationMonths?: string | number; extraDays?: string | number; startDate?: string; secondaryPhone?: string; emergencyNumber?: string; bloodGroup?: string; amountPaid?: number | string; dateOfBirth?: string }) => {
  const response = await AxiosInstance.post(apiRoutes.addMember, data);
  return response;
};

export const getMembersApi = async () => {
  return await AxiosInstance.get(apiRoutes.getMembers);
};

export const memberSetupApi = async (data: { token: string; password: string; dateOfBirth?: string }) => {
  const response = await AxiosInstance.post(apiRoutes.memberSetup, data);
  return response;
};

export const getMeApi = async () => {
  return await AxiosInstance.get(`${apiRoutes.getMembers}/me`);
};

export const getWeeklyStatsApi = async () => {
  return await AxiosInstance.get(`${apiRoutes.getMembers}/weekly-stats`);
};

export const getStreakStatsApi = async () => {
  return await AxiosInstance.get(apiRoutes.memberStreak);
};

export const completeChallengeApi = async (data: { xp: number }) => {
  return await AxiosInstance.post(`${apiRoutes.getMembers}/complete-challenge`, data);
};
