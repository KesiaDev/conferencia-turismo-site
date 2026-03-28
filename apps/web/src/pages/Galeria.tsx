import { useEffect, useState, useMemo, useCallback } from "react";
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

interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface PhotoStats {
  likeCount: number;
  commentCount: number;
  liked: boolean;
}

const POSTS_PER_PAGE = 9;

// Get or create visitor ID
const getVisitorId = (): string => {
  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = "visitor_" + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("visitorId", visitorId);
  }
  return visitorId;
};

export default function Galeria() {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<PhotoGroup | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [expandedText, setExpandedText] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselIndexes, setCarouselIndexes] = useState<Record<string, number>>({});

  // Likes & Comments state
  const [visitorId] = useState(getVisitorId);
  const [photoStats, setPhotoStats] = useState<Record<string, PhotoStats>>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState({ authorName: "", content: "" });
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const response = await apiService.getPhotos("approved");
      const loadedPhotos = response.items || [];
      setPhotos(loadedPhotos);

      // Load stats for all photos
      if (loadedPhotos.length > 0) {
        const photoIds = loadedPhotos.map((p: Photo) => p.id);
        try {
          const statsResponse = await apiService.getPhotoStats(photoIds, visitorId);
          if (statsResponse.stats) {
            setPhotoStats(statsResponse.stats);
          }
        } catch (e) {
          console.error("Error loading photo stats:", e);
        }
      }
    } catch (error) {
      console.error("Error loading photos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle like on a photo
  const handleLike = useCallback(
    async (photoId: string) => {
      try {
        const response = await apiService.toggleLike(photoId, visitorId);
        setPhotoStats((prev) => ({
          ...prev,
          [photoId]: {
            ...prev[photoId],
            likeCount: response.likeCount,
            liked: response.liked,
          },
        }));
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    },
    [visitorId]
  );

  // Load comments for a photo
  const loadComments = useCallback(async (photoId: string) => {
    setLoadingComments(true);
    try {
      const response = await apiService.getComments(photoId);
      setComments(response.comments || []);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoadingComments(false);
    }
  }, []);

  // Add a comment
  const handleAddComment = useCallback(
    async (photoId: string) => {
      if (!newComment.authorName.trim() || !newComment.content.trim()) return;

      setSubmittingComment(true);
      try {
        const response = await apiService.addComment(
          photoId,
          newComment.authorName.trim(),
          newComment.content.trim()
        );
        if (response.comment) {
          setComments((prev) => [response.comment, ...prev]);
          setNewComment({ authorName: "", content: "" });
          // Update comment count
          setPhotoStats((prev) => ({
            ...prev,
            [photoId]: {
              ...prev[photoId],
              commentCount: (prev[photoId]?.commentCount || 0) + 1,
            },
          }));
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      } finally {
        setSubmittingComment(false);
      }
    },
    [newComment]
  );

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
    if (selectedGroup && selectedPhotoIndex > 0) {
      const newIndex = selectedPhotoIndex - 1;
      setSelectedPhotoIndex(newIndex);
      loadComments(selectedGroup.photos[newIndex].id);
    }
  };

  const goToNextPhoto = () => {
    if (selectedGroup && selectedPhotoIndex < selectedGroup.photos.length - 1) {
      const newIndex = selectedPhotoIndex + 1;
      setSelectedPhotoIndex(newIndex);
      loadComments(selectedGroup.photos[newIndex].id);
    }
  };

  const openLightbox = (group: PhotoGroup, photoIndex: number) => {
    setSelectedGroup(group);
    setSelectedPhotoIndex(photoIndex);
    setExpandedText(false);
    // Load comments for the first photo in the group
    loadComments(group.photos[photoIndex].id);
  };

  const closeLightbox = () => {
    setSelectedGroup(null);
    setSelectedPhotoIndex(0);
    setExpandedText(false);
    setComments([]);
    setNewComment({ authorName: "", content: "" });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedGroup) return;
    if (e.key === "ArrowLeft") goToPrevPhoto();
    if (e.key === "ArrowRight") goToNextPhoto();
    if (e.key === "Escape") closeLightbox();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGroup, selectedPhotoIndex]);

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

      <div className="w-full aspect-[16/7] md:aspect-[16/5]">
        <OptimizedImage
          src="/hero-novo.gif"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Header festivo */}
      <div className="py-6 md:py-10 bg-gradient-to-r from-[#8b4513] via-[#a0522d] to-[#8b4513] relative overflow-hidden">
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
              <div className="mb-8 md:mb-12 relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#8b4513] via-[#a0522d] to-[#6b3410] p-5 md:p-10 text-center">
                {/* Confetes animados - menos no mobile */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
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
                  <div className="flex justify-center gap-2 md:gap-3 text-2xl md:text-4xl mb-3 md:mb-4">
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
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">
                    {t("gallery.ctaText")}
                  </h3>
                  <p className="text-white/80 mb-4 md:mb-6 max-w-lg mx-auto text-sm md:text-base">
                    Cada foto conta uma história única. Compartilhe a sua!
                  </p>
                  <Link
                    to="/enviar-fotos"
                    className="inline-flex items-center gap-2 md:gap-3 px-5 py-3 md:px-8 md:py-4 bg-white text-[#8b4513] rounded-full font-bold hover:bg-[#f5f0e8] transition-all duration-300 transform hover:scale-105 shadow-xl text-sm md:text-base"
                  >
                    <span className="text-lg md:text-xl">📤</span>
                    {t("gallery.uploadCta")}
                    <span className="text-lg md:text-xl">🎉</span>
                  </Link>
                </div>
              </div>

              {/* Contador */}
              <div className="text-center mb-6 md:mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#8b4513]/10 text-[#8b4513] rounded-full text-xs md:text-sm font-medium">
                  🎉 {photos.length} {photos.length === 1 ? "foto" : "fotos"} de{" "}
                  {photoGroups.length} {photoGroups.length === 1 ? "participante" : "participantes"}
                </span>
              </div>

              {/* Grid estilo Instagram Feed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

                      {/* Barra de curtidas e comentários */}
                      <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(currentPhoto.id);
                          }}
                          className="flex items-center gap-1 text-sm transition-all active:scale-95"
                        >
                          <span
                            className={`text-lg ${photoStats[currentPhoto.id]?.liked ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
                          >
                            {photoStats[currentPhoto.id]?.liked ? "❤️" : "🤍"}
                          </span>
                          <span className="text-gray-600">
                            {photoStats[currentPhoto.id]?.likeCount || 0}
                          </span>
                        </button>
                        <button
                          onClick={() => openLightbox(group, currentPhotoIndex)}
                          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#8b4513] transition-all"
                        >
                          <span className="text-lg">💬</span>
                          <span>{photoStats[currentPhoto.id]?.commentCount || 0}</span>
                        </button>
                      </div>

                      {/* Rodapé com depoimento */}
                      <div className="px-4 py-2">
                        {group.descricao ? (
                          <div>
                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                              {group.descricao}
                            </p>
                            <button
                              className="text-[#8b4513] hover:text-[#6b3410] text-sm mt-1 font-medium"
                              onClick={() => openLightbox(group, currentPhotoIndex)}
                            >
                              ver mais
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm italic">✨ Momento especial</p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="mt-8 md:mt-12 flex flex-wrap justify-center items-center gap-2">
                  {/* Botão anterior */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 md:px-4 rounded-lg font-medium transition-all text-sm md:text-base ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#8b4513] text-white hover:bg-[#6b3410] active:scale-95"
                    }`}
                  >
                    ←
                  </button>

                  {/* Números das páginas - limitar em mobile */}
                  <div className="flex flex-wrap justify-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // No mobile, mostrar apenas páginas próximas à atual
                      const isMobileVisible =
                        page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;

                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-medium transition-all text-sm md:text-base ${
                            !isMobileVisible
                              ? "hidden md:flex items-center justify-center"
                              : "flex items-center justify-center"
                          } ${
                            currentPage === page
                              ? "bg-[#8b4513] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-[#e0a085] hover:text-white active:scale-95"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {/* Botão próximo */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 md:px-4 rounded-lg font-medium transition-all text-sm md:text-base ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#8b4513] text-white hover:bg-[#6b3410] active:scale-95"
                    }`}
                  >
                    →
                  </button>
                </div>
              )}

              {/* Info da página */}
              {totalPages > 1 && (
                <p className="text-center text-gray-500 text-xs md:text-sm mt-3 md:mt-4">
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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 md:p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-2 right-2 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full flex items-center justify-center text-white text-xl md:text-2xl transition-colors z-20"
          >
            ×
          </button>

          <div className="absolute top-2 left-2 md:top-4 md:left-4 px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs md:text-sm z-20">
            {selectedPhotoIndex + 1} / {selectedGroup.photos.length}
          </div>

          {/* Card estilo Instagram no lightbox */}
          <div
            className="bg-white rounded-xl md:rounded-2xl overflow-hidden max-w-6xl w-full mx-2 md:mx-4 flex flex-col md:flex-row max-h-[85vh] md:max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem */}
            <div className="md:w-3/4 bg-black flex items-center justify-center shrink-0 relative">
              <img
                src={selectedGroup.photos[selectedPhotoIndex].url}
                alt={selectedGroup.descricao || "Foto do evento"}
                className="max-h-[35vh] md:max-h-[90vh] w-full object-contain"
              />

              {/* Botões de navegação DENTRO da imagem */}
              {selectedGroup.photos.length > 1 && (
                <>
                  {selectedPhotoIndex > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevPhoto();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 active:bg-black/80 rounded-full flex items-center justify-center text-white text-xl md:text-2xl transition-all z-10"
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
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 active:bg-black/80 rounded-full flex items-center justify-center text-white text-xl md:text-2xl transition-all z-10"
                    >
                      ›
                    </button>
                  )}
                </>
              )}

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
            <div className="md:w-1/4 flex flex-col md:min-w-[280px] shrink-0 max-h-[50vh] md:max-h-none">
              {/* Header */}
              <div className="px-4 py-3 flex items-center gap-3 border-b shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b4513] to-[#e0a085] flex items-center justify-center text-white font-bold">
                  {selectedGroup.nome ? selectedGroup.nome.charAt(0).toUpperCase() : "📷"}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {selectedGroup.nome || "Participante"}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(selectedGroup.createdAt)}</p>
                </div>
              </div>

              {/* Barra de curtir */}
              <div className="px-4 py-2 border-b flex items-center gap-4 shrink-0">
                <button
                  onClick={() => handleLike(selectedGroup.photos[selectedPhotoIndex].id)}
                  className="flex items-center gap-2 transition-all active:scale-95"
                >
                  <span
                    className={`text-2xl ${photoStats[selectedGroup.photos[selectedPhotoIndex].id]?.liked ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
                  >
                    {photoStats[selectedGroup.photos[selectedPhotoIndex].id]?.liked ? "❤️" : "🤍"}
                  </span>
                  <span className="text-gray-700 font-medium">
                    {photoStats[selectedGroup.photos[selectedPhotoIndex].id]?.likeCount || 0}{" "}
                    curtidas
                  </span>
                </button>
              </div>

              {/* Depoimento (se houver) */}
              {selectedGroup.descricao && (
                <div className="px-4 py-3 border-b shrink-0">
                  <p className="font-semibold text-gray-800 mb-1 text-sm">💬 Depoimento</p>
                  <p
                    className={`text-gray-700 text-sm leading-relaxed ${!expandedText && selectedGroup.descricao.length > 150 ? "line-clamp-3" : ""}`}
                  >
                    {selectedGroup.descricao}
                  </p>
                  {selectedGroup.descricao.length > 150 && (
                    <button
                      onClick={() => setExpandedText(!expandedText)}
                      className="text-[#8b4513] font-medium text-xs mt-1 hover:underline"
                    >
                      {expandedText ? "Ver menos" : "Ver mais"}
                    </button>
                  )}
                </div>
              )}

              {/* Área de comentários */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                <p className="font-semibold text-gray-800 mb-2 text-sm">
                  💬 Comentários (
                  {photoStats[selectedGroup.photos[selectedPhotoIndex].id]?.commentCount ||
                    comments.length}
                  )
                </p>

                {loadingComments ? (
                  <p className="text-gray-400 text-sm">Carregando...</p>
                ) : comments.length === 0 ? (
                  <p className="text-gray-400 text-sm italic">
                    Nenhum comentário ainda. Seja o primeiro!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <div key={comment.id} className="text-sm">
                        <p>
                          <span className="font-semibold text-gray-800">{comment.authorName}</span>{" "}
                          <span className="text-gray-600">{comment.content}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Formulário de comentário */}
              <div className="px-4 py-3 border-t bg-gray-50 shrink-0">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={newComment.authorName}
                    onChange={(e) =>
                      setNewComment((prev) => ({ ...prev, authorName: e.target.value }))
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b4513]"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Escreva um comentário..."
                      value={newComment.content}
                      onChange={(e) =>
                        setNewComment((prev) => ({ ...prev, content: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !submittingComment) {
                          handleAddComment(selectedGroup.photos[selectedPhotoIndex].id);
                        }
                      }}
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b4513]"
                    />
                    <button
                      onClick={() => handleAddComment(selectedGroup.photos[selectedPhotoIndex].id)}
                      disabled={
                        submittingComment ||
                        !newComment.authorName.trim() ||
                        !newComment.content.trim()
                      }
                      className="px-4 py-2 bg-[#8b4513] text-white text-sm font-medium rounded-lg hover:bg-[#6b3410] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {submittingComment ? "..." : "Enviar"}
                    </button>
                  </div>
                </div>
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
