import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, Clock } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Stepper } from '../../components/ui/Stepper';
import { team, members, notifications } from '../../prototype/data';

const stageLabels = {
  collect: '아이디어 모집',
  review: 'AI 정리·페르소나',
  feedback: '팀원 피드백',
  mediate: 'AI 충돌 중재',
  brief: '최종 기획안',
};
const stageOrder: (keyof typeof stageLabels)[] = ['collect', 'review', 'feedback', 'mediate', 'brief'];

export default function TeamHome() {
  const navigate = useNavigate();
  const currentIdx = stageOrder.indexOf(team.stage) + 1;
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <PrototypeLayout showBell bellCount={unread}>
      <div className="bg-surface border border-border rounded-lg p-4 mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-bold text-primary tracking-tighter">
            {team.name}
          </h2>
          <p className="text-[11px] text-muted mt-0.5">아이디어톤 · Plus 플랜</p>
        </div>
        <div className="flex items-center gap-1 text-[12px] text-accent font-bold bg-accent-soft/40 px-2 py-1 rounded-md">
          <Clock size={12} />
          D-{team.daysLeft}
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold text-muted uppercase tracking-wider">
            진행 단계
          </span>
          <span className="text-[12px] text-muted">
            {currentIdx} / {stageOrder.length}
          </span>
        </div>
        <Stepper total={stageOrder.length} current={currentIdx} className="mb-2" />
        <p className="text-[13px] text-primary font-semibold">
          {stageLabels[team.stage]}
        </p>
      </div>

      <Link
        to="/prototype/ideas"
        className="block w-full bg-accent-soft p-4 rounded-lg flex items-center justify-between hover:opacity-90 transition-opacity mb-5"
      >
        <span className="text-[14px] font-bold text-primary">
          → 팀의 아이디어 보러 가기
        </span>
        <ArrowRight size={18} className="text-primary" />
      </Link>

      <div className="mb-5">
        <h3 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">
          팀원 ({members.length}/6)
        </h3>
        <div className="space-y-2">
          {members.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 p-3 bg-surface border border-border rounded-md"
            >
              <Avatar initial={m.initial} color={m.color} size="sm" />
              <div className="flex-1">
                <div className="text-[13px] font-bold text-primary">
                  {m.name} {m.isHost && <span className="text-[10px] text-accent ml-1">호스트</span>}
                </div>
                <div className="text-[11px] text-muted">
                  {m.status === 'active' && `${m.ideasCount}개 작성`}
                  {m.status === 'writing' && '작성 중'}
                  {m.status === 'waiting' && '대기'}
                </div>
              </div>
              <span
                className={`w-2 h-2 rounded-full ${
                  m.status === 'active'
                    ? 'bg-success'
                    : m.status === 'writing'
                    ? 'bg-warning'
                    : 'bg-border'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        fullWidth
        leftIcon={<Plus size={16} />}
        onClick={() => navigate('/prototype/idea/new')}
      >
        내 아이디어 작성하기
      </Button>
    </PrototypeLayout>
  );
}
