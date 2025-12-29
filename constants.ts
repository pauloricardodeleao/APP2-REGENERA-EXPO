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

// [FILE] constants.ts
export const THEME = {
  colors: {
    midnight: '#0A0E17',
    deepBlue: '#09158B',
    royalBlue: '#3A66FF',
    cyanNeon: '#06B6D4',
    surface: '#111827',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    textPrimary: '#FFFFFF',
    textSecondary: '#9CA3AF',
  }
};

export const MOCK_USER = {
  name: "Don Paulo",
  balance: 125000000, // 1.250.000,00 (in cents)
  phoneMasked: "(11) 9****-8888",
  emailMasked: "d*******@regenera.com",
  avatarUrl: undefined as string | undefined
};

export const SECURITY_CONFIG = {
  TRANSACTION_LIMIT_NO_2FA: 100000, // R$ 1.000,00 limit before 2FA is required
  OTP_EXPIRATION_SECONDS: 60,
  MAX_RETRIES: 3
};

export const ANIMATIONS = {
  fadeIn: "transition-opacity duration-500 ease-in-out",
  slideUp: "transition-transform duration-500 ease-out",
};

/*
╔══════════════════════════════════════════════════════════════════════════╗
║  REGENERA BANK - PRODUCTION BUILD                                        ║
║  System Status: Stable & Secure                                          ║
║  © 2025 Don Paulo Ricardo de Leão • Todos os direitos reservados         ║
╚══════════════════════════════════════════════════════════════════════════╝
*/