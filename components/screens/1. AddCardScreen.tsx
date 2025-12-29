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

// [FILE] components/screens/AddCardScreen.tsx
import React, { useState, ChangeEvent } from 'react';
import { ArrowLeft, CreditCard, Lock, CheckCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';

// ---------------------------------------------------------------------------
// DOMAIN OBJECTS & INTERFACES
// ---------------------------------------------------------------------------

interface CardFormData {
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  cardNumber?: string;
  holderName?: string;
  expiryDate?: string;
  cvv?: string;
  general?: string;
}

// ---------------------------------------------------------------------------
// UTILITIES (Pure Functions - No Side Effects)
// ---------------------------------------------------------------------------

/**
 * Validates credit card number using the Luhn Algorithm.
 * Critical for pre-flight validation before API transmission.
 */
const luhnCheck = (val: string): boolean => {
  const clean = val.replace(/\D/g, '');
  if (clean.length < 13 || clean.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i));
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const parts = [];
  for (let i = 0; i < v.length; i += 4) {
    parts.push(v.substring(i, i + 4));
  }
  return parts.length > 1 ? parts.join(' ') : value;
};

const formatExpiryDate = (value: string): string => {
  const v = value.replace(/\D/g, '');
  if (v.length >= 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  }
  return v;
};

// ---------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// ---------------------------------------------------------------------------

