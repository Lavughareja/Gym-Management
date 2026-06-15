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
