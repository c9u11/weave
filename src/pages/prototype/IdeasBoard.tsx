import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Plus, Star, MessageSquare, Sparkles, ArrowRight, ArrowUpDown, Clock } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { StageBackLink } from '../../prototype/StageBackLink';
import { Button } from '../../components/ui/Button';
import { ideas as baseIdeas, notifications } from '../../prototype/data';

type SortKey = 'rating' | 'comments' | 'recent';
const sortOptions: { key: SortKey; label: string; icon: typeof Star }[] = [
  { key: 'rating', label: '별점순', icon: Star },
  { key: 'comments', label: '댓글 많은', icon: MessageSquare },
  { key: 'recent', label: '최신순', icon: Clock },
];

interface DraftIdea {
  id: string;
  authorId: string;
  authorName: string;
  authorColor: string;
  title: string;
  emoji: string;
  gradient: string;
  image?: string;
  rawText: string;
  rating: number;
  commentsCount: number;
}

export default function IdeasBoard() {
  const navigate = useNavigate();
  const unread = notifications.filter((n) => n.unread).length;
  const [sort, setSort] = useState<SortKey>('rating');

  const newIdeas = useMemo<DraftIdea[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(sessionStorage.getItem('weave:newIdeas') || '[]');
    } catch {
      return [];
    }
  }, []);

  const allIdeas = useMemo(() => {
    const merged = [...baseIdeas, ...newIdeas];
    const sorted = [...merged];
    if (sort === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'comments') {
      sorted.sort((a, b) => b.commentsCount - a.commentsCount);
    } else if (sort === 'recent') {
      // 새로 작성한 게 가장 위, 그 다음 기본 목록은 역순(i8 → i1) 으로 "최근"
      sorted.sort((a, b) => {
        const aNew = a.id.startsWith('new-') ? 1 : 0;
        const bNew = b.id.startsWith('new-') ? 1 : 0;
        if (aNew !== bNew) return bNew - aNew;
        return b.id.localeCompare(a.id);
      });
    }
    return sorted;
  }, [newIdeas, sort]);

  return (
    <PrototypeLayout showBell bellCount={unread} phoneWidth={false}>
      <StageBackLink />
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        2단계 — 모아보기
      </p>
      <div className="flex items-end justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">
          팀의 아이디어 ({allIdeas.length})
        </h1>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Plus size={14} />}
          onClick={() => navigate('/prototype/idea/new')}
        >
          추가
        </Button>
      </div>

      {/* ====== 정렬 ====== */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
        <span className="text-[11px] text-muted flex items-center gap-1 flex-shrink-0 mr-1">
          <ArrowUpDown size={11} /> 정렬
        </span>
        {sortOptions.map(({ key, label, icon: Icon }) => {
          const active = sort === key;
          return (
            <button
              key={key}
              onClick={() => setSort(key)}
              className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-full border transition-colors flex-shrink-0 ${
                active
                  ? 'bg-primary text-paper border-primary'
                  : 'bg-surface text-muted border-border hover:border-primary/40'
              }`}
            >
              <Icon size={11} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {allIdeas.map((idea) => {
          const isNew = idea.id.startsWith('new-');
          // 새로 추가된 아이디어는 detail 페이지를 만들지 않았으므로 i1으로 fallback
          const detailPath = isNew ? '/prototype/idea/i1' : `/prototype/idea/${idea.id}`;
          return (
            <Link
              key={idea.id}
              to={detailPath}
              className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:shadow-md transition-all flex flex-col"
            >
              <div
                className="relative h-32 flex items-center justify-center text-5xl overflow-hidden"
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
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary/70 text-paper text-[10px] font-bold px-2 py-1 rounded-full">
                  <Sparkles size={10} />
                  AI 생성
                </div>
                {isNew && (
                  <div className="absolute top-2 left-2 bg-success text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
              </div>
              <div className="p-3 flex flex-col flex-1">
                <div className="text-[10px] font-bold text-accent">
                  👤 {idea.authorName}
                </div>
                <h3 className="text-[14px] font-bold text-primary mt-0.5 leading-tight">
                  {idea.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-muted">
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-accent" />
                    {idea.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={11} />
                    {idea.commentsCount}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
        <button
          onClick={() => navigate('/prototype/idea/new')}
          className="group border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted hover:border-primary/40 hover:text-primary transition-all py-10"
        >
          <Plus size={24} />
          <span className="text-[12px] font-bold mt-2">내 아이디어 추가</span>
        </button>
      </div>

      <div className="mt-8 max-w-md mx-auto space-y-2">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          rightIcon={<ArrowRight size={16} />}
          onClick={() => navigate('/prototype/vote')}
        >
          다음 단계 — 투표하기
        </Button>
        <p className="text-[11px] text-muted text-center">
          모든 아이디어에 피드백·평가 완료 시 투표로 진행
        </p>
      </div>
    </PrototypeLayout>
  );
}
