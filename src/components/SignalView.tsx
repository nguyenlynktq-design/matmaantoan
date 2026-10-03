/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SIGNALS_DATA } from '../data/lessonData';
import { SoundFX, Narrator } from '../audio/soundEngine';
import { Shield, AlertTriangle, ArrowRight, Check, Sparkles, MessageSquare, UserCheck, Flag, Undo2 } from 'lucide-react';

interface SignalViewProps {
  signalIndex: number;
  onCompleteSignal: (signalIndex: number) => void;
  onOpenIntro: () => void;
  onTriggerPause: () => void;
  showNotice: (title: string, message: string) => void;
}

export const SignalView: React.FC<SignalViewProps> = ({
  signalIndex,
  onCompleteSignal,
  onOpenIntro,
  onTriggerPause,
  showNotice
}) => {
  const signal = SIGNALS_DATA[signalIndex];

  // Signal 1 State
  const [s1CardStates, setS1CardStates] = useState<Record<string, 'pool' | 'fact' | 'speculation'>>({});
  const [s1ShowDecision, setS1ShowDecision] = useState(false);
  const [s1Feedback, setS1Feedback] = useState<{ isSafe: boolean; text: string } | null>(null);

  // Signal 2 State
  const [s2ClickedPhrases, setS2ClickedPhrases] = useState<number[]>([]);
  const [s2AssembledChips, setS2AssembledChips] = useState<string[]>([]);
  const [s2CustomRefusal, setS2CustomRefusal] = useState('');

  // Signal 3 State
  const [s3Flagged, setS3Flagged] = useState<number[]>([]);
  const [s3Feedback, setS3Feedback] = useState<{ isSafe: boolean; text: string } | null>(null);

  // Signal 4 State
  const [s4Reply, setS4Reply] = useState('');
  const [s4SelectedAdults, setS4SelectedAdults] = useState<string[]>([]);
  const [s4Feedback, setS4Feedback] = useState<{ isSafe: boolean; text: string } | null>(null);

  // Signal 5 State
  const [s5Classified, setS5Classified] = useState<Record<string, 'fact' | 'speculation'>>({});
  const [s5Feedback, setS5Feedback] = useState<{ isSafe: boolean; text: string } | null>(null);

  // Signal 6 State
  const [s6Feedback, setS6Feedback] = useState<{ isSafe: boolean; text: string } | null>(null);
  const [s6ReportCustom, setS6ReportCustom] = useState(
    'Thưa cô, lúc ra chơi em thấy một gói đồ không có nhãn ở góc sân bóng; bạn em định nhặt lên. Nhờ cô đến hỗ trợ ạ.'
  );

  // Reset local state when signal index changes
  useEffect(() => {
    setS1CardStates({});
    setS1ShowDecision(false);
    setS1Feedback(null);

    setS2ClickedPhrases([]);
    setS2AssembledChips([]);
    setS2CustomRefusal('');

    setS3Flagged([]);
    setS3Feedback(null);

    setS4Reply('');
    setS4SelectedAdults([]);
    setS4Feedback(null);

    setS5Classified({});
    setS5Feedback(null);

    setS6Feedback(null);
  }, [signalIndex]);

  // SIGNAL 1 LOGIC
  const handleS1MoveCard = (cardId: string, current: 'pool' | 'fact' | 'speculation') => {
    SoundFX.click();
    setS1CardStates((prev) => {
      let next: 'pool' | 'fact' | 'speculation' = 'fact';
      if (current === 'pool') next = 'fact';
      else if (current === 'fact') next = 'speculation';
      else next = 'pool';
      return { ...prev, [cardId]: next };
    });
  };

  const checkS1Sorting = () => {
    const cards = signal.task1?.cards || [];
    const sortedCount = cards.filter((c) => s1CardStates[c.id] && s1CardStates[c.id] !== 'pool').length;
    if (sortedCount < cards.length) {
      SoundFX.caution();
      showNotice('CHƯA XẾP HẾT 5 THẺ', 'Em hãy xếp đủ cả 5 thẻ vào 2 ô trước khi bấm xác nhận nhé!');
      return;
    }

    const allCorrect = cards.every((c) => s1CardStates[c.id] === c.category);
    if (allCorrect) {
      SoundFX.success();
      setS1ShowDecision(true);
      Narrator.speak(
        'Phân loại hoặc nhận diện chính xác! Em đã phân biệt rất sắc bén giữa dữ kiện thực tế và điều chưa thể kết luận. Bây giờ, hãy đưa ra quyết định an toàn.'
      );
    } else {
      SoundFX.caution();
      Narrator.speak(
        'Chưa hoàn toàn chính xác. Hãy nhớ rằng: những gì quan sát trực tiếp là dữ kiện; còn quy kết người lạ là tội phạm hoặc chai nước chứa ma túy khi chưa kiểm nghiệm chỉ là suy đoán.'
      );
      showNotice(
        'LƯU Ý DỮ KIỆN',
        'Chỉ những thông tin quan sát được (đứng ngoài cổng, phát miễn phí, chưa rõ xuất xứ) là DỮ KIỆN. Các khẳng định "chắc chắn tội phạm" hoặc "chứa ma túy" là ĐIỀU CHƯA THỂ KẾT LUẬN.'
      );
    }
  };

  const handleS1Action = (opt: { text: string; safe: boolean; reason: string }) => {
    if (opt.safe) {
      SoundFX.success();
      setS1Feedback({ isSafe: true, text: opt.reason });
      setTimeout(() => {
        onCompleteSignal(0);
      }, 1000);
    } else {
      SoundFX.caution();
      setS1Feedback({ isSafe: false, text: opt.reason });
    }
  };

  // SIGNAL 2 LOGIC
  const handleS2PhraseClick = (idx: number) => {
    SoundFX.click();
    if (s2ClickedPhrases.includes(idx)) return;
    const next = [...s2ClickedPhrases, idx];
    setS2ClickedPhrases(next);
    if (next.length === (signal.pressurePhrases?.length || 4)) {
      SoundFX.ping();
      Narrator.speak(
        'Đã nhận diện đủ 4 câu gây sức ép. Hãy tạo lời từ chối ngắn, dứt khoát và chỉ rõ nơi em sẽ rời đến.'
      );
    }
  };

  const handleS2SubmitRefusal = () => {
    const text = s2AssembledChips.join(' ') + ' ' + s2CustomRefusal.trim();
    if (s2AssembledChips.length < 2 && s2CustomRefusal.trim().length < 5) {
      SoundFX.caution();
      showNotice(
        'CẦN CÂU TỪ CHỐI RÕ RÀNG',
        'Hãy ghép các mảnh hoặc tự viết một câu từ chối ngắn và nói rõ nơi em sẽ rời đến nhé!'
      );
      return;
    }
    SoundFX.success();
    Narrator.speak(
      'Phân loại hoặc nhận diện chính xác! Lời từ chối dứt khoát kết hợp rời ngay đến nơi an toàn là lá chắn tự vệ hữu hiệu nhất.'
    );
    onCompleteSignal(1);
  };

  // SIGNAL 3 LOGIC
  const handleS3FlagClick = (idx: number) => {
    SoundFX.caution();
    if (s3Flagged.includes(idx)) return;
    const next = [...s3Flagged, idx];
    setS3Flagged(next);
    if (next.length === 3) {
      SoundFX.ping();
      Narrator.speak('Cả 3 dấu hiệu cảnh giác đều xuất hiện. Em hãy chọn phương án an toàn nhất.');
    }
  };

  const handleS3Action = (opt: { text: string; safe: boolean; reason: string }) => {
    if (opt.safe) {
      SoundFX.success();
      setS3Feedback({ isSafe: true, text: opt.reason });
      Narrator.speak(
        'Phân loại hoặc nhận diện chính xác! Em không cần phải mở hay kiểm tra vật phẩm; không nhận, không giữ hộ và rời đi là lựa chọn an toàn tuyệt đối.'
      );
      setTimeout(() => {
        onCompleteSignal(2);
      }, 1000);
    } else {
      SoundFX.caution();
      setS3Feedback({ isSafe: false, text: opt.reason });
    }
  };

  // SIGNAL 4 LOGIC
  const handleS4Submit = () => {
    if (s4SelectedAdults.length === 0) {
      SoundFX.caution();
      showNotice('CHỌN NGƯỜI LỚN TIN CẬY', 'Em hãy chọn ít nhất một người lớn đáng tin cậy có thể tiếp cận để hỗ trợ bạn.');
      return;
    }

    const adultOptions = signal.adultOptions || [];
    const hasUnsafe = s4SelectedAdults.some((id) => {
      const opt = adultOptions.find((a) => a.id === id);
      return opt && !opt.correct;
    });

    if (hasUnsafe) {
      SoundFX.caution();
      setS4Feedback({
        isSafe: false,
        text: 'Chưa an toàn: Không nên im lặng giữ bí mật khi bạn bị đe dọa, và tuyệt đối không rủ nhau tự đi đối chất kẻ xấu. Hãy tìm người lớn có trách nhiệm bảo vệ học sinh.'
      });
      return;
    }

    SoundFX.success();
    setS4Feedback({
      isSafe: true,
      text: 'Lắng nghe, chia sẻ và tìm đến Thầy Cô / Cha Mẹ / Cán bộ chuyên trách là hành động cứu bạn đúng mực.'
    });
    Narrator.speak(
      'Phân loại hoặc nhận diện chính xác! Bảo vệ bạn không phải là che giấu mù quáng. Tìm người lớn đáng tin cậy chính là cách bảo vệ bạn.'
    );
    setTimeout(() => {
      onCompleteSignal(3);
    }, 1000);
  };

  // SIGNAL 5 LOGIC
  const handleS5Classify = (item: { id: string; text: string; type: 'fact' | 'speculation' }) => {
    SoundFX.click();
    setS5Classified((prev) => ({
      ...prev,
      [item.id]: item.type
    }));
  };

  const handleS5Action = (opt: { text: string; safe: boolean; reason: string }) => {
    if (opt.safe) {
      SoundFX.success();
      setS5Feedback({ isSafe: true, text: opt.reason });
      setTimeout(() => {
        onCompleteSignal(4);
      }, 1000);
    } else {
      SoundFX.caution();
      setS5Feedback({ isSafe: false, text: opt.reason });
    }
  };

  // SIGNAL 6 LOGIC
  const handleS6Action = (opt: { text: string; safe: boolean; reason: string }) => {
    if (opt.safe) {
      SoundFX.success();
      setS6Feedback({ isSafe: true, text: opt.reason });
      Narrator.speak(
        'Phân loại hoặc nhận diện chính xác! Giữ khoảng cách an toàn, không chạm vào và báo tin ngay cho người có trách nhiệm.'
      );
    } else {
      SoundFX.caution();
      setS6Feedback({ isSafe: false, text: opt.reason });
    }
  };

  const handleS6Finish = () => {
    SoundFX.success();
    onCompleteSignal(5);
  };

  return (
    <div className="h-full flex flex-col justify-between max-w-5xl mx-auto w-full gameshow-main-card p-4 md:p-6 border border-cyan-500/40 overflow-y-auto">
      {/* Signal Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-400 text-cyan-300 font-mono-tag text-xs md:text-sm font-bold tracking-wider">
            {signal.code}
          </span>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold font-tech-header text-amber-300 tracking-wide">
              {signal.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {signal.subtitle} · Trọng tâm: <span className="text-cyan-300 font-bold">{signal.skillFocus}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTriggerPause}
            className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition"
            title="Tạm dừng để học sinh làm phiếu trước khi phản hồi"
          >
            <span>⏸</span> Thảo luận / Làm phiếu
          </button>
          <span className="text-xs md:text-sm font-mono-tag text-cyan-300 bg-[#060e20] px-3 py-1 rounded-full border border-slate-700">
            TÍN HIỆU {signalIndex + 1}/06
          </span>
        </div>
      </div>

      {/* Dynamic Signal Content Area */}
      <div className="flex-1 flex flex-col justify-center my-1">
        {/* ======================= SIGNAL 1 ======================= */}
        {signalIndex === 0 && (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#060e20]/95 via-[#0a1630] to-[#060e20]/95 border border-cyan-500/40 flex items-center gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border-2 border-cyan-400/60 flex items-center justify-center shrink-0 text-cyan-300">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed">
                <strong className="text-amber-400 font-bold uppercase tracking-wide">Tình huống giả định:</strong>{' '}
                {signal.contextText}
              </p>
            </div>

            {/* Task 1: Fact vs Speculation */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-amber-400 uppercase tracking-wide font-tech-header flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                  NHIỆM VỤ 1: PHÂN BIỆT DỮ KIỆN VÀ ĐIỀU CHƯA THỂ KẾT LUẬN
                </h3>
                <span className="text-xs font-mono-tag font-bold text-cyan-300 bg-[#030814] px-3 py-0.5 rounded-full border border-cyan-500/40">
                  Đã xếp:{' '}
                  {
                    (signal.task1?.cards || []).filter(
                      (c) => s1CardStates[c.id] && s1CardStates[c.id] !== 'pool'
                    ).length
                  }
                  /5 thẻ
                </span>
              </div>

              {/* Pool */}
              <div className="flex flex-wrap gap-2 p-3 bg-[#030814]/85 rounded-2xl border-2 border-dashed border-slate-700 min-h-[64px] items-center">
                {(signal.task1?.cards || []).map((c) => {
                  const state = s1CardStates[c.id] || 'pool';
                  if (state !== 'pool') return null;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleS1MoveCard(c.id, state)}
                      className="card-luxury-interactive px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-100 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-cyan-400 font-bold">⠿</span>
                      <span className="font-medium">{c.text}</span>
                      <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-400/40 px-1.5 py-0.5 rounded">
                        Chuyển ô ➔
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 2 Buckets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Fact Bucket */}
                <div className="p-3.5 rounded-2xl min-h-[140px] flex flex-col justify-start bg-[radial-gradient(120%_120%_at_50%_0%,rgba(0,240,255,0.08)_0%,rgba(4,18,38,0.85)_100%)] border-2 border-cyan-500/60">
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-cyan-500/30">
                    <span className="text-xs sm:text-sm font-bold text-cyan-300 font-tech-header uppercase">
                      DỮ KIỆN ĐÃ BIẾT THỰC TẾ (3 THẺ)
                    </span>
                    <span className="text-[10px] font-mono-tag text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
                      SỰ THẬT QUAN SÁT
                    </span>
                  </div>
                  <div className="space-y-1.5 flex-1 min-h-[50px]">
                    {(signal.task1?.cards || [])
                      .filter((c) => s1CardStates[c.id] === 'fact')
                      .map((c) => (
                        <div
                          key={c.id}
                          onClick={() => handleS1MoveCard(c.id, 'fact')}
                          className="px-3 py-1.5 rounded-xl text-xs sm:text-sm text-cyan-100 flex items-center justify-between border border-cyan-400 bg-cyan-950/60 cursor-pointer"
                        >
                          <span>{c.text}</span>
                          <span className="text-[10px] text-cyan-300">Đổi ô ➔</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Speculation Bucket */}
                <div className="p-3.5 rounded-2xl min-h-[140px] flex flex-col justify-start bg-[radial-gradient(120%_120%_at_50%_0%,rgba(245,158,11,0.08)_0%,rgba(35,18,5,0.85)_100%)] border-2 border-amber-500/60">
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-amber-500/30">
                    <span className="text-xs sm:text-sm font-bold text-amber-400 font-tech-header uppercase">
                      ĐIỀU CHƯA THỂ KẾT LUẬN (2 THẺ)
                    </span>
                    <span className="text-[10px] font-mono-tag text-amber-400 bg-amber-950 px-2 py-0.5 rounded">
                      SUY ĐOÁN
                    </span>
                  </div>
                  <div className="space-y-1.5 flex-1 min-h-[50px]">
                    {(signal.task1?.cards || [])
                      .filter((c) => s1CardStates[c.id] === 'speculation')
                      .map((c) => (
                        <div
                          key={c.id}
                          onClick={() => handleS1MoveCard(c.id, 'speculation')}
                          className="px-3 py-1.5 rounded-xl text-xs sm:text-sm text-amber-100 flex items-center justify-between border border-amber-400 bg-amber-950/60 cursor-pointer"
                        >
                          <span>{c.text}</span>
                          <span className="text-[10px] text-amber-300">Đổi ô ➔</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {!s1ShowDecision && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-300 italic">Nhấp vào thẻ để chuyển ô tương ứng.</span>
                  <button
                    onClick={checkS1Sorting}
                    className="btn-action-gold px-6 py-2.5 rounded-xl text-[#030814] font-black text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer"
                  >
                    Xác Nhận Phân Loại ➔
                  </button>
                </div>
              )}
            </div>

            {/* Task 2: Action */}
            {s1ShowDecision && (
              <div className="space-y-2.5 pt-2 border-t border-slate-700/60 animate-fade-in">
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-cyan-300 uppercase tracking-wide font-tech-header">
                  NHIỆM VỤ 2: DỰA VÀO DỮ KIỆN ĐÃ BIẾT, HÀNH ĐỘNG NÀO LÀ AN TOÀN NHẤT?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {(signal.task2?.options || []).map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleS1Action(opt)}
                      className="card-luxury-interactive p-3 rounded-xl border border-slate-700 hover:border-cyan-400 text-left text-xs sm:text-sm text-slate-100 flex items-center gap-2.5 cursor-pointer"
                    >
                      <span className="w-6 h-6 rounded bg-[#060e20] border border-cyan-500/40 text-cyan-400 font-mono-tag text-xs font-bold flex items-center justify-center shrink-0">
                        0{i + 1}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>

                {s1Feedback && (
                  <div
                    className={`p-3 rounded-xl text-xs sm:text-sm ${
                      s1Feedback.isSafe
                        ? 'badge-accuracy-success text-white'
                        : 'bg-rose-950/90 border border-rose-500 text-rose-200'
                    }`}
                  >
                    <strong>{s1Feedback.isSafe ? 'Chính xác! ' : 'Lựa chọn chưa an toàn: '}</strong>
                    {s1Feedback.text}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================= SIGNAL 2 ======================= */}
        {signalIndex === 1 && (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-2xl bg-[#060e20]/85 border border-slate-700 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400 font-mono-tag font-bold text-xs">
                PEER
              </div>
              <div className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed">
                <span className="text-amber-400 font-bold uppercase">Tình huống nhóm bạn:</span>{' '}
                {signal.contextText}
              </div>
            </div>

            {/* Pressure Gauge */}
            <div className="p-3.5 rounded-2xl bg-[#030814] border border-cyan-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-bold text-rose-400 font-tech-header uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  MÁY ĐO ÁP LỰC ĐỒNG TRANG LỨA
                </span>
                <span className="text-xs font-mono-tag text-slate-300">
                  Phát hiện: {s2ClickedPhrases.length}/4 câu gây sức ép
                </span>
              </div>
              <div className="w-full h-3 bg-[#060e20] rounded-full overflow-hidden border border-slate-700 mb-3">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 transition-all duration-300"
                  style={{ width: `${(s2ClickedPhrases.length / 4) * 100}%` }}
                ></div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-2">
                Nhấn vào tất cả 4 câu thể hiện sự ép buộc, công kích để kích hoạt máy đo:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(signal.pressurePhrases || []).map((p, idx) => {
                  const isClicked = s2ClickedPhrases.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleS2PhraseClick(idx)}
                      className={`p-2.5 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${
                        isClicked
                          ? 'bg-rose-950 border-rose-400 text-rose-200'
                          : 'bg-[#0a1630] border-slate-700 hover:border-amber-400 text-slate-200'
                      }`}
                    >
                      <span className="font-bold">{p.text}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                        {p.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Refusal Builder */}
            {s2ClickedPhrases.length >= 4 && (
              <div className="space-y-3 pt-2 border-t border-slate-700/60 animate-fade-in">
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-cyan-300 uppercase tracking-wide font-tech-header">
                  LẬP LỜI TỪ CHỐI DỨT KHOÁT VÀ CHỈ RÕ NƠI SẼ RỜI ĐẾN:
                </h3>

                <div className="min-h-[48px] p-2.5 rounded-xl bg-cyan-950/40 border-2 border-cyan-400 flex flex-wrap gap-1.5 items-center text-xs sm:text-sm text-cyan-100">
                  {s2AssembledChips.length === 0 ? (
                    <span className="text-slate-400 italic">
                      Chọn các mảnh bên dưới để ghép lời từ chối hoặc tự gõ vào ô...
                    </span>
                  ) : (
                    s2AssembledChips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-cyan-900 border border-cyan-400 text-cyan-200 font-bold text-xs"
                      >
                        {chip}
                      </span>
                    ))
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(signal.refusalChips || []).map((chip, idx) => {
                    const isUsed = s2AssembledChips.includes(chip);
                    return (
                      <button
                        key={idx}
                        disabled={isUsed}
                        onClick={() => {
                          SoundFX.click();
                          setS2AssembledChips((prev) => [...prev, chip]);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs sm:text-sm transition cursor-pointer ${
                          isUsed
                            ? 'opacity-30 bg-[#060e20] border-slate-800 text-slate-500'
                            : 'bg-[#0a1630] hover:bg-cyan-900 border-slate-700 text-slate-100 hover:border-cyan-400'
                        }`}
                      >
                        + {chip}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1">
                  <input
                    type="text"
                    value={s2CustomRefusal}
                    onChange={(e) => setS2CustomRefusal(e.target.value)}
                    placeholder="Hoặc tự gõ câu từ chối + nơi em sẽ rời đến (Ví dụ: 'Không, mình không thử. Mình vào thư viện đây.')..."
                    className="w-full px-3 py-2 rounded-xl bg-[#060e20] border border-slate-700 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-400 font-serif"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      SoundFX.click();
                      setS2AssembledChips([]);
                      setS2CustomRefusal('');
                    }}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Xóa ghép lại ↺
                  </button>
                  <button
                    onClick={handleS2SubmitRefusal}
                    className="btn-action-gold px-6 py-2 rounded-xl text-[#030814] font-bold text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer"
                  >
                    Xác Nhận Lời Từ Chối &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================= SIGNAL 3 ======================= */}
        {signalIndex === 2 && (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-2xl bg-[#060e20]/85 border border-slate-700 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed">
                <span className="text-cyan-300 font-bold uppercase">Tình huống hành lang:</span>{' '}
                {signal.contextText}
              </div>
            </div>

            {/* 3 Red Flags */}
            <div className="p-3.5 rounded-2xl bg-[#030814] border border-amber-500/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5 font-tech-header">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                  XÁC ĐỊNH 03 DẤU HIỆU CẢNH GIÁC RỦI RO
                </span>
                <span className="text-xs font-mono-tag text-slate-300">{s3Flagged.length}/3 dấu hiệu</span>
              </div>

              <div className="space-y-2">
                {(signal.redFlags || []).map((flag, idx) => {
                  const isChecked = s3Flagged.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleS3FlagClick(idx)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        isChecked
                          ? 'bg-amber-950/40 border-amber-400'
                          : 'bg-[#0a1630] border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{flag.icon}</span>
                        <span className="text-xs sm:text-sm text-slate-100">{flag.text}</span>
                      </div>
                      <span className="text-xs font-mono-tag text-slate-400">
                        {isChecked ? (
                          <span className="text-amber-400 font-bold">✓ ĐÃ XÁC NHẬN</span>
                        ) : (
                          '[Nhấn xác nhận]'
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action options */}
            {s3Flagged.length >= 3 && (
              <div className="space-y-2.5 pt-2 border-t border-slate-700/60 animate-fade-in">
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-cyan-300 uppercase tracking-wide font-tech-header">
                  Phương án xử lý an toàn nhất của em là gì?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {(signal.options || []).map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleS3Action(opt)}
                      className="card-luxury-interactive p-3 rounded-xl border border-slate-700 hover:border-cyan-400 text-left text-xs sm:text-sm text-slate-100 transition cursor-pointer"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {s3Feedback && (
                  <div
                    className={`p-3 rounded-xl text-xs sm:text-sm ${
                      s3Feedback.isSafe
                        ? 'badge-accuracy-success text-white'
                        : 'bg-rose-950/90 border border-rose-500 text-rose-200'
                    }`}
                  >
                    <strong>{s3Feedback.isSafe ? 'Chính xác! ' : 'Nguy cơ tiềm ẩn: '}</strong>
                    {s3Feedback.text}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================= SIGNAL 4 ======================= */}
        {signalIndex === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Chat simulation */}
            <div className="p-3.5 rounded-2xl bg-[#030814] border border-cyan-500/30 flex flex-col justify-between h-[360px]">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                  👤
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-200 block">Bạn Cùng Khối</span>
                  <span className="text-[10px] text-emerald-400">Đang trò chuyện trực tuyến</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-2 space-y-2">
                {(signal.chatLog || []).map((msg, i) => (
                  <div key={i} className="flex flex-col items-start">
                    <div className="max-w-[88%] p-2.5 rounded-xl rounded-tl-sm bg-[#0a1630] border border-slate-700 text-xs sm:text-sm text-slate-100 leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 rounded-xl bg-[#060e20] border border-slate-800 text-xs text-amber-300 italic">
                ⚠ Bạn đang bị ép buộc và xin giữ bí mật. Cần hồi đáp và tìm người lớn can thiệp bảo vệ.
              </div>
            </div>

            {/* Response + Adult selector */}
            <div className="flex flex-col justify-between space-y-2.5">
              <div>
                <label className="text-xs sm:text-sm font-bold text-amber-400 block mb-1 font-tech-header uppercase">
                  1. Viết nguyên câu em đáp lại bạn (thể hiện lắng nghe, không hứa giấu kín):
                </label>
                <textarea
                  rows={2}
                  value={s4Reply}
                  onChange={(e) => setS4Reply(e.target.value)}
                  placeholder="Ví dụ: 'Cậu bình tĩnh nhé, mình luôn ở bên cậu. Nhưng chuyện này nguy hiểm, mình phải cùng thầy cô / bố mẹ tìm cách bảo vệ cậu.'..."
                  className="w-full p-2.5 rounded-xl bg-[#060e20] border border-slate-700 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-400 font-serif mb-2"
                ></textarea>

                <label className="text-xs sm:text-sm font-bold text-cyan-300 block mb-1 font-tech-header uppercase">
                  2. Chọn người lớn tin cậy có thể tiếp cận để giúp bạn:
                </label>
                <div className="space-y-1.5 max-h-[170px] overflow-y-auto pr-1">
                  {(signal.adultOptions || []).map((opt) => {
                    const isSelected = s4SelectedAdults.includes(opt.id);
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer text-xs sm:text-sm transition ${
                          isSelected
                            ? 'bg-cyan-950/80 border-cyan-400'
                            : 'bg-[#060e20]/80 border-slate-700 hover:border-cyan-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            SoundFX.click();
                            if (e.target.checked) {
                              setS4SelectedAdults((prev) => [...prev, opt.id]);
                            } else {
                              setS4SelectedAdults((prev) => prev.filter((id) => id !== opt.id));
                            }
                          }}
                          className="w-4 h-4 text-cyan-500 rounded border-slate-700 bg-navy-950"
                        />
                        <div>
                          <strong className="text-slate-100 block">{opt.name}</strong>
                          <span className="text-[11px] text-slate-300">{opt.role}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <span className="text-xs text-slate-400 italic">Có thể chọn nhiều đầu mối tin cậy.</span>
                <button
                  onClick={handleS4Submit}
                  className="btn-action-gold px-6 py-2 rounded-xl text-[#030814] font-bold text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer"
                >
                  Xác Nhận Trợ Giúp ➔
                </button>
              </div>

              {s4Feedback && (
                <div
                  className={`p-2.5 rounded-xl text-xs sm:text-sm ${
                    s4Feedback.isSafe
                      ? 'badge-accuracy-success text-white'
                      : 'bg-rose-950/90 border border-rose-500 text-rose-200'
                  }`}
                >
                  {s4Feedback.text}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================= SIGNAL 5 ======================= */}
        {signalIndex === 4 && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#060e20]/85 border border-slate-700 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-400">
                👥
              </div>
              <div className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed">
                <span className="text-cyan-300 font-bold uppercase">Tình huống quan sát:</span>{' '}
                {signal.contextText}
              </div>
            </div>

            {/* Sorting items */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-amber-400 font-tech-header uppercase">
                  1. Phân loại phát biểu: DỮ KIỆN hay SUY ĐOÁN GÁN NHÃN?
                </span>
                <span className="text-xs font-mono-tag text-cyan-400">
                  {Object.keys(s5Classified).length}/5 đã phân loại
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-[#030814] border border-cyan-500/40 min-h-[100px]">
                  <span className="text-xs font-bold text-cyan-400 block mb-1 font-tech-header">
                    DỮ KIỆN (Thấy trực tiếp)
                  </span>
                  <div className="space-y-1.5">
                    {(signal.sortingItems || [])
                      .filter((item) => s5Classified[item.id] === 'fact')
                      .map((item) => (
                        <div
                          key={item.id}
                          className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-400 text-cyan-200 text-xs sm:text-sm"
                        >
                          ✓ {item.text}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#030814] border border-amber-500/40 min-h-[100px]">
                  <span className="text-xs font-bold text-amber-400 block mb-1 font-tech-header">
                    SUY ĐOÁN / GÁN NHÃN (Chưa có căn cứ)
                  </span>
                  <div className="space-y-1.5">
                    {(signal.sortingItems || [])
                      .filter((item) => s5Classified[item.id] === 'speculation')
                      .map((item) => (
                        <div
                          key={item.id}
                          className="px-3 py-1.5 rounded-lg bg-amber-950 border border-amber-400 text-amber-200 text-xs sm:text-sm"
                        >
                          ⚠ {item.text}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Pool */}
              <div className="flex flex-wrap gap-2 p-2 bg-[#060e20]/60 rounded-xl border border-slate-800">
                {(signal.sortingItems || []).map((item) => {
                  const isDone = !!s5Classified[item.id];
                  if (isDone) return null;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleS5Classify(item)}
                      className="px-3 py-1.5 rounded-lg bg-[#0a1630] hover:bg-slate-700 border border-slate-600 text-xs sm:text-sm text-slate-100 transition cursor-pointer"
                    >
                      {item.text} &rarr;
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action options */}
            {Object.keys(s5Classified).length >= 5 && (
              <div className="space-y-2.5 pt-2 border-t border-slate-800 animate-fade-in">
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-cyan-300 uppercase tracking-wide font-tech-header">
                  2. Hành động phù hợp và đúng đắn nhất của em là gì?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {(signal.actionOptions || []).map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleS5Action(opt)}
                      className="card-luxury-interactive p-3 rounded-xl border border-slate-700 hover:border-cyan-400 text-left text-xs sm:text-sm text-slate-100 transition cursor-pointer"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {s5Feedback && (
                  <div
                    className={`p-3 rounded-xl text-xs sm:text-sm ${
                      s5Feedback.isSafe
                        ? 'badge-accuracy-success text-white'
                        : 'bg-rose-950/90 border border-rose-500 text-rose-200'
                    }`}
                  >
                    <strong>{s5Feedback.isSafe ? 'Chính xác! ' : 'Lựa chọn chưa phù hợp: '}</strong>
                    {s5Feedback.text}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================= SIGNAL 6 ======================= */}
        {signalIndex === 5 && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#060e20]/85 border border-slate-700 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400">
                📦
              </div>
              <div className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed">
                <span className="text-amber-400 font-bold uppercase">Tình huống sân trường:</span>{' '}
                {signal.contextText}
              </div>
            </div>

            {/* Action 1 */}
            <div className="space-y-2">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-cyan-300 uppercase tracking-wide font-tech-header">
                1. Khi thấy vật thể không có nhãn mác ở nơi vắng người, em nên làm gì?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {(signal.actionOptions || []).map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleS6Action(opt)}
                    className="card-luxury-interactive p-3 rounded-xl border border-slate-700 hover:border-cyan-400 text-left text-xs sm:text-sm text-slate-100 transition cursor-pointer"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {s6Feedback && (
                <div
                  className={`p-3 rounded-xl text-xs sm:text-sm ${
                    s6Feedback.isSafe
                      ? 'badge-accuracy-success text-white'
                      : 'bg-rose-950/90 border border-rose-500 text-rose-200'
                  }`}
                >
                  <strong>{s6Feedback.isSafe ? 'Chính xác! ' : 'Hành động rủi ro: '}</strong>
                  {s6Feedback.text}
                </div>
              )}
            </div>

            {/* Report Builder: 4 Elements */}
            {s6Feedback?.isSafe && (
              <div className="space-y-2.5 pt-2 border-t border-slate-800 animate-fade-in">
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-amber-400 uppercase tracking-wide font-tech-header">
                  2. Lập lời báo tin an toàn đủ 4 yếu tố: Thời gian – Nơi thấy – Điều trực tiếp thấy – Người em báo
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(signal.reportElements || []).map((el, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#030814] border border-cyan-500/30">
                      <span className="text-xs font-bold text-cyan-300 block mb-0.5">{el.label}</span>
                      <span className="text-xs text-slate-300 italic">{el.example}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <input
                    type="text"
                    value={s6ReportCustom}
                    onChange={(e) => setS6ReportCustom(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#060e20] border border-cyan-400/50 text-xs sm:text-sm text-slate-100 font-serif"
                  />
                </div>

                <div className="text-right pt-1">
                  <button
                    onClick={handleS6Finish}
                    className="btn-action-gold px-6 py-2.5 rounded-xl text-[#030814] font-bold text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer"
                  >
                    Xác Nhận Báo Tin & Nhận Mảnh Lời Giải 06 ➔
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between shrink-0">
        <button
          onClick={() => {
            SoundFX.click();
            onOpenIntro();
          }}
          className="text-xs sm:text-sm text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-bold cursor-pointer"
        >
          &larr; Về Khởi Động
        </button>
        <div className="text-xs sm:text-sm text-slate-300 font-medium">
          Hãy hoàn thành thao tác để mở Thẻ Lời Giải
        </div>
      </div>
    </div>
  );
};
