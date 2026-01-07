
import React from 'react';
import { X, Share2, RefreshCcw, Heart, Music, MessageCircle, Star } from 'lucide-react';

interface TheaterOverlayProps {
  videoUrl: string;
  musicReport: string;
  onClose: () => void;
  onRegenerate: () => void;
}

const TheaterOverlay: React.FC<TheaterOverlayProps> = ({ videoUrl, musicReport, onClose, onRegenerate }) => {
  const handleShare = (platform: string) => {
    alert(`正在準備你的「${platform}」分享魔法連結... 🎬✨`);
  };

  return (
    <div className="absolute inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Header Info */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 relative z-10 px-4">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/50">
            <Star className="text-yellow-400 fill-current" size={24} />
          </div>
          <h2 className="font-kids text-3xl text-white tracking-widest">魔法首映禮</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
        >
          <X size={28} />
        </button>
      </div>

      {/* Main Theater Screen */}
      <div className="relative w-full max-w-4xl aspect-video rounded-[48px] overflow-hidden shadow-[0_0_100px_rgba(99,102,241,0.3)] border-[8px] border-white/10 bg-black group">
        <img 
          src={videoUrl} 
          alt="Magic Scene" 
          className="w-full h-full object-cover animate-in zoom-in duration-1000"
        />
        
        {/* Visual Equalizer Overlay */}
        <div className="absolute bottom-10 left-10 right-10 flex items-end justify-center gap-1.5 h-16 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 bg-gradient-to-t from-indigo-500 to-sky-300 rounded-full"
              style={{ 
                height: `${Math.random() * 100}%`,
                animation: `equalizer ${0.5 + Math.random()}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
      </div>

      {/* Director's Subtitles */}
      <div className="mt-8 max-w-3xl w-full text-center relative z-10">
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-[40px] border border-white/10 shadow-inner">
          <p className="text-2xl text-indigo-100 font-medium leading-relaxed italic">
            「{musicReport}」
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-10 flex items-center gap-6 relative z-10">
        <button 
          onClick={onRegenerate}
          className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-[24px] font-kids text-xl transition-all border border-white/10 active:scale-95"
        >
          <RefreshCcw size={24} />
          <span>重新釀造</span>
        </button>

        <div className="h-10 w-[2px] bg-white/10" />

        <div className="flex items-center gap-3">
          <span className="text-white/60 font-kids text-lg mr-2">分享成果：</span>
          <button 
            onClick={() => handleShare('LINE')}
            className="w-14 h-14 bg-[#06C755] text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg active:scale-90"
          >
            <MessageCircle size={28} />
          </button>
          <button 
            onClick={() => handleShare('Facebook')}
            className="w-14 h-14 bg-[#1877F2] text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg active:scale-90"
          >
            <Share2 size={28} />
          </button>
          <button 
            onClick={() => handleShare('Instagram')}
            className="w-14 h-14 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg active:scale-90"
          >
            <Star size={28} />
          </button>
        </div>

        <div className="h-10 w-[2px] bg-white/10" />

        <button 
          onClick={onClose}
          className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-[30px] font-kids text-2xl shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95 transition-all"
        >
          <Heart size={26} className="fill-current" />
          <span>我很喜歡！</span>
        </button>
      </div>

      <style>{`
        @keyframes equalizer {
          from { height: 10%; }
          to { height: 100%; }
        }
      `}</style>
    </div>
  );
};

export default TheaterOverlay;
