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

// [FILE] components/screens/NotificationsScreen.tsx
import React from 'react';
import { ArrowLeft, Bell, Calendar, Percent, ShieldAlert } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';

export const NotificationsScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const notifications = [
    { 
       id: 1, 
       type: 'alert', 
       title: 'Tentativa de Login Bloqueada', 
       desc: 'Identificamos um acesso suspeito em São Paulo. Se não foi você, altere sua senha imediatamente.',
       time: '2 min atrás',
       icon: ShieldAlert,
       color: 'text-red-400',
       bg: 'bg-red-500/20'
    },
    { 
       id: 2, 
       type: 'promo', 
       title: 'Cashback Recebido', 
       desc: 'Você recebeu R$ 12,50 de cashback na sua compra na Amazon.',
       time: '2 horas atrás',
       icon: Percent,
       color: 'text-[#10B981]',
       bg: 'bg-[#10B981]/20'
    },
    { 
       id: 3, 
       type: 'info', 
       title: 'Fatura Fechada', 
       desc: 'Sua fatura de Maio fechou no valor de R$ 2.450,80. O vencimento é dia 10.',
       time: 'Ontem',
       icon: Calendar,
       color: 'text-[#3A66FF]',
       bg: 'bg-[#3A66FF]/20'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Notificações</h1>
      </div>

      <div className="px-6 flex-1 space-y-4">
        {notifications.map((notif) => (
           <GlassCard key={notif.id} className="flex gap-4 p-4 border-l-4 border-l-white/10 hover:border-l-[#06B6D4] transition-all">
              <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${notif.bg} ${notif.color}`}>
                 <notif.icon size={22} />
              </div>
              <div className="flex-1">
                 <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-bold text-sm">{notif.title}</h3>
                    <span className="text-[#9CA3AF] text-[10px] whitespace-nowrap">{notif.time}</span>
                 </div>
                 <p className="text-[#9CA3AF] text-xs leading-relaxed">{notif.desc}</p>
              </div>
           </GlassCard>
        ))}

        <div className="pt-8 flex flex-col items-center">
           <Bell size={32} className="text-white/10 mb-2" />
           <p className="text-white/30 text-xs">Isso é tudo por enquanto.</p>
        </div>
      </div>
    </div>
  );
};