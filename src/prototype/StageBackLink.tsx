import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface StageBackLinkProps {
  /** 돌아갈 경로 (기본: 팀 홈) */
  to?: string;
  /** 링크 라벨 (기본: 팀 홈) */
  label?: string;
}

/**
 * 화면 콘텐츠 내부의 '뒤로가기' 링크.
 * 상단 바(프로토타입 크롬)는 실제 제품에 포함되는 요소가 아니므로,
 * 각 단계 화면은 콘텐츠 안에 자체 back 동선을 가진다. (idea 상세의 breadcrumb 와 동일 톤)
 */
export function StageBackLink({ to = '/prototype/team', label = '팀 홈' }: StageBackLinkProps) {
  return (
    <div className="mb-4">
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-[12px] text-muted hover:text-primary transition-colors"
      >
        <ArrowLeft size={14} /> {label}
      </Link>
    </div>
  );
}
