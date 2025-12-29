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

// [FILE] components/screens/NewCardOfferScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Check, Star, Zap, Globe, ShieldCheck } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';

export const NewCardOfferScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleOrder = () => {
    setLoading(true);
    setTimeout(() => {
       setLoading(false);
       setStep(3); // Success
    }, 2000);
  };

  if (step === 3) {
     return (
        <div className="relative min-h-screen bg-[#0A0E17] flex flex-col items-center justify-center p-6 animate-in zoom-in">
           <div className="w-64 h-40 bg-gradient-to-br from-[#1a1f3d] to-black rounded-xl border border-white/20 shadow-2xl shadow-[#3A66FF]/30 mb-8 relative overflow-hidden transform rotate-3">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <div className="absolute top-4 right-4"><Star className="text-[#ffd700]" fill="#ffd700" size={24} /></div>
              <p className="absolute bottom-4 left-4 text-white font-mono tracking-widest">DON PAULO</p>
           </div>
           
           <h2 className="text-3xl font-bold text-white mb-2 text-center">Pedido Confirmado!</h2>
           <p className="text-[#9CA3AF] text-center max-w-xs mb-8">
             Seu Regenera Black está sendo preparado. O prazo de entrega é de 5 dias úteis.
           </p>
           <GlassButton fullWidth onClick={() => onNavigate('dashboard')}>Voltar ao Início</GlassButton>
        </div>
     );
  }

  if (step === 2) {
     // Config step
     return (
        <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-6">
           <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
              <button onClick={() => setStep(1)} className="text-white hover:bg-white/10 p-2 rounded-full transition-all"><ArrowLeft size={24} /></button>
              <h1 className="text-xl font-bold text-white">Configurar Cartão</h1>
           </div>
           
           <div className="flex-1 px-6 space-y-6">
              <GlassCard>
                 <label className="text-xs text-[#9CA3AF] uppercase font-bold">Limite Inicial Sugerido</label>
                 <p className="text-3xl font-bold text-white mt-2">R$ 15.000,00</p>
                 <input type="range" className="w-full mt-4 accent-[#3A66FF]" />
              </GlassCard>

              <GlassCard>
                 <label className="text-xs text-[#9CA3AF] uppercase font-bold">Endereço de Entrega</label>
                 <p className="text-white font-medium mt-2">Av. Paulista, 1000 - Bela Vista</p>
                 <p className="text-[#9CA3AF] text-sm">São Paulo - SP</p>
                 <button className="text-[#3A66FF] text-sm font-bold mt-2">Alterar</button>
              </GlassCard>

              <GlassCard>
                 <label className="text-xs text-[#9CA3AF] uppercase font-bold">Nome no Cartão</label>
                 <input defaultValue="DON PAULO R LEAO" className="w-full bg-transparent text-white text-lg mt-1 outline-none uppercase border-b border-white/10 pb-2" />
              </GlassCard>
           </div>
           
           <div className="px-6 mt-auto">
              <GlassButton fullWidth onClick={handleOrder} isLoading={loading}>Finalizar Pedido</GlassButton>
           </div>
        </div>
     );
  }

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col">
      {/* Hero */}
      <div className="relative h-[60vh] bg-gradient-to-b from-[#09158B] to-[#0A0E17] flex items-center justify-center overflow-hidden">
         <button onClick={onBack} className="absolute top-12 left-6 text-white z-20 bg-black/20 p-2 rounded-full backdrop-blur"><ArrowLeft /></button>
         
         <div className="absolute top-0 inset-x-0 h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
         
         <div className="relative z-10 transform transition-transform hover:scale-105 duration-700 perspective-1000">
             <div className="w-72 h-44 bg-black rounded-2xl border border-white/20 shadow-[0_20px_50px_-12px_rgba(58,102,255,0.5)] relative overflow-hidden flex flex-col justify-between p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="flex justify-between items-start">
                   <Star className="text-[#ffd700]" fill="#ffd700" />
                   <span className="text-white/50 font-mono text-xs">BLACK INFINITE</span>
                </div>
                <div>
                   <p className="text-white/80 font-mono text-lg tracking-widest">•••• •••• •••• 9999</p>
                   <div className="flex justify-between mt-4">
                      <p className="text-white/60 text-xs">DON PAULO</p>
                      <div className="w-8 h-5 bg-white/20 rounded-sm" />
                   </div>
                </div>
             </div>
         </div>
      </div>

      <div className="flex-1 px-8 -mt-20 relative z-20">
         <h1 className="text-3xl font-bold text-white mb-2">Regenera Black</h1>
         <p className="text-[#9CA3AF] mb-8">Exclusividade e poder em suas mãos. Sem anuidade nos 3 primeiros meses.</p>

         <div className="space-y-4 mb-8">
            {[
               { icon: Zap, text: "2.5 pontos por dólar" },
               { icon: Globe, text: "Sala VIP ilimitada em aeroportos" },
               { icon: ShieldCheck, text: "Seguro viagem internacional" }
            ].map((item, i) => (
               <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#3A66FF]/10 flex items-center justify-center text-[#3A66FF]">
                     <item.icon size={20} />
                  </div>
                  <span className="text-white font-medium">{item.text}</span>
               </div>
            ))}
         </div>

         <GlassButton fullWidth onClick={() => setStep(2)}>
            Solicitar Agora
         </GlassButton>
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