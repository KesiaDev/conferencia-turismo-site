import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";
import apiService from "../api/client";

interface PreviewFile {
  file: File;
  preview: string;
}

export default function EnviarFotos() {
  const { t } = useTranslation();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    addFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  }, []);

  const addFiles = (newFiles: File[]) => {
    const newPreviews: PreviewFile[] = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newPreviews].slice(0, 10));
    setError("");
    setSuccess(false);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      setError("Selecione pelo menos uma foto para enviar.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("photos", f.file));
      if (nome.trim()) formData.append("nome", nome.trim());
      if (descricao.trim()) formData.append("descricao", descricao.trim());

      await apiService.uploadPhotos(formData);

      setSuccess(true);
      setFiles([]);
      setNome("");
      setDescricao("");
    } catch (err) {
      console.error("Upload error:", err);
      setError("Erro ao enviar fotos. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Seo title={t("photos.uploadTitle")} description={t("photos.uploadDescription")} />

      <div className="w-full aspect-[16/7] md:aspect-[16/5]">
        <OptimizedImage
          src="/hero-novo.gif"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="py-5 md:py-8 bg-[#e0a085]">
        <div className="container-custom px-4">
          <h1 className="text-xl md:text-3xl font-semibold text-center text-white">
            {t("photos.uploadTitle")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto px-4">
          {/* Mensagem Motivacional */}
          <div className="mb-6 md:mb-10 p-5 md:p-8 bg-gradient-to-br from-[#8b4513]/10 to-[#e0a085]/20 rounded-xl md:rounded-2xl border border-[#e0a085]/30 text-center">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">✨</div>
            <h2 className="text-xl md:text-2xl font-bold text-[#8b4513] mb-2 md:mb-3">
              {t("photos.motivationalTitle")}
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4 leading-relaxed">
              {t("photos.motivationalText1")}
            </p>
            <p className="text-sm md:text-base text-gray-600 italic">
              {t("photos.motivationalText2")}
            </p>
            <div className="text-2xl md:text-3xl mt-3 md:mt-4">📸</div>
          </div>

          {success ? (
            <div className="p-8 bg-green-50 border border-green-200 rounded-2xl text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-700 mb-3">{t("photos.successTitle")}</h3>
              <p className="text-green-600 mb-6">{t("photos.successMessage")}</p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-3 bg-[#8b4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors"
              >
                {t("photos.sendMore")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-6 md:p-10 text-center transition-all cursor-pointer ${
                  isDragging
                    ? "border-[#8b4513] bg-[#e0a085]/20"
                    : "border-gray-300 hover:border-[#e0a085] hover:bg-gray-50 active:bg-gray-50"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-4xl md:text-5xl mb-3 md:mb-4">📷</div>
                <p className="text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-2">
                  {t("photos.dropzone")}
                </p>
                <p className="text-xs md:text-sm text-gray-500">{t("photos.dropzoneHint")}</p>
              </div>

              {/* Preview Grid */}
              {files.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                  {files.map((f, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={f.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-7 h-7 md:w-8 md:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-base md:text-lg font-bold shadow-lg active:scale-95 transition-transform"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Nome (opcional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("photos.nameLabel")}
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder={t("photos.namePlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0a085] focus:border-transparent"
                />
              </div>

              {/* Descrição (opcional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("photos.descriptionLabel")}
                </label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder={t("photos.descriptionPlaceholder")}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0a085] focus:border-transparent resize-none"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isUploading || files.length === 0}
                className="w-full py-4 bg-[#8b4513] text-white text-lg font-semibold rounded-lg hover:bg-[#6b3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
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
                    {t("photos.uploading")}
                  </>
                ) : (
                  <>📤 {t("photos.submitButton")}</>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">{t("photos.disclaimer")}</p>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
