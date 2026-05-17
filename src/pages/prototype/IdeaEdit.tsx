import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ideas, type Idea } from '../../prototype/data';

/**
 * 아이디어 작성/수정 통합 화면.
 * - URL `/prototype/idea/new` 또는 `/prototype/idea/:id/edit` 둘 다 처리
 * - 5필드만 입력: 문제 정의 / 핵심 기능 / 타깃 / 차별점 / 리스크
 * - 각 textarea 는 autoresize (내부 스크롤 없음)
 * - Chat 에서 기획안 생성 후 진입 시 sessionStorage `weave:draftFromChat` 에서 데이터 미리 채우기
 */

const FIELDS = [
  { key: 'problem' as const, label: '문제 정의', placeholder: '어떤 문제를 해결하나요?' },
  { key: 'feature' as const, label: '핵심 기능', placeholder: '핵심 기능을 한 줄씩 적어보세요' },
  { key: 'target' as const, label: '타깃', placeholder: '누구를 위한 서비스인가요?' },
  { key: 'differentiator' as const, label: '차별점', placeholder: '기존 서비스와 어떻게 다른가요?' },
  { key: 'risk' as const, label: '리스크', placeholder: '예상되는 리스크는 무엇인가요?' },
];

type FieldKey = (typeof FIELDS)[number]['key'];
type FormState = Record<FieldKey, string>;
const EMPTY: FormState = { problem: '', feature: '', target: '', differentiator: '', risk: '' };

export default function IdeaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';
  const idea: Idea | undefined = isNew ? undefined : ideas.find((i) => i.id === id);

  const [title, setTitle] = useState(idea?.title ?? '');
  const [form, setForm] = useState<FormState>(() => {
    if (idea) return { ...idea.organized };
    // 신규 모드: Chat 에서 넘어온 draft 가 있으면 미리 채움
    if (typeof window !== 'undefined') {
      try {
        const draft = sessionStorage.getItem('weave:draftFromChat');
        if (draft) return { ...EMPTY, ...JSON.parse(draft) };
      } catch {}
    }
    return EMPTY;
  });
  const [saved, setSaved] = useState(false);

  // 한 번 사용한 draft 는 정리
  useEffect(() => {
    if (isNew && typeof window !== 'undefined') {
      sessionStorage.removeItem('weave:draftFromChat');
    }
  }, [isNew]);

  const set = (key: FieldKey, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      if (isNew) {
        // 새 아이디어로 sessionStorage 에 추가, 모아보기로 이동
        const id = `new-${Date.now()}`;
        const newIdea = {
          id,
          authorId: 'me',
          authorName: '나',
          authorColor: '#3C4883',
          title: title || form.problem.slice(0, 20) || '새 아이디어',
          emoji: '💡',
          gradient: 'linear-gradient(135deg, #566CCC22, #8694DF44)',
          rawText: '',
          likes: 0,
          commentsCount: 0,
          organized: form,
        };
        try {
          const existing = JSON.parse(sessionStorage.getItem('weave:newIdeas') || '[]');
          sessionStorage.setItem('weave:newIdeas', JSON.stringify([...existing, newIdea]));
        } catch {}
        navigate('/prototype/ideas');
      } else if (idea) {
        navigate(`/prototype/idea/${idea.id}`);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <main className="flex-1 max-w-[440px] w-full mx-auto px-5 pt-3 pb-32">
        <button
          onClick={() => navigate(-1)}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="뒤로"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
          {isNew ? '아이디어 작성' : '아이디어 수정'}
        </h1>
        <p className="mt-2 text-sm text-muted">
          5개 항목으로 정리해보세요. 각 항목은 자유롭게 채우면 돼요.
        </p>

        <form onSubmit={save} className="mt-5 space-y-5">
          {/* 제목 */}
          <div>
            <label className="text-sm font-semibold text-slate-900">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="한 줄로 이 아이디어를 부르면?"
              className="mt-2 w-full h-12 px-4 rounded-2xl border border-border bg-white text-base text-slate-900 placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* 5필드 */}
          {FIELDS.map(({ key, label, placeholder }) => (
            <AutoResizeField
              key={key}
              label={label}
              value={form[key]}
              placeholder={placeholder}
              onChange={(v) => set(key, v)}
            />
          ))}
        </form>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-paper">
        <div className="max-w-[440px] mx-auto px-5 pb-6 pt-3 flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
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
            {saved ? (isNew ? '제출됨!' : '저장됨!') : isNew ? '제출' : '저장'}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface AutoResizeFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}
function AutoResizeField({ label, value, placeholder, onChange }: AutoResizeFieldProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, [value]);

  return (
    <div>
      <label className="text-sm font-semibold text-slate-900">{label}</label>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="mt-2 w-full p-4 rounded-2xl border border-border bg-white text-sm text-slate-900 placeholder:text-muted leading-relaxed focus:outline-none focus:border-primary transition-colors resize-none overflow-hidden min-h-[80px]"
      />
    </div>
  );
}
