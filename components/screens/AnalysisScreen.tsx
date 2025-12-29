
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
  Zap, Car, ArrowDownLeft, Settings2, Plus, Edit2, Check, X, Trash2 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ScreenProps, Transaction } from '../../types';
import { formatCurrency } from '../../services/formatters';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';

// Mock Data with strict typing
const MOCK_HISTORY: Partial<Transaction>[] = [
  // MAIO 2025
  { id: '1', description: 'Supermercado Pão', amount: 45050, date: '2025-05-12', category: 'food', type: 'out' },
  { id: '2', description: 'Uber Trip', amount: 2490, date: '2025-05-11', category: 'transport', type: 'out' },
  { id: '3', description: 'Pix Recebido', amount: 500000, date: '2025-05-10', category: 'income', type: 'in' },
  { id: '4', description: 'Netflix', amount: 5590, date: '2025-05-08', category: 'leisure', type: 'out' },
  { id: '5', description: 'Outback Steakhouse', amount: 32000, date: '2025-05-05', category: 'food', type: 'out' },
  
  // ABRIL 2025
  { id: '6', description: 'Posto Ipiranga', amount: 25000, date: '2025-04-28', category: 'transport', type: 'out' },
  { id: '7', description: 'Salário', amount: 1250000, date: '2025-04-05', category: 'income', type: 'in' },
  { id: '8', description: 'Zara Shopping', amount: 89000, date: '2025-04-15', category: 'shopping', type: 'out' },
  
  // MARÇO 2025
  { id: '9', description: 'Spotify', amount: 2190, date: '2025-03-10', category: 'leisure', type: 'out' },
];

interface Category {
  id: string;
  label: string;
  color: string;
}

const INITIAL_CATEGORIES: Category[] = [
  { id: 'all', label: 'Todos', color: '#FFFFFF' },
  { id: 'food', label: 'Alimentação', color: '#3A66FF' },
  { id: 'transport', label: 'Transporte', color: '#06B6D4' },
  { id: 'leisure', label: 'Lazer', color: '#8B5CF6' },
  { id: 'shopping', label: 'Compras', color: '#10B981' },
  { id: 'income', label: 'Entradas', color: '#F59E0B' },
];

const PERIODS = [
  { id: '2025-05', label: 'Mai 2025' },
  { id: '2025-04', label: 'Abr 2025' },
  { id: '2025-03', label: 'Mar 2025' },
];

