import { useState } from "react";
import { Speaker } from "../types";
import SpeakerModal from "./SpeakerModal";

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
            : "cursor-pointer hover:shadow-2xl hover:scale-105"
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
        <div className="w-full aspect-square overflow-hidden rounded-lg shadow-lg">
          {speaker.id === "keynote-tbd" ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6">
              <div className="text-center text-gray-600">
                <div className="text-3xl mb-4 opacity-60">⏳</div>
                <div className="text-sm font-semibold mb-2">{speaker.name}</div>
                <div className="text-sm text-gray-500 mb-3">{speaker.affiliation}</div>
                <div className="text-sm font-medium text-[#e0a085]">Em breve</div>
              </div>
            </div>
          ) : (
            <img
              src={speaker.photo}
              alt={speaker.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              style={{ objectPosition: "50% 10%" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/400x400?text=Speaker";
              }}
            />
          )}
        </div>
        {speaker.id !== "keynote-tbd" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="text-white text-xs font-semibold tracking-wide">
              Clique para ver detalhes
            </span>
          </div>
        )}
      </div>

      <SpeakerModal speaker={speaker} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
