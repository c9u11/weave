import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { SelectRow } from '../../components/ui/SelectRow';

/**
 * 온보딩 1단계 — 프로젝트 세부 설정 (Figma "수정_온보딩 단계_01-1").
 * - 헤더: back chevron + progress bar
 * - 프로젝트 그룹 카드: 명/유형/마감/주제/심사기준
 * - 팀 설정 그룹 카드: 팀원 수 / 피드백 정책
 * - 하단 CTA: 다음 (→ 플랜 선택)
 *
 * 프로토타입 단계라 select row 들은 미리 채워진 값을 표시(클릭은 동작 안 함).
 */
export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <main className="flex-1 max-w-[440px] w-full mx-auto px-5 pt-3 pb-32">
        {/* 헤더 */}
        <button
          onClick={() => navigate('/prototype/landing')}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="뒤로"
        >
          <ArrowLeft size={24} />
        </button>

        <ProgressBar value={0.5} className="mt-4" />

        {/* 타이틀 */}
        <h1 className="mt-8 text-[22px] font-bold tracking-tight text-slate-900">
          프로젝트 세부 설정
        </h1>
        <p className="mt-2 text-sm text-muted">
          프로젝트와 팀 설정을 통해 관리해보세요
        </p>

        {/* 프로젝트 그룹 */}
        <GroupCard icon={<Folder size={20} fill="currentColor" />} title="프로젝트" className="mt-6">
          <SelectRow label="프로젝트 명" value="멋사 해커톤 프로젝트" />
          <SelectRow label="유형" value="아이디어 · 해커톤" />
          <SelectRow label="마감 일자" value="2026. 05. 18 (월)  15:00" />
          <SelectRow label="주제" value="AI로 세상을 없앤다면" />
          <SelectRow
            label="심사기준"
            value="문제 정의 20%, 차별성 20%, 시장 반응도 20%, 실현 가능성 15%, 비즈니스 임팩트 15%, 전달력 10%"
          />
        </GroupCard>

        {/* 팀 설정 그룹 */}
        <GroupCard icon={<Users size={20} />} title="팀 설정" className="mt-5">
          <SelectRow label="팀원 수" value="6명" />
          <SelectRow label="피드백 공개 정책" value="전체 실명" />
        </GroupCard>
      </main>

      {/* 하단 고정 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-paper">
        <div className="max-w-[440px] mx-auto px-5 pb-6 pt-3">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => navigate('/prototype/plan')}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}

interface GroupCardProps {
  icon: ReactNode;
  title: string;
  className?: string;
  children: ReactNode;
}
function GroupCard({ icon, title, className = '', children }: GroupCardProps) {
  return (
    <section
      className={`bg-white border border-border rounded-2xl px-5 ${className}`}
    >
      <header className="flex items-center gap-3 pt-5 pb-2">
        <span className="text-primary">{icon}</span>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
      </header>
      <div className="divide-y divide-border">{children}</div>
    </section>
  );
}
