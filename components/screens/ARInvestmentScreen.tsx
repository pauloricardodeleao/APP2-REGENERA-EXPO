/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Augmented Reality Wealth Visualization
   
  Developer: Don Paulo Ricardo
  CEO: Raphaela Cervesky
   
  ORCID: https://orcid.org/0009-0002-1934-3559
  Copyright © 2025 Regenera Ecosystem. All rights reserved.
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] components/screens/ARInvestmentScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Box, X, ScanLine, Info, Layers, Maximize, Aperture } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassButton } from '../ui/GlassButton';

export const ARInvestmentScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [init, setInit] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  
  // Simulated Camera Stream
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt to access camera (simulated success for demo)
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.log("Camera access simulated or denied", err));

    setTimeout(() => setInit(true), 1200); // Simulate scanning time
  }, []);

  const assets = [
    { id: 'btc', name: 'Bitcoin Reserve', value: 'R$ 1.2M', growth: '+12%', x: 10, y: 20, z: -100, color: 'from-[#F7931A] to-[#F7931A]/50' },
    { id: 'prop', name: 'Real Estate Fund', value: 'R$ 850k', growth: '+0.8%', x: -30, y: -10, z: -150, color: 'from-[#3A66FF] to-[#3A66FF]/50' },
    { id: 'esg', name: 'Regenera ESG', value: 'R$ 500k', growth: '+15%', x: 40, y: -40, z: -80, color: 'from-[#10B981] to-[#10B981]/50' },
  ];

  return (
    <div className="relative h-full w-full bg-black overflow-hidden flex flex-col">
       
       {/* Background Camera Feed (or simulation) */}
       <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60 grayscale"
          />
          {/* Cyberpunk Overlay Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
       </div>

       {/* SCANNING OVERLAY */}
       {!init && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
             <div className="flex flex-col items-center gap-4">
                <Aperture size={48} className="text-[#00F0FF] animate-spin" />
                <p className="text-[#00F0FF] font-mono tracking-widest text-xs animate-pulse">CALIBRATING LENS...</p>
             </div>
             <div className="absolute top-0 w-full h-1 bg-[#00F0FF]/50 shadow-[0_0_20px_#00F0FF] animate-[scan_1.5s_ease-in-out_infinite]" />
             <style>{`@keyframes scan { 0% { top: 0% } 50% { top: 100% } 100% { top: 0% } }`}</style>
          </div>
       )}

       {/* UI Layer */}
       <div className="relative z-50 px-6 pt-12 pb-6 flex items-center justify-between">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform">
             <ArrowLeft size={20} />
          </button>
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-1 rounded-full flex items-center gap-2">
             <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" />
             <span className="text-xs font-mono text-[#00F0FF] font-bold uppercase tracking-widest">AR Live View</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform">
             <Layers size={20} />
          </button>
       </div>

       {/* 3D Space Container */}
       <div className="absolute inset-0 z-10 perspective-3d flex items-center justify-center pointer-events-none">
          {init && assets.map((asset, i) => (
             <div 
               key={asset.id}
               onClick={() => setSelectedAsset(asset.id)}
               className="absolute pointer-events-auto cursor-pointer group"
               style={{
                  transform: `translate3d(${asset.x}vw, ${asset.y}vh, ${asset.z}px)`,
                  transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
               }}
             >
                {/* Connecting Line */}
                <div className="absolute bottom-0 left-1/2 w-px h-[200px] bg-gradient-to-t from-transparent to-[#00F0FF]/50 origin-bottom transform rotate-12 opacity-50" />

                {/* Floating Card */}
                <div className={`
                   relative w-48 p-4 rounded-2xl border border-white/10 backdrop-blur-xl
                   bg-gradient-to-br ${asset.color}
                   animate-float shadow-[0_0_30px_rgba(0,240,255,0.2)]
                   group-hover:scale-110 transition-transform duration-300
                `}>
                   <div className="flex justify-between items-start mb-2">
                      <Box className="text-white" size={20} />
                      <span className="bg-black/30 px-2 py-0.5 rounded text-[10px] text-white font-bold">{asset.growth}</span>
                   </div>
                   <h3 className="text-white font-bold text-lg drop-shadow-md">{asset.value}</h3>
                   <p className="text-white/80 text-xs">{asset.name}</p>
                   
                   {/* Hover Glow */}
                   <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </div>

                {/* Floor Anchor */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#00F0FF]/20 rounded-full blur-xl transform rotate-x-90" />
             </div>
          ))}
       </div>

       {/* Center Reticle */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <ScanLine size={300} className="text-[#00F0FF]/20 stroke-1" />
       </div>

       {/* Bottom Controls */}
       <div className="mt-auto relative z-50 p-6">
          {selectedAsset ? (
             <div className="bg-[#111]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 animate-in slide-in-from-bottom duration-300">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <h2 className="text-2xl font-bold text-white">Bitcoin Reserve</h2>
                      <p className="text-[#9CA3AF]">Carteira Fria • Vault Suíça</p>
                   </div>
                   <button onClick={() => setSelectedAsset(null)} className="p-2 bg-white/10 rounded-full"><X className="text-white" size={20} /></button>
                </div>
                <div className="flex gap-4 mb-4">
                   <div className="flex-1 bg-black/40 rounded-xl p-3">
                      <p className="text-xs text-[#9CA3AF]">Rendimento</p>
                      <p className="text-[#10B981] font-bold">+R$ 145.000 (YTD)</p>
                   </div>
                   <div className="flex-1 bg-black/40 rounded-xl p-3">
                      <p className="text-xs text-[#9CA3AF]">Segurança</p>
                      <p className="text-[#00F0FF] font-bold">Multisig 3/5</p>
                   </div>
                </div>
                <GlassButton fullWidth>Gerenciar Ativo</GlassButton>
             </div>
          ) : (
             <div className="flex justify-center pb-6">
                <p className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white/70 flex items-center gap-2 border border-white/10">
                   <Info size={14} /> Toque nos ativos flutuantes para detalhes
                </p>
             </div>
          )}
       </div>

    </div>
  );
};
