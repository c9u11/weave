import { Link, useNavigate } from 'react-router-dom';
import { Lightbulb, Sparkles, Users, Share2, FileText } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../../components/ui/Button';

/**
 * 온보딩 마지막 단계 (Figma "수정_온보딩 단계_01").
 * 프로젝트 생성·결제 완료 후, "이제 시작할 수 있어요" 화면.
 * - 링크 공유하기 → 팀원 초대 흐름으로
 * - Weave 시작하기 → 팀 홈 진입
 *
 * 흐름 순서: 01-1 (project) → 01-2 (plan) → 여기(01 ready) → 팀 홈
 */
export default function OnboardingReady() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-paper flex flex-col">
      <Link
        to="/prototype/plan"
        className="absolute top-4 left-4 text-xs text-muted hover:text-primary-dark transition-colors z-10"
      >
        ← 플랜 선택
      </Link>

      <div className="flex-1 flex flex-col items-center pt-20 px-5">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          <span className="text-primary">Weave</span>
          <br />
          <span className="text-slate-900">아이디어가 가치가 되는 곳</span>
        </h1>
        <p className="mt-4 text-center text-sm text-muted leading-relaxed">
          AI와 함께 아이디어를 정리하고
          <br />
          팀과 협업하여 멋진 기획안을 완성해보세요
        </p>

        <div className="relative w-full max-w-[360px] h-[300px] mt-8">
          <FloatChip icon={<Sparkles size={14} />} label="AI 피드백" className="absolute top-0 right-2" />
          <FloatChip icon={<Lightbulb size={14} />} label="아이디어" className="absolute top-16 left-4" />
          <FloatChip icon={<Users size={14} />} label="팀 협업" className="absolute top-28 right-8" />
          <FloatChip icon={<Share2 size={14} />} label="링크 공유하기" className="absolute top-44 right-0" />
          <FloatChip icon={<FileText size={14} />} label="기획안 완성" className="absolute top-60 left-10" />
        </div>
      </div>

      <div className="px-5 pb-8 space-y-3">
        <Button
          variant="outline"
          fullWidth
          size="lg"
          onClick={() => navigate('/prototype/invite')}
        >
          링크 공유하기
        </Button>
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => navigate('/prototype/team')}
        >
          Weave 시작하기
        </Button>
      </div>
    </div>
  );
}

interface FloatChipProps {
  icon: ReactNode;
  label: string;
  className?: string;
}
function FloatChip({ icon, label, className = '' }: FloatChipProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm text-sm font-semibold text-primary-dark ${className}`}
    >
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}
