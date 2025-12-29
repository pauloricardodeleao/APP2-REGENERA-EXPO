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

// [FILE] components/screens/PixScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, FileText, QrCode, Copy, Share2, CheckCircle, ChevronRight, User, Building2, ScanLine, ShieldAlert, ShieldCheck, BrainCircuit, Lock } from 'lucide-react';
import { ScreenName, ScreenProps } from '../../types';
import { BottomNav } from '../Layout/BottomNav';
import { formatCurrency } from '../../services/formatters';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { analyzeTransactionRisk, FraudAnalysisResult } from '../../services/fraudDetection';
import { SECURITY_CONFIG } from '../../constants';
import { TwoFactorAuthModal } from '../modals/TwoFactorAuthModal';

interface PixScreenProps extends ScreenProps {
  initialMode?: 'hub' | 'scan' | 'receive' | 'transfer' | 'amount' | 'confirm' | 'success';
}

export const PixScreen: React.FC<PixScreenProps> = ({ onNavigate, onBack, initialMode = 'hub' }) => {
  const [amount, setAmount] = useState('0');
  const [analysisState, setAnalysisState] = useState<'idle' | 'scanning' | 'flagged'>('idle');
  const [fraudResult, setFraudResult] = useState<FraudAnalysisResult | null>(null);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  // Helper to simulate numeric keypad
  const handleAmountInput = (value: string) => {
    let newAmount = amount;
    if (value === 'backspace') {
      newAmount = newAmount.slice(0, -1);
    } else {
      if (newAmount.length < 10) newAmount += value;
    }
    setAmount(newAmount || '0');
  };

  const getFormattedAmount = () => {
    const numericValue = parseInt(amount, 10);
    return isNaN(numericValue) ? 'R$ 0,00' : formatCurrency(numericValue);
  };

  const initiateTransfer = async () => {
    const value = parseInt(amount, 10);
    
    // Step 1: Check Limits for 2FA
    if (value > SECURITY_CONFIG.TRANSACTION_LIMIT_NO_2FA) {
      setShowTwoFactor(true);
      return;
    }

    // If no 2FA needed, proceed to risk analysis
    await performRiskAnalysis();
  };

  const onTwoFactorSuccess = async () => {
    setShowTwoFactor(false);
    await performRiskAnalysis();
  };

  const performRiskAnalysis = async () => {
    setAnalysisState('scanning');
    
    // ML Analysis
    const result = await analyzeTransactionRisk(parseInt(amount), 'João Silva');
    setFraudResult(result);

    if (result.riskLevel === 'SAFE') {
      setTimeout(() => {
         onNavigate('pix-success');
      }, 500);
    } else {
      setAnalysisState('flagged');
    }
  };

  // --- SUB-SCREENS ---

  // 1. HUB (Menu Principal Pix)
  if (initialMode === 'hub') {
    return (
      <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-24">
        <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
           <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
             <ArrowLeft size={24} />
           </button>
           <h1 className="text-xl font-bold text-white">Área Pix</h1>
        </div>

        <div className="px-6 flex-1 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <GlassButton onClick={() => onNavigate('pix-scan')} className="flex flex-col items-center justify-center h-32 gap-2 bg-[#3A66FF]/10 hover:bg-[#3A66FF]/20">
                 <ScanLine size={32} className="text-[#06B6D4]" />
                 <span className="text-sm">Ler QR Code</span>
              </GlassButton>
              <GlassButton onClick={() => onNavigate('pix-transfer')} className="flex flex-col items-center justify-center h-32 gap-2 bg-white/5 hover:bg-white/10">
                 <User size={32} className="text-white" />
                 <span className="text-sm">Transferir</span>
              </GlassButton>
              <GlassButton onClick={() => onNavigate('pix-receive')} className="flex flex-col items-center justify-center h-32 gap-2 bg-white/5 hover:bg-white/10">
                 <QrCode size={32} className="text-white" />
                 <span className="text-sm">Receber (Cobrar)</span>
              </GlassButton>
              <GlassButton onClick={() => onNavigate('pix-transfer')} className="flex flex-col items-center justify-center h-32 gap-2 bg-white/5 hover:bg-white/10">
                 <FileText size={32} className="text-white" />
                 <span className="text-sm">Pix Copia e Cola</span>
              </GlassButton>
           </div>

           <GlassCard>
              <h3 className="text-[#9CA3AF] text-xs font-bold uppercase mb-4">Favoritos</h3>
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                 {['Mãe', 'Amor', 'João', 'Netflix'].map((name, i) => (
                    <div key={i} onClick={() => onNavigate('pix-amount')} className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer">
                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3A66FF] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
                          {name.charAt(0)}
                       </div>
                       <span className="text-xs text-white">{name}</span>
                    </div>
                 ))}
              </div>
           </GlassCard>
        </div>
        <BottomNav activeScreen="pix" onNavigate={onNavigate} />
      </div>
    );
  }

  // 2. SCANNER (Ler QR)
  if (initialMode === 'scan') {
    return (
      <div className="relative h-screen w-full bg-black flex flex-col">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
          
          <div className="flex-1 relative flex items-center justify-center">
             <div className="w-72 h-72 border-2 border-[#06B6D4] rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#06B6D4] shadow-[0_0_20px_#06B6D4] animate-[scan_2s_linear_infinite]" />
                <style>{`@keyframes scan { 0% { top: 0 } 100% { top: 100% } }`}</style>
             </div>
             <p className="absolute bottom-32 text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur">Aponte para o QR Code</p>
          </div>

          <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center z-50">
             <button onClick={onBack} className="text-white p-2 bg-black/40 rounded-full backdrop-blur"><ArrowLeft /></button>
             <button className="text-white p-2 bg-black/40 rounded-full backdrop-blur"><Share2 /></button>
          </div>
          
          <div className="p-8 pb-12 bg-[#0A0E17] rounded-t-[2rem]">
             <GlassButton fullWidth onClick={() => onNavigate('pix-amount')}>Digitar Código (Copia e Cola)</GlassButton>
          </div>
      </div>
    );
  }

  // 3. TRANSFER (List Contacts/Manual)
  if (initialMode === 'transfer') {
     return (
        <div className="relative min-h-screen bg-[#0A0E17] flex flex-col">
           <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
              <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all"><ArrowLeft size={24} /></button>
              <h1 className="text-xl font-bold text-white">Transferir</h1>
           </div>

           <div className="px-6 space-y-4">
              <button onClick={() => onNavigate('transfer-new')} className="w-full p-4 glass rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all">
                 <div className="w-10 h-10 rounded-full bg-[#3A66FF]/20 flex items-center justify-center text-[#3A66FF]"><Building2 size={20} /></div>
                 <div className="text-left">
                    <p className="text-white font-bold">Nova Transferência</p>
                    <p className="text-[#9CA3AF] text-xs">CPF, CNPJ, Agência e Conta</p>
                 </div>
                 <ChevronRight className="ml-auto text-white/30" />
              </button>

              <h3 className="text-[#9CA3AF] text-xs font-bold uppercase mt-6 mb-2">Recentes</h3>
              {[1,2,3].map(i => (
                 <GlassCard key={i} onClick={() => onNavigate('pix-amount')} className="flex items-center gap-4 cursor-pointer" hoverEffect>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3A66FF] to-[#06B6D4] flex items-center justify-center text-white font-bold">JS</div>
                    <div>
                       <p className="text-white font-medium">João Silva</p>
                       <p className="text-[#9CA3AF] text-xs">Nubank • ***.123.456-**</p>
                    </div>
                 </GlassCard>
              ))}
           </div>
        </div>
     );
  }

  // 4. AMOUNT INPUT
  if (initialMode === 'amount') {
     return (
        <div className="relative min-h-screen bg-[#0A0E17] flex flex-col">
           <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
              <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all"><ArrowLeft size={24} /></button>
              <h1 className="text-xl font-bold text-white">Qual o valor?</h1>
           </div>

           <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-[#9CA3AF] mb-2">Saldo disponível: R$ 125.000,00</p>
              <div className="text-5xl font-bold text-white tracking-tight mb-12">{getFormattedAmount()}</div>

              <div className="grid grid-cols-3 gap-x-8 gap-y-6 w-full max-w-xs px-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button key={num} onClick={() => handleAmountInput(num.toString())} className="text-3xl font-medium text-white h-16 w-16 rounded-full hover:bg-white/5 transition-colors">{num}</button>
                ))}
                <div />
                <button onClick={() => handleAmountInput('0')} className="text-3xl font-medium text-white h-16 w-16 rounded-full hover:bg-white/5 transition-colors">0</button>
                <button onClick={() => handleAmountInput('backspace')} className="text-white h-16 w-16 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"><ArrowLeft /></button>
              </div>
           </div>

           <div className="p-6">
              <GlassButton fullWidth disabled={parseInt(amount) === 0} onClick={() => onNavigate('pix-confirm')}>Continuar</GlassButton>
           </div>
        </div>
     );
  }

  // 5. CONFIRMATION
  if (initialMode === 'confirm') {
     return (
        <div className="relative min-h-screen bg-[#0A0E17] flex flex-col">
           
           <TwoFactorAuthModal 
              isOpen={showTwoFactor}
              onCancel={() => setShowTwoFactor(false)}
              onSuccess={onTwoFactorSuccess}
              transactionAmount={parseInt(amount)}
           />

           {/* FRAUD DETECTION OVERLAY - SCANNING */}
           {analysisState === 'scanning' && (
             <div className="absolute inset-0 bg-[#0A0E17]/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="relative w-32 h-32 mb-8">
                   <div className="absolute inset-0 bg-[#3A66FF] rounded-full opacity-20 animate-ping" />
                   <div className="absolute inset-0 border-4 border-[#3A66FF] border-t-[#06B6D4] rounded-full animate-spin" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <BrainCircuit size={48} className="text-[#06B6D4]" />
                   </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Analisando Padrões</h2>
                <p className="text-[#9CA3AF] text-center max-w-xs">
                  Nossa IA está verificando a segurança desta transação em tempo real.
                </p>
                <div className="mt-8 flex gap-2">
                   <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-bounce" style={{ animationDelay: '0s' }} />
                   <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-bounce" style={{ animationDelay: '0.2s' }} />
                   <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
             </div>
           )}

           {/* FRAUD DETECTION OVERLAY - FLAGGED */}
           {analysisState === 'flagged' && fraudResult && (
             <div className="absolute inset-0 bg-[#0A0E17] z-50 flex flex-col items-center justify-center p-6 animate-in slide-in-from-bottom duration-500">
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-red-500/10">
                   <ShieldAlert size={48} className="text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Transação Interrompida</h2>
                <p className="text-red-400 font-bold mb-6 text-lg text-center">Risco: {fraudResult.riskLevel}</p>
                
                <GlassCard className="mb-8 border-red-500/30 bg-red-900/10 w-full">
                   <p className="text-white text-sm text-center">
                      {fraudResult.reason || "Detectamos um comportamento atípico para o seu perfil. Por segurança, esta transação foi bloqueada temporariamente."}
                   </p>
                   <p className="text-[#9CA3AF] text-xs text-center mt-4">Score de Fraude: {fraudResult.score}/100</p>
                </GlassCard>

                <div className="w-full space-y-4">
                   <GlassButton fullWidth variant="primary" onClick={() => {/* Trigger FaceID */}}>
                      <div className="flex items-center gap-2 justify-center">
                         <Lock size={18} /> Desbloquear com Biometria
                      </div>
                   </GlassButton>
                   <GlassButton fullWidth variant="secondary" onClick={() => setAnalysisState('idle')}>Cancelar</GlassButton>
                </div>
             </div>
           )}

           <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
              <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all"><ArrowLeft size={24} /></button>
              <h1 className="text-xl font-bold text-white">Revisão</h1>
           </div>

           <div className="px-6 flex-1">
              <div className="bg-[#3A66FF]/10 border border-[#3A66FF]/20 rounded-2xl p-6 text-center mb-6 relative overflow-hidden">
                 <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#3A66FF]/20 px-2 py-1 rounded-lg">
                    <ShieldCheck size={12} className="text-[#3A66FF]" />
                    <span className="text-[10px] font-bold text-[#3A66FF] uppercase">Protected by AI</span>
                 </div>
                 <p className="text-[#9CA3AF] text-sm mb-1">Valor a transferir</p>
                 <p className="text-4xl font-bold text-white">{getFormattedAmount()}</p>
              </div>

              <GlassCard className="space-y-4">
                 <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-[#9CA3AF]">Para</span>
                    <span className="text-white font-bold text-right">João Silva</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-[#9CA3AF]">CPF</span>
                    <span className="text-white font-medium text-right">***.123.456-**</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-[#9CA3AF]">Instituição</span>
                    <span className="text-white font-medium text-right">Nubank Payments</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-[#9CA3AF]">Data</span>
                    <span className="text-white font-medium text-right">Agora</span>
                 </div>
              </GlassCard>
           </div>

           <div className="p-6">
              <GlassButton fullWidth onClick={initiateTransfer} isLoading={analysisState === 'scanning'}>Confirmar e Transferir</GlassButton>
           </div>
        </div>
     );
  }

  // 6. SUCCESS
  if (initialMode === 'success') {
     return (
        <div className="relative min-h-screen bg-[#0A0E17] flex flex-col items-center justify-center p-6 animate-in zoom-in">
           <div className="w-24 h-24 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-[#10B981]/10">
              <CheckCircle size={48} className="text-[#10B981]" />
           </div>
           <h2 className="text-2xl font-bold text-white mb-2">Transferência Realizada!</h2>
           <p className="text-[#9CA3AF] text-center mb-8">O valor foi enviado com sucesso.</p>
           
           <div className="w-full space-y-4">
              <GlassButton fullWidth onClick={() => onNavigate('transaction-detail')} variant="secondary">Ver Comprovante</GlassButton>
              <GlassButton fullWidth onClick={() => onNavigate('dashboard')}>Voltar ao Início</GlassButton>
           </div>
        </div>
     );
  }

  // 7. RECEIVE
  if (initialMode === 'receive') {
     return (
      <div className="relative min-h-screen bg-[#0A0E17] flex flex-col">
         <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
            <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all"><ArrowLeft size={24} /></button>
            <h1 className="text-xl font-bold text-white">Receber Pix</h1>
         </div>

         <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-8">
               <QrCode size={240} className="text-black" />
            </div>
            <p className="text-white font-bold text-lg mb-1">Don Paulo Ricardo</p>
            <p className="text-[#9CA3AF] text-sm">Chave Aleatória</p>
            
            <button className="mt-8 text-[#06B6D4] font-bold text-sm border-b border-[#06B6D4] pb-0.5">Definir valor específico</button>
         </div>

         <div className="p-6 flex gap-4">
            <GlassButton fullWidth className="flex items-center gap-2"><Copy size={18}/> Copiar</GlassButton>
            <GlassButton fullWidth variant="secondary" className="flex items-center gap-2"><Share2 size={18}/> Compartilhar</GlassButton>
         </div>
      </div>
     );
  }

  return null;
};

/*
╔══════════════════════════════════════════════════════════════════════════╗
║  REGENERA BANK - PRODUCTION BUILD                                        ║
║  System Status: Stable & Secure                                          ║
║  © 2025 Don Paulo Ricardo de Leão • Todos os direitos reservados         ║
╚══════════════════════════════════════════════════════════════════════════╝
*/