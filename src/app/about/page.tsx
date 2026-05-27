"use client";

import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-white font-sans p-6 sm:p-12 pb-32">
      <header className="mb-12">
        <Link href="/" className="text-sm font-bold text-gray-400 hover:text-white transition bg-white/5 px-4 py-2 rounded-full">
          ← 홈으로 돌아가기
        </Link>
      </header>

      <main className="max-w-3xl mx-auto space-y-12 leading-relaxed">
        <section>
          <h1 className="text-4xl font-black text-brand-neon mb-6">리뷰팝(REVIEW.POP) 소개</h1>
          <p className="text-gray-300 mb-4 text-lg">
            리뷰팝은 기존 인플루언서 마케팅 시장의 정보 비대칭과 신뢰도 문제를 해결하기 위해 탄생한 <strong>차세대 게이미피케이션(Gamification) 기반 체험단 플랫폼</strong>입니다.
          </p>
          <p className="text-gray-300 mb-4">
            단순히 팔로워 수가 많은 인플루언서가 좋은 리뷰어일까요? 저희는 이 질문에서 시작했습니다. 광고주들은 종종 높은 비용을 지불하고도 성의 없는 콘텐츠, 마감일 지연, 최악의 경우 노쇼(No-show)를 경험하며 막대한 피해를 입고 있습니다. 리뷰팝은 이러한 문제를 데이터와 AI 기반의 <strong>신뢰도 스코어링 시스템(Trust Score Algorithm)</strong>으로 완벽하게 해결합니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-brand-pop pl-4">리뷰팝의 3대 핵심 철학</h2>
          
          <div className="space-y-6 mt-6">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-brand-neon mb-2">1. 팔로워보다 중요한 것은 '진정성'과 '책임감'</h3>
              <p className="text-gray-400">
                리뷰팝 알고리즘은 겉으로 보이는 구독자 수치보다, 실제 팔로워들과의 소통 지수(Engagement Rate)를 더욱 중요하게 평가합니다. 또한 마감 기한을 엄수하고 약속을 지키는 '성실도'를 점수화하여, 광고주가 안심하고 캠페인을 맡길 수 있는 환경을 조성합니다.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-brand-pop mb-2">2. 리뷰어의 성장을 돕는 '게이미피케이션'</h3>
              <p className="text-gray-400">
                우리는 인플루언서 마케팅을 하나의 재미있는 '퀘스트'로 만들었습니다. 캠페인을 성공적으로 완료할 때마다 경험치(XP)가 지급되며 레벨이 상승합니다. '우수 리뷰어', '마감 엄수' 등의 뱃지를 수집하는 재미는 리뷰어들에게 강력한 동기부여를 제공하고, 자연스럽게 콘텐츠 퀄리티 향상으로 이어집니다.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-brand-purple mb-2">3. 데이터 기반의 투명한 스마트 매칭</h3>
              <p className="text-gray-400">
                광고주에게는 자체 개발한 'Biz Dashboard'를 제공합니다. 이곳에서 광고주는 캠페인 조회수, 타겟팅 효율, 그리고 지원자들의 상세한 신뢰도 지표(Trust Score)를 한눈에 비교하고 투명하게 확인할 수 있습니다. 인플루언서와 광고주 모두가 상생하는 건강한 마케팅 생태계를 만들어 갑니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-white pl-4">함께 성장하는 플랫폼</h2>
          <p className="text-gray-300 mb-4">
            리뷰팝은 소상공인부터 대기업 브랜드까지, 모든 광고주가 합리적인 비용으로 최고의 마케팅 효율을 경험할 수 있도록 돕습니다. 동시에, 열정과 실력을 갖춘 크리에이터들이 정당한 보상을 받으며 전문적인 리뷰어로 성장할 수 있는 튼튼한 발판이 되겠습니다.
          </p>
          <p className="text-gray-300">
            투명한 데이터, 즐거운 경험, 그리고 확실한 결과. 리뷰팝과 함께 여러분의 비즈니스와 콘텐츠를 다음 단계(Next Level)로 끌어올려 보세요.
          </p>
        </section>
      </main>
    </div>
  );
}
