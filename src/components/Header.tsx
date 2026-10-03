/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Volume2, VolumeX, Mic, MicOff, Settings, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { SoundFX, Narrator } from '../audio/soundEngine';

interface HeaderProps {
  currentStage: string;
  currentSignalIndex: number;
  completedSignalIds: number[];
  onOpenIntro: () => void;
  onOpenTeacherModal: () => void;
  onRequestReset: () => void;
  soundEnabled: boolean;
  voiceEnabled: boolean;
  onToggleSound: () => void;
  onToggleVoice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  currentSignalIndex,
  completedSignalIds,
  onOpenIntro,
  onOpenTeacherModal,
  onRequestReset,
  soundEnabled,
  voiceEnabled,
  onToggleSound,
  onToggleVoice
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    SoundFX.click();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <header className="h-16 md:h-18 border-b border-cyan-500/30 bg-[#060e20]/95 backdrop-blur-md px-3 md:px-6 flex items-center justify-between z-30 shrink-0 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
      {/* Brand Identity */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => {
          SoundFX.click();
          onOpenIntro();
        }}
        title="Về trang khởi động"
      >
        <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#0B2556] to-[#041126] border-2 border-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.6)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.9)] transition-all">
          <div className="w-full h-full rounded-[9px] bg-[#030814]/90 flex items-center justify-center">
            <Shield className="w-6 h-6 md:w-7 md:h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-tech-header text-base sm:text-lg md:text-xl font-black tracking-wider uppercase text-cyan-300 drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]">
              MẬT MÃ AN TOÀN
            </span>
            <span className="px-2 py-0.5 text-[10px] md:text-[11px] font-mono-tag font-black text-cyan-300 bg-cyan-950/80 border border-cyan-400 rounded-md tracking-wider uppercase">
              PHÒNG ĐIỀU KHIỂN · LỚP 8
            </span>
          </div>
          <p className="text-[11px] sm:text-[12px] text-slate-200 tracking-wide whitespace-nowrap mt-0.5 flex items-center gap-1.5">
            <span className="text-amber-400 font-bold">5 PHÚT QUYẾT ĐỊNH TƯƠNG LAI</span>
            <span className="text-cyan-400 font-bold">·</span>
            <span className="text-slate-300">KẾ HOẠCH GIẢNG DẠY 90 PHÚT</span>
          </p>
        </div>
      </div>

      {/* Central Signal Tracker */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-xs text-slate-300 font-bold mr-1 tracking-wider">TÍN HIỆU:</span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const isDone = completedSignalIds.includes(num);
            const isCurrent = currentStage === 'signal' && currentSignalIndex === num - 1;
            return (
              <div
                key={num}
                className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-mono-tag font-bold transition-all ${
                  isDone
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/50'
                    : isCurrent
                    ? 'bg-cyan-500 text-[#030814] shadow-[0_0_12px_rgba(0,240,255,0.7)] animate-pulse'
                    : 'bg-[#0a1630] text-slate-400 border border-slate-700'
                }`}
              >
                0{num}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Tools */}
      <div className="flex items-center gap-2">
        {/* Toggle Voice */}
        <button
          onClick={onToggleVoice}
          className={`p-2 rounded-lg border transition flex items-center gap-1.5 cursor-pointer ${
            voiceEnabled
              ? 'bg-[#0d1f42] border-cyan-400/40 text-cyan-300 hover:border-cyan-400'
              : 'bg-[#0a1630] border-slate-700 text-slate-500 hover:text-slate-300'
          }`}
          title="Bật/Tắt Giọng đọc thuyết minh"
        >
          {voiceEnabled ? <Mic className="w-4 h-4 text-cyan-400" /> : <MicOff className="w-4 h-4" />}
          <span className="text-[11px] font-bold text-cyan-300 hidden md:inline">THUYẾT MINH</span>
        </button>

        {/* Toggle Audio SFX */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-lg border transition cursor-pointer ${
            soundEnabled
              ? 'bg-[#0d1f42] border-cyan-400/40 text-cyan-300 hover:border-cyan-400'
              : 'bg-[#0a1630] border-slate-700 text-slate-500 hover:text-slate-300'
          }`}
          title="Bật/Tắt Hiệu ứng âm thanh"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Teacher Mode Trigger */}
        <button
          onClick={() => {
            SoundFX.click();
            onOpenTeacherModal();
          }}
          className="p-2 rounded-lg bg-[#0d1f42] border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 transition flex items-center gap-1.5 px-3 text-xs font-bold cursor-pointer"
          title="Bảng điều phối sư phạm dành cho Thầy Cô"
        >
          <Settings className="w-4 h-4 text-amber-400" />
          <span className="font-bold">GIÁO VIÊN</span>
        </button>

        {/* Restart App */}
        <button
          onClick={() => {
            SoundFX.caution();
            onRequestReset();
          }}
          className="px-2.5 py-1.5 rounded-lg bg-[#0d1f42] border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 hover:border-rose-400 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          title="Đặt lại từ đầu"
        >
          <RotateCcw className="w-4 h-4 text-rose-400" />
          <span className="hidden sm:inline">BẮT ĐẦU LẠI</span>
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg bg-[#0a1630] border border-cyan-500/20 text-slate-300 hover:text-cyan-400 transition cursor-pointer"
          title="Toàn màn hình"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