export const AddCardScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: '',
    holderName: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // --- Handlers ---

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) { // Max length for standard formatting
      setFormData(prev => ({ ...prev, cardNumber: formatted }));
      if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: undefined }));
    }
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setFormData(prev => ({ ...prev, expiryDate: formatted }));
      if (errors.expiryDate) setErrors(prev => ({ ...prev, expiryDate: undefined }));
    }
  };

  const handleGenericChange = (field: keyof CardFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const { cardNumber, holderName, expiryDate, cvv } = formData;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    // Card Number Validation
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Número inválido.';
    } else if (!luhnCheck(cardNumber)) {
      newErrors.cardNumber = 'Cartão inválido (Verifique os dígitos).';
    }

    // Holder Name Validation
    if (!holderName || holderName.trim().length < 3) {
      newErrors.holderName = 'Nome impresso obrigatório.';
    }

    // Expiry Validation
    if (!expiryDate || expiryDate.length !== 5) {
      newErrors.expiryDate = 'Inválido.';
    } else {
      const [expMonth, expYear] = expiryDate.split('/').map(Number);
      if (!expMonth || expMonth < 1 || expMonth > 12) {
        newErrors.expiryDate = 'Mês inválido.';
      } else if (!expYear || (expYear < currentYear) || (expYear === currentYear && expMonth < currentMonth)) {
        newErrors.expiryDate = 'Expirado.';
      }
    }

    // CVV Validation
    if (!cvv || cvv.length < 3) {
      newErrors.cvv = 'Inválido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulation of Secure API Gateway Call
    // In production, this would dispatch to a Thunk or Saga
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep(2);
    } catch (error) {
      setErrors({ general: 'Falha na conexão segura. Tente novamente.' });
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Render: Success State ---
  if (step === 2) {
    return (
      <div className="relative min-h-screen bg-[#0A0E17] flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-[#10B981]/10">
          <CheckCircle size={48} className="text-[#10B981]" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Cartão Vinculado</h2>
        <p className="text-[#9CA3AF] text-center mb-8 max-w-xs leading-relaxed">
          Autenticação via Open Finance concluída com sucesso. Tokenização ativa.
        </p>
        <GlassButton fullWidth onClick={() => onNavigate('cards')}>
          Acessar Wallet
        </GlassButton>
      </div>
    );
  }

  // --- Render: Form State ---
  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-6">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/95 backdrop-blur-xl z-50 border-b border-white/5">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="text-white hover:bg-white/10 p-2 rounded-full transition-all disabled:opacity-50"
          aria-label="Voltar"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white tracking-wide">Adicionar Cartão</h1>
      </div>

      <div className="flex-1 px-6 flex flex-col">
        {/* Security Notice */}
        <div className="mb-8 p-4 bg-[#3A66FF]/10 rounded-2xl border border-[#3A66FF]/20 flex gap-3 shadow-[0_0_20px_rgba(58,102,255,0.1)]">
          <ShieldCheck className="text-[#3A66FF] flex-shrink-0" size={20} />
          <p className="text-xs text-[#3A66FF] leading-relaxed font-medium">
            Ambiente criptografado (TLS 1.3). Seus dados são tokenizados e não são armazenados em texto plano.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Card Number */}
          <div>
            <GlassCard className={`${errors.cardNumber ? 'border-red-500/50' : ''}`}>
              <label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">Número do Cartão</label>
              <div className="flex items-center gap-3 mt-2">
                <CreditCard size={20} className={errors.cardNumber ? "text-red-400" : "text-white/50"} />
                <input 
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="0000 0000 0000 0000" 
                  className="w-full bg-transparent text-white text-lg outline-none font-mono placeholder-white/20"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  disabled={isProcessing}
                />
              </div>
            </GlassCard>
            {errors.cardNumber && (
              <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                <AlertCircle size={10} /> {errors.cardNumber}
              </p>
            )}
          </div>

          {/* Holder Name */}
          <div>
            <GlassCard className={`${errors.holderName ? 'border-red-500/50' : ''}`}>
              <label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">Nome Impresso</label>
              <input 
                value={formData.holderName}
                onChange={(e) => handleGenericChange('holderName', e.target.value.toUpperCase())}
                placeholder="NOME COMO NO CARTÃO" 
                className="w-full bg-transparent text-white text-lg mt-2 outline-none uppercase placeholder-white/20"
                autoComplete="cc-name"
                disabled={isProcessing}
              />
            </GlassCard>
            {errors.holderName && <p className="text-red-400 text-xs mt-1 ml-1">{errors.holderName}</p>}
          </div>

          {/* Expiry & CVV Row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <GlassCard className={`${errors.expiryDate ? 'border-red-500/50' : ''}`}>
                <label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">Validade</label>
                <input 
                  value={formData.expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/AA" 
                  className="w-full bg-transparent text-white text-lg mt-2 outline-none font-mono placeholder-white/20"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  disabled={isProcessing}
                />
              </GlassCard>
              {errors.expiryDate && <p className="text-red-400 text-xs mt-1 ml-1">{errors.expiryDate}</p>}
            </div>

            <div className="flex-1">
              <GlassCard className={`${errors.cvv ? 'border-red-500/50' : ''}`}>
                <label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">CVV</label>
                <div className="flex items-center gap-2 mt-2">
                  <Lock size={16} className={errors.cvv ? "text-red-400" : "text-white/50"} />
                  <input 
                    value={formData.cvv}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                        handleGenericChange('cvv', val);
                    }}
                    placeholder="123" 
                    type="password" 
                    className="w-full bg-transparent text-white text-lg outline-none font-mono placeholder-white/20" 
                    maxLength={4}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    disabled={isProcessing}
                  />
                </div>
              </GlassCard>
              {errors.cvv && <p className="text-red-400 text-xs mt-1 ml-1">{errors.cvv}</p>}
            </div>
          </div>
        </div>

        {/* Global Error Message */}
        {errors.general && (
           <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
             <AlertCircle size={16} />
             {errors.general}
           </div>
        )}

        {/* Actions */}
        <div className="mt-auto pt-8">
          <GlassButton 
            fullWidth 
            onClick={handleSubmit} 
            isLoading={isProcessing}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processando Token...' : 'Vincular Cartão'}
          </GlassButton>
          
          <p className="text-center text-[#9CA3AF]/60 text-[10px] mt-4 uppercase tracking-widest">
            Regenera Bank Secure Gateway
          </p>
        </div>
      </div>
    </div>
  );
};
