"use client";

import dynamic from 'next/dynamic';

// Leaflet needs to be dynamically imported with SSR disabled because it uses the window object
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-80px)] bg-[#0b0c10] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-neon border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-brand-neon font-bold animate-pulse">주변 핫플 찾는 중...</p>
    </div>
  )
});

export default function MapPage() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-white">
      <header className="fixed top-0 left-0 right-0 z-[1001] bg-[#0b0c10]/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center px-4">
        <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
          🗺️ 내 주변 <span className="text-brand-neon">핫플</span> 찾기
        </h1>
      </header>

      <main className="pt-16 pb-20">
        <MapComponent />
      </main>
    </div>
  );
}
