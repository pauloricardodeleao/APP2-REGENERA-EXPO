
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

// [FILE] components/screens/LoginScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Fingerprint, ScanFace, Building2, User, Delete, Mail, ArrowRight, CheckCircle, AlertCircle, Mic, Lock, Camera, X } from 'lucide-react';
import { MOCK_USER } from '../../constants';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
  onRegisterPJ: () => void;
  onRecovery: () => void;
}

type LoginStep = 'email' | 'pin' | 'biometric' | 'voice';

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister, onRegisterPJ, onRecovery }) => {
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pin, setPin] = useState('');
  const [isPulsing, setIsPulsing] = useState(false);
  const [showAccountTypeSelection, setShowAccountTypeSelection] = useState(false);
  const [voiceWave, setVoiceWave] = useState<number[]>([]);
  
  // Camera Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  // Innovation: Dynamic Voice Waveform Simulation
  useEffect(() => {
    // FIX: Replaced NodeJS.Timeout with any to resolve namespace error in browser-based React environment
    let interval: any;
    if (step === 'voice') {
      interval = setInterval(() => {
        setVoiceWave(Array.from({ length: 24 }, () => Math.random() * 40 + 10));
      }, 80);
    }
    return () => clearInterval(interval);
  }, [step]);

  // Biometric Camera Handler
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (step === 'biometric') {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user', width: 400, height: 400 } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setCameraActive(true);
          }
        } catch (err) {
          console.error("Biometric Hardware Access Denied", err);
          setCameraError(true);
        }
      }
    };

    if (step === 'biometric') {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setCameraActive(false);
    };
  }, [step]);

  const validateEmail = (value: string) => {
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!value) {
      setEmailError('');
    } else if (!emailRegex.test(value)) {
      setEmailError('Formato de e-mail inválido');
    } else {
      setEmailError('');
    }
  };

  const handleEmailSubmit = () => {
    if (!emailError && email.length > 0) {
      setStep('pin');
    }
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 6) {
        setTimeout(() => onLogin(), 600);
      }
    }
  };

  const handleDelete = () => setPin(prev => prev.slice(0, -1));

  const handleBiometricScan = () => {
    setIsPulsing(true);
    // Simulate Face Analysis
    setTimeout(() => {
      setIsPulsing(false);
      onLogin();
    }, 2000);
  };

  const handleVoiceAuth = () => {
    setStep('voice');
    setTimeout(() => {
      onLogin();
    }, 3000);
  };

  // --- Render: Account Type Selection ---
  if (showAccountTypeSelection) {
    return (
      <div className="relative h-full w-full bg-[#0A0E17] flex flex-col min-h-screen p-6 animate-in slide-in-from-bottom">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Tipo de Conta</h2>
          <p className="text-[#9CA3AF] text-center mb-8">Escolha sua modalidade de acesso.</p>
          
          <div className="space-y-4">
            <GlassCard onClick={onRegister} className="cursor-pointer group hover:bg-white/10" hoverEffect>
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#3A66FF]/20 flex items-center justify-center text-[#3A66FF] group-hover:scale-110 transition-transform">
                    <User size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Para Você (PF)</h3>
                    <p className="text-xs text-[#9CA3AF]">CPF, investimentos e cartões black.</p>
                  </div>
               </div>
            </GlassCard>

            <GlassCard onClick={onRegisterPJ} className="cursor-pointer group hover:bg-white/10" hoverEffect>
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] group-hover:scale-110 transition-transform">
                    <Building2 size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Para Empresa (PJ)</h3>
                    <p className="text-xs text-[#9CA3AF]">CNPJ, folha e gestão multi-usuários.</p>
                  </div>
               </div>
            </GlassCard>
          </div>

          <button onClick={() => setShowAccountTypeSelection(false)} className="mt-8 text-white/50 text-sm py-4">Cancelar</button>
        </div>
      </div>
    );
  }

  // --- Render: Main Login Flow ---
  return (
    <div className="relative h-full w-full bg-black flex flex-col min-h-screen overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#3A66FF]/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Logo */}
      <div className="relative z-10 pt-20 px-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-3xl bg-black border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(58,102,255,0.3)] mb-8 relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-[#3A66FF] to-[#06B6D4] opacity-20 rounded-3xl group-hover:opacity-30 transition-opacity" />
             <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#3A66FF] to-[#00F0FF]">R</span>
        </div>
        
        {step === 'email' ? (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Regenera Access</h1>
            <p className="text-[#9CA3AF] text-sm font-medium">Identifique-se para entrar no Quantum Core</p>
          </div>
        ) : (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold text-white mb-2">Olá, {MOCK_USER.name.split(' ')[0]}</h1>
            <button onClick={() => { setStep('email'); setPin(''); }} className="text-[#3A66FF] text-xs font-bold hover:underline">
               Não é você? Trocar conta
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-end pb-10 relative z-10 mt-8 px-6">
        
        {/* STEP 1: EMAIL */}
        {step === 'email' && (
           <div className="w-full max-w-sm mx-auto animate-in slide-in-from-right duration-500">
              <GlassCard className={`mb-6 ${emailError ? 'border-red-500/50' : ''}`} variant="neo">
                 <label className="text-xs text-[#06B6D4] uppercase font-bold tracking-wider mb-2 block">ID Corporativo / CPF</label>
                 <div className="flex items-center gap-3">
                    <Mail className={emailError ? "text-red-400" : "text-[#3A66FF]"} size={20} />
                    <input 
                       value={email}
                       onChange={(e) => validateEmail(e.target.value)}
                       className="w-full bg-transparent text-white outline-none placeholder:text-white/20 text-lg font-medium"
                       placeholder="seu@regenera.com"
                       autoFocus
                       type="email"
                    />
                    {email && !emailError && <CheckCircle size={18} className="text-[#10B981]" />}
                 </div>
              </GlassCard>
              
              {emailError && (
                 <div className="flex items-center gap-2 text-red-400 text-sm mb-4 px-2 animate-in fade-in">
                    <AlertCircle size={14} /> {emailError}
                 </div>
              )}

              <GlassButton 
                 fullWidth 
                 onClick={handleEmailSubmit} 
                 disabled={!email || !!emailError}
                 icon={<ArrowRight size={20} />}
                 className="shadow-[0_0_30px_rgba(58,102,255,0.4)]"
              >
                 Iniciar Sessão
              </GlassButton>
           </div>
        )}

        {/* STEP 2: PIN PAD */}
        {step === 'pin' && (
          <div className="animate-in slide-in-from-right duration-500 fade-in w-full">
            <div className="flex justify-center gap-4 mb-10 h-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i < pin.length 
                      ? 'bg-[#00F0FF] shadow-[0_0_15px_#00F0FF] scale-125' 
                      : 'bg-white/10 border border-white/5'
                  }`}
                />
              ))}
            </div>

            <div className="px-2 grid grid-cols-3 gap-y-6 gap-x-8 max-w-sm mx-auto w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (item === 'del') handleDelete();
                    else if (item !== '') handlePinInput(String(item));
                  }}
                  className={`
                    h-16 w-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto transition-all duration-150 select-none
                    ${item === '' ? 'opacity-0 pointer-events-none' : ''}
                    ${item === 'del' 
                        ? 'text-[#9CA3AF] active:text-white' 
                        : 'bg-white/5 hover:bg-white/10 active:bg-white/20 active:scale-95 border border-white/5'
                    }
                  `}
                >
                  {item === 'del' ? <Delete size={24} /> : item}
                </button>
              ))}
            </div>

            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={() => setStep('biometric')}
                className="flex items-center gap-2 text-[#06B6D4] font-bold text-sm py-3 px-6 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 hover:bg-[#06B6D4]/20 transition-all"
              >
                <ScanFace size={20} />
              </button>
              <button
                onClick={handleVoiceAuth}
                className="flex items-center gap-2 text-[#3A66FF] font-bold text-sm py-3 px-6 rounded-full bg-[#3A66FF]/10 border border-[#3A66FF]/30 hover:bg-[#3A66FF]/20 transition-all"
              >
                <Mic size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: BIOMETRIC SCAN (REAL CAMERA) */}
        {step === 'biometric' && (
          <div className="flex flex-col items-center justify-center flex-1 -mt-20 animate-in zoom-in duration-300">
            
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#3A66FF]/30 mb-8 shadow-[0_0_50px_rgba(58,102,255,0.2)]">
               {!cameraError ? (
                  <>
                     <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover transform scale-x-[-1]" 
                     />
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                     
                     {/* Scanning Grid Overlay */}
                     <div className="absolute inset-0 z-10">
                        <div className="w-full h-full border border-[#00F0FF]/30 rounded-full opacity-50"></div>
                        <div className={`absolute top-0 w-full h-1 bg-[#00F0FF] shadow-[0_0_20px_#00F0FF] ${isPulsing ? 'animate-[scan_1s_ease-in-out_infinite]' : 'top-1/2 opacity-50'}`} />
                        <style>{`@keyframes scan { 0% { top: 0% } 50% { top: 100% } 100% { top: 0% } }`}</style>
                     </div>
                     
                     {/* Corner Brackets */}
                     <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-[#00F0FF]" />
                     <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-[#00F0FF]" />
                     <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-[#00F0FF]" />
                     <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-[#00F0FF]" />
                  </>
               ) : (
                  <div className="w-full h-full bg-[#111] flex items-center justify-center">
                     <Camera size={48} className="text-white/20" />
                  </div>
               )}
            </div>

            <h2 className="text-white font-bold text-lg tracking-wide mb-1">
               {isPulsing ? 'Analisando Biometria...' : 'Posicione seu rosto'}
            </h2>
            <p className="text-[#9CA3AF] text-sm">
               {cameraError ? 'Câmera indisponível' : 'Olhe diretamente para a câmera'}
            </p>
            
            <div className="mt-8 flex gap-4">
               {!isPulsing && !cameraError && (
                  <GlassButton onClick={handleBiometricScan} className="px-8" icon={<ScanFace size={18} />}>
                     Confirmar
                  </GlassButton>
               )}
               <button
                  onClick={() => setStep('pin')}
                  className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
               >
                  Usar Senha
               </button>
            </div>
          </div>
        )}

        {/* STEP 4: VOICE AUTHENTICATION */}
        {step === 'voice' && (
           <div className="flex flex-col items-center justify-center flex-1 -mt-20 animate-in zoom-in duration-300">
              <div className="h-32 flex items-center justify-center gap-1.5">
                 {voiceWave.map((h, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-gradient-to-t from-[#3A66FF] to-[#00F0FF] rounded-full transition-all duration-75 shadow-[0_0_10px_#00F0FF]"
                      style={{ height: `${h}px` }}
                    />
                 ))}
              </div>
              <p className="text-white mt-8 font-bold text-lg animate-pulse">Diga "Acessar Regenera"</p>
              <p className="text-[#00F0FF] text-xs uppercase tracking-[0.2em] mt-2 font-bold">Biometria Vocal Ativa</p>
           </div>
        )}
        
        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <button onClick={onRecovery} className="text-[#3A66FF] font-medium text-sm hover:underline">
            Esqueci minha senha
          </button>
          <button onClick={() => setShowAccountTypeSelection(true)} className="w-full py-4 text-white/40 text-sm hover:text-white transition-colors border-t border-white/5 mt-4">
            Não é cliente? <span className="text-white font-bold ml-1">Abra sua conta</span>
          </button>
        </div>
      </div>
    </div>
  );
};
