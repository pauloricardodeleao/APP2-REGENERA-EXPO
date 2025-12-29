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

// [FILE] components/screens/LanguageScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';

export const LanguageScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [selected, setSelected] = useState('pt-BR');

  const languages = [
    { id: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
    { id: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { id: 'es-ES', label: 'Español', flag: '🇪🇸' },
    { id: 'fr-FR', label: 'Français', flag: '🇫🇷' },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col">
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Idioma</h1>
      </div>

      <div className="p-6 space-y-4">
         {languages.map((lang) => (
            <GlassCard 
               key={lang.id} 
               onClick={() => setSelected(lang.id)}
               className={`flex items-center justify-between p-4 cursor-pointer transition-all ${selected === lang.id ? 'border-[#3A66FF] bg-[#3A66FF]/10' : ''}`}
            >
               <div className="flex items-center gap-4">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className={`font-medium ${selected === lang.id ? 'text-white' : 'text-[#9CA3AF]'}`}>{lang.label}</span>
               </div>
               {selected === lang.id && (
                  <div className="w-6 h-6 rounded-full bg-[#3A66FF] flex items-center justify-center">
                     <Check size={14} className="text-white" />
                  </div>
               )}
            </GlassCard>
         ))}
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