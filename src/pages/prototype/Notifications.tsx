import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, MessageSquare, Bot, Heart, Users, Clock, CheckCheck } from 'lucide-react';
import { notifications } from '../../prototype/data';

/**
 * 알림 (홈 bell 진입).
 * - 헤더: back + 타이틀 + 읽음 개수
 * - 필터 칩 (전체 / 읽지 않음) + 모두 읽음 액션
 * - 알림 리스트 카드
 */

const iconByType = {
  comment: MessageSquare,
  ai: Bot,
  like: Heart,
  member: Users,
  deadline: Clock,
} as const;

const colorByType = {
  comment: '#A78BFA',
  ai: '#566CCC',
  like: '#F472B6',
  member: '#34D399',
  deadline: '#F87171',
} as const;

export default function Notifications() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const list = filter === 'unread' ? notifications.filter((n) => n.unread) : notifications;
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-paper">
      <main className="max-w-[440px] mx-auto px-5 pt-3 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="뒤로"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="mt-3 text-[22px] font-bold tracking-tight text-slate-900">알림</h1>
        <p className="mt-1 text-sm text-muted">
          {unreadCount > 0 ? `읽지 않은 알림 ${unreadCount}개` : '모두 읽었어요'}
        </p>

        {/* 필터 */}
        <div className="mt-4 flex items-center gap-2">
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
            전체 ({notifications.length})
          </FilterChip>
          <FilterChip
            active={filter === 'unread'}
            onClick={() => setFilter('unread')}
          >
            읽지 않음 ({unreadCount})
          </FilterChip>
          <button className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-primary-dark transition-colors">
            <CheckCheck size={14} />
            모두 읽음
          </button>
        </div>

        {/* 리스트 */}
        <div className="mt-5 space-y-2">
          {list.map((n) => {
            const Icon = iconByType[n.type];
            const color = colorByType[n.type];
            return (
              <Link
                key={n.id}
                to={n.target || '#'}
                className={`flex items-start gap-3 p-4 rounded-2xl border transition-colors ${
                  n.unread
                    ? 'bg-accent-soft border-transparent hover:bg-accent-soft/80'
                    : 'bg-white border-border hover:border-primary/30'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}22`, color }}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900 leading-relaxed">{n.text}</p>
                  <p className="text-xs text-muted mt-1">{n.time}</p>
                </div>
                {n.unread && (
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                )}
              </Link>
            );
          })}

          {list.length === 0 && (
            <p className="text-center text-sm text-muted py-16">
              새 알림이 없어요
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
        active
          ? 'bg-primary text-white'
          : 'bg-white border border-border text-muted hover:border-primary/40'
      }`}
    >
      {children}
    </button>
  );
}
