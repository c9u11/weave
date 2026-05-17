import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, FileText, Heart, MessageSquare, Vote } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';

/**
 * 최종 기획안 확인 (Figma "최종 기획안 확인.png").
 * - 상단 정보 카드 (accent-soft): "기획안이 완성 되었어요!" + 안내
 * - 기획안 미리 보기: 2 PDF 썸네일 + 타이틀 / 메타 / 메트릭 칩 3개
 * - 내보내기: 2개 데스티네이션 카드 (Docx / Connect to Canva)
 *
 * 흐름의 종착 화면이라 다음 단계는 없고, 뒤로 / 내보내기로 빠져나간다.
 */
export default function FinalBrief() {
  const navigate = useNavigate();

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

        {/* 완료 안내 카드 */}
        <div className="mt-5 bg-accent-soft rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Folder size={22} className="text-primary flex-shrink-0 mt-0.5" fill="currentColor" />
            <div>
              <h2 className="text-base font-bold tracking-tight text-slate-900">
                기획안이 완성 되었어요!
              </h2>
              <p className="mt-1 text-xs text-muted leading-relaxed">
                아래 내용을 확인하고 AI에게 팀과 공유해보세요
              </p>
            </div>
          </div>
        </div>

        {/* 기획안 미리 보기 */}
        <section className="mt-6">
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            기획안 미리 보기
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <PdfThumb src="/ideas/i1.jpg" />
            <PdfThumb src="/ideas/i2.jpg" />
          </div>

          <div className="mt-4">
            <h3 className="text-base font-semibold text-slate-900">
              AI 아이디어 정리 서비스
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
                  <Heart size={14} /> 6
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageSquare size={14} /> 6
                </span>
                <span className="inline-flex items-center gap-1">
                  <Vote size={14} /> 5
                </span>
              </div>
            </div>
          </div>

          {/* 핵심 내용 */}
          <div className="mt-5 bg-accent-soft rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-900">핵심 내용</h3>
            <p className="mt-2 text-xs text-slate-900 leading-relaxed">
              회의 중 흩어진 아이디어들을 AI가 자동으로 정리하고 핵심을 빠르게 구조화해주는 서비스입니다.
              팀원 피드백·투표와 PDF 자동 형식 기획안 출력으로 완성도를 높일 수 있어요.
            </p>
          </div>
        </section>

        {/* 내보내기 */}
        <section className="mt-7">
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            내보내기
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <ExportCard
              icon={<FileText size={28} className="text-primary" />}
              label="Docx"
              tone="default"
              onClick={() => {/* mock */}}
            />
            <ExportCard
              icon={<CanvaGlyph />}
              label="Connect to Canva"
              tone="canva"
              onClick={() => {/* mock */}}
            />
          </div>
        </section>
      </main>
    </div>
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
  tone: 'default' | 'canva';
  onClick: () => void;
}
function ExportCard({ icon, label, tone, onClick }: ExportCardProps) {
  const isCanva = tone === 'canva';
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-4 rounded-2xl border transition-colors text-left ${
        isCanva
          ? 'bg-gradient-to-r from-[#7B61FF] to-[#00C4CC] text-white border-transparent hover:opacity-90'
          : 'bg-white border-border text-slate-900 hover:border-primary/40'
      }`}
    >
      <span className={isCanva ? 'text-white' : ''}>{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}

function CanvaGlyph() {
  // Canva 의 단순화한 원형 글리프
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M9 12c0-2 1.5-3.5 3.5-3.5 1.4 0 2.5.8 2.9 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
