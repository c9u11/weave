import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Users, Calendar, Tag } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { WeaveMark } from '../../components/brand/WeaveMark';

/**
 * 초대 링크 합류.
 * - 헤더: back
 * - 브랜드 마크 + 초대자 표시
 * - 팀 정보 카드 (유형 / 마감 / 팀원)
 * - 합류 CTA
 */
export default function Join() {
  const navigate = useNavigate();

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

        <div className="text-center mt-6">
          <WeaveMark className="w-14 h-auto mx-auto text-primary" />
          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border">
            <Avatar initial="배" color="#F87171" size="sm" className="!w-6 !h-6 !text-xs" />
            <span className="text-xs text-muted">
              <strong className="text-slate-900">배병찬</strong>님이 초대했어요
            </span>
          </div>
        </div>

        {/* 팀 정보 카드 */}
        <div className="mt-6 bg-white border border-border rounded-2xl p-5">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            멋사 아이디어톤 - 우리 팀
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <InfoRow icon={<Tag size={16} />} label="유형" value="아이디어톤" />
            <InfoRow
              icon={<Calendar size={16} />}
              label="마감"
              value="D-7 (2026.05.18)"
            />
            <InfoRow icon={<Users size={16} />} label="팀원" value="3/6명" />
          </dl>
        </div>

        <p className="mt-6 text-xs text-muted text-center">
          로그인 후 자동으로 팀에 합류돼요
        </p>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-paper">
        <div className="max-w-[440px] mx-auto px-5 pb-6 pt-3 space-y-3">
          <Button
            variant="kakao"
            fullWidth
            size="lg"
            leftIcon={<MessageCircle size={18} fill="currentColor" />}
            onClick={() => navigate('/prototype/team')}
          >
            카카오로 합류하기
          </Button>
          <Button
            variant="outline"
            fullWidth
            size="lg"
            onClick={() => navigate('/prototype/team')}
          >
            미리보기 (둘러보기)
          </Button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-primary flex-shrink-0">{icon}</span>
      <dt className="text-muted">{label}</dt>
      <dd className="ml-auto text-slate-900 font-semibold">{value}</dd>
    </div>
  );
}
