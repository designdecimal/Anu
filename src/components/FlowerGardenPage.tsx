import React, { useState, useEffect, useRef } from 'react';
import { JavaFlower } from './JavaFlower';
import { Sparkles, Heart, Mail, Wind } from 'lucide-react';
import { sound } from '../utils/audio';

interface SpawnedFlower {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

interface DriftingPetal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotateStart: number;
}

interface FlowerGardenPageProps {
  onContinue: () => void;
}

export const FlowerGardenPage: React.FC<FlowerGardenPageProps> = ({ onContinue }) => {
  const [spawnedFlowers, setSpawnedFlowers] = useState<SpawnedFlower[]>([]);
  const [driftingPetals, setDriftingPetals] = useState<DriftingPetal[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize background drifting petals
  useEffect(() => {
    const petals: DriftingPetal[] = [];
    for (let i = 0; i < 28; i++) {
      petals.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 18 + 14,
        duration: Math.random() * 7 + 8,
        delay: Math.random() * 8,
        rotateStart: Math.random() * 360,
      });
    }
    setDriftingPetals(petals);

    // Initial garden chime
    sound.playBloomChime();
  }, []);

  // Handle user tapping/clicking anywhere to spawn a blooming Java Flower
  const handleGardenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid spawning directly on the "Read My Letter" button
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.floor(Math.random() * 45 + 85);
    const rotation = Math.floor(Math.random() * 70 - 35);

    const newFlower: SpawnedFlower = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
      rotation,
    };

    setSpawnedFlowers((prev) => [...prev.slice(-18), newFlower]);
    sound.playBloomChime();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleGardenClick}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-stone-950 via-rose-950/90 to-emerald-950/80 text-white cursor-crosshair select-none flex flex-col justify-between p-4 sm:p-8"
    >
      {/* Ambient mystical garden glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Java Petals drifting across the entire screen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {driftingPetals.map((petal) => (
          <div
            key={petal.id}
            className="absolute"
            style={{
              left: `${petal.left}%`,
              top: '-5%',
              animation: `petal-drift ${petal.duration}s linear infinite`,
              animationDelay: `${petal.delay}s`,
            }}
          >
            {/* Realistic Java flower petal shape */}
            <svg
              width={petal.size}
              height={petal.size * 1.3}
              viewBox="0 0 30 40"
              style={{ transform: `rotate(${petal.rotateStart}deg)` }}
            >
              <path
                d="M15 0 C25 10 30 25 22 35 C15 42 10 38 5 32 C-2 22 5 8 15 0 Z"
                fill="url(#petal-flow-grad)"
                opacity="0.85"
              />
              <defs>
                <linearGradient id="petal-flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff4d6d" />
                  <stop offset="60%" stopColor="#c9184a" />
                  <stop offset="100%" stopColor="#590d22" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>

      {/* Top Banner / Header */}
      <header className="relative z-20 flex flex-col items-center text-center mt-2 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-200 text-xs uppercase tracking-widest font-medium backdrop-blur-md mb-2 shadow-lg">
          <Wind className="w-3.5 h-3.5 text-rose-300" />
          <span>The Hibiscus Haven</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-md">
          A Blooming Garden For <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300">Anishka</span>
        </h1>

        <p className="text-xs sm:text-sm text-rose-200/80 max-w-md mt-1 font-sans">
          Featuring blooming Java flowers (Hibiscus) · Tap anywhere on screen to sprout blossoms! 🌸
        </p>
      </header>

      {/* Permanent Scenic Java Flower Clusters (Swaying gently) */}
      {/* Bottom Left Corner Floral Bush */}
      <div className="absolute -bottom-8 -left-8 z-10 pointer-events-none animate-float-slow">
        <div className="relative">
          <JavaFlower size={180} style={{ transform: 'rotate(-15deg)' }} />
          <div className="absolute top-10 left-20">
            <JavaFlower size={130} style={{ transform: 'rotate(25deg)' }} bloomDelay={0.4} />
          </div>
          <div className="absolute -top-12 left-10">
            <JavaFlower size={110} style={{ transform: 'rotate(-35deg)' }} bloomDelay={0.8} />
          </div>
        </div>
      </div>

      {/* Bottom Right Corner Floral Bush */}
      <div className="absolute -bottom-10 -right-8 z-10 pointer-events-none animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <div className="relative">
          <JavaFlower size={190} style={{ transform: 'rotate(20deg) scaleX(-1)' }} />
          <div className="absolute top-12 right-20">
            <JavaFlower size={140} style={{ transform: 'rotate(-15deg) scaleX(-1)' }} bloomDelay={0.6} />
          </div>
          <div className="absolute -top-10 right-10">
            <JavaFlower size={115} style={{ transform: 'rotate(40deg)' }} bloomDelay={1.1} />
          </div>
        </div>
      </div>

      {/* Mid Left Flower Cluster */}
      <div className="absolute top-1/3 -left-6 z-10 pointer-events-none animate-float-slow" style={{ animationDelay: '0.8s' }}>
        <JavaFlower size={110} style={{ transform: 'rotate(45deg)' }} bloomDelay={0.3} />
      </div>

      {/* Mid Right Flower Cluster */}
      <div className="absolute top-2/5 -right-6 z-10 pointer-events-none animate-float-slow" style={{ animationDelay: '2.1s' }}>
        <JavaFlower size={120} style={{ transform: 'rotate(-30deg)' }} bloomDelay={0.5} />
      </div>

      {/* User Spawned Blooming Flowers Layer */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {spawnedFlowers.map((f) => (
          <div
            key={f.id}
            className="absolute animate-bloom"
            style={{
              left: f.x - f.size / 2,
              top: f.y - f.size / 2,
              transform: `rotate(${f.rotation}deg)`,
            }}
          >
            <JavaFlower size={f.size} />
          </div>
        ))}
      </div>

      {/* Centerpiece Prominent Java Flower Display */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto pointer-events-none">
        <div className="relative flex items-center justify-center">
          {/* Radiating golden aura */}
          <div className="absolute w-52 h-52 rounded-full bg-rose-500/25 blur-3xl animate-gentle-pulse" />
          <div className="relative transform hover:scale-105 transition-transform duration-500 pointer-events-auto cursor-pointer" onClick={() => sound.playBloomChime()}>
            <JavaFlower size={200} className="animate-gentle-pulse" />
          </div>
        </div>

        <div className="mt-4 text-center max-w-sm px-4">
          <p className="font-handwriting text-2xl sm:text-3xl text-rose-200 drop-shadow">
            "Like the Hibiscus that blooms with radiant grace, you brighten every corner of the world."
          </p>
        </div>
      </div>

      {/* Bottom Action Footer with "Read My Letter" button */}
      <footer className="relative z-30 flex flex-col items-center justify-center pb-4 pt-2">
        <button
          type="button"
          onClick={onContinue}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 hover:from-amber-300 hover:to-rose-400 text-stone-950 font-bold text-base sm:text-lg shadow-[0_10px_30px_rgba(244,63,94,0.5)] border-2 border-amber-300/80 transform hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300/50"
        >
          <Mail className="w-5 h-5 text-stone-950 group-hover:rotate-12 transition-transform duration-300" />
          <span>Read My Letter</span>
          <Heart className="w-4 h-4 text-stone-950 fill-stone-950 group-hover:scale-125 transition-transform duration-300" />
        </button>

        <span className="text-xs text-rose-300/70 mt-2 font-sans">
          Click the button to open your personalized letter
        </span>
      </footer>
    </div>
  );
};
