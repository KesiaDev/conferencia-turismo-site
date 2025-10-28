import { useState, useEffect, useRef } from "react";

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
  fallbackSrc = undefined,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    setHasError(true);
    // Log para debug
    const img = e.target as HTMLImageElement;
    console.error(`Failed to load image: ${img.src}`, {
      original: src,
      encoded: encodedSrc,
    });
    if (onError) {
      onError(e);
    }
  };

  // Verificar se a imagem já está em cache e carregada
  useEffect(() => {
    const checkLoaded = () => {
      if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
        setIsLoading(false);
      }
    };

    // Verificar imediatamente
    checkLoaded();

    // Verificar após um pequeno delay para dar tempo do DOM atualizar
    const timer = setTimeout(checkLoaded, 0);

    return () => clearTimeout(timer);
  }, [src]);

  // Encode URL to handle spaces in filenames
  const encodedSrc = (() => {
    if (src.startsWith("http")) {
      // For absolute URLs, encode each part except the protocol
      const [protocol, ...rest] = src.split("://");
      const path = rest.join("://");
      const [domain, ...pathParts] = path.split("/");
      return `${protocol}://${domain}${pathParts.length > 0 ? "/" : ""}${pathParts.map(encodeURIComponent).join("/")}`;
    } else if (src.startsWith("/")) {
      // For relative URLs, encode each part except the leading slash
      const parts = src.split("/").filter(Boolean); // Remove empty first element
      const encoded = "/" + parts.map(encodeURIComponent).join("/");
      // Log para debug quando há espaços ou é modal
      if (encoded.includes("%20") || src.includes("modal")) {
        console.log(`[OptimizedImage] Loading modal image: ${src} -> ${encoded}`);
      }
      return encoded;
    }
    return src;
  })();

  return (
    <div className="relative w-full h-full">
      {/* Skeleton placeholder durante carregamento */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse z-10" />
      )}

      {/* Imagem */}
      <img
        ref={imgRef}
        src={hasError ? fallbackSrc : encodedSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={(e) => {
          handleLoad();
          const img = e.target as HTMLImageElement;
          console.log(`[OptimizedImage] Image loaded: ${img.src}`, {
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
          });
        }}
        onError={handleError}
      />
    </div>
  );
}
