import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { GiftPage } from './components/GiftPage';
import { FlowerGardenPage } from './components/FlowerGardenPage';
import { LoveLetterPage } from './components/LoveLetterPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transitioning, setTransitioning] = useState<boolean>(false);

  const goToPage = (pageNumber: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  return (
    <main className="min-h-screen w-full relative bg-rose-950 text-white font-sans overflow-x-hidden">
      {/* Silky transition container */}
      <div
        className={`transition-all duration-400 ease-in-out ${
          transitioning
            ? 'opacity-0 scale-[0.98] blur-[2px]'
            : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {currentPage === 1 && (
          <LandingPage onUnlock={() => goToPage(2)} />
        )}

        {currentPage === 2 && (
          <GiftPage onContinue={() => goToPage(3)} />
        )}

        {currentPage === 3 && (
          <FlowerGardenPage onContinue={() => goToPage(4)} />
        )}

        {currentPage === 4 && (
          <LoveLetterPage
            onRestart={() => goToPage(1)}
            onBackToGarden={() => goToPage(3)}
          />
        )}
      </div>
    </main>
  );
}
