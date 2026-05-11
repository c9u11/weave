import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Bot, ArrowRight, MessageSquare } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';

const agreed = [
  { item: '문제 정의', detail: '친구들과 메뉴 합의가 번거롭다', votes: 3 },
  { item: '타깃', detail: '20대 친구 그룹 배달 주문자', votes: 3 },
];

const conflicts = [
  {
    item: '실현 가능성',
    sides: [
      { who: '준혁', stance: '어렵습니다 ✗', color: '#A78BFA' },
      { who: '채원', stance: 'MVP 가능 ✓', color: '#FB923C' },
    ],
    suggestion:
      '핵심 기능 1개로 좁히면 둘 다 가능. 검증 질문: "MVP의 최소 동작은?" → 그룹 내 메뉴 5개 중 투표 1개 기능만 우선.',
  },
  {
    item: '차별성',
    sides: [
      { who: '서진', stance: '약함 ✗', color: '#34D399' },
      { who: '채원', stance: '충분 ✓', color: '#FB923C' },
    ],
    suggestion: '경쟁 서비스 3개 비교 후 결정. 카톡 투표 / 토스 모임투표 / 자체 추천 알고리즘.',
  },
];

export default function Mediate() {
  const navigate = useNavigate();

  return (
    <PrototypeLayout>
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        4단계 — AI 충돌 중재
      </p>
      <h1 className="text-2xl font-bold tracking-tighter text-primary">팀의 결론</h1>
      <p className="text-[14px] text-muted mt-2 mb-6">
        AI가 팀원 의견을 분석해 합의된 부분과 충돌하는 부분을 자동 분리했어요.
      </p>

      {/* Agreed */}
      <section className="mb-6">
        <h2 className="flex items-center gap-2 text-[13px] font-bold text-success uppercase tracking-wider mb-3">
          <CheckCircle2 size={16} /> 합의 ({agreed.length})
        </h2>
        <div className="space-y-2">
          {agreed.map((a) => (
            <div
              key={a.item}
              className="border-l-4 border-success bg-success/10 rounded-r-md p-3"
            >
              <div className="text-[13px] font-bold text-primary">{a.item}</div>
              <div className="text-[13px] text-muted mt-1 leading-relaxed">{a.detail}</div>
              <div className="text-[11px] text-success mt-1.5 font-semibold">
                3명 모두 👍
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conflicts */}
      <section className="mb-6">
        <h2 className="flex items-center gap-2 text-[13px] font-bold text-warning uppercase tracking-wider mb-3">
          <AlertTriangle size={16} /> 충돌 ({conflicts.length})
        </h2>
        <div className="space-y-4">
          {conflicts.map((c) => (
            <div key={c.item} className="bg-surface border border-border rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="text-[13px] font-bold text-primary mb-3">
                  {c.item}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {c.sides.map((s) => (
                    <div
                      key={s.who}
                      className="rounded-md p-2.5 text-[12px]"
                      style={{ borderLeft: `3px solid ${s.color}`, background: '#FAFAF9' }}
                    >
                      <div className="font-bold text-primary">{s.who}</div>
                      <div className="text-muted mt-0.5">{s.stance}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-accent-soft/30 border-t border-border p-3 flex gap-2.5">
                <Bot size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <div className="text-[12px] text-primary leading-relaxed">
                  <strong>AI 제안:</strong> {c.suggestion}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-2">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          rightIcon={<ArrowRight size={16} />}
          onClick={() => navigate('/prototype/brief')}
        >
          기획안 만들기
        </Button>
        <Button variant="outline" fullWidth leftIcon={<MessageSquare size={14} />}>
          추가 논의
        </Button>
      </div>
    </PrototypeLayout>
  );
}
