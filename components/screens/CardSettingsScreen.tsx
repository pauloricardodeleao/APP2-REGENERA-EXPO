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

// [FILE] components/screens/CardSettingsScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Lock, CreditCard, Shield, Globe, Wifi, Plane, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';

export const CardSettingsScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [view, setView] = useState<'menu' | 'password' | 'replacement'>('menu');
  const [loading, setLoading] = useState(false);
  
  // Toggles State
  const [settings, setSettings] = useState({
    locked: false,
    contactless: true,
    online: true,
    travelNotice: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // --- SUB-SCREEN: CHANGE PASSWORD ---
  if (view === 'password') {
     return (
        <div className="relative min-h-screen bg-[#0A0E17] flex flex-col p-6 animate-in slide-in-from-right">
           <div className="pt-8 pb-6">
              <button onClick={() => setView('menu')} className="text-white hover:bg-white/10 p-2 rounded-full transition-all mb-4"><ArrowLeft size={24} /></button>
              <h1 className="text-2xl font-bold text-white mb-2">Alterar Senha</h1>
              <p className="text-[#9CA3AF]">Crie uma senha de 4 dígitos para compras presenciais.</p>
           </div>
           
           <div className="space-y-4">
              <GlassCard>
                 <label className="text-xs text-[#9CA3AF] uppercase font-bold">Senha Atual</label>
                 <input type="password" maxLength={4} className="w-full bg-transparent text-white text-lg mt-1 outline-none tracking-[1em]" autoFocus />
              </GlassCard>
              <GlassCard>
                 <label className="text-xs text-[#9CA3AF] uppercase font-bold">Nova Senha</label>
                 <input type="password" maxLength={4} className="w-full bg-transparent text-white text-lg mt-1 outline-none tracking-[1em]" />
              </GlassCard>
              <GlassCard>
                 <label className="text-xs text-[#9CA3AF] uppercase font-bold">Confirmar Nova Senha</label>
                 <input type="password" maxLength={4} className="w-full bg-transparent text-white text-lg mt-1 outline-none tracking-[1em]" />
              </GlassCard>
           </div>

           <div className="mt-auto">
              <GlassButton fullWidth onClick={() => { setLoading(true); setTimeout(() => setView('menu'), 1500); }} isLoading={loading}>
                 Confirmar Alteração
              </GlassButton>
           </div>
        </div>
     );
  }

  // --- SUB-SCREEN: CARD REPLACEMENT ---
  if (view === 'replacement') {
    return (
       <div className="relative min-h-screen bg-[#0A0E17] flex flex-col p-6 animate-in slide-in-from-right">
          <div className="pt-8 pb-6">
             <button onClick={() => setView('menu')} className="text-white hover:bg-white/10 p-2 rounded-full transition-all mb-4"><ArrowLeft size={24} /></button>
             <h1 className="text-2xl font-bold text-white mb-2">Segunda Via</h1>
             <p className="text-[#9CA3AF]">Seu cartão atual será cancelado imediatamente após a confirmação.</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
             {loading ? (
                <div className="text-center">
                   <div className="w-16 h-16 border-4 border-[#3A66FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                   <p className="text-white font-bold">Processando solicitação...</p>
                </div>
             ) : (
                <>
                   <GlassCard className="w-full mb-6 border-red-500/30 bg-red-500/5">
                      <div className="flex gap-3">
                         <AlertTriangle className="text-red-400 flex-shrink-0" />
                         <div>
                            <h3 className="text-red-400 font-bold mb-1">Atenção</h3>
                            <p className="text-red-200 text-sm">Esta ação é irreversível. Serviços de assinatura (Netflix, Spotify) precisarão ser atualizados.</p>
                         </div>
                      </div>
                   </GlassCard>
                   
                   <GlassCard className="w-full mb-6">
                      <label className="text-xs text-[#9CA3AF] uppercase font-bold">Motivo</label>
                      <select className="w-full bg-transparent text-white mt-2 outline-none border-b border-white/10 pb-2">
                         <option className="bg-[#0A0E17]">Perda ou Roubo</option>
                         <option className="bg-[#0A0E17]">Cartão Danificado</option>
                         <option className="bg-[#0A0E17]">Não recebi o cartão</option>
                      </select>
                   </GlassCard>

                   <div className="mt-auto w-full">
                     <GlassButton fullWidth variant="danger" onClick={() => { setLoading(true); setTimeout(() => onNavigate('dashboard'), 2000); }}>
                        Confirmar Pedido
                     </GlassButton>
                   </div>
                </>
             )}
          </div>
       </div>
    );
 }

  // --- MAIN MENU ---
  interface ToggleOptionProps {
    icon: any;
    label: string;
    isOn?: boolean;
    onToggle?: () => void;
    onClick?: () => void;
    isDestructive?: boolean;
  }

  const ToggleOption: React.FC<ToggleOptionProps> = ({ icon: Icon, label, isOn, onToggle, onClick, isDestructive }) => (
     <button 
       onClick={onClick || onToggle} 
       className={`w-full flex items-center gap-4 p-4 glass rounded-2xl hover:bg-white/10 transition-all mb-3 group active:scale-[0.98] ${isDestructive ? 'border-red-500/20 hover:bg-red-500/5' : ''}`}
     >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors group-hover:scale-110 ${isDestructive ? 'bg-red-500/10 text-red-400' : 'bg-[#3A66FF]/10 text-[#3A66FF]'}`}>
           <Icon size={20} />
        </div>
        <span className={`flex-1 text-left font-medium ${isDestructive ? 'text-red-400' : 'text-white'}`}>{label}</span>
        
        {onToggle !== undefined ? (
           <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-[#3A66FF]' : 'bg-white/10'}`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${isOn ? 'translate-x-4' : ''}`} />
           </div>
        ) : (
           <ChevronRight size={20} className="text-[#9CA3AF]" />
        )}
     </button>
  );

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-6">
       <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40 border-b border-white/5">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Configurar Cartão</h1>
      </div>

      <div className="px-6 flex-1 flex flex-col">
         {/* Card Preview */}
         <div className="mb-8 mt-2 relative w-full aspect-[2.5/1] bg-gradient-to-r from-[#1a1f4d] to-black rounded-2xl border border-white/10 p-5 flex items-center justify-between shadow-lg">
             <div className="flex flex-col">
                <span className="text-white/60 text-xs font-mono uppercase">Regenera Black</span>
                <span className="text-white font-mono text-lg tracking-widest mt-1">•••• 4521</span>
             </div>
             <div className={`px-3 py-1 rounded-full text-xs font-bold border ${settings.locked ? 'text-red-400 border-red-500/30 bg-red-500/10' : 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10'}`}>
                {settings.locked ? 'BLOQUEADO' : 'ATIVO'}
             </div>
         </div>

         <div className="space-y-1">
            <ToggleOption 
               icon={settings.locked ? Lock : Shield} 
               label="Bloqueio Temporário" 
               isOn={settings.locked} 
               onToggle={() => toggleSetting('locked')} 
               isDestructive={settings.locked}
            />
            
            <ToggleOption 
               icon={Wifi} 
               label="Pagamento por Aproximação" 
               isOn={settings.contactless} 
               onToggle={() => toggleSetting('contactless')} 
            />
            
            <ToggleOption 
               icon={Globe} 
               label="Compras Online" 
               isOn={settings.online} 
               onToggle={() => toggleSetting('online')} 
            />

            <ToggleOption 
               icon={Plane} 
               label="Aviso Viagem" 
               isOn={settings.travelNotice} 
               onToggle={() => toggleSetting('travelNotice')} 
            />

            <div className="h-4" /> {/* Spacer */}

            <ToggleOption icon={Lock} label="Alterar Senha do Cartão" onClick={() => setView('password')} />
            <ToggleOption icon={CreditCard} label="Emitir 2ª via do Cartão" onClick={() => setView('replacement')} />
         </div>
         
         <p className="mt-auto text-center text-[#9CA3AF] text-xs pt-6">
            Identificador do Token: 8829-1029-3847
         </p>
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