import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Sparkles, Delete, Heart, HelpCircle, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface LandingPageProps {
  onUnlock: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const targetCode = '143';

  const handleKeyPress = useCallback((digit: string) => {
    if (isUnlocked || passcode.length >= 3) return;

    sound.playKeyTap(parseInt(digit, 10));
    const nextCode = passcode + digit;
    setPasscode(nextCode);

    if (nextCode.length === 3) {
      if (nextCode === targetCode) {
        setIsUnlocked(true);
        setStatusMessage('Unlocked with Love! 💖');
        sound.playUnlockSuccess();
        setTimeout(() => {
          onUnlock();
        }, 1200);
      } else {
        setIsShaking(true);
        setStatusMessage('Not quite right! Try again 💕');
        sound.playError();
        setTimeout(() => {
          setIsShaking(false);
          setPasscode('');
          setStatusMessage('');
        }, 900);
      }
    }
  }, [isUnlocked, passcode, onUnlock]);

  const handleBackspace = () => {
    if (isUnlocked || passcode.length === 0) return;
    sound.playKeyTap(0);
    setPasscode(prev => prev.slice(0, -1));
    setStatusMessage('');
  };

  const handleClear = () => {
    if (isUnlocked) return;
    sound.playKeyTap(0);
    setPasscode('');
    setStatusMessage('');
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape' || e.key === 'Delete') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-8 select-none"
      style={{
        backgroundImage: `url('https://media.giphy.com/media/HSL5gh9sl0pkXbdoW0/giphy.gif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Semi-transparent romantic dark/pink overlay ensuring high legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/80 via-black/70 to-rose-950/85 backdrop-blur-[2px] transition-opacity duration-700 pointer-events-none" />

      {/* Floating subtle ambient heart particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-300/30 animate-float-slow"
            style={{
              top: `${(i * 14 + 10) % 90}%`,
              left: `${(i * 23 + 5) % 92}%`,
              fontSize: `${(i % 3) * 10 + 18}px`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3.5 + (i % 4)}s`,
            }}
          >
            ❤
          </div>
        ))}
      </div>

      {/* Main Glassmorphic Card */}
      <div
        className={`relative z-10 w-full max-w-md bg-stone-900/75 border border-rose-400/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md text-center transition-all duration-700 ${
          isUnlocked
            ? 'scale-105 opacity-90 border-amber-400/80 shadow-[0_0_60px_rgba(251,191,36,0.4)]'
            : isShaking
            ? 'animate-shake border-red-500/80'
            : ''
        }`}
      >
        {/* Top Romantic Emblem */}
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-400 p-[2px] shadow-lg shadow-rose-600/30 flex items-center justify-center">
          <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center text-rose-300">
            {isUnlocked ? (
              <CheckCircle2 className="w-7 h-7 text-amber-300 animate-gentle-pulse" />
            ) : (
              <Lock className="w-6 h-6 text-rose-400" />
            )}
          </div>
        </div>

        {/* Prominent Bold Welcoming Text */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest text-amber-300 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Birthday Secret</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight drop-shadow-md">
            For Dearest <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">Anishka</span>
          </h1>

          <p className="text-sm text-rose-100/80 font-sans pt-1">
            {isUnlocked ? 'Access granted! Unveiling your surprise...' : 'Enter the 3-digit secret key to unlock your surprise'}
          </p>
        </div>

        {/* Masked Passcode Indicator Dots */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {[0, 1, 2].map((idx) => {
            const isFilled = passcode.length > idx;
            return (
              <div
                key={idx}
                className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isUnlocked
                    ? 'border-amber-400 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)] scale-110'
                    : isFilled
                    ? 'border-rose-400 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.7)] scale-110'
                    : 'border-rose-300/30 bg-rose-950/40'
                }`}
              >
                {isFilled && (
                  <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                )}
              </div>
            );
          })}
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`text-xs font-medium mb-4 transition-all duration-300 ${
              isUnlocked ? 'text-amber-300' : 'text-rose-400 animate-pulse'
            }`}
          >
            {statusMessage}
          </div>
        )}

        {/* Custom Interactive Numeric Keypad (0-9) */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto mb-5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleKeyPress(digit)}
              disabled={isUnlocked}
              className="h-14 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-rose-500/30 border border-white/10 hover:border-rose-400/40 active:border-rose-400 text-xl font-semibold text-white shadow-sm transition-all duration-150 transform active:scale-95 flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-rose-400/50"
            >
              <span>{digit}</span>
            </button>
          ))}

          {/* Clear button */}
          <button
            type="button"
            onClick={handleClear}
            disabled={isUnlocked || passcode.length === 0}
            className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/5 text-xs font-medium text-rose-200/70 hover:text-white uppercase tracking-wider transition-all duration-150 transform active:scale-95 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none focus:outline-none"
          >
            Clear
          </button>

          {/* Zero digit */}
          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            disabled={isUnlocked}
            className="h-14 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-rose-500/30 border border-white/10 hover:border-rose-400/40 active:border-rose-400 text-xl font-semibold text-white shadow-sm transition-all duration-150 transform active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-rose-400/50"
          >
            <span>0</span>
          </button>

          {/* Backspace button */}
          <button
            type="button"
            onClick={handleBackspace}
            disabled={isUnlocked || passcode.length === 0}
            aria-label="Delete last digit"
            className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/5 text-rose-200/80 hover:text-white transition-all duration-150 transform active:scale-95 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none focus:outline-none"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Romantic Hint Trigger */}
        <div className="pt-2 border-t border-rose-300/10 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => {
              setShowHint(!showHint);
              sound.playKeyTap(2);
            }}
            className="inline-flex items-center gap-1.5 text-xs text-rose-300/80 hover:text-rose-200 transition-colors py-1 px-3 rounded-lg hover:bg-rose-500/10 focus:outline-none"
          >
            <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Need a clue?</span>
          </button>

          {showHint && (
            <div className="mt-2 text-xs text-amber-200/90 bg-amber-950/40 border border-amber-500/30 rounded-xl py-2 px-3 animate-fade-in flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 shrink-0" />
              <span>Hint: 3 words of love — <strong>1 4 3</strong> ("I Love You")</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
