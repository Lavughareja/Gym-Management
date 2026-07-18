import { AxiosInstance as axiosInstance } from "../../axios/axiosInstance";

export const getExpensesApi = async () => {
  return await axiosInstance.get("/expenses");
};

export const getExpenseSummaryApi = async (days = 30) => {
  return await axiosInstance.get(`/expenses/summary?days=${days}`);
};

export const addExpenseApi = async (data: { title: string; description?: string; amount: number; date?: string; category?: string }) => {
  return await axiosInstance.post("/expenses", data);
};

export const deleteExpenseApi = async (id: string) => {
  return await axiosInstance.delete(`/expenses/${id}`);
};
