import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://conferenciaapi-production.up.railway.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API methods
export const apiService = {
  getMeta: () => api.get("/api/meta").then((res) => res.data),
  getCallInfo: () => api.get("/api/meta/call").then((res) => res.data),
  getCommittees: () => api.get("/api/meta/committees").then((res) => res.data),
  getSpeakers: () => api.get("/api/speakers").then((res) => res.data),
  getSpeaker: (id: string) => api.get(`/api/speakers/${id}`).then((res) => res.data),
  getProgram: () => api.get("/api/program").then((res) => res.data),
  getFees: () => api.get("/api/fees").then((res) => res.data),
  submitAbstract: (data: any) => api.post("/api/submissions", data).then((res) => res.data),
  submitPanel: (data: any) => api.post("/api/panels", data).then((res) => res.data),
  sendContactMessage: (data: { name: string; email: string; message: string }) =>
    api.post("/api/contact", data).then((res) => res.data),

  // Photos API
  uploadPhotos: (formData: FormData) =>
    api
      .post("/api/photos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),
  getPhotos: (status?: string) =>
    api.get(`/api/photos${status ? `?status=${status}` : ""}`).then((res) => res.data),
  updatePhotoStatus: (id: string, status: string, adminPassword: string) =>
    api
      .patch(
        `/api/photos/admin/${id}`,
        { status },
        {
          headers: { "X-Admin-Password": adminPassword },
        }
      )
      .then((res) => res.data),
  deletePhoto: (id: string, adminPassword: string) =>
    api
      .delete(`/api/photos/admin/${id}`, {
        headers: { "X-Admin-Password": adminPassword },
      })
      .then((res) => res.data),

  // Likes API
  toggleLike: (photoId: string, visitorId: string) =>
    api.post(`/api/photos/${photoId}/like`, { visitorId }).then((res) => res.data),
  getLikes: (photoId: string, visitorId?: string) =>
    api
      .get(`/api/photos/${photoId}/likes${visitorId ? `?visitorId=${visitorId}` : ""}`)
      .then((res) => res.data),

  // Comments API
  addComment: (photoId: string, authorName: string, content: string) =>
    api.post(`/api/photos/${photoId}/comments`, { authorName, content }).then((res) => res.data),
  getComments: (photoId: string) =>
    api.get(`/api/photos/${photoId}/comments`).then((res) => res.data),

  // Stats (batch likes/comments)
  getPhotoStats: (photoIds: string[], visitorId?: string) =>
    api.post("/api/photos/stats", { photoIds, visitorId }).then((res) => res.data),
};

export default apiService;
