/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Navigation & UX
  Status: Gold Master Build
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] components/Layout/BottomNav.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Home, BarChart2, QrCode, Wallet, User } from 'lucide-react';
import { ScreenName } from '../../types';

interface BottomNavProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  // Navigation mapping logic for active states
  const getActiveTab = (): 'home' | 'analysis' | 'pix' | 'wallet' | 'profile' => {
    if (['dashboard', 'marketplace', 'carbon', 'goals', 'kids', 'pets'].includes(activeScreen)) return 'home';
    if (['analysis'].includes(activeScreen)) return 'analysis';
    if (activeScreen.startsWith('pix') || activeScreen === 'top-up') return 'pix';
    if (['cards', 'add-card', 'card-settings'].includes(activeScreen)) return 'wallet';
    if (['settings', 'support', 'profile-edit', 'notifications'].includes(activeScreen)) return 'profile';
    return 'home';
  };

  const currentTab = getActiveTab();

  const NavItem = ({ id, icon: Icon, label, route }: { id: string, icon: any, label: string, route: ScreenName }) => {
    const isActive = currentTab === id;
    
    return (
      <button 
        onClick={() => onNavigate(route)}
        className="relative flex flex-col items-center justify-center w-16 group outline-none"
      >
        <motion.div
          animate={{ 
            scale: isActive ? 1.1 : 1,
            y: isActive ? -2 : 0
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`mb-1 ${isActive ? 'text-white' : 'text-[#9CA3AF] group-hover:text-white/80'}`}
        >
          <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        </motion.div>
        
        <span className={`text-[10px] font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#9CA3AF]'}`}>
          {label}
        </span>

        {isActive && (
          <motion.div 
            layoutId="nav-indicator"
            className="absolute -bottom-1 w-1 h-1 bg-[#3A66FF] rounded-full shadow-[0_0_8px_#3A66FF]"
          />
        )}
      </button>
    );
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[100] animate-in slide-in-from-bottom-8 duration-700">
      <div className="glass-panel rounded-[2rem] h-[76px] px-4 flex items-center justify-between border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        <NavItem id="home" icon={Home} label="Início" route="dashboard" />
        <NavItem id="analysis" icon={BarChart2} label="Análise" route="analysis" />

        {/* Central PIX Action */}
        <div className="relative -mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('pix')}
            className={`
              w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#0A0E17]
              bg-gradient-to-br from-[#3A66FF] to-[#06B6D4] 
              shadow-[0_10px_25px_rgba(58,102,255,0.5)] text-white
              ${currentTab === 'pix' ? 'ring-2 ring-[#00F0FF]/50' : ''}
            `}
          >
            <QrCode size={28} />
          </motion.button>
          {currentTab === 'pix' && (
            <div className="absolute inset-0 rounded-full animate-ping bg-[#3A66FF]/20 pointer-events-none" />
          )}
        </div>

        <NavItem id="wallet" icon={Wallet} label="Carteira" route="cards" />
        <NavItem id="profile" icon={User} label="Perfil" route="settings" />
      </div>
    </div>
  );
};