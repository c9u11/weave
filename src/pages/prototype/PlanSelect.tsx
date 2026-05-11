import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const plans = [
  {
    key: 'free',
    name: 'Free',
    price: '무료',
    sub: '체험용',
    features: ['게시판형 아이디어 공유', '팀원 댓글 피드백', '기획안 투표·선정', 'AI 체험 1회 (Haiku)'],
  },
  {
    key: 'plus',
    name: 'Plus',
    price: '9,900원',
    sub: '/ 팀 / 프로젝트',
    recommended: true,
    features: [
      'AI 페르소나 4명 비평',
      '충돌 자동 중재 (F3)',
      'AI 아이디어 시각화 (DALL·E)',
      '서비스 플로우 + PPT 초안',
      'Notion · Slack · 카톡 Export',
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '19,900원',
    sub: '/ 팀 / 프로젝트',
    soon: true,
    features: ['풀 PRD 자동 생성', '린 캔버스 / BMC', '발표 스크립트 + 리허설', 'Google Docs / .pptx / Figma'],
  },
];

export default function PlanSelect() {
  const [selected, setSelected] = useState('plus');
  const navigate = useNavigate();

  return (
    <PrototypeLayout>
      <h1 className="text-2xl font-bold tracking-tighter text-primary">팀 플랜 선택</h1>
      <p className="text-[14px] text-muted mt-2 mb-2">프로젝트 단위 1회 결제 · 구독 X</p>
      <div className="bg-accent-soft/30 text-accent text-[12px] font-semibold p-3 rounded-md mb-5 leading-relaxed flex items-start gap-2">
        <Sparkles size={14} className="mt-0.5 flex-shrink-0" />
        <span>ChatGPT Plus 6명 개별 구독 138,000원 / 월 vs Plus 9,900원 / 프로젝트</span>
      </div>

      <div className="space-y-3">
        {plans.map((p) => {
          const active = selected === p.key;
          return (
            <button
              key={p.key}
              onClick={() => !p.soon && setSelected(p.key)}
              disabled={p.soon}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                active
                  ? 'border-accent bg-surface shadow-sm'
                  : 'border-border bg-surface hover:border-primary/30'
              } ${p.soon ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold text-primary">{p.name}</span>
                    {p.recommended && <Badge variant="accent">RECOMMENDED</Badge>}
                    {p.soon && <Badge variant="soft">v1.1</Badge>}
                  </div>
                  <div className="mt-1">
                    <span className="text-[20px] font-bold text-accent">{p.price}</span>
                    <span className="text-[12px] text-muted ml-1">{p.sub}</span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-1 ${
                    active ? 'border-accent bg-accent' : 'border-border'
                  }`}
                >
                  {active && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
              </div>
              <ul className="space-y-1 mt-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12px] text-muted">
                    <Check size={12} className="text-success mt-1 flex-shrink-0" />
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
