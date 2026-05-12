import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Bot, ArrowRight, MessageSquare, Trophy } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ideas } from '../../prototype/data';

const agreed = [
  { item: '문제 정의', detail: '팀 프로젝트의 병목은 초기 기획 — 아이디어가 흩어지고 팀장 한두 명이 부담을 떠안는다', votes: 5 },
  { item: '타깃', detail: '대학생 조별과제 팀, 공모전·아이디어톤·해커톤 참가 팀', votes: 5 },
];

const conflicts = [
  {
    item: '실현 가능성',
    sides: [
      { who: '영준', stance: 'PPT 자동 생성까지는 무리 ✗', color: '#A78BFA' },
      { who: '병찬', stance: '핵심 4단계는 가능 ✓', color: '#F87171' },
    ],
    suggestion:
      '데모 범위를 "아이디어 수렴 → AI 분석 → 투표 → 산출물 구조화"로 좁히면 둘 다 가능. PPT 자동 생성은 2차로 미룬다.',
  },
  {
    item: '차별성',
    sides: [
      { who: '현준', stance: 'Notion과 뭐가 다른지 약함 ✗', color: '#FB923C' },
      { who: '병찬', stance: '"평가→구조화"가 차별점 ✓', color: '#F87171' },
    ],
    suggestion:
      '경쟁 서비스 비교로 못 박기: Notion(직접 구조화)·Trello(아이디어 평가 불가)·ChatGPT(팀 흐름 미관리) vs "아이디어를 제출 가능한 결과물로 바꾼다".',
  },
];

export default function Mediate() {
  const navigate = useNavigate();
  const winnerId = typeof window !== 'undefined' ? sessionStorage.getItem('weave:winnerIdeaId') : null;
  const winner = ideas.find((i) => i.id === winnerId) || ideas[0];

  return (
    <PrototypeLayout>
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        5단계 — AI 충돌 중재
      </p>
      <h1 className="text-2xl font-bold tracking-tighter text-primary">팀의 결론</h1>
      <p className="text-[14px] text-muted mt-2 mb-5">
        AI가 팀원 의견을 분석해 합의된 부분과 충돌하는 부분을 자동 분리했어요.
      </p>

      {/* Winner card */}
      <div className="bg-surface border-2 border-accent rounded-lg overflow-hidden mb-6 flex items-center gap-3 p-3">
        <div
          className="w-16 h-16 rounded-md flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden"
          style={{ background: winner.gradient }}
        >
          {winner.image ? (
            <img src={winner.image} alt={winner.title} className="w-full h-full object-cover object-top" />
          ) : (
            winner.emoji
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Trophy size={14} className="text-accent" />
            <Badge variant="accent">투표 1위</Badge>
          </div>
          <div className="text-[15px] font-bold text-primary tracking-tight mt-1">{winner.title}</div>
          <div className="text-[11px] text-muted">👤 {winner.authorName}</div>
        </div>
      </div>

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
                팀원 전원 👍
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
                <div className="text-[13px] font-bold text-primary mb-3">{c.item}</div>
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
