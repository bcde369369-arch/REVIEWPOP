"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShieldAlert, Activity, Users, Settings2, ShieldCheck, AlertOctagon } from "lucide-react";

export default function AdminDashboard() {
  const { bizApplicants, adminWeights, updateAdminWeights, userRole } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (userRole !== 'ADMIN') {
      alert('접근 권한이 없습니다. (관리자 전용 페이지)');
      router.push('/');
    }
  }, [userRole, router]);

  if (userRole !== 'ADMIN') return null;

  // Compute Trust Score for each applicant
  const computedApplicants = bizApplicants.map(app => {
    // Trust Score = (기본 스펙) + (활동 지수) - (페널티)
    // - 기본: 팔로워 * 0.01 + 레벨 * 50
    // - 활동: ER * 100 + 뱃지개수 * 30
    // - 페널티: 노쇼 * 500 + 지각 * 100
    const scoreBase = (app.followers * adminWeights.followerWeight) + (app.level * adminWeights.levelWeight);
    const scoreActivity = (app.engagementRate * adminWeights.erWeight) + (app.badges.length * 30);
    const scorePenalty = (app.noShows * adminWeights.noShowPenalty) + (app.lateSubmissions * adminWeights.latePenalty);
    
    const totalScore = Math.round(scoreBase + scoreActivity - scorePenalty);
    const isBlacklisted = totalScore < 0 || app.noShows >= 1;

    return { ...app, totalScore, isBlacklisted };
  }).sort((a, b) => b.totalScore - a.totalScore); // Sort by highest score first

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6 pb-24">
      
      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-black text-brand-neon flex items-center gap-2">
            <ShieldCheck size={28} /> 리뷰팝 통합 관리 시스템
          </h1>
          <p className="text-sm text-gray-400 mt-1">플랫폼 신뢰도 AI 알고리즘 제어 센터</p>
        </div>
        <Link href="/" className="bg-white/10 px-4 py-2 rounded-full text-sm font-bold hover:bg-white/20 transition">
          홈으로 가기
        </Link>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Algorithm Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111] border border-brand-neon/30 p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Settings2 className="text-brand-neon" /> AI 알고리즘 가중치 제어
            </h2>
            
            <div className="space-y-6">
              {/* Followers Weight */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">팔로워 가중치 (x{adminWeights.followerWeight})</span>
                </div>
                <input 
                  type="range" min="0" max="0.1" step="0.01" 
                  value={adminWeights.followerWeight}
                  onChange={(e) => updateAdminWeights({ followerWeight: parseFloat(e.target.value) })}
                  className="w-full accent-brand-neon bg-gray-800"
                />
              </div>

              {/* ER Weight */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">소통지수(ER) 가중치 (x{adminWeights.erWeight})</span>
                </div>
                <input 
                  type="range" min="10" max="200" step="10" 
                  value={adminWeights.erWeight}
                  onChange={(e) => updateAdminWeights({ erWeight: parseInt(e.target.value) })}
                  className="w-full accent-brand-neon bg-gray-800"
                />
              </div>

              {/* Level Weight */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-brand-pop font-bold">리뷰팝 레벨 가중치 (x{adminWeights.levelWeight})</span>
                </div>
                <input 
                  type="range" min="10" max="100" step="10" 
                  value={adminWeights.levelWeight}
                  onChange={(e) => updateAdminWeights({ levelWeight: parseInt(e.target.value) })}
                  className="w-full accent-brand-pop bg-gray-800"
                />
              </div>

              <div className="h-px bg-white/10 my-4" />

              {/* Penalty Weights */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-red-500 font-bold">노쇼(No-show) 페널티 (-{adminWeights.noShowPenalty}점)</span>
                </div>
                <input 
                  type="range" min="100" max="1000" step="100" 
                  value={adminWeights.noShowPenalty}
                  onChange={(e) => updateAdminWeights({ noShowPenalty: parseInt(e.target.value) })}
                  className="w-full accent-red-500 bg-gray-800"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-red-400">마감 지각 페널티 (-{adminWeights.latePenalty}점)</span>
                </div>
                <input 
                  type="range" min="10" max="300" step="10" 
                  value={adminWeights.latePenalty}
                  onChange={(e) => updateAdminWeights({ latePenalty: parseInt(e.target.value) })}
                  className="w-full accent-red-400 bg-gray-800"
                />
              </div>
            </div>
            
            <button className="w-full mt-8 bg-white/5 border border-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition">
              알고리즘 시스템 재시작 (적용)
            </button>
          </div>
        </div>

        {/* Right Column: User Ranking & Blacklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Users className="text-brand-pop" /> 알고리즘 기반 유저 랭킹 보드
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-sm border-b border-white/10">
                    <th className="pb-3 font-medium">유저 정보</th>
                    <th className="pb-3 font-medium">기본 데이터</th>
                    <th className="pb-3 font-medium">활동 지수 (Lv / ER)</th>
                    <th className="pb-3 font-medium">악성 이력</th>
                    <th className="pb-3 font-medium text-right text-brand-neon">TRUST SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  {computedApplicants.map((user, idx) => (
                    <tr key={user.id} className={`border-b border-white/5 ${user.isBlacklisted ? 'bg-red-500/5 opacity-70' : 'hover:bg-white/5'}`}>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs font-bold w-4 ${idx === 0 ? 'text-brand-neon' : 'text-gray-500'}`}>{idx + 1}</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${user.isBlacklisted ? 'bg-red-900 text-red-200' : 'bg-gray-800'}`}>
                            {user.name[0]}
                          </div>
                          <div>
                            <p className={`font-bold ${user.isBlacklisted ? 'text-red-400 line-through' : 'text-white'}`}>{user.name}</p>
                            {user.isBlacklisted && <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded ml-1">Blacklist</span>}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm">
                        <p>{user.followers.toLocaleString()} 팔로워</p>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-brand-pop text-xs font-bold">Lv.{user.level}</span>
                          <span className="text-gray-400 text-[10px]">ER {user.engagementRate}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        {(user.noShows > 0 || user.lateSubmissions > 0) ? (
                          <div className="text-xs text-red-400 flex flex-col gap-1">
                            {user.noShows > 0 && <span className="flex items-center gap-1"><AlertOctagon size={12}/> 노쇼 {user.noShows}회</span>}
                            {user.lateSubmissions > 0 && <span className="flex items-center gap-1"><ShieldAlert size={12}/> 지각 {user.lateSubmissions}회</span>}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">-</span>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        <span className={`text-xl font-black font-mono ${user.isBlacklisted ? 'text-red-500' : 'text-brand-neon drop-shadow-[0_0_10px_rgba(69,240,209,0.3)]'}`}>
                          {user.totalScore.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-xl text-sm text-gray-400">
              <p>💡 <strong>Trust Score 산출 공식:</strong> (팔로워 × 가중치) + (레벨 × 가중치) + (소통지수 × 가중치) + (뱃지 보너스) - (악성 이력 페널티)</p>
              <p className="mt-1">※ 노쇼 이력이 있거나 총점이 0점 미만일 경우 시스템에 의해 <strong>자동으로 블랙리스트(영구 정지)</strong> 처리되어 차기 캠페인에 지원할 수 없습니다.</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
