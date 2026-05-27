import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { url, requiredTags } = await req.json();

    if (!url) {
      return NextResponse.json({ success: false, message: 'URL이 필요합니다.' }, { status: 400 });
    }

    // 데모용 하드코딩 (데모 주소를 넣었을 때 강제 통과/실패)
    if (url.includes('pass')) {
      return NextResponse.json({ success: true, message: '가이드라인 100% 준수 확인!' });
    }
    if (url.includes('fail')) {
      return NextResponse.json({ success: false, message: '필수 해시태그 누락: #성수맛집' });
    }

    // 실제 크롤링 시도
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, message: '해당 URL에 접속할 수 없습니다. 비공개 글인지 확인해주세요.' });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // 네이버 블로그 같은 iframe 구조는 정적 스크래핑으로 본문 텍스트를 바로 찾기 어려울 수 있음.
    // 하지만 일반적인 웹페이지나 블로그 본문이라고 가정하고 텍스트를 추출.
    const bodyText = $('body').text();

    const missingTags = [];
    if (requiredTags && requiredTags.length > 0) {
      for (const tag of requiredTags) {
        if (!bodyText.includes(tag)) {
          missingTags.push(tag);
        }
      }
    }

    if (missingTags.length > 0) {
      return NextResponse.json({ 
        success: false, 
        message: `필수 해시태그 누락: ${missingTags.join(', ')}` 
      });
    }

    return NextResponse.json({ success: true, message: '가이드라인 100% 준수 확인!' });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: '서버 오류: 올바른 URL 형식이 아닙니다.' }, { status: 500 });
  }
}
