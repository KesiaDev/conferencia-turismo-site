import { useEffect, useState } from "react";
import QRCode from "qrcode";

const DEFAULT_URL = "https://turismocinematografico.com.br/anais/autorizacao";

type Props = {
  url?: string;
  size?: number;
  label?: string;
};

export default function AuthorizationQr({
  url = DEFAULT_URL,
  size = 160,
  label = "Acesso rápido (QR Code)",
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

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-stone-600 text-center max-w-[200px]">{label}</p>
      <img
        src={dataUrl}
        alt=""
        width={size}
        height={size}
        className="rounded-md border border-stone-200"
      />
      <p className="text-[10px] text-stone-500 break-all max-w-[220px] text-center">{url}</p>
    </div>
  );
}
