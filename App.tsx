import React, { useState } from 'react';
import { FeatureBlock } from './components/FeatureBlock';
import { ChatInterface } from './components/ChatInterface';
import { CAPABILITIES, SCENARIOS, ENGINES, MODEL_LAYERS } from './constants';
import { ChevronDown, ChevronUp, CheckCircle, Database, Server, Cpu, Globe } from 'lucide-react';

// Background Component
const TechBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617] overflow-hidden">
    {/* Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    
    {/* Glows */}
    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]"></div>
    <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px]"></div>
    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[300px] bg-indigo-900/10 rounded-full blur-[80px]"></div>
  </div>
);

function App() {
  const [activeCapability, setActiveCapability] = useState('query');

  const activeCapData = CAPABILITIES.find(c => c.id === activeCapability) || CAPABILITIES[0];

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden">
      <TechBackground />

      {/* Main Container */}
      <main className="relative z-10 container mx-auto px-4 lg:px-8 py-6 h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex flex-col items-center mb-8 relative">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-blue-200 text-center shadow-cyan-500/50 drop-shadow-sm">
            中国联通大数据平台-数据智能体
          </h1>
          <div className="mt-2 h-[1px] w-64 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        </header>

        {/* Content Area - Split 60/40 */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start h-full pb-8">
          
          {/* Left Column: Architecture Visualization */}
          <div className="lg:col-span-7 flex flex-col gap-8 perspective-1000">
            
            {/* Layer 1: Scenarios Application */}
            <div className="space-y-3 relative z-30">
              <div className="flex justify-center items-center gap-2">
                 <div className="h-[1px] w-12 bg-slate-700"></div>
                 <h2 className="text-sm text-cyan-400 font-bold uppercase tracking-widest">场景应用</h2>
                 <div className="h-[1px] w-12 bg-slate-700"></div>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {SCENARIOS.map((scenario) => (
                  <FeatureBlock key={scenario.id} title={scenario.title} icon={scenario.icon} />
                ))}
              </div>
              {/* User Groups Pills */}
              <div className="flex justify-between px-4 mt-2">
                <div className="text-[10px] text-slate-400 px-3 py-1 border border-slate-700 rounded-full bg-slate-900/50 backdrop-blur">面向管理人员</div>
                <div className="text-[10px] text-slate-400 px-3 py-1 border border-slate-700 rounded-full bg-slate-900/50 backdrop-blur">面向经营分析人员</div>
                <div className="text-[10px] text-slate-400 px-3 py-1 border border-slate-700 rounded-full bg-slate-900/50 backdrop-blur">面向一线生产人员</div>
              </div>
            </div>

            {/* Layer 2: Core Capabilities (The Platform) */}
            <div className="relative py-10 px-4">
              {/* Visual Platform Base */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent border border-blue-500/10 rounded-[40px] transform skew-x-[-2deg] scale-95 z-0"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent z-0"></div>

              {/* Central Title */}
              <div className="text-center mb-8 relative z-10">
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                  数据智能体三大能力
                </span>
              </div>

              {/* The 3 Interactive Orbs */}
              <div className="grid grid-cols-3 gap-6 relative z-10">
                {CAPABILITIES.map((cap) => {
                  const isActive = activeCapability === cap.id;
                  return (
                    <div 
                      key={cap.id}
                      onClick={() => setActiveCapability(cap.id)}
                      className={`
                        relative group cursor-pointer transition-all duration-500 transform
                        ${isActive ? 'scale-105 -translate-y-2' : 'hover:-translate-y-1 hover:scale-105 opacity-70 hover:opacity-100'}
                      `}
                    >
                      {/* Orb/Button visuals */}
                      <div className={`
                        relative h-32 rounded-2xl border flex flex-col items-center justify-center p-4
                        backdrop-blur-md transition-all duration-300
                        ${isActive 
                          ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/80 to-slate-900/80 shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
                          : 'border-blue-800/50 bg-slate-900/40 hover:border-cyan-500/30'}
                      `}>
                        <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-white' : 'text-cyan-200'}`}>{cap.title}</h3>
                        
                        {/* Dynamic stats based on selection */}
                        {cap.id === 'query' && (
                          <div className="text-xs text-center">
                            <div className="text-slate-400">意图识别准确率</div>
                            <div className="text-amber-400 font-bold text-lg">{cap.accuracy}</div>
                          </div>
                        )}
                        {cap.id === 'report' && (
                          <div className="text-xs text-center">
                             <div className="text-slate-400">报表制作效率提升</div>
                             <div className="text-amber-400 font-bold text-lg">{cap.efficiency}</div>
                          </div>
                        )}
                        {cap.id === 'analysis' && (
                          <div className="text-xs text-center">
                             <div className="text-slate-400">数据洞察</div>
                             <div className="text-amber-400 font-bold text-lg">{cap.speed}</div>
                          </div>
                        )}
                      </div>
                      
                      {/* Connector Line (Visual) */}
                      <div className={`absolute -bottom-6 left-1/2 w-[1px] h-6 bg-gradient-to-b from-cyan-500/50 to-transparent ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    </div>
                  );
                })}
              </div>

              {/* Side Arrows (Visual Decoration from image) */}
              <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-60">
                 <span className="vertical-text text-xs text-white mb-2" style={{writingMode: 'vertical-rl'}}>沉淀增强</span>
                 <div className="w-[2px] h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
                 <ChevronDown className="text-blue-500 animate-bounce" />
              </div>
              <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-60">
                 <ChevronUp className="text-blue-500 animate-bounce" />
                 <div className="w-[2px] h-16 bg-gradient-to-t from-blue-500 to-transparent"></div>
                 <span className="vertical-text text-xs text-white mt-2" style={{writingMode: 'vertical-rl'}}>支撑提效</span>
              </div>
            </div>

            {/* Layer 3: Engines */}
            <div className="space-y-4 relative z-10 px-8">
               <div className="text-center">
                  <span className="text-sm font-bold text-amber-500/80 uppercase tracking-widest">数据智能体四大引擎</span>
               </div>
               <div className="flex justify-between items-center gap-4">
                 {ENGINES.map((eng, idx) => (
                   <div key={idx} className="flex-1 bg-slate-900/60 border border-indigo-500/30 rounded-lg p-3 text-center backdrop-blur-sm shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                      <div className="text-cyan-300 text-xs font-bold">{eng}</div>
                      <div className="h-1 w-full bg-indigo-900/50 mt-2 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500/50 w-[70%] animate-pulse"></div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Layer 4: Foundation (Model) */}
            <div className="mt-auto relative">
               <div className="absolute inset-0 bg-blue-950/50 transform perspective-rotate-x rounded-[100%] blur-xl opacity-50"></div>
               <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-blue-900/40 border-t border-blue-500/30 rounded-t-[40px] p-6 text-center relative overflow-hidden">
                  <div className="text-white font-bold text-lg mb-4 flex items-center justify-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    联通元景大模型
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-blue-200/70">
                    {MODEL_LAYERS.map((layer, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                        {layer}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-xs font-bold text-slate-500 tracking-[0.2em] uppercase">China Unicom Big Data Platform</div>
               </div>
            </div>

          </div>

          {/* Right Column: The "Laptop" Interface */}
          <div className="lg:col-span-5 h-[650px] flex flex-col justify-center perspective-1000 lg:sticky lg:top-8">
             
             {/* Laptop Frame */}
             <div className="relative transform transition-transform duration-700 hover:rotate-y-[-2deg] hover:scale-[1.01]">
                {/* Screen Bezel */}
                <div className="bg-[#1e293b] rounded-t-xl p-2 pb-0 shadow-2xl border border-slate-700 relative z-20">
                  <div className="bg-black rounded-t-lg overflow-hidden border-2 border-slate-800 relative h-[400px]">
                     {/* Camera Dot */}
                     <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-800 rounded-full z-50"></div>
                     
                     {/* Actual React Component functioning as the screen */}
                     <ChatInterface mode={activeCapability} title={activeCapData.title} />
                  </div>
                </div>
                
                {/* Keyboard/Base Deck (Visual only) */}
                <div className="bg-[#334155] h-4 rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 mx-1 border-t border-slate-600">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-600 rounded-b-md"></div>
                </div>

                {/* Reflection/Shadow under laptop */}
                <div className="absolute -bottom-8 left-4 right-4 h-4 bg-black/40 blur-xl rounded-[100%]"></div>
             </div>

             {/* Certifications Area (Below Laptop) */}
             <div className="mt-12 space-y-4">
                <div className="text-center space-y-1">
                   <h3 className="text-cyan-400 font-bold text-sm">国内首批通过泰尔实验室测评认证</h3>
                   <h4 className="text-white font-bold text-sm">通过CNAS测评认证</h4>
                </div>
                <div className="flex justify-center gap-4">
                   {/* Placeholder Certificates */}
                   <div className="w-20 h-28 bg-white/5 border border-slate-600 rounded flex items-center justify-center p-1">
                      <div className="w-full h-full border border-dashed border-slate-500/50 flex flex-col items-center justify-center gap-1">
                         <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center"><CheckCircle className="w-3 h-3 text-amber-500" /></div>
                         <div className="h-1 w-8 bg-slate-600 rounded"></div>
                         <div className="h-1 w-6 bg-slate-600 rounded"></div>
                      </div>
                   </div>
                   <div className="w-20 h-28 bg-white/5 border border-slate-600 rounded flex items-center justify-center p-1">
                       <div className="w-full h-full border border-dashed border-slate-500/50 flex flex-col items-center justify-center gap-1">
                         <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center"><CheckCircle className="w-3 h-3 text-blue-500" /></div>
                         <div className="h-1 w-8 bg-slate-600 rounded"></div>
                         <div className="h-1 w-6 bg-slate-600 rounded"></div>
                      </div>
                   </div>
                   <div className="w-20 h-28 bg-white/5 border border-slate-600 rounded flex items-center justify-center p-1">
                       <div className="w-full h-full border border-dashed border-slate-500/50 flex flex-col items-center justify-center gap-1">
                         <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center"><CheckCircle className="w-3 h-3 text-cyan-500" /></div>
                         <div className="h-1 w-8 bg-slate-600 rounded"></div>
                         <div className="h-1 w-6 bg-slate-600 rounded"></div>
                      </div>
                   </div>
                </div>
             </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
