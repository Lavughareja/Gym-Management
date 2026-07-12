import { AxiosInstance as api } from "../../axios/axiosInstance";
import { apiRoutes } from "../../utils/ApiRoutes";

export const getCrmDashboardApi = async () => {
  return await api.get(apiRoutes.crmDashboard);
};

// Leads
export const createLeadApi = async (data: any) => {
  return await api.post(apiRoutes.crmLeads, data);
};

export const getLeadsApi = async (params: any) => {
  return await api.get(apiRoutes.crmLeads, { params });
};

export const getLeadByIdApi = async (id: string) => {
  return await api.get(`${apiRoutes.crmLeads}/${id}`);
};

export const updateLeadApi = async (id: string, data: any) => {
  return await api.put(`${apiRoutes.crmLeads}/${id}`, data);
};

export const deleteLeadApi = async (id: string) => {
  return await api.delete(`${apiRoutes.crmLeads}/${id}`);
};

export const convertLeadApi = async (id: string, data: any) => {
  return await api.post(apiRoutes.crmLeadsConvert.replace(':id', id), data);
};

// Follow-ups
export const createFollowUpApi = async (data: any) => {
  return await api.post(apiRoutes.crmFollowUps, data);
};

export const getFollowUpsApi = async (params: any) => {
  return await api.get(apiRoutes.crmFollowUps, { params });
};

export const updateFollowUpApi = async (id: string, data: any) => {
  return await api.put(`${apiRoutes.crmFollowUps}/${id}`, data);
};