const AVAILABLE_COLORS = [
  '#3A66FF', '#06B6D4', '#8B5CF6', '#10B981', '#F59E0B', 
  '#EF4444', '#EC4899', '#6366F1', '#14B8A6'
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
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  
  // Modal & Edit State
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState(AVAILABLE_COLORS[0]);

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
    const isIncomeView = selectedCategory === 'income';
    
    const baseData = filteredData.filter(t => {
       if (isIncomeView) return t.type === 'in';
       if (selectedCategory === 'all') return t.type === 'out';
       return t.category === selectedCategory;
    });
    
    const grouped = baseData.reduce((acc, curr) => {
      if (!curr.category || typeof curr.amount !== 'number') return acc;
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(grouped).map(key => ({
      name: categories.find(c => c.id === key)?.label || key,
      value: grouped[key],
      color: categories.find(c => c.id === key)?.color || '#9CA3AF'
    }));
  }, [filteredData, selectedCategory, categories]);

  const totalSpent = chartData.reduce((sum, d) => sum + d.value, 0);
  const animatedTotal = useAnimatedCounter(totalSpent, 800);

  const getIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'food': return <Coffee size={18} />;
      case 'transport': return <Car size={18} />;
      case 'leisure': return <Zap size={18} />;
      case 'shopping': return <ShoppingBag size={18} />;
      case 'income': return <ArrowDownLeft size={18} />;
      default: return <Filter size={18} />;
    }
  };

  // --- Actions ---

  const handleSaveEdit = (id: string) => {
    if (!tempName.trim()) return;
    setCategories(prev => prev.map(c => c.id === id ? { ...c, label: tempName } : c));
    setEditingId(null);
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    const newId = newCategoryName.toLowerCase().replace(/\s+/g, '-');
    
    if (categories.some(c => c.id === newId)) {
       alert('Categoria já existe');
       return;
    }

    const newCat: Category = {
       id: newId,
       label: newCategoryName,
       color: newCategoryColor
    };

    setCategories(prev => [...prev, newCat]);
    setIsAddingNew(false);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (id: string) => {
     setCategories(prev => prev.filter(c => c.id !== id));
     if (selectedCategory === id) setSelectedCategory('all');
  };

  return (
    <div className="relative h-full bg-transparent flex flex-col">
      
      {/* MANAGE CATEGORIES MODAL */}
      {isManageModalOpen && (
         <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center animate-in fade-in">
            <div className="w-full max-w-md bg-[#111827] sm:rounded-3xl rounded-t-3xl border-t border-white/10 p-6 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto no-scrollbar">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Gerenciar Categorias</h3>
                  <button onClick={() => setIsManageModalOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={20} className="text-white"/></button>
               </div>

               {isAddingNew ? (
                  <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-dashed border-white/20 animate-in fade-in">
                     <p className="text-white font-bold mb-3 text-sm">Nova Categoria</p>
                     <input 
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Nome da categoria"
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#3A66FF] mb-3"
                        autoFocus
                     />
                     <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
                        {AVAILABLE_COLORS.map(c => (
                           <button 
                              key={c}
                              onClick={() => setNewCategoryColor(c)}
                              className={`w-8 h-8 rounded-full border-2 flex-shrink-0 transition-all ${newCategoryColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                              style={{ backgroundColor: c }}
                           />
                        ))}
                     </div>
                     <div className="flex gap-2">
                        <GlassButton size="sm" onClick={handleCreateCategory} disabled={!newCategoryName}>Criar</GlassButton>
                        <button onClick={() => setIsAddingNew(false)} className="px-4 py-2 text-sm text-[#9CA3AF]">Cancelar</button>
                     </div>
                  </div>
               ) : (
                  <button 
                     onClick={() => setIsAddingNew(true)}
                     className="w-full py-3 mb-6 border border-dashed border-white/20 rounded-2xl text-[#9CA3AF] text-sm font-medium hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                     <Plus size={16} /> Adicionar Nova Categoria
                  </button>
               )}

               <div className="space-y-2">
                  {categories.filter(c => c.id !== 'all').map(cat => (
                     <div key={cat.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                        {editingId === cat.id ? (
                           <div className="flex-1 flex items-center gap-2">
                              <input 
                                 value={tempName}
                                 onChange={(e) => setTempName(e.target.value)}
                                 className="flex-1 bg-black/30 text-white text-sm px-2 py-1 rounded outline-none"
                                 autoFocus
                              />
                              <button onClick={() => handleSaveEdit(cat.id)} className="p-1.5 bg-[#10B981]/20 text-[#10B981] rounded-lg"><Check size={14} /></button>
                              <button onClick={() => setEditingId(null)} className="p-1.5 bg-red-500/20 text-red-400 rounded-lg"><X size={14} /></button>
                           </div>
                        ) : (
                           <>
                              <span className="flex-1 text-white text-sm font-medium">{cat.label}</span>
                              <button 
                                 onClick={() => { setEditingId(cat.id); setTempName(cat.label); }} 
                                 className="p-2 hover:bg-white/10 rounded-lg text-[#9CA3AF] hover:text-white transition-colors"
                              >
                                 <Edit2 size={14} />
                              </button>
                              {cat.id !== 'income' && (
                                 <button 
                                    onClick={() => handleDeleteCategory(cat.id)}
                                    className="p-2 hover:bg-red-500/20 rounded-lg text-[#9CA3AF] hover:text-red-400 transition-colors"
                                 >
                                    <Trash2 size={14} />
                                 </button>
                              )}
                           </>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )}

      {/* Header */}
      <div className="px-6 pt-12 pb-2 flex items-center justify-between sticky top-0 bg-[#0A0E17]/90 backdrop-blur-md z-40 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">Extrato & Análise</h1>
        </div>
        <button 
          onClick={() => setIsManageModalOpen(true)}
          className="p-2 rounded-full bg-white/5 text-[#9CA3AF] hover:text-white transition-all"
        >
          <Settings2 size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
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
                        {selectedCategory === 'income' ? 'Recebido' : 'Gasto Total'}
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
             <div className="flex justify-between items-end mb-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-opacity-80">Categorias</h3>
                <button onClick={() => setIsManageModalOpen(true)} className="text-[#3A66FF] text-xs font-bold">Editar</button>
             </div>
             <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {categories.map(cat => (
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
          <div className="px-6 mt-4 pb-12">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider text-opacity-80">
               Transações de {PERIODS.find(p => p.id === selectedPeriod)?.label}
            </h3>
            
            <div className="space-y-3">
              {filteredData.length > 0 ? (
                filteredData.map((tx) => {
                   const currentCat = categories.find(c => c.id === tx.category) || { label: tx.category, color: '#fff' };
                   return (
                     <GlassCard key={tx.id} className="flex items-center gap-4 py-3 border border-white/5 animate-in slide-in-from-bottom duration-300" hoverEffect>
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                          ${tx.type === 'in' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-white/5 text-white/70'}`}
                       >
                         {tx.type === 'in' ? <ArrowDownLeft size={18} /> : getIcon(tx.category!)}
                       </div>
                       <div className="flex-1">
                         <p className="text-white font-medium text-sm">{tx.description}</p>
                         <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-[#9CA3AF]">{currentCat.label}</span>
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
                   );
                })
              ) : (
                 <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl animate-in fade-in">
                    <p className="text-[#9CA3AF] text-sm">Nenhuma transação encontrada.</p>
                 </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};
