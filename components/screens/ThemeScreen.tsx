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

// [FILE] components/screens/ThemeScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Check, Moon, Sun, Smartphone } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';

export const ThemeScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [selected, setSelected] = useState('dark');

  const themes = [
    { id: 'dark', label: 'Modo Escuro', icon: Moon },
    { id: 'light', label: 'Modo Claro', icon: Sun },
    { id: 'system', label: 'Padrão do Sistema', icon: Smartphone },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col">
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Aparência</h1>
      </div>

      <div className="p-6 space-y-4">
         {themes.map((theme) => (
            <GlassCard 
               key={theme.id} 
               onClick={() => setSelected(theme.id)}
               className={`flex items-center justify-between p-4 cursor-pointer transition-all ${selected === theme.id ? 'border-[#3A66FF] bg-[#3A66FF]/10' : ''}`}
            >
               <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selected === theme.id ? 'bg-[#3A66FF] text-white' : 'bg-white/5 text-[#9CA3AF]'}`}>
                     <theme.icon size={20} />
                  </div>
                  <span className={`font-medium ${selected === theme.id ? 'text-white' : 'text-[#9CA3AF]'}`}>{theme.label}</span>
               </div>
               {selected === theme.id && (
                  <div className="w-6 h-6 rounded-full bg-[#3A66FF] flex items-center justify-center">
                     <Check size={14} className="text-white" />
                  </div>
               )}
            </GlassCard>
         ))}
         
         <p className="text-[#9CA3AF] text-xs text-center mt-8">
            O modo escuro do Regenera Bank é otimizado para economizar bateria e reduzir o cansaço visual.
         </p>
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