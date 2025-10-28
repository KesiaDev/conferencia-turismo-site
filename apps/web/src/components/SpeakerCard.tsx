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
        <div className="w-full aspect-square overflow-hidden rounded-lg shadow-lg min-h-[300px] md:min-h-[400px] lg:min-h-[450px]">
          {speaker.id === "keynote-tbd" ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 sm:p-6 md:p-8">
              <div className="text-center text-gray-600">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-5 opacity-60">⏳</div>
                <div className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 px-2">
                  {speaker.name}
                </div>
                <div className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4 px-2">
                  {speaker.affiliation}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-medium text-[#e0a085]">
                  Em breve
                </div>
              </div>
            </div>
          ) : (
            <OptimizedImage
              src={speaker.photo}
              alt={`${speaker.name}, ${speaker.affiliation}${speaker.tags.length > 0 ? ` - ${speaker.tags[0]}` : ""}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 speaker-photo object-[50%_10%]"
              loading="lazy"
              fetchPriority="low"
              onError={() => {
                console.error(`Failed to load speaker photo: ${speaker.photo}`);
              }}
            />
          )}
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
