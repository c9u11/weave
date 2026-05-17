import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CircleDollarSign } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';

/**
 * 온보딩 2단계 — 팀 플랜 선택 (Figma "수정_온보딩 단계_01-2").
 * - 헤더: back chevron + progress bar (~95%)
 * - 3개 플랜 카드 (Free / Plus / Pro) — Plus 기본 선택
 * - 하단 고정: 안전 결제 안내 + primary CTA (선택 플랜 금액)
 *
 * 흐름: 프로젝트 설정 → 여기 → ready 화면
 */

type PlanKey = 'free' | 'plus' | 'pro';

interface Plan {
  key: PlanKey;
  name: string;
  price?: string;
  priceValue: number;
  lines: string[];
}

const PLANS: Plan[] = [
  {
    key: 'free',
    name: 'Free',
    priceValue: 0,
    lines: ['AI 아이디어 정리, 기획안 생성 1회', '개인 작업 공간 제공'],
  },
  {
    key: 'plus',
    name: 'Plus',
    price: '9,900원',
    priceValue: 9900,
    lines: ['팀원 4명 까지 가능 , PPT 초안 제작', 'Notion/Slack/카카오톡 연동 서비스'],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '12,900원',
    priceValue: 12900,
    lines: ['팀원 6명 까지 가능 , PPT 초안 제작', '캔버스 , Google Docs 등 대시보드 제작 가능'],
  },
];

export default function PlanSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PlanKey>('plus');

  const current = PLANS.find((p) => p.key === selected)!;
  const ctaLabel =
    current.priceValue === 0 ? 'Free 로 시작하기' : `${current.price} 결제 하기`;

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <main className="flex-1 max-w-[440px] w-full mx-auto px-5 pt-3 pb-36">
        <button
          onClick={() => navigate('/prototype/onboarding')}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="뒤로"
        >
          <ArrowLeft size={24} />
        </button>

        <ProgressBar value={0.95} className="mt-4" />

        <h1 className="mt-8 text-[26px] font-bold tracking-tight text-slate-900">
          팀 플랜 선택
        </h1>
        <p className="mt-2 text-sm text-muted">
          더 효율적인 협업을 위한 맞춤형 플랜을 준비했어요
        </p>

        <div className="mt-6 space-y-4">
          {PLANS.map((p) => {
            const isSelected = selected === p.key;
            return (
              <button
                key={p.key}
                onClick={() => setSelected(p.key)}
                className="block w-full text-left"
              >
                <Card selected={isSelected} className="!p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className={`text-lg font-bold tracking-tight ${
                        isSelected ? 'text-primary' : 'text-slate-900'
                      }`}
                    >
                      {p.name}
                    </h3>
                    {p.price && (
                      <span
                        className={`text-base font-semibold ${
                          isSelected ? 'text-slate-900' : 'text-primary'
                        }`}
                      >
                        {p.price}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-muted leading-relaxed">
                    {p.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </Card>
              </button>
            );
          })}
        </div>
      </main>

      {/* 하단 고정 CTA + 안전 결제 안내 */}
      <div className="fixed bottom-0 left-0 right-0 bg-paper">
        <div className="max-w-[440px] mx-auto px-5 pb-6 pt-3">
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted mb-3">
            <CircleDollarSign size={14} className="text-muted" />
            안전하게 결제하세요
          </div>
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => navigate('/prototype/onboarding/ready')}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
