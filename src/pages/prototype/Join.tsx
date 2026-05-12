import { useNavigate } from 'react-router-dom';
import { MessageCircle, Users, Calendar, Tag } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

export default function Join() {
  const navigate = useNavigate();
  return (
    <PrototypeLayout>
      <div className="text-center py-6">
        <img
          src="/logo.svg"
          alt="Weave"
          className="w-14 h-14 mx-auto mb-5 [&_path]:fill-primary"
        />
        <div className="flex items-center justify-center gap-2 mb-2">
          <Avatar initial="병" color="#F87171" size="sm" />
          <span className="text-[14px] text-muted">
            <strong className="text-primary">병찬</strong>님이 초대했어요
          </span>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-5 mb-5">
        <h2 className="text-[18px] font-bold text-primary tracking-tighter mb-3">
          멋사 아이디어톤 - 우리 팀
        </h2>
        <div className="space-y-2 text-[13px]">
          <div className="flex items-center gap-2 text-muted">
            <Tag size={14} />
            <span>유형:</span>
            <strong className="text-primary">아이디어톤</strong>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <Calendar size={14} />
            <span>마감:</span>
            <strong className="text-primary">D-7 (2026.05.18)</strong>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <Users size={14} />
            <span>팀원:</span>
            <strong className="text-primary">3/6명</strong>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="kakao"
          fullWidth
          size="lg"
          leftIcon={<MessageCircle size={18} />}
          onClick={() => navigate('/prototype/team')}
        >
          카카오로 합류하기
        </Button>
        <Button variant="outline" fullWidth size="lg">
          미리보기 (둘러보기)
        </Button>
      </div>

      <p className="mt-6 text-[12px] text-muted text-center">
        로그인 후 자동으로 팀에 합류돼요
      </p>
    </PrototypeLayout>
  );
}
