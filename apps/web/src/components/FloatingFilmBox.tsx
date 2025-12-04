export default function FloatingFilmBox() {
  return (
    <div
      className="absolute top-6 left-6 md:top-8 md:left-8 z-[100] animate-fadeInSlide"
      role="presentation"
      aria-label="Card informativo sobre participação online"
    >
      <div
        className="
          relative
          bg-gradient-to-br from-black via-[#1a0d05] to-[#2d1a0a]
          rounded-[24px]
          px-5 py-4
          md:px-6 md:py-5
          shadow-[0_8px_32px_rgba(0,0,0,0.6)]
          border border-[rgba(232,163,123,0.2)]
          backdrop-blur-sm
          w-[240px]
          md:w-[280px]
          transition-all duration-300
          hover:shadow-[0_12px_40px_rgba(232,163,123,0.25)]
        "
      >
        {/* Sparkle decorative elements - top right (faíscas) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-75">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-[#e8a37b]">
            <path
              d="M5.5 0L6.3 4.1L10.4 4.9L6.3 5.6L5.5 9.7L4.7 5.6L0.6 4.9L4.7 4.1L5.5 0Z"
              fill="currentColor"
            />
          </svg>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-[#e8a37b] ml-1.5">
            <path
              d="M4 0L4.5 2.8L7.3 3.3L4.5 3.7L4 6.5L3.5 3.7L0.7 3.3L3.5 2.8L4 0Z"
              fill="currentColor"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Content container */}
        <div className="relative pr-8">
          {/* Camera icon and "online" text row */}
          <div className="flex items-start gap-3 mb-3">
            {/* Camera icon */}
            <div className="flex-shrink-0 mt-0.5">
              <img
                src="/film-camera-icon.svg"
                alt="Câmera de cinema"
                className="w-7 h-7 md:w-8 md:h-8 opacity-90"
                loading="eager"
              />
            </div>

            {/* "online" text with curved underline */}
            <div className="flex-1 min-w-0">
              <div className="relative inline-block">
                <span className="text-white text-[28px] md:text-[34px] font-bold tracking-tight leading-none block">
                  online
                </span>
                {/* Curved underline SVG - linha curva */}
                <svg
                  className="absolute -bottom-1 left-0 w-[100px] md:w-[115px] h-3.5"
                  viewBox="0 0 115 14"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 2 10 Q 28 4, 54 6 T 110 8"
                    stroke="#e8a37b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Description text */}
          <p className="text-white text-[11px] md:text-xs leading-relaxed font-normal">
            nova modalidade de participação para pesquisadores estrangeiros
          </p>
        </div>

        {/* Additional small sparkle decoration - bottom right */}
        <div className="absolute bottom-3 right-3 opacity-60">
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="text-[#e8a37b]">
            <path
              d="M3 0L3.3 1.8L5.1 2.1L3.3 2.3L3 4.1L2.7 2.3L0.9 2.1L2.7 1.8L3 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
