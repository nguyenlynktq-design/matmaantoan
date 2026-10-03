/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CARD_D_DATA, SOLUTION_PIECES } from '../data/lessonData';
import { SoundFX, Narrator } from '../audio/soundEngine';
import { AlertTriangle, Phone, ExternalLink, RotateCcw, Check, Sparkles, Heart } from 'lucide-react';

// ==========================================
// 1. CARD D VIEW (Activity 4 Emergency Drill)
// ==========================================
export const CardDView: React.FC<{
  onBackToS5: () => void;
  onProceedToS6: () => void;
}> = ({ onBackToS5, onProceedToS6 }) => {
  return (
    <div className="h-full flex flex-col justify-between max-w-4xl mx-auto w-full gameshow-main-card p-5 md:p-7 border-2 border-rose-500/70 overflow-y-auto">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-rose-500/40 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
            <span className="text-xs sm:text-sm font-mono-tag font-bold text-rose-400 uppercase tracking-widest">
              {CARD_D_DATA.badge}
            </span>
          </div>
          <span className="text-xs font-mono-tag text-slate-400">KHÔNG TÍNH LÀ TÍN HIỆU 07</span>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-tech-header font-black text-rose-300 tracking-wide mb-2">
          {CARD_D_DATA.title}
        </h2>

        <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed mb-3">
          <strong className="text-rose-300 font-bold uppercase block mb-1">Tình huống giả định:</strong>
          {CARD_D_DATA.scenario}
        </div>

        <div className="p-3 rounded-xl bg-[#060e20] border border-slate-700 text-xs sm:text-sm text-slate-200 mb-3">
          <strong className="text-amber-300">Nguyên tắc vàng:</strong> {CARD_D_DATA.coreRule}
        </div>

        {/* 3 key elements when reporting in emergency */}
        <div className="p-3.5 rounded-2xl bg-[#030814] border border-cyan-500/40 mb-3">
          <span className="text-xs sm:text-sm font-bold text-cyan-300 uppercase font-tech-header block mb-1">
            KHI Ở VỊ TRÍ AN TOÀN, GỌI HỖ TRỢ KHẨN CẤP VÀ NÓI ĐỦ 3 Ý:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm text-slate-200">
            <div className="p-2 rounded bg-[#060e20] border border-slate-700">
              <strong>1. Em ở đâu:</strong> Địa chỉ, ngõ ngách, vật mốc cụ thể
            </div>
            <div className="p-2 rounded bg-[#060e20] border border-slate-700">
              <strong>2. Chuyện gì xảy ra:</strong> Bị 2 người lạ chặn đường ép cầm gói đồ
            </div>
            <div className="p-2 rounded bg-[#060e20] border border-slate-700">
              <strong>3. Em cần giúp gì:</strong> Cần người lớn hoặc công an đến can thiệp ngay
            </div>
          </div>
        </div>

        {/* 3 Emergency Hotlines */}
        <h3 className="text-xs sm:text-sm font-bold text-amber-400 uppercase font-tech-header mb-2">
          CÁC KÊNH LIÊN HỆ KHẨN CẤP (TÙY THEO TÌNH HUỐNG):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2">
          {CARD_D_DATA.hotlines.map((h) => (
            <div key={h.number} className="p-3 rounded-xl bg-[#060e20] border border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-base sm:text-lg font-mono-tag font-black text-rose-400 block">{h.number}</span>
                <span className="text-xs sm:text-sm font-bold text-slate-100">{h.name}</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">{h.usage}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
        <button
          onClick={() => {
            SoundFX.click();
            onBackToS5();
          }}
          className="text-xs sm:text-sm text-slate-400 hover:text-white font-bold cursor-pointer"
        >
          &larr; Quay lại Tín hiệu 05
        </button>
        <button
          onClick={() => {
            SoundFX.click();
            onProceedToS6();
          }}
          className="btn-action-gold px-6 py-2.5 rounded-xl text-[#030814] font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
        >
          Tiếp Tục Sang Tín Hiệu 06 &rarr;
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 2. DOSSIER VIEW (6 Descriptive Solution Pieces)
// ==========================================
export const DossierView: React.FC<{
  onTriggerPause: () => void;
  onProceedToFinalChallenge: () => void;
}> = ({ onTriggerPause, onProceedToFinalChallenge }) => {
  return (
    <div className="h-full flex flex-col justify-between max-w-5xl mx-auto w-full gameshow-main-card p-5 md:p-7 border border-cyan-400/50 overflow-y-auto">
      <div className="text-center pb-2 border-b border-cyan-500/20">
        <span className="text-xs font-mono-tag text-cyan-400 font-bold uppercase tracking-widest">
          [HOẠT ĐỘNG CUỐI · 22 PHÚT]
        </span>
        <h2 className="text-2xl sm:text-3xl font-tech-header font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-400 mt-0.5">
          06/06 TÍN HIỆU ĐÃ XỬ LÝ · HỒ SƠ LỜI GIẢI ĐÃ ĐỦ
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
          Sáu mảnh lời giải mô tả hành động đang được lưu trữ độc lập (chưa tự sắp thành công thức).
        </p>
      </div>

      {/* Unordered 6 Descriptive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-3">
        {SOLUTION_PIECES.map((p) => (
          <div
            key={p.id}
            className="p-3.5 rounded-2xl bg-[#060e20]/90 border border-cyan-500/30 flex flex-col justify-between shadow-md"
          >
            <div>
              <span className="text-xs font-mono-tag text-amber-400 font-bold block mb-1">{p.title}</span>
              <h4 className="text-sm sm:text-base font-bold text-slate-100 mb-1 leading-snug">
                “{p.suggestedText}”
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{p.detailText}</p>
            </div>
            <span className="mt-2 text-[10px] text-emerald-400 font-mono-tag font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> ĐÃ THU THẬP
            </span>
          </div>
        ))}
      </div>

      {/* Discussion & Progression Strip */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#030814] to-[#060e20] border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-left">
          <span className="text-xs sm:text-sm font-bold text-amber-300 font-tech-header uppercase block">
            Nhiệm vụ nhóm học sinh:
          </span>
          <p className="text-xs sm:text-sm text-slate-200">
            Tự ghép 6 mảnh này thành một quy trình ngắn gọn trên phiếu học tập hoặc bảng nhóm.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              SoundFX.caution();
              onTriggerPause();
            }}
            className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold hover:bg-amber-500/30 transition cursor-pointer"
          >
            Dừng Thảo Luận ⏸
          </button>
          <button
            onClick={() => {
              SoundFX.click();
              onProceedToFinalChallenge();
            }}
            className="btn-action-gold px-6 py-2.5 rounded-xl text-[#030814] font-bold text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer"
          >
            Thử Thách Tổng Hợp &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. GRAND CHALLENGE VIEW
// ==========================================
export const GrandChallengeView: React.FC<{
  onTeacherRevealCipher: () => void;
  showNotice: (title: string, message: string) => void;
}> = ({ onTeacherRevealCipher, showNotice }) => {
  const stepsData = [
    { id: 'dung', word: 'DỪNG LẠI XÉT DỮ KIỆN', correctStep: 1 },
    { id: 'tuchoi', word: 'TỪ CHỐI DỨT KHOÁT', correctStep: 2 },
    { id: 'roikhoi', word: 'RỜI KHỎI NƠI TỤ TẬP', correctStep: 3 },
    { id: 'timtrogiup', word: 'TÌM NGƯỜI LỚN TIN CẬY', correctStep: 4 },
    { id: 'baotin', word: 'BÁO TIN ĐÚNG NGƯỜI', correctStep: 5 }
  ];

  const [placed, setPlaced] = useState<Array<{ id: string; word: string; correctStep: number }>>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const handlePickWord = (item: { id: string; word: string; correctStep: number }) => {
    if (placed.length >= 5) return;
    SoundFX.click();
    setPlaced((prev) => [...prev, item]);
  };

  const handleReset = () => {
    SoundFX.click();
    setPlaced([]);
    setFeedback(null);
  };

  const handleCheckOrder = () => {
    if (placed.length < 5) {
      SoundFX.caution();
      showNotice('CHƯA XẾP ĐỦ', 'Hãy xếp đủ 5 hành động trước khi kiểm tra.');
      return;
    }
    const isCorrect = placed.every((item, idx) => item.correctStep === idx + 1);
    if (isCorrect) {
      SoundFX.success();
      setFeedback({
        isCorrect: true,
        text: 'Rất tuyệt vời! Học sinh đã trình bày quy trình hợp lý. Thầy Cô có thể bấm nút "Giáo Viên Công Bố Mật Mã" để chốt bài học.'
      });
    } else {
      SoundFX.caution();
      setFeedback({
        isCorrect: false,
        text: 'Hãy thử lại. Trong tình huống nguy cơ, thứ tự hành động hợp lý sẽ giúp em tự bảo vệ tốt nhất!'
      });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between max-w-4xl mx-auto w-full gameshow-main-card rounded-3xl p-5 md:p-7 border border-amber-500/40 overflow-y-auto">
      <div className="text-center pb-2 border-b border-slate-800">
        <span className="text-xs font-mono-tag text-amber-400 font-bold uppercase tracking-widest">
          [THỬ THÁCH TỔNG HỢP · TÌNH HUỐNG THỰC TẾ]
        </span>
        <h2 className="text-xl sm:text-2xl font-tech-header font-black text-amber-300 tracking-wide mt-1">
          5 PHÚT QUYẾT ĐỊNH TƯƠNG LAI
        </h2>
        <div className="p-3 bg-[#030814]/80 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 mt-2 text-left leading-relaxed">
          <strong className="text-amber-400 uppercase">Bối cảnh:</strong> Sau giờ học, một bạn rủ em đến một buổi tụ tập. Tại đó: có người đưa cho em sản phẩm không rõ nguồn gốc, bạn khác thúc ép "thử một lần thôi", và một người yêu cầu "đừng kể với ai".
        </div>
      </div>

      <div className="my-3 space-y-3">
        <div className="p-3 rounded-2xl bg-[#030814] border border-cyan-500/30 space-y-2">
          <label className="text-xs sm:text-sm font-bold text-cyan-300 block font-tech-header uppercase">
            1. Em hãy nêu điều đã biết và điều chưa biết trong tình huống:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            <div className="p-2 rounded bg-[#060e20] border border-slate-700 text-slate-200">
              <strong className="text-cyan-400 block mb-0.5">Dữ kiện đã biết:</strong> Có người đưa vật lạ, có bạn thúc ép, có người bắt giấu kín.
            </div>
            <div className="p-2 rounded bg-[#060e20] border border-slate-700 text-slate-200">
              <strong className="text-amber-400 block mb-0.5">Điều chưa thể kết luận:</strong> Chưa rõ vật phẩm đó là gì; không tự kết luận là ma túy.
            </div>
          </div>
        </div>

        {/* Ordering */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-bold text-amber-300 text-center">
            2. Sắp xếp 5 hành động tự vệ theo thứ tự em cho là hợp lý nhất trong tình huống này:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((step) => {
              const item = placed[step - 1];
              return (
                <div
                  key={step}
                  className={`p-2 rounded-xl border-2 min-h-[70px] flex flex-col items-center justify-center text-center transition ${
                    item
                      ? 'border-cyan-400 bg-cyan-950/40'
                      : 'border-dashed border-slate-700 bg-[#030814]'
                  }`}
                >
                  <span className="text-[10px] font-mono-tag text-slate-400">BƯỚC 0{step}</span>
                  <span
                    className={`text-xs sm:text-sm font-bold mt-1 ${
                      item ? 'text-cyan-300' : 'text-slate-500'
                    }`}
                  >
                    {item ? item.word : 'Trống'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {stepsData.map((item) => {
              const isUsed = placed.some((p) => p.id === item.id);
              return (
                <button
                  key={item.id}
                  disabled={isUsed}
                  onClick={() => handlePickWord(item)}
                  className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold transition cursor-pointer ${
                    isUsed
                      ? 'opacity-25 bg-[#030814] border-slate-800 text-slate-500'
                      : 'bg-[#0a1630] border-slate-600 hover:border-cyan-400 text-white'
                  }`}
                >
                  {item.word}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div
              className={`p-3 rounded-xl text-center text-xs sm:text-sm font-bold ${
                feedback.isCorrect
                  ? 'badge-accuracy-success text-white'
                  : 'bg-amber-950/90 border border-amber-400 text-amber-200'
              }`}
            >
              {feedback.text}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-white cursor-pointer font-bold"
        >
          Xếp lại ↺
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCheckOrder}
            className="px-5 py-2 rounded-xl bg-[#0a1630] border border-cyan-500/40 text-cyan-300 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-cyan-900 transition cursor-pointer"
          >
            Kiểm tra thứ tự &rarr;
          </button>
          <button
            onClick={() => {
              SoundFX.unlock();
              onTeacherRevealCipher();
            }}
            className="btn-action-gold px-6 py-2.5 rounded-xl text-[#030814] font-bold text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer"
          >
            👑 Giáo Viên Công Bố Mật Mã
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. CIPHER UNLOCKED VIEW (Golden 5 Steps)
// ==========================================
export const CipherView: React.FC<{
  onProceedToResults: () => void;
}> = ({ onProceedToResults }) => {
  return (
    <div className="h-full flex flex-col justify-between max-w-5xl mx-auto w-full gameshow-main-card rounded-3xl p-5 md:p-7 border border-amber-500/50 text-center overflow-y-auto">
      {/* Header matching Image 1: Golden Lock & Golden Serif Title */}
      <div className="flex flex-col items-center">
        <div className="text-4xl text-amber-400 mb-0.5 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
          🔓
        </div>
        <span className="text-xs sm:text-sm uppercase tracking-widest text-amber-300 font-bold">
          MẬT MÃ ĐÃ ĐƯỢC GIẢI
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider uppercase text-amber-400 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] my-0.5">
          MẬT MÃ AN TOÀN
        </h1>
      </div>

      {/* 5 Steps Flow matching Image 1 */}
      <div className="my-3 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
          {/* BƯỚC 1 */}
          <div className="step-gold-card p-3 rounded-2xl flex flex-col items-center justify-between min-h-[160px]">
            <div className="w-11 h-11 rounded-full step-red-circle flex items-center justify-center text-white text-xl mb-1.5">
              🛑
            </div>
            <span className="text-[11px] text-amber-300 uppercase font-bold">BƯỚC 1</span>
            <span className="text-base font-black text-white my-0.5">DỪNG</span>
            <span className="text-xs text-slate-200 leading-snug">Xét dữ kiện, không đoán</span>
          </div>

          {/* BƯỚC 2 */}
          <div className="step-gold-card p-3 rounded-2xl flex flex-col items-center justify-between min-h-[160px]">
            <div className="w-11 h-11 rounded-full step-red-circle flex items-center justify-center text-white text-xl mb-1.5">
              ✋
            </div>
            <span className="text-[11px] text-amber-300 uppercase font-bold">BƯỚC 2</span>
            <span className="text-base font-black text-white my-0.5">TỪ CHỐI</span>
            <span className="text-xs text-slate-200 leading-snug">Nói nguyên câu, ngắn, rõ</span>
          </div>

          {/* BƯỚC 3 */}
          <div className="step-gold-card p-3 rounded-2xl flex flex-col items-center justify-between min-h-[160px]">
            <div className="w-11 h-11 rounded-full step-red-circle flex items-center justify-center text-white text-xl mb-1.5">
              🏃
            </div>
            <span className="text-[11px] text-amber-300 uppercase font-bold">BƯỚC 3</span>
            <span className="text-base font-black text-white my-0.5">RỜI KHỎI</span>
            <span className="text-xs text-slate-200 leading-snug">Đến nơi an toàn</span>
          </div>

          {/* BƯỚC 4 */}
          <div className="step-gold-card p-3 rounded-2xl flex flex-col items-center justify-between min-h-[160px]">
            <div className="w-11 h-11 rounded-full step-red-circle flex items-center justify-center text-white text-xl mb-1.5">
              🤝
            </div>
            <span className="text-[11px] text-amber-300 uppercase font-bold">BƯỚC 4</span>
            <span className="text-base font-black text-white my-0.5">TÌM TRỢ GIÚP</span>
            <span className="text-xs text-slate-200 leading-snug">Người lớn tin cậy, y tế</span>
          </div>

          {/* BƯỚC 5 */}
          <div className="step-gold-card p-3 rounded-2xl flex flex-col items-center justify-between min-h-[160px]">
            <div className="w-11 h-11 rounded-full step-red-circle flex items-center justify-center text-white text-xl mb-1.5">
              📢
            </div>
            <span className="text-[11px] text-amber-300 uppercase font-bold">BƯỚC 5</span>
            <span className="text-base font-black text-white my-0.5">BÁO TIN</span>
            <span className="text-xs text-slate-200 leading-snug">Đúng người, đúng sự việc</span>
          </div>
        </div>
      </div>

      {/* Emergency Red Banner */}
      <div className="red-urgent-banner rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 text-left text-white my-2.5">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0">
          💓
        </div>
        <p className="text-xs sm:text-sm font-bold leading-relaxed">
          Sức khỏe bất thường hoặc đe dọa trước mắt:{' '}
          <span className="underline">ưu tiên đến nơi an toàn và tìm hỗ trợ y tế ngay</span> – không chờ đi đủ từng bước.
        </p>
      </div>

      <div className="text-slate-300 text-xs sm:text-sm italic my-1 font-medium">
        Không cần chắc vật đó là ma túy, em mới được bảo vệ mình. (5 phút quyết định tương lai là thông điệp gợi thời điểm cần quyết định, không phải đồng hồ đếm ngược hay hạn y tế).
      </div>

      <div className="pt-2 flex items-center justify-center gap-3">
        <button
          onClick={() => {
            SoundFX.victory();
            onProceedToResults();
          }}
          className="btn-action-gold px-8 py-3 rounded-2xl text-[#030814] font-bold text-xs sm:text-sm md:text-base tracking-wider transition shadow-2xl cursor-pointer"
        >
          Xem Báo Cáo Năng Lực An Toàn &rarr;
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 5. RESULTS VIEW (90-min Competency Summary)
// ==========================================
export const ResultsView: React.FC<{
  onReturnHome: () => void;
  onResetAll: () => void;
}> = ({ onReturnHome, onResetAll }) => {
  const competencies = [
    { name: '1. Nhận diện dấu hiệu bất thường', desc: 'Phát hiện yếu tố bất thường, không rõ nguồn gốc', status: 'ĐÃ LUYỆN TẬP' },
    { name: '2. Phân biệt dữ kiện và suy đoán', desc: 'Không gán nhãn, dựa trên sự thật trực tiếp thấy', status: 'ĐÃ LUYỆN TẬP' },
    { name: '3. Kỹ năng từ chối dứt khoát', desc: 'Nói nguyên câu ngắn và rời ngay đến nơi an toàn', status: 'ĐÃ LUYỆN TẬP' },
    { name: '4. Ra quyết định tự bảo vệ', desc: 'Không nhận, không giữ hộ vật phẩm bí mật', status: 'ĐÃ LUYỆN TẬP' },
    { name: '5. Tìm người lớn đáng tin cậy', desc: 'Chia sẻ đúng người để bảo vệ bạn mình', status: 'ĐÃ LUYỆN TẬP' },
    { name: '6. Báo tin an toàn 4 yếu tố', desc: 'Báo rõ thời gian, nơi thấy, điều thấy, đúng người', status: 'ĐÃ LUYỆN TẬP' }
  ];

  return (
    <div className="h-full flex flex-col justify-between max-w-4xl mx-auto w-full gameshow-main-card rounded-3xl p-5 md:p-7 border border-cyan-400/50 overflow-y-auto shadow-2xl">
      <div className="text-center pb-2 border-b border-cyan-500/20">
        <span className="text-xs font-mono-tag text-cyan-400 font-bold uppercase tracking-widest">
          [BÁO CÁO TỔNG KẾT TIẾT HỌC 90 PHÚT]
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-tech-header font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-400 mt-1">
          HỒ SƠ NĂNG LỰC AN TOÀN HỌC ĐƯỜNG
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
          Không xếp hạng điểm số · Rèn luyện kỹ năng tự bảo vệ chủ động trong đời sống
        </p>
      </div>

      {/* Competencies list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
        {competencies.map((c, i) => (
          <div
            key={i}
            className="p-3 rounded-2xl bg-[#060e20]/90 border border-slate-700/80 flex items-center justify-between"
          >
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-100">{c.name}</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">{c.desc}</p>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-950 border border-emerald-400/50 text-emerald-300 text-[11px] font-bold font-mono-tag shrink-0 ml-2">
              ✓ {c.status}
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#030814] to-[#060e20] border border-cyan-500/40 text-center">
        <span className="text-xs font-mono-tag text-amber-400 font-bold tracking-widest block mb-0.5">
          MẬT MÃ BẢO VỆ CHỦ ĐỘNG:
        </span>
        <p className="text-sm sm:text-base font-black text-cyan-300">
          DỪNG &rarr; TỪ CHỐI &rarr; RỜI KHỎI &rarr; TÌM TRỢ GIÚP &rarr; BÁO TIN
        </p>
        <p className="text-[11px] text-slate-400 italic mt-0.5">
          Lưu ý: Hoạt động mô phỏng nhằm hình thành kỹ năng; an toàn ngoài đời phụ thuộc vào sự bình tĩnh và tìm kiếm hỗ trợ kịp thời từ người lớn.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
        <button
          onClick={() => {
            SoundFX.click();
            onReturnHome();
          }}
          className="px-5 py-2.5 rounded-xl bg-[#0a1630] hover:bg-[#0d1f42] border border-slate-600 text-xs sm:text-sm text-slate-200 font-bold transition cursor-pointer"
        >
          Quay Về Trang Chủ ⌂
        </button>
        <a
          href="https://gameshowhocduong.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-indigo-900/80 border border-indigo-400/50 text-xs sm:text-sm text-indigo-200 font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>🎯</span> Mở Trò Chơi Củng Cố <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={() => {
            SoundFX.caution();
            onResetAll();
          }}
          className="btn-action-gold px-6 py-2.5 rounded-xl text-[#030814] font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-xl cursor-pointer"
        >
          Luyện Tập Lại Từ Đầu ↺
        </button>
      </div>
    </div>
  );
};
