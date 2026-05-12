import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';

const gradients = [
  'linear-gradient(135deg, #FCD34D55, #FB923C55)',
  'linear-gradient(135deg, #34D39955, #FCD34D55)',
  'linear-gradient(135deg, #A78BFA55, #B4530955)',
  'linear-gradient(135deg, #FB923C55, #A78BFA55)',
  'linear-gradient(135deg, #F8717155, #FB923C55)',
];

const emojis = ['💡', '🚀', '🎯', '⚡', '🔥', '✨', '🌟', '💫'];

export default function IdeaNew() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = () => {
    if (!text.trim()) return;
    setSubmitting(true);

    // Mock AI organize delay
    setTimeout(() => {
      const newIdea = {
        id: `new-${Date.now()}`,
        authorId: 'me',
        authorName: '나',
        authorColor: '#1E1B4B',
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
    <PrototypeLayout>
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        1단계 — 내 아이디어
      </p>
      <h1 className="text-2xl font-bold tracking-tighter text-primary">
        두서없이 편하게 적어보세요
      </h1>
      <p className="text-[14px] text-muted mt-2 mb-5">
        완벽할 필요 없어요. AI가 정리해줄 거예요.
      </p>

      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={submitting}
        placeholder='"팀플 초반에 아이디어가 카톡·메모장·구글 문서에 다 흩어져서 정리가 안 됨. 한 곳에 모으고 AI가 평가·구조화까지 해주면 좋겠음. 두서없어도 괜찮으니 일단 적기..."'
        className="input"
      />

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button variant="ghost" size="sm" leftIcon={<Mic size={14} />}>
          음성 입력
        </Button>
        <Button variant="ghost" size="sm" leftIcon={<ImageIcon size={14} />}>
          메모 사진
        </Button>
      </div>

      <Button
        variant="primary"
        fullWidth
        size="lg"
        disabled={!text.trim() || submitting}
        leftIcon={submitting ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
        className="mt-6"
        onClick={submit}
      >
        {submitting ? 'AI가 정리 중...' : 'AI 정리하고 제출'}
      </Button>

      <p className="text-[11px] text-muted text-center mt-3">
        제출 후 모아보기에 카드로 추가돼요 · 팀원이 동시에 작성 가능
      </p>
    </PrototypeLayout>
  );
}
