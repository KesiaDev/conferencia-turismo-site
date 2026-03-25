import { api } from "../../api/client";

const AUTH_PATH = "/api/authorization";

export type AuthorizationRow = {
  id: string;
  name: string;
  document: string;
  email: string;
  summary: string;
  accepted: boolean;
  ip: string | null;
  createdAt: string;
};

export async function postAuthorization(body: {
  name: string;
  document: string;
  email: string;
  summary: string;
  accepted: boolean;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  const res = await api.post(`${AUTH_PATH}`, body);
  return res.data;
}

export async function getAuthorizationsAdmin(
  password: string,
  q?: string
): Promise<{ success: boolean; items?: AuthorizationRow[]; error?: string }> {
  const res = await api.get(`${AUTH_PATH}/admin`, {
    params: q ? { q } : undefined,
    headers: { "X-Admin-Password": password },
    validateStatus: () => true,
  });
  if (res.status === 401) {
    return { success: false, error: "Não autorizado" };
  }
  if (res.status !== 200) {
    return {
      success: false,
      error: (res.data as { error?: string })?.error || "Erro ao listar.",
    };
  }
  return res.data as { success: boolean; items?: AuthorizationRow[]; error?: string };
}

export async function deleteAuthorizationAdmin(
  password: string,
  id: string
): Promise<{ success: boolean; error?: string }> {
  const res = await api.delete(`${AUTH_PATH}/admin/${encodeURIComponent(id)}`, {
    headers: { "X-Admin-Password": password },
    validateStatus: () => true,
  });
  if (res.status === 401) {
    return { success: false, error: "Não autorizado" };
  }
  if (res.status !== 200) {
    return {
      success: false,
      error: (res.data as { error?: string })?.error || "Erro ao excluir.",
    };
  }
  return { success: true };
}
