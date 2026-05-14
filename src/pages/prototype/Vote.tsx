import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Info, SkipForward, Trophy, Users } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { StageBackLink } from '../../prototype/StageBackLink';
import { Button } from '../../components/ui/Button';
import { ideas, members, type Idea } from '../../prototype/data';

interface Matchup {
  a: Idea;
  b: Idea;
}

function buildMatchups(list: Idea[]): Matchup[] {
  const out: Matchup[] = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      out.push({ a: list[i], b: list[j] });
    }
  }
  return out;
}

export default function Vote() {
  const navigate = useNavigate();
  const matchups = useMemo(() => buildMatchups(ideas), []);
  const [idx, setIdx] = useState(0);
  const [wins, setWins] = useState<Record<string, number>>({});
  const [skipped, setSkipped] = useState(0);

  const total = matchups.length;
  const done = idx >= total;
  const current = matchups[idx];
  const progressPct = (idx / total) * 100;

  const finish = (finalWins: Record<string, number>) => {
    sessionStorage.setItem('weave:voteWins', JSON.stringify(finalWins));
    sessionStorage.setItem('weave:voteTotal', String(total - skipped));
    navigate('/prototype/vote/result');
  };

  const pick = (winnerId: string) => {
    const nextWins = { ...wins, [winnerId]: (wins[winnerId] ?? 0) + 1 };
    setWins(nextWins);
    if (idx + 1 >= total) finish(nextWins);
    else setIdx(idx + 1);
  };

  const skip = () => {
    setSkipped((s) => s + 1);
    if (idx + 1 >= total) finish(wins);
    else setIdx(idx + 1);
  };

  return (
    <PrototypeLayout phoneWidth={false}>
      <StageBackLink />
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        4단계 — 1대1 투표
      </p>
      <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">
        둘 중 더 좋은 아이디어는?
      </h1>
      <p className="text-[14px] text-muted mt-2 mb-5">
        모든 조합을 한 판씩 — 결과 페이지에서는 순위만 공개돼요.
      </p>

      <div className="bg-accent-soft border border-primary-light/40 rounded-md p-3 mb-5 flex items-start gap-2">
        <Info size={14} className="text-primary mt-0.5 flex-shrink-0" />
        <p className="text-[12px] text-primary-dark leading-relaxed">
          총 <strong>{total}판</strong> · 라운드로빈 · 누가 무엇에 표를 던졌는지 팀원에게는 공개되지 않아요.
        </p>
      </div>

      {/* 진행률 */}
      <div className="bg-surface border border-border rounded-md p-3 mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider">진행</span>
          <span className="text-[12px] font-bold text-primary-dark">
            {done ? total : idx + 1} / {total} {skipped > 0 && <span className="text-muted font-normal ml-1">(건너뜀 {skipped})</span>}
          </span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-wave ease-wave"
            style={{ width: `${done ? 100 : progressPct}%` }}
          />
        </div>
      </div>

      {/* Matchup */}
      {!done && current && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 mb-5 items-stretch">
            <MatchCard idea={current.a} onPick={() => pick(current.a.id)} />
            <div className="hidden sm:flex flex-col items-center justify-center self-center">
              <div className="w-10 h-10 rounded-full bg-primary text-paper text-[12px] font-bold flex items-center justify-center shadow-md">
                VS
              </div>
            </div>
            <div className="sm:hidden text-center -my-2">
              <span className="inline-block bg-primary text-paper text-[11px] font-bold px-3 py-1 rounded-full">VS</span>
            </div>
            <MatchCard idea={current.b} onPick={() => pick(current.b.id)} />
          </div>

          <button
            onClick={skip}
            className="w-full flex items-center justify-center gap-1.5 text-[12px] font-bold text-muted hover:text-primary py-2 transition-colors"
          >
            <SkipForward size={13} />
            결정 못하겠어요 (건너뛰기)
          </button>
        </>
      )}

      {/* 모두 끝났을 때 (사실상 finish() 가 곧바로 result 로 이동시키지만 안전망) */}
      {done && (
        <div className="bg-surface border-2 border-primary rounded-lg p-6 text-center">
          <Trophy size={36} className="text-primary mx-auto mb-2" />
          <h2 className="text-[18px] font-bold text-primary-dark">투표 완료!</h2>
          <p className="text-[12px] text-muted mt-1 mb-4">결과 페이지로 이동합니다.</p>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={<ArrowRight size={16} />}
            onClick={() => finish(wins)}
          >
            결과 보기
          </Button>
        </div>
      )}

      <div className="mt-6 text-center text-[11px] text-muted flex items-center justify-center gap-1.5">
        <Users size={11} />
        팀원 {members.length + 1}명 · 모두 투표 시 자동 마감
      </div>
    </PrototypeLayout>
  );
}

/* ============== Matchup 카드 ============== */
function MatchCard({ idea, onPick }: { idea: Idea; onPick: () => void }) {
  return (
    <button
      onClick={onPick}
      className="group bg-surface border border-border rounded-lg overflow-hidden flex flex-col text-left hover:border-primary hover:shadow-md transition-all"
    >
      <div
        className="relative h-32 sm:h-40 overflow-hidden flex items-center justify-center text-5xl"
        style={{ background: idea.gradient }}
      >
        {idea.image ? (
          <img
            src={idea.image}
            alt={idea.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          idea.emoji
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <div className="text-[10px] font-bold text-primary">👤 {idea.authorName}</div>
        <div className="text-[14px] font-bold text-primary-dark leading-tight mt-0.5">
          {idea.title}
        </div>
        <p className="text-[11px] text-muted mt-2 line-clamp-3 leading-relaxed">
          {idea.organized.problem}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-primary group-hover:text-primary-dark">
          이거 선택
          <ArrowRight size={12} />
        </div>
      </div>
    </button>
  );
}
