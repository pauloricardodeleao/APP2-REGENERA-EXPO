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

// [FILE] components/screens/SupportScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Search, Zap, CreditCard, User, Shield, ChevronRight, MessageCircle } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { BottomNav } from '../Layout/BottomNav';

export const SupportScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    { icon: Zap, title: 'Pix & Transferências', questions: ['Como fazer um Pix?', 'Quais os limites diários?', 'Pix está seguro?'] },
    { icon: CreditCard, title: 'Cartões', questions: ['Como solicitar 2ª via?', 'Desbloqueio de cartão', 'Contestar compra'] },
    { icon: User, title: 'Minha Conta', questions: ['Alterar dados cadastrais', 'Informe de Rendimentos', 'Encerrar conta'] },
    { icon: Shield, title: 'Segurança', questions: ['Ativar biometria', 'Dispositivos conectados', 'Trocar senha'] },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-24 animate-in slide-in-from-right duration-300">
      <div className="px-6 pt-12 pb-6 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">Ajuda & Perfil</h1>
        </div>
        
        <div className="glass rounded-2xl p-3 flex items-center gap-3">
          <Search size={20} className="text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Qual sua dúvida hoje?"
            className="flex-1 bg-transparent text-white outline-none placeholder-[#9CA3AF]/50 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 px-6 space-y-4">
        {faqs.map((faq, i) => (
          <GlassCard key={i} className="p-0 overflow-hidden" hoverEffect>
            <button
              onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              className="w-full p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#3A66FF]/10 flex items-center justify-center">
                <faq.icon size={20} className="text-[#3A66FF]" />
              </div>
              <span className="flex-1 text-left text-white font-medium text-sm">{faq.title}</span>
              <ChevronRight 
                size={20} 
                className={`text-[#9CA3AF] transition-transform duration-300 ${expandedFaq === i ? 'rotate-90' : ''}`} 
              />
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className="px-4 pb-4 space-y-1 bg-black/20">
                  {faq.questions.map((q, j) => (
                     <button key={j} className="w-full text-left text-[#9CA3AF] text-sm py-3 pl-14 hover:text-white transition-colors border-t border-white/5 first:border-0">
                        {q}
                     </button>
                  ))}
               </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="px-6 pt-6">
         <button 
           onClick={() => onNavigate('chat')}
           className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3A66FF] to-[#06B6D4] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#3A66FF]/30 active:scale-[0.98] transition-all group"
         >
            <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
            Falar com Rapha AI
         </button>
      </div>

      <BottomNav activeScreen="support" onNavigate={onNavigate} />
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