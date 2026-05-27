"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useStore, mockCampaigns } from "@/store/useStore";
import { ChevronRight, Link2, Loader2, CheckCircle2, SearchCode, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export default function MyPage() {
  const { xp, level, appliedCampaigns, badges, submitReview, snsLinked, linkSns } = useStore();
  const [linkInput, setLinkInput] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  
  // AI Review Scan States
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [targetCampaign, setTargetCampaign] = useState<{id: string, reward: number} | null>(null);
  const [reviewUrl, setReviewUrl] = useState('');
  const [scanStep, setScanStep] = useState(0);
  const [scanError, setScanError] = useState('');
  
  const xpBase = (level - 3) * 500;
  const currentLevelXp = xp - xpBase;
  const nextLevelXp = 500;
  const progressPercent = Math.min((currentLevelXp / nextLevelXp) * 100, 100);

  const activeQuests = mockCampaigns.filter(c => appliedCampaigns.includes(c.id));

  const handleReviewSubmit = (campaignId: string, reward: number) => {
    setTargetCampaign({id: campaignId, reward});
    setShowReviewModal(true);
    setScanStep(0);
    setReviewUrl('');
  };

  const handleStartScan = async () => {
    if (!reviewUrl) return;
    setScanStep(1); // Start scanning
    setScanError('');

    try {
      // Step 2: Fetching URL...
      setTimeout(() => setScanStep(2), 1000); 

      const res = await fetch('/api/verify-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: reviewUrl,
          requiredTags: ['#리뷰팝', '#맛집'] // 예시 해시태그
        })
      });

      const data = await res.json();
      
      setScanStep(3); // Analyzing content...
      
      setTimeout(() => {
        if (data.success) {
          setScanStep(4); // Finished
          
          // Confetti effect
          const duration = 2000;
          const end = Date.now() + duration;
          const frame = () => {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#45f0d1', '#ff0055'] });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#45f0d1', '#ff0055'] });
            if (Date.now() < end) requestAnimationFrame(frame);
          };
          frame();

          setTimeout(() => {
            if(targetCampaign) submitReview(targetCampaign.id, targetCampaign.reward);
            setShowReviewModal(false);
            setTargetCampaign(null);
          }, 2000);
        } else {
          setScanStep(0);
          setScanError(data.message);
        }
      }, 1500);

    } catch (error) {
      setScanStep(0);
      setScanError("서버와 통신할 수 없습니다.");
    }
  };

  const handleLinkSns = () => {
    if(!linkInput) return;
    setIsLinking(true);
    setTimeout(() => {
      linkSns(3500, 3);
      setIsLinking(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white p-4 sm:p-8 font-sans pb-24">
      
      <header className="flex justify-between items-center mb-8 py-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-purple">
          REVIEW.POP
        </Link>
        <div className="text-gray-400 text-sm font-medium">설정</div>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        
        {/* SNS 연동 영역 */}
        {!snsLinked && (
          <section className="glass p-6 sm:p-8 rounded-3xl border border-brand-neon/30 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-neon/20 blur-3xl rounded-full" />
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Link2 className="text-brand-neon" /> 내 SNS 채널 연동하기
            </h2>
            <p className="text-sm text-gray-400 mb-6">SNS를 연동하고 활동 지수를 측정해보세요!</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="인스타그램 ID 또는 블로그 URL 입력" 
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon transition"
              />
              <button 
                onClick={handleLinkSns}
                disabled={isLinking || !linkInput}
                className="bg-brand-neon text-black font-bold px-8 py-3 rounded-xl hover:bg-white transition flex items-center justify-center min-w-[120px]"
              >
                {isLinking ? <Loader2 className="animate-spin" /> : 'AI 연동 시작'}
              </button>
            </div>
          </section>
        )}

        {/* Profile & Gamification Dashboard */}
        <section className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-pop to-brand-purple p-1 shadow-[0_0_30px_rgba(255,94,58,0.3)]">
              <div className="w-full h-full bg-[#0b0c10] rounded-full flex items-center justify-center text-4xl">
                🐯
              </div>
            </div>
            
            <div className="flex-1 w-full text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-1">리뷰어킹 <span className="text-brand-neon ml-2 text-lg">Lv.{level}</span></h2>
              <p className="text-sm text-gray-400 mb-5">총 획득 XP: {xp}</p>
              
              <div className="w-full">
                <div className="flex justify-between text-xs font-bold font-mono mb-2">
                  <span className="text-brand-neon">{currentLevelXp} XP</span>
                  <span className="text-gray-500">{nextLevelXp} XP (Lv.{level + 1})</span>
                </div>
                <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-neon to-brand-pop rounded-full shadow-[0_0_10px_rgba(69,240,209,0.5)] transition-all duration-1000 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 text-right">다음 레벨까지 {nextLevelXp - currentLevelXp} XP 남았어요!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Badges Collection */}
        <section>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            내 뱃지 컬렉션 <span className="text-xs bg-brand-purple/20 text-brand-purple px-2 py-1 rounded-full">{badges.length}</span>
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {badges.map((badge, idx) => (
              <div key={idx} className="glass aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border border-brand-neon/30 bg-brand-neon/5">
                <div className="text-3xl mb-2">🔥</div>
                <span className="text-xs font-bold text-center">{badge}</span>
              </div>
            ))}
            {!badges.includes('레벨업 마스터') && (
              <div className="glass aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border border-white/5 opacity-50 bg-black/50">
                <div className="text-3xl mb-2 grayscale">🔒</div>
                <span className="text-xs font-bold text-center text-gray-600">레벨업 시 획득</span>
              </div>
            )}
          </div>
        </section>

        {/* Current Missions */}
        <section>
          <h3 className="text-xl font-bold mb-4">진행 중인 퀘스트</h3>
          {activeQuests.length === 0 ? (
            <div className="glass p-8 text-center text-gray-400 rounded-2xl border-dashed border-2 border-white/10">
              현재 진행 중인 퀘스트가 없습니다.<br/>홈에서 새로운 체험단을 신청해보세요!
            </div>
          ) : (
            <div className="space-y-4">
              {activeQuests.map(quest => (
                <div key={quest.id} className="glass p-5 rounded-2xl flex justify-between items-center border-l-4 border-l-brand-neon">
                  <div>
                    <p className="text-xs text-brand-neon font-bold mb-1">D-3 리뷰 마감</p>
                    <h4 className="font-bold text-lg">{quest.title}</h4>
                  </div>
                  <button 
                    onClick={() => handleReviewSubmit(quest.id, quest.xpReward)}
                    className="bg-brand-neon text-black text-sm font-bold px-4 py-2 rounded-full hover:bg-white transition-colors flex-shrink-0 ml-4 shadow-[0_0_10px_rgba(69,240,209,0.3)]"
                  >
                    리뷰 제출 (+{quest.xpReward})
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* AI Review Verifier Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden">
            {scanStep > 0 && scanStep < 4 && <div className="absolute inset-0 bg-brand-neon/5 animate-pulse" />}
            
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2 relative z-10">
              <SearchCode className="text-brand-neon" /> AI 리뷰 자동 검수
            </h2>
            <p className="text-sm text-gray-400 mb-6 relative z-10">광고주가 번거롭게 확인할 필요 없이, 리뷰팝 AI가 가이드라인 준수 여부를 즉시 스캔하여 XP를 정산해 드립니다.</p>
            
            {scanStep === 0 && (
              <div className="space-y-4 relative z-10">
                <input 
                  type="text" 
                  value={reviewUrl}
                  onChange={(e) => setReviewUrl(e.target.value)}
                  placeholder="작성하신 리뷰 URL (인스타/블로그) 복사 붙여넣기"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon transition"
                />
                <div className="flex gap-3">
                  <button onClick={() => setShowReviewModal(false)} className="flex-1 py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition">취소</button>
                  <button onClick={handleStartScan} disabled={!reviewUrl} className="flex-1 py-3 rounded-xl font-bold bg-brand-neon text-black hover:bg-white transition flex justify-center items-center">
                    AI 스캔 시작
                  </button>
                </div>
                {scanError && (
                  <div className="text-red-400 text-sm mt-3 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                    {scanError}
                  </div>
                )}
              </div>
            )}

            {scanStep > 0 && (
              <div className="space-y-5 py-4 relative z-10">
                <div className="flex items-center gap-3">
                  {scanStep >= 2 ? <CheckCircle2 className="text-brand-neon" size={24}/> : <Loader2 className="text-gray-500 animate-spin" size={24}/>}
                  <p className={scanStep >= 2 ? "text-white font-bold" : "text-gray-400"}>웹페이지 통신 및 데이터 추출 중...</p>
                </div>
                <div className="flex items-center gap-3">
                  {scanStep >= 3 ? <CheckCircle2 className="text-brand-neon" size={24}/> : (scanStep >= 2 ? <Loader2 className="text-gray-500 animate-spin" size={24}/> : <div className="w-6 h-6 rounded-full border-2 border-gray-700" />)}
                  <p className={scanStep >= 3 ? "text-white font-bold" : "text-gray-400"}>필수 해시태그 및 사진 판별 중...</p>
                </div>
                <div className="flex items-center gap-3">
                  {scanStep >= 4 ? <ShieldCheck className="text-brand-pop" size={24}/> : (scanStep >= 3 ? <Loader2 className="text-gray-500 animate-spin" size={24}/> : <div className="w-6 h-6 rounded-full border-2 border-gray-700" />)}
                  <p className={scanStep >= 4 ? "text-white font-bold" : "text-gray-400"}>AI 최종 승인 및 XP 정산 중...</p>
                </div>

                {scanStep === 4 && (
                  <div className="mt-6 bg-brand-neon/20 border border-brand-neon p-3 rounded-xl text-center text-brand-neon font-bold animate-fade-in-up">
                    가이드라인 100% 준수 확인!<br/>보상이 지급되었습니다.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 glass h-16 border-t border-white/10 flex justify-around items-center px-6 sm:hidden z-40">
        <Link href="/" className="text-gray-500 flex flex-col items-center gap-1">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-bold">홈</span>
        </Link>
        <Link href="/mypage" className="text-brand-neon flex flex-col items-center gap-1">
          <span className="text-lg shadow-[0_0_10px_rgba(69,240,209,0.3)] rounded-full">😎</span>
          <span className="text-[10px] font-bold">마이팝</span>
        </Link>
      </nav>
    </div>
  );
}
