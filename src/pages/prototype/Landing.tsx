import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <PrototypeLayout>
      <div className="text-center py-12">
        <img
          src="/logo.svg"
          alt="Weave"
          className="w-16 h-16 mx-auto mb-6 [&_path]:fill-primary"
        />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-primary leading-tight">
          AI로 시작에 헤매는
          <br />
          시간을 없앤다면?
        </h1>
        <p className="mt-5 text-[15px] text-muted leading-relaxed">
          두서없는 아이디어를 팀 합의된 1페이지 기획안으로.
          <br />
          0→1만 책임지고, 그 다음은 익숙한 도구로.
        </p>

        <div className="mt-10 space-y-3">
          <Button
            variant="kakao"
            fullWidth
            size="lg"
            leftIcon={<MessageCircle size={18} />}
            onClick={() => navigate('/prototype/onboarding')}
          >
            카카오로 시작하기
          </Button>
          <Button
            variant="outline"
            fullWidth
            size="lg"
            onClick={() => navigate('/prototype/join')}
          >
            팀에서 초대받았어요
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-3 text-center">
          {[
            { num: '1', label: '두서없이 입력' },
            { num: '2', label: 'AI가 정리' },
            { num: '3', label: '익숙한 도구로 Export' },
          ].map((s) => (
            <div key={s.num} className="rounded-lg border border-border bg-surface p-4">
              <div className="w-7 h-7 rounded-full bg-accent-soft/50 text-accent text-[12px] font-bold flex items-center justify-center mx-auto">
                {s.num}
              </div>
              <p className="text-[11px] text-muted mt-2 leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs text-muted/70">
          <Link to="/prototype" className="hover:text-primary">
            ← 프로토타입 메뉴로
          </Link>
        </p>
      </div>
    </PrototypeLayout>
  );
}
