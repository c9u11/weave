import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Image as ImageIcon, Sparkles } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';

export default function IdeaNew() {
  const navigate = useNavigate();
  const [text, setText] = useState('');

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
        placeholder='"배달앱이 너무 많아서 뭘 시킬지 모르겠음. 친구들이랑 같이 고르면 좋겠는데 카톡으로 하기 귀찮음..."'
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
        leftIcon={<Sparkles size={16} />}
        className="mt-6"
        onClick={() => navigate('/prototype/ideas')}
      >
        AI 정리하고 제출
      </Button>

      <p className="text-[11px] text-muted text-center mt-3">
        제출 후 모아보기에 카드로 추가돼요 · 팀원이 동시에 작성 가능
      </p>
    </PrototypeLayout>
  );
}
