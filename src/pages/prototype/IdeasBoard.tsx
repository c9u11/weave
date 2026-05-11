import { Link, useNavigate } from 'react-router-dom';
import { Plus, Star, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { ideas, notifications } from '../../prototype/data';

export default function IdeasBoard() {
  const navigate = useNavigate();
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <PrototypeLayout showBell bellCount={unread} phoneWidth={false}>
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        2단계 — 모아보기
      </p>
      <div className="flex items-end justify-between mb-5">
        <h1 className="text-2xl font-bold tracking-tighter text-primary">
          팀의 아이디어 ({ideas.length})
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
        {ideas.map((idea) => (
          <Link
            key={idea.id}
            to={`/prototype/idea/${idea.id}`}
            className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:shadow-md transition-all flex flex-col"
          >
            <div
              className="relative h-32 flex items-center justify-center text-5xl"
              style={{ background: idea.gradient }}
            >
              {idea.emoji}
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary/70 text-paper text-[10px] font-bold px-2 py-1 rounded-full">
                <Sparkles size={10} />
                AI 생성
              </div>
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
        ))}
        <button
          onClick={() => navigate('/prototype/idea/new')}
          className="group border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted hover:border-primary/40 hover:text-primary transition-all py-10"
        >
          <Plus size={24} />
          <span className="text-[12px] font-bold mt-2">내 아이디어 추가</span>
        </button>
      </div>

      <Button
        variant="primary"
        fullWidth
        size="lg"
        rightIcon={<ArrowRight size={16} />}
        className="mt-8 max-w-md mx-auto"
        onClick={() => navigate('/prototype/mediate')}
      >
        다음 단계 — 충돌 중재
      </Button>
    </PrototypeLayout>
  );
}
