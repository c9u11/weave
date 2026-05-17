import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, Heart, MessageSquare, Vote } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { ideas } from '../../prototype/data';

/**
 * 최종 기획안 확인 (Figma "최종 기획안 확인.png").
 * - 완료 안내 카드 (accent-soft)
 * - 기획안 미리 보기: PDF 썸네일 + 타이틀 / 메타 / 메트릭
 * - 기획안 본문 5섹션 (문제 정의 / 핵심 기능 / 타깃 / 차별점 / 리스크)
 * - 내보내기: Docx / Canva 카드
 *
 * 흐름의 종착 — 다음 단계 없음, 내보내기/뒤로로 빠져나감.
 */

export default function FinalBrief() {
  const navigate = useNavigate();

  // 1위 아이디어가 있으면 그걸, 없으면 i1 기본
  const winner = useMemo(() => {
    if (typeof window !== 'undefined') {
      const id = sessionStorage.getItem('weave:winnerIdeaId');
      if (id) return ideas.find((i) => i.id === id) ?? ideas[0];
    }
    return ideas[0];
  }, []);

  const featureBullets = splitBullets(winner.organized.feature);
  const targetBullets = splitBullets(winner.organized.target);
  const differentiatorBullets = splitBullets(winner.organized.differentiator);
  const riskBullets = splitBullets(winner.organized.risk);

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
          최종 기획안 확인
        </h1>

        {/* 완료 안내 */}
        <div className="mt-5 bg-accent-soft rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Folder size={22} className="text-primary flex-shrink-0 mt-0.5" fill="currentColor" />
            <div>
              <h2 className="text-base font-bold tracking-tight text-slate-900">
                기획안이 완성 되었어요!
              </h2>
              <p className="mt-1 text-xs text-muted leading-relaxed">
                아래 내용을 확인하고 팀과 공유해보세요
              </p>
            </div>
          </div>
        </div>

        {/* 미리 보기 썸네일 */}
        <section className="mt-6">
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            기획안 미리 보기
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <PdfThumb src={winner.image ?? '/ideas/i1.jpg'} />
            <PdfThumb src="/ideas/i2.jpg" />
          </div>

          {/* 메타 */}
          <div className="mt-4">
            <h3 className="text-base font-semibold text-slate-900">
              {winner.title}
            </h3>
            <p className="mt-1 text-xs text-muted">
              하루 전 · 2025-05-15 14:30
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex -space-x-2">
                <Avatar initial="배" color="#F87171" size="sm" className="!w-7 !h-7 !text-xs ring-2 ring-paper" />
                <Avatar initial="희" color="#34D399" size="sm" className="!w-7 !h-7 !text-xs ring-2 ring-paper" />
              </div>
              <div className="flex items-center gap-3 text-xs text-muted ml-auto">
                <span className="inline-flex items-center gap-1">
                  <Heart size={14} /> {winner.likes}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageSquare size={14} /> {winner.commentsCount}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Vote size={14} /> 5
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 기획안 본문 — IdeaDetail 과 같은 구조 */}
        <Section title="아이디어 설명">
          <p className="text-sm text-slate-900 leading-7">{winner.organized.problem}</p>
        </Section>
        <Section title="핵심 기능">
          <BulletList items={featureBullets} />
        </Section>
        <Section title="타깃">
          <BulletList items={targetBullets} />
        </Section>
        <Section title="차별점">
          <BulletList items={differentiatorBullets} />
        </Section>
        <Section title="리스크">
          <BulletList items={riskBullets} />
        </Section>

        {/* 내보내기 */}
        <section className="mt-8">
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            내보내기
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <ExportCard
              icon={<img src="/doc.png" alt="" className="w-7 h-7" />}
              label="Docx"
              onClick={() => {/* mock */}}
            />
            <ExportCard
              icon={<img src="/canva.png" alt="" className="w-7 h-7" />}
              label="Canva"
              onClick={() => {/* mock */}}
            />
          </div>
        </section>
      </main>
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

function PdfThumb({ src }: { src: string }) {
  return (
    <div className="aspect-[3/4] rounded-xl overflow-hidden border border-border bg-surface-alt">
      <img src={src} alt="기획안 미리보기" loading="lazy" className="w-full h-full object-cover object-top" />
    </div>
  );
}

interface ExportCardProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}
function ExportCard({ icon, label, onClick }: ExportCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white border border-border hover:border-primary/40 transition-colors text-left"
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="text-sm font-semibold text-slate-900">{label}</span>
    </button>
  );
}

function splitBullets(text: string): string[] {
  return text.split(/\s*\/\s*/).map((s) => s.trim()).filter(Boolean);
}
