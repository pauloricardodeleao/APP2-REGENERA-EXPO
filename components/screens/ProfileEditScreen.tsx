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

// [FILE] components/screens/ProfileEditScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { ScreenProps } from '../../types';
import { MOCK_USER } from '../../constants';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';

export const ProfileEditScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
     setLoading(true);
     setTimeout(() => {
        setLoading(false);
        onNavigate('settings');
     }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-6">
       <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Editar Perfil</h1>
      </div>

      <div className="flex-1 px-6 flex flex-col items-center">
         <div className="relative mb-8 group cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#3A66FF] to-[#06B6D4] flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-black">
               {MOCK_USER.name.charAt(0)}
            </div>
            <div className="absolute bottom-0 right-0 p-2 bg-white text-black rounded-full shadow-lg group-hover:scale-110 transition-transform">
               <Camera size={20} />
            </div>
         </div>

         <div className="w-full space-y-4">
            <GlassCard>
               <label className="text-xs text-[#9CA3AF] uppercase font-bold flex items-center gap-2"><User size={12}/> Nome de Exibição</label>
               <input defaultValue={MOCK_USER.name} className="w-full bg-transparent text-white text-lg mt-2 outline-none border-b border-white/10 pb-1 focus:border-[#3A66FF] transition-colors" />
            </GlassCard>

            <GlassCard>
               <label className="text-xs text-[#9CA3AF] uppercase font-bold flex items-center gap-2"><Mail size={12}/> E-mail</label>
               <input defaultValue="don.paulo@regenera.com" className="w-full bg-transparent text-white text-lg mt-2 outline-none border-b border-white/10 pb-1 focus:border-[#3A66FF] transition-colors" />
            </GlassCard>

            <GlassCard>
               <label className="text-xs text-[#9CA3AF] uppercase font-bold flex items-center gap-2"><Phone size={12}/> Celular</label>
               <input defaultValue="(11) 99999-8888" className="w-full bg-transparent text-white text-lg mt-2 outline-none border-b border-white/10 pb-1 focus:border-[#3A66FF] transition-colors" />
            </GlassCard>

            <GlassCard>
               <label className="text-xs text-[#9CA3AF] uppercase font-bold flex items-center gap-2"><MapPin size={12}/> Endereço</label>
               <input defaultValue="Av. Paulista, 1000" className="w-full bg-transparent text-white text-lg mt-2 outline-none border-b border-white/10 pb-1 focus:border-[#3A66FF] transition-colors" />
            </GlassCard>
         </div>

         <div className="mt-auto w-full pt-8">
            <GlassButton fullWidth onClick={handleSave} isLoading={loading}>Salvar Alterações</GlassButton>
         </div>
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