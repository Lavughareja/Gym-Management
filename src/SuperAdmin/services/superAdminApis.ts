import { AxiosInstance } from "../../axios/axiosInstance";

// ─────────────────────────────────────────────────────────────────────────────
// Super Admin API calls  →  /api/superadmin/*
// ─────────────────────────────────────────────────────────────────────────────

export const saUploadImageApi = (file: File) => {
  const form = new FormData();
  form.append("image", file);
  return AxiosInstance.post("/superadmin/upload-image", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const saUploadVideoApi = (file: File, onProgress?: (progress: number) => void) => {
  const form = new FormData();
  form.append("video", file);
  return AxiosInstance.post("/superadmin/upload-video", form, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    }
  });
};

export const fetchDashboardStatsApi = () =>
  AxiosInstance.get("/superadmin/dashboard");

export const fetchAllGymsApi = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => AxiosInstance.get("/superadmin/gyms", { params });

export const fetchGymDetailApi = (gymId: string) =>
  AxiosInstance.get(`/superadmin/gym/${gymId}`);

export const toggleGymStatusApi = (gymId: string) =>
  AxiosInstance.patch(`/superadmin/gym/${gymId}/toggle-status`);

// ─────────────────────────────────────────────────────────────────────────────
// Workout Library — Category management
// ─────────────────────────────────────────────────────────────────────────────

export const saFetchCategoriesApi = () =>
  AxiosInstance.get("/superadmin/workout-categories");

export const saCreateCategoryApi = (data: {
  name: string;
  coverImage: string;
  description?: string;
  isPublished?: boolean;
}) => AxiosInstance.post("/superadmin/workout-categories", data);

export const saUpdateCategoryApi = (id: string, data: object) =>
  AxiosInstance.put(`/superadmin/workout-categories/${id}`, data);

export const saDeleteCategoryApi = (id: string) =>
  AxiosInstance.delete(`/superadmin/workout-categories/${id}`);

// ─────────────────────────────────────────────────────────────────────────────
// Workout Library — Video management
// ─────────────────────────────────────────────────────────────────────────────

export const saFetchVideosApi = (categoryId: string) =>
  AxiosInstance.get(`/superadmin/workout-categories/${categoryId}/videos`);

export const saCreateVideoApi = (
  categoryId: string,
  data: {
    title: string;
    videoUrl: string;
    thumbnailUrl?: string;
    bodyPart: string;
    musclesTargeted?: string[];
    difficulty?: string;
    durationSecs?: number;
    description?: string;
    order?: number;
  }
) => AxiosInstance.post(`/superadmin/workout-categories/${categoryId}/videos`, data);

export const saUpdateVideoApi = (videoId: string, data: object) =>
  AxiosInstance.put(`/superadmin/workout-videos/${videoId}`, data);

export const saDeleteVideoApi = (videoId: string) =>
  AxiosInstance.delete(`/superadmin/workout-videos/${videoId}`);

// ─────────────────────────────────────────────────────────────────────────────
// FAQ management
// ─────────────────────────────────────────────────────────────────────────────

export const saFetchFaqsApi = () => AxiosInstance.get("/faq/sa");

export const saCreateFaqApi = (data: { question: string; answer: string; isActive?: boolean }) =>
  AxiosInstance.post("/faq/sa", data);

export const saUpdateFaqApi = (id: string, data: object) =>
  AxiosInstance.put(`/faq/sa/${id}`, data);

export const saDeleteFaqApi = (id: string) =>
  AxiosInstance.delete(`/faq/sa/${id}`);

export const fetchPublicFaqsApi = () => AxiosInstance.get("/faq");

// ─────────────────────────────────────────────────────────────────────────────
// Blog management
// ─────────────────────────────────────────────────────────────────────────────

export const saFetchBlogsApi = () => AxiosInstance.get("/blogs?all=true");

export const saCreateBlogApi = (data: { title: string; content: string; author?: string; imageUrl?: string; isPublished?: boolean }) =>
  AxiosInstance.post("/blogs", data);

export const saUpdateBlogApi = (id: string, data: object) =>
  AxiosInstance.put(`/blogs/${id}`, data);

export const saDeleteBlogApi = (id: string) =>
  AxiosInstance.delete(`/blogs/${id}`);

export const fetchPublicBlogsApi = () => AxiosInstance.get("/blogs");

export const fetchBlogBySlugApi = (slug: string) => AxiosInstance.get(`/blogs/slug/${slug}`);

