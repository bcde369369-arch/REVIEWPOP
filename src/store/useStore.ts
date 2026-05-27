import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Campaign {
  id: string;
  title: string;
  category: string;
  platform: string;
  type: '방문형' | '배송형';
  requiredLevel: number;
  xpReward: number;
  applicants: number;
  maxApplicants: number;
  minFollowers: number;
  minLevel: number;
  isApplied?: boolean;
  lat?: number;
  lng?: number;
  thumbnail?: string;
  advertiser?: string;
}

export interface Applicant {
  id: string;
  name: string;
  platform: string;
  followers: number;
  engagementRate: number;
  categoryFit: number;
  level: number;
  badges: string[];
  isSelected: boolean;
  noShows: number;
  lateSubmissions: number;
  message?: string;
}

interface AdminAlgorithmWeights {
  followerWeight: number;
  erWeight: number;
  levelWeight: number;
  noShowPenalty: number;
  latePenalty: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'SUCCESS' | 'LEVEL_UP' | 'INFO';
  read: boolean;
  time: number;
}

interface UserState {
  level: number;
  xp: number;
  userFollowers: number;
  appliedCampaigns: string[];
  badges: string[];
  applyForCampaign: (campaignId: string, xpReward: number) => void;
  submitReview: (campaignId: string, xpReward: number) => void;
  bizApplicants: Applicant[];
  selectApplicant: (applicantId: string) => void;
  adminWeights: AdminAlgorithmWeights;
  updateAdminWeights: (newWeights: Partial<AdminAlgorithmWeights>) => void;
  
  snsLinked: boolean;
  linkSns: (followers: number, level: number) => void;
  
  
  userRole: 'GUEST' | 'INFLUENCER' | 'BIZ' | 'ADMIN';
  loginAs: (role: 'GUEST' | 'INFLUENCER' | 'BIZ' | 'ADMIN') => void;

  notifications: Notification[];
  addNotification: (message: string, type: 'SUCCESS' | 'LEVEL_UP' | 'INFO') => void;
  markAsRead: () => void;
}

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: '[성수동 핫플] 인스타 감성 100% 수제버거 2인 세트',
    thumbnail: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    advertiser: '버거팝 성수점',
    applicants: 124,
    maxApplicants: 10,
    platform: 'Instagram',
    category: '맛집',
    type: '방문형',
    requiredLevel: 3,
    xpReward: 500,
    minFollowers: 10000,
    minLevel: 4,
    lat: 37.5445,
    lng: 127.0560
  },
  {
    id: '2',
    title: '[집에서 편하게] 프리미엄 무선 이어폰 리뷰',
    thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    advertiser: '사운드팝',
    applicants: 890,
    maxApplicants: 20,
    platform: 'Youtube',
    category: 'IT',
    type: '배송형',
    requiredLevel: 5,
    xpReward: 1200,
    minFollowers: 500,
    minLevel: 1,
    lat: 37.5665,
    lng: 126.9780
  },
  {
    id: '3',
    title: '[강남역] 프라이빗 오마카세 디너',
    thumbnail: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    advertiser: '스시팝',
    applicants: 45,
    maxApplicants: 2,
    platform: 'Blog',
    category: '맛집',
    type: '방문형',
    requiredLevel: 4,
    xpReward: 800,
    minFollowers: 3000,
    minLevel: 2,
    lat: 37.4979,
    lng: 127.0276
  },
  {
    id: '4',
    title: '[연남동] 감성 듬뿍, 크로플 & 커피 세트',
    thumbnail: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?auto=format&fit=crop&q=80&w=800',
    advertiser: '카페팝',
    applicants: 230,
    maxApplicants: 15,
    platform: 'Instagram',
    category: '맛집',
    type: '방문형',
    requiredLevel: 1,
    xpReward: 200,
    minFollowers: 1000,
    minLevel: 1,
    lat: 37.5612,
    lng: 126.9248
  }
];

