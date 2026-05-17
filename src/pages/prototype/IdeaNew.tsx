import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

/**
 * 새 아이디어 작성.
 * - 헤더: back + 타이틀
 * - 큰 textarea + 보조 액션 (음성/사진)
 * - 하단 고정 CTA: AI 정리하고 제출 → 모아보기 이동
 */

const gradients = [
  'linear-gradient(135deg, #566CCC22, #8694DF44)',
  'linear-gradient(135deg, #8694DF33, #566CCC22)',
  'linear-gradient(135deg, #3C488322, #566CCC33)',
  'linear-gradient(135deg, #8694DF22, #E8EBF7AA)',
  'linear-gradient(135deg, #3C488333, #8694DF44)',
];
const emojis = ['💡', '🚀', '🎯', '⚡', '🔥', '✨', '🌟', '💫'];

export default function IdeaNew() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = () => {
    if (!text.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const newIdea = {
        id: `new-${Date.now()}`,
        authorId: 'me',
        authorName: '나',
        authorColor: '#3C4883',
        title: text.split('\n')[0].slice(0, 24) || '새 아이디어',
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        gradient: gradients[Math.floor(Math.random() * gradients.length)],
        rawText: text,
        rating: 0,
        commentsCount: 0,
      };
      const existing = JSON.parse(sessionStorage.getItem('weave:newIdeas') || '[]');
      sessionStorage.setItem('weave:newIdeas', JSON.stringify([...existing, newIdea]));
      navigate('/prototype/ideas');
    }, 900);
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

        <h1 className="mt-3 text-[22px] font-bold tracking-tight text-slate-900">
          아이디어를 자유롭게 적어보세요
        </h1>
        <p className="mt-2 text-sm text-muted">
          완벽할 필요 없어요. AI가 핵심을 정리해드려요.
        </p>

        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitting}
          placeholder='"팀플 초반에 아이디어가 카톡·메모장·구글 문서에 다 흩어져서 정리가 안 됨. 한 곳에 모으고 AI가 평가·구조화까지 해주면 좋겠음. 두서없어도 괜찮으니 일단 적기..."'
          className="mt-5 w-full p-4 rounded-2xl border border-border bg-white text-sm text-slate-900 placeholder:text-muted leading-relaxed focus:outline-none focus:border-primary transition-colors"
        />

        <div className="mt-3 flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-primary-dark px-3 py-2 rounded-full bg-white border border-border transition-colors">
            <Mic size={14} />
            음성 입력
          </button>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-primary-dark px-3 py-2 rounded-full bg-white border border-border transition-colors">
            <ImageIcon size={14} />
            메모 사진
          </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-paper">
        <div className="max-w-[440px] mx-auto px-5 pb-6 pt-3">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            disabled={!text.trim() || submitting}
            leftIcon={
              submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )
            }
            onClick={submit}
          >
            {submitting ? 'AI가 정리 중...' : 'AI 정리하고 제출'}
          </Button>
          <p className="text-xs text-muted text-center mt-2">
            제출 후 모아보기에 카드로 추가돼요
          </p>
        </div>
      </div>
    </div>
  );
}
