/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Kids & Gamification
   
  Developer: Don Paulo Ricardo
  CEO: Raphaela Cervesky
   
  ORCID: https://orcid.org/0009-0002-1934-3559
  Copyright © 2025 Regenera Ecosystem. All rights reserved.
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] components/screens/KidsModeScreen.tsx
import React, { useState } from 'react';
import { ArrowLeft, Gamepad2, Gift, Star, Trophy, Target, X, CheckCircle, BrainCircuit } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';

// Mini Game Component
const QuizGame = ({ onFinish }: { onFinish: (score: number) => void }) => {
   const [qIndex, setQIndex] = useState(0);
   const [score, setScore] = useState(0);
   const [finished, setFinished] = useState(false);
   const [selectedAns, setSelectedAns] = useState<number | null>(null);

   const questions = [
      {
         q: "Se você ganhar R$ 50,00 de mesada, qual a melhor atitude?",
         options: ["Gastar tudo em doces", "Guardar uma parte", "Perder o dinheiro"],
         correct: 1
      },
      {
         q: "O que significa 'Juros' quando você investe?",
         options: ["O dinheiro cresce com o tempo", "O banco cobra você", "Você perde dinheiro"],
         correct: 0
      },
      {
         q: "Para que serve uma reserva de emergência?",
         options: ["Comprar brinquedos", "Imprevistos", "Dar para amigos"],
         correct: 1
      }
   ];

   const handleAnswer = (idx: number) => {
      setSelectedAns(idx);
      setTimeout(() => {
         if (idx === questions[qIndex].correct) setScore(s => s + 1);
         if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            setSelectedAns(null);
         } else {
            setFinished(true);
         }
      }, 1000);
   };

   if (finished) {
      return (
         <div className="flex flex-col items-center justify-center h-full animate-in zoom-in">
            <Trophy size={64} className="text-[#F59E0B] mb-4 drop-shadow-lg" />
            <h2 className="text-2xl font-bold text-white mb-2">Quiz Finalizado!</h2>
            <p className="text-white text-lg mb-6">Você acertou <span className="text-[#F59E0B] font-bold">{score}</span> de {questions.length}</p>
            <GlassButton onClick={() => onFinish(score * 50)}>Resgatar {score * 50} XP</GlassButton>
         </div>
      );
   }

   const curr = questions[qIndex];

   return (
      <div className="flex flex-col h-full p-4 animate-in slide-in-from-right">
         <div className="flex justify-between items-center mb-8">
            <span className="text-[#9CA3AF] text-sm">Pergunta {qIndex + 1}/{questions.length}</span>
            <span className="text-[#F59E0B] font-bold flex items-center gap-1"><Star size={14} fill="currentColor"/> {score * 50} XP</span>
         </div>
         
         <h3 className="text-xl font-bold text-white mb-8 text-center">{curr.q}</h3>
         
         <div className="space-y-4">
            {curr.options.map((opt, i) => (
               <button 
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAns !== null}
                  className={`w-full p-4 rounded-xl border transition-all font-medium text-left
                     ${selectedAns === null 
                        ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                        : selectedAns === i 
                           ? (i === curr.correct ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]' : 'bg-red-500/20 border-red-500 text-red-400')
                           : 'opacity-50 border-transparent'
                     }
                  `}
               >
                  {opt}
               </button>
            ))}
         </div>
      </div>
   );
};

export const KidsModeScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [xp, setXp] = useState(700);

  const handleGameFinish = (earnedXp: number) => {
     setXp(prev => prev + earnedXp);
     setIsPlaying(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-6">
       <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/20 to-[#0A0E17] pointer-events-none" />
       
       {/* GAME MODAL */}
       {isPlaying && (
          <div className="fixed inset-0 z-50 bg-[#0A0E17] flex flex-col">
             <div className="p-6 flex justify-end">
                <button onClick={() => setIsPlaying(false)} className="p-2 bg-white/10 rounded-full"><X className="text-white" /></button>
             </div>
             <div className="flex-1 max-w-md mx-auto w-full">
                <QuizGame onFinish={handleGameFinish} />
             </div>
          </div>
       )}

      <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 z-40 bg-[#0A0E17]/80 backdrop-blur-md">
        <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Regenera Kids</h1>
      </div>

      <div className="flex-1 px-6 relative z-10 animate-in slide-in-from-right duration-500">
         
         {/* Level Card */}
         <GlassCard className="bg-[#8B5CF6]/10 border-[#8B5CF6]/30 mb-8 transform hover:scale-[1.02] transition-transform relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-4 relative z-10">
               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white shadow-[0_0_20px_#8B5CF6]">
                  <Trophy size={32} />
               </div>
               <div>
                  <h2 className="text-2xl font-bold text-white">Nível {Math.floor(xp / 200)}</h2>
                  <p className="text-purple-300 font-medium">Mestre da Poupança</p>
               </div>
            </div>
            <div className="mt-4 w-full bg-black/30 h-3 rounded-full overflow-hidden border border-white/10 relative z-10">
               <div 
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] h-full shadow-[0_0_10px_#8B5CF6] transition-all duration-1000" 
                  style={{ width: `${(xp % 1000) / 10}%` }}
               />
            </div>
            <p className="text-right text-xs text-purple-300 mt-2 font-bold relative z-10">{xp} / 1000 XP</p>
         </GlassCard>

         <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Target size={18} className="text-[#F59E0B]" /> Missões da Semana
         </h3>
         <div className="space-y-3">
            <GlassCard className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-colors">
               <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 border border-yellow-500/20 group-hover:scale-110 transition-transform">
                  <Star fill="currentColor" size={20} />
               </div>
               <div className="flex-1">
                  <p className="text-white font-bold">Guardar R$ 10,00</p>
                  <p className="text-xs text-[#9CA3AF]">Recompensa: <span className="text-yellow-400 font-bold">50 XP</span></p>
               </div>
               <button className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/20">Feito</button>
            </GlassCard>
            
            <GlassCard onClick={() => setIsPlaying(true)} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-colors border-[#3A66FF]/40">
               <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <BrainCircuit size={24} />
               </div>
               <div className="flex-1">
                  <p className="text-white font-bold">Quiz Financeiro</p>
                  <p className="text-xs text-[#9CA3AF]">Ganhe até <span className="text-yellow-400 font-bold">150 XP</span></p>
               </div>
               <button className="px-4 py-2 bg-[#3A66FF] rounded-xl text-xs font-bold text-white hover:bg-[#2563EB] shadow-lg shadow-[#3A66FF]/20">Jogar</button>
            </GlassCard>

            <GlassCard className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-colors opacity-70">
               <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 border border-pink-500/20">
                  <Gift size={20} />
               </div>
               <div className="flex-1">
                  <p className="text-white font-bold">Convidar um Amigo</p>
                  <p className="text-xs text-[#9CA3AF]">Desbloqueia em 2 dias</p>
               </div>
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-[10px] text-white/50">🔒</span>
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
};
