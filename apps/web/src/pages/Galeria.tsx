import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";
import apiService from "../api/client";

interface Photo {
  id: string;
  url: string;
  nome: string | null;
  descricao: string | null;
  createdAt: string;
}

export default function Galeria() {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expandedText, setExpandedText] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const response = await apiService.getPhotos("approved");
      setPhotos(response.items || []);
    } catch (error) {
      console.error("Error loading photos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Processar fotos: marcar primeira de cada participante e ordenar
  const processedPhotos = useMemo(() => {
    const seenParticipants = new Set<string>();

    // Marcar quais fotos mostram depoimento (primeira de cada participante com descrição)
    const marked = photos.map((photo) => {
      const key = photo.nome || photo.id; // usar ID se não tiver nome
      const isFirstWithDesc = photo.descricao && !seenParticipants.has(key);
      if (photo.descricao && photo.nome) {
        seenParticipants.add(key);
      }
      return { ...photo, showDescription: isFirstWithDesc };
    });

    // Separar: com depoimento primeiro, depois os demais embaralhados
    const withDesc = marked.filter((p) => p.showDescription);
    const withoutDesc = marked.filter((p) => !p.showDescription);

    // Embaralhar os sem depoimento
    for (let i = withoutDesc.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [withoutDesc[i], withoutDesc[j]] = [withoutDesc[j], withoutDesc[i]];
    }

    return [...withDesc, ...withoutDesc];
  }, [photos]);

  const selectedPhoto = useMemo(() => {
    return selectedIndex !== null ? processedPhotos[selectedIndex] : null;
  }, [selectedIndex, processedPhotos]);

  const goToPrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setExpandedText(false);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < processedPhotos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setExpandedText(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowLeft") goToPrev();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") setSelectedIndex(null);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "hoje";
    if (diffDays === 1) return "ontem";
    if (diffDays < 7) return `há ${diffDays} dias`;
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <>
      <Seo title={t("gallery.title")} description={t("gallery.description")} />

      <div className="w-full aspect-[16/5]">
        <OptimizedImage
          src="/hero-novo.gif"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Header festivo */}
      <div className="py-10 bg-gradient-to-r from-[#8b4513] via-[#a0522d] to-[#8b4513] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-2 left-10 text-4xl animate-bounce"
            style={{ animationDelay: "0s" }}
          >
            🎉
          </div>
          <div
            className="absolute top-4 right-20 text-3xl animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            ✨
          </div>
          <div
            className="absolute bottom-2 left-1/4 text-3xl animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            📸
          </div>
          <div
            className="absolute top-3 left-1/2 text-4xl animate-bounce"
            style={{ animationDelay: "0.3s" }}
          >
            🎊
          </div>
          <div
            className="absolute bottom-3 right-1/4 text-3xl animate-bounce"
            style={{ animationDelay: "0.7s" }}
          >
            ⭐
          </div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            🎬 {t("gallery.title")} 📚
          </h1>
          <p className="text-white/90 text-lg">Momentos inesquecíveis compartilhados por vocês!</p>
        </div>
      </div>

      <Section>
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-[#e0a085]/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-[#8b4513] rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                  📷
                </div>
              </div>
              <p className="mt-4 text-gray-500">Carregando momentos especiais...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[#e0a085]/20 to-[#8b4513]/10 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-6xl">📷</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">{t("gallery.empty")}</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">{t("gallery.emptyHint")}</p>
              <Link
                to="/enviar-fotos"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white rounded-full hover:shadow-lg hover:shadow-[#8b4513]/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="text-xl">📤</span>
                <span className="font-medium">{t("gallery.uploadCta")}</span>
              </Link>
            </div>
          ) : (
            <>
              {/* CTA no topo */}
              <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#8b4513] via-[#a0522d] to-[#6b3410] p-8 md:p-10 text-center">
                {/* Confetes animados */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-xl animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                      }}
                    >
                      {["🎉", "✨", "⭐", "🎊", "💫", "🌟"][Math.floor(Math.random() * 6)]}
                    </div>
                  ))}
                </div>

                <div className="relative z-10">
                  <div className="flex justify-center gap-3 text-4xl mb-4">
                    <span className="animate-bounce" style={{ animationDelay: "0s" }}>
                      🎬
                    </span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                      📸
                    </span>
                    <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                      📚
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {t("gallery.ctaText")}
                  </h3>
                  <p className="text-white/80 mb-6 max-w-lg mx-auto">
                    Cada foto conta uma história única. Compartilhe a sua!
                  </p>
                  <Link
                    to="/enviar-fotos"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#8b4513] rounded-full font-bold hover:bg-[#f5f0e8] transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <span className="text-xl">📤</span>
                    {t("gallery.uploadCta")}
                    <span className="text-xl">🎉</span>
                  </Link>
                </div>
              </div>

              {/* Contador */}
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b4513]/10 text-[#8b4513] rounded-full text-sm font-medium">
                  🎉 {photos.length} {photos.length === 1 ? "momento" : "momentos"} compartilhados
                </span>
              </div>

              {/* Grid estilo Instagram/Pinterest */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedPhotos.map((photo, index) => (
                  <article
                    key={photo.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Header do card (estilo Instagram) */}
                    <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b4513] to-[#e0a085] flex items-center justify-center text-white font-bold text-sm">
                        {photo.nome ? photo.nome.charAt(0).toUpperCase() : "📷"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">
                          {photo.nome || "Participante"}
                        </p>
                        <p className="text-xs text-gray-500">{formatDate(photo.createdAt)}</p>
                      </div>
                      <div className="text-[#e0a085]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                    </div>

                    {/* Imagem */}
                    <div
                      className="relative cursor-pointer overflow-hidden"
                      onClick={() => setSelectedIndex(index)}
                    >
                      <img
                        src={photo.url}
                        alt={photo.descricao || "Foto do evento"}
                        className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 shadow-xl">
                          <span className="text-3xl">🔍</span>
                        </div>
                      </div>
                    </div>

                    {/* Rodapé com preview do depoimento */}
                    {/* Ícones estilo Instagram */}
                    <div className="px-4 py-3 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <button className="hover:scale-110 transition-transform">
                            <svg
                              className="w-6 h-6 text-gray-700 hover:text-red-500 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                          <button
                            className="hover:scale-110 transition-transform"
                            onClick={() => setSelectedIndex(index)}
                          >
                            <svg
                              className="w-6 h-6 text-gray-700 hover:text-[#8b4513] transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                          </button>
                          <button className="hover:scale-110 transition-transform">
                            <svg
                              className="w-6 h-6 text-gray-700 hover:text-blue-500 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                              />
                            </svg>
                          </button>
                        </div>
                        <button className="hover:scale-110 transition-transform">
                          <svg
                            className="w-6 h-6 text-gray-700 hover:text-yellow-500 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Preview do depoimento */}
                      {photo.showDescription && photo.descricao ? (
                        <div>
                          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                            <span className="font-semibold">{photo.nome || "Participante"}</span>{" "}
                            {photo.descricao}
                          </p>
                          <button
                            className="text-gray-500 hover:text-[#8b4513] text-sm mt-1"
                            onClick={() => setSelectedIndex(index)}
                          >
                            ver mais
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          <span className="font-semibold">{photo.nome || "Participante"}</span> ✨
                          Momento especial
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </Section>

      {/* Lightbox Modal estilo Instagram */}
      {selectedPhoto && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => {
            setSelectedIndex(null);
            setExpandedText(false);
          }}
        >
          <button
            onClick={() => {
              setSelectedIndex(null);
              setExpandedText(false);
            }}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors z-20"
          >
            ×
          </button>

          <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm z-20">
            {selectedIndex + 1} / {processedPhotos.length}
          </div>

          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-3xl transition-all duration-300 hover:scale-110 z-20"
            >
              ‹
            </button>
          )}
          {selectedIndex < processedPhotos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-3xl transition-all duration-300 hover:scale-110 z-20"
            >
              ›
            </button>
          )}

          {/* Card estilo Instagram no lightbox */}
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-6xl w-full mx-4 flex flex-col md:flex-row max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem */}
            <div className="md:w-3/4 bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.descricao || "Foto do evento"}
                className="max-h-[70vh] md:max-h-[90vh] w-full object-contain"
              />
            </div>

            {/* Sidebar com info */}
            <div className="md:w-1/4 flex flex-col min-w-[280px]">
              {/* Header */}
              <div className="px-4 py-4 flex items-center gap-3 border-b">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b4513] to-[#e0a085] flex items-center justify-center text-white font-bold">
                  {selectedPhoto.nome ? selectedPhoto.nome.charAt(0).toUpperCase() : "📷"}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {selectedPhoto.nome || "Participante"}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(selectedPhoto.createdAt)}</p>
                </div>
              </div>

              {/* Depoimento */}
              <div className="flex-1 px-4 py-4 overflow-y-auto">
                {selectedPhoto.descricao ? (
                  <div>
                    <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      💬 Depoimento
                    </p>
                    <p
                      className={`text-gray-700 leading-relaxed ${!expandedText && selectedPhoto.descricao.length > 200 ? "line-clamp-4" : ""}`}
                    >
                      {selectedPhoto.descricao}
                    </p>
                    {selectedPhoto.descricao.length > 200 && (
                      <button
                        onClick={() => setExpandedText(!expandedText)}
                        className="text-[#8b4513] font-medium text-sm mt-2 hover:underline"
                      >
                        {expandedText ? "← Ver menos" : "Ler mais →"}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">✨ Momento especial da III Conferência</p>
                )}
              </div>

              {/* Rodapé */}
              <div className="px-4 py-4 border-t bg-gray-50">
                <p className="text-xs text-gray-500">
                  📍 III Conferência Internacional de Turismo Literário e Cinematográfico
                </p>
                <p className="text-xs text-gray-400 mt-1">Março 2026 • Caxias do Sul/RS</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
