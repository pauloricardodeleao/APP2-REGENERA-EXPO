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

// [FILE] components/screens/BusinessOnboardingScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Building2, Camera, Check, CheckCircle, FileText, ChevronRight, User } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { ScreenProps } from '../../types';

interface BusinessOnboardingScreenProps extends ScreenProps {
  onComplete: () => void;
}

export const BusinessOnboardingScreen: React.FC<BusinessOnboardingScreenProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cnpj: '', razao: '', openingDate: '',
    zip: '', street: '', number: '',
    terms: false
  });

  const simulateProcessing = (nextStepOverride?: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(nextStepOverride || step + 1);
    }, 1500);
  };

  const totalSteps = 11;
  const StepIndicator = () => (
    <div className="flex gap-1 mb-8 px-1">
      {[...Array(totalSteps)].map((_, i) => (
        <div 
          key={i} 
          className={`h-1 flex-1 rounded-full transition-all duration-300 
            ${i + 1 === step ? 'bg-[#06B6D4] scale-y-150' : i + 1 < step ? 'bg-[#3A66FF]' : 'bg-white/10'}`} 
        />
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col p-6">
      <div className="pt-8 pb-4">
        <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="text-white hover:bg-white/10 p-2 rounded-full transition-all inline-block mb-4">
          <ArrowLeft size={24} />
        </button>
        <StepIndicator />
      </div>

      <div className="flex-1 flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* 1-4: Company Data */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Dados da Empresa</h2>
            <p className="text-[#9CA3AF] mb-6">Comece informando o CNPJ.</p>
            <GlassCard>
                <label className="text-xs text-[#9CA3AF] uppercase font-bold">CNPJ</label>
                <input 
                  value={formData.cnpj} onChange={e => setFormData({...formData, cnpj: e.target.value})}
                  className="w-full bg-transparent text-white text-lg mt-1 outline-none" placeholder="00.000.000/0000-00"
                />
            </GlassCard>
            <div className="mt-auto pt-6"><GlassButton fullWidth onClick={() => simulateProcessing(2)} isLoading={loading}>Buscar Dados</GlassButton></div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Confirme os Dados</h2>
            <p className="text-[#9CA3AF] mb-6">Encontramos estas informações.</p>
            <div className="space-y-4">
               <GlassCard>
                  <label className="text-xs text-[#9CA3AF] uppercase font-bold">Razão Social</label>
                  <input defaultValue="REGENERA TECH LTDA" className="w-full bg-transparent text-white text-lg mt-1 outline-none" />
               </GlassCard>
               <GlassCard>
                  <label className="text-xs text-[#9CA3AF] uppercase font-bold">Data de Abertura</label>
                  <input defaultValue="01/01/2024" className="w-full bg-transparent text-white text-lg mt-1 outline-none" />
               </GlassCard>
            </div>
            <div className="mt-auto pt-6"><GlassButton fullWidth onClick={() => setStep(3)}>Confirmar</GlassButton></div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Endereço da Sede</h2>
            <p className="text-[#9CA3AF] mb-6">Onde a empresa está localizada?</p>
            <div className="space-y-4">
               <GlassCard>
                  <label className="text-xs text-[#9CA3AF] uppercase font-bold">CEP</label>
                  <input placeholder="00000-000" className="w-full bg-transparent text-white text-lg mt-1 outline-none" />
               </GlassCard>
            </div>
            <div className="mt-auto pt-6"><GlassButton fullWidth onClick={() => setStep(4)}>Continuar</GlassButton></div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Complemento</h2>
             <div className="flex gap-4">
                <GlassCard className="flex-1">
                    <label className="text-xs text-[#9CA3AF] uppercase font-bold">Número</label>
                    <input className="w-full bg-transparent text-white text-lg mt-1 outline-none" placeholder="1000" />
                </GlassCard>
                <GlassCard className="flex-[2]">
                    <label className="text-xs text-[#9CA3AF] uppercase font-bold">Bairro</label>
                    <input defaultValue="Centro" className="w-full bg-transparent text-white text-lg mt-1 outline-none" />
                </GlassCard>
              </div>
            <div className="mt-auto pt-6"><GlassButton fullWidth onClick={() => setStep(5)}>Confirmar Endereço</GlassButton></div>
          </>
        )}

        {/* 5-8: Docs */}
        {step === 5 && (
           <>
              <h2 className="text-2xl font-bold text-white mb-2">Documentação</h2>
              <p className="text-[#9CA3AF] mb-6">Precisamos do Contrato Social ou Requerimento de Empresário.</p>
              
              <button onClick={() => setStep(6)} className="w-full glass rounded-2xl p-6 flex items-center justify-between hover:bg-white/10 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#3A66FF]/20 flex items-center justify-center text-[#3A66FF]"><FileText /></div>
                      <div className="text-left">
                         <p className="font-bold text-white">Contrato Social</p>
                         <p className="text-xs text-[#9CA3AF]">Última alteração consolidada</p>
                      </div>
                   </div>
                   <ChevronRight className="text-white/30" />
              </button>
           </>
        )}

        {step === 6 && (
           <>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <div className="w-24 h-24 rounded-full bg-[#3A66FF]/10 flex items-center justify-center mb-8 relative">
                    <Camera size={48} className="text-[#3A66FF]" />
                    <div className="absolute inset-0 border-2 border-[#3A66FF] border-dashed rounded-full animate-spin-slow" />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-4">Fotografar Documento</h2>
                 <p className="text-[#9CA3AF] max-w-xs mb-8">
                    Posicione o documento em local iluminado. Faremos a captura de todas as páginas.
                 </p>
              </div>
              <div className="mt-auto pt-6">
                <GlassButton fullWidth onClick={() => setStep(7)}>Abrir Câmera</GlassButton>
              </div>
           </>
        )}

        {step === 7 && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
             <div className="relative flex-1 bg-gray-900 flex items-center justify-center">
                <div className="w-[85%] aspect-[1/1.4] border-2 border-white/50 rounded-xl relative"></div>
                <p className="absolute bottom-10 text-white font-bold bg-black/50 px-4 py-1 rounded-full">Página 1</p>
             </div>
             <div className="h-32 bg-black flex items-center justify-center gap-8">
                <button onClick={() => setStep(6)} className="text-white">Cancelar</button>
                <button onClick={() => simulateProcessing(8)} className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 active:scale-90 transition-all" />
                <div className="w-12" />
             </div>
          </div>
        )}

        {/* 9: Representative */}
        {step === 8 && (
           <>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <CheckCircle size={64} className="text-[#10B981] mb-6" />
                 <h2 className="text-2xl font-bold text-white mb-4">Documentos Enviados</h2>
                 <p className="text-[#9CA3AF] max-w-xs mb-8">Agora precisamos validar você como representante legal.</p>
              </div>
              <div className="mt-auto pt-6"><GlassButton fullWidth onClick={() => setStep(9)}>Validar Representante</GlassButton></div>
           </>
        )}

        {step === 9 && (
           <>
              <h2 className="text-2xl font-bold text-white mb-2">Quem está operando?</h2>
              <p className="text-[#9CA3AF] mb-6">Selecione o sócio administrador.</p>
              <GlassCard className="flex items-center gap-4 mb-4 border border-[#3A66FF]" hoverEffect>
                 <div className="w-10 h-10 rounded-full bg-[#3A66FF]/20 flex items-center justify-center text-[#3A66FF]"><User /></div>
                 <div>
                    <p className="text-white font-bold">Don Paulo Ricardo</p>
                    <p className="text-xs text-[#9CA3AF]">CPF: 000.***.***-00</p>
                 </div>
                 <CheckCircle className="ml-auto text-[#3A66FF]" />
              </GlassCard>
              <div className="mt-auto pt-6"><GlassButton fullWidth onClick={() => simulateProcessing(10)} isLoading={loading}>Biometria Facial</GlassButton></div>
           </>
        )}

        {/* 10-11: Final */}
        {step === 10 && (
           <>
             <h2 className="text-2xl font-bold text-white mb-6">Termos de Uso PJ</h2>
             <button 
                onClick={() => setFormData({...formData, terms: !formData.terms})}
                className="flex items-start gap-3 mb-6"
              >
                <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-all flex-shrink-0 ${formData.terms ? 'bg-[#3A66FF] border-[#3A66FF]' : 'border-white/30'}`}>
                  {formData.terms && <Check size={12} className="text-white" />}
                </div>
                <span className="text-xs text-[#9CA3AF] text-left leading-relaxed">
                  Declaro que sou representante legal e autorizo a abertura da conta PJ conforme regulamentação do Bacen.
                </span>
              </button>

             <div className="mt-auto pt-6">
                <GlassButton fullWidth disabled={!formData.terms} onClick={() => setStep(11)}>Finalizar</GlassButton>
             </div>
           </>
        )}

        {step === 11 && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in duration-500">
             <div className="w-24 h-24 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-[#10B981]/10">
               <Building2 size={48} className="text-[#10B981]" />
             </div>
             
             <h2 className="text-3xl font-bold text-white mb-2 text-center">Solicitação Recebida!</h2>
             <p className="text-[#9CA3AF] text-center max-w-xs mb-12">
               Os dados da sua empresa estão em análise. Você receberá o resultado por e-mail em até 24 horas úteis.
             </p>

             <GlassButton fullWidth onClick={onComplete}>Voltar ao Início</GlassButton>
          </div>
        )}

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