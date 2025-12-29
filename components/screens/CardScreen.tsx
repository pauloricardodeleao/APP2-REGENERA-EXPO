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

// [FILE] components/screens/CardScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Lock, Eye, Settings, CreditCard, ShoppingBag, Unlock, Plus, AlertCircle, EyeOff, CheckCircle, Star, X, Gift, Plane, Wine } from 'lucide-react';
import { ScreenName, ScreenProps } from '../../types';
import { formatCurrency } from '../../services/formatters';
import { GlassCard } from '../ui/GlassCard';
import { BottomNav } from '../Layout/BottomNav';
import { GlassButton } from '../ui/GlassButton';

type TabOption = 'invoice' | 'config';

export const CardScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabOption>('invoice');
  const [isLocked, setIsLocked] = useState(false);
  const [showCardPassword, setShowCardPassword] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);

  const cardPurchases = [
    { name: 'Netflix', date: '30 Out', value: 5590 },
    { name: 'Spotify', date: '28 Out', value: 2190 },
    { name: 'iFood', date: '27 Out', value: 8950 },
  ];

  const handlePayInvoice = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setInvoicePaid(true);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-24 animate-in slide-in-from-right duration-300">
      
      {/* BENEFITS MODAL */}
      {showBenefits && (
         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center animate-in fade-in">
            <div className="w-full max-w-md bg-[#111827] sm:rounded-3xl rounded-t-3xl border-t border-white/10 p-6 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
               <div className="flex justify-between items-start mb-6">
                  <div>
                     <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Star className="text-[#F59E0B]" fill="#F59E0B" /> Benefícios Black
                     </h3>
                     <p className="text-[#9CA3AF] text-xs">Exclusivo para clientes Infinite</p>
                  </div>
                  <button onClick={() => setShowBenefits(false)} className="p-2 bg-white/5 rounded-full"><X size={20} className="text-white"/></button>
               </div>

               <div className="space-y-4">
                  <GlassCard className="flex items-start gap-4 border-[#F59E0B]/20 bg-[#F59E0B]/5">
                     <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] flex-shrink-0">
                        <Plane size={20} />
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-sm">Sala VIP LoungeKey</h4>
                        <p className="text-[#9CA3AF] text-xs mt-1">Acesso ilimitado e gratuito para titular e 2 acompanhantes em mais de 1000 aeroportos.</p>
                     </div>
                  </GlassCard>

                  <GlassCard className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white flex-shrink-0">
                        <Gift size={20} />
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-sm">Regenera Rewards</h4>
                        <p className="text-[#9CA3AF] text-xs mt-1">2.5 pontos por Dólar gasto. Seus pontos nunca expiram.</p>
                     </div>
                  </GlassCard>

                  <GlassCard className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white flex-shrink-0">
                        <Wine size={20} />
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-sm">Isenção de Rolha</h4>
                        <p className="text-[#9CA3AF] text-xs mt-1">Em mais de 200 restaurantes parceiros selecionados.</p>
                     </div>
                  </GlassCard>
               </div>

               <GlassButton fullWidth onClick={() => setShowBenefits(false)} className="mt-8">Entendi</GlassButton>
            </div>
         </div>
      )}

      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">Meus Cartões</h1>
        </div>
        <button onClick={() => onNavigate('add-card')} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-[#3A66FF] transition-colors">
           <Plus size={24} />
        </button>
      </div>

      {/* Card Visual */}
      <div className="px-6 mt-4 perspective-1000">
        <div className={`relative w-full aspect-[1.586/1] rounded-3xl transition-all duration-500
                        p-6 flex flex-col justify-between overflow-hidden transform hover:scale-[1.02]
                        ${isLocked ? 'grayscale bg-gray-900 border border-white/10' : 'bg-gradient-to-br from-[#1a1f4d] via-[#2d1b69] to-[#0d1025] shadow-2xl shadow-[#3A66FF]/20'}
                        `}>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#3A66FF]/30 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#06B6D4]/30 to-transparent rounded-full blur-2xl opacity-60" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-600 rounded-md shadow-inner border border-white/20" />
            <span className="text-white/90 font-bold text-xl italic tracking-wider font-mono">VISA</span>
          </div>
          
          <div className="relative z-10 my-4">
            <div className="flex items-center gap-4">
              <span className="text-white text-xl font-mono tracking-[0.15em] drop-shadow-md">
                {isLocked ? '•••• •••• •••• ••••' : '•••• •••• •••• 4521'}
              </span>
            </div>
          </div>
          
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <p className="text-white/60 text-[10px] uppercase tracking-wider mb-0.5">Titular</p>
              <p className="text-white font-medium text-sm tracking-wide">DON PAULO R LEÃO</p>
            </div>
            <div className="text-right">
              {isLocked && <Lock size={20} className="text-white mb-2 ml-auto" />}
              <p className="text-white/60 text-[10px] uppercase tracking-wider mb-0.5">Validade</p>
              <p className="text-white font-medium text-sm">12/28</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="px-6 mt-8 flex gap-3">
        <button onClick={() => setIsLocked(!isLocked)} className={`flex-1 glass rounded-2xl py-4 flex flex-col items-center gap-2 hover:bg-white/10 active:scale-95 transition-all ${isLocked ? 'bg-red-500/10 border-red-500/30' : ''}`}>
          {isLocked ? <Unlock size={22} className="text-red-400" /> : <Lock size={22} className="text-[#06B6D4]" />}
          <span className={`text-xs font-medium ${isLocked ? 'text-red-400' : 'text-white'}`}>{isLocked ? 'Desbloquear' : 'Bloquear'}</span>
        </button>
        <button onClick={() => setShowCardPassword(!showCardPassword)} className="flex-1 glass rounded-2xl py-4 flex flex-col items-center gap-2 hover:bg-white/10 active:scale-95 transition-all">
          {showCardPassword ? <EyeOff size={22} className="text-white" /> : <Eye size={22} className="text-[#06B6D4]" />}
          <span className="text-white text-xs font-medium">{showCardPassword ? '1234' : 'Senha'}</span>
        </button>
        <button onClick={() => onNavigate('card-settings')} className="flex-1 glass rounded-2xl py-4 flex flex-col items-center gap-2 hover:bg-white/10 active:scale-95 transition-all">
          <Settings size={22} className="text-[#06B6D4]" />
          <span className="text-white text-xs font-medium">Ajustar</span>
        </button>
        <button onClick={() => onNavigate('card-new')} className="flex-1 glass rounded-2xl py-4 flex flex-col items-center gap-2 hover:bg-white/10 active:scale-95 transition-all">
          <CreditCard size={22} className="text-[#06B6D4]" />
          <span className="text-white text-xs font-medium">Virtual</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-8">
        <div className="flex p-1 bg-white/5 rounded-2xl">
          {['invoice', 'config'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabOption)}
              className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all duration-300
                         ${activeTab === tab 
                           ? 'bg-[#3A66FF] text-white shadow-lg' 
                           : 'text-[#9CA3AF] hover:text-white'}`}
            >
              {tab === 'invoice' ? 'Fatura Atual' : 'Configurações'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'invoice' && (
        <div className="px-6 mt-6 flex-1 space-y-6">
          <GlassCard className="relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#3A66FF]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <p className="text-[#9CA3AF] text-sm">Fatura atual</p>
            <p className={`text-3xl font-bold mt-1 transition-colors ${invoicePaid ? 'text-[#10B981]' : 'text-white'}`}>
              {invoicePaid ? formatCurrency(0) : formatCurrency(245080)}
            </p>
            
            {!invoicePaid ? (
               <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                  <p className="text-orange-400 text-xs font-medium">Vence em 10/Nov</p>
               </div>
            ) : (
               <div className="flex items-center gap-2 mt-2">
                  <CheckCircle size={14} className="text-[#10B981]" />
                  <p className="text-[#10B981] text-xs font-medium">Fatura Paga</p>
               </div>
            )}
            
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
               <div 
                  className="bg-gradient-to-r from-[#3A66FF] to-[#06B6D4] h-full transition-all duration-1000" 
                  style={{ width: invoicePaid ? '0%' : '75%' }} 
               />
            </div>
            <p className="text-right text-[#9CA3AF] text-xs mt-1">Limite: {formatCurrency(350000)}</p>

            <GlassButton 
               fullWidth 
               className="mt-6" 
               onClick={handlePayInvoice} 
               disabled={invoicePaid} 
               isLoading={isPaying}
               variant={invoicePaid ? "secondary" : "primary"}
            >
               {invoicePaid ? "Fatura Paga" : "Pagar Fatura"}
            </GlassButton>
          </GlassCard>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider text-opacity-80">Histórico Recente</h4>
            <div className="space-y-2">
              {cardPurchases.map((p, i) => (
                <GlassCard key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                       <ShoppingBag size={18} className="text-white/70" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{p.name}</p>
                      <p className="text-[#9CA3AF] text-xs">{p.date}</p>
                    </div>
                  </div>
                  <p className="text-white font-semibold text-sm">{formatCurrency(p.value)}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
         <div className="px-6 mt-6 flex-1 space-y-4 animate-in fade-in">
            <GlassCard className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5" onClick={() => onNavigate('card-settings')}>
               <span className="text-white font-medium">Ajustes Avançados</span>
               <div className="w-8 h-8 rounded-full bg-[#3A66FF]/20 flex items-center justify-center text-[#3A66FF]"><Settings size={18} /></div>
            </GlassCard>

            <GlassCard className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 group" onClick={() => setShowBenefits(true)}>
               <div className="flex flex-col">
                  <span className="text-white font-medium group-hover:text-[#F59E0B] transition-colors">Gerenciar Benefícios</span>
                  <span className="text-xs text-[#9CA3AF]">Regenera Black Infinite</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform">
                  <Star size={18} fill="currentColor" />
               </div>
            </GlassCard>

            <div onClick={() => onNavigate('card-settings')}>
               <GlassCard className="flex items-center justify-between p-4 opacity-75 hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium">Compras Online</span>
                  <div className="w-10 h-6 bg-[#3A66FF] rounded-full p-1"><div className="w-4 h-4 bg-white rounded-full translate-x-4" /></div>
               </GlassCard>
            </div>
            
            <div onClick={() => onNavigate('card-settings')}>
               <GlassCard className="flex items-center justify-between p-4 opacity-75 hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium">Pagamento por Aproximação</span>
                  <div className="w-10 h-6 bg-[#3A66FF] rounded-full p-1"><div className="w-4 h-4 bg-white rounded-full translate-x-4" /></div>
               </GlassCard>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-start gap-3">
               <AlertCircle size={20} className="text-orange-400 mt-0.5" />
               <p className="text-xs text-orange-200">Acesse Ajustes Avançados para configurar o Aviso Viagem e evitar bloqueios no exterior.</p>
            </div>
         </div>
      )}

      <BottomNav activeScreen="cards" onNavigate={onNavigate} />
    </div>
  );
};