/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AUDIO_MANIFEST, findAudioItem, AudioItem, DOWNLOADED_AUDIO_KEYS } from './audioManifest';

// Web Audio API Sound Synthesizer + Zero-Latency Preloaded Local Audio Engine
let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let voiceEnabled = true;
let isVoicePaused = false;
let currentAudioElement: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let lastSpokenText = '';
let onVoiceStateChangeCallbacks: Array<(state: { isPlaying: boolean; isPaused: boolean; text: string }) => void> = [];

// In-memory pool of preloaded audio elements for 0ms playback
const preloadedAudioMap = new Map<string, HTMLAudioElement>();
const verifiedAudioKeys = new Set<string>();

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Preload all audio items from manifest on startup
export function initAudioPreloader() {
  if (typeof window === 'undefined') return;

  Object.values(AUDIO_MANIFEST).forEach((item) => {
    try {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = item.url;

      audio.addEventListener('canplaythrough', () => {
        verifiedAudioKeys.add(item.key);
      });

      audio.addEventListener('error', () => {
        // File not on disk yet or network issue
        verifiedAudioKeys.delete(item.key);
      });

      preloadedAudioMap.set(item.key, audio);
    } catch {
      // Ignore
    }
  });
}

// Auto-run preloader in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initAudioPreloader);
  } else {
    initAudioPreloader();
  }
}

export const SoundFX = {
  toggle: (state?: boolean) => {
    soundEnabled = typeof state === 'boolean' ? state : !soundEnabled;
    return soundEnabled;
  },
  isEnabled: () => soundEnabled,

  click: () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  },

  ping: () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.36);
  },

  success: () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const chord = [523.25, 659.25, 783.99, 1046.5];
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.07);
      osc.stop(ctx.currentTime + i * 0.07 + 0.32);
    });
  },

  caution: () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(340, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  },

  unlock: () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(392, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.32);
    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.46);
  },

  victory: () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [392.0, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 1.15);
    });
  },

  emergency: () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.2);
    osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  },

  radarBeep: () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  }
};

function notifyVoiceState(isPlaying: boolean, isPausedState: boolean, text: string) {
  onVoiceStateChangeCallbacks.forEach((cb) => cb({ isPlaying, isPaused: isPausedState, text }));
}

// Fallback using browser standard Web Speech API with Vietnamese calibration
function speakWithWebSpeech(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    notifyVoiceState(false, false, text);
    return;
  }
  try {
    window.speechSynthesis.cancel();
  } catch {
    // Ignore error
  }

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'vi-VN';
  utter.rate = 0.95;
  utter.pitch = 1.05;

  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find(
    (v) =>
      v.lang.startsWith('vi') ||
      v.lang.includes('VIE') ||
      v.name.toLowerCase().includes('vietnam') ||
      v.name.toLowerCase().includes('linh') ||
      v.name.toLowerCase().includes('mai')
  );
  if (viVoice) {
    utter.voice = viVoice;
  }

  activeUtterance = utter;
  utter.onstart = () => {
    isVoicePaused = false;
    notifyVoiceState(true, false, text);
  };
  utter.onend = () => {
    isVoicePaused = false;
    activeUtterance = null;
    notifyVoiceState(false, false, text);
  };
  utter.onerror = () => {
    isVoicePaused = false;
    activeUtterance = null;
    notifyVoiceState(false, false, text);
  };

  window.speechSynthesis.speak(utter);
}

export const Narrator = {
  subscribe: (callback: (state: { isPlaying: boolean; isPaused: boolean; text: string }) => void) => {
    onVoiceStateChangeCallbacks.push(callback);
    return () => {
      onVoiceStateChangeCallbacks = onVoiceStateChangeCallbacks.filter((c) => c !== callback);
    };
  },

  toggle: (state?: boolean) => {
    voiceEnabled = typeof state === 'boolean' ? state : !voiceEnabled;
    if (!voiceEnabled) {
      Narrator.stop();
    }
    return voiceEnabled;
  },

  isEnabled: () => voiceEnabled,

  getLastText: () => lastSpokenText,

  /**
   * Play narration text with ZERO LATENCY:
   * 1. If audio file exists in preloaded local storage, plays instantly (0ms delay).
   * 2. If not ready, immediately triggers speech synthesis (0ms delay).
   */
  speak: async (textOrKey: string) => {
    if (!textOrKey) return;

    const audioItem = findAudioItem(textOrKey);
    const displayText = audioItem ? audioItem.text : textOrKey;
    lastSpokenText = displayText;

    if (!voiceEnabled) {
      notifyVoiceState(false, false, displayText);
      return;
    }

    Narrator.stop();

    // Priority 1: Check preloaded static audio element on disk (0ms delay!)
    if (audioItem && DOWNLOADED_AUDIO_KEYS.has(audioItem.key)) {
      let audio = preloadedAudioMap.get(audioItem.key);
      if (!audio) {
        audio = new Audio(audioItem.url);
        preloadedAudioMap.set(audioItem.key, audio);
      }

      audio.currentTime = 0;
      currentAudioElement = audio;

      audio.onplay = () => {
        isVoicePaused = false;
        notifyVoiceState(true, false, displayText);
      };

      audio.onended = () => {
        currentAudioElement = null;
        notifyVoiceState(false, false, displayText);
      };

      audio.onerror = () => {
        currentAudioElement = null;
        speakWithWebSpeech(displayText);
      };

      try {
        await audio.play();
        return;
      } catch (err) {
        currentAudioElement = null;
      }
    }

    // Priority 2: Instant zero-latency Web Speech API
    speakWithWebSpeech(displayText);
  },

  replay: () => {
    if (lastSpokenText) {
      Narrator.speak(lastSpokenText);
    }
  },

  pause: () => {
    if (currentAudioElement && !currentAudioElement.paused) {
      currentAudioElement.pause();
      isVoicePaused = true;
      notifyVoiceState(false, true, lastSpokenText);
    } else if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      isVoicePaused = true;
      notifyVoiceState(false, true, lastSpokenText);
    }
  },

  resume: () => {
    if (currentAudioElement && currentAudioElement.paused) {
      currentAudioElement.play().catch(() => {});
      isVoicePaused = false;
      notifyVoiceState(true, false, lastSpokenText);
    } else if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      isVoicePaused = false;
      notifyVoiceState(true, false, lastSpokenText);
    } else if (lastSpokenText) {
      Narrator.speak(lastSpokenText);
    }
  },

  togglePause: () => {
    if (isVoicePaused) {
      Narrator.resume();
      return false; // not paused now
    } else {
      Narrator.pause();
      return true; // paused now
    }
  },

  stop: () => {
    if (currentAudioElement) {
      try {
        currentAudioElement.pause();
        currentAudioElement.currentTime = 0;
        currentAudioElement = null;
      } catch {
        // Ignore
      }
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
    isVoicePaused = false;
    notifyVoiceState(false, false, lastSpokenText);
  }
};
