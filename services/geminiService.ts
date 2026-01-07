
import { GoogleGenAI } from "@google/genai";
import { CanvasDrop, MusicParams, COLOR_LABEL_MAP } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMusicDirection = async (drops: CanvasDrop[], params: MusicParams) => {
  if (drops.length === 0) return "請先在魔法瓶中加入一些情緒精靈喔！";

  const mixSummary = drops.reduce((acc, drop) => {
    const label = `${COLOR_LABEL_MAP[drop.color]}-${drop.emoji}`;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const speedDesc = params.speed < 30 ? "像小蝸牛慢慢走" : params.speed > 70 ? "像火箭飛上天" : "像輕快的散步";
  const weightDesc = params.weight < 30 ? "像羽毛飄來飄去" : params.weight > 70 ? "像大岩石壓地" : "剛剛好的重量";

  const prompt = `
    你是一位國小戲劇課的魔法音樂總監。小朋友在「音樂魔法瓶」中調製了以下配方：
    ${Object.entries(mixSummary).map(([label, count]) => `- ${label} 精靈 x ${count}個`).join('\n')}
    
    魔法咒語設定：
    - 咒語速度：${params.speed}% (${speedDesc})
    - 聲音重量：${params.weight}% (${weightDesc})
    
    請以此為基礎，為小朋友寫一段「音樂總監的魔法筆記」。
    要求：
    1. 語氣超級親切、富有想像力，把情緒精靈的名字融入配樂描述。
    2. 解釋這些精靈組合起來（例如微風森林的平靜加上跳跳暖陽的活力）會變成什麼樣有趣的聲音。
    3. 提到想像中的奇妙樂器，讓小朋友感覺像在看戲劇。
    4. 給小朋友一個具體的畫面感，誇獎他們的音樂魔法。
    5. 使用繁體中文，120 字以內，不要死板。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "魔法精靈正在譜曲中...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "哎呀，魔法瓶不小心翻倒了，我們再按一次看看吧！";
  }
};
