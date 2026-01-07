
import React from 'react';
import { Play, Monitor } from 'lucide-react';

interface StageMonitorProps {
  videoUrl: string;
}

const StageMonitor: React.FC<StageMonitorProps> = ({ videoUrl }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 px-1">
        <Monitor size={16} className="text-indigo-400" />
        <span className="font-kids text-sm text-indigo-400 uppercase tracking-tighter">Live Preview</span>
      </div>
      <div className="relative flex-1 bg-gray-900 rounded-[32px] overflow-hidden shadow-xl border-4 border-white ring-4 ring-indigo-100 group cursor-pointer">
        <img 
          src={videoUrl} 
          alt="Stage" 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                <Play size={32} className="text-indigo-600 ml-1 fill-current" />
            </div>
        </div>
        
        <div className="absolute top-3 left-3 bg-red-600/80 px-2 py-0.5 rounded text-[10px] text-white font-bold animate-pulse">
            SCENE {Math.floor(Math.random() * 5) + 1}
        </div>
      </div>
    </div>
  );
};

export default StageMonitor;
