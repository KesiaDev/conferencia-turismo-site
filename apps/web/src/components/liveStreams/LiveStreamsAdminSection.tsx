import { FormEvent, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  deleteLiveStreamAdmin,
  getLiveStreams,
  postLiveStreamAdmin,
  type LiveStreamItem,
} from "../../lib/liveStreams/api";

const STORAGE_KEY = "anais_admin_pw";

export default function LiveStreamsAdminSection() {
  const [sessionPw, setSessionPw] = useState(() => sessionStorage.getItem(STORAGE_KEY) || "");
  const [items, setItems] = useState<LiveStreamItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const load = useCallback(async () => {
    if (!sessionPw) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getLiveStreams();
      if (!res.success) {
        setError(res.error || "Falha ao carregar vídeos.");
        return;
      }
      setItems(res.items || []);
    } catch {
      setError("Erro de rede ao carregar vídeos.");
    } finally {
      setLoading(false);
    }
  }, [sessionPw]);

  useEffect(() => {
    if (sessionPw) void load();
  }, [sessionPw, load]);

  const onAdd = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!sessionPw) return;
    setError(null);
    setLoading(true);
    try {
      const res = await postLiveStreamAdmin(sessionPw, {
        title: titleInput.trim(),
        youtubeUrl: urlInput.trim(),
      });
      if (!res.success) {
        if (res.error === "Não autorizado") {
          sessionStorage.removeItem(STORAGE_KEY);
          setSessionPw("");
        }
        setError(res.error || "Não foi possível adicionar.");
        return;
      }
      if (res.item) {
        setItems((prev) =>
          [...prev, res.item!].sort((a, b) => {
            const d = a.sortOrder - b.sortOrder;
            if (d !== 0) return d;
            return a.createdAt.localeCompare(b.createdAt);
          })
        );
      }
      setTitleInput("");
      setUrlInput("");
    } catch {
      setError("Erro de rede ao adicionar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row: LiveStreamItem) => {
    const ok = window.confirm(`Remover o vídeo "${row.title}" da página pública?`);
    if (!ok) return;
    if (!sessionPw) return;
    setError(null);
    setDeletingId(row.id);
    try {
      const res = await deleteLiveStreamAdmin(sessionPw, row.id);
      if (!res.success) {
        if (res.error === "Não autorizado") {
          sessionStorage.removeItem(STORAGE_KEY);
          setSessionPw("");
        }
        setError(res.error || "Não foi possível excluir.");
        return;
      }
      setItems((prev) => prev.filter((x) => x.id !== row.id));
    } catch {
      setError("Erro de rede ao excluir.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!sessionPw) {
    return null;
  }

  return (
    <div className="w-full max-w-[min(100%,90rem)] mx-auto space-y-6 rounded-2xl border border-stone-200/60 bg-white/90 p-4 shadow-xl backdrop-blur-sm ring-1 ring-black/[0.04] sm:p-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Assista online — vídeos no site</h2>
        <p className="text-sm text-stone-600 mt-1">
          Cole o título e o link do YouTube (transmissão ao vivo ou vídeo gravado). Eles aparecem na
          página pública &quot;Assista online&quot; com o player embutido.
        </p>
      </div>

      <form
        onSubmit={onAdd}
        className="space-y-3 rounded-xl border border-stone-200 bg-stone-50/80 p-4"
      >
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
          <div>
            <label htmlFor="ls-title" className="block text-sm font-medium text-stone-800 mb-1">
              Título exibido no site
            </label>
            <input
              id="ls-title"
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Ex.: Abertura oficial — palestra de abertura"
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
              disabled={loading}
              required
            />
          </div>
          <div>
            <label htmlFor="ls-url" className="block text-sm font-medium text-stone-800 mb-1">
              Link do YouTube
            </label>
            <input
              id="ls-url"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://www.youtube.com/live/... ou watch?v=..."
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
              disabled={loading}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-[#c47862] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#b56a52] disabled:opacity-60"
          >
            {loading ? "Salvando…" : "Adicionar vídeo"}
          </button>
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50"
          >
            {loading ? "Atualizando…" : "Atualizar lista"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead className="bg-stone-100 text-stone-700">
            <tr>
              <th className="px-3 py-2 font-medium min-w-[200px]">Título</th>
              <th className="px-3 py-2 font-medium min-w-[220px]">Link</th>
              <th className="px-3 py-2 font-medium whitespace-nowrap">Ordem</th>
              <th className="px-3 py-2 font-medium whitespace-nowrap">Inclusão</th>
              <th className="px-3 py-2 font-medium whitespace-nowrap w-[100px]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-stone-500">
                  Nenhum vídeo cadastrado (ou ainda carregando).
                </td>
              </tr>
            )}
            {items.map((r) => (
              <tr key={r.id} className="border-t border-stone-100">
                <td className="px-3 py-2 align-top font-medium text-stone-900">{r.title}</td>
                <td className="px-3 py-2 align-top break-all text-stone-700">
                  <a
                    href={r.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b4513] underline hover:text-[#6b3410]"
                  >
                    {r.youtubeUrl}
                  </a>
                </td>
                <td className="px-3 py-2 align-top whitespace-nowrap">{r.sortOrder}</td>
                <td className="px-3 py-2 align-top whitespace-nowrap">
                  {dayjs(r.createdAt).format("DD/MM/YYYY HH:mm")}
                </td>
                <td className="px-3 py-2 align-top whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => void handleDelete(r)}
                    disabled={deletingId !== null}
                    className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-800 hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === r.id ? "…" : "Remover"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
