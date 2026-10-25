import { GoogleGenAI } from '@google/genai';

/**
 * Inisialisasi Google GenAI SDK (Server-Side Only)
 * API Key diambil dari environment variable GEMINI_API_KEY
 */
const apiKey = process.env.GEMINI_API_KEY || '';

export const getGeminiClient = () => {
  if (!apiKey) {
    console.warn('⚠️ GEMINI_API_KEY belum diset di .env.local');
  }
  return new GoogleGenAI({ apiKey });
};
