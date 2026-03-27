import { api } from "../../api/client";

const PATH = "/api/live-streams";

export type LiveStreamItem = {
  id: string;
  title: string;
  youtubeUrl: string;
  videoId: string | null;
  sortOrder: number;
  createdAt: string;
};

export async function getLiveStreams(): Promise<{
  success: boolean;
  items?: LiveStreamItem[];
  error?: string;
}> {
  const res = await api.get(PATH, { validateStatus: () => true });
  if (res.status !== 200) {
    return {
      success: false,
      error: (res.data as { error?: string })?.error || "Erro ao carregar transmissões.",
    };
  }
  return res.data as { success: boolean; items?: LiveStreamItem[] };
}

export async function postLiveStreamAdmin(
  password: string,
  body: { title: string; youtubeUrl: string }
): Promise<{ success: boolean; item?: LiveStreamItem; error?: string }> {
  const res = await api.post(`${PATH}/admin`, body, {
    headers: { "X-Admin-Password": password },
    validateStatus: () => true,
  });
  if (res.status === 401) {
    return { success: false, error: "Não autorizado" };
  }
  if (res.status !== 201) {
    return {
      success: false,
      error: (res.data as { error?: string })?.error || "Erro ao salvar.",
    };
  }
  return res.data as { success: boolean; item?: LiveStreamItem };
}

export async function patchLiveStreamAdmin(
  password: string,
  id: string,
  body: { title: string; youtubeUrl: string }
): Promise<{ success: boolean; item?: LiveStreamItem; error?: string }> {
  const res = await api.patch(`${PATH}/admin/${encodeURIComponent(id)}`, body, {
    headers: { "X-Admin-Password": password },
    validateStatus: () => true,
  });
  if (res.status === 401) {
    return { success: false, error: "Não autorizado" };
  }
  if (res.status !== 200) {
    return {
      success: false,
      error: (res.data as { error?: string })?.error || "Erro ao atualizar.",
    };
  }
  return res.data as { success: boolean; item?: LiveStreamItem };
}

export async function deleteLiveStreamAdmin(
  password: string,
  id: string
): Promise<{ success: boolean; error?: string }> {
  const res = await api.delete(`${PATH}/admin/${encodeURIComponent(id)}`, {
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
