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

// [FILE] components/ui/GlassButton.tsx
import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  isLoading, 
  fullWidth = false,
  className = '',
  disabled,
  icon,
  ...props 
}) => {
  // Base structural styles
  const baseStyles = "relative overflow-hidden rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 select-none group disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale";
  
  // Interactive animation styles
  const interactionStyles = "active:scale-[0.98] hover:-translate-y-0.5";

  const sizeStyles = {
    sm: "py-2 px-4 text-xs",
    md: "py-4 px-6",
    lg: "py-5 px-8 text-lg"
  };

  const variants = {
    // Primary: Deep gradient with glass overlay, strong shadow
    primary: `
      bg-gradient-to-r from-[#3A66FF] via-[#2563EB] to-[#06B6D4] 
      text-white 
      shadow-[0_8px_20px_-6px_rgba(58,102,255,0.4)] hover:shadow-[0_12px_28px_-8px_rgba(58,102,255,0.6)]
      border-t border-white/20
    `,
    
    // Secondary: Glass effect, subtle border
    secondary: `
      bg-white/5 hover:bg-white/10 
      backdrop-blur-md 
      text-white 
      border border-white/10 hover:border-white/20
      shadow-lg
    `,

    // Outline: Transparent with colored border
    outline: `
      bg-transparent hover:bg-[#3A66FF]/10
      border border-[#3A66FF] 
      text-[#3A66FF] hover:text-white
      shadow-none
    `,
    
    // Ghost: Minimalist, text only
    ghost: `
      bg-transparent hover:bg-white/5 
      text-[#9CA3AF] hover:text-white
      border border-transparent
    `,
    
    // Danger: Error state
    danger: `
      bg-red-500/10 hover:bg-red-500/20 
      text-red-400 hover:text-red-300
      border border-red-500/20 hover:border-red-500/40
      shadow-[0_8px_20px_-6px_rgba(239,68,68,0.2)]
    `
  };

  return (
    <button 
      disabled={disabled || isLoading}
      className={`
        ${baseStyles} 
        ${sizeStyles[size]}
        ${!disabled && !isLoading ? interactionStyles : ''}
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {/* Shine Effect Overlay for Primary Buttons */}
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />
      )}

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center gap-2.5">
        {isLoading ? (
          <>
            <div className={`border-2 border-white/30 border-t-white rounded-full animate-spin ${size === 'sm' ? 'w-3 h-3' : 'w-5 h-5'}`} />
            <span className="opacity-90">Processando...</span>
          </>
        ) : (
          <>
            {icon && <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>}
            {children}
          </>
        )}
      </div>
    </button>
  );
};