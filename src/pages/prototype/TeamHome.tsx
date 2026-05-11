import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Plus, Clock, Check, CalendarDays } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import {
  team,
  members,
  notifications,
  recommendSchedule,
  toDDay,
  stageToScheduleKey,
  type ScheduledStage,
  type ScheduleKey,
} from '../../prototype/data';

const pathByKey: Record<ScheduleKey, string> = {
  collect: '/prototype/idea/new',
  feedback: '/prototype/ideas',
  vote: '/prototype/vote',
  wrap: '/prototype/mediate',
};

const ctaByKey: Record<ScheduleKey, string> = {
  collect: '아이디어 작성하기',
  feedback: '피드백 작성하기',
  vote: '투표하기',
  wrap: '충돌 중재 + 기획안',
};

export default function TeamHome() {
  const navigate = useNavigate();
  const unread = notifications.filter((n) => n.unread).length;

  // 일정 — 온보딩에서 저장한 값이 있으면 사용, 없으면 기본 7일 추천
  const schedule = useMemo<ScheduledStage[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = sessionStorage.getItem('weave:schedule');
      if (saved) return JSON.parse(saved);
    } catch {}
    const fallbackDeadline = new Date();
    fallbackDeadline.setDate(fallbackDeadline.getDate() + 7);
    return recommendSchedule(fallbackDeadline.toISOString().slice(0, 10));
  }, []);

  const currentScheduleKey = stageToScheduleKey[team.stage];
  const currentIdx = schedule.findIndex((s) => s.key === currentScheduleKey);
  const currentStage = schedule[currentIdx] ?? schedule[0];
  const projectDeadline = schedule[schedule.length - 1]?.deadline;

  return (
    <PrototypeLayout showBell bellCount={unread}>
      {/* Team header */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-bold text-primary tracking-tighter">
            {team.name}
          </h2>
          <p className="text-[11px] text-muted mt-0.5">아이디어톤 · Plus 플랜</p>
        </div>
        {projectDeadline && (
          <div className="flex items-center gap-1 text-[12px] text-accent font-bold bg-accent-soft/40 px-2 py-1 rounded-md">
            <Clock size={12} />
            {toDDay(projectDeadline)}
          </div>
        )}
      </div>

      {/* Current stage CTA */}
      <button
        onClick={() => navigate(pathByKey[currentStage.key])}
        className="block w-full bg-primary text-paper p-4 rounded-lg flex items-center justify-between hover:opacity-90 transition-opacity mb-5 text-left"
      >
        <div>
          <div className="text-[10px] uppercase tracking-wider font-bold opacity-70">
            지금 단계
          </div>
          <div className="text-[16px] font-bold mt-0.5">{ctaByKey[currentStage.key]}</div>
          <div className="text-[11px] opacity-70 mt-0.5">
            {currentStage.label} · {toDDay(currentStage.deadline!)} 마감
          </div>
        </div>
        <ArrowRight size={20} />
      </button>

      {/* Stage list */}
      <h3 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <CalendarDays size={12} />
        진행 단계 ({currentIdx + 1}/{schedule.length})
      </h3>
      <div className="space-y-2 mb-6">
        {schedule.map((s, idx) => {
          const status = idx < currentIdx ? 'done' : idx === currentIdx ? 'active' : 'pending';
          return (
            <Link
              key={s.key}
              to={status === 'pending' ? '#' : pathByKey[s.key]}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                status === 'active'
                  ? 'bg-surface border-accent shadow-sm'
                  : status === 'done'
                  ? 'bg-surface border-border opacity-80 hover:opacity-100'
                  : 'bg-surface-alt border-border'
              } ${status === 'pending' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] flex-shrink-0 ${
                  status === 'done'
                    ? 'bg-success text-white'
                    : status === 'active'
                    ? 'bg-accent text-white'
                    : 'bg-border text-muted'
                }`}
              >
                {status === 'done' ? <Check size={14} strokeWidth={3} /> : idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[13px] font-bold ${
                    status === 'pending' ? 'text-muted' : 'text-primary'
                  }`}
                >
                  {s.label}
                </div>
                <div className="text-[11px] text-muted truncate">{s.desc}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <Badge
                  variant={status === 'active' ? 'accent' : status === 'done' ? 'success' : 'default'}
                  className="!text-[10px]"
                >
                  {toDDay(s.deadline!)}
                </Badge>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Members */}
      <h3 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">
        팀원 ({members.length}/6)
      </h3>
      <div className="space-y-2 mb-5">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 p-3 bg-surface border border-border rounded-md"
          >
            <Avatar initial={m.initial} color={m.color} size="sm" />
            <div className="flex-1">
              <div className="text-[13px] font-bold text-primary">
                {m.name}{' '}
                {m.isHost && <span className="text-[10px] text-accent ml-1">호스트</span>}
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
