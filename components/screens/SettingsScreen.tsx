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

// [FILE] components/screens/SettingsScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Shield, Moon, Globe, LogOut, ChevronRight, Smartphone, LucideIcon, X, Laptop, Tablet, Watch } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { BottomNav } from '../Layout/BottomNav';
import { MOCK_USER } from '../../constants';

interface SettingItemProps {
  icon: LucideIcon;
  label: string;
  value?: string | boolean;
  onClick?: () => void;
  toggle?: () => void;
}

export const SettingsScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [notifs, setNotifs] = useState({ push: true, email: true, offers: false });
  const [biometrics, setBiometrics] = useState(true);
  const [showDevices, setShowDevices] = useState(false);

  // Components
  const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, label, value, onClick, toggle }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0" aria-label={label}>
       <div className="flex items-center gap-4">
         <div className="w-8 h-8 rounded-lg bg-[#3A66FF]/10 flex items-center justify-center text-[#3A66FF]">
            <Icon size={18} />
         </div>
         <span className="text-white font-medium text-sm text-left">{label}</span>
       </div>
       {toggle !== undefined ? (
          <div 
            onClick={(e) => { e.stopPropagation(); toggle(); }}
            className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 cursor-pointer ${value ? 'bg-[#3A66FF]' : 'bg-white/10'}`}
            role="switch"
            aria-checked={Boolean(value)}
          >
             <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${value ? 'translate-x-4' : ''}`} />
          </div>
       ) : (
          <div className="flex items-center gap-2">
             {value && typeof value === 'string' && <span className="text-[#9CA3AF] text-xs">{value}</span>}
             <ChevronRight size={16} className="text-[#9CA3AF]" />
          </div>
       )}
    </button>
  );

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-24">
      {/* DEVICES MODAL */}
      {showDevices && (
         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center animate-in fade-in">
            <div className="w-full max-w-md bg-[#111827] sm:rounded-3xl rounded-t-3xl border-t border-white/10 p-6 animate-in slide-in-from-bottom duration-300">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">Dispositivos Conectados</h3>
                  <button onClick={() => setShowDevices(false)} className="p-2 bg-white/5 rounded-full"><X size={20} className="text-white"/></button>
               </div>
               
               <div className="space-y-3 mb-6">
                  <GlassCard className="flex items-center gap-4 border-[#10B981]/30 bg-[#10B981]/5">
                     <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                        <Smartphone size={20} />
                     </div>
                     <div className="flex-1">
                        <p className="text-white font-bold text-sm">iPhone 14 Pro</p>
                        <p className="text-[#10B981] text-xs">Este dispositivo • São Paulo, BR</p>
                     </div>
                  </GlassCard>
                  
                  <GlassCard className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9CA3AF]">
                        <Laptop size={20} />
                     </div>
                     <div className="flex-1">
                        <p className="text-white font-bold text-sm">MacBook Pro</p>
                        <p className="text-[#9CA3AF] text-xs">Último acesso: Ontem, 14:30</p>
                     </div>
                     <button className="text-red-400 text-xs font-bold">Desconectar</button>
                  </GlassCard>
               </div>
               
               <button onClick={() => setShowDevices(false)} className="w-full py-4 bg-white/5 rounded-2xl text-white font-bold hover:bg-white/10">
                  Fechar
               </button>
            </div>
         </div>
      )}

      <div className="px-6 pt-12 pb-6 sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
        <h1 className="text-2xl font-bold text-white mb-6">Ajustes</h1>
        
        {/* Profile Card */}
        <GlassCard className="flex items-center gap-4 mb-2 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => onNavigate('profile-edit')}>
           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3A66FF] to-[#06B6D4] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[#3A66FF]/20">
              {MOCK_USER.name.charAt(0)}
           </div>
           <div className="flex-1">
              <h3 className="text-white font-bold">{MOCK_USER.name}</h3>
              <p className="text-[#9CA3AF] text-xs">Ag 0001 • CC 12345-6</p>
           </div>
           <span className="text-[#3A66FF] text-sm font-bold">Editar</span>
        </GlassCard>
      </div>

      <div className="flex-1 px-6 space-y-6">
        
        {/* General */}
        <div>
           <h3 className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-3 px-2">Geral</h3>
           <GlassCard className="p-0 overflow-hidden">
              <SettingItem icon={User} label="Meus Dados" onClick={() => onNavigate('profile-edit')} />
              <SettingItem icon={Smartphone} label="Dispositivos Conectados" value="2 Ativos" onClick={() => setShowDevices(true)} />
              <SettingItem icon={Globe} label="Idioma" value="Português (BR)" onClick={() => onNavigate('language')} />
              <SettingItem icon={Moon} label="Aparência" value="Dark Mode" onClick={() => onNavigate('theme')} />
           </GlassCard>
        </div>

        {/* Notifications */}
        <div>
           <h3 className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-3 px-2">Notificações</h3>
           <GlassCard className="p-0 overflow-hidden">
              <SettingItem icon={Bell} label="Push Notifications" value={notifs.push} toggle={() => setNotifs({...notifs, push: !notifs.push})} />
              <SettingItem icon={Bell} label="E-mail" value={notifs.email} toggle={() => setNotifs({...notifs, email: !notifs.email})} />
              <SettingItem icon={Bell} label="Ofertas e Novidades" value={notifs.offers} toggle={() => setNotifs({...notifs, offers: !notifs.offers})} />
           </GlassCard>
        </div>

        {/* Security */}
        <div>
           <h3 className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-3 px-2">Segurança</h3>
           <GlassCard className="p-0 overflow-hidden">
              <SettingItem icon={Shield} label="Alterar Senha do App" onClick={() => onNavigate('recovery')} />
              <SettingItem icon={Shield} label="Alterar Senha do Cartão" onClick={() => onNavigate('card-settings')} />
              <SettingItem icon={Shield} label="Biometria (FaceID)" value={biometrics} toggle={() => setBiometrics(!biometrics)} />
           </GlassCard>
        </div>

        <button 
          onClick={() => onNavigate('login')}
          className="w-full py-4 rounded-2xl border border-red-500/20 text-red-400 font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 transition-all active:scale-[0.98]"
        >
           <LogOut size={20} /> Sair da Conta
        </button>

      </div>

      <BottomNav activeScreen="settings" onNavigate={onNavigate} />
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