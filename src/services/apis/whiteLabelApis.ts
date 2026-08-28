import { AxiosInstance } from '../../axios/axiosInstance';
import { apiRoutes } from '../../utils/ApiRoutes';

// ─────────────────────────────────────────────────────────────────────────────
// White Label APIs
// ─────────────────────────────────────────────────────────────────────────────

// Called on app load to resolve gym branding from subdomain
export const resolveWhiteLabelBySubdomain = (subdomain: string) =>
  AxiosInstance.get(`${apiRoutes.resolveWhiteLabel}?subdomain=${subdomain}`);

// Called for mobile / QR code flow
export const resolveWhiteLabelByCode = (code: string) =>
  AxiosInstance.get(`${apiRoutes.resolveWhiteLabel}?code=${code}`);

// Owner branding — GET current branding
export const getOwnerBrandingApi = () =>
  AxiosInstance.get(apiRoutes.ownerBranding);

// Owner branding — PUT update branding fields
export const updateOwnerBrandingApi = (data: {
  gymName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tagline?: string;
  subdomain?: string;
}) => AxiosInstance.put(apiRoutes.ownerBranding, data);

// Owner branding — POST upload logo
export const uploadOwnerLogoApi = (formData: FormData) =>
  AxiosInstance.post(apiRoutes.ownerBrandingLogo, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Owner branding — GET check subdomain availability
export const checkSubdomainApi = (subdomain: string) =>
  AxiosInstance.get(`${apiRoutes.ownerBrandingSubdomain}?subdomain=${subdomain}`);
