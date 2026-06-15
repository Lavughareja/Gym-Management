import { AxiosInstance } from "../../axios/axiosInstance";

export const inviteTrainerApi = (data: { fullName: string; email: string; mobileNo: string }) => {
  return AxiosInstance.post('/trainers/invite', data);
};

export const resendTrainerInvitationApi = (data: { email: string }) => {
  return AxiosInstance.post('/trainers/resend-invitation', data);
};

export const getTrainersApi = () => {
  return AxiosInstance.get('/trainers');
};

export const deleteTrainerApi = (id: string) => {
  return AxiosInstance.delete(`/trainers/${id}`);
};
