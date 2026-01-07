
import React from 'react';
import { Scene } from '../types';
import { Music } from 'lucide-react';

interface SceneRailProps {
  scenes: Scene[];
  activeSceneId: number;
  onSelectScene: (id: number) => void;
}

const SceneRail: React.FC<SceneRailProps> = ({ scenes, activeSceneId, onSelectScene }) => {
  return (
    <div className="w-[15%] h-full bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-4 overflow-y-auto">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">故事場景</h2>
      {scenes.map((scene) => (
        <button
          key={scene.id}
          onClick={() => onSelectScene(scene.id)}
          className={`relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 group
            ${activeSceneId === scene.id ? 'ring-4 ring-indigo-500 scale-110' : 'ring-1 ring-gray-200 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}
          `}
        >
          <img 
            src={scene.thumbnail} 
            alt={scene.title} 
            className="w-full h-full object-cover"
          />
          {scene.isCompleted && (
            <div className="absolute top-1 right-1 bg-yellow-400 p-1 rounded-full shadow-lg border border-white">
              <Music size={12} className="text-white fill-current" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">第 {scene.id} 幕</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SceneRail;
