/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NarrationBar } from './components/NarrationBar';
import { TeacherModal } from './components/TeacherModal';
import {
  DiscussionFreezeOverlay,
  GuideModal,
  NoticeModal,
  SolutionPieceModal,
  ResetConfirmModal
} from './components/Modals';
import { SignalView } from './components/SignalView';
import {
  CardDView,
  DossierView,
  GrandChallengeView,
  CipherView,
  ResultsView
} from './components/OtherViews';
import { SoundFX, Narrator } from './audio/soundEngine';
import { SIGNALS_DATA, SOLUTION_PIECES, CARD_D_DATA, SolutionPiece } from './data/lessonData';
import { Shield, BookOpen, Rocket } from 'lucide-react';

export default function App() {
  const [currentStage, setCurrentStage] = useState<
    'intro' | 'signal' | 'card_d' | 'dossier' | 'grand_challenge' | 'cipher' | 'results'
  >('intro');
  const [signalIndex, setSignalIndex] = useState(0);
  const [completedSignalIds, setCompletedSignalIds] = useState<number[]>([]);
  const [showHints, setShowHints] = useState(true);

  // Audio & Narration State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [isVoicePaused, setIsVoicePaused] = useState(false);
  const [narrationText, setNarrationText] = useState(
    'Hệ thống an toàn học đường đang ở chế độ trực chiến...'
  );

  // Modals
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [activeSolutionPiece, setActiveSolutionPiece] = useState<SolutionPiece | null>(null);
  const [notice, setNotice] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: '',
    message: ''
  });

  // Subscribe to narrator audio state changes
  useEffect(() => {
    const unsubscribe = Narrator.subscribe(({ isPlaying, isPaused, text }) => {
      setIsVoicePlaying(isPlaying);
      setIsVoicePaused(isPaused);
      if (text) setNarrationText(text);
    });
    return unsubscribe;
  }, []);

  // Speak initial intro text on mount
  useEffect(() => {
    const introText =
      'Hôm nay, nhiệm vụ của các em không phải là đoán tên một loại ma túy. Nhiệm vụ khó hơn nhiều. Khi một nguy cơ xuất hiện nhưng không mang biển báo nguy hiểm, liệu các em có đủ bình tĩnh để nhận ra và đưa ra quyết định an toàn? Phòng điều khiển đang nhận được sáu tín hiệu. Hãy cùng xử lý từng tín hiệu để thu thập các mảnh lời giải.';
    Narrator.speak(introText);
  }, []);

  // Show notice dialog
  const showNotice = (title: string, message: string) => {
    setNotice({ isOpen: true, title, message });
  };

  // Stage transitions
  const startSignal = (idx: number) => {
    if (idx >= SIGNALS_DATA.length) {
      goToDossier();
      return;
    }
    setSignalIndex(idx);
    setCurrentStage('signal');
    SoundFX.ping();
    Narrator.speak(SIGNALS_DATA[idx].voiceText);
  };

  const handleCompleteSignal = (completedIndex: number) => {
    const signalId = completedIndex + 1;
    if (!completedSignalIds.includes(signalId)) {
      setCompletedSignalIds((prev) => [...prev, signalId]);
    }
    SoundFX.unlock();
    const piece = SOLUTION_PIECES.find((p) => p.signalId === signalId) || null;
    setActiveSolutionPiece(piece);
  };

  const handleNextFromSolutionPiece = () => {
    setActiveSolutionPiece(null);
    if (signalIndex < 5) {
      startSignal(signalIndex + 1);
    } else {
      goToDossier();
    }
  };

  const goToDossier = () => {
    setCurrentStage('dossier');
    SoundFX.victory();
    Narrator.speak(
      '06 trên 06 tín hiệu đã được xử lý. Hồ sơ lời giải đã thu thập đủ sáu mảnh. Các em hãy cùng thảo luận để tự sắp xếp thành quy trình hành động an toàn.'
    );
  };

  const goToFinalChallenge = () => {
    setCurrentStage('grand_challenge');
    SoundFX.ping();
    Narrator.speak(
      'Thử thách tổng hợp: 5 phút quyết định tương lai. Tại buổi tụ tập, khi đối mặt nhiều sức ép cùng lúc, hãy vận dụng các mảnh lời giải để ra quyết định an toàn.'
    );
  };

  const handleTeacherRevealCipher = () => {
    setCurrentStage('cipher');
    SoundFX.victory();
    Narrator.speak(
      'Mật mã an toàn đã được giải! Dừng lại. Từ chối. Rời khỏi. Tìm người đáng tin cậy. Và báo tin khi cần thiết. Sức khỏe bất thường hoặc đe dọa trước mắt: ưu tiên đến nơi an toàn và tìm hỗ trợ y tế ngay, không chờ đi đủ từng bước.'
    );
  };

  const goToResults = () => {
    setCurrentStage('results');
    SoundFX.victory();
    Narrator.speak(
      'Hồ sơ năng lực an toàn học đường của em. Hệ thống ghi nhận các kỹ năng đã được luyện tập và những nội dung cần tiếp tục rèn giũa.'
    );
  };

  const openCardD = () => {
    setCurrentStage('card_d');
    SoundFX.emergency();
    Narrator.speak(CARD_D_DATA.voiceText);
  };

  const resetAll = () => {
    Narrator.stop();
    setSignalIndex(0);
    setCompletedSignalIds([]);
    setCurrentStage('intro');
    setIsResetConfirmOpen(false);
    SoundFX.ping();
    const introText =
      'Hôm nay, nhiệm vụ của các em không phải là đoán tên một loại ma túy. Nhiệm vụ khó hơn nhiều. Khi một nguy cơ xuất hiện nhưng không mang biển báo nguy hiểm, liệu các em có đủ bình tĩnh để nhận ra và đưa ra quyết định an toàn? Phòng điều khiển đang nhận được sáu tín hiệu. Hãy cùng xử lý từng tín hiệu để thu thập các mảnh lời giải.';
    Narrator.speak(introText);
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#030814] text-slate-100 font-serif select-none overflow-hidden">
      {/* Top Header */}
      <Header
        currentStage={currentStage}
        currentSignalIndex={signalIndex}
        completedSignalIds={completedSignalIds}
        onOpenIntro={() => {
          Narrator.stop();
          setCurrentStage('intro');
        }}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        onRequestReset={() => setIsResetConfirmOpen(true)}
        soundEnabled={soundEnabled}
        voiceEnabled={voiceEnabled}
        onToggleSound={() => {
          const next = SoundFX.toggle();
          setSoundEnabled(next);
        }}
        onToggleVoice={() => {
          const next = Narrator.toggle();
          setVoiceEnabled(next);
        }}
      />

      {/* Narration Status Ribbon */}
      <NarrationBar
        currentText={narrationText}
        isPlaying={isVoicePlaying}
        isPaused={isVoicePaused}
        onTogglePause={() => Narrator.togglePause()}
        onReplay={() => Narrator.replay()}
      />

      {/* Main Viewport */}
      <main className="flex-1 relative overflow-y-auto flex flex-col items-center justify-start sm:justify-center p-2.5 sm:p-4 md:p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d1f42] via-[#060e20] to-[#030814]">
        {/* Subtle background tech grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="w-full max-w-5xl my-auto flex flex-col relative z-10">
          {/* 1. INTRO STAGE */}
          {currentStage === 'intro' && (
            <div className="w-full max-w-4xl mx-auto my-auto flex flex-col items-center justify-center text-center px-2 py-3 animate-fade-in">
              <div className="gameshow-main-card w-full p-5 sm:p-7 md:p-8 flex flex-col items-center relative shadow-2xl">
                {/* Shield Brand Graphic */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#0A2552] to-[#041026] border-2 border-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_30px_rgba(0,200,255,0.5)] mb-3">
                  <div className="w-full h-full rounded-xl bg-[#030814]/95 flex items-center justify-center">
                    <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 drop-shadow-[0_0_12px_rgba(0,209,255,0.9)]" />
                  </div>
                </div>

                <div className="star-ribbon-tag inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-cyan-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
                  <span className="text-amber-400">★</span>
                  <span>KẾ HOẠCH DẠY HỌC 90 PHÚT · HỌC SINH LỚP 8</span>
                  <span className="text-amber-400">★</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-tech-header font-black tracking-wider uppercase mb-2 title-gold-neon">
                  MẬT MÃ AN TOÀN
                </h1>
                <p className="text-base sm:text-lg font-tech-header text-cyan-300 tracking-wider uppercase mb-2">
                  PHÒNG ĐIỀU KHIỂN QUYẾT ĐỊNH
                </p>

                <div className="theme-capsule-cyan px-6 py-1.5 rounded-full mb-4 max-w-xl mx-auto">
                  <h2 className="text-xs sm:text-sm md:text-base font-bold text-cyan-300 tracking-wide uppercase">
                    THÔNG ĐIỆP: 5 PHÚT QUYẾT ĐỊNH TƯƠNG LAI
                  </h2>
                </div>

                {/* Subbox: Principles */}
                <div className="content-subbox-dark w-full max-w-2xl rounded-2xl p-4 sm:p-5 text-left mb-5 shadow-inner">
                  <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-800 text-amber-400 font-bold text-sm md:text-base uppercase tracking-wider">
                    <span>📜</span>
                    <span>NGUYÊN TẮC HOẠT ĐỘNG & BẢO VỆ CHỦ ĐỘNG</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 text-sm mt-0.5">◆</span>
                      <span>
                        <strong>Không đoán tên ma túy bằng mắt thường</strong> – Rèn luyện phản xạ nhận diện yếu tố bất thường và ra quyết định an toàn.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 text-sm mt-0.5">◆</span>
                      <span>
                        Xử lý tuần tự <strong>06 Tín hiệu thực tế</strong> để tự rút ra <strong>06 mảnh lời giải hành động</strong> trên phiếu cá nhân/nhóm.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 text-sm mt-0.5">★</span>
                      <span>
                        Website chờ lệnh điều phối của Thầy Cô; học sinh kết hợp phiếu học tập giấy trước khi xem gợi ý và bước vào thử thách tổng hợp.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
                  <button
                    onClick={() => {
                      SoundFX.success();
                      startSignal(0);
                    }}
                    className="w-full sm:w-auto flex-1 btn-action-gold text-[#030814] font-black text-sm sm:text-base md:text-lg tracking-wider py-3.5 px-6 rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xl uppercase"
                  >
                    <Rocket className="w-5 h-5" />
                    <span>BẮT ĐẦU HOẠT ĐỘNG 01</span>
                    <span>➔</span>
                  </button>
                  <button
                    onClick={() => {
                      SoundFX.click();
                      setIsGuideModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#071630] hover:bg-[#0B2147] border border-cyan-500/40 text-cyan-300 font-bold text-xs sm:text-sm md:text-base tracking-wide transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Hướng dẫn</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. SIGNAL STAGE */}
          {currentStage === 'signal' && (
            <SignalView
              signalIndex={signalIndex}
              onCompleteSignal={handleCompleteSignal}
              onOpenIntro={() => {
                Narrator.stop();
                setCurrentStage('intro');
              }}
              onTriggerPause={() => {
                Narrator.stop();
                SoundFX.caution();
                setIsFreezeModalOpen(true);
              }}
              showNotice={showNotice}
            />
          )}

          {/* 3. CARD D EMERGENCY DRILL */}
          {currentStage === 'card_d' && (
            <CardDView
              onBackToS5={() => startSignal(4)}
              onProceedToS6={() => startSignal(5)}
            />
          )}

          {/* 4. DOSSIER (6 Pieces) */}
          {currentStage === 'dossier' && (
            <DossierView
              onTriggerPause={() => {
                Narrator.stop();
                SoundFX.caution();
                setIsFreezeModalOpen(true);
              }}
              onProceedToFinalChallenge={goToFinalChallenge}
            />
          )}

          {/* 5. GRAND CHALLENGE */}
          {currentStage === 'grand_challenge' && (
            <GrandChallengeView
              onTeacherRevealCipher={handleTeacherRevealCipher}
              showNotice={showNotice}
            />
          )}

          {/* 6. CIPHER UNLOCKED */}
          {currentStage === 'cipher' && (
            <CipherView onProceedToResults={goToResults} />
          )}

          {/* 7. RESULTS */}
          {currentStage === 'results' && (
            <ResultsView
              onReturnHome={() => {
                Narrator.stop();
                setCurrentStage('intro');
              }}
              onResetAll={resetAll}
            />
          )}
        </div>
      </main>

      {/* Teacher Control Modal */}
      <TeacherModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        onFreezeDiscussion={() => {
          Narrator.stop();
          setIsFreezeModalOpen(true);
        }}
        showHints={showHints}
        onToggleHints={setShowHints}
        onOpenCardD={openCardD}
        onJumpToSignal={(idx) => startSignal(idx)}
        onJumpToDossier={goToDossier}
        onJumpToFinalChallenge={goToFinalChallenge}
        onTeacherRevealCipher={handleTeacherRevealCipher}
      />

      {/* Discussion Freeze Overlay */}
      <DiscussionFreezeOverlay
        isOpen={isFreezeModalOpen}
        onResume={() => setIsFreezeModalOpen(false)}
      />

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      {/* Solution Piece Unlock Dialog */}
      <SolutionPieceModal
        isOpen={!!activeSolutionPiece}
        piece={activeSolutionPiece}
        showHints={showHints}
        onNext={handleNextFromSolutionPiece}
      />

      {/* Notice Dialog (Replaces window.alert) */}
      <NoticeModal
        isOpen={notice.isOpen}
        title={notice.title}
        message={notice.message}
        onClose={() => setNotice((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Reset Confirmation Dialog */}
      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onCancel={() => setIsResetConfirmOpen(false)}
        onConfirm={resetAll}
      />
    </div>
  );
}
