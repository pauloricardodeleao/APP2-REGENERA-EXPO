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

// [FILE] components/screens/OnboardingScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Camera, Check, CheckCircle, ChevronRight, FileText, MapPin, Smile } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { ScreenProps } from '../../types';

interface OnboardingScreenProps extends ScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '', cpf: '', birth: '',
    phone: '', email: '', otp: '',
    cep: '', street: '', number: '', neighborhood: '', city: '',
    docType: 'rg',
    terms: false
  });

  const totalSteps = 12;

  const simulateProcessing = (nextStepOverride?: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(nextStepOverride || step + 1);
    }, 1500);
  };

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
        
        {/* STEP 1: PERSONAL DATA */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Dados Pessoais</h2>
            <p className="text-[#9CA3AF] mb-6">Comece informando quem você é.</p>
            <div className="space-y-4">
              <GlassCard>
                <label className="text-xs text-[#9CA3AF] uppercase font-bold">Nome Completo</label>
                <input 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent text-white text-lg mt-1 outline-none" placeholder="Nome"
                />
              </GlassCard>
              <GlassCard>
                <label className="text-xs text-[#9CA3AF] uppercase font-bold">CPF</label>
                <input 
                  value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})}
                  className="w-full bg-transparent text-white text-lg mt-1 outline-none" placeholder="000.000.000-00"
                />
              </GlassCard>
              <GlassCard>
                <label className="text-xs text-[#9CA3AF] uppercase font-bold">Data de Nascimento</label>
                <input 
                  value={formData.birth} onChange={e => setFormData({...formData, birth: e.target.value})}
                  className="w-full bg-transparent text-white text-lg mt-1 outline-none" placeholder="DD/MM/AAAA"
                />
              </GlassCard>
            </div>
            <div className="mt-auto pt-6">
              <GlassButton fullWidth onClick={() => setStep(2)}>Continuar</GlassButton>
            </div>
          </>
        )}

        {/* STEP 2: CONTACT */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Contato</h2>
            <p className="text-[#9CA3AF] mb-6">Onde podemos falar com você?</p>
            <div className="space-y-4">
              <GlassCard>
                <label className="text-xs text-[#9CA3AF] uppercase font-bold">Celular</label>
                <input 
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent text-white text-lg mt-1 outline-none" placeholder="(00) 00000-0000"
                />
              </GlassCard>
              <GlassCard>
                <label className="text-xs text-[#9CA3AF] uppercase font-bold">E-mail</label>
                <input 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent text-white text-lg mt-1 outline-none" placeholder="seu@email.com"
                />
              </GlassCard>
            </div>
            <div className="mt-auto pt-6">
              <GlassButton fullWidth onClick={() => simulateProcessing(3)} isLoading={loading}>Enviar Código</GlassButton>
            </div>
          </>
        )}

        {/* STEP 3: OTP */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Validação</h2>
            <p className="text-[#9CA3AF] mb-6">Digite o código enviado para {formData.email}</p>
            <div className="flex gap-4 justify-center my-8">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-14 h-16 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-2xl font-bold text-white">
                   {Math.floor(Math.random() * 9)}
                 </div>
               ))}
            </div>
            <div className="mt-auto pt-6">
              <GlassButton fullWidth onClick={() => simulateProcessing(4)} isLoading={loading}>Validar</GlassButton>
            </div>
          </>
        )}

        {/* STEP 4: ADDRESS (CEP) */}
        {step === 4 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Endereço</h2>
            <p className="text-[#9CA3AF] mb-6">Onde você mora?</p>
            <GlassCard>
              <div className="flex items-center gap-3">
                 <MapPin className="text-[#06B6D4]" />
                 <div className="flex-1">
                    <label className="text-xs text-[#9CA3AF] uppercase font-bold">CEP</label>
                    <input 
                      value={formData.cep} onChange={e => setFormData({...formData, cep: e.target.value})}
                      className="w-full bg-transparent text-white text-lg mt-1 outline-none" placeholder="00000-000"
                    />
                 </div>
              </div>
            </GlassCard>
            <div className="mt-auto pt-6">
              <GlassButton fullWidth onClick={() => simulateProcessing(5)} isLoading={loading}>Buscar Endereço</GlassButton>
            </div>
          </>
        )}

        {/* STEP 5: ADDRESS DETAILS */}
        {step === 5 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Complemento</h2>
            <p className="text-[#9CA3AF] mb-6">Confirme os detalhes do seu endereço.</p>
            <div className="space-y-4">
              <GlassCard>
                <label className="text-xs text-[#9CA3AF] uppercase font-bold">Rua</label>
                <input defaultValue="Av. Paulista" className="w-full bg-transparent text-white text-lg mt-1 outline-none" />
              </GlassCard>
              <div className="flex gap-4">
                <GlassCard className="flex-1">
                    <label className="text-xs text-[#9CA3AF] uppercase font-bold">Número</label>
                    <input className="w-full bg-transparent text-white text-lg mt-1 outline-none" placeholder="1000" />
                </GlassCard>
                <GlassCard className="flex-[2]">
                    <label className="text-xs text-[#9CA3AF] uppercase font-bold">Bairro</label>
                    <input defaultValue="Bela Vista" className="w-full bg-transparent text-white text-lg mt-1 outline-none" />
                </GlassCard>
              </div>
            </div>
            <div className="mt-auto pt-6">
              <GlassButton fullWidth onClick={() => setStep(6)}>Confirmar Endereço</GlassButton>
            </div>
          </>
        )}

        {/* STEP 6: DOC SELECTION */}
        {step === 6 && (
          <>
             <h2 className="text-2xl font-bold text-white mb-2">Documentação</h2>
             <p className="text-[#9CA3AF] mb-6">Qual documento você quer usar?</p>
             <div className="space-y-4">
                <button onClick={() => { setFormData({...formData, docType: 'rg'}); setStep(7); }} className="w-full glass rounded-2xl p-6 flex items-center justify-between hover:bg-white/10 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#3A66FF]/20 flex items-center justify-center text-[#3A66FF]"><FileText /></div>
                      <div className="text-left">
                         <p className="font-bold text-white">RG</p>
                         <p className="text-xs text-[#9CA3AF]">Carteira de Identidade</p>
                      </div>
                   </div>
                   <ChevronRight className="text-white/30" />
                </button>
                <button onClick={() => { setFormData({...formData, docType: 'cnh'}); setStep(7); }} className="w-full glass rounded-2xl p-6 flex items-center justify-between hover:bg-white/10 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4]"><FileText /></div>
                      <div className="text-left">
                         <p className="font-bold text-white">CNH</p>
                         <p className="text-xs text-[#9CA3AF]">Carteira de Motorista</p>
                      </div>
                   </div>
                   <ChevronRight className="text-white/30" />
                </button>
             </div>
          </>
        )}

        {/* STEP 7: DOC CAMERA INSTRUCTION */}
        {step === 7 && (
           <>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <div className="w-24 h-24 rounded-full bg-[#3A66FF]/10 flex items-center justify-center mb-8 relative">
                    <Camera size={48} className="text-[#3A66FF]" />
                    <div className="absolute inset-0 border-2 border-[#3A66FF] border-dashed rounded-full animate-spin-slow" />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-4">Prepare seu documento</h2>
                 <p className="text-[#9CA3AF] max-w-xs mb-8">
                    Retire o documento do plástico e coloque-o sobre uma superfície plana e iluminada. Vamos fotografar a <strong>Frente</strong>.
                 </p>
              </div>
              <div className="mt-auto pt-6">
                <GlassButton fullWidth onClick={() => setStep(8)}>Abrir Câmera</GlassButton>
              </div>
           </>
        )}

        {/* STEP 8: CAMERA UI (FRONT) */}
        {step === 8 && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
             <div className="relative flex-1 bg-gray-900">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-[85%] aspect-[1.58] border-2 border-white/50 rounded-xl relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#06B6D4]" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#06B6D4]" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#06B6D4]" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#06B6D4]" />
                   </div>
                </div>
                <div className="absolute top-8 left-0 right-0 text-center">
                   <p className="text-white font-bold bg-black/50 inline-block px-4 py-1 rounded-full backdrop-blur-md">Frente do Documento</p>
                </div>
             </div>
             <div className="h-32 bg-black flex items-center justify-center gap-8">
                <button onClick={() => setStep(7)} className="text-white">Cancelar</button>
                <button onClick={() => simulateProcessing(9)} className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 active:scale-90 transition-all" />
                <div className="w-12" />
             </div>
          </div>
        )}

        {/* STEP 9: DOC CAMERA INSTRUCTION (BACK) */}
        {step === 9 && (
           <>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <CheckCircle size={64} className="text-[#10B981] mb-6" />
                 <h2 className="text-2xl font-bold text-white mb-4">Frente capturada!</h2>
                 <p className="text-[#9CA3AF] max-w-xs mb-8">
                    Agora vire o documento para fotografarmos o <strong>Verso</strong>.
                 </p>
              </div>
              <div className="mt-auto pt-6">
                <GlassButton fullWidth onClick={() => simulateProcessing(10)} isLoading={loading}>Capturar Verso</GlassButton>
              </div>
           </>
        )}

        {/* STEP 10: SELFIE INSTRUCTION */}
        {step === 10 && (
           <>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <div className="w-24 h-24 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mb-8">
                    <Smile size={48} className="text-[#06B6D4]" />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-4">Prova de Vida</h2>
                 <p className="text-[#9CA3AF] max-w-xs mb-8">
                    Agora precisamos de uma selfie para garantir que é você mesmo. Procure um local iluminado e não use óculos ou boné.
                 </p>
              </div>
              <div className="mt-auto pt-6">
                <GlassButton fullWidth onClick={() => simulateProcessing(11)} isLoading={loading}>Tirar Selfie</GlassButton>
              </div>
           </>
        )}

        {/* STEP 11: REVIEW & TERMS */}
        {step === 11 && (
           <>
             <h2 className="text-2xl font-bold text-white mb-6">Quase lá!</h2>
             <GlassCard className="mb-6">
                <h3 className="font-bold text-white mb-2">Resumo</h3>
                <div className="space-y-2 text-sm">
                   <div className="flex justify-between"><span className="text-[#9CA3AF]">Nome</span><span className="text-white">{formData.name || 'Don Paulo'}</span></div>
                   <div className="flex justify-between"><span className="text-[#9CA3AF]">CPF</span><span className="text-white">{formData.cpf || '123...'}</span></div>
                   <div className="flex justify-between"><span className="text-[#9CA3AF]">Celular</span><span className="text-white">{formData.phone || '(11)...'}</span></div>
                </div>
             </GlassCard>

             <button 
                onClick={() => setFormData({...formData, terms: !formData.terms})}
                className="flex items-start gap-3 mb-6"
              >
                <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-all flex-shrink-0 ${formData.terms ? 'bg-[#3A66FF] border-[#3A66FF]' : 'border-white/30'}`}>
                  {formData.terms && <Check size={12} className="text-white" />}
                </div>
                <span className="text-xs text-[#9CA3AF] text-left leading-relaxed">
                  Li e concordo com os Termos de Uso, Política de Privacidade e autorizo a consulta dos meus dados no SCR/Bacen.
                </span>
              </button>

             <div className="mt-auto pt-6">
                <GlassButton fullWidth disabled={!formData.terms} onClick={() => setStep(12)}>Finalizar Abertura</GlassButton>
             </div>
           </>
        )}

        {/* STEP 12: SUCCESS */}
        {step === 12 && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in duration-500">
             <div className="w-32 h-32 relative mb-8">
                <div className="absolute inset-0 bg-[#10B981]/20 rounded-full animate-ping" />
                <div className="absolute inset-0 bg-[#10B981]/20 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <CheckCircle size={64} className="text-[#10B981]" />
                </div>
             </div>
             
             <h2 className="text-3xl font-bold text-white mb-2 text-center">Sucesso!</h2>
             <p className="text-[#9CA3AF] text-center max-w-xs mb-12">
               Sua conta foi criada e está em análise. Em até 5 minutos você receberá a aprovação.
             </p>

             <GlassButton fullWidth onClick={onComplete}>Acessar App</GlassButton>
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