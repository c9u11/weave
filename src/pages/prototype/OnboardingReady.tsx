import { Link, useNavigate } from 'react-router-dom';
import { Lightbulb, Sparkles, Users, Share2, FileText } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../../components/ui/Button';

/**
 * 온보딩 마지막 단계 (Figma "수정_온보딩 단계_01").
 * - 옅은 primary 톤의 그라데이션 배경 (마법적인 느낌)
 * - 큰 타이틀: "Weave" + "아이디어가 가치가 되는 곳"
 * - 떠다니는 칩 클러스터 5개
 * - CTA 2개: 링크 공유하기 / Weave 시작하기
 */
export default function OnboardingReady() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        background: [
          // 중앙 칩 영역의 옅은 primary 글로우
          'radial-gradient(70% 45% at 50% 60%, rgba(134, 148, 223, 0.35) 0%, rgba(232, 235, 247, 0.6) 40%, rgba(255,255,255,0) 75%)',
          // 상단의 미세한 보랏빛 hint
          'radial-gradient(90% 50% at 50% 0%, rgba(213, 221, 242, 0.7) 0%, rgba(255, 255, 255, 0) 60%)',
          // 베이스
          'linear-gradient(180deg, #FFFFFF 0%, #F6F7FB 100%)',
        ].join(', '),
      }}
    >
      <Link
        to="/prototype/plan"
        className="absolute top-4 left-4 text-xs text-muted hover:text-primary-dark transition-colors z-10"
      >
        ← 플랜 선택
      </Link>

      <div className="flex-1 flex flex-col items-center pt-24 px-5">
        <h1 className="text-center">
          <span className="block text-3xl font-bold tracking-tight text-primary">
            Weave
          </span>
          <span className="block mt-1 text-[28px] font-bold tracking-tight text-slate-900 leading-snug">
            아이디어가 가치가 되는 곳
          </span>
        </h1>
        <p className="mt-4 text-center text-sm text-muted leading-relaxed">
          AI와 함께 아이디어를 정리하고
          <br />
          팀과 협업하여 멋진 기획안을 완성해보세요
        </p>

        {/* 칩 클러스터 — 좀 더 흩어진 배치 + 그림자로 떠 있는 느낌 */}
        <div className="relative w-full max-w-[360px] h-[320px] mt-10">
          <FloatChip
            icon={<Sparkles size={14} />}
            label="AI 피드백"
            className="absolute top-0 right-4"
          />
          <FloatChip
            icon={<Lightbulb size={14} />}
            label="아이디어"
            className="absolute top-14 left-2"
          />
          <FloatChip
            icon={<Users size={14} />}
            label="팀 협업"
            className="absolute top-32 right-10"
          />
          <FloatChip
            icon={<Share2 size={14} />}
            label="링크 공유하기"
            className="absolute top-52 right-0"
          />
          <FloatChip
            icon={<FileText size={14} />}
            label="기획안 완성"
            className="absolute top-64 left-8"
          />
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
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-sm font-semibold text-primary-dark ${className}`}
      style={{ boxShadow: '0 6px 20px rgba(60, 72, 131, 0.10)' }}
    >
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}
