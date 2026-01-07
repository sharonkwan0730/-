
import React, { useState } from 'react';
import { EMOTIONS, EmotionColor, COLOR_MAP, COLOR_LABEL_MAP, EmotionDropData, CanvasDrop, MusicParams } from '../types';
import { ChevronRight, Eraser, PlayCircle, Loader2, Rocket, Turtle, Feather, Dumbbell, Sparkles, Wand2 } from 'lucide-react';
import StageMonitor from './StageMonitor';

interface SoundWorkspaceProps {
  activeSceneVideo: string;
  onPlay: (drops: CanvasDrop[], params: MusicParams) => void;
  isGenerating: boolean;
}

const SoundWorkspace: React.FC<SoundWorkspaceProps> = ({ activeSceneVideo, onPlay, isGenerating }) => {
  const [activeColor, setActiveColor] = useState<EmotionColor>('green');
  const [canvasDrops, setCanvasDrops] = useState<CanvasDrop[]>([]);
  const [params, setParams] = useState<MusicParams>({ speed: 50, weight: 50 });

  const handleDropToCanvas = (drop: EmotionDropData) => {
    const newDrop: CanvasDrop = {
      id: Math.random().toString(36).substr(2, 9),
      dropId: drop.id,
      emoji: drop.emoji,
      color: drop.color,
      x: Math.random() * 70 + 15,
      y: Math.random() * 60 + 25,
    };
    setCanvasDrops([...canvasDrops, newDrop]);
  };

  const handleClear = () => {
    setCanvasDrops([]);
  };

  return (
    <div className="flex-1 flex flex-col p-6 gap-6 h-full overflow-hidden select-none font-sans">
      {/* Upper Part: Stage & Magic Jar */}
      <div className="flex gap-6 h-[54%]">
        {/* Left: Stage Monitor */}
        <div className="w-[35%] flex flex-col">
            <StageMonitor videoUrl={activeSceneVideo} />
        </div>

        {/* Right: The Magic Jar Container */}
        <div className="flex-1 bg-white rounded-[48px] shadow-2xl p-6 flex flex-col border-4 border-indigo-100 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 p-2.5 rounded-2xl shadow-inner">
                        <Wand2 className="text-indigo-500" size={28} />
                    </div>
                    <h3 className="font-kids text-3xl text-indigo-950">音樂魔法瓶</h3>
                </div>
                <button 
                    onClick={handleClear} 
                    className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-400 transition-all active:scale-90"
                    title="倒掉材料"
                >
                    <Eraser size={24} />
                </button>
            </div>
            
            {/* The Jar Visual Area */}
            <div className="flex-1 relative bg-gradient-to-b from-slate-50 to-indigo-50/30 rounded-t-[100px] rounded-b-[40px] overflow-hidden border-x-4 border-b-4 border-indigo-100/30 shadow-inner">
                {/* Magical Sparkles Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] animate-pulse" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-indigo-200/20 to-transparent" />
                </div>

                {canvasDrops.map((drop) => (
                    <div
                        key={drop.id}
                        className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-4xl ${COLOR_MAP[drop.color]} shadow-xl transition-all duration-700 animate-in zoom-in spin-in-12 border-4 border-white active:scale-125 cursor-grab drop-shadow-md`}
                        style={{ left: `${drop.x}%`, top: `${drop.y}%` }}
                    >
                        {drop.emoji}
                    </div>
                ))}
                
                {canvasDrops.length === 0 && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-300 pointer-events-none">
                        <div className="w-20 h-20 border-4 border-dashed border-indigo-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                             <Sparkles size={32} className="opacity-40" />
                        </div>
                        <p className="font-kids text-2xl tracking-widest opacity-60">在瓶子裡加入情緒材料吧！</p>
                     </div>
                )}
            </div>
        </div>
      </div>

      {/* Lower Part: Ingredients & Spells */}
      <div className="flex gap-6 h-[46%]">
        {/* Ingredients Selection Drawer */}
        <div className="w-[64%] bg-white/80 backdrop-blur-md rounded-[48px] p-6 border-4 border-white shadow-xl flex gap-6">
            {/* Elf Category Sidebar */}
            <div className="flex flex-col gap-3 w-44">
                {(Object.keys(EMOTIONS) as EmotionColor[]).map((color) => (
                    <button
                        key={color}
                        onClick={() => setActiveColor(color)}
                        className={`flex-1 flex flex-col items-center justify-center rounded-3xl font-kids transition-all shadow-md px-3
                            ${COLOR_MAP[color]} ${activeColor === color ? 'ring-4 ring-indigo-200 ring-offset-2 scale-105 z-10 translate-x-2' : 'opacity-40 hover:opacity-100 scale-95'}
                        `}
                    >
                        <span className="text-white text-xl leading-tight font-bold tracking-wide">{COLOR_LABEL_MAP[color]}</span>
                    </button>
                ))}
            </div>

            {/* Ingredients Grid */}
            <div className="flex-1 bg-white/50 rounded-[32px] p-4 border-2 border-indigo-50 overflow-y-auto grid grid-cols-4 gap-4">
                {EMOTIONS[activeColor].map((drop) => (
                    <button
                        key={drop.id}
                        onClick={() => handleDropToCanvas(drop)}
                        className="bg-white p-3 rounded-[32px] flex flex-col items-center justify-center hover:scale-105 transition-all shadow-sm active:scale-95 group border-2 border-transparent hover:border-indigo-100 relative"
                    >
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-4xl mb-2 ${COLOR_MAP[activeColor]} shadow-md group-hover:animate-bounce border-2 border-white`}>
                            {drop.emoji}
                        </div>
                        <span className="text-sm font-bold text-slate-700 font-kids tracking-wide">{drop.name}</span>
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlusCircle size={14} className="text-indigo-400" />
                        </div>
                    </button>
                ))}
            </div>
        </div>

        {/* Magic Spell Controls */}
        <div className="flex-1 flex flex-col gap-4">
            <div className="bg-slate-900 text-white rounded-[44px] p-7 flex-1 shadow-2xl flex flex-col justify-center gap-6 border-b-8 border-slate-950 relative overflow-hidden">
                {/* Decorative Jar Mouth */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-indigo-500/20 rounded-full" />
                
                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="font-kids text-xl text-indigo-200 flex items-center gap-3">
                                🐢 魔法速度 🚀
                            </label>
                            <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-mono text-indigo-300 font-bold">{params.speed}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="100" 
                            value={params.speed}
                            onChange={(e) => setParams({...params, speed: parseInt(e.target.value)})}
                            className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-[#4ADE80] border border-slate-700"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="font-kids text-xl text-indigo-200 flex items-center gap-3">
                                🪶 聲音重量 🐘
                            </label>
                            <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-mono text-indigo-300 font-bold">{params.weight}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="100" 
                            value={params.weight}
                            onChange={(e) => setParams({...params, weight: parseInt(e.target.value)})}
                            className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-[#60A5FA] border border-slate-700"
                        />
                    </div>
                </div>
            </div>

            <button
                disabled={canvasDrops.length === 0 || isGenerating}
                onClick={() => onPlay(canvasDrops, params)}
                className={`py-6 rounded-[36px] flex items-center justify-center gap-4 font-kids text-4xl text-white shadow-2xl transition-all group overflow-hidden relative
                    ${canvasDrops.length === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:scale-[1.03] active:translate-y-2 active:shadow-inner'}
                `}
            >
                {isGenerating ? (
                    <>
                        <Loader2 size={36} className="animate-spin text-indigo-200" />
                        <span className="animate-pulse">正在釀造配樂...</span>
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <PlayCircle size={44} className="group-hover:rotate-[360deg] transition-transform duration-1000" />
                        <span>調製音樂！</span>
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

// Simple icon for selection feedback
const PlusCircle = ({ size, className }: { size: number, className: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
);

export default SoundWorkspace;
