import { useState, type FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, Wand2, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ideas, type Idea } from '../../prototype/data';

/**
 * 아이디어 수정.
 * - 헤더: back
 * - 원문 textarea
 * - AI 재정리 soft 카드 + 버튼
 * - 정리 항목 textarea 5개 (문제/기능/타깃/차별점/리스크)
 * - 하단 고정: 취소 + 저장
 */

const FIELDS = [
  { key: 'problem' as const, label: '문제 정의' },
  { key: 'feature' as const, label: '핵심 기능' },
  { key: 'target' as const, label: '타깃' },
  { key: 'differentiator' as const, label: '차별점' },
  { key: 'risk' as const, label: '리스크' },
];

export default function IdeaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idea = ideas.find((i) => i.id === id);
  const [rawText, setRawText] = useState(idea?.rawText ?? '');
  const [organized, setOrganized] = useState<Idea['organized']>(
    idea?.organized ?? { problem: '', feature: '', target: '', differentiator: '', risk: '' },
  );
  const [aiState, setAiState] = useState<'idle' | 'running' | 'done'>('idle');
  const [saved, setSaved] = useState(false);

  if (!idea) {
    return (
      <div className="min-h-screen bg-paper">
        <main className="max-w-[440px] mx-auto px-5 pt-3">
          <button
            onClick={() => navigate(-1)}
            className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
            aria-label="뒤로"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="mt-3 text-[22px] font-bold tracking-tight text-slate-900">
            아이디어를 찾을 수 없어요
          </h1>
          <Link to="/prototype/ideas" className="mt-3 inline-block text-sm text-primary">
            ← 모아보기로
          </Link>
        </main>
      </div>
    );
  }

  const runAIReorganize = () => {
    setAiState('running');
    setTimeout(() => {
      setOrganized((o) => ({
        ...o,
        problem: o.problem + (o.problem ? ' ' : '') + '(AI 보강)',
        feature: o.feature + (o.feature ? ' ' : '') + '(AI 보강)',
      }));
      setAiState('done');
      setTimeout(() => setAiState('idle'), 1800);
    }, 1200);
  };

  const save = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => navigate(`/prototype/idea/${idea.id}`), 900);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <main className="flex-1 max-w-[440px] w-full mx-auto px-5 pt-3 pb-32">
        <button
          onClick={() => navigate(`/prototype/idea/${idea.id}`)}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="상세로"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="mt-3 text-[22px] font-bold tracking-tight text-slate-900">
          아이디어 수정
        </h1>
        <p className="mt-2 text-sm text-muted">
          AI가 정리한 항목까지 자유롭게 다듬을 수 있어요.
        </p>

        <form onSubmit={save} className="mt-5 space-y-5">
          {/* 원문 */}
          <div>
            <label className="text-sm font-semibold text-slate-900">원문</label>
            <textarea
              rows={6}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="mt-2 w-full p-4 rounded-2xl border border-border bg-white text-sm text-slate-900 placeholder:text-muted leading-relaxed focus:outline-none focus:border-primary transition-colors"
              placeholder="두서 없어도 괜찮아요. 떠오르는 대로 적어주세요."
            />
          </div>

          {/* AI 재정리 */}
          <Card tone="soft" className="!p-4 flex items-center gap-3">
            <Sparkles size={18} className="text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900">AI 재정리</div>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                원문을 다시 분석해 문제·기능·차별점을 재구성해요.
              </p>
            </div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              disabled={aiState === 'running'}
              leftIcon={
                aiState === 'running' ? (
                  <Wand2 size={14} className="animate-pulse" />
                ) : aiState === 'done' ? (
                  <Check size={14} />
                ) : (
                  <Wand2 size={14} />
                )
              }
              onClick={runAIReorganize}
              className="!rounded-full"
            >
              {aiState === 'running' ? '정리 중...' : aiState === 'done' ? '완료!' : '재정리'}
            </Button>
          </Card>

          {/* AI 정리 항목 */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-tight text-slate-900">
              AI 정리
            </h3>
            {FIELDS.map(({ key, label }) => (
              <div key={key}>
                <label className="text-sm font-semibold text-slate-900">{label}</label>
                <textarea
                  rows={2}
                  value={organized[key]}
                  onChange={(e) => setOrganized((o) => ({ ...o, [key]: e.target.value }))}
                  className="mt-2 w-full p-4 rounded-2xl border border-border bg-white text-sm text-slate-900 leading-relaxed focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
          </div>
        </form>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-paper">
        <div className="max-w-[440px] mx-auto px-5 pb-6 pt-3 flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => navigate(`/prototype/idea/${idea.id}`)}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="flex-[2]"
            leftIcon={saved ? <Check size={18} /> : <Save size={18} />}
            disabled={saved}
            onClick={(e) => save(e as unknown as FormEvent)}
          >
            {saved ? '저장됨!' : '저장'}
          </Button>
        </div>
      </div>
    </div>
  );
}
