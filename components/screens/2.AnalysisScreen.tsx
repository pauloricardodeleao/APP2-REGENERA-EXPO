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

// [FILE] components/screens/AnalysisScreen.tsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Calendar, Filter, ShoppingBag, Coffee, 
  Zap, Car, ArrowDownLeft, Receipt, ChevronDown 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ScreenProps, Transaction } from '../../types';
import { formatCurrency } from '../../services/formatters';
import { GlassCard } from '../ui/GlassCard';
import { BottomNav } from '../Layout/BottomNav';

// Mock Data with strict typing
const MOCK_HISTORY: Partial<Transaction>[] = [
  // MAIO 2025
  { id: '1', description: 'Supermercado Pão', amount: 45050, date: '2025-05-12', category: 'Alimentação', type: 'out' },
  { id: '2', description: 'Uber Trip', amount: 2490, date: '2025-05-11', category: 'Transporte', type: 'out' },
  { id: '3', description: 'Pix Recebido', amount: 500000, date: '2025-05-10', category: 'Entradas', type: 'in' },
  { id: '4', description: 'Netflix', amount: 5590, date: '2025-05-08', category: 'Lazer', type: 'out' },
  { id: '5', description: 'Outback Steakhouse', amount: 32000, date: '2025-05-05', category: 'Alimentação', type: 'out' },
  
  // ABRIL 2025
  { id: '6', description: 'Posto Ipiranga', amount: 25000, date: '2025-04-28', category: 'Transporte', type: 'out' },
  { id: '7', description: 'Salário', amount: 1250000, date: '2025-04-05', category: 'Entradas', type: 'in' },
  { id: '8', description: 'Zara Shopping', amount: 89000, date: '2025-04-15', category: 'Compras', type: 'out' },
  
  // MARÇO 2025
  { id: '9', description: 'Spotify', amount: 2190, date: '2025-03-10', category: 'Lazer', type: 'out' },
];

const CATEGORIES = [
  { id: 'all', label: 'Todos', color: '#FFFFFF' },
  { id: 'Alimentação', label: 'Alimentação', color: '#3A66FF' },
  { id: 'Transporte', label: 'Transporte', color: '#06B6D4' },
  { id: 'Lazer', label: 'Lazer', color: '#8B5CF6' },
  { id: 'Compras', label: 'Compras', color: '#10B981' },
  { id: 'Entradas', label: 'Entradas', color: '#F59E0B' },
];

const PERIODS = [
  { id: '2025-05', label: 'Mai 2025' },
  { id: '2025-04', label: 'Abr 2025' },
  { id: '2025-03', label: 'Mar 2025' },
];

// Hook for smooth number transition
const useAnimatedCounter = (target: number, duration: number = 1000) => {
  const [current, setCurrent] = useState(target);
  const previousRef = useRef(target);
  
  useEffect(() => {
    const start = previousRef.current;
    const end = target;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease Out Quint for smooth landing
      const ease = 1 - Math.pow(1 - progress, 5);
      
      const next = start + (end - start) * ease;
      setCurrent(next);
      previousRef.current = next;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrent(end);
        previousRef.current = end;
      }
    };

    const handle = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(handle);
  }, [target, duration]);

  return current;
};

