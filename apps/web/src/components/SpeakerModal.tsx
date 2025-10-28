import { useEffect } from "react";
import { Speaker } from "../types";
import OptimizedImage from "./OptimizedImage";

interface SpeakerModalProps {
  speaker: Speaker;
  isOpen: boolean;
  onClose: () => void;
}

export default function SpeakerModal({ speaker, isOpen, onClose }: SpeakerModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Debug: verificar dados do palestrante
      console.log(`[SpeakerModal] Modal aberto para ${speaker.name}:`, {
        photoModal: speaker.photoModal,
        photo: speaker.photo,
        willUse: speaker.photoModal || speaker.photo,
      });
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, speaker]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all animate-slideUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all hover:scale-110"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 text-gray-700"
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

        <div className="grid md:grid-cols-5 gap-6 p-6">
          <div className="md:col-span-2 flex items-start justify-center">
            <div className="sticky top-6 w-full max-w-[300px]">
              <div className="aspect-square rounded-full overflow-hidden shadow-lg relative">
                <OptimizedImage
                  src={speaker.photoModal || speaker.photo}
                  alt={`Fotografia profissional de ${speaker.name}, ${speaker.affiliation}`}
                  className="w-full h-full object-cover speaker-photo"
                  loading="eager"
                  fetchPriority="high"
                  onError={() => {
                    console.error(`Failed to load modal photo for ${speaker.name}:`, {
                      photoModal: speaker.photoModal,
                      photo: speaker.photo,
                      using: speaker.photoModal || speaker.photo,
                    });
                    // Keep original error handling but don't change src to avoid loops
                  }}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-4">
              <h2 id="modal-title" className="text-xl font-bold text-gray-900 mb-1">
                {speaker.name}
              </h2>
              <p className="text-sm text-[#e0a085] font-semibold mb-4">{speaker.affiliation}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {speaker.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-[#e0a085]/10 text-[#e0a085] font-medium px-3 py-1.5 rounded-full border border-[#e0a085]/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {speaker.bio && (
              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-gray-700 leading-relaxed text-justify">{speaker.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
