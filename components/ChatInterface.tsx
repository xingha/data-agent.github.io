import React, { useState, useEffect, useRef } from 'react';
import { Send, BarChart2, Zap, FileText, Loader2, Cpu, Activity, Database } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { MOCK_CHART_DATA } from '../constants';

interface ChatInterfaceProps {
  mode: string;
  title: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ mode, title }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset chat when mode changes
  useEffect(() => {
    let initialMsg = '';
    switch(mode) {
      case 'query':
        initialMsg = '您好，我是智能问数助手。我可以帮您快速查询经营数据，请问您想了解什么？';
        break;
      case 'report':
        initialMsg = '您好，我是智能报表助手。我可以为您自动生成多维度的业务报表，请告诉我您的需求。';
        break;
      case 'analysis':
        initialMsg = '您好，我是智能报告助手。我可以为您深度分析业务趋势并生成决策建议。';
        break;
      default:
        initialMsg = '欢迎使用数据智能体。';
    }

    setMessages([{
      role: 'model',
      content: initialMsg,
      timestamp: new Date(),
    }]);
  }, [mode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build history for context
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      // In a real app, we would pass the 'mode' to the system instruction to context-switch the AI
      const responseText = await sendMessageToGemini(userMsg.content, history);
      
      // Heuristic to show a chart 
      const showChart = /报表|趋势|图表|分析|sales|revenue|growth/i.test(userMsg.content) || mode === 'report';

      const modelMsg: Message = {
        role: 'model',
        content: responseText,
        timestamp: new Date(),
        type: showChart ? 'chart' : 'text',
        chartData: showChart ? MOCK_CHART_DATA : undefined
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'model',
        content: "系统繁忙，请稍后再试。",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0b1121] text-slate-200 font-sans relative overflow-hidden">
      {/* Monitor Glare Effect */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-100 tracking-wide text-sm">{title} - 实时交互</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            ONLINE
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed shadow-lg
              ${msg.role === 'user' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-sm' 
                : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-sm backdrop-blur-md'}
            `}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              
              {msg.type === 'chart' && msg.chartData && (
                <div className="mt-3 pt-3 border-t border-slate-700/50">
                   <div className="h-48 w-full min-w-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={msg.chartData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '4px', fontSize: '12px' }}
                          itemStyle={{ color: '#22d3ee' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-[10px] text-slate-400 font-mono bg-slate-900/50 p-2 rounded">
                     <span>数据来源: 联通大数据</span>
                     <span>更新时间: 实时</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/80 px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-700/50 flex items-center gap-2">
              <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
              <span className="text-xs text-slate-400">正在思考...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-slate-900/80 border-t border-slate-700/50">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-slate-950/50 text-slate-100 placeholder-slate-500 rounded-lg pl-3 pr-10 py-3 border border-slate-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none transition-all text-sm"
            placeholder={mode === 'query' ? "输入您想查询的指标..." : "描述您的需求..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        
        {/* Context-aware suggestions */}
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 scrollbar-none opacity-80">
           {mode === 'query' && (
             <>
              <SuggestionChip text="本月营收是多少?" onClick={() => setInput('本月营收是多少?')} />
              <SuggestionChip text="活跃用户趋势" onClick={() => setInput('查看近半年的活跃用户趋势')} />
             </>
           )}
           {mode === 'report' && (
             <>
              <SuggestionChip text="生成月度经营简报" onClick={() => setInput('生成本月经营分析简报')} />
              <SuggestionChip text="导出销售数据" onClick={() => setInput('导出各省份销售数据报表')} />
             </>
           )}
           {mode === 'analysis' && (
             <>
              <SuggestionChip text="分析利润下降原因" onClick={() => setInput('分析本季度利润下降的主要原因')} />
              <SuggestionChip text="预测下月增长" onClick={() => setInput('基于当前数据预测下个月的增长情况')} />
             </>
           )}
        </div>
      </div>
    </div>
  );
};

const SuggestionChip = ({ text, onClick }: { text: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-[10px] text-slate-300 transition-all whitespace-nowrap"
  >
    {text}
  </button>
);
