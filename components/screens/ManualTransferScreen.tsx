/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Account & Ledger
  Financial Logic: Pure Cents Strategy
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] components/screens/ManualTransferScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Building2, Calendar, CheckCircle, ChevronRight, Clock, Search, Wallet } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { formatCurrency } from '../../services/formatters';
import { SECURITY_CONFIG } from '../../constants';
import { TwoFactorAuthModal } from '../modals/TwoFactorAuthModal';

export const ManualTransferScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [transferType, setTransferType] = useState<'TED' | 'DOC'>('TED');
  const [scheduledDate, setScheduledDate] = useState('Hoje');
  const [amountCents, setAmountCents] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  // Banks Mock
  const banks = [
    { code: '001', name: 'Banco do Brasil' },
    { code: '237', name: 'Bradesco' },
    { code: '341', name: 'Itaú Unibanco' },
    { code: '260', name: 'Nubank' },
    { code: '077', name: 'Inter' },
    { code: '033', name: 'Santander' },
    { code: '104', name: 'Caixa Econômica' },
    { code: '070', name: 'BRB - Banco de Brasília' },
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const cents = parseInt(raw, 10) || 0;
    setAmountCents(cents);
    // Format for display: 1250 -> 12,50
    setDisplayValue((cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
  };

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(step + 1);
    }, 800);
  };

  const initiateTransfer = () => {
    if (amountCents > SECURITY_CONFIG.TRANSACTION_LIMIT_NO_2FA) {
       setShowTwoFactor(true);
    } else {
       completeTransfer();
    }
  };

  const completeTransfer = () => {
     setLoading(true);
     setTimeout(() => {
        setLoading(false);
        onNavigate('pix-success');
     }, 1500);
  };

  const onTwoFactorSuccess = () => {
     setShowTwoFactor(false);
     completeTransfer();
  };

  const StepIndicator = () => (
    <div className="flex gap-1 mb-6 px-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <div 
          key={s} 
          className={`h-1 flex-1 rounded-full transition-all duration-300 
            ${s === step ? 'bg-[#06B6D4]' : s < step ? 'bg-[#3A66FF]' : 'bg-white/10'}`} 
        />
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-6">
      <TwoFactorAuthModal 
        isOpen={showTwoFactor}
        onCancel={() => setShowTwoFactor(false)}
        onSuccess={onTwoFactorSuccess}
        transactionAmount={amountCents}
      />

      <div className="px-6 pt-12 pb-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">
             {step === 5 ? 'Revisão' : 'Nova Transferência'}
          </h1>
        </div>
        <StepIndicator />
      </div>

      <div className="flex-1 px-6 flex flex-col animate-in slide-in-from-right duration-500">
        {step === 1 && (
          <>
            <div className="glass rounded-2xl p-3 flex items-center gap-3 mb-6">
               <Search size={20} className="text-[#9CA3AF]" />
               <input placeholder="Busque por nome ou código" className="flex-1 bg-transparent text-white outline-none placeholder-[#9CA3AF]/50" />
            </div>
            <h3 className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-4">Instituições Populares</h3>
            <div className="space-y-3 pb-8">
              {banks.map((bank, i) => (
                <GlassCard key={i} onClick={handleNext} className="flex items-center justify-between p-4 cursor-pointer" hoverEffect>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white font-bold text-xs border border-white/10">
                      {bank.code}
                    </div>
                    <span className="text-white font-medium">{bank.name}</span>
                  </div>
                  <ChevronRight size={20} className="text-white/30" />
                </GlassCard>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Dados da Conta</h2>
            <div className="flex gap-4 mb-2">
               <button className="flex-1 py-2 bg-[#3A66FF] rounded-xl text-xs font-bold text-white shadow-lg shadow-[#3A66FF]/20">Conta Corrente</button>
               <button className="flex-1 py-2 bg-white/5 rounded-xl text-xs font-bold text-[#9CA3AF] hover:bg-white/10">Conta Poupança</button>
            </div>
            <GlassCard>
              <label className="text-xs text-[#9CA3AF] uppercase font-bold">Agência (sem dígito)</label>
              <input placeholder="0000" className="w-full bg-transparent text-white text-lg mt-1 outline-none" type="number" />
            </GlassCard>
            <GlassCard>
              <label className="text-xs text-[#9CA3AF] uppercase font-bold">Conta com dígito</label>
              <input placeholder="00000-0" className="w-full bg-transparent text-white text-lg mt-1 outline-none" />
            </GlassCard>
            <div className="mt-auto pt-8">
              <GlassButton fullWidth onClick={handleNext} isLoading={loading}>Continuar</GlassButton>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Quem vai receber?</h2>
            <GlassCard>
              <label className="text-xs text-[#9CA3AF] uppercase font-bold">CPF / CNPJ</label>
              <input placeholder="000.000.000-00" className="w-full bg-transparent text-white text-lg mt-1 outline-none" />
            </GlassCard>
            <div className="p-4 bg-[#3A66FF]/10 rounded-2xl border border-[#3A66FF]/20 flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-[#3A66FF] flex items-center justify-center text-white">
                 <Building2 size={20} />
               </div>
               <div>
                  <p className="text-white font-bold text-sm">Validando destinatário...</p>
                  <p className="text-[#3A66FF] text-xs">O sistema buscará os dados automaticamente.</p>
               </div>
            </div>
            <div className="mt-auto pt-8">
              <GlassButton fullWidth onClick={handleNext} isLoading={loading}>Validar e Continuar</GlassButton>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
             <h2 className="text-lg font-bold text-white">Detalhes da Transferência</h2>
             <div className="bg-[#0A0E17] border-b border-white/20 pb-2 mb-4 flex items-center gap-2">
                <span className="text-2xl text-[#9CA3AF]">R$</span>
                <input 
                   type="text" 
                   inputMode="numeric"
                   placeholder="0,00"
                   value={displayValue}
                   className="w-full bg-transparent text-4xl font-bold text-white outline-none"
                   autoFocus
                   onChange={handleAmountChange}
                />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <GlassCard 
                   className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${transferType === 'TED' ? 'border-[#06B6D4] bg-[#06B6D4]/10' : ''}`}
                   onClick={() => setTransferType('TED')}
                >
                   <Clock className={transferType === 'TED' ? 'text-[#06B6D4]' : 'text-[#9CA3AF]'} />
                   <span className="font-bold text-white">TED</span>
                   <span className="text-[10px] text-[#9CA3AF]">Cai hoje até 17h</span>
                </GlassCard>
                <GlassCard 
                   className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${transferType === 'DOC' ? 'border-[#06B6D4] bg-[#06B6D4]/10' : ''}`}
                   onClick={() => setTransferType('DOC')}
                >
                   <Wallet className={transferType === 'DOC' ? 'text-[#06B6D4]' : 'text-[#9CA3AF]'} />
                   <span className="font-bold text-white">DOC</span>
                   <span className="text-[10px] text-[#9CA3AF]">Cai amanhã</span>
                </GlassCard>
             </div>
             <GlassCard className="flex items-center justify-between" onClick={() => setScheduledDate('Amanhã')}>
                <div className="flex items-center gap-3">
                   <Calendar size={20} className="text-[#3A66FF]" />
                   <div>
                      <p className="text-white font-bold text-sm">Agendar</p>
                      <p className="text-xs text-[#9CA3AF]">{scheduledDate}</p>
                   </div>
                </div>
                <ChevronRight className="text-white/30" />
             </GlassCard>
             <div className="mt-auto pt-8">
               <GlassButton fullWidth onClick={handleNext} disabled={amountCents === 0} isLoading={loading}>Revisar</GlassButton>
             </div>
          </div>
        )}

        {step === 5 && (
           <div className="space-y-6">
              <div className="bg-[#3A66FF]/10 border border-[#3A66FF]/20 rounded-2xl p-6 text-center mb-2">
                 <p className="text-[#9CA3AF] text-sm mb-1">Você está transferindo</p>
                 <p className="text-4xl font-bold text-white">{formatCurrency(amountCents)}</p>
              </div>
              <GlassCard className="space-y-4">
                 <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-[#9CA3AF]">Tipo</span>
                    <span className="text-white font-bold text-right">{transferType}</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-[#9CA3AF]">Para</span>
                    <span className="text-white font-bold text-right">João Silva</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-[#9CA3AF]">Instituição</span>
                    <span className="text-white font-medium text-right">Banco do Brasil (001)</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-[#9CA3AF]">Data</span>
                    <span className="text-white font-medium text-right">{scheduledDate}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-[#9CA3AF]">Tarifa</span>
                    <span className="text-[#10B981] font-bold text-right">Grátis</span>
                 </div>
              </GlassCard>
              <GlassCard>
                <label className="text-xs text-[#9CA3AF] uppercase font-bold">Senha do App (4 dígitos)</label>
                <input type="password" placeholder="••••" maxLength={4} className="w-full bg-transparent text-white text-xl mt-2 outline-none tracking-widest" />
             </GlassCard>
              <div className="mt-auto pt-4">
                 <GlassButton fullWidth onClick={initiateTransfer} isLoading={loading}>
                    Confirmar Transferência
                 </GlassButton>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};