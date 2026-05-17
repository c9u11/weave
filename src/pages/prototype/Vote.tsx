import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { ideas, type Idea } from '../../prototype/data';

/**
 * 투표 진행 (Figma "투표 진행.png").
 * - 헤더: back chevron
 * - 타이틀 + 부제 + ProgressBar
 * - 두 카드 (한 라운드 = 1v1) 세로로 스택, 카드 탭하면 그 아이디어에 투표 후 다음 라운드
 * - 하단: "결정을 못하겠어요 (건너뛰기)" 텍스트 링크
 *
 * 모든 라운드 종료 시 /prototype/vote/result 로 이동.
 */

interface Matchup {
  a: Idea;
  b: Idea;
}

function buildPairs(list: Idea[]): Matchup[] {
  const out: Matchup[] = [];
  for (let i = 0; i + 1 < list.length; i += 2) {
    out.push({ a: list[i], b: list[i + 1] });
  }
  return out;
}

export default function Vote() {
  const navigate = useNavigate();
  const matchups = useMemo(() => buildPairs(ideas), []);
  const [idx, setIdx] = useState(0);
  const [wins, setWins] = useState<Record<string, number>>({});

  const total = matchups.length;
  const current = matchups[idx];
  const progress = total === 0 ? 1 : idx / total;

  const advance = (nextWins: Record<string, number>) => {
    if (idx + 1 >= total) {
      sessionStorage.setItem('weave:voteWins', JSON.stringify(nextWins));
      navigate('/prototype/vote/result');
    } else {
      setIdx(idx + 1);
    }
  };

  const pick = (winnerId: string) => {
    const next = { ...wins, [winnerId]: (wins[winnerId] ?? 0) + 1 };
    setWins(next);
    advance(next);
  };

  const skip = () => advance(wins);

  return (
    <div className="min-h-screen bg-paper">
      <main className="max-w-[440px] mx-auto px-5 pt-3 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="뒤로"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="mt-3 text-[22px] font-bold tracking-tight text-slate-900">
          투표 진행
        </h1>
        <p className="mt-2 text-sm text-muted">
          둘 중 더 좋은 아이디어를 골라주세요
        </p>

        <ProgressBar value={progress} className="mt-4" />

        {current && (
          <div className="mt-6 space-y-4">
            <VoteCard idea={current.a} onPick={() => pick(current.a.id)} />
            <VoteCard idea={current.b} onPick={() => pick(current.b.id)} />
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={skip}
            className="text-sm text-muted hover:text-primary-dark transition-colors"
          >
            결정을 못하겠어요 (건너뛰기)
          </button>
        </div>
      </main>
    </div>
  );
}

function VoteCard({ idea, onPick }: { idea: Idea; onPick: () => void }) {
  return (
    <button
      onClick={onPick}
      className="block w-full text-left bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors active:scale-[0.99]"
    >
      <div className="px-3 pt-3">
        <div
          className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-alt flex items-center justify-center text-6xl"
          style={{ background: idea.image ? undefined : idea.gradient }}
        >
          {idea.image ? (
            <img
              src={idea.image}
              alt={idea.title}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            idea.emoji
          )}
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-lg font-bold tracking-tight text-slate-900">
          {idea.title}
        </h2>
        <p className="mt-2 text-sm text-slate-900 leading-7">
          {idea.organized.problem}
        </p>
      </div>
    </button>
  );
}
