import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 我們把原本那個會導致錯誤的 define 區塊拿掉了
// 因為我們已經改用標準的 import.meta.env 寫法，Vite 會自動處理，不需要手動設定
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
