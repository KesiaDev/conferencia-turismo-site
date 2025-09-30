import { ReactNode } from "react";

interface HeroProps {
  title: string | ReactNode;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
  height?: "small" | "medium" | "large";
}

export default function Hero({
  title,
  subtitle,
  image = "/hero.jpg",
  children,
  height = "large",
}: HeroProps) {
  const heightClasses = {
    small: "h-80 md:h-96",
    medium: "h-96 md:h-[420px]",
    large: "h-[320px] md:h-[420px] lg:h-[560px] xl:h-[640px]",
  };

  return (
    <div className={`relative ${heightClasses[height]} flex items-center justify-center text-white`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-[0.32]" />
      </div>

      <div className="relative z-10 container-custom text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}

