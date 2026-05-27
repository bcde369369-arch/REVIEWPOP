"use client";

export const runtime = 'edge';

import { useParams, useRouter } from 'next/navigation';
import { useStore, mockCampaigns } from '@/store/useStore';
import { useState, useEffect } from 'react';
import { ShieldAlert, Zap, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CampaignDetail() {
  const params = useParams();
  const router = useRouter();
  const { appliedCampaigns, applyForCampaign, level: userLevel, userFollowers } = useStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [applyMessage, setApplyMessage] = useState('');
  const [probability, setProbability] = useState(0);
  const [isHighPass, setIsHighPass] = useState(false);
  
  const campaign = mockCampaigns.find(c => c.id === params.id);
  
  if (!campaign) {
    return <div className="min-h-screen bg-[#0b0c10] text-white p-8">Campaign not found</div>;
  }

  const isApplied = appliedCampaigns.includes(campaign.id);
  
  // Cutoff validation logic
  const isLevelMet = userLevel >= campaign.minLevel;
  const isFollowerMet = userFollowers >= campaign.minFollowers;
  const isQualified = isLevelMet && isFollowerMet;

  // High-pass VIP Logic
  // Requires: user level >= minLevel + 2 OR user followers >= minFollowers * 3
  const isVipEligible = isQualified && (userLevel >= campaign.minLevel + 2 || userFollowers >= campaign.minFollowers * 3);

  useEffect(() => {
    if (isQualified) {
      let baseProb = 40;
      // Bonus for high level
      if (userLevel > campaign.minLevel) baseProb += (userLevel - campaign.minLevel) * 15;
      // Bonus for followers
      if (userFollowers > campaign.minFollowers) baseProb += Math.min(30, (userFollowers / campaign.minFollowers) * 10);
      
      const finalProb = Math.min(99, Math.floor(baseProb));
      setProbability(finalProb);
      setIsHighPass(isVipEligible);
    } else {
      setProbability(0);
      setIsHighPass(false);
    }
  }, [userLevel, userFollowers, isQualified, campaign.minLevel, campaign.minFollowers, isVipEligible]);

  const handleOpenModal = () => {
    if (!isQualified) return;
    setShowModal(true);
  };

  const handleFinalApply = () => {
    setIsAnimating(true);
    
    if (isHighPass) {
      // Fire confetti for High-pass
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#45f0d1', '#ff0055', '#7b42ff']
      });
    }

    setTimeout(() => {
      // In a real app we would pass applyMessage to the store
      applyForCampaign(campaign.id, campaign.xpReward);
      setIsAnimating(false);
      setShowModal(false);
      router.push('/mypage');
    }, isHighPass ? 3000 : 1500); // Wait longer for confetti if high-pass
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white font-sans pb-24">
      {/* Header Image Placeholder */}
      <div className="w-full h-64 bg-gradient-to-br from-brand-purple to-black relative">
        <button onClick={() => router.back()} className="absolute top-6 left-6 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-md">
          ←
        </button>
      </div>

      <main className="max-w-2xl mx-auto p-6 -mt-10 relative z-10">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-brand-neon text-black text-xs font-bold rounded-full">
              {campaign.platform}
            </span>
            <span className="px-3 py-1 bg-brand-pop/20 text-brand-pop text-xs font-bold rounded-full">
              {campaign.category}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">{campaign.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-6 font-medium">
            <p>모집 인원: {campaign.applicants} / {campaign.maxApplicants}명</p>
            <p className="text-brand-neon font-bold">보상: +{campaign.xpReward} XP</p>
          </div>

          {/* AI Win Probability UI */}
          {isQualified && !isApplied && (
            <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-5 mb-8 relative overflow-hidden">
              {isHighPass && <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/20 blur-2xl rounded-full" />}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <TrendingUp size={16} className={isHighPass ? 'text-brand-neon' : 'text-brand-pop'} /> 
                  AI 당첨 확률 예측
                </h3>
                <span className={`text-xl font-black ${isHighPass ? 'text-brand-neon' : 'text-brand-pop'}`}>
                  {isHighPass ? 'VIP 확정!' : `${probability}%`}
                </span>
              </div>
              
              <div className="w-full bg-black/50 rounded-full h-3 mb-2 overflow-hidden border border-white/10">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${isHighPass ? 'bg-gradient-to-r from-brand-neon to-brand-purple' : 'bg-gradient-to-r from-brand-pop to-brand-neon'}`} 
                  style={{ width: isHighPass ? '100%' : `${probability}%` }}
                />
              </div>
              
              <p className="text-xs text-gray-400">
                {isHighPass 
                  ? "🔥 스펙이 압도적으로 높습니다! 심사 없이 하이패스 즉시 당첨 대상입니다." 
                  : "💡 레벨을 1만 더 올리면 하이패스(무심사 당첨) 혜택을 받을 수 있습니다!"}
              </p>
            </div>
          )}

          {/* Qualification Warning */}
          {!isQualified && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-4 mb-8 flex items-start gap-3">
              <ShieldAlert className="text-red-500 shrink-0" size={20} />
              <div>
                <p className="text-red-500 font-bold text-sm mb-1">지원 자격 미달</p>
                <p className="text-gray-300 text-xs">
                  이 캠페인은 최소 <span className="font-bold text-white">Lv.{campaign.minLevel}</span> 이상 및 
                  <span className="font-bold text-white"> {campaign.minFollowers.toLocaleString()}명</span> 이상의 팔로워가 필요합니다.
                  <br/>(현재 내 스펙: Lv.{userLevel} / 팔로워 {userFollowers.toLocaleString()}명)
                </p>
              </div>
            </div>
          )}

          <div className="space-y-6 text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-6">
            <h3 className="text-xl font-bold text-white">✨ 체험 미션</h3>
            <p>신제품의 디자인과 사용감을 잘 보여주는 고화질 사진 5장 이상과 1분 내외의 숏폼 영상을 릴스에 업로드해주세요. 힙한 느낌의 BGM 필수!</p>
            
            <h3 className="text-xl font-bold text-white mt-8">📍 제공 내역</h3>
            <p>본품 1개 (랜덤 컬러 발송) 및 리뷰 완료 시 추가 포인트 지급</p>
          </div>
        </div>

        {/* Apply Button Sticky Bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent flex justify-center z-40">
          <button 
            onClick={handleOpenModal}
            disabled={isApplied || !isQualified}
            className={`w-full max-w-2xl h-14 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center ${
              !isQualified
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-600'
                : isApplied 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-brand-neon text-black hover:bg-white shadow-[0_0_20px_rgba(69,240,209,0.5)]'
            }`}
          >
            {!isQualified 
                ? '자격 요건 부족으로 신청 불가'
                : isApplied 
                  ? '이미 신청한 퀘스트입니다' 
                  : '퀘스트 수락하기'}
          </button>
        </div>
      </main>

      {/* Application Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl overflow-hidden relative">
            <h2 className="text-xl font-bold mb-4">📝 체험단 신청서 작성</h2>
            <p className="text-sm text-gray-400 mb-6">광고주에게 어필할 수 있는 한마디를 남겨주세요. 선정이 완료되면 알림톡으로 안내해 드립니다.</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">광고주에게 한마디 (선택)</label>
                <textarea 
                  value={applyMessage}
                  onChange={(e) => setApplyMessage(e.target.value)}
                  placeholder="예: 최선을 다해 예쁜 리뷰 남기겠습니다!"
                  className="w-full h-24 bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-neon transition"
                ></textarea>
              </div>
              
              <div className="bg-white/5 rounded-xl p-3 text-xs text-gray-400">
                <p className="font-bold text-gray-300 mb-1">기본 정보 확인</p>
                <p>배송지: 서울특별시 강남구 테헤란로 123 (기본 배송지)</p>
                <p>연락처: 010-XXXX-XXXX</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition"
              >
                취소
              </button>
              <button 
                onClick={handleFinalApply}
                disabled={isAnimating}
                className={`flex-1 py-3 rounded-xl font-bold transition flex justify-center items-center shadow-lg ${
                  isHighPass 
                    ? 'bg-gradient-to-r from-brand-neon to-brand-purple text-white shadow-[0_0_20px_rgba(69,240,209,0.5)]' 
                    : 'bg-brand-neon text-black hover:bg-white'
                }`}
              >
                {isAnimating 
                  ? (isHighPass ? 'VIP 승인 중...' : '제출 중...') 
                  : (isHighPass ? '⚡ VIP 하이패스 신청하기' : '최종 신청하기')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
