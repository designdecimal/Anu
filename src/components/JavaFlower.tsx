/**
 * Realistic Hibiscus rosa-sinensis (Java Flower / China Rose) component.
 * Features 5 distinct velvety crimson-red ruffled petals, subtle vein textures,
 * a prominent elongated scarlet staminal column with golden-yellow anthers,
 * and 5 deep-red stigma lobes, flanked by serrated deep-emerald leaves.
 */

import React from 'react';

interface JavaFlowerProps {
  size?: number;
  className?: string;
  bloomDelay?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const JavaFlower: React.FC<JavaFlowerProps> = ({
  size = 120,
  className = '',
  bloomDelay = 0,
  style = {},
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        animationDelay: `${bloomDelay}s`,
        ...style,
      }}
      className={`relative inline-block select-none transform transition-transform duration-500 hover:scale-110 active:scale-95 ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(180,20,50,0.35)]"
      >
        <defs>
          {/* Petal Gradients */}
          <radialGradient id="petal-grad-1" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="45%" stopColor="#c9184a" />
            <stop offset="85%" stopColor="#800f2f" />
            <stop offset="100%" stopColor="#590d22" />
          </radialGradient>

          <radialGradient id="petal-grad-2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff758f" />
            <stop offset="50%" stopColor="#a4133c" />
            <stop offset="100%" stopColor="#480416" />
          </radialGradient>

          {/* Deep Flower Center */}
          <radialGradient id="flower-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd166" />
            <stop offset="35%" stopColor="#d90429" />
            <stop offset="70%" stopColor="#590d22" />
            <stop offset="100%" stopColor="#2b0914" />
          </radialGradient>

          {/* Leaf Gradient */}
          <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38b000" />
            <stop offset="40%" stopColor="#007200" />
            <stop offset="100%" stopColor="#004b23" />
          </linearGradient>

          {/* Staminal Column Tube Gradient */}
          <linearGradient id="stamen-tube" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#a4133c" />
            <stop offset="60%" stopColor="#e63946" />
            <stop offset="100%" stopColor="#ff4d6d" />
          </linearGradient>

          {/* Gold Anther Glow */}
          <radialGradient id="anther-gold" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff3b0" />
            <stop offset="60%" stopColor="#ffd166" />
            <stop offset="100%" stopColor="#e76f51" />
          </radialGradient>
        </defs>

        {/* Emerald Calyx & Foliage Leaves behind the flower */}
        <g className="leaves">
          {/* Top Left Leaf */}
          <path
            d="M50 70 C30 50 15 25 35 15 C55 5 75 35 70 65 Z"
            fill="url(#leaf-grad)"
            opacity="0.9"
          />
          {/* Vein */}
          <path d="M60 60 Q45 40 35 15" stroke="#70e000" strokeWidth="1.2" opacity="0.6" />

          {/* Bottom Right Leaf */}
          <path
            d="M150 135 C175 155 190 180 170 190 C150 200 130 170 135 140 Z"
            fill="url(#leaf-grad)"
            opacity="0.9"
          />
          <path d="M140 145 Q160 165 170 190" stroke="#70e000" strokeWidth="1.2" opacity="0.6" />

          {/* Bottom Left Leaf */}
          <path
            d="M60 145 C40 170 20 185 10 165 C0 145 35 130 55 135 Z"
            fill="url(#leaf-grad)"
            opacity="0.85"
          />
        </g>

        {/* 5 Distinct Broad Ruffled Java Flower Petals */}
        {/* Petal 1: Top Petal */}
        <path
          d="M100 100 C75 80 50 35 85 20 C110 8 135 25 135 60 C135 80 115 95 100 100 Z"
          fill="url(#petal-grad-1)"
          stroke="#ff758f"
          strokeWidth="0.8"
        />
        {/* Petal 1 Texture Veins */}
        <path d="M100 95 Q90 55 95 25" stroke="#ff8fa3" strokeWidth="0.75" opacity="0.5" />
        <path d="M100 95 Q115 65 125 35" stroke="#ff8fa3" strokeWidth="0.75" opacity="0.5" />

        {/* Petal 2: Right Top Petal */}
        <path
          d="M100 100 C118 78 165 60 180 85 C192 108 175 135 145 135 C125 135 110 115 100 100 Z"
          fill="url(#petal-grad-2)"
          stroke="#ff758f"
          strokeWidth="0.8"
        />
        <path d="M100 100 Q140 95 175 90" stroke="#ff8fa3" strokeWidth="0.75" opacity="0.5" />

        {/* Petal 3: Bottom Right Petal */}
        <path
          d="M100 100 C115 118 135 165 115 182 C95 198 75 180 70 150 C65 130 85 112 100 100 Z"
          fill="url(#petal-grad-1)"
          stroke="#ff758f"
          strokeWidth="0.8"
        />
        <path d="M100 100 Q105 145 105 180" stroke="#ff8fa3" strokeWidth="0.75" opacity="0.5" />

        {/* Petal 4: Bottom Left Petal */}
        <path
          d="M100 100 C80 118 35 150 20 128 C5 105 25 80 55 80 C75 80 90 92 100 100 Z"
          fill="url(#petal-grad-2)"
          stroke="#ff758f"
          strokeWidth="0.8"
        />
        <path d="M100 100 Q55 115 25 120" stroke="#ff8fa3" strokeWidth="0.75" opacity="0.5" />

        {/* Petal 5: Center-Left Overlapping Petal */}
        <path
          d="M100 100 C80 75 40 70 45 45 C50 25 85 35 95 65 C100 80 100 90 100 100 Z"
          fill="url(#petal-grad-1)"
          stroke="#ff8fa3"
          strokeWidth="0.8"
        />

        {/* Deep Ruby Flower Center / Throat */}
        <circle cx="100" cy="100" r="18" fill="url(#flower-center)" />
        <circle cx="100" cy="100" r="12" fill="#38040e" />

        {/* Iconic Java Hibiscus Staminal Column (Stamen Tube) projecting outward */}
        <g className="staminal-column">
          {/* Curved floral column tube projecting forward */}
          <path
            d="M100 100 Q108 75 125 50"
            stroke="url(#stamen-tube)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Highlight line on tube */}
          <path
            d="M99 98 Q107 74 123 50"
            stroke="#ffb3c1"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Yellow Anthers clustered around the upper half of the column */}
          {/* Left side anthers with tiny filaments */}
          <path d="M110 78 L103 76" stroke="#ff4d6d" strokeWidth="1.2" />
          <circle cx="102" cy="76" r="2.8" fill="url(#anther-gold)" />

          <path d="M114 70 L106 67" stroke="#ff4d6d" strokeWidth="1.2" />
          <circle cx="105" cy="66" r="2.8" fill="url(#anther-gold)" />

          <path d="M118 62 L110 58" stroke="#ff4d6d" strokeWidth="1.2" />
          <circle cx="109" cy="57" r="2.8" fill="url(#anther-gold)" />

          <path d="M122 55 L115 50" stroke="#ff4d6d" strokeWidth="1.2" />
          <circle cx="114" cy="49" r="2.8" fill="url(#anther-gold)" />

          {/* Right side anthers */}
          <path d="M111 77 L119 78" stroke="#ff4d6d" strokeWidth="1.2" />
          <circle cx="120" cy="79" r="2.8" fill="url(#anther-gold)" />

          <path d="M116 68 L125 68" stroke="#ff4d6d" strokeWidth="1.2" />
          <circle cx="126" cy="68" r="2.8" fill="url(#anther-gold)" />

          <path d="M120 60 L129 58" stroke="#ff4d6d" strokeWidth="1.2" />
          <circle cx="130" cy="58" r="2.8" fill="url(#anther-gold)" />

          {/* 5 Distinct Ruby Velvet Stigma Lobes at the very tip */}
          <g transform="translate(125, 48)">
            <circle cx="0" cy="-6" r="3.2" fill="#800f2f" stroke="#ff4d6d" strokeWidth="0.8" />
            <circle cx="6" cy="-2" r="3.2" fill="#800f2f" stroke="#ff4d6d" strokeWidth="0.8" />
            <circle cx="4" cy="5" r="3.2" fill="#800f2f" stroke="#ff4d6d" strokeWidth="0.8" />
            <circle cx="-4" cy="5" r="3.2" fill="#800f2f" stroke="#ff4d6d" strokeWidth="0.8" />
            <circle cx="-6" cy="-2" r="3.2" fill="#800f2f" stroke="#ff4d6d" strokeWidth="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
};
