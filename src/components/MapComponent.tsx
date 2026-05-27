"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useStore, Campaign, mockCampaigns } from '@/store/useStore';
import { MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';

// Custom Map Marker Icon
const createCustomIcon = (xp: number) => L.divIcon({
  className: 'custom-marker',
  html: `<div style="background-color: #45f0d1; color: #000; font-weight: 900; padding: 4px 8px; border-radius: 20px; font-size: 12px; box-shadow: 0 4px 10px rgba(69, 240, 209, 0.5); border: 2px solid white;">+${xp} XP</div>`,
  iconSize: [60, 30],
  iconAnchor: [30, 30],
});

function FlyToCurrentLocation({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

export default function MapComponent() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  
  // 서울 중심 좌표 (기본값)
  const defaultCenter: [number, number] = [37.5665, 126.9780];
  
  // 방문형 캠페인만 필터링
  const visitCampaigns = mockCampaigns.filter((c: Campaign) => c.type === '방문형' && c.lat && c.lng);

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)]">
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {visitCampaigns.map((camp: Campaign) => (
          <Marker 
            key={camp.id} 
            position={[camp.lat!, camp.lng!]} 
            icon={createCustomIcon(camp.xpReward)}
            eventHandlers={{
              click: () => setSelectedCampaign(camp),
            }}
          />
        ))}

        <FlyToCurrentLocation position={userLocation} />
      </MapContainer>

      {/* 내 위치 찾기 버튼 */}
      <button 
        onClick={locateUser}
        className="absolute bottom-32 right-4 z-[1000] bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        <Navigation size={24} className="text-blue-500" />
      </button>

      {/* 바텀 시트 (Bottom Sheet) */}
      <div 
        className={`absolute bottom-0 left-0 w-full bg-[#111] border-t border-white/10 rounded-t-3xl p-6 transition-transform duration-300 z-[1000] shadow-2xl
        ${selectedCampaign ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)' }}
      >
        {selectedCampaign && (
          <div className="space-y-4">
            <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-2" />
            
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 bg-gray-800 rounded-xl overflow-hidden shrink-0 border border-white/10 relative">
                {selectedCampaign.thumbnail && (
                  <img src={selectedCampaign.thumbnail} alt={selectedCampaign.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex gap-2 mb-1">
                  <span className="text-xs font-bold bg-brand-neon/20 text-brand-neon px-2 py-0.5 rounded-full">{selectedCampaign.category}</span>
                  <span className="text-xs font-bold bg-brand-pop/20 text-brand-pop px-2 py-0.5 rounded-full">Lv.{selectedCampaign.minLevel} 이상</span>
                </div>
                <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">{selectedCampaign.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{selectedCampaign.advertiser || '리뷰팝 파트너'}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setSelectedCampaign(null)} className="flex-1 py-3 rounded-xl bg-white/5 text-gray-300 font-bold">닫기</button>
              <Link href={`/campaign/${selectedCampaign.id}`} className="flex-[2] py-3 rounded-xl bg-brand-neon text-black font-bold flex justify-center items-center">
                + {selectedCampaign.xpReward} XP 신청하기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
