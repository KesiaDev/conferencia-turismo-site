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

interface PhotoGroup {
  participantKey: string;
  nome: string | null;
  descricao: string | null;
  createdAt: string;
  photos: Photo[];
}

const POSTS_PER_PAGE = 9;

export default function Galeria() {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<PhotoGroup | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [expandedText, setExpandedText] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>({});

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

  // Agrupar fotos por participante (carrossel)
  const photoGroups = useMemo(() => {
    const groups = new Map<string, PhotoGroup>();

    photos.forEach((photo) => {
      const key = photo.nome || photo.id;

      if (groups.has(key)) {
        groups.get(key)!.photos.push(photo);
      } else {
        groups.set(key, {
          participantKey: key,
          nome: photo.nome,
          descricao: photo.descricao,
          createdAt: photo.createdAt,
          photos: [photo],
        });
      }
    });

    const groupArray = Array.from(groups.values());

    // Ordenar: grupos com depoimento primeiro
    const withDesc = groupArray.filter((g) => g.descricao);
    const withoutDesc = groupArray.filter((g) => !g.descricao);

    // Embaralhar os sem depoimento
    for (let i = withoutDesc.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [withoutDesc[i], withoutDesc[j]] = [withoutDesc[j], withoutDesc[i]];
    }

    return [...withDesc, ...withoutDesc];
  }, [photos]);

  // Paginação
  const totalPages = Math.ceil(photoGroups.length / POSTS_PER_PAGE);

  const paginatedGroups = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return photoGroups.slice(startIndex, endIndex);
  }, [photoGroups, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navegação do carrossel no card
  const goToCarouselPhoto = (groupKey: string, direction: "prev" | "next", totalPhotos: number) => {
    setCarouselIndexes((prev) => {
      const current = prev[groupKey] || 0;
      let newIndex = current;
      if (direction === "prev" && current > 0) {
        newIndex = current - 1;
      } else if (direction === "next" && current < totalPhotos - 1) {
        newIndex = current + 1;
      }
      return { ...prev, [groupKey]: newIndex };
    });
  };

  // Navegação no lightbox
  const goToPrevPhoto = () => {
    if (selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const goToNextPhoto = () => {
    if (selectedGroup && selectedPhotoIndex < selectedGroup.photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const openLightbox = (group: PhotoGroup, photoIndex: number) => {
    setSelectedGroup(group);
    setSelectedPhotoIndex(photoIndex);
    setExpandedText(false);
  };

  const closeLightbox = () => {
    setSelectedGroup(null);
    setSelectedPhotoIndex(0);
    setExpandedText(false);
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
                  🎉 {photos.length} {photos.length === 1 ? "foto" : "fotos"} de{" "}
                  {photoGroups.length} {photoGroups.length === 1 ? "participante" : "participantes"}
                </span>
              </div>

              {/* Grid estilo Instagram Feed */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedGroups.map((group, index) => {
                  const currentPhotoIndex = carouselIndexes[group.participantKey] || 0;
                  const currentPhoto = group.photos[currentPhotoIndex];
                  const hasMultiplePhotos = group.photos.length > 1;

                  return (
                    <article
                      key={group.participantKey}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Header do card (estilo Instagram) */}
                      <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b4513] to-[#e0a085] flex items-center justify-center text-white font-bold text-sm">
                          {group.nome ? group.nome.charAt(0).toUpperCase() : "📷"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">
                            {group.nome || "Participante"}
                          </p>
                          <p className="text-xs text-gray-500">{formatDate(group.createdAt)}</p>
                        </div>
                        {hasMultiplePhotos && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                            </svg>
                            {group.photos.length}
                          </div>
                        )}
                      </div>

                      {/* Carrossel de imagens */}
                      <div className="relative">
                        <div
                          className="cursor-pointer overflow-hidden"
                          onClick={() => openLightbox(group, currentPhotoIndex)}
                        >
                          <img
                            src={currentPhoto.url}
                            alt={group.descricao || "Foto do evento"}
                            className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        {/* Setas do carrossel */}
                        {hasMultiplePhotos && (
                          <>
                            {currentPhotoIndex > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToCarouselPhoto(
                                    group.participantKey,
                                    "prev",
                                    group.photos.length
                                  );
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                              >
                                <span className="text-gray-700">‹</span>
                              </button>
                            )}
                            {currentPhotoIndex < group.photos.length - 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToCarouselPhoto(
                                    group.participantKey,
                                    "next",
                                    group.photos.length
                                  );
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                              >
                                <span className="text-gray-700">›</span>
                              </button>
                            )}

                            {/* Indicadores de posição */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                              {group.photos.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCarouselIndexes((prev) => ({
                                      ...prev,
                                      [group.participantKey]: idx,
                                    }));
                                  }}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    idx === currentPhotoIndex
                                      ? "bg-white w-4"
                                      : "bg-white/50 hover:bg-white/80"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Rodapé com depoimento */}
                      <div className="px-4 py-3 border-t border-gray-100">
                        {group.descricao ? (
                          <div>
                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                              <span className="font-semibold">{group.nome || "Participante"}</span>{" "}
                              {group.descricao}
                            </p>
                            <button
                              className="text-gray-500 hover:text-[#8b4513] text-sm mt-1"
                              onClick={() => openLightbox(group, currentPhotoIndex)}
                            >
                              ver mais
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">
                            <span className="font-semibold">{group.nome || "Participante"}</span> ✨
                            Momento especial
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  {/* Botão anterior */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#8b4513] text-white hover:bg-[#6b3410]"
                    }`}
                  >
                    ←
                  </button>

                  {/* Números das páginas */}
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? "bg-[#8b4513] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-[#e0a085] hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Botão próximo */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#8b4513] text-white hover:bg-[#6b3410]"
                    }`}
                  >
                    →
                  </button>
                </div>
              )}

              {/* Info da página */}
              {totalPages > 1 && (
                <p className="text-center text-gray-500 text-sm mt-4">
                  Página {currentPage} de {totalPages} • {photoGroups.length} participantes
                </p>
              )}
            </>
          )}
        </div>
      </Section>

      {/* Lightbox Modal estilo Instagram */}
      {selectedGroup && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors z-20"
          >
            ×
          </button>

          <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm z-20">
            {selectedPhotoIndex + 1} / {selectedGroup.photos.length}
          </div>

          {selectedPhotoIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevPhoto();
              }}
              className="absolute left-2 md:left-4 top-1/4 md:top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl transition-all duration-300 hover:scale-110 z-20"
            >
              ‹
            </button>
          )}
          {selectedPhotoIndex < selectedGroup.photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNextPhoto();
              }}
              className="absolute right-2 md:right-4 top-1/4 md:top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl transition-all duration-300 hover:scale-110 z-20"
            >
              ›
            </button>
          )}

          {/* Card estilo Instagram no lightbox */}
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-6xl w-full mx-4 flex flex-col md:flex-row max-h-[90vh] md:max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem */}
            <div className="md:w-3/4 bg-black flex items-center justify-center shrink-0 relative">
              <img
                src={selectedGroup.photos[selectedPhotoIndex].url}
                alt={selectedGroup.descricao || "Foto do evento"}
                className="max-h-[40vh] md:max-h-[90vh] w-full object-contain"
              />

              {/* Indicadores no lightbox */}
              {selectedGroup.photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedGroup.photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === selectedPhotoIndex
                          ? "bg-white w-5"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar com info */}
            <div className="md:w-1/4 flex flex-col md:min-w-[280px] shrink-0">
              {/* Header */}
              <div className="px-4 py-4 flex items-center gap-3 border-b">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b4513] to-[#e0a085] flex items-center justify-center text-white font-bold">
                  {selectedGroup.nome ? selectedGroup.nome.charAt(0).toUpperCase() : "📷"}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {selectedGroup.nome || "Participante"}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(selectedGroup.createdAt)}</p>
                </div>
                {selectedGroup.photos.length > 1 && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {selectedGroup.photos.length} fotos
                  </span>
                )}
              </div>

              {/* Depoimento */}
              <div className="flex-1 px-4 py-4 overflow-y-auto min-h-[120px] md:min-h-0">
                {selectedGroup.descricao ? (
                  <div>
                    <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-base">
                      💬 Depoimento
                    </p>
                    <p
                      className={`text-gray-700 leading-relaxed text-sm md:text-base ${!expandedText && selectedGroup.descricao.length > 200 ? "md:line-clamp-4" : ""}`}
                    >
                      {selectedGroup.descricao}
                    </p>
                    {selectedGroup.descricao.length > 200 && (
                      <button
                        onClick={() => setExpandedText(!expandedText)}
                        className="text-[#8b4513] font-medium text-sm mt-2 hover:underline hidden md:inline-block"
                      >
                        {expandedText ? "← Ver menos" : "Ler mais →"}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm md:text-base">
                    ✨ Momento especial da III Conferência
                  </p>
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
