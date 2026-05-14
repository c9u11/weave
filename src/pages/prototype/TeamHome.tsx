import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, Plus, Clock, Check, CalendarDays,
  Star, MessageSquare, MessageCircle, Lock,
} from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import {
  team,
  members,
  notifications,
  ideas,
  recommendSchedule,
  toDDay,
  stageToScheduleKey,
  getCurrentPlan,
  isPaidPlan,
  plans,
  type ScheduledStage,
  type ScheduleKey,
} from '../../prototype/data';

const pathByKey: Record<ScheduleKey, string> = {
  collect: '/prototype/idea/new',
  feedback: '/prototype/ideas',
  vote: '/prototype/vote',
  wrap: '/prototype/brief',
};

const ctaByKey: Record<ScheduleKey, string> = {
  collect: '아이디어 작성하기',
  feedback: '피드백 작성하기',
  vote: '투표하기',
  wrap: '최종 기획안',
};

export default function TeamHome() {
  const navigate = useNavigate();
  const unread = notifications.filter((n) => n.unread).length;
  const plan = getCurrentPlan();
  const paid = isPaidPlan(plan);
  const planName = plans.find((p) => p.key === plan)?.name ?? 'Free';

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

  // 최근 4개 아이디어 (idx 역순)
  const recentIdeas = useMemo(() => [...ideas].reverse().slice(0, 4), []);

  return (
    <PrototypeLayout showBell bellCount={unread}>
      {/* ========== 팀 헤더 ========== */}
      <div className="bg-surface border border-border rounded-lg p-4 mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-bold text-primary-dark tracking-tighter">
            {team.name}
          </h2>
          <p className="text-[11px] text-muted mt-0.5">
            아이디어톤 · <span className="text-primary font-bold">{planName}</span> 플랜
          </p>
        </div>
        {projectDeadline && (
          <div className="flex items-center gap-1 text-[12px] text-primary font-bold bg-accent-soft px-2.5 py-1 rounded-md">
            <Clock size={12} />
            {toDDay(projectDeadline)}
          </div>
        )}
      </div>

      {/* ========== 지금 단계 CTA ========== */}
      <button
        onClick={() => navigate(pathByKey[currentStage.key])}
        className="block w-full bg-primary text-paper p-4 rounded-lg flex items-center justify-between hover:opacity-90 transition-opacity mb-5 text-left"
      >
        <div>
          <div className="text-[10px] uppercase tracking-wider font-bold opacity-70">
            지금 단계 · {currentIdx + 1}/{schedule.length}
          </div>
          <div className="text-[16px] font-bold mt-0.5">{ctaByKey[currentStage.key]}</div>
          <div className="text-[11px] opacity-70 mt-0.5">
            {currentStage.label} · {toDDay(currentStage.deadline!)} 마감
          </div>
        </div>
        <ArrowRight size={20} />
      </button>

      {/* ========== 진행 단계 (compact) ========== */}
      <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <CalendarDays size={12} /> 진행
      </h3>
      <div className="space-y-2 mb-6">
        {schedule.map((s, idx) => {
          const status = idx < currentIdx ? 'done' : idx === currentIdx ? 'active' : 'pending';
          return (
            <Link
              key={s.key}
              to={status === 'pending' ? '#' : pathByKey[s.key]}
              className={`flex items-center gap-3 p-2.5 rounded-md border transition-all ${
                status === 'active'
                  ? 'bg-surface border-primary shadow-sm'
                  : status === 'done'
                  ? 'bg-surface border-border opacity-80 hover:opacity-100'
                  : 'bg-surface-alt border-border'
              } ${status === 'pending' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] flex-shrink-0 ${
                  status === 'done'
                    ? 'bg-success text-white'
                    : status === 'active'
                    ? 'bg-primary text-paper'
                    : 'bg-border text-muted'
                }`}
              >
                {status === 'done' ? <Check size={12} strokeWidth={3} /> : idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[13px] font-bold ${
                    status === 'pending' ? 'text-muted' : 'text-primary-dark'
                  }`}
                >
                  {s.label}
                </div>
              </div>
              <Badge
                variant={status === 'active' ? 'accent' : status === 'done' ? 'success' : 'default'}
                className="!text-[10px]"
              >
                {toDDay(s.deadline!)}
              </Badge>
            </Link>
          );
        })}
      </div>

      {/* ========== 아이디어 피드 ========== */}
      <div className="flex items-end justify-between mb-3">
        <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
          <MessageSquare size={12} /> 아이디어 ({ideas.length})
        </h3>
        <Link to="/prototype/ideas" className="text-[11px] font-bold text-primary hover:underline">
          전체 보기 →
        </Link>
      </div>
      <div className="space-y-2 mb-6">
        {recentIdeas.map((idea) => (
          <Link
            key={idea.id}
            to={`/prototype/idea/${idea.id}`}
            className="flex items-center gap-3 bg-surface border border-border rounded-md p-2.5 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <div
              className="w-12 h-12 rounded-md flex-shrink-0 flex items-center justify-center text-xl overflow-hidden"
              style={{ background: idea.gradient }}
            >
              {idea.image ? (
                <img src={idea.image} alt={idea.title} loading="lazy" className="w-full h-full object-cover object-top" />
              ) : (
                idea.emoji
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-primary truncate">👤 {idea.authorName}</div>
              <div className="text-[13px] font-bold text-primary-dark truncate leading-tight">
                {idea.title}
              </div>
              <div className="flex items-center gap-2.5 mt-1 text-[10px] text-muted">
                <span className="flex items-center gap-0.5">
                  <Star size={9} className="text-primary" /> {idea.rating}
                </span>
                <span className="flex items-center gap-0.5">
                  <MessageSquare size={9} /> {idea.commentsCount}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ========== 팀원 ========== */}
      <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">
        팀원 ({members.length + 1})
      </h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {[{ initial: '나', color: '#3C4883', name: '나', isHost: false }, ...members.map((m) => ({
          initial: m.initial, color: m.color, name: m.name, isHost: m.isHost,
        }))].map((m, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 bg-surface border border-border rounded-full pl-1 pr-3 py-1"
          >
            <Avatar initial={m.initial} color={m.color} size="sm" />
            <span className="text-[11px] font-bold text-primary-dark">
              {m.name}
              {m.isHost && <span className="text-[9px] text-primary ml-1">★</span>}
            </span>
          </div>
        ))}
      </div>

      {/* ========== 플로팅 액션 버튼 ========== */}
      <FloatingActions paid={paid} />
    </PrototypeLayout>
  );
}

/**
 * 우측 하단 플로팅 액션 — 아이디어 추가 + (유료) 채팅.
 * 무료 플랜이면 채팅은 자물쇠 표시로 노출 → 클릭하면 페이월(/prototype/chat) 로.
 */
function FloatingActions({ paid }: { paid: boolean }) {
  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5">
      <Link
        to="/prototype/chat"
        className={`group relative flex items-center gap-2 ${
          paid
            ? 'bg-surface border border-border text-primary-dark'
            : 'bg-surface border border-dashed border-border text-muted'
        } shadow-md rounded-full pl-3 pr-4 py-2.5 text-[12px] font-bold hover:shadow-lg transition-all`}
        title={paid ? '팀 + AI 채팅' : '유료 플랜 전용'}
      >
        {paid ? (
          <MessageCircle size={16} className="text-primary" />
        ) : (
          <Lock size={14} />
        )}
        <span>AI 채팅</span>
        {!paid && <Badge variant="soft" className="!text-[9px] !px-1.5 !py-0">Plus</Badge>}
      </Link>
      <Link
        to="/prototype/idea/new"
        className="flex items-center gap-2 bg-primary text-paper shadow-lg rounded-full pl-3 pr-5 py-3 text-[13px] font-bold hover:shadow-xl hover:bg-primary-dark transition-all"
      >
        <Plus size={18} />
        아이디어 추가
      </Link>
    </div>
  );
}
