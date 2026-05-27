"use client";

import { useStore } from "@/store/useStore";
import { User, ShieldAlert, LayoutDashboard } from "lucide-react";

export default function RoleSwitcher() {
  const { userRole, loginAs } = useStore();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-black/80 backdrop-blur-md border border-white/20 p-2 rounded-xl text-xs font-bold shadow-2xl">
      <button 
        onClick={() => loginAs('GUEST')}
        className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${userRole === 'GUEST' ? 'bg-gray-500 text-white' : 'text-gray-400 hover:bg-white/10'}`}
      >
        비로그인
      </button>
      <button 
        onClick={() => loginAs('INFLUENCER')}
        className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${userRole === 'INFLUENCER' ? 'bg-brand-neon text-black' : 'text-gray-400 hover:bg-white/10'}`}
      >
        <User size={14} /> 인플루언서
      </button>
      <button 
        onClick={() => loginAs('BIZ')}
        className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${userRole === 'BIZ' ? 'bg-brand-purple text-white' : 'text-gray-400 hover:bg-white/10'}`}
      >
        <LayoutDashboard size={14} /> 광고주
      </button>
      <button 
        onClick={() => loginAs('ADMIN')}
        className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${userRole === 'ADMIN' ? 'bg-brand-pop text-white' : 'text-gray-400 hover:bg-white/10'}`}
      >
        <ShieldAlert size={14} /> 관리자
      </button>
    </div>
  );
}
