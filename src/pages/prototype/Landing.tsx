import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { WeaveMark } from '../../components/brand/WeaveMark';

/**
 * 로그인 (Figma "첫 화면").
 * - primary 풀-블리드 배경
 * - 중앙: 윙·웨이브 마크 + "Weave"
 * - 하단: 구글 / 카카오 로그인 버튼
 *
 * 모바일 상단바(9:41/노치) 렌더링 금지 (design/DESIGN_SYSTEM.md §0.2).
 * 뒤로 경로: 좌상단 "프로토타입 메뉴로" 보조 링크 (§0.1).
 */
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-primary flex flex-col">
      {/* dev escape hatch — 시연 중에는 거의 보이지 않게, 단 §0.1 항상 살아있는 뒤로 경로 */}
      <Link
        to="/prototype"
        className="absolute top-4 left-4 text-[12px] text-white/50 hover:text-white transition-colors z-10"
      >
        ← 프로토타입 메뉴
      </Link>

      {/* 중앙 로고 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <WeaveMark className="w-[140px] h-auto text-white" />
        <h1 className="mt-5 text-[40px] font-bold tracking-tight text-white">
          Weave
        </h1>
      </div>

      {/* 하단 로그인 버튼들 */}
      <div className="px-5 pb-8 space-y-3">
        <Button
          variant="google"
          fullWidth
          size="lg"
          leftIcon={<GoogleGlyph />}
          onClick={() => navigate('/prototype/onboarding')}
        >
          구글 계정 로그인
        </Button>
        <Button
          variant="kakao"
          fullWidth
          size="lg"
          leftIcon={<MessageCircle size={20} fill="currentColor" />}
          onClick={() => navigate('/prototype/onboarding')}
        >
          카카오 로그인
        </Button>
      </div>
    </div>
  );
}

function GoogleGlyph() {
  // Google "G" 색상 글리프 (4색)
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
