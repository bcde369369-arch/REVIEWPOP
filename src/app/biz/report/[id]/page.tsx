"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, Cell } from 'recharts';
import { ChevronLeft, Download, TrendingUp, Users, Heart, Share2, Sparkles, AlertCircle, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Mock Data for Charts
const performanceData = [
  { day: '1일차', views: 1200, likes: 150 },
  { day: '2일차', views: 3500, likes: 420 },
  { day: '3일차', views: 8900, likes: 1150 },
  { day: '4일차', views: 14200, likes: 1800 },
  { day: '5일차', views: 22500, likes: 3200 },
  { day: '6일차', views: 28900, likes: 4100 },
  { day: '7일차', views: 35000, likes: 5200 },
];

const ER_Data = [
  { name: '우리 매장', er: 8.5 },
  { name: '동종 업계 평균', er: 3.2 },
  { name: '플랫폼 평균', er: 4.5 },
];

export default function CampaignReport() {
  const router = useRouter();
  const { id } = useParams();
  const { userRole } = useStore();
  
  const [isDownloading, setIsDownloading] = useState(false);

  // Security Check
  if (userRole !== 'BIZ' && userRole !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center text-white">
        권한이 없습니다.
      </div>
    );
  }

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("보고서가 PDF로 다운로드 되었습니다! (데모)");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white font-sans p-6 pb-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 max-w-5xl mx-auto pt-4">
        <div className="flex items-center gap-4">
          <Link href="/biz" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black">캠페인 성과 리포트</h1>
            <p className="text-gray-400 text-sm">성수동 핫플 수제버거 체험단 (ID: {id})</p>
          </div>
        </div>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-brand-neon text-black px-5 py-2.5 rounded-xl font-bold hover:bg-white transition"
        >
          {isDownloading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
          {isDownloading ? '생성 중...' : 'PDF 다운로드'}
        </button>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-gray-400 mb-2 text-sm"><Users size={16}/> 총 도달 수</div>
            <div className="text-3xl font-black">35,000<span className="text-lg text-gray-500 font-normal ml-1">명</span></div>
            <div className="text-brand-neon text-xs font-bold mt-2 flex items-center gap-1"><TrendingUp size={12}/> 예상보다 12% 높음</div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-gray-400 mb-2 text-sm"><Heart size={16}/> 총 반응 (좋아요)</div>
            <div className="text-3xl font-black">5,200<span className="text-lg text-gray-500 font-normal ml-1">개</span></div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/10 bg-brand-purple/10 border-brand-purple/30">
            <div className="flex items-center gap-2 text-brand-purple mb-2 text-sm font-bold"><Sparkles size={16}/> 평균 소통 지수 (ER)</div>
            <div className="text-3xl font-black text-white">8.5<span className="text-lg text-gray-500 font-normal ml-1">%</span></div>
            <div className="text-gray-400 text-xs mt-2">업계 평균 3.2% 대비 압도적 수치</div>
          </div>
          <div className="glass p-6 rounded-2xl border border-brand-neon/50 bg-brand-neon/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-brand-neon/20 blur-xl rounded-full" />
            <div className="flex items-center gap-2 text-brand-neon mb-2 text-sm font-bold relative z-10"><TrendingUp size={16}/> AI 예측 전환 매출액</div>
            <div className="text-3xl font-black text-brand-neon relative z-10">4,250,000<span className="text-lg text-brand-neon/70 font-normal ml-1">원</span></div>
            <div className="text-gray-400 text-xs mt-2 relative z-10">협찬 비용 대비 <span className="text-white font-bold">ROI 1,416%</span> 달성</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 glass p-6 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold mb-6">일자별 도달 및 반응 추이</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#45f0d1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#45f0d1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="views" name="노출수" stroke="#45f0d1" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                  <Line type="monotone" dataKey="likes" name="반응수" stroke="#ff0055" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="glass p-6 rounded-3xl border border-white/10 flex flex-col">
            <h2 className="text-xl font-bold mb-6">소통 지수(ER) 비교</h2>
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ER_Data} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#999" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '12px' }} />
                  <Bar dataKey="er" radius={[0, 4, 4, 0]}>
                    {
                      ER_Data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#b245f0' : '#333'} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white/5 p-4 rounded-xl mt-4 text-sm text-gray-300">
              <span className="text-brand-purple font-bold">REVIEW.POP AI 분석</span><br/>
              이번 캠페인 참여 인플루언서들의 팔로워 대비 소통률이 동종 업계 평균을 크게 상회합니다. 이는 매우 성공적인 진성 유저 타겟팅을 의미합니다.
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
