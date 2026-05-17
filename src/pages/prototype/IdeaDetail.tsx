import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageSquare, Pencil } from 'lucide-react';
import { ideas, type Comment } from '../../prototype/data';
import { Avatar } from '../../components/ui/Avatar';
import { Lightbox } from '../../components/ui/Lightbox';

/**
 * 아이디어 상세 (Figma "아이디어 상세.png" / "아이디어 상세-1.png").
 * - 헤더: back + 우측 "수정" 버튼
 * - 타이틀 + 작성자 행
 * - 가로 스크롤 이미지 갤러리 (클릭 시 라이트박스)
 * - 5 섹션 본문 (설명/기능/타깃/차별성/리스크)
 * - 하단 고정 액션 바: 좋아요 + 댓글 카운트
 * - 댓글 클릭 시 BottomSheet 슬라이드 업
 */
export default function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idea = ideas.find((i) => i.id === id) ?? ideas[0];
  const [sheetOpen, setSheetOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const featureBullets = splitBullets(idea.organized.feature);
  const targetBullets = splitBullets(idea.organized.target);
  const differentiatorBullets = splitBullets(idea.organized.differentiator);
  const riskBullets = splitBullets(idea.organized.risk);

  // 시연용: 단일 이미지를 3번 반복해서 갤러리 느낌
  const galleryImages = idea.image ? [idea.image, idea.image, idea.image] : [];

  return (
    <div className="min-h-screen bg-paper">
      <main className="max-w-[440px] mx-auto px-5 pt-3 pb-28">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
            aria-label="뒤로"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => navigate(`/prototype/idea/${idea.id}/edit`)}
            className="-mr-2 p-2 text-slate-900 hover:text-primary transition-colors inline-flex items-center gap-1 text-sm font-semibold"
            aria-label="수정"
          >
            <Pencil size={16} />
            수정
          </button>
        </div>

        <h1 className="mt-2 text-[22px] font-bold tracking-tight text-slate-900">
          {idea.title}
        </h1>

        <div className="mt-3 flex items-center gap-2">
          <Avatar initial={idea.authorName[0]} color={idea.authorColor} size="sm" />
          <span className="text-sm font-semibold text-slate-900">{idea.authorName}</span>
        </div>

        {/* 가로 스크롤 갤러리 */}
        <div className="mt-5 -mx-5 px-5 overflow-x-auto">
          <div className="flex gap-2 snap-x snap-mandatory pb-2">
            {galleryImages.length > 0 ? (
              galleryImages.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxSrc(src)}
                  className="snap-start shrink-0 w-[280px] aspect-[4/3] rounded-xl border border-border overflow-hidden bg-surface-alt"
                  aria-label="이미지 크게 보기"
                >
                  <img
                    src={src}
                    alt={idea.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))
            ) : (
              <div
                className="snap-start shrink-0 w-[280px] aspect-[4/3] rounded-xl border border-border flex items-center justify-center text-6xl"
                style={{ background: idea.gradient }}
              >
                {idea.emoji}
              </div>
            )}
          </div>
        </div>

        {/* 본문 섹션들 */}
        <Section title="아이디어 설명">
          <p className="text-sm text-slate-900 leading-7">{idea.organized.problem}</p>
        </Section>

        <Section title="핵심 기능">
          <BulletList items={featureBullets} />
        </Section>

        <Section title="타깃">
          <BulletList items={targetBullets} />
        </Section>

        <Section title="차별성">
          <BulletList items={differentiatorBullets} />
        </Section>

        <Section title="리스크">
          <BulletList items={riskBullets} />
        </Section>
      </main>

      {/* 하단 액션 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="max-w-[440px] mx-auto px-5 py-3 flex items-center gap-5">
          <button
            onClick={() => setLiked((v) => !v)}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-primary-dark transition-colors"
            aria-pressed={liked}
          >
            <Heart
              size={20}
              className={liked ? 'fill-danger text-danger' : ''}
            />
            {idea.likes + (liked ? 1 : 0)}
          </button>
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-primary-dark transition-colors"
          >
            <MessageSquare size={20} />
            {idea.comments.length}
          </button>
        </div>
      </div>

      {sheetOpen && (
        <CommentSheet
          comments={idea.comments}
          authorName={idea.authorName}
          onClose={() => setSheetOpen(false)}
        />
      )}

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="text-lg font-bold tracking-tight text-slate-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, idx) => (
        <li key={idx} className="text-sm text-slate-900 leading-7 flex gap-2">
          <span className="text-muted flex-shrink-0">·</span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface CommentSheetProps {
  comments: Comment[];
  authorName: string;
  onClose: () => void;
}
function CommentSheet({ comments, authorName, onClose }: CommentSheetProps) {
  return (
    <div className="fixed inset-0 z-40">
      <button
        aria-label="닫기"
        onClick={onClose}
        className="sheet-backdrop-enter absolute inset-0 bg-slate-900/40"
      />
      <div className="sheet-enter absolute bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-white rounded-t-3xl shadow-lg max-h-[85vh] flex flex-col">
        <div className="pt-3 pb-1 flex justify-center">
          <button
            aria-label="시트 닫기"
            onClick={onClose}
            className="block w-10 h-1 rounded-full bg-border"
          />
        </div>

        <div className="px-5 pt-2 pb-3">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">댓글</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-2 space-y-5">
          {comments.map((c) => {
            const isAuthor = c.authorName === authorName;
            return (
              <div key={c.id} className="flex gap-3">
                <Avatar
                  initial={c.authorName[0]}
                  color={c.authorColor}
                  size="sm"
                  className="!w-9 !h-9 !text-[13px] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-900">
                      {c.authorName}
                    </span>
                    <span className="text-xs text-muted">{c.time}</span>
                    {isAuthor && (
                      <span className="text-xs font-semibold text-primary">작성자</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-900 leading-relaxed">{c.text}</p>
                  <button className="mt-1 text-xs font-semibold text-muted hover:text-primary-dark transition-colors">
                    답글
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border px-5 py-3 flex items-center gap-3 bg-white">
          <Avatar initial="나" color="#3C4883" size="sm" className="!w-9 !h-9 !text-[13px] flex-shrink-0" />
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            className="flex-1 h-11 px-4 rounded-2xl border border-border bg-surface-alt text-sm placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

function splitBullets(text: string): string[] {
  return text
    .split(/\s*\/\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}
