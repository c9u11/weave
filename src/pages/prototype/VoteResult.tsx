import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw, Trophy, EyeOff } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { StageBackLink } from '../../prototype/StageBackLink';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ideas, members, type Idea } from '../../prototype/data';

interface Ranked {
  idea: Idea;
  rank: number;
}

const MEDAL_BG = ['bg-primary', 'bg-primary-light', 'bg-primary-dark/70'];
const MEDAL_LABEL = ['1', '2', '3'];

export default function VoteResult() {
  const navigate = useNavigate();

  /**
   * 득표수는 의도적으로 화면에 노출하지 않는다 — 순위만 보여줘 갈등 완화.
   * (계산은 내부에서만 이뤄지고, 동률이면 별점·아이디어 id 순으로 안정 정렬)
   */
  const ranked = useMemo<Ranked[]>(() => {
    let wins: Record<string, number> = {};
    if (typeof window !== 'undefined') {
      try {
        wins = JSON.parse(sessionStorage.getItem('weave:voteWins') || '{}');
      } catch {}
    }
    const withScore = ideas.map((i) => ({
      idea: i,
      score: (wins[i.id] ?? 0) * 10 + i.rating, // rating 으로 tie-break
    }));
    withScore.sort((a, b) => b.score - a.score);
    return withScore.map((x, idx) => ({ idea: x.idea, rank: idx + 1 }));
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
    <PrototypeLayout>
      <StageBackLink />
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        4단계 — 투표 결과
      </p>
      <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">
        팀의 선택
      </h1>
      <p className="text-[14px] text-muted mt-2 mb-4">
        순위만 공개해요. 누가 무엇에 표를 던졌는지·득표수는 모두 비공개.
      </p>

      <div className="flex items-start gap-2 bg-accent-soft border border-primary-light/40 rounded-md p-3 mb-5">
        <EyeOff size={14} className="text-primary mt-0.5 flex-shrink-0" />
        <p className="text-[12px] text-primary-dark leading-relaxed">
          득표수는 보여주지 않아요. 1·2·3 등만 표시하고, 4위부터는 한 줄로.
        </p>
      </div>

      {/* ===== 1위 — Hero ===== */}
      {winner && (
        <div className="bg-surface border-2 border-primary rounded-lg overflow-hidden mb-4">
          <div
            className="relative h-44 overflow-hidden flex items-center justify-center text-6xl"
            style={{ background: winner.idea.gradient }}
          >
            {winner.idea.image ? (
              <img
                src={winner.idea.image}
                alt={winner.idea.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            ) : (
              winner.idea.emoji
            )}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary text-paper text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">
              <Trophy size={12} />
              1위
            </div>
          </div>
          <div className="p-4">
            <div className="text-[11px] font-bold text-primary">👤 {winner.idea.authorName}</div>
            <h2 className="text-[18px] font-bold text-primary-dark mt-1 tracking-tighter">
              {winner.idea.title}
            </h2>
            <p className="text-[12px] text-primary-dark/80 leading-relaxed mt-2 line-clamp-2">
              {winner.idea.organized.problem}
            </p>
          </div>
        </div>
      )}

      {/* ===== 2·3위 ===== */}
      {ranked.length >= 2 && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {ranked.slice(1, 3).map((r) => (
            <div
              key={r.idea.id}
              className="bg-surface border border-border rounded-lg overflow-hidden flex flex-col"
            >
              <div
                className="relative h-24 overflow-hidden flex items-center justify-center text-3xl"
                style={{ background: r.idea.gradient }}
              >
                {r.idea.image ? (
                  <img
                    src={r.idea.image}
                    alt={r.idea.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                ) : (
                  r.idea.emoji
                )}
                <div
                  className={`absolute top-2 left-2 w-6 h-6 rounded-full ${MEDAL_BG[r.rank - 1]} text-paper text-[11px] font-bold flex items-center justify-center`}
                >
                  {MEDAL_LABEL[r.rank - 1]}
                </div>
              </div>
              <div className="p-2.5 flex-1">
                <div className="text-[10px] font-bold text-primary truncate">
                  👤 {r.idea.authorName}
                </div>
                <div className="text-[12px] font-bold text-primary-dark leading-tight mt-0.5 line-clamp-2">
                  {r.idea.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== 4위 이하 ===== */}
      {ranked.length > 3 && (
        <>
          <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">
            나머지
          </h3>
          <div className="space-y-2 mb-6">
            {ranked.slice(3).map((r) => (
              <div
                key={r.idea.id}
                className="flex items-center gap-3 bg-surface border border-border rounded-md p-2.5"
              >
                <div className="w-7 h-7 rounded-full bg-surface-alt border border-border text-muted text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                  {r.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-primary-dark truncate">
                    {r.idea.title}
                  </div>
                  <div className="text-[10px] text-muted">👤 {r.idea.authorName}</div>
                </div>
                <Badge variant="default" className="!text-[10px]">
                  {r.idea.authorName === '나' ? '내 아이디어' : ''}
                </Badge>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="text-[11px] text-muted text-center mb-5">
        팀원 {members.length + 1}명 모두 투표 완료
      </div>

      <div className="space-y-2">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          rightIcon={<ArrowRight size={16} />}
          onClick={goBrief}
        >
          1위 아이디어로 기획안 만들기
        </Button>
        <Button
          variant="outline"
          fullWidth
          leftIcon={<RotateCcw size={14} />}
          onClick={requestRevote}
        >
          재투표 요청
        </Button>
        <p className="text-[11px] text-muted text-center leading-relaxed mt-1">
          납득되지 않으면 재투표를 요청할 수 있어요. 팀원 전원에게 알림이 가요.
        </p>
      </div>
    </PrototypeLayout>
  );
}
