import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  deleteAuthorizationAdmin,
  getAuthorizationsAdmin,
  type AuthorizationRow,
} from "../../lib/authorization/api";
import AuthorizationQr from "./AuthorizationQr";

const STORAGE_KEY = "anais_admin_pw";

function escapeCsvCell(s: string): string {
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadCsv(rows: AuthorizationRow[]) {
  const header = ["name", "document", "email", "summary", "createdAt"];
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        escapeCsvCell(r.name),
        escapeCsvCell(r.document),
        escapeCsvCell(r.email),
        escapeCsvCell(r.summary),
        escapeCsvCell(r.createdAt),
      ].join(",")
    ),
  ];
  const bom = "\uFEFF";
  const blob = new Blob([bom + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "autorizacoes.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminAuthorizationsPanel() {
  const [passwordInput, setPasswordInput] = useState("");
  const [sessionPw, setSessionPw] = useState(() => sessionStorage.getItem(STORAGE_KEY) || "");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<AuthorizationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activePw = sessionPw;

  const load = useCallback(async () => {
    if (!activePw) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getAuthorizationsAdmin(activePw, query || undefined);
      if (!res.success) {
        setError(res.error || "Falha ao carregar.");
        if (res.error === "Não autorizado") {
          sessionStorage.removeItem(STORAGE_KEY);
          setSessionPw("");
        }
        return;
      }
      setItems(res.items || []);
    } catch {
      setError("Erro de rede.");
    } finally {
      setLoading(false);
    }
  }, [activePw, query]);

  useEffect(() => {
    if (activePw) void load();
  }, [activePw, load]);

  const onLogin = async (ev: FormEvent) => {
    ev.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await getAuthorizationsAdmin(passwordInput);
      if (!res.success) {
        setError(
          res.error === "Não autorizado" ? "Senha incorreta." : res.error || "Erro ao acessar."
        );
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, passwordInput);
      setSessionPw(passwordInput);
      setPasswordInput("");
    } catch {
      setError("Erro de rede.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSessionPw("");
    setItems([]);
  };

  const filteredLabel = useMemo(() => (query ? `Busca: “${query}”` : "Todas"), [query]);

  const handleDelete = async (row: AuthorizationRow) => {
    const ok = window.confirm(
      `Excluir o registro de "${row.name}" (${row.email})?\nEsta ação não pode ser desfeita.`
    );
    if (!ok) return;
    setError(null);
    setDeletingId(row.id);
    try {
      const res = await deleteAuthorizationAdmin(activePw, row.id);
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

  if (!activePw) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-stone-200/90 bg-white/95 p-8 shadow-xl ring-1 ring-black/[0.04] backdrop-blur-sm">
          <h1 className="text-xl font-semibold text-stone-900 mb-2">Área administrativa</h1>
          <p className="text-sm text-stone-600 mb-6">
            Autorizações de publicação — acesso restrito.
          </p>
          <form onSubmit={onLogin} className="space-y-4">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="admin-pw" className="block text-sm font-medium text-stone-800 mb-1">
                Senha
              </label>
              <input
                id="admin-pw"
                type="password"
                autoComplete="current-password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-md border border-stone-300 px-3 py-2"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-stone-800 px-4 py-2.5 text-white font-medium shadow-md transition hover:bg-stone-900 disabled:opacity-60"
            >
              {loading ? "Verificando…" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[min(100%,90rem)] mx-auto space-y-6 rounded-2xl border border-stone-200/60 bg-white/90 p-4 shadow-xl backdrop-blur-sm ring-1 ring-black/[0.04] sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-stone-900">Autorizações registradas</h1>
          <p className="text-sm text-stone-600">
            {filteredLabel} — ordenado por data (mais recente primeiro).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => downloadCsv(items)}
            className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50"
          >
            Exportar CSV
          </button>
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50"
            disabled={loading}
          >
            {loading ? "Atualizando…" : "Atualizar"}
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-100"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 xl:items-start">
        <div className="min-w-0 flex-1 space-y-4">
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(search.trim());
            }}
          >
            <input
              type="search"
              placeholder="Buscar por nome ou documento…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-md border border-stone-300 px-3 py-2 text-sm"
            />
            <button type="submit" className="rounded-md bg-stone-800 px-4 py-2 text-sm text-white">
              Buscar
            </button>
          </form>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
            <table className="min-w-[960px] w-full text-left text-sm">
              <thead className="bg-stone-100 text-stone-700">
                <tr>
                  <th className="px-3 py-2 font-medium whitespace-nowrap">Nome</th>
                  <th className="px-3 py-2 font-medium whitespace-nowrap">Documento</th>
                  <th className="px-3 py-2 font-medium whitespace-nowrap min-w-[220px]">E-mail</th>
                  <th className="px-3 py-2 font-medium min-w-[200px]">Resumo</th>
                  <th className="px-3 py-2 font-medium whitespace-nowrap">Data</th>
                  <th className="px-3 py-2 font-medium whitespace-nowrap min-w-[140px]">IP</th>
                  <th className="px-3 py-2 font-medium whitespace-nowrap w-[100px]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-stone-500">
                      Nenhum registro.
                    </td>
                  </tr>
                )}
                {items.map((r) => (
                  <tr key={r.id} className="border-t border-stone-100">
                    <td className="px-3 py-2 align-top whitespace-nowrap">{r.name}</td>
                    <td className="px-3 py-2 align-top whitespace-nowrap">{r.document}</td>
                    <td className="px-3 py-2 align-top whitespace-nowrap text-stone-800">
                      {r.email}
                    </td>
                    <td className="px-3 py-2 align-top max-w-md break-words">{r.summary}</td>
                    <td className="px-3 py-2 align-top whitespace-nowrap">
                      {dayjs(r.createdAt).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td className="px-3 py-2 align-top whitespace-nowrap font-mono text-xs text-stone-600">
                      {r.ip || "—"}
                    </td>
                    <td className="px-3 py-2 align-top whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => void handleDelete(r)}
                        disabled={deletingId !== null}
                        className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-800 hover:bg-red-100 disabled:opacity-50"
                      >
                        {deletingId === r.id ? "…" : "Excluir"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="shrink-0 flex w-full flex-col items-center xl:w-auto xl:min-w-[320px] xl:items-end">
          <AuthorizationQr urlSingleLine />
        </aside>
      </div>
    </div>
  );
}
