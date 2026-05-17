import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, EyeOff, RotateCcw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ideas, type Idea } from '../../prototype/data';

/**
 * 투표 결과.
 * - 헤더: back + 타이틀
 * - 비공개 안내 (soft 카드)
 * - 1위 hero 카드 + 2·3위 그리드 + 4위 이하 리스트
 * - 하단 CTA: 1위로 기획안 만들기 / 재투표 요청
 *
 * 득표수는 의도적으로 노출하지 않음 — 순위만 공개.
 */

interface Ranked {
  idea: Idea;
  rank: number;
}

const MEDAL_TONE = ['bg-primary', 'bg-primary-light', 'bg-primary-dark/70'] as const;

export default function VoteResult() {
  const navigate = useNavigate();

  const ranked = useMemo<Ranked[]>(() => {
    let wins: Record<string, number> = {};
    if (typeof window !== 'undefined') {
      try {
        wins = JSON.parse(sessionStorage.getItem('weave:voteWins') || '{}');
      } catch {}
    }
    const scored = ideas.map((i) => ({
      idea: i,
      score: (wins[i.id] ?? 0) * 10 + i.likes,
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.map((x, idx) => ({ idea: x.idea, rank: idx + 1 }));
  }, []);

  const winner = ranked[0];

  const goBrief = () => {
    if (winner) sessionStorage.setItem('weave:winnerIdeaId', winner.idea.id);
    navigate('/prototype/brief');
  };

  const requestRevote = () => {
    sessionStorage.removeItem('weave:voteWins');
    navigate('/prototype/vote');
  };

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
          팀의 선택
        </h1>
        <p className="mt-1 text-sm text-muted">
          순위만 공개해요. 누가 무엇에 표를 던졌는지·득표수는 비공개.
        </p>

        <Card tone="soft" className="mt-4 !p-4 flex items-start gap-3">
          <EyeOff size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-primary-dark leading-relaxed">
            득표수는 보여주지 않아요. 1·2·3 등만 표시하고, 4위부터는 한 줄로.
          </p>
        </Card>

        {/* 1위 hero */}
        {winner && (
          <div className="mt-5 bg-white border-2 border-primary rounded-2xl overflow-hidden">
            <div className="px-3 pt-3">
              <div
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-alt flex items-center justify-center text-6xl"
                style={{ background: winner.idea.image ? undefined : winner.idea.gradient }}
              >
                {winner.idea.image ? (
                  <img
                    src={winner.idea.image}
                    alt={winner.idea.title}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  winner.idea.emoji
                )}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  <Trophy size={12} />
                  1위
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs text-muted">{winner.idea.authorName}</div>
              <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
                {winner.idea.title}
              </h2>
              <p className="mt-2 text-sm text-slate-900 leading-relaxed line-clamp-3">
                {winner.idea.organized.problem}
              </p>
            </div>
          </div>
        )}

        {/* 2·3위 */}
        {ranked.length >= 2 && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {ranked.slice(1, 3).map((r) => (
              <div
                key={r.idea.id}
                className="bg-white border border-border rounded-2xl overflow-hidden"
              >
                <div className="px-2 pt-2">
                  <div
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-alt flex items-center justify-center text-3xl"
                    style={{ background: r.idea.image ? undefined : r.idea.gradient }}
                  >
                    {r.idea.image ? (
                      <img
                        src={r.idea.image}
                        alt={r.idea.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      r.idea.emoji
                    )}
                    <div
                      className={`absolute top-2 left-2 w-6 h-6 rounded-full ${MEDAL_TONE[r.rank - 1]} text-white text-xs font-bold flex items-center justify-center`}
                    >
                      {r.rank}
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-[11px] text-muted">{r.idea.authorName}</div>
                  <div className="text-sm font-bold tracking-tight text-slate-900 mt-0.5 leading-tight line-clamp-2">
                    {r.idea.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4위 이하 */}
        {ranked.length > 3 && (
          <section className="mt-6">
            <h3 className="text-sm font-bold tracking-tight text-slate-900 mb-2">
              나머지
            </h3>
            <div className="space-y-2">
              {ranked.slice(3).map((r) => (
                <div
                  key={r.idea.id}
                  className="flex items-center gap-3 bg-white border border-border rounded-2xl p-3"
                >
                  <div className="w-8 h-8 rounded-full bg-surface-alt text-muted text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {r.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {r.idea.title}
                    </div>
                    <div className="text-xs text-muted">{r.idea.authorName}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 하단 CTA */}
        <div className="mt-8 space-y-3">
          <Button variant="primary" fullWidth size="lg" onClick={goBrief}>
            1위 아이디어로 기획안 만들기
          </Button>
          <Button
            variant="outline"
            fullWidth
            size="lg"
            leftIcon={<RotateCcw size={16} />}
            onClick={requestRevote}
          >
            재투표 요청
          </Button>
          <p className="text-xs text-muted text-center leading-relaxed">
            납득되지 않으면 재투표를 요청할 수 있어요. 팀원 전원에게 알림이 가요.
          </p>
        </div>
      </main>
    </div>
  );
}
