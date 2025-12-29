/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Sustainability & ESG Core
  Status: Gold Master Production
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] components/screens/CarbonScreen.tsx
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, CheckCircle, Car, Wind, Zap, Utensils, 
  Calculator, BarChart3, Globe
} from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { formatCurrency } from '../../services/formatters';

type CarbonTab = 'overview' | 'calculator';

export const CarbonScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState<CarbonTab>('overview');
  const [compensating, setCompensating] = useState(false);
  const [compensated, setCompensated] = useState(false);
  
  const [transportKm, setTransportKm] = useState(200);
  const [energyBill, setEnergyBill] = useState(150);
  const [meatMeals, setMeatMeals] = useState(5);
  const [flights, setFlights] = useState(1);

  const transactionCo2 = 128; 
  
  const calculatedCo2 = useMemo(() => {
    try {
      const transportImpact = transportKm * 4 * 0.12;
      const energyImpact = energyBill * 0.08;
      const foodImpact = meatMeals * 4 * 2;
      const flightImpact = (flights * 200) / 12;
      return Math.round(transportImpact + energyImpact + foodImpact + flightImpact);
    } catch (e) {
      return 0;
    }
  }, [transportKm, energyBill, meatMeals, flights]);

  const totalCo2 = activeTab === 'overview' ? transactionCo2 : calculatedCo2;

  const handleCompensation = () => {
    setCompensating(true);
    setTimeout(() => {
       setCompensating(false);
       setCompensated(true);
    }, 2500);
  };

  const Slider = ({ label, icon: Icon, value, setValue, min, max, unit }: any) => (
    <div className="mb-6 group">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
          <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-[#10B981]/20 group-hover:text-[#10B981] transition-all">
             <Icon size={14} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
        </div>
        <span className="text-[#10B981] font-bold text-sm bg-[#10B981]/10 px-2 py-0.5 rounded-md border border-[#10B981]/20">
           {value} <span className="text-[10px] opacity-70">{unit}</span>
        </span>
      </div>
      <input 
        type="range" min={min} max={max} value={value} 
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
      />
    </div>
  );

  return (
    <div className="relative h-full w-full bg-[#000000] flex flex-col overflow-hidden">
      {/* Background FX - Solid Base to prevent black void */}
      <div className="absolute inset-0 bg-[#0A0E17] z-0" />
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#10B981]/15 to-transparent pointer-events-none z-[1]" />
      <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-[#10B981]/10 rounded-full blur-[120px] pointer-events-none z-[1]" />

      {/* Header */}
      <div className="relative z-50 px-6 pt-12 pb-4 border-b border-white/5 bg-[#0A0E17]/80 backdrop-blur-xl flex items-center gap-4">
        <button onClick={onBack} className="text-white p-2 -ml-2 hover:bg-white/10 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
           <h1 className="text-xl font-bold text-white tracking-tight">Carbon Zero</h1>
           <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
              <span className="text-[9px] text-[#10B981] font-bold tracking-[0.2em] uppercase">Regenera Planet</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 px-6 pb-32 pt-6">
        
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all duration-500 ${
              activeTab === 'overview' ? 'bg-[#10B981] text-white shadow-lg' : 'text-white/50 hover:text-white'
            }`}
          >
            <BarChart3 size={14} /> Extrato
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all duration-500 ${
              activeTab === 'calculator' ? 'bg-[#10B981] text-white shadow-lg' : 'text-white/50 hover:text-white'
            }`}
          >
            <Calculator size={14} /> Calculadora
          </button>
        </div>

        <div className="flex flex-col items-center mb-10">
           <div className={`
             relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-1000
             ${compensated ? 'bg-[#10B981]/20 shadow-[0_0_60px_rgba(16,185,129,0.3)]' : 'bg-white/5'}
           `}>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                 <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="2" fill="none" className="text-white/5" />
                 <circle 
                   cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="3" fill="none" className="text-[#10B981]" 
                   strokeDasharray="552.9" 
                   strokeDashoffset={552.9 - (552.9 * Math.min(totalCo2 / 500, 1))} 
                   strokeLinecap="round"
                   style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                 />
              </svg>
              
              <div className="text-center relative z-10">
                 {compensated ? (
                    <div className="animate-in zoom-in duration-500 flex flex-col items-center">
                       <CheckCircle size={56} className="text-[#10B981] mb-2" />
                       <span className="text-[10px] text-[#10B981] font-bold uppercase tracking-widest">Compensado</span>
                    </div>
                 ) : (
                    <>
                       <div className="text-5xl font-bold text-white tracking-tighter mb-1">{totalCo2}</div>
                       <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">kg CO₂ Gerados</div>
                    </>
                 )}
              </div>
           </div>
        </div>

        {activeTab === 'overview' && !compensated && (
           <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest opacity-60">Fontes Detectadas</h3>
              <GlassCard className="border-[#10B981]/20">
                 <div className="space-y-5">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/70"><Car size={18} /></div>
                          <div><p className="text-white font-bold text-sm">Apps de Mobilidade</p><p className="text-[10px] text-white/40">Uber, 99 e Loggi</p></div>
                       </div>
                       <span className="text-white font-mono text-sm">45 kg</span>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/70"><Wind size={18} /></div>
                          <div><p className="text-white font-bold text-sm">Delivery & Marketplace</p><p className="text-[10px] text-white/40">iFood e Amazon Logistics</p></div>
                       </div>
                       <span className="text-white font-mono text-sm">83 kg</span>
                    </div>
                 </div>
              </GlassCard>
           </div>
        )}

        {activeTab === 'calculator' && !compensated && (
           <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest opacity-60">Personalizar Hábitos</h3>
              <GlassCard className="border-[#10B981]/20">
                 <Slider label="Transporte Semanal" icon={Car} value={transportKm} setValue={setTransportKm} min={0} max={1000} unit="km" />
                 <Slider label="Energia Elétrica" icon={Zap} value={energyBill} setValue={setEnergyBill} min={0} max={2000} unit="R$" />
                 <Slider label="Refeições com Carne" icon={Utensils} value={meatMeals} setValue={setMeatMeals} min={0} max={21} unit="ref" />
                 <Slider label="Viagens Aéreas" icon={Wind} value={flights} setValue={setFlights} min={0} max={10} unit="voos" />
              </GlassCard>
           </div>
        )}

        {compensated && (
           <div className="animate-in zoom-in duration-700">
              <GlassCard className="bg-[#10B981]/10 border-[#10B981]/30 text-center mb-6">
                 <Globe size={40} className="text-[#10B981] mx-auto mb-4 animate-pulse" />
                 <h3 className="text-white font-bold text-lg mb-2">Impacto Neutralizado</h3>
                 <p className="text-white/60 text-xs leading-relaxed mb-6">
                    Seu investimento foi direcionado para o projeto <strong>Amazon Carbon Reserve</strong>. 
                    Você acaba de contribuir para a preservação de 1.2 hectares de floresta nativa.
                 </p>
                 <div className="flex flex-col items-center gap-2 p-4 bg-black/30 rounded-2xl border border-white/5">
                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">NFT Certificate Hash</span>
                    <span className="text-[10px] text-[#10B981] font-mono break-all">0x71C2496...82A1</span>
                 </div>
              </GlassCard>
           </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17] to-transparent z-50">
           <div className="max-w-md mx-auto">
              {!compensated ? (
                 <GlassButton 
                    fullWidth 
                    onClick={handleCompensation}
                    isLoading={compensating}
                    className="bg-[#10B981] hover:bg-[#059669] shadow-[0_0_30px_rgba(16,185,129,0.3)] border-t border-white/20"
                 >
                    Neutralizar Agora ({formatCurrency(totalCo2 * 0.15)})
                 </GlassButton>
              ) : (
                 <GlassButton 
                    fullWidth 
                    variant="secondary"
                    onClick={() => onNavigate('dashboard')}
                 >
                    Voltar ao Início
                 </GlassButton>
              )}
              <p className="text-center text-[9px] text-white/30 mt-4 uppercase tracking-[0.2em] font-bold">Regenera Bank Sustainability Protocol V2.1</p>
           </div>
        </div>

      </div>
    </div>
  );
};