export const AnalysisScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('2025-05');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isChartLoading, setIsChartLoading] = useState(false);

  // Filter Logic
  const filteredData = useMemo(() => {
    return MOCK_HISTORY.filter(item => {
      if (!item.date || !item.category) return false;
      const matchesPeriod = item.date.startsWith(selectedPeriod);
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesPeriod && matchesCategory;
    });
  }, [selectedPeriod, selectedCategory]);

  // Chart Logic
  const chartData = useMemo(() => {
    const baseData = filteredData.filter(t => selectedCategory === 'Entradas' ? t.type === 'in' : t.type === 'out');
    
    const grouped = baseData.reduce((acc, curr) => {
      if (!curr.category || typeof curr.amount !== 'number') return acc;
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(grouped).map(key => ({
      name: key,
      value: grouped[key],
      color: CATEGORIES.find(c => c.id === key)?.color || '#9CA3AF'
    }));
  }, [filteredData, selectedCategory]);

  const totalSpent = chartData.reduce((sum, d) => sum + d.value, 0);
  const animatedTotal = useAnimatedCounter(totalSpent, 800);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Alimentação': return <Coffee size={18} />;
      case 'Transporte': return <Car size={18} />;
      case 'Lazer': return <Zap size={18} />;
      case 'Compras': return <ShoppingBag size={18} />;
      case 'Entradas': return <ArrowDownLeft size={18} />;
      default: return <Filter size={18} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-2 flex items-center justify-between sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">Extrato & Análise</h1>
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded-full transition-all ${showFilters ? 'bg-[#3A66FF] text-white' : 'bg-white/5 text-[#9CA3AF]'}`}
        >
          <Calendar size={20} />
        </button>
      </div>

      {/* Date Filter */}
      <div className="pt-4 pb-2 px-6">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {PERIODS.map(period => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`
                px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border
                ${selectedPeriod === period.id 
                  ? 'bg-white text-[#0A0E17] border-white' 
                  : 'bg-transparent text-[#9CA3AF] border-white/10 hover:border-white/30'}
              `}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-6 mt-2">
        <div className="relative h-64 w-full flex items-center justify-center">
          {chartData.length > 0 ? (
             <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={6}
                      animationDuration={1000}
                      animationEasing="ease-out"
                      isAnimationActive={true}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                       itemStyle={{ color: '#fff' }}
                       formatter={(value: number) => formatCurrency(value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none transition-all duration-500">
                  <p className="text-[#9CA3AF] text-xs font-medium uppercase tracking-wider mb-1">
                    {selectedCategory === 'Entradas' ? 'Recebido' : 'Gasto Total'}
                  </p>
                  <p className="text-2xl font-bold text-white tracking-tight">
                    {formatCurrency(Math.round(animatedTotal))}
                  </p>
                </div>
             </>
          ) : (
             <div className="text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                   <Filter className="text-white/20" size={32} />
                </div>
                <p className="text-[#9CA3AF] text-sm">Sem dados para este filtro</p>
             </div>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="px-6 mt-6">
         <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider text-opacity-80">Categorias</h3>
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map(cat => (
               <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                     px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2
                     ${selectedCategory === cat.id 
                        ? 'bg-[#3A66FF]/20 text-[#3A66FF] border-[#3A66FF]' 
                        : 'bg-white/5 text-[#9CA3AF] border-transparent hover:bg-white/10'}
                  `}
               >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.label}
               </button>
            ))}
         </div>
      </div>

      {/* Transaction List */}
      <div className="px-6 mt-4 flex-1">
        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider text-opacity-80">
           Transações de {PERIODS.find(p => p.id === selectedPeriod)?.label}
        </h3>
        
        <div className="space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((tx) => (
              <GlassCard key={tx.id} className="flex items-center gap-4 py-3 border border-white/5 animate-in slide-in-from-bottom duration-300" hoverEffect>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                   ${tx.type === 'in' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-white/5 text-white/70'}`}
                >
                  {tx.type === 'in' ? <ArrowDownLeft size={18} /> : getIcon(tx.category!)}
                </div>
                
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{tx.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-[#9CA3AF]">{tx.category}</span>
                     <p className="text-[#9CA3AF] text-xs">
                       {new Date(tx.date!).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                     </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold text-sm ${tx.type === 'in' ? 'text-[#10B981]' : 'text-white'}`}>
                    {tx.type === 'in' ? '+' : '-'} {formatCurrency(tx.amount || 0)}
                  </p>
                </div>
              </GlassCard>
            ))
          ) : (
             <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl animate-in fade-in">
                <p className="text-[#9CA3AF] text-sm">Nenhuma transação encontrada.</p>
             </div>
          )}
        </div>
      </div>

      <BottomNav activeScreen="analysis" onNavigate={onNavigate} />
    </div>
  );
};