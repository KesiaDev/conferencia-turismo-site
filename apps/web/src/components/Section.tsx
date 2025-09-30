import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  background?: "white" | "gray";
}

export default function Section({
  title,
  children,
  className = "",
  background = "white",
}: SectionProps) {
  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <section className={`py-16 md:py-20 ${bgClass} ${className}`}>
      <div className="container-custom">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

