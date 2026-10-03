/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Pause, X, AlertCircle, Sparkles, RotateCcw } from 'lucide-react';
import { SoundFX } from '../audio/soundEngine';
import { SolutionPiece } from '../data/lessonData';

// 1. Discussion Freeze Overlay
export const DiscussionFreezeOverlay: React.FC<{
  isOpen: boolean;
  onResume: () => void;
}> = ({ isOpen, onResume }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#030814]/92 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 text-center animate-fade-in">
      <div className="max-w-2xl w-full gameshow-main-card border-2 border-amber-400 p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400">
          <Pause className="w-8 h-8" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-tech-header font-bold text-amber-300 uppercase tracking-wider">
          HỆ THỐNG TẠM DỪNG · THỜI GIAN THẢO LUẬN / LÀM PHIẾU
        </h2>
        <div className="p-4 sm:p-5 bg-[#030814]/90 rounded-2xl border border-amber-500/40 text-left text-sm md:text-base text-slate-100 space-y-2.5 leading-relaxed">
          <p className="font-bold text-cyan-300 text-base">Gợi ý thảo luận sư phạm cho học sinh lớp 8:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-200">
            <li>“Những thông tin nào các em trực tiếp quan sát thấy, và điều gì chỉ là suy đoán?”</li>
            <li>“Nếu từ chối ngay, em sẽ nói nguyên câu ngắn nào và di chuyển đến đâu để an toàn?”</li>
            <li>“Tại sao khi bạn gặp nguy cơ bị đe dọa, việc giữ bí mật lại vô tình làm bạn rơi vào nguy hiểm lớn hơn?”</li>
          </ul>
        </div>
        <button
          onClick={() => {
            SoundFX.click();
            onResume();
          }}
          className="btn-action-gold px-8 py-3.5 text-[#030814] font-black rounded-2xl shadow-xl hover:brightness-110 transition text-sm sm:text-base cursor-pointer uppercase tracking-wider"
        >
          TIẾP TỤC TIẾT HỌC ▶
        </button>
      </div>
    </div>
  );
};

// 2. Guide Modal
export const GuideModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#030814]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="gameshow-main-card rounded-3xl w-full max-w-xl border border-cyan-400/50 p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-cyan-300 font-tech-header uppercase">
            HƯỚNG DẪN HOẠT ĐỘNG & NGUYÊN TẮC (LỚP 8)
          </h3>
          <button
            onClick={() => {
              SoundFX.click();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 text-2xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm md:text-base text-slate-200 space-y-3 leading-relaxed">
          <p>
            <strong className="text-cyan-300">1. Không đoán tên ma túy bằng mắt thường:</strong> Nhiệm vụ là rèn luyện phản xạ nhận diện yếu tố không an toàn và ra quyết định dứt khoát.
          </p>
          <p>
            <strong className="text-cyan-300">2. Thu thập 06 Mảnh lời giải hành động:</strong> Không hiện trước công thức 5 bước. Học sinh tự rút ra bài học sau từng tín hiệu trên phiếu.
          </p>
          <p>
            <strong className="text-cyan-300">3. Ưu tiên an toàn tuyệt đối:</strong> Khi bị đe dọa hoặc có dấu hiệu sức khỏe bất thường, lập tức tìm hỗ trợ y tế hoặc người lớn bảo vệ, không chờ làm đủ từng bước.
          </p>
        </div>
        <button
          onClick={() => {
            SoundFX.click();
            onClose();
          }}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-[#030814] font-black rounded-xl text-sm uppercase tracking-wider cursor-pointer shadow-lg"
        >
          Đã Hiểu Nhiệm Vụ
        </button>
      </div>
    </div>
  );
};

// 3. Notice Modal (Replaces window.alert)
export const NoticeModal: React.FC<{
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}> = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#030814]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="gameshow-main-card max-w-md w-full p-5 sm:p-6 rounded-2xl border-2 border-amber-400 text-center space-y-3 shadow-2xl">
        <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-black text-amber-400 uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            SoundFX.click();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl btn-action-gold text-[#030814] font-bold text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer"
        >
          ĐÃ HIỂU HƯỚNG DẪN
        </button>
      </div>
    </div>
  );
};

// 4. Solution Piece Modal
export const SolutionPieceModal: React.FC<{
  isOpen: boolean;
  piece: SolutionPiece | null;
  showHints: boolean;
  onNext: () => void;
}> = ({ isOpen, piece, showHints, onNext }) => {
  if (!isOpen || !piece) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#030814]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="gameshow-main-card rounded-3xl p-5 md:p-7 max-w-lg w-full border-2 border-cyan-400 text-center space-y-4 shadow-2xl animate-fade-in">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 text-xl font-bold font-mono-tag">
          #0{piece.signalId}
        </div>
        <span className="text-xs font-mono-tag tracking-widest text-cyan-400 uppercase">
          ĐÃ MỞ KHÓA MẢNH LỜI GIẢI MÔ TẢ
        </span>
        <h2 className="text-xl sm:text-2xl font-tech-header font-black text-amber-300 tracking-wide">
          {piece.title}
        </h2>

        {showHints ? (
          <div className="p-4 rounded-2xl bg-[#060e20] border border-cyan-500/40 text-left">
            <span className="text-xs font-bold text-amber-400 block mb-1">
              Gợi ý nội dung cốt lõi:
            </span>
            <p className="text-sm sm:text-base text-cyan-200 font-bold">
              “{piece.suggestedText}”
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {piece.detailText}
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#060e20] border border-amber-500/40 text-left">
            <span className="text-xs font-bold text-amber-300 block mb-1">
              Thầy Cô đang ẩn phần gợi ý:
            </span>
            <p className="text-xs sm:text-sm text-slate-200">
              Em hãy ghi bài học hành động an toàn rút ra vào phiếu học tập cá nhân/nhóm nhé!
            </p>
          </div>
        )}

        <button
          onClick={() => {
            SoundFX.click();
            onNext();
          }}
          className="w-full py-3.5 btn-action-gold text-[#030814] font-black text-sm sm:text-base tracking-wider rounded-xl transition shadow-xl cursor-pointer uppercase"
        >
          TIẾP TỤC HOẠT ĐỘNG &rarr;
        </button>
      </div>
    </div>
  );
};

// 5. Reset Confirm Modal
export const ResetConfirmModal: React.FC<{
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#030814]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="gameshow-main-card max-w-sm w-full p-5 rounded-2xl border-2 border-rose-500/60 text-center space-y-3 shadow-2xl">
        <div className="w-10 h-10 mx-auto rounded-full bg-rose-500/20 text-rose-400 border border-rose-400/40 flex items-center justify-center">
          <RotateCcw className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-rose-300 uppercase tracking-wide">
            BẮT ĐẦU LẠI TIẾT HỌC?
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
            Thao tác này sẽ đặt lại hồ sơ lời giải và đưa màn hình về trạng thái khởi động ban đầu.
          </p>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => {
              SoundFX.click();
              onCancel();
            }}
            className="flex-1 py-2 rounded-xl bg-[#0a1630] hover:bg-[#0d1f42] border border-slate-700 text-xs text-slate-300 font-bold transition cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            onClick={() => {
              SoundFX.click();
              onConfirm();
            }}
            className="flex-1 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold uppercase transition shadow-lg cursor-pointer"
          >
            Đồng ý ↺
          </button>
        </div>
      </div>
    </div>
  );
};
