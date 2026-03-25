import { FormEvent, useState } from "react";
import { sanitizeText } from "../../lib/authorization/sanitize";
import { postAuthorization } from "../../lib/authorization/api";

const TERMS =
  "Declaro que li e estou de acordo com os termos, autorizando a publicação do meu resumo nos anais da III Conferência Internacional de Turismo Literário e Cinematográfico, de forma gratuita e por prazo indeterminado.";

const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export default function AuthorizationForm() {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    const n = sanitizeText(name, 200);
    const d = sanitizeText(document, 80);
    const em = sanitizeText(email, 255).toLowerCase();
    const s = sanitizeText(summary, 500);

    if (n.length < 2) e.name = "Informe o nome completo.";
    if (d.length < 3) e.document = "Informe o CPF ou documento.";
    if (!emailOk(em)) e.email = "E-mail inválido.";
    if (s.length < 3) e.summary = "Informe o título do resumo.";
    if (!accepted) e.accepted = "É necessário aceitar os termos.";

    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setError(null);
    if (!validate()) return;
    if (loading) return;

    setLoading(true);
    try {
      const body = {
        name: sanitizeText(name, 200),
        document: sanitizeText(document, 80),
        email: sanitizeText(email, 255).toLowerCase(),
        summary: sanitizeText(summary, 500),
        accepted,
      };
      const res = await postAuthorization(body);
      if (res.success) {
        setSuccess(true);
        setName("");
        setDocument("");
        setEmail("");
        setSummary("");
        setAccepted(false);
      } else {
        setError(res.error || "Não foi possível enviar. Tente novamente.");
      }
    } catch (err: unknown) {
      const ax = err as { response?: { status?: number; data?: { error?: string } } };
      const status = ax.response?.status;
      const msg = ax.response?.data?.error;
      if (status === 409) {
        setError(msg || "Já existe registro para este e-mail e título.");
      } else if (status === 429) {
        setError(msg || "Muitas tentativas. Aguarde e tente novamente.");
      } else {
        setError(msg || "Erro de rede. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-6 py-8 text-center text-emerald-900 shadow-sm"
        role="status"
      >
        <p className="text-lg font-medium">Sua autorização foi registrada com sucesso.</p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm text-emerald-800 underline underline-offset-2 hover:text-emerald-950"
        >
          Enviar outra autorização
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {error && (
        <div
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </div>
      )}

      <div>
        <label htmlFor="auth-name" className="block text-sm font-medium text-stone-800 mb-1">
          Nome completo
        </label>
        <input
          id="auth-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-[#e0a085] focus:ring-1 focus:ring-[#e0a085]"
          disabled={loading}
        />
        {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="auth-document" className="block text-sm font-medium text-stone-800 mb-1">
          CPF ou documento
        </label>
        <input
          id="auth-document"
          name="document"
          type="text"
          autoComplete="off"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-[#e0a085] focus:ring-1 focus:ring-[#e0a085]"
          disabled={loading}
        />
        {fieldErrors.document && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.document}</p>
        )}
      </div>

      <div>
        <label htmlFor="auth-email" className="block text-sm font-medium text-stone-800 mb-1">
          E-mail
        </label>
        <input
          id="auth-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-[#e0a085] focus:ring-1 focus:ring-[#e0a085]"
          disabled={loading}
        />
        {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="auth-summary" className="block text-sm font-medium text-stone-800 mb-1">
          Título do resumo
        </label>
        <input
          id="auth-summary"
          name="summary"
          type="text"
          autoComplete="off"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-[#e0a085] focus:ring-1 focus:ring-[#e0a085]"
          disabled={loading}
        />
        {fieldErrors.summary && <p className="mt-1 text-sm text-red-600">{fieldErrors.summary}</p>}
      </div>

      <div className="flex gap-3 items-start">
        <input
          id="auth-accepted"
          name="accepted"
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-stone-300 text-[#e0a085] focus:ring-[#e0a085]"
          disabled={loading}
        />
        <label htmlFor="auth-accepted" className="text-sm text-stone-700 leading-relaxed">
          {TERMS}
        </label>
      </div>
      {fieldErrors.accepted && <p className="text-sm text-red-600">{fieldErrors.accepted}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[#e0a085] px-4 py-3 text-white font-medium shadow hover:bg-[#c47862] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Enviando…" : "Autorizar publicação"}
      </button>
    </form>
  );
}
