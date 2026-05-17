import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Sparkles, Trophy, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ideas } from '../../prototype/data';

/**
 * AI 충돌 중재.
 * - 헤더: back + 타이틀 + 부제
 * - 1위 아이디어 카드
 * - 합의 섹션 (success 톤)
 * - 충돌 섹션 (warning 톤) — 양측 stance + AI 제안
 * - 하단 고정: 기획안 만들기 / 추가 논의
 */

const AGREED = [
  {
    item: '문제 정의',
    detail:
      '팀 프로젝트의 병목은 초기 기획 — 아이디어가 흩어지고 팀장 한두 명이 부담을 떠안는다',
  },
  {
    item: '타깃',
    detail: '대학생 조별과제 팀, 공모전·아이디어톤·해커톤 참가 팀',
  },
];

const CONFLICTS = [
  {
    item: '실현 가능성',
    sides: [
      { who: '영준', stance: 'PPT 자동 생성까지는 무리', color: '#A78BFA' },
      { who: '병찬', stance: '핵심 4단계는 가능', color: '#F87171' },
    ],
    suggestion:
      '데모 범위를 "아이디어 수렴 → AI 분석 → 투표 → 산출물 구조화"로 좁히면 둘 다 가능. PPT 자동 생성은 2차로 미룬다.',
  },
  {
    item: '차별성',
    sides: [
      { who: '현준', stance: 'Notion과 뭐가 다른지 약함', color: '#FB923C' },
      { who: '병찬', stance: '"평가→구조화"가 차별점', color: '#F87171' },
    ],
    suggestion:
      '경쟁 비교로 못 박기: Notion(직접 구조화)·Trello(평가 불가)·ChatGPT(팀 흐름 미관리) vs "아이디어를 제출 가능한 결과물로 바꾼다".',
  },
];

export default function Mediate() {
  const navigate = useNavigate();
  const winnerId =
    typeof window !== 'undefined' ? sessionStorage.getItem('weave:winnerIdeaId') : null;
  const winner = ideas.find((i) => i.id === winnerId) || ideas[0];

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <main className="flex-1 max-w-[440px] w-full mx-auto px-5 pt-3 pb-32">
        <button
          onClick={() => navigate(-1)}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="뒤로"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="mt-3 text-[22px] font-bold tracking-tight text-slate-900">
          팀의 결론
        </h1>
        <p className="mt-2 text-sm text-muted">
          AI가 팀원 의견을 분석해 합의된 부분과 충돌하는 부분을 자동 분리했어요.
        </p>

        {/* 1위 카드 */}
        <div className="mt-5 flex items-center gap-3 p-4 bg-white border-2 border-primary rounded-2xl">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden bg-surface-alt"
            style={{ background: winner.image ? undefined : winner.gradient }}
          >
            {winner.image ? (
              <img
                src={winner.image}
                alt={winner.title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              winner.emoji
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
              <Trophy size={12} />
              투표 1위
            </div>
            <div className="mt-0.5 text-base font-bold tracking-tight text-slate-900 truncate">
              {winner.title}
            </div>
            <div className="text-xs text-muted">{winner.authorName}</div>
          </div>
        </div>

        {/* 합의 */}
        <section className="mt-7">
          <h2 className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-900">
            <CheckCircle2 size={16} className="text-success" />
            합의 ({AGREED.length})
          </h2>
          <div className="mt-3 space-y-2">
            {AGREED.map((a) => (
              <div
                key={a.item}
                className="rounded-2xl bg-success/10 border-l-4 border-success p-4"
              >
                <div className="text-sm font-bold text-slate-900">{a.item}</div>
                <p className="mt-1 text-sm text-slate-900/80 leading-relaxed">{a.detail}</p>
                <div className="mt-1.5 text-xs font-semibold text-success">팀원 전원 👍</div>
              </div>
            ))}
          </div>
        </section>

        {/* 충돌 */}
        <section className="mt-7">
          <h2 className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-900">
            <AlertTriangle size={16} className="text-warning" />
            충돌 ({CONFLICTS.length})
          </h2>
          <div className="mt-3 space-y-4">
            {CONFLICTS.map((c) => (
              <div
                key={c.item}
                className="bg-white border border-border rounded-2xl overflow-hidden"
              >
                <div className="p-4">
                  <div className="text-sm font-bold text-slate-900 mb-3">{c.item}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {c.sides.map((s) => (
                      <div
                        key={s.who}
                        className="rounded-xl p-3 text-xs bg-paper border-l-4"
                        style={{ borderLeftColor: s.color }}
                      >
                        <div className="font-semibold text-slate-900">{s.who}</div>
                        <div className="text-muted mt-0.5 leading-relaxed">{s.stance}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-accent-soft px-4 py-3 flex gap-2.5">
                  <Sparkles size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-primary-dark leading-relaxed">
                    <strong>AI 제안:</strong> {c.suggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-paper">
        <div className="max-w-[440px] mx-auto px-5 pb-6 pt-3 space-y-3">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => navigate('/prototype/brief')}
          >
            기획안 만들기
          </Button>
          <Button
            variant="outline"
            fullWidth
            size="lg"
            leftIcon={<MessageSquare size={18} />}
          >
            추가 논의
          </Button>
        </div>
      </div>
    </div>
  );
}
