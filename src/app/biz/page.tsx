"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useStore, Applicant } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, BarChart as BarChartIcon, Sparkles } from 'lucide-react';

const clickData = [
  { name: '1일', clicks: 400 },
  { name: '2일', clicks: 300 },
  { name: '3일', clicks: 550 },
  { name: '4일', clicks: 800 },
  { name: '5일', clicks: 1200 },
];

export default function BizDashboard() {
  const { bizApplicants, selectApplicant, userRole, addNotification } = useStore();
  const router = useRouter();
  const [filter, setFilter] = useState<'ALL'|'SELECTED'>('ALL');

  useEffect(() => {
    if (userRole !== 'BIZ' && userRole !== 'ADMIN') {
      alert('접근 권한이 없습니다. (광고주 로그인 필요)');
      router.push('/');
    }
  }, [userRole, router]);

  if (userRole !== 'BIZ' && userRole !== 'ADMIN') return null;

  const displayData = filter === 'ALL' ? bizApplicants : bizApplicants.filter(a => a.isSelected);

  const handleSelect = (app: Applicant) => {
    selectApplicant(app.id);
    if (!app.isSelected) {
      addNotification(`🎉 축하합니다! ${app.name}님이 [성수동 핫플 체험단]에 최종 합격하셨습니다!`, 'SUCCESS');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white font-sans p-6 pb-24">
      
      <header className="flex justify-between items-center mb-10">
        <Link href="/" className="text-sm font-bold text-gray-400 hover:text-white transition bg-white/5 px-4 py-2 rounded-full">
          ← 일반 모드
        </Link>
        <h1 className="text-xl font-bold text-brand-pop">BIZ DASHBOARD</h1>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        
        {/* No-Show Guarantee Banner */}
        <div className="bg-gradient-to-r from-brand-neon/20 via-brand-purple/20 to-transparent border border-brand-neon/30 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-brand-neon/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
              <span className="text-2xl">🛡️</span> 노쇼 발생 시 100% 무료 재매칭 보증!
            </h2>
            <p className="text-sm text-gray-300">리뷰팝의 깐깐한 AI 알고리즘 검증을 통과한 인플루언서만 모았습니다. 안심하고 마케팅하세요.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <Link href="/biz/report/1" className="flex justify-center items-center gap-2 bg-brand-purple/20 text-brand-purple hover:bg-brand-purple/30 px-5 py-3 rounded-xl font-bold transition">
              <BarChartIcon size={18} />
              최근 캠페인 리포트
            </Link>
            <Link href="/biz/create" className="flex justify-center items-center gap-2 bg-brand-neon text-black hover:bg-white px-5 py-3 rounded-xl font-bold transition shadow-[0_0_20px_rgba(69,240,209,0.3)]">
              <Sparkles size={18} />
              + 캠페인 무인 기획하기
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-3xl border-l-4 border-l-brand-neon">
            <h3 className="text-gray-400 text-sm font-medium mb-2">진행 중인 캠페인</h3>
            <p className="text-4xl font-black">3 <span className="text-lg font-medium text-gray-500">건</span></p>
          </div>
          <div className="glass p-6 rounded-3xl border-l-4 border-l-brand-purple">
            <h3 className="text-gray-400 text-sm font-medium mb-2">총 신청자 수</h3>
            <p className="text-4xl font-black">128 <span className="text-lg font-medium text-gray-500">명</span></p>
          </div>
          <div className="glass p-6 rounded-3xl border-l-4 border-l-brand-pop">
            <h3 className="text-gray-400 text-sm font-medium mb-2">총 리뷰 조회수</h3>
            <p className="text-4xl font-black">45.2K <span className="text-lg font-medium text-gray-500">회</span></p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6">최근 5일 캠페인 조회수 추이</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clickData}>
                  <XAxis dataKey="name" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1c23', border: 'none', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="clicks" stroke="#45f0d1" strokeWidth={3} dot={{ fill: '#45f0d1' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6">플랫폼별 마케팅 효율</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{name: '블로그', val: 75}, {name: '인스타 숏폼', val: 95}, {name: '유튜브', val: 40}]}>
                  <XAxis dataKey="name" stroke="#666" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1c23', border: 'none', borderRadius: '8px', color: '#fff' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                  <Bar dataKey="val" fill="#ff5e3a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Applicant Management */}
        <section className="glass rounded-3xl p-6 mt-8 border border-brand-neon/30 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-brand-neon/5 blur-3xl rounded-full" />
          
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                실시간 캠페인 지원자 <span className="bg-brand-neon text-black text-xs px-2 py-1 rounded-full">New</span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">리뷰팝의 신뢰 지표를 기반으로 최적의 인플루언서를 선정하세요.</p>
            </div>
            <div className="text-sm font-bold bg-white/10 px-4 py-2 rounded-lg text-brand-neon">
              선정 완료: {bizApplicants.filter(a => a.isSelected).length} / 4 명
            </div>
          </div>

          {/* Mobile Card View (Hidden on sm+) */}
          <div className="sm:hidden space-y-4">
            {displayData.map((app) => (
              <div key={app.id} className="bg-[#111] p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-neon/20 flex items-center justify-center text-brand-neon font-bold">
                      {app.level}
                    </div>
                    <div>
                      <div className="font-bold text-white">{app.name}</div>
                      <div className="text-xs text-gray-500">{app.platform} · 팔로워 {app.followers.toLocaleString()}명</div>
                      <div className="flex flex-col">
                        <button 
                          onClick={() => handleSelect(app)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors mb-1 ${
                            app.isSelected ? 'bg-brand-neon text-black' : 'bg-white/10 text-gray-400 hover:bg-white/20'
                          }`}
                        >
                          {app.isSelected ? '합격' : '대기'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div className="bg-black/50 p-2 rounded flex justify-between">
                    <span className="text-gray-500">소통 지수</span>
                    <span className="text-brand-pop font-bold">{app.engagementRate}%</span>
                  </div>
                  <div className="bg-black/50 p-2 rounded flex justify-between">
                    <span className="text-gray-500">패널티</span>
                    <span className="text-red-400">{app.noShows > 0 ? `노쇼 ${app.noShows}회` : '클린'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {app.badges.map((b, i) => (
                    <span key={i} className="bg-brand-purple/20 text-brand-purple px-2 py-0.5 rounded text-[10px] font-bold">
                      {b}
                    </span>
                  ))}
                </div>

                <div className="bg-black/50 p-3 rounded-lg text-sm text-gray-300 italic border border-white/5">
                  "{app.message || '지원 한마디가 없습니다.'}"
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-white/10">
                  <th className="pb-3 font-medium">지원자 (플랫폼)</th>
                  <th className="pb-3 font-medium">영향력</th>
                  <th className="pb-3 font-medium">적합도/신뢰도</th>
                  <th className="pb-3 font-medium hidden md:table-cell">지원자 한마디</th>
                  <th className="pb-3 font-medium text-right">상태 변경</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((app) => (
                  <tr key={app.id} className={`border-b border-white/5 transition-colors hover:bg-white/5 ${app.isSelected ? 'bg-brand-neon/5' : ''}`}>
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold">
                          {app.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-white">{app.name}</p>
                          <p className="text-xs text-gray-400">{app.platform}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-bold">{app.followers.toLocaleString()}</p>
                      <p className={`text-xs ${app.engagementRate > 5 ? 'text-brand-neon font-bold' : 'text-gray-400'}`}>
                        소통지수 {app.engagementRate}%
                      </p>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold w-fit ${app.level >= 4 ? 'bg-brand-pop/20 text-brand-pop' : 'bg-gray-800 text-gray-300'}`}>
                          Lv.{app.level} 리뷰어
                        </span>
                        <div className="flex gap-1 flex-wrap mt-1">
                          {app.badges.map((b, i) => (
                            <span key={i} className="text-[10px] bg-brand-purple/20 text-brand-purple px-1.5 py-0.5 rounded border border-brand-purple/30">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 hidden md:table-cell max-w-[200px]">
                      <p className="text-xs text-gray-300 truncate pr-4">
                        "{app.message || '잘 부탁드립니다!'}"
                      </p>
                    </td>
                    <td className="py-4 text-right pr-4">
                      <button 
                        onClick={() => selectApplicant(app.id)}
                        className={`flex items-center gap-2 ml-auto px-4 py-2 rounded-full font-bold text-sm transition-all ${
                          app.isSelected 
                            ? 'bg-brand-neon text-black shadow-[0_0_15px_rgba(69,240,209,0.4)]' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {app.isSelected ? <><CheckCircle2 size={16} /> 선정됨</> : <><Circle size={16} /> 선정하기</>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
