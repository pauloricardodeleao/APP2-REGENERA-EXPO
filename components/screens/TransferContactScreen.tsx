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

// [FILE] components/screens/TransferContactScreen.tsx
import React from 'react';
import { ArrowLeft, Search, Plus, Landmark } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';

export const TransferContactScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const contacts = [
    { name: 'Raphaela Cervesky', bank: 'Regenera', avatar: 'RC' },
    { name: 'João Silva', bank: 'Banco do Brasil', avatar: 'JS' },
    { name: 'Maria Oliveira', bank: 'Nubank', avatar: 'MO' },
    { name: 'Carlos Tech', bank: 'Inter', avatar: 'CT' },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col">
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Transferir</h1>
      </div>

      <div className="px-6 mb-6">
        <div className="glass rounded-2xl p-3 flex items-center gap-3 mb-6">
           <Search size={20} className="text-[#9CA3AF]" />
           <input placeholder="Nome, CPF ou Chave Pix" className="flex-1 bg-transparent text-white outline-none placeholder-[#9CA3AF]/50" />
        </div>

        <button 
           onClick={() => onNavigate('manual-transfer')} 
           className="w-full py-4 rounded-2xl border border-[#3A66FF]/30 text-[#3A66FF] font-bold flex items-center justify-center gap-2 hover:bg-[#3A66FF]/10 transition-all mb-8 group"
        >
           <div className="w-8 h-8 rounded-full bg-[#3A66FF]/20 flex items-center justify-center group-hover:bg-[#3A66FF] group-hover:text-white transition-colors">
             <Landmark size={16} />
           </div>
           Nova Transferência (TED/DOC)
        </button>

        <h3 className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-4">Recentes</h3>
        <div className="space-y-2">
           {contacts.map((c, i) => (
              <GlassCard key={i} onClick={() => onNavigate('pix-transfer')} hoverEffect className="flex items-center gap-4 cursor-pointer">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3A66FF] to-[#06B6D4] flex items-center justify-center text-white font-bold shadow-lg shadow-[#3A66FF]/20">
                    {c.avatar}
                 </div>
                 <div className="flex-1">
                    <p className="text-white font-bold">{c.name}</p>
                    <p className="text-[#9CA3AF] text-xs">{c.bank}</p>
                 </div>
              </GlassCard>
           ))}
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