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

// [FILE] components/screens/TransactionDetailScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Share2, Download, CheckCircle, Check } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { formatCurrency } from '../../services/formatters';

export const TransactionDetailScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  const handleShare = () => {
    setSharing(true);
    setTimeout(() => setSharing(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col animate-in zoom-in duration-300">
       <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Detalhes</h1>
      </div>

      <div className="px-6 flex-1 flex flex-col items-center">
         <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-4 ring-4 ring-[#10B981]/10 mt-8">
            <CheckCircle size={32} className="text-[#10B981]" />
         </div>
         <p className="text-[#9CA3AF] text-sm uppercase font-bold tracking-wider">Transferência Enviada</p>
         <h2 className="text-4xl font-bold text-white mt-2 mb-8">{formatCurrency(15000)}</h2>

         <GlassCard className="w-full space-y-4 mb-8">
            <div className="flex justify-between border-b border-white/5 pb-4">
               <span className="text-[#9CA3AF]">Para</span>
               <span className="text-white font-bold">Amazon Serviços</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-4">
               <span className="text-[#9CA3AF]">Data</span>
               <span className="text-white font-medium">12 Mai 2025 - 14:32</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-4">
               <span className="text-[#9CA3AF]">Tipo</span>
               <span className="text-white font-medium">Pix Transferência</span>
            </div>
            <div className="flex justify-between">
               <span className="text-[#9CA3AF]">Autenticação</span>
               <span className="text-white font-mono text-xs">7A8B-9C0D-1E2F-3G4H</span>
            </div>
         </GlassCard>

         <div className="w-full flex gap-4 mt-auto pb-8">
            <button 
               onClick={handleShare}
               className="flex-1 py-4 glass rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95"
            >
               {sharing ? <Check size={20} className="text-[#10B981]" /> : <Share2 size={20} className="text-[#3A66FF]" />} 
               <span className="text-white font-bold">{sharing ? "Enviado" : "Compartilhar"}</span>
            </button>
            <button 
               onClick={handleDownload}
               className="flex-1 py-4 glass rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95"
            >
               {downloading ? (
                  <div className="w-5 h-5 border-2 border-[#3A66FF] border-t-transparent rounded-full animate-spin" />
               ) : (
                  <Download size={20} className="text-[#3A66FF]" />
               )}
               <span className="text-white font-bold">{downloading ? "Baixando..." : "PDF"}</span>
            </button>
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