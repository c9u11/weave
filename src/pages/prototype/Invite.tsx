import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, MessageCircle, Check, Clock } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

export default function Invite() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const inviteLink = 'https://weave.app/i/AbCd12';

  const copy = () => {
    navigator.clipboard?.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PrototypeLayout>
      <h1 className="text-2xl font-bold tracking-tighter text-primary">팀원을 초대하세요</h1>
      <p className="text-[14px] text-muted mt-2 mb-6">최대 6명까지 함께할 수 있어요</p>

      <div className="space-y-3">
        <div className="flex items-center gap-2 bg-surface border border-border rounded-md px-3 py-2.5">
          <input
            readOnly
            value={inviteLink}
            className="flex-1 bg-transparent text-[13px] text-primary font-mono outline-none"
          />
        </div>
        <Button
          variant="outline"
          fullWidth
          leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
          onClick={copy}
        >
          {copied ? '복사됨!' : '링크 복사'}
        </Button>
        <Button
          variant="kakao"
          fullWidth
          leftIcon={<MessageCircle size={16} />}
        >
          카카오톡으로 초대
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">
          초대된 팀원 (1/6)
        </h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-md">
            <Avatar initial="채" color="#FB923C" size="sm" />
            <div className="flex-1">
              <div className="text-[13px] font-bold text-primary">김채원 (나)</div>
              <div className="text-[11px] text-muted">호스트</div>
            </div>
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-surface border border-dashed border-border rounded-md text-muted"
            >
              <Clock size={20} className="text-muted/50" />
              <span className="text-[13px]">대기 중...</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="primary"
        fullWidth
        size="lg"
        className="mt-8"
        onClick={() => navigate('/prototype/team')}
      >
        팀원 모이면 시작하기 →
      </Button>
    </PrototypeLayout>
  );
}
