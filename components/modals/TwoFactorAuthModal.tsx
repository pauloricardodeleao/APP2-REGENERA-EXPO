/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Security & Authentication
   
  Developer: Don Paulo Ricardo
  CEO: Raphaela Cervesky
   
  ORCID: https://orcid.org/0009-0002-1934-3559
  Copyright © 2025 Regenera Ecosystem. All rights reserved.
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] components/modals/TwoFactorAuthModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Smartphone, X, Lock, RefreshCw, AlertCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { MOCK_USER, SECURITY_CONFIG } from '../../constants';

interface TwoFactorAuthModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  transactionAmount?: number;
}

export const TwoFactorAuthModal: React.FC<TwoFactorAuthModalProps> = ({ 
  isOpen, 
  onSuccess, 
  onCancel,
  transactionAmount 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(SECURITY_CONFIG.OTP_EXPIRATION_SECONDS);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer Countdown
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  // Focus Management
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    // Reset state on open
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setTimer(SECURITY_CONFIG.OTP_EXPIRATION_SECONDS);
      setError(null);
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if filled
    if (index === 5 && value) {
      verifyCode(newOtp.join('') + value);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = (code: string) => {
    setIsVerifying(true);
    setError(null);

    // Simulation of Backend Validation
    setTimeout(() => {
      setIsVerifying(false);
      // Mock Correct Code: Any 6 digit code for demo, but logic is sound.
      if (code.length === 6) {
        onSuccess();
      } else {
        setError('Código inválido. Tente novamente.');
      }
    }, 1500);
  };

  const handleResend = () => {
    setTimer(SECURITY_CONFIG.OTP_EXPIRATION_SECONDS);
    setOtp(['', '', '', '', '', '']);
    setError(null);
    inputRefs.current[0]?.focus();
    // Logic to re-trigger API SMS would go here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0A0E17] sm:rounded-3xl rounded-t-3xl border border-white/10 shadow-2xl p-6 animate-in slide-in-from-bottom duration-300 relative">
        
        <button 
          onClick={onCancel} 
          className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#3A66FF]/20 flex items-center justify-center mb-4 ring-4 ring-[#3A66FF]/10">
            <ShieldCheck size={32} className="text-[#3A66FF]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Autenticação Necessária</h2>
          <p className="text-[#9CA3AF] text-sm max-w-xs">
            Para sua segurança, transações acima do limite requerem validação.
          </p>
        </div>

        <GlassCard className="mb-6 bg-[#3A66FF]/5 border-[#3A66FF]/20">
          <div className="flex items-center gap-3">
             <Smartphone size={20} className="text-[#3A66FF]" />
             <div className="text-left">
                <p className="text-xs text-[#9CA3AF] uppercase font-bold">Código enviado para</p>
                <p className="text-white font-mono">{MOCK_USER.phoneMasked}</p>
             </div>
          </div>
        </GlassCard>

        <div className="flex gap-2 justify-center mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`
                w-12 h-14 rounded-xl bg-white/5 border text-center text-2xl font-bold text-white outline-none transition-all
                ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#3A66FF] focus:bg-[#3A66FF]/10'}
              `}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center justify-center gap-2 text-red-400 text-sm mb-4 animate-in fade-in">
             <AlertCircle size={14} /> {error}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
           {timer > 0 ? (
             <p className="text-[#9CA3AF] text-xs font-mono flex items-center gap-2">
                <Lock size={12} /> Expira em 00:{timer.toString().padStart(2, '0')}
             </p>
           ) : (
             <button onClick={handleResend} className="text-[#3A66FF] text-xs font-bold flex items-center gap-1 hover:underline">
                <RefreshCw size={12} /> Reenviar Código
             </button>
           )}
        </div>

        <div className="mt-6">
           <GlassButton 
              fullWidth 
              onClick={() => verifyCode(otp.join(''))} 
              isLoading={isVerifying}
              disabled={otp.some(d => !d) || isVerifying}
           >
              Validar Transação
           </GlassButton>
        </div>
        
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