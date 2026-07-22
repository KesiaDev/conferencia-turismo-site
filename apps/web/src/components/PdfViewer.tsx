type PdfViewerProps = {
  src: string;
  title: string;
};

export default function PdfViewer({ src, title }: PdfViewerProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-stone-200/80 bg-stone-100 shadow-lg ring-1 ring-black/[0.06]">
      <object data={`${src}#view=FitH`} type="application/pdf" className="h-[80vh] w-full">
        <iframe title={title} src={`${src}#view=FitH`} className="h-[80vh] w-full" loading="lazy" />
      </object>
    </div>
  );
}
