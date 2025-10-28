import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
  onError,
  fallbackSrc = "https://via.placeholder.com/400x400?text=Image",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  // Encode URL to handle spaces in filenames
  const encodedSrc =
    src.startsWith("/") || src.startsWith("http")
      ? src
          .split("/")
          .map((part, index) => (index === 0 ? part : encodeURIComponent(part)))
          .join("/")
      : src;

  return (
    <div className="relative overflow-hidden">
      {/* Skeleton placeholder durante carregamento */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse z-0" />
      )}

      {/* Imagem */}
      <img
        src={hasError ? fallbackSrc : encodedSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
