// [FILE] components/screens/DashboardScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  Eye, EyeOff, Plus, ArrowUpRight, ScanBarcode, ChevronRight, 
  ShoppingBag, DollarSign, Settings, Leaf, Sparkles, Gamepad2, 
  Store, Bone, Smartphone, ArrowRightLeft, CreditCard, Cuboid, 
  Globe, Activity, Bell, Aperture, TrendingUp, ShieldCheck
} from 'lucide-react';
import { ScreenName, Transaction } from '../../types';
import { MOCK_USER } from '../../constants';
import { formatCurrency } from '../../services/formatters';
import { GlassCard } from '../ui/GlassCard';

interface DashboardProps {
  onNavigate: (screen: ScreenName) => void;
}

export const DashboardScreen: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); 
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 20) {
        if (!scrolled) setScrolled(true);
    } else {
        if (scrolled) setScrolled(false);
    }
  };

  const toggleEye = () => setShowBalance(!showBalance);

  const bentoItems = [
    { 
      col: 'col-span-2', 
      title: 'Regenera Lens', 
      subtitle: 'Wealth AR Vision', 
      icon: Cuboid, 
      color: 'bg-gradient-to-br from-[#3A66FF] to-[#06B6D4]',
      action: () => onNavigate('ar-view'),
      special: true
    },
    { 
      col: 'col-span-1', 
      title: 'Área Pix', 
      subtitle: 'Instantâneo', 
      icon: ScanBarcode, 
      color: 'bg-white/5',
      action: () => onNavigate('pix')
    },
    { 
      col: 'col-span-1', 
      title: 'Cartões', 
      subtitle: 'Gestão', 
      icon: CreditCard, 
      color: 'bg-white/5',
      action: () => onNavigate('cards')
    }
  ];

  const ecosystemItems = [
    { title: 'Carbono', route: 'carbon', subtitle: '128kg CO2', icon: Leaf, color: 'text-[#10B981]' },
    { title: 'Market', route: 'marketplace', subtitle: 'Cashback', icon: Store, color: 'text-[#F59E0B]' },
    { title: 'Kids', route: 'kids', subtitle: 'Investimento', icon: Gamepad2, color: 'text-[#8B5CF6]' },
    { title: 'Pets', route: 'pets', subtitle: 'Reserva', icon: Bone, color: 'text-[#EC4899]' }
  ];

  return (
    <div className="relative h-full flex flex-col bg-black">
      <div className={`absolute top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? 'bg-[#0A0E17]/90 backdrop-blur-md border-b border-white/5 pt-12 pb-2' : 'pt-12 pb-4 bg-transparent'}`}>
         <div className="px-6 flex justify-between items-center">
            <div className="flex items-center gap-3" onClick={() => onNavigate('profile-edit')}>
                <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-[#00F0FF] rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="w-10 h-10 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-white font-bold text-sm relative z-10 overflow-hidden">
                        {MOCK_USER.avatarUrl ? (
                            <img src={MOCK_USER.avatarUrl} alt="User" className="w-full h-full object-cover" />
                        ) : (
                            <span>{MOCK_USER.name.charAt(0)}</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-white/60 text-xs font-medium">{greeting},</span>
                    <span className="text-white font-bold text-sm">{MOCK_USER.name.split(' ')[0]}</span>
                </div>
            </div>

            <div className="flex gap-3">
                 <button onClick={() => onNavigate('notifications')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all relative">
                    <Bell size={18} className="text-white" />
                    <span className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-[#FF3B30] rounded-full ring-2 ring-black" />
                 </button>
            </div>
         </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto no-scrollbar pb-32 relative z-10 animate-in fade-in duration-700 pt-24"
        onScroll={handleScroll}
      >
        <div className="px-6 mb-6 relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3A66FF]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#3A66FF]/15 transition-colors duration-1000" />
            <div className="flex flex-col gap-1 relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[#9CA3AF] text-xs font-medium uppercase tracking-[0.2em]">Patrimônio Global</span>
                    <button onClick={toggleEye} className="text-[#9CA3AF] hover:text-white transition-colors p-1">
                        {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                </div>
                {isLoading ? (
                   <div className="space-y-2">
                      <div className="h-10 w-48 bg-white/10 rounded-lg animate-pulse" />
                      <div className="h-4 w-24 bg-white/5 rounded-lg animate-pulse" />
                   </div>
                ) : (
                   <>
                       <div className="flex items-baseline gap-1">
                           <span className="text-2xl text-[#9CA3AF] font-light">R$</span>
                           <h1 className="text-5xl font-bold text-white tracking-tighter text-gradient-cyber drop-shadow-[0_0_30px_rgba(58,102,255,0.3)]">
                               {showBalance ? "1.250.000" : "•••••••"}
                           </h1>
                           <span className="text-2xl text-[#9CA3AF] font-light">,00</span>
                       </div>
                       <div className="flex items-center gap-3 mt-3">
                           <div className="flex items-center gap-1 bg-[#10B981]/10 px-2 py-1 rounded-md border border-[#10B981]/20">
                               <TrendingUp size={12} className="text-[#10B981]" />
                               <span className="text-[#10B981] text-xs font-bold">+12.5%</span>
                           </div>
                           <span className="text-white/40 text-xs">Rendimentos do mês</span>
                       </div>
                   </>
                )}
            </div>
        </div>

        <div className="px-6 mb-8">
            <GlassCard 
                className="flex items-center gap-4 !bg-[#1A1F3D]/50 !border-[#3A66FF]/30 hover:border-[#3A66FF]/60 cursor-pointer active:scale-[0.99] transition-all" 
                onClick={() => onNavigate('chat')}
            >
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3A66FF] to-[#00F0FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#111] rounded-full flex items-center justify-center border border-[#3A66FF]">
                        <span className="text-[8px] font-bold text-[#3A66FF]">AI</span>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-xs text-[#00F0FF] font-bold uppercase tracking-wider mb-0.5">Rapha Insight</p>
                    <p className="text-white text-sm font-medium leading-tight">Você pode economizar R$ 450,00 se otimizar seus gastos com Uber.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <ChevronRight size={16} className="text-white/50" />
                </div>
            </GlassCard>
        </div>

        <div className="px-6 grid grid-cols-2 gap-3 mb-8">
            {bentoItems.map((item, i) => (
                <GlassCard 
                    key={i} 
                    className={`${item.col} relative overflow-hidden group border-white/5 !p-0`}
                    onClick={item.action}
                    hoverEffect
                    variant={item.special ? 'holographic' : 'default'}
                >
                    <div className={`absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30 ${item.color}`} />
                    <div className="relative z-10 p-5 flex flex-col h-full justify-between min-h-[120px]">
                        <div className="flex justify-between items-start">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md ${item.special ? 'bg-black/20 text-white' : 'bg-white/5 text-white'}`}>
                                <item.icon size={20} />
                             </div>
                             {item.special && (
                                <span className="bg-[#00F0FF] text-black text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                                    V3.0
                                </span>
                             )}
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg leading-none mb-1">{item.title}</h3>
                            <p className="text-white/60 text-xs">{item.subtitle}</p>
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>

        <div className="mb-10">
            <div className="px-6 flex justify-between items-end mb-4">
                <h3 className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                    <Globe size={14} className="text-[#3A66FF]" /> Ecossistema
                </h3>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4">
                {ecosystemItems.map((eco, i) => (
                    <button 
                        key={i} 
                        onClick={() => onNavigate(eco.route as ScreenName)}
                        className="min-w-[100px] flex flex-col items-center gap-3 group"
                    >
                        <div className="w-16 h-16 rounded-[20px] bg-[#111] border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all shadow-lg relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                            <eco.icon size={24} className={eco.color} />
                        </div>
                        <div className="text-center">
                            <p className="text-white font-bold text-xs">{eco.title}</p>
                            <p className="text-white/40 text-[10px]">{eco.subtitle}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>

        <div className="px-6 pb-6 text-center opacity-40">
            <div className="flex justify-center items-center gap-2 mb-1">
                <ShieldCheck size={10} />
                <span className="text-[10px] uppercase tracking-widest">Regenera Secure Core</span>
            </div>
        </div>
      </div>

      <div className="absolute bottom-24 right-6 z-50">
        <button 
            onClick={() => onNavigate('ar-view')}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-[#3A66FF] to-[#06B6D4] flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)] animate-pulse border border-white/20 active:scale-95 transition-transform"
        >
            <div className="absolute inset-0 rounded-full border border-white/30 animate-[ping_2s_linear_infinite]" />
            <Aperture size={24} className="text-white animate-[spin_10s_linear_infinite]" />
        </button>
      </div>
    </div>
  );
};