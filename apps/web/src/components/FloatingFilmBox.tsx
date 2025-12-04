import { ReactNode } from "react";

export type FloatingFilmBoxVariant = "default" | "minimal" | "elegant" | "bold";
export type FloatingFilmBoxPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "hero-overlay"; // Special position for hero banner overlay

interface FloatingFilmBoxProps {
  variant?: FloatingFilmBoxVariant;
  position?: FloatingFilmBoxPosition;
  size?: "small" | "medium" | "large";
  showIcon?: boolean;
  children?: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function FloatingFilmBox({
  variant = "default",
  position = "top-right",
  size = "medium",
  showIcon = true,
  children,
  className = "",
  animate = true,
}: FloatingFilmBoxProps) {
  // Position classes
  const positionClasses = {
    "top-left": "top-4 md:top-8 left-4 md:left-8",
    "top-right": "top-4 md:top-8 right-4 md:right-8",
    "bottom-left": "bottom-4 md:bottom-8 left-4 md:left-8",
    "bottom-right": "bottom-4 md:bottom-8 right-4 md:right-8",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "hero-overlay": "top-[50%] left-4 md:left-8 -translate-y-1/2",
  };

  // Size classes
  const sizeClasses = {
    small: "w-20 h-20 md:w-24 md:h-24",
    medium: "w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40",
    large: "w-36 h-36 md:w-48 md:h-48 lg:w-52 lg:h-52",
  };

  const iconSizeClasses = {
    small: "w-10 h-10 md:w-12 md:h-12",
    medium: "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24",
    large: "w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36",
  };

  // Variant styles
  const variantStyles = {
    default: {
      container: "bg-[rgba(139,69,19,0.85)] backdrop-blur-md border-2 border-[#A0522D]",
      shadow: "shadow-2xl shadow-[rgba(139,69,19,0.4)]",
    },
    minimal: {
      container: "bg-[rgba(210,180,140,0.75)] backdrop-blur-sm border border-[#D2B48C]",
      shadow: "shadow-lg shadow-[rgba(139,69,19,0.2)]",
    },
    elegant: {
      container:
        "bg-gradient-to-br from-[rgba(160,82,45,0.9)] to-[rgba(139,69,19,0.9)] backdrop-blur-md border border-[#C19A6B]",
      shadow: "shadow-xl shadow-[rgba(101,67,33,0.5)]",
    },
    bold: {
      container: "bg-[rgba(101,67,33,0.95)] backdrop-blur-lg border-2 border-[#8B4513]",
      shadow: "shadow-2xl shadow-black/50",
    },
  };

  const currentVariant = variantStyles[variant];

  const isCentered = position === "center" || position === "hero-overlay";
  const animationClasses = animate ? (isCentered ? "animate-float-center" : "animate-float") : "";
  const transformClasses = isCentered
    ? position === "center"
      ? "-translate-x-1/2 -translate-y-1/2"
      : "-translate-y-1/2"
    : "";

  return (
    <div
      className={`
        fixed ${positionClasses[position]}
        ${transformClasses}
        ${sizeClasses[size]}
        ${currentVariant.container}
        ${currentVariant.shadow}
        rounded-2xl md:rounded-3xl
        flex items-center justify-center
        z-50
        transition-all duration-300
        ${animationClasses}
        hover:scale-110 hover:rotate-3
        ${className}
      `}
      role="presentation"
      aria-label="Decorative film camera icon"
    >
      {showIcon && (
        <img
          src="/film-camera.svg"
          alt="Vintage film camera"
          className={`${iconSizeClasses[size]} object-contain drop-shadow-lg`}
          loading="eager"
        />
      )}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center p-2">{children}</div>
      )}
    </div>
  );
}
