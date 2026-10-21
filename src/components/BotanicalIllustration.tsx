import React from 'react';

interface BotanicalIllustrationProps {
  className?: string;
}

export const BotanicalIllustration: React.FC<BotanicalIllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative bg-[#FAFBF7] border border-[#52796F]/25 rounded-md p-6 overflow-hidden select-none ${className}`}>
      {/* Specimen Header Annotation */}
      <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-[#52796F] uppercase border-b border-[#52796F]/20 pb-2 mb-4">
        <span>HERBARIUM AGRO-VASCONIA</span>
        <span>TABULA NO. 14 — SOLANACEAE</span>
      </div>

      {/* Main Specimen Display with decorative herbarium mounting tape */}
      <div className="relative flex items-center justify-center py-4">
        {/* Top Paper Tape */}
        <div className="absolute top-0 w-16 h-4 bg-[#EADCC9]/80 border border-[#D5C2AA] rotate-[-2deg] shadow-xs z-10" aria-hidden="true" />
        
        {/* Elegant Tomato Branch SVG Illustration */}
        <svg
          viewBox="0 0 240 320"
          className="w-48 sm:w-56 h-auto drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Ilustración botánica de Solanum lycopersicum"
        >
          {/* Main Central Stem */}
          <path
            d="M120 310 C 120 250, 115 180, 122 20"
            stroke="#2D5A46"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Leaf pair 1 (Lower) */}
          {/* Left lateral petiole */}
          <path d="M118 240 C 95 235, 70 245, 42 250" stroke="#2D5A46" strokeWidth="2.2" strokeLinecap="round" />
          {/* Left leaflet */}
          <path
            d="M42 250 C 30 230, 45 200, 75 215 C 85 220, 80 240, 42 250 Z"
            fill="#52796F"
            fillOpacity="0.85"
            stroke="#1D3B2F"
            strokeWidth="1.2"
          />
          {/* Left leaflet venation */}
          <path d="M50 240 C 60 230, 70 225, 75 215" stroke="#FAFBF7" strokeWidth="1" strokeOpacity="0.5" />

          {/* Right lateral petiole */}
          <path d="M120 220 C 145 215, 175 225, 202 228" stroke="#2D5A46" strokeWidth="2.2" strokeLinecap="round" />
          {/* Right leaflet */}
          <path
            d="M202 228 C 215 208, 195 180, 168 195 C 158 200, 165 220, 202 228 Z"
            fill="#3D6852"
            fillOpacity="0.9"
            stroke="#1D3B2F"
            strokeWidth="1.2"
          />
          <path d="M192 220 C 182 210, 172 205, 168 195" stroke="#FAFBF7" strokeWidth="1" strokeOpacity="0.5" />

          {/* Leaf pair 2 (Middle) */}
          {/* Left middle petiole */}
          <path d="M119 160 C 90 150, 65 158, 35 155" stroke="#2D5A46" strokeWidth="2.2" strokeLinecap="round" />
          {/* Left middle leaflet */}
          <path
            d="M35 155 C 20 135, 38 105, 68 120 C 78 125, 72 145, 35 155 Z"
            fill="#3D6852"
            fillOpacity="0.88"
            stroke="#1D3B2F"
            strokeWidth="1.2"
          />
          <path d="M45 145 C 55 135, 62 130, 68 120" stroke="#FAFBF7" strokeWidth="1" strokeOpacity="0.5" />

          {/* Right middle petiole */}
          <path d="M121 145 C 148 138, 178 142, 208 138" stroke="#2D5A46" strokeWidth="2.2" strokeLinecap="round" />
          {/* Right middle leaflet */}
          <path
            d="M208 138 C 220 118, 200 90, 170 108 C 160 114, 168 132, 208 138 Z"
            fill="#52796F"
            fillOpacity="0.9"
            stroke="#1D3B2F"
            strokeWidth="1.2"
          />
          <path d="M198 130 C 188 120, 178 115, 170 108" stroke="#FAFBF7" strokeWidth="1" strokeOpacity="0.5" />

          {/* Leaf pair 3 (Upper) */}
          <path d="M120 90 C 100 80, 80 82, 55 75" stroke="#2D5A46" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M55 75 C 45 58, 60 38, 85 48 C 92 52, 88 68, 55 75 Z"
            fill="#52796F"
            fillOpacity="0.85"
            stroke="#1D3B2F"
            strokeWidth="1.2"
          />

          <path d="M121 78 C 142 70, 165 72, 188 64" stroke="#2D5A46" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M188 64 C 198 48, 180 28, 155 38 C 148 42, 154 58, 188 64 Z"
            fill="#3D6852"
            fillOpacity="0.9"
            stroke="#1D3B2F"
            strokeWidth="1.2"
          />

          {/* Terminal Apex Leaflet */}
          <path
            d="M122 20 C 108 5, 136 5, 122 20 Z"
            fill="#3D6852"
            stroke="#1D3B2F"
            strokeWidth="1.2"
          />
          <path
            d="M122 20 C 110 -5, 134 -5, 122 20 Z"
            fill="#658E78"
            fillOpacity="0.95"
            stroke="#1D3B2F"
            strokeWidth="1.2"
          />

          {/* Incipient flower sepals / buds */}
          <g transform="translate(132, 110)">
            <path d="M0 0 L 8 -10 M0 0 L 12 -4 M0 0 L 6 6" stroke="#52796F" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="8" cy="-10" r="2.5" fill="#E2BA49" stroke="#9A7718" strokeWidth="0.8" />
          </g>

          {/* Bottom tape */}
          <rect x="100" y="295" width="40" height="12" fill="#EADCC9" fillOpacity="0.8" transform="rotate(3 120 301)" />
        </svg>

        {/* Bottom Paper Tape */}
        <div className="absolute bottom-2 w-20 h-4 bg-[#EADCC9]/80 border border-[#D5C2AA] rotate-[1.5deg] shadow-xs z-10" aria-hidden="true" />
      </div>

      {/* Specimen Field Notes Label */}
      <div className="border-t border-[#52796F]/20 pt-3 mt-2 grid grid-cols-2 gap-2 text-[11px] text-[#2D5A46]">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-[#52796F] block font-mono">Especie Tipo</span>
          <span className="font-serif italic font-semibold text-[#1D3B2F]">Solanum lycopersicum L.</span>
        </div>
        <div>
          <span className="text-[9px] uppercase tracking-wider text-[#52796F] block font-mono">Biotopo</span>
          <span className="text-[#1D3B2F]">Huerto Atlántico Euskadi</span>
        </div>
      </div>
    </div>
  );
};
