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

// [FILE] components/screens/RecoveryScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { ScreenProps } from '../../types';

interface RecoveryScreenProps extends ScreenProps {
  onComplete: () => void;
}

export const RecoveryScreen: React.FC<RecoveryScreenProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (step < 4) setStep(step + 1);
      else onComplete();
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto focus next
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col p-6">
      <div className="pt-8 pb-6">
        <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="text-white hover:bg-white/10 p-2 rounded-full transition-all mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">
          {step === 1 && 'Recuperar Acesso'}
          {step === 2 && 'Validar Identidade'}
          {step === 3 && 'Nova Senha'}
          {step === 4 && 'Sucesso'}
        </h1>
        <p className="text-[#9CA3AF] text-sm">
          {step === 1 && 'Informe seu e-mail ou CPF para iniciarmos.'}
          {step === 2 && `Enviamos um código para ${email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}`}
          {step === 3 && 'Crie uma senha forte para sua segurança.'}
        </p>
      </div>

      <div className="flex-1">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right">
            <GlassCard>
              <label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider mb-2 block">E-mail ou CPF</label>
              <div className="flex items-center gap-3">
                <Mail className="text-[#3A66FF]" size={20} />
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-white outline-none placeholder:text-white/20"
                  placeholder="exemplo@email.com"
                  autoFocus
                />
              </div>
            </GlassCard>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right">
             <div className="flex gap-4 justify-center mt-8">
               {otp.map((digit, i) => (
                 <input
                   key={i}
                   id={`otp-${i}`}
                   type="number"
                   value={digit}
                   onChange={(e) => handleOtpChange(i, e.target.value)}
                   className="w-16 h-20 rounded-2xl bg-white/5 border border-white/20 text-center text-3xl font-bold text-white focus:border-[#06B6D4] outline-none transition-all"
                 />
               ))}
             </div>
             <p className="text-center text-sm text-[#3A66FF] font-medium cursor-pointer">Reenviar código</p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in slide-in-from-right">
            <GlassCard>
               <label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider mb-2 block">Nova Senha</label>
               <div className="flex items-center gap-3">
                 <Lock className="text-[#3A66FF]" size={20} />
                 <input 
                   type={showPass ? 'text' : 'password'}
                   value={passwords.new}
                   onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                   className="w-full bg-transparent text-white outline-none"
                   placeholder="••••••••"
                 />
                 <button onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={20} className="text-[#9CA3AF]" /> : <Eye size={20} className="text-[#9CA3AF]" />}
                 </button>
               </div>
            </GlassCard>
            <GlassCard>
               <label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider mb-2 block">Confirmar Senha</label>
               <div className="flex items-center gap-3">
                 <Lock className="text-[#3A66FF]" size={20} />
                 <input 
                   type={showPass ? 'text' : 'password'}
                   value={passwords.confirm}
                   onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                   className="w-full bg-transparent text-white outline-none"
                   placeholder="••••••••"
                 />
               </div>
            </GlassCard>

            <ul className="text-xs text-[#9CA3AF] space-y-2 mt-4 pl-2">
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#3A66FF] rounded-full"/> Mínimo 8 caracteres</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#3A66FF] rounded-full"/> Uma letra maiúscula</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#3A66FF] rounded-full"/> Um número</li>
            </ul>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-[60%] animate-in zoom-in duration-300">
             <div className="w-24 h-24 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-[#10B981]/10">
               <CheckCircle size={48} className="text-[#10B981]" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">Senha Alterada!</h2>
             <p className="text-[#9CA3AF] text-center max-w-[200px]">Use sua nova senha para acessar sua conta.</p>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <GlassButton 
          onClick={step === 4 ? onComplete : handleNext} 
          isLoading={isLoading}
          fullWidth
          disabled={step === 1 && !email}
        >
          {step === 4 ? 'Fazer Login' : 'Continuar'}
        </GlassButton>
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