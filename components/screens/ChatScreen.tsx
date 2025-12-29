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

// [FILE] components/screens/ChatScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Send, Sparkles, Bot, Cpu, Volume2, VolumeX, Settings2, 
  Check, X, TrendingUp, AlertTriangle, ArrowRight, Lightbulb, History, 
  MessageSquare, Plus, Clock, ChevronRight, Trash2
} from 'lucide-react';
import { ScreenProps, ScreenName } from '../../types';
import { generateRaphaResponse } from '../../services/raphaAI';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';

// Interface for Proactive Insights
interface InsightData {
  type: 'warning' | 'opportunity' | 'success';
  title: string;
  message: string;
  metric?: string;
  actionRoute?: ScreenName;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  insight?: InsightData; // Optional payload for rich UI
}

interface ChatSession {
  id: string;
  title: string;
  date: Date;
  messages: ChatMessage[];
  preview: string;
}

// MOCK HISTORY DATA
const MOCK_SESSIONS: ChatSession[] = [
  {
    id: 'session-1',
    title: 'Análise de Investimentos',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    preview: 'Baseado no seu perfil conservador, o CDB é a melhor opção...',
    messages: [
      { id: 'old-1', text: 'Qual o melhor investimento hoje?', sender: 'user', timestamp: new Date() },
      { id: 'old-2', text: 'Baseado no seu perfil conservador, o CDB Regenera com 110% do CDI é a melhor opção para liquidez diária.', sender: 'bot', timestamp: new Date() }
    ]
  },
  {
    id: 'session-2',
    title: 'Dúvida sobre Pix',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    preview: 'O limite noturno do Pix pode ser ajustado em Configurações.',
    messages: [
      { id: 'old-3', text: 'Como aumento meu limite Pix?', sender: 'user', timestamp: new Date() },
      { id: 'old-4', text: 'O limite noturno do Pix pode ser ajustado em Configurações > Segurança. A aprovação leva até 24h.', sender: 'bot', timestamp: new Date() }
    ]
  }
];

