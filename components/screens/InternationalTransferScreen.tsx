
/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Cross-Border Ledger
  Financial Logic: Pure Cents Strategy
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] components/screens/InternationalTransferScreen.tsx
import React, { useState } from 'react';
import { 
  ArrowLeft, Globe, DollarSign, Euro, PoundSterling, 
  ArrowRight, Building2, Info, CheckCircle, Wallet, ShieldCheck 
} from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { formatCurrency } from '../../services/formatters';

type Currency = 'USD' | 'EUR' | 'GBP';

interface ExchangeRate {
  currency: Currency;
  rate: number;
  iof: number;
  spread: number;
}

export const InternationalTransferScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [step, setStep] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [amountCents, setAmountCents] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState('');
  const [loading, setLoading] = useState(false);

  const rates: Record<Currency, ExchangeRate> = {
    USD: { currency: 'USD', rate: 5.15, iof: 1.1, spread: 2.0 },
    EUR: { currency: 'EUR', rate: 5.58, iof: 1.1, spread: 2.0 },
    GBP: { currency: 'GBP', rate: 6.45, iof: 1.1, spread: 2.0 },
  };

  const currentRate = rates[selectedCurrency];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const cents = parseInt(raw, 10) || 0;
    setAmountCents(cents);
    setDisplayValue(cents > 0 ? (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '');
  };

  const getConvertedValue = () => {
    if (amountCents === 0) return 0;
    const effectiveRate = currentRate.rate * (1 + currentRate.spread / 100);
    return (amountCents / 100) / effectiveRate;
  };

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(step + 1);
    }, 1000);
  };

  const CurrencyIcon = ({ currency }: { currency: Currency }) => {
    switch(currency) {
      case 'USD': return <DollarSign size={20} />;
      case 'EUR': return <Euro size={20} />;
      case 'GBP': return <PoundSterling size={20} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-6">
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40 border-b border-white/5">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Câmbio Global</h1>
      </div>

      <div className="flex-1 px-6 flex flex-col animate-in slide-in-from-right duration-500">
        
        {step === 1 && (
          <>
            <div className="flex gap-3 mb-6">
              {(['USD', 'EUR', 'GBP'] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setSelectedCurrency(cur)}
                  className={`flex-1 py-4 rounded-2xl border transition-all flex flex-col items-center gap-2
                    ${selectedCurrency === cur 
                      ? 'bg-[#3A66FF]/20 border-[#3A66FF] text-white shadow-lg' 
                      : 'bg-white/5 border-transparent text-[#9CA3AF] hover:bg-white/10'}
                  `}
                >
                  <CurrencyIcon currency={cur} />
                  <span className="font-bold text-sm">{cur}</span>
                </button>
              ))}
            </div>

            <GlassCard className="mb-6">
               <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-[#9CA3AF] uppercase font-bold">Você envia</label>
                  <div className="flex items-center gap-1 text-[#3A66FF]">
                     <span className="text-xs font-bold">BRL</span>
                     <img src="https://flagcdn.com/w20/br.png" alt="Brasil" className="w-5 h-3.5 object-cover rounded-sm" />
                  </div>
               </div>
               <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                  <span className="text-2xl text-[#9CA3AF]">R$</span>
                  <input 
                     type="text"
                     inputMode="numeric"
                     value={displayValue}
                     onChange={handleAmountChange}
                     placeholder="0,00"
                     className="w-full bg-transparent text-3xl font-bold text-white outline-none"
                  />
               </div>

               <div className="flex justify-center mb-4">
                  <div className="p-2 bg-white/5 rounded-full border border-white/10">
                     <ArrowRight size={20} className="text-white rotate-90" />
                  </div>
               </div>

               <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-[#9CA3AF] uppercase font-bold">Beneficiário recebe</label>
                  <div className="flex items-center gap-1 text-[#10B981]">
                     <span className="text-xs font-bold">{selectedCurrency}</span>
                     <Globe size={14} />
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-2xl text-[#9CA3AF]">
                    {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '£'}
                  </span>
                  <span className="text-3xl font-bold text-white">
                    {getConvertedValue().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
               </div>
            </GlassCard>

            <div className="space-y-3 mb-6">
               <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">Câmbio Comercial</span>
                  <span className="text-white font-medium">R$ {currentRate.rate.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">IOF ({currentRate.iof}%)</span>
                  <span className="text-white font-medium">R$ {((amountCents * currentRate.iof) / 10000).toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">VET (Valor Efetivo Total)</span>
                  <span className="text-white font-medium">R$ {(currentRate.rate * (1 + currentRate.spread/100 + currentRate.iof/100)).toFixed(2)}</span>
               </div>
            </div>

            <div className="mt-auto">
               <GlassButton fullWidth disabled={amountCents === 0} onClick={handleContinue} isLoading={loading}>
                  Continuar
               </GlassButton>
            </div>
          </>
        )}

        {step === 2 && (
           <div className="flex flex-col h-full">
              <h2 className="text-lg font-bold text-white mb-6">Dados do Beneficiário</h2>
              <div className="space-y-4">
                 <GlassCard>
                    <label className="text-xs text-[#9CA3AF] uppercase font-bold">Nome Completo</label>
                    <input className="w-full bg-transparent text-white text-lg mt-1 outline-none border-b border-white/10 focus:border-[#3A66FF] transition-colors pb-1" placeholder="Ex: John Doe" />
                 </GlassCard>
                 <GlassCard>
                    <div className="flex items-center justify-between mb-2">
                       <label className="text-xs text-[#9CA3AF] uppercase font-bold">Código IBAN / SWIFT</label>
                       <Info size={14} className="text-[#3A66FF]" />
                    </div>
                    <input className="w-full bg-transparent text-white text-lg mt-1 outline-none border-b border-white/10 focus:border-[#3A66FF] transition-colors pb-1" placeholder="AA00 0000..." />
                 </GlassCard>
                 <div className="p-4 bg-[#3A66FF]/10 rounded-2xl border border-[#3A66FF]/20 flex gap-3">
                    <ShieldCheck className="text-[#3A66FF] flex-shrink-0" />
                    <p className="text-xs text-[#3A66FF] font-medium leading-relaxed">
                       A conta de destino deve ser da mesma titularidade ou de pessoa física conhecida. Transações sujeitas a compliance.
                    </p>
                 </div>
              </div>
              <div className="mt-auto pt-6">
                 <GlassButton fullWidth onClick={handleContinue} isLoading={loading}>Revisar Transferência</GlassButton>
              </div>
           </div>
        )}

        {step === 3 && (
           <div className="flex flex-col h-full">
              <h2 className="text-lg font-bold text-white mb-6">Revisão</h2>
              <GlassCard className="mb-6">
                 <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <div>
                       <p className="text-[#9CA3AF] text-xs uppercase font-bold">BRL</p>
                       <p className="text-xl font-bold text-white">{formatCurrency(amountCents)}</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded-full"><ArrowRight className="text-white" /></div>
                    <div className="text-right">
                       <p className="text-[#9CA3AF] text-xs uppercase font-bold">{selectedCurrency}</p>
                       <p className="text-xl font-bold text-[#10B981]">
                          {getConvertedValue().toLocaleString('en-US', { style: 'currency', currency: selectedCurrency })}
                       </p>
                    </div>
                 </div>
                 <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-[#9CA3AF]">Beneficiário</span><span className="text-white font-medium">John Doe</span></div>
                    <div className="flex justify-between"><span className="text-[#9CA3AF]">IBAN</span><span className="text-white font-medium font-mono">US12...890</span></div>
                    <div className="flex justify-between"><span className="text-[#9CA3AF]">Prazo Estimado</span><span className="text-white font-medium">Até 2 dias úteis</span></div>
                 </div>
              </GlassCard>
              <div className="mt-auto pt-6">
                 <GlassButton fullWidth onClick={() => setStep(4)} isLoading={loading}>Confirmar Envio</GlassButton>
              </div>
           </div>
        )}

        {step === 4 && (
           <div className="flex flex-col h-full items-center justify-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-8 ring-4 ring-[#10B981]/10">
                 <CheckCircle size={48} className="text-[#10B981]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Solicitação Enviada!</h2>
              <p className="text-[#9CA3AF] text-center max-w-xs mb-8">Processando remessa. Notificaremos você a cada etapa.</p>
              <GlassCard className="w-full mb-6 text-center">
                 <p className="text-[#9CA3AF] text-xs uppercase font-bold">Código de Rastreio</p>
                 <p className="text-white font-mono text-lg tracking-widest mt-1">SW-882910-BR</p>
              </GlassCard>
              <GlassButton fullWidth onClick={() => onNavigate('dashboard')} isLoading={loading}>Voltar ao Início</GlassButton>
           </div>
        )}
      </div>
    </div>
  );
};
