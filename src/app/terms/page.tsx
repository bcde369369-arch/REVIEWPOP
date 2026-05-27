"use client";

import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-300 font-sans p-6 sm:p-12 pb-32">
      <header className="mb-12">
        <Link href="/" className="text-sm font-bold text-gray-400 hover:text-white transition bg-white/5 px-4 py-2 rounded-full">
          ← 홈으로 돌아가기
        </Link>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-black text-white mb-8">이용약관 (Terms of Service)</h1>
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-neon">제 1 조 (목적)</h2>
          <p>
            본 약관은 리뷰팝(이하 "회사"라 합니다)이 제공하는 인플루언서 마케팅 및 체험단 매칭 플랫폼 서비스(이하 "서비스"라 합니다)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-neon">제 2 조 (용어의 정의)</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>"서비스"란 회사가 운영하는 웹사이트 및 모바일 애플리케이션을 통해 제공되는 체험단 모집, 인플루언서 매칭, 통계 제공 등의 모든 활동을 의미합니다.</li>
            <li>"회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자로, "리뷰어(인플루언서)"와 "광고주"를 포함합니다.</li>
            <li>"리뷰어"란 회사에서 제공하는 캠페인에 지원하여 선정된 후, 정해진 가이드라인에 따라 콘텐츠를 제작하고 업로드하는 회원을 말합니다.</li>
            <li>"광고주"란 회사의 플랫폼을 통해 캠페인을 개설하고 리뷰어를 모집하는 사업자 또는 개인을 말합니다.</li>
            <li>"경험치(XP)" 및 "레벨"이란 리뷰어가 서비스 내에서 캠페인을 성실히 수행함에 따라 획득하는 가상의 점수 및 등급을 의미합니다.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-neon">제 3 조 (리뷰어의 의무 및 페널티)</h2>
          <p>리뷰어는 다음 각 호의 행위를 하여서는 안 되며, 적발 시 회사는 경험치(XP) 차감, 뱃지 회수, 일정 기간 서비스 이용 정지 또는 영구 탈퇴(블랙리스트) 등의 조치를 취할 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>체험단으로 선정된 후 정당한 사유 없이 방문 또는 제품 수령을 거부하거나 노쇼(No-show)하는 행위</li>
            <li>합의된 가이드라인을 준수하지 않거나 기한 내에 리뷰를 업로드하지 않는 행위(지각)</li>
            <li>리뷰 등록 후 임의로 삭제하거나 비공개 처리하여 광고주의 마케팅 효과를 저해하는 행위</li>
            <li>타인의 콘텐츠를 무단 도용하거나 허위로 팔로워 및 소통 지수(ER)를 조작하는 행위</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-neon">제 4 조 (광고주의 의무)</h2>
          <p>
            광고주는 리뷰어에게 약속된 재화나 서비스를 정확하고 성실하게 제공해야 하며, 캠페인 모집 시 명시하지 않은 추가적인 요구사항을 리뷰어에게 부당하게 강요할 수 없습니다. 광고주가 이를 위반할 경우 회사는 캠페인을 중단하거나 광고주의 서비스 이용을 제한할 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-neon">제 5 조 (면책조항)</h2>
          <p>
            회사는 회원 간의 거래 또는 매칭을 중개하는 플랫폼을 제공할 뿐이며, 리뷰어가 작성한 콘텐츠의 내용이나 광고주가 제공하는 상품의 품질에 대해 어떠한 보증도 하지 않습니다. 회원 간에 발생한 분쟁에 대해서 회사는 법적 책임을 지지 않습니다.
          </p>
        </section>

        <div className="pt-8 border-t border-white/10 text-sm text-gray-500">
          본 약관은 2026년 6월 1일부터 시행됩니다.
        </div>
      </main>
    </div>
  );
}
