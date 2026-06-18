import { AxiosInstance } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";

export const getWorkoutsApi = async () => {
  const response = await AxiosInstance.get(apiRoutes.workouts);
  return response;
};

export const createWorkoutApi = async (data: { name: string; bodyPart: string }) => {
  const response = await AxiosInstance.post(apiRoutes.workouts, data);
  return response;
};

export const logWorkoutApi = async (data: { workoutId: string; date: string; startTime: string; endTime: string; duration: number }) => {
  const response = await AxiosInstance.post(apiRoutes.logWorkout, data);
  return response;
};

export const getWorkoutReportApi = async (type: "daily" | "monthly" | "yearly", date: string) => {
  const response = await AxiosInstance.get(`${apiRoutes.workoutReport}?type=${type}&date=${date}`);
  return response;
};
