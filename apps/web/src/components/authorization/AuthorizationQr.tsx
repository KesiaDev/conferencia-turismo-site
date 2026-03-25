import { useEffect, useState } from "react";
import QRCode from "qrcode";

const DEFAULT_URL = "https://turismocinematografico.com.br/anais/autorizacao";

type Props = {
  url?: string;
  size?: number;
  label?: string;
  /** Destaque visual (texto maior, borda no QR). */
  prominent?: boolean;
  /** URL em uma linha com scroll horizontal (útil no admin). */
  urlSingleLine?: boolean;
};

export default function AuthorizationQr({
  url = DEFAULT_URL,
  size = 160,
  label = "Acesso rápido (QR Code)",
  prominent = false,
  urlSingleLine = false,
}: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(url, { width: size, margin: 1, errorCorrectionLevel: "M" })
      .then((u) => {
        if (!cancelled) setDataUrl(u);
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [url, size]);

  if (!dataUrl) {
    return (
      <div
        className="bg-white/80 rounded-lg border border-stone-200 p-4 text-center text-sm text-stone-500"
        style={{ width: size + 32 }}
      >
        Gerando QR…
      </div>
    );
  }

  const labelClass = prominent
    ? "text-sm font-medium text-stone-700 text-center max-w-[280px]"
    : "text-xs text-stone-600 text-center max-w-[200px]";
  const imgClass = prominent
    ? "rounded-lg border-2 border-[#e0a085] shadow-md"
    : "rounded-md border border-stone-200";
  const urlClass = prominent
    ? "text-xs text-stone-600 break-all max-w-[260px] text-center leading-snug"
    : "text-[10px] text-stone-500 break-all max-w-[220px] text-center";

  return (
    <div className="flex flex-col items-center gap-3">
      <p className={labelClass}>{label}</p>
      <img src={dataUrl} alt="" width={size} height={size} className={imgClass} />
      {urlSingleLine ? (
        <div className="w-full max-w-[min(100vw-2rem,32rem)] overflow-x-auto rounded-md border border-stone-200/80 bg-stone-50/80 px-3 py-2">
          <p className="whitespace-nowrap text-center text-xs font-mono text-stone-700">{url}</p>
        </div>
      ) : (
        <p className={urlClass}>{url}</p>
      )}
    </div>
  );
}
