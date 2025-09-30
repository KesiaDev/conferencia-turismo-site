import { useEffect } from "react";
import { Speaker } from "../types";

interface SpeakerModalProps {
  speaker: Speaker;
  isOpen: boolean;
  onClose: () => void;
}

export default function SpeakerModal({ speaker, isOpen, onClose }: SpeakerModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-full h-64 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Speaker";
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <h2 id="modal-title" className="text-2xl font-bold mb-2">
            {speaker.name}
          </h2>
          <p className="text-gray-600 mb-4">{speaker.affiliation}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {speaker.tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm bg-primary/10 text-primary px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {speaker.bio && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{speaker.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

