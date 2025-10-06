import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API methods
export const apiService = {
  getMeta: () => api.get("/meta").then((res) => res.data),
  getCallInfo: () => api.get("/meta/call").then((res) => res.data),
  getCommittees: () => api.get("/meta/committees").then((res) => res.data),
  getSpeakers: () => api.get("/speakers").then((res) => res.data),
  getSpeaker: (id: string) => api.get(`/speakers/${id}`).then((res) => res.data),
  getProgram: () => api.get("/program").then((res) => res.data),
  getFees: () => api.get("/fees").then((res) => res.data),
  submitAbstract: (data: any) => api.post("/submissions", data).then((res) => res.data),
  submitPanel: (data: any) => api.post("/panels", data).then((res) => res.data),
  sendContactMessage: (data: { name: string; email: string; message: string }) =>
    api.post("/contact", data).then((res) => res.data),
};

export default apiService;
