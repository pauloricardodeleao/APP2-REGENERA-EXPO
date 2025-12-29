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

// [FILE] App.tsx
import React, { useState } from 'react';
import { ScreenName } from './types';
import { BottomNav } from './components/Layout/BottomNav';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RecoveryScreen } from './components/screens/RecoveryScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { BusinessOnboardingScreen } from './components/screens/BusinessOnboardingScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { CardScreen } from './components/screens/CardScreen';
import { AddCardScreen } from './components/screens/AddCardScreen';
import { NewCardOfferScreen } from './components/screens/NewCardOfferScreen';
import { CardSettingsScreen } from './components/screens/CardSettingsScreen';
import { PixScreen } from './components/screens/PixScreen';
import { TransferContactScreen } from './components/screens/TransferContactScreen';
import { ManualTransferScreen } from './components/screens/ManualTransferScreen';
import { AnalysisScreen } from './components/screens/AnalysisScreen';
import { SupportScreen } from './components/screens/SupportScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { ProfileEditScreen } from './components/screens/ProfileEditScreen';
import { LanguageScreen } from './components/screens/LanguageScreen';
import { ThemeScreen } from './components/screens/ThemeScreen';
import { TransactionDetailScreen } from './components/screens/TransactionDetailScreen';
import { TopUpScreen } from './components/screens/TopUpScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { ARInvestmentScreen } from './components/screens/ARInvestmentScreen';

// New Feature Screens
import { InternationalTransferScreen } from './components/screens/InternationalTransferScreen';
import { CarbonScreen } from './components/screens/CarbonScreen';
import { GoalsScreen } from './components/screens/GoalsScreen';
import { KidsModeScreen } from './components/screens/KidsModeScreen';
import { PetSavingsScreen } from './components/screens/PetSavingsScreen';
import { MarketplaceScreen } from './components/screens/MarketplaceScreen';
import { PartnerStoreScreen } from './components/screens/PartnerStoreScreen';

export default function App() {
  const [history, setHistory] = useState<ScreenName[]>(['splash']);
  const currentScreen = history[history.length - 1];

  const navigate = (screen: ScreenName) => {
    if (screen === 'dashboard' || screen === 'login') {
      setHistory([screen]);
    } else {
      setHistory(prev => [...prev, screen]);
    }
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    } else {
      navigate('dashboard');
    }
  };

  // Logic to determine when to show the bottom navigation
  const mainHubScreens: ScreenName[] = [
    'dashboard', 'analysis', 'pix', 'cards', 'settings', 
    'support', 'marketplace', 'goals', 'carbon', 'kids', 'pets'
  ];
  const showNav = mainHubScreens.includes(currentScreen);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-[#3A66FF] selection:text-white flex items-center justify-center p-0 md:p-4">
      <div className="w-full max-w-md min-h-screen md:h-[852px] bg-black md:rounded-[3rem] shadow-2xl relative overflow-hidden md:border-[8px] md:border-[#1a1a1a]">
        
        {/* Dynamic Island (Mobile Look) */}
        <div className="hidden md:block absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 pointer-events-none border border-gray-900" />

        <div className="h-full w-full overflow-y-auto overflow-x-hidden no-scrollbar">
            {currentScreen === 'splash' && <SplashScreen onFinish={() => navigate('login')} />}
            
            {currentScreen === 'login' && (
                <LoginScreen 
                    onLogin={() => navigate('dashboard')} 
                    onRegister={() => navigate('onboarding')}
                    onRegisterPJ={() => navigate('onboarding-pj')}
                    onRecovery={() => navigate('recovery')} 
                />
            )}
            
            {currentScreen === 'recovery' && <RecoveryScreen onBack={goBack} onComplete={() => navigate('login')} onNavigate={navigate} />}
            {currentScreen === 'onboarding' && <OnboardingScreen onBack={goBack} onComplete={() => navigate('dashboard')} onNavigate={navigate} />}
            {currentScreen === 'onboarding-pj' && <BusinessOnboardingScreen onBack={goBack} onComplete={() => navigate('login')} onNavigate={navigate} />}
            
            {currentScreen === 'dashboard' && <DashboardScreen onNavigate={navigate} />}
            {currentScreen === 'ar-view' && <ARInvestmentScreen onNavigate={navigate} onBack={goBack} />}
            
            {/* Cards Module */}
            {currentScreen === 'cards' && <CardScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'add-card' && <AddCardScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'new-card-offer' && <NewCardOfferScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'card-settings' && <CardSettingsScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'card-new' && <NewCardOfferScreen onNavigate={navigate} onBack={goBack} />}
            
            {/* PIX Module */}
            {currentScreen === 'pix' && <PixScreen onNavigate={navigate} onBack={goBack} initialMode="hub" />}
            {currentScreen === 'pix-scan' && <PixScreen onNavigate={navigate} onBack={goBack} initialMode="scan" />}
            {currentScreen === 'pix-transfer' && <PixScreen onNavigate={navigate} onBack={goBack} initialMode="transfer" />}
            {currentScreen === 'pix-amount' && <PixScreen onNavigate={navigate} onBack={goBack} initialMode="amount" />}
            {currentScreen === 'pix-confirm' && <PixScreen onNavigate={navigate} onBack={goBack} initialMode="confirm" />}
            {currentScreen === 'pix-success' && <PixScreen onNavigate={navigate} onBack={goBack} initialMode="success" />}
            {currentScreen === 'pix-receive' && <PixScreen onNavigate={navigate} onBack={goBack} initialMode="receive" />}
            
            {/* Transfers & Payments */}
            {currentScreen === 'transfer-new' && <TransferContactScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'manual-transfer' && <ManualTransferScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'international-transfer' && <InternationalTransferScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'top-up' && <TopUpScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'transaction-detail' && <TransactionDetailScreen onNavigate={navigate} onBack={goBack} />}
            
            {/* Analysis & AI */}
            {currentScreen === 'analysis' && <AnalysisScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'chat' && <ChatScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'carbon' && <CarbonScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'goals' && <GoalsScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'kids' && <KidsModeScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'pets' && <PetSavingsScreen onNavigate={navigate} onBack={goBack} />}
            
            {/* Marketplace & Partners */}
            {currentScreen === 'marketplace' && <MarketplaceScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'partner-amazon' && <PartnerStoreScreen partnerId="amazon" onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'partner-magalu' && <PartnerStoreScreen partnerId="magalu" onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'partner-nike' && <PartnerStoreScreen partnerId="nike" onNavigate={navigate} onBack={goBack} />}
            
            {/* Settings & Support */}
            {currentScreen === 'support' && <SupportScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'settings' && <SettingsScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'profile-edit' && <ProfileEditScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'language' && <LanguageScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'theme' && <ThemeScreen onNavigate={navigate} onBack={goBack} />}
            {currentScreen === 'notifications' && <NotificationsScreen onNavigate={navigate} onBack={goBack} />}
        </div>

        {/* Global Navigation Bar */}
        {showNav && (
          <BottomNav activeScreen={currentScreen} onNavigate={navigate} />
        )}

        {/* Home Indicator */}
        <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
}