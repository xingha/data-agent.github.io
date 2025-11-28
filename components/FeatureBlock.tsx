import React from 'react';

interface FeatureBlockProps {
  title: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({ title, icon, active, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer transition-all duration-300
        overflow-hidden rounded-lg border
        ${active 
          ? 'border-cyan-400 bg-cyan-900/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
          : 'border-slate-700 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-800/60'}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="p-3 flex flex-col items-center justify-center h-20 text-center">
        <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">{icon || '📦'}</div>
        <div className={`text-xs font-bold tracking-wide ${active ? 'text-cyan-300' : 'text-slate-300 group-hover:text-white'}`}>
          {title}
        </div>
      </div>
      
      {/* Tech decoration lines */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50"></div>
    </div>
  );
};
