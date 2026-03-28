import { Helmet } from "react-helmet-async";
import AdminAuthorizationsPanel from "../components/authorization/AdminAuthorizationsPanel";
import LiveStreamsAdminSection from "../components/liveStreams/LiveStreamsAdminSection";
import PhotosAdminSection from "../components/photos/PhotosAdminSection";

/** Fundo com imagem da conferência (hero) em baixa opacidade + overlays cremes. */
export default function AnaisAdminAutorizacoes() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Admin — Autorizações</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Camadas de fundo (não interativas) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#f5f0e8]" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.28] sm:opacity-[0.32]"
          style={{ backgroundImage: "url(/hero-novo.gif)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#EBE3D5]/88 via-[#f5f0e8]/82 to-[#f5f0e8]/94" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0a085]/12 via-transparent to-stone-800/[0.06]" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 min-h-screen px-4 py-8 sm:py-10 space-y-10">
        <AdminAuthorizationsPanel />
        <LiveStreamsAdminSection />
        <PhotosAdminSection />
      </div>
    </div>
  );
}