export const ChatScreen: React.FC<ScreenProps> = ({ onNavigate, onBack }) => {
  // --- STATE: UI View Mode ---
  const [viewMode, setViewMode] = useState<'chat' | 'history'>('chat');
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(MOCK_SESSIONS);

  // --- STATE: Chat ---
  const [currentSessionId, setCurrentSessionId] = useState<string>('current');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      text: `Olá! Sou a Rapha AI. Estou conectada aos seus dados financeiros em tempo real. Como posso ajudar a multiplicar seu patrimônio hoje?`, 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // --- STATE: Audio/TTS ---
  const [isMuted, setIsMuted] = useState(false);
  const [showVoiceConfig, setShowVoiceConfig] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- LOGIC: Proactive Insights (Only runs once on mount) ---
  useEffect(() => {
    // Only trigger if it's a fresh session and has few messages
    if (currentSessionId === 'current' && messages.length <= 1) {
      const timer = setTimeout(() => {
        const proactiveInsight: ChatMessage = {
          id: 'insight-auto-1',
          text: "Notei um padrão incomum nos seus gastos recentes.",
          sender: 'bot',
          timestamp: new Date(),
          insight: {
            type: 'warning',
            title: 'Alerta de Orçamento',
            message: 'Seus gastos com **Lazer** aumentaram **15%** este mês em comparação à sua média histórica.',
            metric: '+R$ 450,00',
            actionRoute: 'analysis'
          }
        };

        setMessages(prev => [...prev, proactiveInsight]);
        if (!isMuted) speakText("Notei um padrão incomum nos seus gastos com Lazer. Gostaria de analisar?");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentSessionId]);

  // --- EFFECTS: Scroll & Voices ---

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (viewMode === 'chat') {
      scrollToBottom();
    }
  }, [messages, isLoading, viewMode]);

  // Initialize Speech Synthesis
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const ptVoices = voices.filter(v => v.lang.includes('pt') || v.lang.includes('BR'));
      setAvailableVoices(ptVoices.length > 0 ? ptVoices : voices);
      if (!selectedVoice && ptVoices.length > 0) {
        setSelectedVoice(ptVoices[0]);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // --- AUDIO LOGIC ---

  const speakText = (text: string) => {
    if (isMuted || !selectedVoice) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\*\*/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.voice = selectedVoice;
    utterance.lang = 'pt-BR';
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // --- HANDLERS: Session Management ---

  const handleNewChat = () => {
    // If current chat has meaningful messages, save it
    if (messages.length > 2 && currentSessionId === 'current') {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: messages[1]?.text.slice(0, 30) + '...' || 'Nova Conversa',
        date: new Date(),
        messages: messages,
        preview: messages[messages.length - 1].text.slice(0, 50) + '...'
      };
      setChatHistory(prev => [newSession, ...prev]);
    }

    // Reset State
    setCurrentSessionId('current');
    setMessages([{ 
      id: Date.now().toString(), 
      text: `Olá! Sou a Rapha AI. Nova conversa iniciada. Sobre o que vamos falar?`, 
      sender: 'bot', 
      timestamp: new Date() 
    }]);
    setViewMode('chat');
  };

  const handleLoadSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setViewMode('chat');
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(s => s.id !== sessionId));
  };

  // --- HANDLERS: Messaging ---

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    window.speechSynthesis.cancel();

    const userText = input;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      })) as {role: 'user' | 'model', parts: [{text: string}]}[];

      const botResponseText = await generateRaphaResponse(userText, history);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      speakText(botResponseText);

    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Houve um erro de comunicação. Tente novamente.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-[#06B6D4]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // --- COMPONENT: Insight Card ---
  const InsightCard = ({ data }: { data: InsightData }) => {
    const isWarning = data.type === 'warning';
    const accentColor = isWarning ? 'text-[#F59E0B]' : 'text-[#10B981]';
    const borderColor = isWarning ? 'border-[#F59E0B]/30' : 'border-[#10B981]/30';
    const bgColor = isWarning ? 'bg-[#F59E0B]/10' : 'bg-[#10B981]/10';
    const Icon = isWarning ? AlertTriangle : (data.type === 'opportunity' ? Lightbulb : TrendingUp);

    return (
      <div className={`mt-2 mb-1 rounded-2xl p-4 border ${borderColor} ${bgColor} relative overflow-hidden animate-in zoom-in duration-300`}>
        <div className="flex items-start gap-3 relative z-10">
          <div className={`w-10 h-10 rounded-full ${isWarning ? 'bg-orange-500/20' : 'bg-emerald-500/20'} flex items-center justify-center flex-shrink-0`}>
             <Icon size={20} className={accentColor} />
          </div>
          <div className="flex-1">
             <div className="flex justify-between items-start">
                <h4 className={`font-bold text-sm ${accentColor} uppercase tracking-wider mb-1`}>{data.title}</h4>
                {data.metric && <span className="text-white font-bold text-xs bg-black/30 px-2 py-1 rounded-lg">{data.metric}</span>}
             </div>
             <p className="text-white text-sm leading-relaxed">{formatMessageText(data.message)}</p>
             
             {data.actionRoute && (
               <button 
                 onClick={() => data.actionRoute && onNavigate(data.actionRoute)}
                 className="mt-3 flex items-center gap-2 text-xs font-bold text-white hover:text-[#06B6D4] transition-colors group"
               >
                  Ver Análise Detalhada <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
               </button>
             )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0A0E17] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-[#0A0E17]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 flex items-center gap-3">
        <button onClick={viewMode === 'history' ? () => setViewMode('chat') : onBack} className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles size={20} className="text-[#06B6D4]" fill="#06B6D4" /> 
            {viewMode === 'history' ? 'Histórico' : 'Rapha AI'}
          </h1>
          <p className="text-xs text-[#10B981] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" /> Gemini 2.5 Connected
          </p>
        </div>
        
        {/* Header Controls */}
        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
           {viewMode === 'chat' && (
             <>
               <button 
                 onClick={() => setViewMode('history')}
                 className="p-2 text-[#9CA3AF] hover:text-white transition-colors"
                 title="Histórico de Conversas"
               >
                  <History size={20} />
               </button>
               <div className="w-px h-4 bg-white/20" />
               <button 
                 onClick={() => {
                    const newMute = !isMuted;
                    setIsMuted(newMute);
                    if (newMute) window.speechSynthesis.cancel();
                 }} 
                 className="p-2 text-[#9CA3AF] hover:text-white transition-colors"
               >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-[#06B6D4]" />}
               </button>
               <div className="w-px h-4 bg-white/20" />
               <button 
                 onClick={() => setShowVoiceConfig(true)}
                 className="p-2 text-[#9CA3AF] hover:text-white transition-colors"
               >
                  <Settings2 size={20} />
               </button>
             </>
           )}
           {viewMode === 'history' && (
              <button onClick={() => setViewMode('chat')} className="px-3 py-1.5 text-xs font-bold text-white">
                 Voltar ao Chat
              </button>
           )}
        </div>
      </div>

      {/* VIEW: HISTORY LIST */}
      {viewMode === 'history' && (
        <div className="flex-1 overflow-y-auto p-6 space-y-4 animate-in slide-in-from-left duration-300">
           <GlassButton 
              fullWidth 
              onClick={handleNewChat}
              className="bg-gradient-to-r from-[#3A66FF] to-[#06B6D4] text-white shadow-lg shadow-[#3A66FF]/20 group"
           >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Nova Conversa
           </GlassButton>

           <div className="mt-6">
              <h3 className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-4 px-2">Recentes</h3>
              <div className="space-y-3">
                 {chatHistory.length > 0 ? chatHistory.map((session) => (
                    <GlassCard 
                       key={session.id} 
                       onClick={() => handleLoadSession(session)} 
                       className="cursor-pointer hover:bg-white/10 group relative pr-12 active:scale-[0.98] transition-transform"
                       hoverEffect
                    >
                       <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3A66FF]/20 group-hover:text-[#3A66FF] transition-colors">
                             <MessageSquare size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-center mb-1">
                                <h4 className="text-white font-bold text-sm truncate pr-2">{session.title}</h4>
                                <span className="text-[#9CA3AF] text-[10px] flex-shrink-0 flex items-center gap-1">
                                   <Clock size={10} />
                                   {new Date(session.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                </span>
                             </div>
                             <p className="text-[#9CA3AF] text-xs truncate">{session.preview}</p>
                          </div>
                       </div>
                       
                       <button 
                          onClick={(e) => handleDeleteSession(e, session.id)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#9CA3AF] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                       >
                          <Trash2 size={16} />
                       </button>
                       
                       {currentSessionId === session.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3A66FF]" />
                       )}
                    </GlassCard>
                 )) : (
                    <div className="text-center py-12 opacity-50">
                       <MessageSquare size={48} className="mx-auto mb-4 text-[#9CA3AF]" />
                       <p className="text-[#9CA3AF] text-sm">Nenhum histórico encontrado.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* VIEW: ACTIVE CHAT */}
      {viewMode === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Session Indicator */}
            {currentSessionId !== 'current' && (
               <div className="flex justify-center">
                  <span className="text-[10px] bg-white/5 text-[#9CA3AF] px-3 py-1 rounded-full border border-white/5">
                     Visualizando conversa antiga
                  </span>
               </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] ${msg.insight ? 'w-full' : ''}`}>
                  
                  {/* Standard Message Bubble */}
                  {!msg.insight && (
                    <div className={`p-4 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-[#3A66FF] text-white rounded-br-none shadow-lg shadow-[#3A66FF]/20' 
                        : 'bg-gradient-to-br from-white/10 to-white/5 text-white border border-white/10 rounded-bl-none backdrop-blur-sm'
                    }`}>
                      <div className="flex items-start gap-2">
                        {msg.sender === 'bot' && <Bot size={16} className="mt-1 text-[#06B6D4]" />}
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {formatMessageText(msg.text)}
                            {msg.sender === 'bot' && !isMuted && selectedVoice && (
                              <button 
                                  onClick={() => speakText(msg.text)} 
                                  className="ml-2 inline-block opacity-50 hover:opacity-100 align-middle"
                                  aria-label="Ouvir novamente"
                              >
                                  <Volume2 size={12} className="text-[#06B6D4]" />
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Proactive Insight Card (Special Render) */}
                  {msg.insight && (
                    <div className="bg-gradient-to-br from-[#1a1f3d] to-[#0d1025] rounded-2xl rounded-bl-none border border-white/10 p-1 shadow-2xl">
                      <div className="flex items-center gap-2 p-3 pb-0">
                          <Sparkles size={14} className="text-[#06B6D4]" />
                          <span className="text-[10px] text-[#06B6D4] font-bold uppercase tracking-widest">Insight Rapha AI</span>
                      </div>
                      <InsightCard data={msg.insight} />
                    </div>
                  )}

                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="max-w-[85%] p-4 rounded-2xl bg-gradient-to-br from-[#1a1f3d] to-[#0d1025] border border-white/10 rounded-bl-none shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center">
                            <Cpu size={16} className="text-[#06B6D4]" />
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10B981] rounded-full border-2 border-[#0A0E17] animate-pulse"></div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 h-4 px-1">
                              <div className="w-2 h-2 bg-[#06B6D4] rounded-full animate-[bounce_1s_infinite_0ms]" />
                              <div className="w-2 h-2 bg-[#06B6D4] rounded-full animate-[bounce_1s_infinite_200ms]" />
                              <div className="w-2 h-2 bg-[#06B6D4] rounded-full animate-[bounce_1s_infinite_400ms]" />
                          </div>
                          <span className="text-[10px] text-[#9CA3AF] font-medium tracking-wider uppercase pl-0.5 animate-pulse">Analisando Finanças...</span>
                      </div>
                    </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#0A0E17] border-t border-white/10 pb-8 safe-area-bottom">
            <div className="flex items-center gap-2 bg-white/5 rounded-2xl p-2 border border-white/10 focus-within:border-[#3A66FF] transition-colors">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pergunte sobre seus gastos..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-white outline-none placeholder:text-[#9CA3AF] px-2 disabled:opacity-50"
                autoFocus
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-[#3A66FF] rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2A52CC] transition-colors shadow-lg shadow-[#3A66FF]/20"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Voice Selection Modal (Global) */}
      {showVoiceConfig && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
           <div className="w-full max-w-md bg-[#0A0E17] sm:rounded-3xl rounded-t-3xl border border-white/10 shadow-2xl p-6 animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Volume2 className="text-[#06B6D4]" /> Voz & Sotaque
                 </h3>
                 <button onClick={() => setShowVoiceConfig(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                    <X size={20} className="text-white" />
                 </button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                 {availableVoices.length > 0 ? availableVoices.map((voice, idx) => (
                    <button
                       key={idx}
                       onClick={() => {
                          setSelectedVoice(voice);
                          window.speechSynthesis.cancel();
                          const utt = new SpeechSynthesisUtterance("Olá, eu sou a Rapha.");
                          utt.voice = voice;
                          utt.lang = 'pt-BR';
                          window.speechSynthesis.speak(utt);
                       }}
                       className={`w-full p-4 rounded-xl flex items-center justify-between border transition-all
                          ${selectedVoice?.name === voice.name 
                             ? 'bg-[#3A66FF]/20 border-[#3A66FF]' 
                             : 'bg-white/5 border-transparent hover:bg-white/10'}
                       `}
                    >
                       <div className="text-left">
                          <p className={`font-medium ${selectedVoice?.name === voice.name ? 'text-[#3A66FF]' : 'text-white'}`}>
                             {voice.name}
                          </p>
                          <p className="text-xs text-[#9CA3AF]">{voice.lang}</p>
                       </div>
                       {selectedVoice?.name === voice.name && (
                          <div className="w-6 h-6 rounded-full bg-[#3A66FF] flex items-center justify-center">
                             <Check size={14} className="text-white" />
                          </div>
                       )}
                    </button>
                 )) : (
                    <div className="p-4 text-center text-[#9CA3AF]">
                       Nenhuma voz detectada no sistema.
                    </div>
                 )}
              </div>
              
              <div className="mt-6">
                 <button 
                    onClick={() => setShowVoiceConfig(false)}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3A66FF] to-[#06B6D4] text-white font-bold shadow-lg shadow-[#3A66FF]/20"
                 >
                    Confirmar Seleção
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};