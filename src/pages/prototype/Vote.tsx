import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Trophy, Info } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ideas, voteCriteria, initialVotes, members } from '../../prototype/data';

export default function Vote() {
  const navigate = useNavigate();
  const [criterion, setCriterion] = useState(voteCriteria[0].key);
  // 사용자가 각 기준별로 1표씩 — { criterion: ideaId }
  const [myVotes, setMyVotes] = useState<Record<string, string>>({});

  const cast = (ideaId: string) => {
    setMyVotes((prev) => ({ ...prev, [criterion]: ideaId }));
  };

  // 현재 기준의 집계 (mock 초기값 + 내 표)
  const tally = useMemo(() => {
    const result: Record<string, number> = { ...initialVotes };
    if (myVotes[criterion]) {
      result[myVotes[criterion]] = (result[myVotes[criterion]] ?? 0) + 1;
    }
    return result;
  }, [criterion, myVotes]);

  const maxVotes = Math.max(...Object.values(tally), 1);
  const allVoted = voteCriteria.every((c) => myVotes[c.key]);

  // 종합 우승 — 모든 기준의 표를 합산 (간단 모델)
  const overallTally = useMemo(() => {
    const total: Record<string, number> = { ...initialVotes };
    Object.values(myVotes).forEach((id) => {
      total[id] = (total[id] ?? 0) + 1;
    });
    return total;
  }, [myVotes]);
  const winnerId = Object.entries(overallTally).sort((a, b) => b[1] - a[1])[0]?.[0];
  const winner = ideas.find((i) => i.id === winnerId);

  const goMediate = () => {
    sessionStorage.setItem('weave:winnerIdeaId', winnerId);
    navigate('/prototype/mediate');
  };

  return (
    <PrototypeLayout showBell bellCount={3} phoneWidth={false}>
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        4단계 — 투표
      </p>
      <h1 className="text-2xl font-bold tracking-tighter text-primary">
        최종 아이디어 투표
      </h1>
      <p className="text-[14px] text-muted mt-2 mb-5">
        4가지 기준으로 한 표씩. 종합 우승 1개가 다음 단계로 넘어갑니다.
      </p>

      <div className="bg-accent-soft/30 border border-accent-soft/60 rounded-md p-3 mb-5 flex items-start gap-2">
        <Info size={14} className="text-accent mt-0.5 flex-shrink-0" />
        <p className="text-[12px] text-primary leading-relaxed">
          심사 기준에서 따온 항목 — 종합 / 실현 가능성 / 발표 가능성 / 차별성
        </p>
      </div>

      {/* Criteria tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {voteCriteria.map((c) => {
          const active = criterion === c.key;
          const voted = !!myVotes[c.key];
          return (
            <button
              key={c.key}
              onClick={() => setCriterion(c.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md border text-[12px] font-bold transition-all ${
                active
                  ? 'bg-primary text-paper border-primary'
                  : 'bg-surface text-muted border-border hover:border-primary/30'
              }`}
            >
              {c.label}
              {voted && (
                <Check
                  size={12}
                  className={active ? 'text-paper' : 'text-success'}
                  strokeWidth={3}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-surface border border-border rounded-md p-3 mb-5">
        <div className="text-[12px] text-muted">
          <strong className="text-primary">{voteCriteria.find((c) => c.key === criterion)?.label}</strong>
          {' — '}
          {voteCriteria.find((c) => c.key === criterion)?.desc}
        </div>
      </div>

      {/* Idea cards with vote bar */}
      <div className="space-y-3 mb-6">
        {ideas.map((idea) => {
          const myVote = myVotes[criterion] === idea.id;
          const count = tally[idea.id] ?? 0;
          const pct = (count / maxVotes) * 100;

          return (
            <div
              key={idea.id}
              className={`bg-surface border rounded-lg overflow-hidden transition-all ${
                myVote ? 'border-accent shadow-sm' : 'border-border'
              }`}
            >
              <div className="flex items-center gap-3 p-4">
                <div
                  className="w-16 h-16 rounded-md flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: idea.gradient }}
                >
                  {idea.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-accent">👤 {idea.authorName}</div>
                  <div className="text-[14px] font-bold text-primary tracking-tight leading-tight mt-0.5">
                    {idea.title}
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[12px] font-bold text-primary">{count}표</span>
                  </div>
                </div>
                <Button
                  variant={myVote ? 'primary' : 'outline'}
                  size="sm"
                  leftIcon={myVote ? <Check size={12} /> : undefined}
                  onClick={() => cast(idea.id)}
                  className="flex-shrink-0"
                >
                  {myVote ? '투표함' : '투표'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress + final */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold text-muted uppercase tracking-wider">
            내 투표 진행률
          </span>
          <span className="text-[12px] font-bold text-primary">
            {Object.keys(myVotes).length} / {voteCriteria.length}
          </span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(Object.keys(myVotes).length / voteCriteria.length) * 100}%` }}
          />
        </div>
        <p className="text-[11px] text-muted mt-2">
          팀원 {members.length}명 · 모두 투표 시 자동 마감
        </p>
      </div>

      {winner && allVoted && (
        <div className="bg-success/10 border-l-4 border-success rounded-r-md p-4 mb-4 flex items-center gap-3">
          <Trophy size={20} className="text-success flex-shrink-0" />
          <div>
            <Badge variant="success" className="!text-[10px]">현재 1위</Badge>
            <div className="text-[14px] font-bold text-primary mt-1">{winner.title}</div>
            <div className="text-[11px] text-muted">👤 {winner.authorName} · {overallTally[winner.id]}표</div>
          </div>
        </div>
      )}

      <Button
        variant="primary"
        fullWidth
        size="lg"
        disabled={!allVoted}
        rightIcon={<ArrowRight size={16} />}
        onClick={goMediate}
      >
        {allVoted ? '투표 마감 → 충돌 중재로' : `${voteCriteria.length - Object.keys(myVotes).length}개 기준 더 투표하기`}
      </Button>
    </PrototypeLayout>
  );
}
