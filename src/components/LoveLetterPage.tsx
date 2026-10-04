import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Volume2, VolumeX, RotateCcw, Copy, Check, Flower2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface LoveLetterPageProps {
  onRestart: () => void;
  onBackToGarden: () => void;
}

export const LoveLetterPage: React.FC<LoveLetterPageProps> = ({ onRestart, onBackToGarden }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [sealStamped, setSealStamped] = useState<boolean>(false);

  const letterText = `Dearest Anishka,

On this extraordinary day, the universe gifted us someone truly enchanting—someone whose warmth melts away any quiet chill, whose smile holds the brilliance of golden dawn, and whose gentle spirit makes every single day brighter.

Watching you blossom and grow has been a pure, undeniable joy. You have this rare, delicate magic about you: a blend of genuine kindness, radiant grace, and an infectious laughter that leaves footprints of light wherever you go.

Just like the vibrant Java flower that stands proud and blooming amidst all seasons, may your life always overflow with deep passion, fearless dreams, and sweetest serenity. 

May this new year of your life bring you:
• Joy so profound it makes you glow,
• Moments so sweet they turn into cherished memories,
• Peace that guards your gentle mind,
• And a love that cherishes every unique facet of who you are.

Never forget how deeply treasured, admired, and loved you are—not just today on your birthday, but every heartbeat along the way.

Happy Birthday, my sweet Anishka. Here is to celebrating YOU!

Forever with all my love & fondest wishes,
Always Yours. ❤`;

  const handleToggleMusic = () => {
    const isPlaying = sound.toggleMusic();
    setIsPlayingMusic(isPlaying);
  };

  const handleWaxSealClick = () => {
    setSealStamped(true);
    sound.playGiftCelebration();

    const confettiFunc = (window as unknown as { confetti: typeof confetti }).confetti || confetti;
    confettiFunc({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#c9184a', '#ff4d6d', '#ffd166', '#d4af37'],
    });

    setTimeout(() => setSealStamped(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText).then(() => {
      setCopied(true);
      sound.playKeyTap(4);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-stone-950 via-rose-950/80 to-stone-950 text-stone-900 select-none overflow-x-hidden">
      {/* Ambient background rose glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating subtle ambient heart dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-300/20 animate-float-slow"
            style={{
              top: `${(i * 17 + 8) % 94}%`,
              left: `${(i * 29 + 13) % 92}%`,
              fontSize: `${(i % 3) * 8 + 14}px`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            ❤
          </div>
        ))}
      </div>

      {/* Top Floating Control Bar */}
      <nav className="relative z-20 w-full max-w-2xl flex items-center justify-between gap-3 mb-4 px-2">
        <button
          type="button"
          onClick={onBackToGarden}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/70 border border-rose-400/20 text-rose-200 text-xs font-medium hover:bg-stone-800 transition-colors backdrop-blur-md"
        >
          <Flower2 className="w-3.5 h-3.5 text-rose-400" />
          <span>Back to Garden</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Music Toggle */}
          <button
            type="button"
            onClick={handleToggleMusic}
            aria-label="Toggle Romantic Birthday Melody"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-md ${
              isPlayingMusic
                ? 'bg-amber-400/20 border border-amber-400/60 text-amber-200 animate-gentle-pulse'
                : 'bg-stone-900/70 border border-rose-400/20 text-rose-200 hover:bg-stone-800'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Melody Playing 🎶</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>Play Birthday Melody</span>
              </>
            )}
          </button>

          {/* Copy Letter Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy Letter to Clipboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/70 border border-rose-400/20 text-rose-200 text-xs font-medium hover:bg-stone-800 transition-colors backdrop-blur-md"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-rose-300" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Main Vintage Romantic Love Letter Card */}
      <div className="relative z-10 w-full max-w-2xl parchment-texture border-4 border-[#d4af37]/60 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.65)] text-stone-900 backdrop-blur-sm transition-all duration-500">
        {/* Decorative Golden Corner Filigree Ornaments */}
        <div className="absolute top-3 left-3 text-[#d4af37] text-lg select-none opacity-80">❦</div>
        <div className="absolute top-3 right-3 text-[#d4af37] text-lg select-none opacity-80">❦</div>
        <div className="absolute bottom-3 left-3 text-[#d4af37] text-lg select-none opacity-80">❦</div>
        <div className="absolute bottom-3 right-3 text-[#d4af37] text-lg select-none opacity-80">❦</div>

        {/* Golden Foil Inset Border */}
        <div className="absolute inset-2 sm:inset-3 border border-[#b38a2c]/30 rounded-2xl pointer-events-none" />

        {/* Letter Header */}
        <div className="text-center mb-6 border-b border-[#d4af37]/40 pb-4">
          <div className="flex items-center justify-center gap-2 text-rose-700 text-xs uppercase tracking-widest font-sans font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>To Anishka · With Endless Love</span>
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-rose-950 tracking-tight">
            Happy Birthday, My Love
          </h1>
          <p className="text-xs text-stone-600 font-sans italic mt-1">
            Celebrated with every beat of my heart
          </p>
        </div>

        {/* Letter Body in Romantic Handwritten / Cursive Font */}
        <div className="space-y-4 text-stone-800 leading-relaxed font-handwriting text-xl sm:text-2xl custom-letter-scroll max-h-[55vh] overflow-y-auto pr-2">
          <p className="font-bold text-rose-950 text-2xl sm:text-3xl font-script tracking-wide">
            Dearest Anishka,
          </p>

          <p>
            On this extraordinary day, the universe gifted us someone truly enchanting—someone whose warmth melts away any quiet chill, whose smile holds the brilliance of golden dawn, and whose gentle spirit makes every single day brighter.
          </p>

          <p>
            Watching you blossom and grow has been a pure, undeniable joy. You have this rare, delicate magic about you: a blend of genuine kindness, radiant grace, and an infectious laughter that leaves footprints of light wherever you go.
          </p>

          <p>
            Just like the vibrant Java flower that stands proud and blooming amidst all seasons, may your life always overflow with deep passion, fearless dreams, and sweetest serenity.
          </p>

          <div className="bg-amber-100/60 border-l-4 border-rose-600 pl-4 py-2 my-2 rounded-r-xl font-sans text-xs sm:text-sm text-stone-800 space-y-1 not-italic">
            <p className="font-semibold text-rose-900 font-serif text-sm">A Birthday Wish From The Soul:</p>
            <p>• Joy so profound it makes you glow,</p>
            <p>• Moments so sweet they turn into cherished memories,</p>
            <p>• Peace that guards your gentle mind,</p>
            <p>• And a love that cherishes every unique facet of who you are.</p>
          </div>

          <p>
            Never forget how deeply treasured, admired, and loved you are—not just today on your birthday, but every heartbeat along the way.
          </p>

          <p className="text-rose-900 font-bold">
            Happy Birthday, my sweet Anishka. Here is to celebrating YOU!
          </p>
        </div>

        {/* Letter Footer: Signoff & Wax Seal Stamp */}
        <div className="mt-8 pt-4 border-t border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-script text-2xl sm:text-3xl text-rose-950 font-bold">
              Forever with all my love,
            </p>
            <p className="font-handwriting text-lg sm:text-xl text-stone-600">
              Always Yours ❤
            </p>
          </div>

          {/* Interactive Vintage Wax Seal Stamp */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={handleWaxSealClick}
              aria-label="Wax Seal Stamp for Anishka"
              className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 border-2 border-amber-300 shadow-[0_4px_12px_rgba(159,18,57,0.6)] flex items-center justify-center transform transition-transform duration-300 active:scale-90 hover:scale-105 cursor-pointer focus:outline-none ${
                sealStamped ? 'animate-bounce ring-4 ring-amber-300' : ''
              }`}
            >
              {/* Embossed initial 'A' with ornate floral wreath */}
              <div className="w-12 h-12 rounded-full border border-rose-500/50 flex items-center justify-center text-amber-200 font-serif font-black text-2xl drop-shadow">
                A
              </div>
              <Heart className="absolute -bottom-1 -right-1 w-5 h-5 text-amber-300 fill-amber-300 drop-shadow" />
            </button>
            <span className="text-[10px] text-stone-500 font-sans tracking-wider uppercase mt-1">
              Tap Wax Seal
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Replay Action */}
      <footer className="relative z-20 mt-6 flex items-center justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-rose-400/30 text-rose-200 text-xs sm:text-sm font-semibold shadow-lg hover:shadow-rose-900/50 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-amber-300" />
          <span>Experience The Journey Again</span>
        </button>
      </footer>
    </div>
  );
};
