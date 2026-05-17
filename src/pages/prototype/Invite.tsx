import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, MessageCircle, Check, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

/**
 * 팀원 초대.
 * - 헤더: back + 타이틀
 * - 초대 링크 카드 + 복사 / 카톡 공유 액션
 * - 초대된 팀원 리스트
 * - 하단 고정 CTA: 팀 홈 진입
 */
export default function Invite() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const inviteLink = 'https://weave.app/i/AbCd12';

  const copy = () => {
    navigator.clipboard?.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          팀원을 초대하세요
        </h1>
        <p className="mt-2 text-sm text-muted">
          최대 6명까지 함께할 수 있어요
        </p>

        {/* 초대 링크 */}
        <div className="mt-5 flex items-center gap-2 bg-white border border-border rounded-2xl px-4 h-14">
          <input
            readOnly
            value={inviteLink}
            className="flex-1 bg-transparent text-sm text-slate-900 font-mono outline-none"
          />
        </div>

        <div className="mt-3 space-y-3">
          <Button
            variant="outline"
            fullWidth
            size="lg"
            leftIcon={copied ? <Check size={18} /> : <Copy size={18} />}
            onClick={copy}
          >
            {copied ? '복사됨!' : '링크 복사'}
          </Button>
          <Button
            variant="kakao"
            fullWidth
            size="lg"
            leftIcon={<MessageCircle size={18} fill="currentColor" />}
          >
            카카오톡으로 초대
          </Button>
        </div>

        {/* 초대된 팀원 */}
        <section className="mt-8">
          <h2 className="text-sm font-bold tracking-tight text-slate-900 mb-3">
            초대된 팀원 (1/6)
          </h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-4 bg-white border border-border rounded-2xl">
              <Avatar initial="배" color="#F87171" size="sm" className="!w-9 !h-9 !text-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">배병찬 (나)</div>
                <div className="text-xs text-muted">호스트</div>
              </div>
            </div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white border border-dashed border-border rounded-2xl text-muted"
              >
                <Clock size={20} className="text-muted/60" />
                <span className="text-sm">대기 중...</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-paper">
        <div className="max-w-[440px] mx-auto px-5 pb-6 pt-3">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => navigate('/prototype/team')}
          >
            팀원 모이면 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
