/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Account & Ledger
   
  Developer: Don Paulo Ricardo
  CEO: Raphaela Cervesky
   
  ORCID: https://orcid.org/0009-0002-1934-3559
  Copyright © 2025 Regenera Ecosystem. All rights reserved.
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] components/screens/SplashScreen.tsx
import React, { useState, useEffect } from 'react';

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [stage, setStage] = useState(0); // 0: Init, 1: Logo Reveal, 2: Text Reveal, 3: Exit
  
  useEffect(() => {
    // Stage 1: Logo Reveal (Immediate)
    const t1 = setTimeout(() => setStage(1), 100);
    // Stage 2: Text Reveal
    const t2 = setTimeout(() => setStage(2), 800);
    // Stage 3: Exit Animation Start
    const t3 = setTimeout(() => setStage(3), 3000);
    // Finish: Unmount
    const t4 = setTimeout(() => onFinish(), 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onFinish]);

  return (
    <div className={`
      relative h-full w-full overflow-hidden bg-[#0A0E17] flex flex-col items-center justify-center
      transition-opacity duration-700 ease-in-out
      ${stage === 3 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
    `}>
       {/* Ambient Background */}
       <div className="absolute inset-0 transition-all duration-[3000ms] ease-out transform" style={{ transform: stage >= 1 ? 'scale(1.2)' : 'scale(1)' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#3A66FF]/20 via-[#09158B]/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-[#06B6D4]/10 via-transparent to-transparent rounded-full blur-2xl" />
       </div>

       {/* Logo Container */}
       <div className="flex flex-col items-center relative z-10">
          <div className={`
            relative transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)
            ${stage >= 1 ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10'}
          `}>
            <div className="absolute inset-0 bg-[#3A66FF] blur-2xl opacity-40 animate-pulse"></div>
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#3A66FF] to-[#06B6D4] flex items-center justify-center shadow-2xl shadow-[#3A66FF]/30 mb-8 relative z-10 border border-white/10 ring-1 ring-white/20">
               <span className="text-5xl font-extrabold text-white drop-shadow-md">R</span>
            </div>
          </div>
          
          <div className={`text-center transition-all duration-1000 delay-200 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              REGENERA
            </h1>
            <p className="text-[#06B6D4] text-lg font-bold tracking-[0.4em] uppercase text-shadow-glow">
              BANK
            </p>
          </div>
       </div>

       {/* Loader / Footer */}
       <div className={`absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-1000 delay-500 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-6 h-6 border-2 border-[#3A66FF]/20 border-t-[#06B6D4] rounded-full animate-spin"></div>
          <p className="text-[#9CA3AF] text-[10px] uppercase tracking-widest">Secure Environment</p>
       </div>
    </div>
  );
};

/*
╔══════════════════════════════════════════════════════════════════════════╗
║  REGENERA BANK - PRODUCTION BUILD                                        ║
║  System Status: Stable & Secure                                          ║
║  © 2025 Don Paulo Ricardo de Leão • Todos os direitos reservados         ║
╚══════════════════════════════════════════════════════════════════════════╝
*/