import { useState } from "react";
import { Speaker } from "../types";
import SpeakerModal from "./SpeakerModal";
import OptimizedImage from "./OptimizedImage";

interface SpeakerCardProps {
  speaker: Speaker;
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`relative overflow-hidden transition-all duration-300 group ${
          speaker.id === "keynote-tbd"
            ? "cursor-default"
            : "cursor-pointer hover:shadow-2xl hover:scale-105 active:scale-95"
        }`}
        onClick={() => speaker.id !== "keynote-tbd" && setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if ((e.key === "Enter" || e.key === " ") && speaker.id !== "keynote-tbd") {
            setIsModalOpen(true);
          }
        }}
      >
        <div className="w-full aspect-square overflow-hidden rounded-lg shadow-lg min-h-[300px] md:min-h-[400px] lg:min-h-[450px] relative">
          <OptimizedImage
            src={speaker.photo}
            alt={`${speaker.name}, ${speaker.affiliation}${speaker.tags.length > 0 ? ` - ${speaker.tags[0]}` : ""}`}
            className={
              `transition-transform duration-500 speaker-photo ` +
              // Para artes que já possuem texto incorporado (como a do André),
              // usamos object-contain para evitar cortes nas bordas.
              (speaker.id === "andre"
                ? "object-contain group-hover:scale-100 object-center"
                : "group-hover:scale-110 object-[50%_10%]")
            }
            loading="lazy"
            fetchPriority="low"
            onError={() => {
              console.error(`Failed to load speaker photo: ${speaker.photo}`);
            }}
          />
        </div>
        {speaker.bio && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 sm:pb-6 md:pb-8">
            <span className="text-white text-sm sm:text-base md:text-lg font-semibold tracking-wide px-4 text-center">
              <span className="hidden sm:inline">Clique para ver detalhes</span>
              <span className="sm:hidden">Ver detalhes</span>
            </span>
          </div>
        )}
      </div>

      <SpeakerModal speaker={speaker} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
