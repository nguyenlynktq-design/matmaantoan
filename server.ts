/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isDev = process.env.NODE_ENV !== 'production';

app.use(express.json());
app.use('/audio', express.static(path.resolve(__dirname, 'public', 'audio')));

// In-memory TTS audio cache so identical narration lines are generated once and instantly reused
const ttsCache = new Map<string, { audioBase64: string; sampleRate: number }>();

app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text parameter required' });
      return;
    }

    if (ttsCache.has(text)) {
      res.json(ttsCache.get(text));
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.json({ fallback: true, message: 'No GEMINI_API_KEY provided; using browser speech synthesis' });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const promptText = `Nói bằng giọng nữ miền Bắc chuẩn tiếng Việt, tự nhiên, bình tĩnh, truyền cảm: ${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: promptText }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Aoede'
            }
          }
        }
      }
    });

    const part = response?.candidates?.[0]?.content?.parts?.[0];
    const audioBase64 = part?.inlineData?.data;
    const mimeType = part?.inlineData?.mimeType || 'audio/L16;rate=24000';

    if (!audioBase64) {
      res.json({ fallback: true });
      return;
    }

    let sampleRate = 24000;
    const rateMatch = mimeType.match(/rate=(\d+)/);
    if (rateMatch && rateMatch[1]) {
      sampleRate = parseInt(rateMatch[1], 10);
    }

    const result = { audioBase64, sampleRate };
    ttsCache.set(text, result);
    res.json(result);
  } catch (error) {
    console.error('Error generating TTS:', error);
    res.json({ fallback: true });
  }
});

async function startServer() {
  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
