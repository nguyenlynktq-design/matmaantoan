/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Narrator, SoundFX } from '../audio/soundEngine';

interface NarrationBarProps {
  currentText: string;
  isPlaying: boolean;
  isPaused: boolean;
  onTogglePause: () => void;
  onReplay: () => void;
}

export const NarrationBar: React.FC<NarrationBarProps> = ({
  currentText,
  isPlaying,
  isPaused,
  onTogglePause,
  onReplay
}) => {
  return (
    <div className="bg-[#060e20]/95 border-b border-cyan-500/30 px-3 md:px-6 py-2 text-sm text-cyan-200 flex flex-wrap items-center justify-between gap-2 shadow-lg shrink-0 z-20">
      <div className="flex items-center gap-2.5 flex-1 min-w-[240px]">
        <span className="flex h-2.5 w-2.5 relative shrink-0">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isPlaying ? 'bg-cyan-400' : isPaused ? 'bg-amber-400' : 'bg-cyan-600'
            }`}
          ></span>
        </span>

        {/* Small Audio Visualizer Waves */}
        {isPlaying && (
          <div className="hidden sm:flex items-center gap-0.5 h-3.5">
            <span className="w-1 bg-cyan-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3"></span>
            <span className="w-1 bg-cyan-300 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.1s] h-4"></span>
            <span className="w-1 bg-cyan-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.2s] h-2.5"></span>
            <span className="w-1 bg-cyan-500 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.15s] h-3.5"></span>
          </div>
        )}

        <span className="font-bold text-cyan-400 uppercase text-[11px] md:text-[12px] font-mono-tag tracking-wider shrink-0">
          [THUYẾT MINH]:
        </span>
        <span className="italic truncate text-slate-200 text-xs sm:text-sm md:text-base max-w-xl font-serif">
          {currentText || 'Hệ thống an toàn học đường đang ở chế độ trực chiến...'}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            SoundFX.click();
            onTogglePause();
          }}
          className="px-3 py-1 rounded-lg bg-[#0d1f42] border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          <span>{isPaused ? 'Tiếp tục' : 'Tạm dừng'}</span>
        </button>

        <button
          onClick={() => {
            SoundFX.click();
            onReplay();
          }}
          className="px-3 py-1 rounded-lg bg-[#0d1f42] border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Nghe lại</span>
        </button>
      </div>
    </div>
  );
};
