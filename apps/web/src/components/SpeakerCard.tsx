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
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsModalOpen(true);
          }
        }}
      >
        <div className="w-full h-60">
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x240?text=Speaker";
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">{speaker.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{speaker.affiliation}</p>
          <div className="flex flex-wrap gap-2">
            {speaker.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <SpeakerModal
        speaker={speaker}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

