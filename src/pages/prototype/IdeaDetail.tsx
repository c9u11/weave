import { useState, useMemo } from 'react';
import type { KeyboardEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles, RotateCw, ArrowLeft, MessageSquare, Bot, Star, ThumbsUp, ArrowRight, AtSign, Send } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { ideas, currentUser, type Comment } from '../../prototype/data';

const organizeKeys = [
  { key: 'problem' as const, label: '문제 정의' },
  { key: 'feature' as const, label: '핵심 기능' },
  { key: 'target' as const, label: '타깃' },
  { key: 'differentiator' as const, label: '차별점' },
  { key: 'risk' as const, label: '리스크' },
];

export default function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idea = ideas.find((i) => i.id === id);
  const [tab, setTab] = useState<'persona' | 'comments'>('persona');
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>(idea?.comments ?? []);
  const [draft, setDraft] = useState('');

  const commentsByTarget = useMemo(
    () =>
      comments.reduce<Record<string, Comment[]>>((acc, c) => {
        const key = c.target || '_general';
        if (!acc[key]) acc[key] = [];
        acc[key].push(c);
        return acc;
      }, {}),
    [comments]
  );

  if (!idea) {
    return (
      <PrototypeLayout title="아이디어를 찾을 수 없어요">
        <Link to="/prototype/ideas" className="text-accent">
          ← 모아보기로
        </Link>
      </PrototypeLayout>
    );
  }

  const submitComment = () => {
    const text = draft.trim();
    if (!text) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorColor: currentUser.color,
      target: activeTarget || undefined,
      text,
      time: '방금',
    };
    setComments((prev) => [newComment, ...prev]);
    setDraft('');
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitComment();
    }
  };

  return (
    <PrototypeLayout wide showBell bellCount={3}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] text-muted mb-4">
        <Link to="/prototype/ideas" className="flex items-center gap-1 hover:text-primary">
          <ArrowLeft size={14} /> 모아보기
        </Link>
        <span>·</span>
        <Avatar initial={idea.authorName[0]} color={idea.authorColor} size="sm" className="!w-5 !h-5 !text-[10px]" />
        <span className="text-primary font-semibold">{idea.authorName}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ============= MAIN ============= */}
        <div className="lg:col-span-2 space-y-5">
          {/* Hero image */}
          <div
            className="relative h-56 sm:h-64 rounded-lg flex items-center justify-center text-7xl overflow-hidden"
            style={{ background: idea.gradient }}
          >
            {idea.emoji}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button className="flex items-center gap-1 bg-primary/85 text-paper text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-primary transition-colors">
                <Sparkles size={12} /> AI 생성
              </button>
              <button className="flex items-center gap-1 bg-primary/85 text-paper text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-primary transition-colors">
                <RotateCw size={12} /> 다시
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-bold tracking-tighter text-primary">
            {idea.title}
          </h1>

          {/* Raw text */}
          <div>
            <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">
              📝 원문
            </h3>
            <div className="text-[14px] text-muted leading-relaxed bg-surface border border-border rounded-md p-4 italic">
              "{idea.rawText}"
            </div>
          </div>

          {/* AI organized */}
          <div>
            <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Bot size={12} /> AI 정리 — 항목을 클릭하면 댓글 달기
            </h3>
            <div className="space-y-2">
              {organizeKeys.map(({ key, label }) => {
                const value = idea.organized[key];
                const targetComments = commentsByTarget[label] || [];
                const hasComments = targetComments.length > 0;
                const isActive = activeTarget === label;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setTab('comments');
                      setActiveTarget(isActive ? null : label);
                    }}
                    className={`w-full text-left p-3 rounded-md border transition-all relative ${
                      hasComments
                        ? 'bg-accent-soft/30 border-accent-soft/60 hover:bg-accent-soft/40'
                        : 'bg-surface border-border hover:border-primary/30'
                    } ${isActive ? 'ring-2 ring-accent ring-offset-2 ring-offset-paper' : ''}`}
                  >
                    <div className="text-[12px] font-bold text-primary mb-0.5">{label}</div>
                    <div className="text-[13px] text-muted leading-relaxed">{value}</div>
                    {hasComments && (
                      <div className="absolute -top-2 -right-2 bg-primary text-paper text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <MessageSquare size={9} />
                        {targetComments.length}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Button variant="outline" size="sm" leftIcon={<ThumbsUp size={14} />}>
              동의 (3)
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Star size={14} />}>
              평가하기
            </Button>
            <div className="flex items-center gap-1 text-[12px] text-muted ml-auto">
              <Star size={12} className="text-accent fill-accent-soft" />
              <strong className="text-primary">{idea.rating}</strong>
            </div>
          </div>
        </div>

        {/* ============= SIDEBAR ============= */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 bg-surface border border-border rounded-lg overflow-hidden">
            <div className="flex border-b border-border">
              <button
                onClick={() => setTab('persona')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[12px] font-bold transition-colors ${
                  tab === 'persona'
                    ? 'bg-primary text-paper'
                    : 'text-muted hover:text-primary'
                }`}
              >
                <Bot size={14} /> 페르소나 (4)
              </button>
              <button
                onClick={() => setTab('comments')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[12px] font-bold transition-colors ${
                  tab === 'comments'
                    ? 'bg-primary text-paper'
                    : 'text-muted hover:text-primary'
                }`}
              >
                <MessageSquare size={14} /> 댓글 ({comments.length})
              </button>
            </div>

            <div className="p-3 max-h-[600px] overflow-y-auto">
              {tab === 'persona' &&
                idea.personas.map((p) => (
                  <div key={p.key} className="mb-3 last:mb-0 bg-paper border border-border rounded-md p-3">
                    <div className="flex items-start gap-2.5">
                      <Avatar initial={p.initial} color={p.color} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-bold text-primary">
                          {p.name}
                        </div>
                        <div className="text-[12px] text-muted italic mt-1 leading-relaxed">
                          "{p.quote}"
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {tab === 'comments' && (
                <>
                  {comments.length === 0 ? (
                    <p className="text-center text-[12px] text-muted py-8">
                      아직 댓글이 없어요. 첫 댓글을 달아보세요.
                    </p>
                  ) : (
                    comments.map((c) => (
                      <div
                        key={c.id}
                        className={`mb-3 last:mb-0 bg-paper border rounded-md p-3 transition-all ${
                          activeTarget && c.target === activeTarget
                            ? 'border-accent shadow-sm'
                            : 'border-border'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <Avatar initial={c.authorName[0]} color={c.authorColor} size="sm" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[12px] font-bold text-primary">
                                {c.authorName}
                              </span>
                              {c.target && (
                                <Badge variant="soft" className="!text-[10px]">
                                  <AtSign size={9} />
                                  {c.target}
                                </Badge>
                              )}
                            </div>
                            <p className="text-[12px] text-muted leading-relaxed mt-1.5">
                              {c.text}
                            </p>
                            <p className="text-[10px] text-muted/60 mt-1.5">
                              {c.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  <div className="mt-4 pt-3 border-t border-border space-y-2">
                    {activeTarget && (
                      <div className="flex items-center gap-1.5 text-[11px] text-accent font-bold">
                        <AtSign size={10} />
                        "{activeTarget}"에 댓글 달기
                        <button
                          onClick={() => setActiveTarget(null)}
                          className="ml-auto text-muted hover:text-primary"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={onKey}
                        placeholder={activeTarget ? `"${activeTarget}" 에 의견을...` : '댓글 추가... (Enter)'}
                        className="input !py-2 !text-[12px] flex-1"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={submitComment}
                        disabled={!draft.trim()}
                        className="!px-3"
                      >
                        <Send size={13} />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md sm:max-w-none mx-auto">
        <Button
          variant="outline"
          fullWidth
          leftIcon={<ArrowLeft size={14} />}
          onClick={() => navigate('/prototype/ideas')}
        >
          모아보기
        </Button>
        <Button
          variant="primary"
          fullWidth
          rightIcon={<ArrowRight size={14} />}
          onClick={() => navigate('/prototype/mediate')}
        >
          AI 충돌 중재로
        </Button>
      </div>
    </PrototypeLayout>
  );
}