export const mockApplicants: Applicant[] = [
  { id: 'a1', name: '뷰티유튜버 민지', platform: '인스타그램', followers: 12500, engagementRate: 6.2, categoryFit: 98, level: 5, badges: ['마감 엄수', '우수 리뷰어', '노쇼 0%'], isSelected: false, noShows: 0, lateSubmissions: 0, message: '평소 다이슨에 관심이 많았고 뷰티 릴스 전문입니다! 고화질 영상 약속드려요.' },
  { id: 'a2', name: '맛집탐방러', platform: '블로그', followers: 3200, engagementRate: 2.1, categoryFit: 45, level: 2, badges: ['첫 리뷰 작성'], isSelected: false, noShows: 0, lateSubmissions: 1, message: '꼼꼼한 리뷰 작성하겠습니다.' },
  { id: 'a3', name: '숏폼장인', platform: '인스타그램', followers: 55000, engagementRate: 1.5, categoryFit: 80, level: 3, badges: ['우수 리뷰어'], isSelected: false, noShows: 1, lateSubmissions: 0, message: '트렌디한 BGM에 맞춰서 감각적으로 뽑아드립니다.' },
  { id: 'a4', name: '성실한 리뷰어', platform: '블로그', followers: 1500, engagementRate: 8.9, categoryFit: 90, level: 4, badges: ['마감 엄수', '노쇼 0%', '레벨업 마스터'], isSelected: false, noShows: 0, lateSubmissions: 0, message: '마감일 무조건 지킵니다. 정성스러운 포스팅 약속합니다.' },
];

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      level: 1,
      xp: 0,
      userFollowers: 0,
      appliedCampaigns: ['2'],
      badges: [],
      bizApplicants: mockApplicants,
      snsLinked: false,
      userRole: 'GUEST',
      notifications: [],
  
  adminWeights: {
    followerWeight: 0.01,
    erWeight: 100,
    levelWeight: 50,
    noShowPenalty: 500,
    latePenalty: 100,
  },

  updateAdminWeights: (newWeights) => set((state) => ({
    adminWeights: { ...state.adminWeights, ...newWeights }
  })),
  
  linkSns: (followers, level) => set({
    snsLinked: true,
    userFollowers: followers,
    level: level,
    badges: ['첫 리뷰 작성', '우수 리뷰어'], // Dummy badages for demo
    xp: 420
  }),
  
  applyForCampaign: (campaignId, xpReward) => set((state) => {
    if (state.appliedCampaigns.includes(campaignId)) return state;
    
    // Sync with Advertiser Dashboard (Add current user to bizApplicants)
    const newApplicant: Applicant = {
      id: `u_${Date.now()}`,
      name: '나 (현재 유저)',
      platform: '인스타그램',
      followers: state.userFollowers,
      engagementRate: 8.5, // Mock ER
      categoryFit: 95,
      level: state.level,
      badges: state.badges,
      isSelected: false,
      noShows: 0,
      lateSubmissions: 0,
      message: '열심히 리뷰하겠습니다! 잘 부탁드립니다.',
    };

    return { 
      appliedCampaigns: [...state.appliedCampaigns, campaignId],
      bizApplicants: [newApplicant, ...state.bizApplicants]
    };
  }),
  
  submitReview: (campaignId, xpReward) => set((state) => {
    const newXp = state.xp + xpReward;
    const newLevel = Math.floor(newXp / 500) + 3;
    
    let newNotifications = state.notifications;
    if (newLevel > state.level) {
      newNotifications = [{
        id: Date.now().toString(),
        message: `🎉 축하합니다! 레벨 ${newLevel}(으)로 승급하셨습니다!`,
        type: 'LEVEL_UP',
        read: false,
        time: Date.now()
      }, ...state.notifications];
    }

    return {
      xp: newXp,
      level: newLevel > state.level ? newLevel : state.level,
      appliedCampaigns: state.appliedCampaigns.filter(id => id !== campaignId),
      notifications: newNotifications,
      badges: newLevel > state.level && !state.badges.includes('레벨업 마스터') 
        ? [...state.badges, '레벨업 마스터'] 
        : state.badges
    };
  }),

  selectApplicant: (applicantId) => set((state) => ({
    bizApplicants: state.bizApplicants.map(app => 
      app.id === applicantId ? { ...app, isSelected: !app.isSelected } : app
    )
  })),
  
  addNotification: (message, type) => set((state) => ({
    notifications: [{
      id: Date.now().toString(),
      message,
      type,
      read: false,
      time: Date.now()
    }, ...state.notifications]
  })),

  markAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),

  loginAs: (role) => set({ userRole: role })
    }),
    {
      name: 'review-pop-storage', // name of the item in the storage (must be unique)
    }
  )
);
