import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, ArrowRight, Heart, Star, Cake } from 'lucide-react';
import { sound } from '../utils/audio';

interface GiftPageProps {
  onContinue: () => void;
}

export const GiftPage: React.FC<GiftPageProps> = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(6);
  const countdownIntervalRef = useRef<number | null>(null);

  // Trigger rich multi-layered celebratory confetti bursts
  const fireConfetti = () => {
    // Check if CDN confetti is available on window or use imported confetti
    const confettiFunc = (window as unknown as { confetti: typeof confetti }).confetti || confetti;

    // Burst 1: Central explosion
    confettiFunc({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffd166', '#ffb703', '#ffffff', '#e63946'],
    });

    // Burst 2: Left canon
    setTimeout(() => {
      confettiFunc({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f72585', '#7209b7', '#ffd166', '#ff4d6d'],
      });
    }, 200);

    // Burst 3: Right canon
    setTimeout(() => {
      confettiFunc({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffd166', '#ffb703', '#e63946', '#ff758f'],
      });
    }, 400);

    // Continuous sparkles
    setTimeout(() => {
      confettiFunc({
        particleCount: 40,
        spread: 100,
        origin: { y: 0.4 },
        shapes: ['circle'],
        scalar: 1.2,
        colors: ['#ffd700', '#ff69b4', '#ffffff'],
      });
    }, 700);
  };

  const handleOpenGift = () => {
    if (isOpen) {
      // Re-trigger confetti if tapped again!
      fireConfetti();
      sound.playGiftCelebration();
      return;
    }

    setIsOpen(true);
    sound.playGiftCelebration();
    fireConfetti();
  };

  // Countdown to automatic transition once opened
  useEffect(() => {
    if (isOpen) {
      countdownIntervalRef.current = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            onContinue();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [isOpen, onContinue]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-8 bg-gradient-to-b from-stone-950 via-rose-950 to-stone-950 text-white select-none">
      {/* Background ambient glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Sparkles in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-amber-200/40 animate-pulse"
            style={{
              top: `${(i * 19 + 7) % 95}%`,
              left: `${(i * 31 + 11) % 93}%`,
              animationDuration: `${1.5 + (i % 3)}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Pre-Open State */}
        {!isOpen ? (
          <div className="flex flex-col items-center animate-fade-in">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs uppercase tracking-widest font-medium mb-6 backdrop-blur-sm">
              <Gift className="w-3.5 h-3.5 text-rose-300" />
              <span>A Special Delivery For You</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4 drop-shadow-lg">
              Unlock Your Birthday Present
            </h1>
            <p className="text-rose-200/80 text-sm sm:text-base max-w-md mb-10 font-sans">
              A parcel wrapped with endless warmth, wonder, and wishes crafted specially for <strong className="text-amber-300 font-semibold">Anishka</strong>.
            </p>

            {/* Tap to Open Gift Button with bounce animation */}
            <div className="relative group cursor-pointer" onClick={handleOpenGift}>
              {/* Outer Golden Aura Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-600 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-gentle-pulse" />

              {/* Styled Interactive Gift Box with Bounce Animation */}
              <button
                type="button"
                onClick={handleOpenGift}
                aria-label="Tap to Open Gift"
                className="relative flex flex-col items-center justify-center w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 border-2 border-amber-300/80 shadow-[0_15px_35px_rgba(225,29,72,0.5)] transform hover:scale-105 active:scale-95 transition-all duration-300 animate-bounce focus:outline-none"
              >
                {/* Golden Ribbon across the box */}
                <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-md" />
                <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-400 shadow-md" />

                {/* Ribbon Bow on Top */}
                <div className="absolute -top-5 z-20 flex items-center justify-center">
                  <div className="relative flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 border border-amber-100 shadow-lg -mr-2 transform -rotate-12" />
                    <div className="w-6 h-6 rounded-full bg-amber-200 border border-amber-100 shadow-md z-10" />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 border border-amber-100 shadow-lg -ml-2 transform rotate-12" />
                  </div>
                </div>

                {/* Gift Center Content */}
                <div className="relative z-10 flex flex-col items-center gap-2 pt-2">
                  <Sparkles className="w-8 h-8 text-amber-200 drop-shadow" />
                  <span className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide drop-shadow-md">
                    Tap to Open Gift
                  </span>
                  <span className="text-xs text-amber-200/90 font-sans tracking-wider uppercase">
                    Touch Here ✨
                  </span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Post-Open State: Celebratory HBD + Anishka display */
          <div className="flex flex-col items-center animate-fade-in w-full">
            {/* Celebration Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-sm font-semibold tracking-wider mb-6 shadow-inner animate-gentle-pulse">
              <Cake className="w-4 h-4 text-amber-300" />
              <span>Today Belongs To You!</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>

            {/* Bold HBD text & recipient name Anishka */}
            <div className="space-y-3 mb-6">
              <h2 className="text-6xl sm:text-8xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 drop-shadow-[0_10px_20px_rgba(251,191,36,0.4)]">
                HBD
              </h2>

              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-normal flex items-center justify-center gap-3">
                <span>Anishka!</span>
                <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-rose-500 fill-rose-500 animate-pulse inline-block" />
              </h1>

              <p className="text-base sm:text-xl text-rose-100 font-sans max-w-lg mx-auto leading-relaxed pt-2">
                May your special day be filled with radiant laughter, boundless joy, and all the magic your beautiful heart holds.
              </p>
            </div>

            {/* Unboxed opened gift box illustration with radiating beams */}
            <div className="relative my-6 cursor-pointer" onClick={fireConfetti}>
              <div className="w-36 h-36 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-rose-500/30 to-amber-300/20 border border-amber-400/50 flex flex-col items-center justify-center p-4 backdrop-blur-md shadow-[0_0_40px_rgba(251,191,36,0.3)]">
                <Star className="w-10 h-10 text-amber-300 fill-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-xs text-amber-200 mt-2 font-medium tracking-wide">
                  More Confetti! 🎉
                </span>
              </div>
            </div>

            {/* Transition Controls */}
            <div className="flex flex-col items-center gap-4 mt-2">
              <button
                type="button"
                onClick={onContinue}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 text-stone-950 font-bold text-base shadow-[0_10px_25px_rgba(244,63,94,0.4)] hover:shadow-[0_15px_35px_rgba(251,191,36,0.6)] transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                <span>Continue to Flower Garden</span>
                <ArrowRight className="w-5 h-5 text-stone-950" />
              </button>

              {/* Subtle countdown notice */}
              <div className="text-xs text-rose-200/60 font-sans">
                Automatically blooming in {countdown}s...
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
