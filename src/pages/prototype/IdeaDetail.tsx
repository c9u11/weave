import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageSquare } from 'lucide-react';
import { ideas, type Comment } from '../../prototype/data';
import { Avatar } from '../../components/ui/Avatar';

/**
 * 아이디어 상세 (Figma "아이디어 상세.png" / "아이디어 상세-1.png").
 * - 헤더: back chevron
 * - 타이틀 + 작성자 행
 * - 이미지 갤러리 (가로 스크롤)
 * - 본문 섹션: 아이디어 설명 / 핵심 기능 / 타깃 / 차별성 / 리스크
 * - 하단 액션 바: 좋아요 + 댓글 카운트
 * - 댓글 클릭 시 BottomSheet 으로 댓글 목록 노출
 */

const HEART_COUNT = 6;

export default function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idea = ideas.find((i) => i.id === id) ?? ideas[0];
  const [sheetOpen, setSheetOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  // organized 필드를 ' / ' 기준으로 bullet 리스트화
  const featureBullets = splitBullets(idea.organized.feature);
  const targetBullets = splitBullets(idea.organized.target);
  const differentiatorBullets = splitBullets(idea.organized.differentiator);
  const riskBullets = splitBullets(idea.organized.risk);

  return (
    <div className="min-h-screen bg-paper">
      <main className="max-w-[440px] mx-auto px-5 pt-3 pb-28">
        <button
          onClick={() => navigate(-1)}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="뒤로"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="mt-3 text-[22px] font-bold tracking-tight text-slate-900">
          {idea.title}
        </h1>

        <div className="mt-3 flex items-center gap-2">
          <Avatar initial={idea.authorName[0]} color={idea.authorColor} size="sm" />
          <span className="text-sm font-semibold text-slate-900">{idea.authorName}</span>
        </div>

        {/* 이미지 갤러리 — 가로 스크롤 */}
        <div className="mt-5 -mx-5 px-5 overflow-x-auto">
          <div className="flex gap-2 snap-x snap-mandatory pb-2">
            {idea.image ? (
              <>
                <GalleryCard src={idea.image} alt={idea.title} />
                <GalleryCard src={idea.image} alt={idea.title} dim />
                <GalleryCard src={idea.image} alt={idea.title} dim />
              </>
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

        <div className="mt-2 text-right">
          <Link
            to={`/prototype/idea/${idea.id}/edit`}
            className="text-xs text-muted hover:text-primary-dark transition-colors"
          >
            더 자세히 보기 →
          </Link>
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
            {HEART_COUNT + (liked ? 1 : 0)}
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
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}
function Section({ title, children }: SectionProps) {
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

function GalleryCard({ src, alt, dim }: { src: string; alt: string; dim?: boolean }) {
  return (
    <div
      className={`snap-start shrink-0 w-[280px] aspect-[4/3] rounded-xl border border-border overflow-hidden bg-surface-alt ${
        dim ? 'opacity-90' : ''
      }`}
    >
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover object-top" />
    </div>
  );
}

/**
 * 댓글 시트 — 배경 dim + 하단에서 올라오는 시트.
 * 시안에는 시트가 화면 ~60% 차지하고 댓글 목록 + 하단 입력.
 */
interface CommentSheetProps {
  comments: Comment[];
  authorName: string;
  onClose: () => void;
}
function CommentSheet({ comments, authorName, onClose }: CommentSheetProps) {
  return (
    <div className="fixed inset-0 z-40">
      {/* dim */}
      <button
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40"
      />

      {/* sheet */}
      <div className="absolute bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-white rounded-t-3xl shadow-lg max-h-[85vh] flex flex-col">
        {/* drag handle */}
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

        {/* 댓글 목록 */}
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

        {/* 댓글 입력 — 자기 아바타 + input */}
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
