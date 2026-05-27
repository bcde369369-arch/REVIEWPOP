"use client";

import Link from "next/link";
import { Star, ShieldCheck, Zap, Trophy, TrendingUp, Search, Clock, ChevronRight, User, MousePointerClick, MapPin, LayoutDashboard, Crown, Sparkles } from "lucide-react";
import { useStore, mockCampaigns } from "@/store/useStore";

export default function Home() {
  const { appliedCampaigns } = useStore();

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white font-sans pb-24 relative overflow-x-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-neon/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center p-6 sm:px-12 relative z-10">
        <div className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-purple">
          REVIEW.POP
        </div>
        <div className="flex gap-4">
          <Link href="/biz" className="text-sm font-bold text-gray-400 hover:text-white transition flex items-center gap-1 bg-white/5 px-4 py-2 rounded-full">
            <LayoutDashboard size={16} /> 광고주 센터
          </Link>
          <Link href="/mypage" className="w-10 h-10 bg-brand-pop rounded-full flex items-center justify-center hover:scale-105 transition shadow-[0_0_15px_rgba(255,94,58,0.4)]">
            <Crown size={20} className="text-white" />
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-12 relative z-10 space-y-20">
        
        {/* HERO SECTION */}
        <section className="py-20 flex flex-col items-center text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-brand-neon/10 border border-brand-neon/30 text-brand-neon px-4 py-2 rounded-full text-sm font-bold mb-8">
            <Sparkles size={16} /> 리뷰어와 광고주를 잇는 가장 완벽한 AI 생태계
          </div>
          <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
            가장 진보된 형태의 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-brand-pop to-brand-purple">초자동화 체험단 플랫폼</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-12">
            광고주는 AI 기획과 노쇼 보증으로 안심하고, <br className="hidden sm:block"/>
            인플루언서는 레벨업과 하이패스 당첨으로 폭발적인 성장을 경험하세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="#campaigns" className="bg-brand-neon text-black font-black px-8 py-5 rounded-2xl text-lg hover:bg-white transition flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(69,240,209,0.3)]">
              인플루언서로 시작하기 <ChevronRight size={20} />
            </Link>
            <Link href="/biz/create" className="glass font-bold px-8 py-5 rounded-2xl text-lg hover:bg-white/10 transition border border-white/10 flex items-center justify-center gap-2">
              광고주 캠페인 의뢰하기
            </Link>
          </div>
        </section>

        {/* VALUE PROPOSITION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-3xl border-t-4 border-t-brand-neon hover:-translate-y-2 transition duration-300">
            <div className="w-14 h-14 bg-brand-neon/20 rounded-2xl flex items-center justify-center text-brand-neon mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">광고주 노쇼 100% 보증</h3>
            <p className="text-gray-400 text-sm leading-relaxed">AI의 깐깐한 심사를 거친 인플루언서만 매칭됩니다. 노쇼 발생 시 광고비 100% 환불 및 즉시 재매칭을 보장합니다.</p>
          </div>
          <div className="glass p-8 rounded-3xl border-t-4 border-t-brand-purple hover:-translate-y-2 transition duration-300">
            <div className="w-14 h-14 bg-brand-purple/20 rounded-2xl flex items-center justify-center text-brand-purple mb-6">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">VIP 하이패스 당첨</h3>
            <p className="text-gray-400 text-sm leading-relaxed">자격 조건보다 스펙이 압도적으로 높나요? 지루한 심사 대기 없이 신청 즉시 당첨되는 하이패스 혜택을 누리세요.</p>
          </div>
          <div className="glass p-8 rounded-3xl border-t-4 border-t-brand-pop hover:-translate-y-2 transition duration-300">
            <div className="w-14 h-14 bg-brand-pop/20 rounded-2xl flex items-center justify-center text-brand-pop mb-6">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">제출 즉시 AI 자동 검수</h3>
            <p className="text-gray-400 text-sm leading-relaxed">광고주가 확인할 때까지 기다리지 마세요. 리뷰 URL만 넣으면 AI가 가이드라인을 검수하고 즉시 보상을 지급합니다.</p>
          </div>
        </section>

        {/* CAMPAIGN LIST */}
        <section id="campaigns" className="pt-10 scroll-mt-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black mb-2">실시간 인기 핫플 🔥</h2>
              <p className="text-gray-400">내 레벨에 맞는 캠페인을 찾고 성장하세요.</p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold hover:bg-white/20 transition">전체</button>
              <button className="px-4 py-2 text-gray-500 rounded-full text-sm font-bold hover:text-white transition">방문형</button>
              <button className="px-4 py-2 text-gray-500 rounded-full text-sm font-bold hover:text-white transition">배송형</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCampaigns.map((c) => {
              const isApplied = appliedCampaigns.includes(c.id);
              return (
                <Link href={`/campaign/${c.id}`} key={c.id}>
                  <div className="glass rounded-2xl overflow-hidden hover:scale-105 transition duration-300 border border-transparent hover:border-brand-neon/50 group h-full flex flex-col">
                    <div className="relative h-48 w-full shrink-0">
                      <img src={c.thumbnail || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <div className="absolute top-2 left-2 bg-brand-neon text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border border-white/20 backdrop-blur-md">
                        Lv.{c.minLevel} 이상
                      </div>
                      {isApplied && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                          <span className="bg-brand-pop text-white px-4 py-2 rounded-full font-bold text-sm">신청 완료</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex gap-2 mb-3">
                        <span className="text-brand-pop font-bold text-sm">+{c.xpReward} XP</span>
                        <span className="text-gray-400 text-sm">{c.advertiser || '리뷰팝 파트너'}</span>
                        <span className="text-[10px] font-bold bg-brand-purple/20 text-brand-purple px-2 py-1 rounded">{c.category}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-brand-neon transition line-clamp-2">{c.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-1">{c.type} · 팔로워 {c.minFollowers?.toLocaleString()}명 이상</p>
                      
                      <div className="mt-auto flex justify-between items-end">
                        <div className="text-xs text-gray-500">
                          <span className="text-gray-300 font-bold">{c.applicants}</span> / {c.maxApplicants}명 신청
                        </div>
                        <span className="text-gray-500 text-xs flex items-center gap-1">
                          <User size={12} /> {c.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-32 border-t border-white/5 py-12 text-center text-gray-500 text-sm relative z-10 flex flex-col items-center">
        <p className="font-bold text-gray-400 mb-2">REVIEW.POP</p>
        <div className="flex justify-center gap-4 mb-4">
          <Link href="/about" className="hover:text-white transition">회사소개</Link>
          <Link href="/terms" className="hover:text-white transition">이용약관</Link>
          <Link href="/privacy" className="hover:text-white transition font-bold">개인정보처리방침</Link>
          <Link href="/admin" className="hover:text-brand-neon transition">관리자 페이지</Link>
        </div>
        <p>© 2026 REVIEW POP. All rights reserved.</p>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 glass h-16 border-t border-white/10 flex justify-around items-center px-6 sm:hidden z-50 backdrop-blur-xl bg-black/50">
        <Link href="/" className="text-brand-neon flex flex-col items-center gap-1">
          <span className="text-lg shadow-[0_0_10px_rgba(69,240,209,0.3)] rounded-full">🏠</span>
          <span className="text-[10px] font-bold">홈</span>
        </Link>
        <Link href="/mypage" className="text-gray-500 flex flex-col items-center gap-1 hover:text-white transition">
          <span className="text-lg">😎</span>
          <span className="text-[10px] font-bold">마이팝</span>
        </Link>
      </nav>
      {/* Map Floating Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Link href="/map" className="flex items-center gap-2 bg-brand-neon text-black px-6 py-3 rounded-full font-bold shadow-[0_10px_40px_rgba(69,240,209,0.3)] hover:scale-105 transition-transform">
          <MapPin size={20} fill="currentColor" />
          내 주변 핫플 지도
        </Link>
      </div>
    </div>
  );
}
