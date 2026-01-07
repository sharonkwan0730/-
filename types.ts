
export type EmotionColor = 'green' | 'yellow' | 'red' | 'blue';

export interface EmotionDropData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: EmotionColor;
}

export interface Scene {
  id: number;
  title: string;
  thumbnail: string;
  isCompleted: boolean;
  videoUrl: string;
}

export interface CanvasDrop {
  id: string;
  dropId: string;
  x: number;
  y: number;
  color: EmotionColor;
  emoji: string;
}

export interface MusicParams {
  speed: number; // 0 (Turtle) to 100 (Rocket)
  weight: number; // 0 (Feather) to 100 (Elephant)
}

export const EMOTIONS: Record<EmotionColor, EmotionDropData[]> = {
  green: [
    { id: 'g1', name: '好舒服', emoji: '😌', description: '心裡平平穩穩的', color: 'green' },
    { id: 'g2', name: '微微笑', emoji: '😊', description: '很開心的樣子', color: 'green' },
    { id: 'g3', name: '專心喔', emoji: '😳', description: '非常有精神', color: 'green' },
    { id: 'g4', name: '呼口氣', emoji: '😮‍💨', description: '身體放鬆了', color: 'green' },
    { id: 'g5', name: '我可以', emoji: '😏', description: '感覺很有力氣', color: 'green' },
  ],
  yellow: [
    { id: 'y1', name: '想跳舞', emoji: '🤩', description: '停不下來的快樂', color: 'yellow' },
    { id: 'y2', name: '好緊張', emoji: '😰', description: '心跳有一點快', color: 'yellow' },
    { id: 'y3', name: '想說話', emoji: '😬', description: '有很多話想說', color: 'yellow' },
    { id: 'y4', name: '有一點煩', emoji: '😣', description: '不想動腦筋', color: 'yellow' },
    { id: 'y5', name: '轉圈圈', emoji: '🥴', description: '感覺暈暈的', color: 'yellow' },
  ],
  red: [
    { id: 'r1', name: '好生氣', emoji: '😠', description: '像火山噴火', color: 'red' },
    { id: 'r2', name: '嚇一跳', emoji: '😨', description: '全身都在跳', color: 'red' },
    { id: 'r3', name: '腦袋亂', emoji: '😵‍💫', description: '全部分成一團', color: 'red' },
    { id: 'r4', name: '想大叫', emoji: '😱', description: '聲音很大很大', color: 'red' },
    { id: 'r5', name: '大搗蛋', emoji: '🤪', description: '想跑來跑去', color: 'red' },
  ],
  blue: [
    { id: 'b1', name: '想哭哭', emoji: '😢', description: '眼眶濕濕的', color: 'blue' },
    { id: 'b2', name: '沒電了', emoji: '😪', description: '好想休息', color: 'blue' },
    { id: 'b3', name: '悶悶的', emoji: '🤢', description: '肚子不舒服', color: 'blue' },
    { id: 'b4', name: '發呆中', emoji: '😑', description: '什麼都不想做', color: 'blue' },
    { id: 'b5', name: '不想說', emoji: '😶', description: '想安靜一下', color: 'blue' },
  ]
};

export const COLOR_LABEL_MAP: Record<EmotionColor, string> = {
  green: '微風森林',
  yellow: '跳跳暖陽',
  red: '噴火火龍',
  blue: '安靜雨點',
};

export const COLOR_MAP: Record<EmotionColor, string> = {
  green: 'bg-[#4ADE80]', 
  yellow: 'bg-[#FACC15]', 
  red: 'bg-[#F87171]', 
  blue: 'bg-[#60A5FA]', 
};
