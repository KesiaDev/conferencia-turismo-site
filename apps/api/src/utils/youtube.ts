/** Extrai o ID do vídeo a partir de URLs comuns do YouTube (watch, live, shorts, embed, youtu.be). */
export function extractYouTubeVideoId(raw: string): string | null {
  const input = raw.trim();
  if (!input) return null;

  try {
    const u = new URL(input.startsWith("http") ? input : `https://${input}`);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id ? id.split("?")[0] : null;
    }

    if (!host.includes("youtube.com")) return null;

    const v = u.searchParams.get("v");
    if (v) return v;

    const parts = u.pathname.split("/").filter(Boolean);
    const idx = (name: string) => parts.indexOf(name);

    const liveI = idx("live");
    if (liveI >= 0 && parts[liveI + 1]) return parts[liveI + 1].split("?")[0];

    const embedI = idx("embed");
    if (embedI >= 0 && parts[embedI + 1]) return parts[embedI + 1].split("?")[0];

    const shortI = idx("shorts");
    if (shortI >= 0 && parts[shortI + 1]) return parts[shortI + 1].split("?")[0];

    return null;
  } catch {
    return null;
  }
}
