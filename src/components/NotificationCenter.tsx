"use client";

import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Bell, CheckCircle2, Rocket, Info } from 'lucide-react';

export default function NotificationCenter() {
  const { notifications, markAsRead } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!isOpen) {
      markAsRead();
    }
    setIsOpen(!isOpen);
  };

  const timeAgo = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff/60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff/3600)}시간 전`;
    return `${Math.floor(diff/86400)}일 전`;
  };

  return (
    <div className="fixed top-4 left-4 z-50" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="relative p-3 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-2xl hover:bg-white/10 transition"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-black" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-14 left-0 w-80 max-h-[80vh] overflow-y-auto bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/50">
            <h3 className="font-bold text-white">알림 센터</h3>
            <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-400">최근 소식</span>
          </div>
          
          <div className="p-2 space-y-1">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">
                도착한 새로운 알림이 없습니다.
              </div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="p-3 hover:bg-white/5 rounded-xl transition flex gap-3 items-start">
                  <div className={`mt-1 shrink-0 p-1.5 rounded-full ${
                    n.type === 'SUCCESS' ? 'bg-brand-neon/20 text-brand-neon' : 
                    n.type === 'LEVEL_UP' ? 'bg-brand-pop/20 text-brand-pop' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {n.type === 'SUCCESS' && <CheckCircle2 size={16} />}
                    {n.type === 'LEVEL_UP' && <Rocket size={16} />}
                    {n.type === 'INFO' && <Info size={16} />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-200 leading-tight">{n.message}</p>
                    <span className="text-xs text-gray-500 mt-1 block">{timeAgo(n.time)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
