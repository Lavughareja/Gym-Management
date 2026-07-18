import { AxiosInstance } from "../../axios/axiosInstance";

export const getMemberInvoicesApi = async () => {
  return await AxiosInstance.get("/invoices/member");
};

export const getGymInvoiceSettingsApi = async () => {
  return await AxiosInstance.get("/invoices/settings");
};

export const updateGymInvoiceSettingsApi = async (data: { address?: string; phone?: string; gstNumber?: string; invoiceTerms?: string }) => {
  return await AxiosInstance.put("/invoices/settings", data);
};
