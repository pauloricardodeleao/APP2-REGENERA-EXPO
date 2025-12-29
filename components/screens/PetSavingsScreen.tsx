// [FILE] components/screens/PetSavingsScreen.tsx
import React from 'react';
import { ArrowLeft, Heart, Bone, ShieldCheck, Activity, Plus } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';

export const PetSavingsScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-6">
       <div className="absolute inset-0 bg-gradient-to-b from-[#EC4899]/20 to-[#0A0E17] pointer-events-none" />
       
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 z-40 bg-[#0A0E17]/80 backdrop-blur-md">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Pet Savings</h1>
      </div>

      <div className="flex-1 px-6 relative z-10 flex flex-col items-center animate-in slide-in-from-right duration-500">
         
         {/* Pet Avatar */}
         <div className="relative mb-6 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 p-1 relative z-10 shadow-2xl">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black">
                    <span className="text-5xl transform group-hover:scale-110 transition-transform">🐶</span>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg z-20">
               <Heart size={16} className="text-red-500 fill-current" />
            </div>
         </div>

         <h2 className="text-2xl font-bold text-white">Thor</h2>
         <p className="text-[#EC4899] font-medium mb-8 bg-[#EC4899]/10 px-4 py-1 rounded-full border border-[#EC4899]/20">
            Golden Retriever • 2 anos
         </p>

         {/* Stats Grid */}
         <div className="grid grid-cols-2 gap-4 w-full mb-6">
            <GlassCard className="text-center flex flex-col items-center border-[#EC4899]/30 bg-[#EC4899]/5">
               <div className="w-10 h-10 rounded-full bg-[#EC4899]/20 flex items-center justify-center text-[#EC4899] mb-2">
                  <Activity size={20} />
               </div>
               <p className="text-[#9CA3AF] text-xs uppercase font-bold">Reserva Vet</p>
               <p className="text-white font-bold text-xl mt-1">R$ 1.200</p>
            </GlassCard>
            <GlassCard className="text-center flex flex-col items-center border-[#10B981]/30 bg-[#10B981]/5">
               <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-2">
                  <ShieldCheck size={20} />
               </div>
               <p className="text-[#9CA3AF] text-xs uppercase font-bold">Seguro Pet</p>
               <p className="text-[#10B981] font-bold text-xl mt-1">Ativo</p>
            </GlassCard>
         </div>

         {/* Health Card */}
         <div className="w-full bg-[#EC4899]/10 rounded-2xl p-5 border border-[#EC4899]/20 mb-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-10">
               <Bone size={80} className="text-[#EC4899]" />
            </div>
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
               <div className="p-2 bg-[#EC4899] rounded-lg shadow-lg shadow-[#EC4899]/30">
                  <ShieldCheck className="text-white" size={20} />
               </div>
               <span className="text-white font-bold text-lg">Cobertura Premium</span>
            </div>
            
            <div className="space-y-2 relative z-10">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-[#9CA3AF]">Próxima vacina</span>
                  <span className="text-white font-medium bg-white/10 px-2 py-0.5 rounded">12/Jun</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-[#9CA3AF]">Vermífugo</span>
                  <span className="text-[#10B981] font-medium flex items-center gap-1"><ShieldCheck size={12}/> Em dia</span>
               </div>
            </div>
         </div>

         {/* Action */}
         <GlassButton fullWidth className="mt-auto bg-gradient-to-r from-[#EC4899] to-[#DB2777] border-none shadow-lg shadow-[#EC4899]/30 group">
            <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform" />
            Adicionar Saldo (Ração & Mimos)
         </GlassButton>
      </div>
    </div>
  );
};