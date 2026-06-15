import { AxiosInstance } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";

export const getTodayAttendanceApi = async () => {
  const response = await AxiosInstance.get(apiRoutes.attendanceToday);
  return response;
};
