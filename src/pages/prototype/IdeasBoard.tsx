import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Plus, Star, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { ideas as baseIdeas, notifications } from '../../prototype/data';

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

  const newIdeas = useMemo<DraftIdea[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(sessionStorage.getItem('weave:newIdeas') || '[]');
    } catch {
      return [];
    }
  }, []);

  const allIdeas = [...baseIdeas, ...newIdeas];

  return (
    <PrototypeLayout showBell bellCount={unread} phoneWidth={false}>
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        2단계 — 모아보기
      </p>
      <div className="flex items-end justify-between mb-5">
        <h1 className="text-2xl font-bold tracking-tighter text-primary">
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
