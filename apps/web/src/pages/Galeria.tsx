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

  const selectedPhoto = useMemo(() => {
    return selectedIndex !== null ? photos[selectedIndex] : null;
  }, [selectedIndex, photos]);

  const goToPrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < photos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
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

      <div className="py-8 bg-[#e0a085]">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-white">
            {t("gallery.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header elegante */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("gallery.intro")}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#e0a085]"></div>
              <span className="text-2xl">📸</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#e0a085]"></div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#e0a085]/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#8b4513] rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-500">Carregando fotos...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[#e0a085]/20 to-[#8b4513]/10 rounded-full flex items-center justify-center">
                <span className="text-6xl">📷</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">{t("gallery.empty")}</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">{t("gallery.emptyHint")}</p>
              <Link
                to="/enviar-fotos"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white rounded-full hover:shadow-lg hover:shadow-[#8b4513]/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="text-xl">📤</span>
                <span className="font-medium">{t("gallery.uploadCta")}</span>
              </Link>
            </div>
          ) : (
            <>
              {/* Contador de fotos */}
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b4513]/10 text-[#8b4513] rounded-full text-sm font-medium">
                  <span>✨</span>
                  {photos.length}{" "}
                  {photos.length === 1 ? "momento capturado" : "momentos capturados"}
                </span>
              </div>

              {/* Grid Masonry-style moderno */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedIndex(index)}
                    className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-2xl transition-all duration-500"
                  >
                    <img
                      src={photo.url}
                      alt={photo.descricao || "Foto do evento"}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Overlay elegante no hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {photo.nome && (
                          <p className="text-white font-medium text-lg mb-1">{photo.nome}</p>
                        )}
                        {photo.descricao && (
                          <p className="text-white/80 text-sm line-clamp-2">{photo.descricao}</p>
                        )}
                        <div className="mt-3 flex items-center gap-2 text-white/60 text-xs">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span>Clique para ampliar</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge de câmera */}
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <span className="text-lg">📷</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA bonito para enviar fotos */}
              <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#8b4513] to-[#6b3410] p-10 text-center">
                {/* Decoração de fundo */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{t("gallery.ctaText")}</h3>
                  <p className="text-white/80 mb-6 max-w-md mx-auto">
                    Cada foto conta uma história única. Compartilhe a sua!
                  </p>
                  <Link
                    to="/enviar-fotos"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#8b4513] rounded-full font-semibold hover:bg-[#f5f0e8] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className="text-xl">📤</span>
                    {t("gallery.uploadCta")}
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </Section>

      {/* Lightbox Modal Moderno */}
      {selectedPhoto && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Botão Fechar */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors z-20"
          >
            ×
          </button>

          {/* Contador */}
          <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm z-20">
            {selectedIndex + 1} / {photos.length}
          </div>

          {/* Navegação */}
          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-3xl transition-all duration-300 hover:scale-110 z-20"
            >
              ‹
            </button>
          )}
          {selectedIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-3xl transition-all duration-300 hover:scale-110 z-20"
            >
              ›
            </button>
          )}

          {/* Imagem e Info */}
          <div
            className="max-w-6xl w-full mx-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.descricao || "Foto do evento"}
                className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {(selectedPhoto.nome || selectedPhoto.descricao) && (
              <div className="mt-6 text-center max-w-2xl animate-fade-in">
                {selectedPhoto.nome && (
                  <p className="text-xl font-semibold text-white mb-2 flex items-center justify-center gap-2">
                    <span className="text-[#e0a085]">📷</span>
                    {selectedPhoto.nome}
                  </p>
                )}
                {selectedPhoto.descricao && (
                  <p className="text-white/70 leading-relaxed">{selectedPhoto.descricao}</p>
                )}
              </div>
            )}

            {/* Dica de navegação */}
            <p className="mt-6 text-white/40 text-sm">Use ← → para navegar ou ESC para fechar</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
