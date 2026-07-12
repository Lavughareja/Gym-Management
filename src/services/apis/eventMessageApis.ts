import { AxiosInstance } from '../../axios/axiosInstance';

export const createEventMessageApi = async (data: { title: string; message: string; scheduledDate: string; sendNow: boolean }) => {
  return await AxiosInstance.post('/events', data);
};

export const getEventMessagesApi = async () => {
  return await AxiosInstance.get('/events');
};
