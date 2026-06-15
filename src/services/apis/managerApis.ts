import { AxiosInstance } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";

export interface InviteManagerPayload {
  fullName: string;
  email: string;
  mobileNo: string;
}

export interface ResendInvitationPayload {
  email: string;
}

export const getManagersApi = async () => {
  const response = await AxiosInstance.get(apiRoutes.managers);
  return response;
};

export const inviteManagerApi = async (payload: InviteManagerPayload) => {
  const response = await AxiosInstance.post(apiRoutes.inviteManager, payload);
  return response;
};

export const resendInvitationApi = async (payload: ResendInvitationPayload) => {
  const response = await AxiosInstance.post(apiRoutes.resendInvitation, payload);
  return response;
};

export const deleteManagerApi = async (id: string) => {
  const response = await AxiosInstance.delete(`/managers/${id}`);
  return response;
};
