import { Link } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { ideas } from '../../prototype/data';

/**
 * 홈 (Figma "홈.png").
 * - 상단: 사용자 이름 + bell / menu 아이콘
 * - 프로젝트 카드: 프로젝트 명, 현재 단계, 플랜 배지, D-day, 4-step 프로세스 timeline
 * - 아이디어 목록: 2열 정사각형 이미지 그리드
 * - 우하단 primary FAB (✦ AI 채팅 진입)
 *
 * 뒤로 경로: 우상단 hamburger → 프로토타입 메뉴 (§0.1)
 */

interface Stage {
  label: string;
  to: string;
}

const STAGES: Stage[] = [
  { label: '아이디어 제출', to: '/prototype/idea/new' },
  { label: '피드백', to: '/prototype/ideas' },
  { label: '투표 진행', to: '/prototype/vote' },
  { label: '기획안 확인', to: '/prototype/brief' },
];

// 현재 단계 인덱스 (Figma 시안 기준 — 아이디어 제출 단계)
const CURRENT_STAGE = 0;

export default function TeamHome() {
  return (
    <div className="min-h-screen bg-paper">
      <main className="max-w-[440px] mx-auto px-5 pt-4 pb-28">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">배병찬</h1>
          <div className="flex items-center gap-1">
            <Link
              to="/prototype/notifications"
              className="p-2 text-slate-900 hover:text-primary transition-colors"
              aria-label="알림"
            >
              <Bell size={22} />
            </Link>
            <Link
              to="/prototype"
              className="p-2 text-slate-900 hover:text-primary transition-colors"
              aria-label="메뉴"
            >
              <Menu size={22} />
            </Link>
          </div>
        </div>

        {/* 프로젝트 현황 카드 */}
        <Card className="mt-5">
          {/* 행 1: 프로젝트명 + Plus 배지 */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted">멋사 해커톤 프로젝트</div>
            <span className="rounded-md bg-accent-soft text-primary text-xs font-semibold px-2 py-0.5">
              Plus
            </span>
          </div>

          {/* 행 2: 현재 단계 + D-day */}
          <div className="mt-2 flex items-start justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              아이디어 제출
            </h2>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold tracking-tight text-primary">
                D-3
              </div>
              <div className="text-[11px] text-muted mt-0.5">
                2026. 05. 15 (금) 마감
              </div>
            </div>
          </div>

          {/* 행 3: 프로세스 타임라인 */}
          <div className="mt-5">
            <div className="text-xs text-muted mb-3">프로세스</div>
            <StageTimeline stages={STAGES} currentIdx={CURRENT_STAGE} />
          </div>
        </Card>

        {/* 아이디어 목록 */}
        <section className="mt-7">
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              아이디어 목록
            </h2>
            <Link
              to="/prototype/ideas"
              className="text-xs text-muted hover:text-primary-dark transition-colors"
            >
              더보기 ›
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {ideas.slice(0, 6).map((idea) => (
              <Link
                key={idea.id}
                to={`/prototype/idea/${idea.id}`}
                className="aspect-square rounded-xl overflow-hidden border border-border bg-surface-alt hover:border-primary/40 transition-colors"
                title={idea.title}
              >
                {idea.image ? (
                  <img
                    src={idea.image}
                    alt={idea.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-3xl"
                    style={{ background: idea.gradient }}
                  >
                    {idea.emoji}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* FAB — AI 채팅 진입. ai.png 글리프 + 흰 배경 + 푸른 그림자 */}
      <Link
        to="/prototype/chat"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center transition-transform active:scale-95"
        style={{ boxShadow: '0 8px 24px rgba(60, 72, 131, 0.18)' }}
        aria-label="AI 채팅"
      >
        <img src="/ai.png" alt="AI" className="w-7 h-7" />
      </Link>
    </div>
  );
}

interface StageTimelineProps {
  stages: Stage[];
  currentIdx: number;
}
function StageTimeline({ stages, currentIdx }: StageTimelineProps) {
  return (
    <div className="relative flex items-start justify-between">
      {/* 연결선 — 양 끝 도트 안쪽까지 */}
      <div className="absolute left-3 right-3 top-[5px] h-px bg-border" />
      {stages.map((s, i) => {
        const isActive = i === currentIdx;
        const isDone = i < currentIdx;
        const filled = isActive || isDone;
        return (
          <Link
            key={s.label}
            to={s.to}
            className="relative flex flex-col items-center gap-1.5 z-10 flex-1 group"
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                filled ? 'bg-primary' : 'bg-border'
              }`}
            />
            <span
              className={`text-[11px] tracking-tight text-center ${
                isActive
                  ? 'text-primary-dark font-bold'
                  : 'text-muted group-hover:text-primary-dark'
              }`}
            >
              {s.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
