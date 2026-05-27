"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-300 font-sans p-6 sm:p-12 pb-32">
      <header className="mb-12">
        <Link href="/" className="text-sm font-bold text-gray-400 hover:text-white transition bg-white/5 px-4 py-2 rounded-full">
          ← 홈으로 돌아가기
        </Link>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-black text-white mb-8">개인정보처리방침 (Privacy Policy)</h1>
        
        <p className="mb-8">
          리뷰팝 (이하 "회사")은(는) 이용자의 개인정보를 매우 중요하게 생각하며, 「개인정보보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하고 있습니다. 본 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-pop">1. 수집하는 개인정보 항목 및 수집 방법</h2>
          <p>회사는 회원가입, 원활한 고객상담, 각종 서비스의 제공을 위해 아래와 같은 최소한의 개인정보를 수집하고 있습니다.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>필수항목:</strong> 이메일 주소, 비밀번호, 이름, 닉네임, 연락처(휴대전화번호), 연동된 SNS(블로그, 인스타그램 등) 프로필 정보 및 URL 주소</li>
            <li><strong>선택항목:</strong> 배송지 주소 (제품 배송 캠페인 진행 시), 성별, 생년월일</li>
            <li><strong>수집방법:</strong> 홈페이지 회원가입, 캠페인 신청 폼, SNS 간편로그인, 고객센터 문의</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-pop">2. 개인정보의 수집 및 이용 목적</h2>
          <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>서비스 제공 및 회원 관리:</strong> 체험단 매칭, 콘텐츠 검수, 경험치(XP) 및 레벨 부여, 페널티(노쇼/지각) 관리를 위한 신뢰도 산정 알고리즘 적용</li>
            <li><strong>서비스 이행:</strong> 제품 배송 및 캠페인 진행 관련 공지사항 전달, 광고주에게 선정된 리뷰어의 기본 정보 제공</li>
            <li><strong>마케팅 및 광고에의 활용:</strong> 신규 서비스(캠페인) 안내, 이벤트 정보 제공, 인구통계학적 특성에 따른 맞춤형 광고 제공</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-pop">3. 개인정보의 보유 및 이용기간</h2>
          <p>
            회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
            <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
            <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
            <li>웹사이트 방문 기록: 3개월 (통신비밀보호법)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-pop">4. 구글 애드센스 및 제3자 맞춤형 광고에 관한 사항</h2>
          <p>
            본 웹사이트는 구글 애드센스(Google AdSense)를 포함한 제3자 광고 네트워크를 통하여 광고를 송출할 수 있습니다. 이 과정에서 사용자 맞춤형 광고를 제공하기 위해 쿠키(Cookie)나 웹 비콘(Web Beacon)을 사용하여 방문자의 인터넷 사용 정보, 검색 기록 등을 수집할 수 있습니다. 이용자는 웹 브라우저의 옵션을 설정함으로써 쿠키 저장을 거부할 수 있습니다.
          </p>
        </section>

        <div className="pt-8 border-t border-white/10 text-sm text-gray-500">
          공고일자: 2026년 5월 27일 <br />
          시행일자: 2026년 6월 1일
        </div>
      </main>
    </div>
  );
}
