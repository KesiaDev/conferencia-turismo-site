import { useEffect, useState } from "react";
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
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

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
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-600 mb-8">{t("gallery.intro")}</p>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <svg
                className="animate-spin h-10 w-10 text-[#8b4513]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📷</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">{t("gallery.empty")}</h3>
              <p className="text-gray-500 mb-8">{t("gallery.emptyHint")}</p>
              <Link
                to="/enviar-fotos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors"
              >
                📤 {t("gallery.uploadCta")}
              </Link>
            </div>
          ) : (
            <>
              {/* Photo Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={photo.url}
                      alt={photo.descricao || "Foto do evento"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {photo.nome && (
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white text-sm truncate">📷 {photo.nome}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA para enviar fotos */}
              <div className="mt-12 text-center p-8 bg-gradient-to-br from-[#8b4513]/10 to-[#e0a085]/20 rounded-2xl">
                <p className="text-lg text-gray-700 mb-4">{t("gallery.ctaText")}</p>
                <Link
                  to="/enviar-fotos"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors"
                >
                  📤 {t("gallery.uploadCta")}
                </Link>
              </div>
            </>
          )}
        </div>
      </Section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            ×
          </button>
          <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.descricao || "Foto do evento"}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            {(selectedPhoto.nome || selectedPhoto.descricao) && (
              <div className="mt-4 text-center text-white">
                {selectedPhoto.nome && (
                  <p className="text-lg font-medium">📷 {selectedPhoto.nome}</p>
                )}
                {selectedPhoto.descricao && (
                  <p className="text-gray-300 mt-1">{selectedPhoto.descricao}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
