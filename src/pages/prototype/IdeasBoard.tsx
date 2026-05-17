import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ArrowLeft, Plus, Heart, MessageSquare, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ideas as baseIdeas } from '../../prototype/data';

/**
 * 아이디어 목록 (홈 "더보기" 진입).
 * - 헤더: back + 타이틀 + 추가 버튼
 * - 정렬 칩
 * - 2열 카드 그리드 (이미지 + 타이틀 + 메트릭)
 * - 하단 CTA: 투표로 이동
 */

type SortKey = 'likes' | 'comments' | 'recent';
const SORTS: { key: SortKey; label: string; icon: typeof Heart }[] = [
  { key: 'likes', label: '좋아요 순', icon: Heart },
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
  likes: number;
  commentsCount: number;
}

export default function IdeasBoard() {
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortKey>('likes');

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
    if (sort === 'likes') sorted.sort((a, b) => b.likes - a.likes);
    else if (sort === 'comments') sorted.sort((a, b) => b.commentsCount - a.commentsCount);
    else {
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
    <div className="min-h-screen bg-paper">
      <main className="max-w-[440px] mx-auto px-5 pt-3 pb-32">
        <button
          onClick={() => navigate(-1)}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="뒤로"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="mt-3 flex items-end justify-between">
          <h1 className="text-[22px] font-bold tracking-tight text-slate-900">
            아이디어 목록
            <span className="ml-2 text-sm font-semibold text-muted">
              {allIdeas.length}
            </span>
          </h1>
          <button
            onClick={() => navigate('/prototype/idea/new')}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            <Plus size={16} />
            추가
          </button>
        </div>

        {/* 정렬 칩 */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          {SORTS.map(({ key, label, icon: Icon }) => {
            const active = sort === key;
            return (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors ${
                  active
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border text-muted hover:border-primary/40'
                }`}
              >
                <Icon size={12} />
                {label}
              </button>
            );
          })}
        </div>

        {/* 그리드 */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {allIdeas.map((idea) => {
            const isNew = idea.id.startsWith('new-');
            const detailPath = isNew ? '/prototype/idea/i1' : `/prototype/idea/${idea.id}`;
            return (
              <Link
                key={idea.id}
                to={detailPath}
                className="group bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div
                  className="relative aspect-square bg-surface-alt flex items-center justify-center text-5xl"
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
                  {isNew && (
                    <span className="absolute top-2 left-2 bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-[11px] text-muted">{idea.authorName}</div>
                  <h3 className="text-sm font-bold tracking-tight text-slate-900 mt-0.5 leading-tight line-clamp-2">
                    {idea.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-muted">
                    <span className="inline-flex items-center gap-0.5">
                      <Heart size={11} className="text-primary" />
                      {idea.likes}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      <MessageSquare size={11} />
                      {idea.commentsCount}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* 추가 카드 */}
          <button
            onClick={() => navigate('/prototype/idea/new')}
            className="aspect-square border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted hover:border-primary/40 hover:text-primary-dark transition-colors"
          >
            <Plus size={24} />
            <span className="text-xs font-semibold mt-1.5">아이디어 추가</span>
          </button>
        </div>
      </main>

      {/* 하단 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-paper">
        <div className="max-w-[440px] mx-auto px-5 pb-6 pt-3">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => navigate('/prototype/vote')}
          >
            투표하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
}
