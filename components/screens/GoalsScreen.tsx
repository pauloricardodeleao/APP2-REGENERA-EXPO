// [FILE] components/screens/GoalsScreen.tsx
import React from 'react';
import { ArrowLeft, Target, Plus, Car, Home, Plane } from 'lucide-react';
import { ScreenProps } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { formatCurrency } from '../../services/formatters';

export const GoalsScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const goals = [
    { icon: Car, title: 'Tesla Model 3', current: 4500000, target: 25000000, color: '#3A66FF' },
    { icon: Home, title: 'Casa na Praia', current: 12500000, target: 80000000, color: '#06B6D4' },
    { icon: Plane, title: 'Eurotrip', current: 850000, target: 3000000, color: '#F59E0B' },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-6">
      <div className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">Manifestation Planner</h1>
        </div>
        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-[#3A66FF]"><Plus size={24} /></button>
      </div>

      <div className="flex-1 px-6 space-y-4">
         <div className="p-4 bg-gradient-to-r from-[#3A66FF]/20 to-[#06B6D4]/20 rounded-2xl border border-white/10 mb-6">
            <h2 className="text-white font-bold text-lg mb-1">Eu Sou Próspero</h2>
            <p className="text-[#9CA3AF] text-sm">Visualize suas metas. O Regenera Bank automatiza seus investimentos para alcançá-las.</p>
         </div>

         {goals.map((goal, i) => (
            <GlassCard key={i} className="relative overflow-hidden">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5" style={{ color: goal.color }}>
                     <goal.icon size={24} />
                  </div>
                  <div className="flex-1">
                     <h3 className="text-white font-bold">{goal.title}</h3>
                     <p className="text-xs text-[#9CA3AF]">Faltam {formatCurrency(goal.target - goal.current)}</p>
                  </div>
                  <span className="text-white font-bold">{Math.round((goal.current / goal.target) * 100)}%</span>
               </div>
               
               <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                     className="h-full rounded-full transition-all duration-1000" 
                     style={{ width: `${(goal.current / goal.target) * 100}%`, backgroundColor: goal.color }} 
                  />
               </div>
               <div className="flex justify-between mt-2 text-xs font-medium text-white/50">
                  <span>{formatCurrency(goal.current)}</span>
                  <span>{formatCurrency(goal.target)}</span>
               </div>
            </GlassCard>
         ))}
      </div>
    </div>
  );
};