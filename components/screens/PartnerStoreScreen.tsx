/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Marketplace Partner Integration
   
  Developer: Don Paulo Ricardo
  CEO: Raphaela Cervesky
   
  ORCID: https://orcid.org/0009-0002-1934-3559
  Copyright © 2025 Regenera Ecosystem. All rights reserved.
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] components/screens/PartnerStoreScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Info, CheckCircle, Percent, ShieldCheck, ShoppingBag, Truck, Clock } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';

interface PartnerData {
  id: string;
  name: string;
  logo: string; // URL or placeholder
  color: string;
  gradient: string;
  cashback: string;
  rules: string[];
  description: string;
}

const PARTNERS: Record<string, PartnerData> = {
  amazon: {
    id: 'amazon',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
    color: '#FF9900',
    gradient: 'from-[#FF9900] to-[#232F3E]',
    cashback: '5%',
    description: 'A maior loja online do mundo com entrega rápida e os melhores preços.',
    rules: [
      'Cashback não acumulativo com outras promoções.',
      'Válido para todas as categorias exceto Gift Cards.',
      'O valor será creditado em até 60 dias.',
      'Use o mesmo CPF cadastrado no Regenera.'
    ]
  },
  magalu: {
    id: 'magalu',
    name: 'Magalu',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Magalu_Logo.png',
    color: '#0086FF',
    gradient: 'from-[#0086FF] to-[#004D99]',
    cashback: '3%',
    description: 'Tudo o que você precisa com a entrega mais rápida do Brasil.',
    rules: [
      'Válido apenas para produtos vendidos e entregues por Magalu.',
      'Não se aplica a frete e serviços.',
      'Crédito em conta em até 45 dias.'
    ]
  },
  nike: {
    id: 'nike',
    name: 'Nike',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    color: '#FFFFFF',
    gradient: 'from-[#000000] to-[#333333]',
    cashback: '8%',
    description: 'Inovação e inspiração para todos os atletas do mundo.',
    rules: [
      'Cashback especial para lançamentos SNKRS.',
      'Acumulativo com cupons de primeira compra.',
      'Validação em até 30 dias.'
    ]
  }
};

interface PartnerStoreScreenProps extends ScreenProps {
  partnerId: 'amazon' | 'magalu' | 'nike';
}

export const PartnerStoreScreen: React.FC<PartnerStoreScreenProps> = ({ onNavigate, onBack, partnerId }) => {
  const [activating, setActivating] = useState(false);
  const partner = PARTNERS[partnerId];

  const handleActivation = () => {
    setActivating(true);
    // Simulation of tracking link generation and redirection
    setTimeout(() => {
      setActivating(false);
      alert(`Redirecionando para ${partner.name} com rastreamento ativo!\n\nSeu cashback será rastreado.`);
      // In a real app: window.open(trackingLink, '_blank');
    }, 2000);
  };

  if (!partner) return null;

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-6">
      {/* Dynamic Background */}
      <div className={`absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b ${partner.gradient} opacity-20 pointer-events-none rounded-b-[4rem]`} />
      
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 z-40">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white hidden">Parceiros</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex-1 px-6 flex flex-col relative z-10 animate-in slide-in-from-bottom duration-500">
        
        {/* Brand Hero */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center p-4 shadow-2xl shadow-black/50 mb-6">
            <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{partner.name}</h1>
          <p className="text-[#9CA3AF] text-center max-w-xs text-sm">{partner.description}</p>
        </div>

        {/* Offer Card */}
        <div className="relative mb-6">
           <div className="absolute inset-0 bg-gradient-to-r from-[#3A66FF] to-[#06B6D4] blur-xl opacity-20 rounded-3xl" />
           <GlassCard className="border-[#3A66FF]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 bg-[#10B981]/10 rounded-bl-2xl border-b border-l border-[#10B981]/20">
                 <span className="text-[#10B981] text-xs font-bold flex items-center gap-1">
                    <ShieldCheck size={12} /> Ativado
                 </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                 <div className="w-14 h-14 rounded-full bg-[#3A66FF]/10 flex items-center justify-center text-[#3A66FF]">
                    <Percent size={28} />
                 </div>
                 <div>
                    <p className="text-[#9CA3AF] text-xs uppercase font-bold">Seu Cashback</p>
                    <p className="text-4xl font-bold text-white">{partner.cashback}</p>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
                 <div className="text-center">
                    <div className="w-8 h-8 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-1 text-[#9CA3AF]"><ShoppingBag size={14}/></div>
                    <p className="text-[10px] text-[#9CA3AF]">Loja Oficial</p>
                 </div>
                 <div className="text-center">
                    <div className="w-8 h-8 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-1 text-[#9CA3AF]"><Truck size={14}/></div>
                    <p className="text-[10px] text-[#9CA3AF]">Entrega Rápida</p>
                 </div>
                 <div className="text-center">
                    <div className="w-8 h-8 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-1 text-[#9CA3AF]"><Clock size={14}/></div>
                    <p className="text-[10px] text-[#9CA3AF]">30-60 dias</p>
                 </div>
              </div>
           </GlassCard>
        </div>

        {/* Rules */}
        <div className="mb-8">
           <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Info size={16} className="text-[#9CA3AF]" /> Regras de Ativação
           </h3>
           <div className="space-y-3">
              {partner.rules.map((rule, i) => (
                 <div key={i} className="flex items-start gap-3 text-sm text-[#9CA3AF]">
                    <CheckCircle size={16} className="text-[#3A66FF] flex-shrink-0 mt-0.5" />
                    <span>{rule}</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Action */}
        <div className="mt-auto">
           <GlassButton 
              fullWidth 
              onClick={handleActivation} 
              isLoading={activating}
              className="bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] border-none"
           >
              {activating ? 'Gerando Link Seguro...' : 'Ativar Cashback e Ir para Loja'} 
              {!activating && <ExternalLink size={18} className="ml-2" />}
           </GlassButton>
           <p className="text-center text-[#9CA3AF] text-[10px] mt-4">
              Você será redirecionado para o site do parceiro em uma nova aba segura.
           </p>
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