import { AxiosInstance } from "../../axios/axiosInstance";

export const updatePermissionApi = (userId: string, data: { canAddMember: boolean }) => {
  return AxiosInstance.patch(`/users/${userId}/permissions`, data);
};
