import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RoleSwitcher from "@/components/RoleSwitcher";
import NotificationCenter from "@/components/NotificationCenter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "REVIEW.POP (리뷰팝) | 초자동화 체험단 플랫폼",
  description: "광고주 노쇼 100% 보증, 인플루언서 하이패스 당첨. 리뷰어와 광고주를 잇는 가장 진보된 형태의 AI 체험단 생태계입니다.",
  keywords: ["체험단", "리뷰", "인플루언서", "광고주", "블로그체험단", "인스타체험단", "AI기획"],
  openGraph: {
    title: "REVIEW.POP - 가장 진보된 초자동화 체험단",
    description: "노쇼 100% 보증, AI 원터치 기획. 지금 바로 시작하세요!",
    url: "https://reviewpop.com",
    siteName: "REVIEW.POP",
    images: [
      {
        url: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "REVIEW.POP Preview Image",
      }
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REVIEW.POP - 초자동화 체험단 플랫폼",
    description: "가장 진보된 형태의 AI 체험단 생태계",
    images: ["https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop"],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0b0c10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NotificationCenter />
        <RoleSwitcher />
        {children}
      </body>
    </html>
  );
}
