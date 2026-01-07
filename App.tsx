
import React, { useState } from 'react';
import SceneRail from './components/SceneRail';
import SoundWorkspace from './components/SoundWorkspace';
import TheaterOverlay from './components/TheaterOverlay';
import { Scene, CanvasDrop, MusicParams } from './types';
import { generateMusicDirection } from './services/geminiService';
import { Music, Sparkles, Wand2 } from 'lucide-react';

const INITIAL_SCENES: Scene[] = [
  { id: 1, title: '初遇', thumbnail: 'https://picsum.photos/seed/scene1/200/200', isCompleted: true, videoUrl: 'https://picsum.photos/seed/stage1/800/600' },
  { id: 2, title: '大冒險', thumbnail: 'https://picsum.photos/seed/scene2/200/200', isCompleted: false, videoUrl: 'https://picsum.photos/seed/stage2/800/800' },
  { id: 3, title: '迷宮挑戰', thumbnail: 'https://picsum.photos/seed/scene3/200/200', isCompleted: false, videoUrl: 'https://picsum.photos/seed/stage3/700/700' },
  { id: 4, title: '對峙時刻', thumbnail: 'https://picsum.photos/seed/scene4/200/200', isCompleted: false, videoUrl: 'https://picsum.photos/seed/stage4/800/600' },
  { id: 5, title: '奇蹟轉折', thumbnail: 'https://picsum.photos/seed/scene5/200/200', isCompleted: false, videoUrl: 'https://picsum.photos/seed/stage5/600/600' },
  { id: 6, title: '完美結局', thumbnail: 'https://picsum.photos/seed/scene6/200/200', isCompleted: false, videoUrl: 'https://picsum.photos/seed/stage6/800/800' },
];

const App: React.FC = () => {
  const [activeSceneId, setActiveSceneId] = useState(1);
  const [scenes, setScenes] = useState(INITIAL_SCENES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [musicReport, setMusicReport] = useState<string | null>(null);
  const [showTheater, setShowTheater] = useState(false);

  const activeScene = scenes.find(s => s.id === activeSceneId) || scenes[0];

  const handlePlayMusic = async (drops: CanvasDrop[], params: MusicParams) => {
    setIsGenerating(true);
    const report = await generateMusicDirection(drops, params);
    setMusicReport(report);
    setIsGenerating(false);
    setShowTheater(true);
    
    setScenes(prev => prev.map(s => s.id === activeSceneId ? { ...s, isCompleted: true } : s));
  };

  const handleRegenerate = () => {
    setShowTheater(false);
    // User can now change things in workspace and click play again
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans font-bold relative">
      {/* Sidebar Scene Navigator */}
      <SceneRail 
        scenes={scenes} 
        activeSceneId={activeSceneId} 
        onSelectScene={(id) => {
            setActiveSceneId(id);
            setMusicReport(null);
            setShowTheater(false);
        }} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header HUD */}
        <header className="px-10 pt-8 pb-2 flex justify-between items-center z-10">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-indigo-600 rounded-[22px] flex items-center justify-center text-white shadow-[0_10px_0_0_#4338ca] -rotate-3 transition-transform hover:rotate-0">
                    <Music size={36} strokeWidth={2.5} />
                </div>
                <div>
                    <h1 className="text-4xl font-kids text-indigo-950 leading-none mb-1 tracking-tight">小小音樂總監</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-0.5 rounded-full font-bold uppercase tracking-widest">Magic Jar Studio</span>
                        <div className="flex gap-1">
                            {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-indigo-300 rounded-full" />)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-3xl shadow-md border border-slate-100">
                <Sparkles size={24} className="text-yellow-400 animate-bounce" />
                <span className="text-xl font-kids text-slate-700">釀造一段神奇配樂吧！</span>
            </div>
        </header>

        {/* Main Work Area Layout */}
        <SoundWorkspace 
            activeSceneVideo={activeScene.videoUrl} 
            onPlay={handlePlayMusic} 
            isGenerating={isGenerating} 
        />

        {/* Theater Experience Overlay */}
        {showTheater && musicReport && (
          <TheaterOverlay 
            videoUrl={activeScene.videoUrl}
            musicReport={musicReport}
            onClose={() => setShowTheater(false)}
            onRegenerate={handleRegenerate}
          />
        )}
      </div>
    </div>
  );
};

export default App;
