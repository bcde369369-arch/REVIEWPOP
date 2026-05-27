"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bot, ChevronLeft, Sparkles, AlertCircle, CheckCircle2, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import confetti from "canvas-confetti";

export default function BizCreateCampaign() {
  const router = useRouter();
  const { userRole } = useStore();
  
  const [keyword, setKeyword] = useState('');
  const [shopName, setShopName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (userRole !== 'BIZ' && userRole !== 'ADMIN') {
      alert('접근 권한이 없습니다. (광고주 로그인 필요)');
      router.push('/');
    }
  }, [userRole, router]);

  const handleGenerate = () => {
    if (!keyword) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  const handleFinalSubmit = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      setIsPaying(false);
      setShowPaymentModal(false);
      alert("결제 완료 및 캠페인 등록 성공!");
      router.push('/biz');
    }, 2500);
  };

  if (userRole !== 'BIZ' && userRole !== 'ADMIN') return null;

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white font-sans p-6 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-neon/10 rounded-full blur-3xl" />

      <header className="max-w-3xl mx-auto flex items-center mb-10 relative z-10">
        <button onClick={() => router.back()} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition mr-4">
          <ChevronLeft />
        </button>
        <div>
          <h1 className="text-2xl font-black text-brand-pop flex items-center gap-2">
            <Bot size={28} /> AI 원터치 캠페인 기획기
          </h1>
          <p className="text-sm text-gray-400 mt-1">키워드만 적어주세요. 나머지는 AI가 알아서 기획합니다.</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto relative z-10 space-y-8">
        
        <div className="glass p-8 rounded-3xl border border-brand-neon/30">
          <label className="block text-sm font-bold text-gray-400 mb-3">어떤 매장/제품을 홍보하고 싶으신가요?</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="예: 성수동 수제버거 맛집" 
              value={keyword}
              onChange={(e) => {setKeyword(e.target.value); setShopName(e.target.value);}}
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-neon transition text-lg font-medium"
              disabled={isGenerating || generated}
            />
            {!generated && (
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !keyword}
                className="bg-brand-neon text-black font-bold px-8 py-4 rounded-xl hover:bg-white transition flex items-center justify-center min-w-[160px] shadow-[0_0_20px_rgba(69,240,209,0.3)] disabled:opacity-50 disabled:shadow-none"
              >
                {isGenerating ? <span className="flex items-center gap-2"><Sparkles className="animate-spin" size={20}/> 기획 중...</span> : 'AI 기획 시작'}
              </button>
            )}
          </div>
        </div>

        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-20 text-brand-neon animate-pulse">
            <Bot size={48} className="mb-4 animate-bounce" />
            <p className="font-bold text-lg">최적의 마케팅 키워드와 컷오프를 분석하고 있습니다...</p>
          </div>
        )}

        {generated && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="bg-gradient-to-r from-brand-neon/20 to-transparent p-1 rounded-3xl">
              <div className="bg-[#111] p-8 rounded-[22px] space-y-6">
                <div className="flex justify-between items-start border-b border-white/10 pb-6">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                      [{shopName || '홍보 매장'}] 인스타 감성 100%! <br/>체험단 모집
                    </h2>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-brand-neon/20 text-brand-neon text-xs font-bold rounded-full">인스타 릴스</span>
                      <span className="px-3 py-1 bg-brand-pop/20 text-brand-pop text-xs font-bold rounded-full">맛집</span>
                    </div>
                  </div>
                  <CheckCircle2 className="text-brand-neon" size={40} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-brand-neon flex items-center gap-2">📝 AI 추천 가이드라인</h3>
                    <ul className="text-sm text-gray-300 space-y-3">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-brand-neon rounded-full mt-1.5" /><p>매장 포인트가 잘 보이도록 클로즈업 영상 1개 이상 필수</p></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-brand-neon rounded-full mt-1.5" /><p>트렌디한 BGM 사용 권장</p></li>
                    </ul>
                  </div>

                  <div className="space-y-4 bg-black/30 p-5 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold text-brand-pop flex items-center gap-2">🛡️ 최적 컷오프</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl"><span className="text-sm text-gray-300">최소 팔로워</span><span className="font-bold text-white font-mono">3,000 명</span></div>
                      <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl"><span className="text-sm text-gray-300">소통 지수(ER)</span><span className="font-bold text-brand-neon">4.0% 이상</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-brand-purple/10 border border-brand-purple/30 p-4 rounded-xl text-sm">
              <AlertCircle className="text-brand-purple shrink-0" size={20} />
              <p className="text-gray-300">
                위 내용은 언제든지 수정할 수 있습니다. <br/>
                <strong className="text-white">리뷰팝은 노쇼(No-show) 발생 시 광고비를 100% 환불해 드리며, 즉시 새로운 인플루언서를 매칭해 드립니다.</strong>
              </p>
            </div>

            <button className="w-full bg-brand-neon text-black font-black text-lg py-5 rounded-2xl hover:bg-white shadow-[0_0_30px_rgba(69,240,209,0.3)] transition-all">
              이대로 캠페인 등록 완료하기
            </button>
            <button 
              onClick={() => {setGenerated(false); setKeyword('');}}
              className="w-full text-center text-sm text-gray-500 hover:text-white transition mt-4"
            >
              다시 기획하기
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
