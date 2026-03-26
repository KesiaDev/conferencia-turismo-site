type YoutubeEmbedProps = {
  videoId: string;
  title: string;
};

export default function YoutubeEmbed({ videoId, title }: YoutubeEmbedProps) {
  const src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?rel=0`;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-stone-200/80 bg-black shadow-lg ring-1 ring-black/[0.06]">
      <div className="relative aspect-video w-full">
        <iframe
          title={title}
          src={src}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
