/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Pause, AlertTriangle, ExternalLink, X, CheckSquare, Square } from 'lucide-react';
import { SoundFX } from '../audio/soundEngine';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFreezeDiscussion: () => void;
  showHints: boolean;
  onToggleHints: (val: boolean) => void;
  onOpenCardD: () => void;
  onJumpToSignal: (index: number) => void;
  onJumpToDossier: () => void;
  onJumpToFinalChallenge: () => void;
  onTeacherRevealCipher: () => void;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  onFreezeDiscussion,
  showHints,
  onToggleHints,
  onOpenCardD,
  onJumpToSignal,
  onJumpToDossier,
  onJumpToFinalChallenge,
  onTeacherRevealCipher
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#030814]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="gameshow-main-card w-full max-w-3xl border border-amber-500/50 p-5 md:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-amber-300 font-tech-header uppercase">
                CHẾ ĐỘ GIÁO VIÊN · ĐIỀU PHỐI TIẾT DẠY 90 PHÚT
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Công cụ dẫn dắt tiến trình, tạm dừng thảo luận mở, mở nhánh diễn tập khẩn cấp
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              SoundFX.click();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-2 rounded-lg text-2xl cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action: Discussion Freeze */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-[#060e20] border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-sm font-bold text-amber-300 uppercase tracking-wide block">
              Nút Sư Phạm: Đóng Băng Màn Hình
            </span>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              Dừng âm thanh, giữ nguyên hiện trạng để học sinh thảo luận và viết phiếu quyết định cá nhân / nhóm.
            </p>
          </div>
          <button
            onClick={() => {
              SoundFX.caution();
              onClose();
              onFreezeDiscussion();
            }}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#030814] font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Pause className="w-4 h-4" /> DỪNG ĐỂ THẢO LUẬN
          </button>
        </div>

        {/* Teacher Options Toggle */}
        <div className="p-3.5 rounded-xl bg-[#060e20] border border-slate-700 flex flex-wrap items-center justify-between gap-3 mb-4">
          <label className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 cursor-pointer select-none">
            <button
              type="button"
              onClick={() => {
                SoundFX.click();
                onToggleHints(!showHints);
              }}
              className="text-cyan-400"
            >
              {showHints ? <CheckSquare className="w-5 h-5 text-cyan-400" /> : <Square className="w-5 h-5 text-slate-500" />}
            </button>
            <span>Hiển thị câu gợi ý trên thẻ lời giải (Tắt nếu muốn học sinh tự viết trên phiếu giấy)</span>
          </label>
          <span className="text-xs text-cyan-300 font-mono-tag">
            {showHints ? 'ĐANG BẬT GỢI Ý' : 'ĐÃ ẨN GỢI Ý (HS TỰ VIẾT)'}
          </span>
        </div>

        {/* Dedicated Card D Button (Activity 4) */}
        <div className="p-4 rounded-2xl bg-rose-950/50 border-2 border-rose-500/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <div>
            <span className="text-sm font-bold text-rose-300 uppercase tracking-wide block font-tech-header">
              THẺ D – TÌNH HUỐNG KHÔNG THỂ RỜI ĐI / GỌI HỖ TRỢ KHẨN CẤP
            </span>
            <p className="text-xs sm:text-sm text-rose-200 mt-1">
              Dùng ở Hoạt động 4 (sau khi xử lý Tín hiệu 05). Nhánh diễn tập riêng biệt, không tính là tín hiệu thứ 7 và không mở mảnh lời giải thứ 7.
            </p>
          </div>
          <button
            onClick={() => {
              SoundFX.emergency();
              onClose();
              onOpenCardD();
            }}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-amber-300" /> MỞ THẺ D KHẨN CẤP
          </button>
        </div>

        {/* Jump Directly to Signals */}
        <h3 className="text-xs sm:text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider font-mono-tag">
          Chuyển trực tiếp đến các hoạt động:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {[
            { id: 0, time: 'HĐ1 · 8 Phút', title: 'Tín hiệu 01: Món Quà' },
            { id: 1, time: 'HĐ2 · 13 Phút', title: 'Tín hiệu 02: Thử Một Lần' },
            { id: 2, time: 'HĐ2 · Tiếp theo', title: 'Tín hiệu 03: Giữ Hộ Mình' },
            { id: 3, time: 'HĐ3 · 12 Phút', title: 'Tín hiệu 04: Đừng Nói Ai' },
            { id: 4, time: 'HĐ4 · 23 Phút', title: 'Tín hiệu 05: Bạn Gặp Chuyện' },
            { id: 5, time: 'HĐ5 · 12 Phút', title: 'Tín hiệu 06: Vật Lạ Khuôn Viên' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                SoundFX.click();
                onClose();
                onJumpToSignal(item.id);
              }}
              className="p-2.5 text-left rounded-xl bg-[#0a1630]/80 border border-slate-700 hover:border-cyan-400 hover:bg-[#0d1f42] transition cursor-pointer"
            >
              <span className="text-xs text-cyan-400 font-bold block font-mono-tag">{item.time}</span>
              <span className="text-xs sm:text-sm text-slate-100 font-bold">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Pedagogical Progression & Consolidation Links */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-700/60">
          <button
            onClick={() => {
              SoundFX.click();
              onClose();
              onJumpToDossier();
            }}
            className="px-3.5 py-2 text-xs md:text-sm bg-cyan-950/80 border border-cyan-500/40 rounded-xl text-cyan-300 hover:bg-cyan-900 font-bold cursor-pointer transition"
          >
            Hồ Sơ 6 Mảnh Lời Giải
          </button>
          <button
            onClick={() => {
              SoundFX.click();
              onClose();
              onJumpToFinalChallenge();
            }}
            className="px-3.5 py-2 text-xs md:text-sm bg-amber-950/80 border border-amber-500/40 rounded-xl text-amber-300 hover:bg-amber-900 font-bold cursor-pointer transition"
          >
            Thử Thách Tổng Hợp
          </button>
          <button
            onClick={() => {
              SoundFX.unlock();
              onClose();
              onTeacherRevealCipher();
            }}
            className="px-3.5 py-2 text-xs md:text-sm bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 hover:bg-emerald-900 font-bold cursor-pointer transition"
          >
            👑 Công Bố Mật Mã (Chỉ GV)
          </button>
          {/* External gameshow practice */}
          <a
            href="https://gameshowhocduong.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-xs md:text-sm bg-indigo-950/80 border border-indigo-400/50 rounded-xl text-indigo-200 hover:bg-indigo-900 font-bold flex items-center gap-1.5 ml-auto transition"
          >
            <span>🎯</span> MỞ TRÒ CHƠI CỦNG CỐ <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
