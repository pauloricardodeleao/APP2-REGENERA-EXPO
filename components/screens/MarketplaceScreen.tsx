/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Marketplace
   
  Developer: Don Paulo Ricardo
  CEO: Raphaela Cervesky
   
  ORCID: https://orcid.org/0009-0002-1934-3559
  Copyright © 2025 Regenera Ecosystem. All rights reserved.
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] components/screens/MarketplaceScreen.tsx
import React, { useState } from 'react';
import { 
  ArrowLeft, Search, ShoppingBag, Gamepad2, Tv, Gift, Percent, Zap, CheckCircle, 
  Car, Utensils, Music, MonitorPlay, ChevronRight, Star, Tag, Rocket, Bell, Calendar
} from 'lucide-react';
import { ScreenProps, ScreenName } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { BottomNav } from '../Layout/BottomNav';
import { formatCurrency } from '../../services/formatters';

export const MarketplaceScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState('destaques');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [purchaseStep, setPurchaseStep] = useState(0); // 0: None, 1: Loading, 2: Success
  const [notifiedLaunches, setNotifiedLaunches] = useState<string[]>([]);

  const categories = [
    { id: 'destaques', label: 'Destaques', icon: Star },
    { id: 'giftcards', label: 'Gift Cards', icon: Gift },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'streaming', label: 'Streaming', icon: Tv },
  ];

  const giftCards = [
    { id: 'ifood', name: 'iFood', icon: Utensils, color: '#EA1D2C', cashback: 4, value: 5000 },
    { id: 'uber', name: 'Uber', icon: Car, color: '#000000', cashback: 3, value: 5000 },
    { id: 'netflix', name: 'Netflix', icon: MonitorPlay, color: '#E50914', cashback: 2.5, value: 5590 },
    { id: 'spotify', name: 'Spotify', icon: Music, color: '#1DB954', cashback: 5, value: 5000 },
    { id: 'playstation', name: 'PlayStation', icon: Gamepad2, color: '#003791', cashback: 3, value: 10000 },
    { id: 'xbox', name: 'Xbox', icon: Gamepad2, color: '#107C10', cashback: 3, value: 10000 },
  ];

  const partners = [
    { id: 'amazon', name: 'Amazon', offer: 'Até 5% de volta', icon: ShoppingBag, color: 'bg-yellow-500', route: 'partner-amazon' },
    { id: 'magalu', name: 'Magalu', offer: 'Até 3% de volta', icon: Tag, color: 'bg-blue-500', route: 'partner-magalu' },
    { id: 'nike', name: 'Nike', offer: 'Até 8% de volta', icon: CheckCircle, color: 'bg-black', route: 'partner-nike' },
  ];

  const upcomingLaunches = [
    { id: 'ln1', partner: 'Apple', product: 'Vision Pro', date: '15 Mai', color: 'from-gray-700 to-gray-900', icon: MonitorPlay },
    { id: 'ln2', partner: 'Nike', product: 'Air Max Dn', date: '20 Mai', color: 'from-orange-600 to-red-600', icon: ShoppingBag },
    { id: 'ln3', partner: 'Samsung', product: 'Galaxy Ring', date: '01 Jun', color: 'from-blue-600 to-black', icon:  Zap },
  ];

  const handlePurchase = (id: string) => {
    setShowConfirm(id);
  };

  const confirmPurchase = () => {
    setPurchaseStep(1);
    // Simulate API Transaction
    setTimeout(() => {
      setPurchaseStep(2);
    }, 2000);
  };

  const closePurchase = () => {
    setShowConfirm(null);
    setPurchaseStep(0);
  };

  const toggleNotify = (id: string) => {
    setNotifiedLaunches(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedCard = giftCards.find(g => g.id === showConfirm);

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-24 animate-in slide-in-from-right duration-500">
      {/* Purchase Modal Overlay */}
      {showConfirm && selectedCard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
           <GlassCard className="w-full max-w-sm relative bg-[#111827]">
              {purchaseStep === 2 ? (
                 <div className="flex flex-col items-center py-6 text-center animate-in zoom-in">
                    <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-4 ring-4 ring-[#10B981]/10">
                       <CheckCircle size={40} className="text-[#10B981]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Compra Realizada!</h3>
                    <p className="text-[#9CA3AF] mb-6 text-sm leading-relaxed">
                       O código do seu Gift Card foi enviado para seu e-mail e está disponível no menu "Meus Pedidos".
                    </p>
                    <div className="bg-[#10B981]/10 px-4 py-3 rounded-xl mb-6 border border-[#10B981]/20">
                       <p className="text-[#10B981] font-bold text-sm flex items-center gap-2 justify-center">
                          <Percent size={14} /> Cashback de {formatCurrency((selectedCard.value * selectedCard.cashback) / 10000)} creditado
                       </p>
                    </div>
                    <GlassButton fullWidth onClick={closePurchase}>Fechar</GlassButton>
                 </div>
              ) : (
                 <div className="flex flex-col py-2">
                    <h3 className="text-xl font-bold text-white mb-6">Confirmar Compra</h3>
                    
                    <div className="flex items-center gap-4 mb-6 bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div 
                           className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                           style={{ backgroundColor: selectedCard.color }}
                        >
                           <selectedCard.icon size={32} />
                        </div>
                        <div>
                           <p className="text-white font-bold text-lg">{selectedCard.name}</p>
                           <div className="flex items-center gap-1 text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded text-[10px] font-bold w-fit mt-1 border border-[#10B981]/20">
                               <Percent size={10} /> {selectedCard.cashback}% Cashback
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm border-b border-white/5 pb-3">
                           <span className="text-[#9CA3AF]">Valor do Gift Card</span>
                           <span className="text-white font-bold">{formatCurrency(selectedCard.value)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-[#9CA3AF]">Saldo Disponível</span>
                           <span className="text-white">R$ 1.250,00</span>
                        </div>
                     </div>

                     <div className="flex gap-3">
                        <GlassButton fullWidth variant="secondary" onClick={closePurchase} disabled={purchaseStep === 1}>Cancelar</GlassButton>
                        <GlassButton 
                          fullWidth 
                          onClick={confirmPurchase} 
                          isLoading={purchaseStep === 1}
                        >
                           Confirmar
                        </GlassButton>
                     </div>
                  </div>
               )}
            </GlassCard>
         </div>
       )}

      {/* Header */}
      <div className="px-6 pt-12 pb-2 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40 border-b border-white/5">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
           <h1 className="text-xl font-bold text-white">Regenera Store</h1>
           <p className="text-[#10B981] text-xs font-bold flex items-center gap-1 animate-pulse">
              <Zap size={10} fill="currentColor" /> Cashback turbinado hoje
           </p>
        </div>
        <button className="text-white hover:bg-white/10 p-2 rounded-full transition-all relative">
           <ShoppingBag size={24} />
           <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0A0E17]"></span>
        </button>
      </div>

      {/* Search */}
      <div className="px-6 py-4">
         <div className="glass rounded-2xl p-3 flex items-center gap-3 group focus-within:border-[#3A66FF]/50 transition-colors">
            <Search size={20} className="text-[#9CA3AF] group-focus-within:text-[#3A66FF]" />
            <input 
               placeholder="Busque por lojas, games ou serviços..." 
               className="flex-1 bg-transparent text-white outline-none placeholder-[#9CA3AF]/50 text-sm" 
            />
         </div>
      </div>

      {/* Banner */}
      <div className="px-6 mb-6">
         <div className="w-full aspect-[2/1] rounded-3xl bg-gradient-to-r from-[#3A66FF] to-[#06B6D4] relative overflow-hidden flex items-center p-6 shadow-2xl shadow-[#3A66FF]/20 group cursor-pointer transition-transform active:scale-[0.98]">
            <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
               <ShoppingBag size={180} className="text-white" />
            </div>
            <div className="relative z-10 max-w-[75%]">
               <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block backdrop-blur-md border border-white/10">Oferta Especial</span>
               <h2 className="text-2xl font-bold text-white mb-1 leading-tight">Cashback em Dobro</h2>
               <p className="text-white/90 text-xs mb-4">Em toda a categoria de Games até domingo.</p>
               <button className="bg-white text-[#3A66FF] px-4 py-2 rounded-xl text-xs font-bold shadow-lg active:scale-95 transition-all flex items-center gap-2">
                  Aproveitar <ChevronRight size={14} />
               </button>
            </div>
         </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-8">
         <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
               <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`
                     flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap active:scale-95 duration-200
                     ${activeTab === cat.id 
                        ? 'bg-[#3A66FF] border-[#3A66FF] text-white shadow-lg shadow-[#3A66FF]/20' 
                        : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:bg-white/10'}
                  `}
               >
                  <cat.icon size={16} />
                  <span className="text-xs font-bold">{cat.label}</span>
               </button>
            ))}
         </div>
      </div>

      {/* NEW SECTION: UPCOMING LAUNCHES */}
      <div className="px-6 mb-8">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
           <Rocket size={16} className="text-[#F59E0B]" /> Lançamentos
        </h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
           {upcomingLaunches.map(launch => {
             const isNotified = notifiedLaunches.includes(launch.id);
             return (
              <GlassCard 
                key={launch.id} 
                className="min-w-[200px] p-0 overflow-hidden relative group cursor-pointer"
                hoverEffect
              >
                <div className={`h-24 bg-gradient-to-br ${launch.color} relative flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-white/5" />
                    <launch.icon size={40} className="text-white/80" />
                    <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                        <span className="text-[10px] text-white font-bold flex items-center gap-1">
                           <Calendar size={10} /> {launch.date}
                        </span>
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-[#9CA3AF] text-xs font-bold uppercase mb-0.5">{launch.partner}</p>
                    <h4 className="text-white font-bold text-lg leading-tight mb-3">{launch.product}</h4>
                    <button 
                      onClick={() => toggleNotify(launch.id)}
                      className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2
                        ${isNotified 
                          ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' 
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'}
                      `}
                    >
                       {isNotified ? (
                         <><CheckCircle size={14} /> Avisado</>
                       ) : (
                         <><Bell size={14} /> Avise-me</>
                       )}
                    </button>
                </div>
              </GlassCard>
           )})}
        </div>
      </div>

      {/* Gift Cards Grid */}
      <div className="px-6 flex-1">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Top Gift Cards</h3>
            <span className="text-[#3A66FF] text-xs font-bold cursor-pointer hover:underline">Ver todos</span>
         </div>
         
         <div className="grid grid-cols-2 gap-4">
            {giftCards.map((card) => (
               <GlassCard 
                  key={card.id} 
                  className="flex flex-col gap-3 p-4 cursor-pointer hover:bg-white/10 transition-all group relative overflow-hidden active:scale-95"
                  onClick={() => handlePurchase(card.id)}
                  hoverEffect
               >
                  <div className="absolute top-2 right-2 bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#10B981]/20">
                     <Percent size={10} /> {card.cashback}%
                  </div>
                  
                  <div 
                     className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                     style={{ backgroundColor: card.color }}
                  >
                     <card.icon size={24} />
                  </div>
                  
                  <div>
                     <p className="text-white font-bold">{card.name}</p>
                     <p className="text-[#9CA3AF] text-xs mt-0.5">A partir de {formatCurrency(card.value)}</p>
                  </div>
               </GlassCard>
            ))}
         </div>

         {/* Partners Section */}
         <h3 className="text-white font-bold text-sm uppercase tracking-wider mt-8 mb-4">Parceiros</h3>
         <div className="space-y-3 pb-8">
            {partners.map((partner, i) => (
               <GlassCard 
                  key={i} 
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 group active:scale-[0.98]" 
                  onClick={() => onNavigate(partner.route as ScreenName)} 
                  hoverEffect
               >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${partner.color} bg-opacity-80 shadow-lg`}>
                     <partner.icon size={18} />
                  </div>
                  <div className="flex-1">
                     <p className="text-white font-bold">{partner.name}</p>
                     <p className="text-[#10B981] text-xs font-bold">{partner.offer}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-[#3A66FF] group-hover:text-white transition-colors">
                     <ChevronRight size={16} />
                  </div>
               </GlassCard>
            ))}
         </div>
      </div>

      <BottomNav activeScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
};
