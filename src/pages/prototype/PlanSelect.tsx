import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Users } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { StageBackLink } from '../../prototype/StageBackLink';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { plans, type PlanDef } from '../../prototype/data';

export default function PlanSelect() {
  const [selected, setSelected] = useState<PlanDef['key']>('plus');
  const navigate = useNavigate();

  return (
    <PrototypeLayout>
      <StageBackLink />
      <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">팀 플랜 선택</h1>
      <p className="text-[14px] text-muted mt-2 mb-2">프로젝트 단위 1회 결제 · 구독 X</p>
      <div className="bg-accent-soft text-primary text-[12px] font-semibold p-3 rounded-md mb-5 leading-relaxed flex items-start gap-2 border border-primary-light/40">
        <Sparkles size={14} className="mt-0.5 flex-shrink-0 text-primary" />
        <span>
          ChatGPT Plus 6명 개별 구독 138,000원 / 월 vs Weave Plus 9,900원 / 프로젝트
        </span>
      </div>

      <div className="space-y-3">
        {plans.map((p) => {
          const active = selected === p.key;
          return (
            <button
              key={p.key}
              onClick={() => setSelected(p.key)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                active
                  ? 'border-primary bg-surface shadow-sm'
                  : 'border-border bg-surface hover:border-primary/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[16px] font-bold text-primary-dark">{p.name}</span>
                    {p.recommended && <Badge variant="accent">RECOMMENDED</Badge>}
                    {p.teamSize && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted bg-surface-alt border border-border rounded-full px-2 py-0.5">
                        <Users size={10} />
                        {p.teamSize}
                      </span>
                    )}
                  </div>
                  <div className="mt-1">
                    <span className="text-[22px] font-bold text-primary">{p.price}</span>
                    <span className="text-[12px] text-muted ml-1">{p.sub}</span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-1 ${
                    active ? 'border-primary bg-primary' : 'border-border'
                  }`}
                >
                  {active && <Check size={12} className="text-paper" strokeWidth={3} />}
                </div>
              </div>
              <ul className="space-y-1.5 mt-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12px] text-primary-dark/85">
                    <Check size={12} className="text-primary mt-1 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <Button
        variant="primary"
        fullWidth
        size="lg"
        className="mt-6"
        onClick={() => navigate('/prototype/invite')}
      >
        {plans.find((p) => p.key === selected)?.name} 선택하고 계속 →
      </Button>
    </PrototypeLayout>
  );
}
