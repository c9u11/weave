import { Link } from 'react-router-dom';
import { MessageSquare, Bot, Star, Users, Clock, CheckCheck } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { StageBackLink } from '../../prototype/StageBackLink';
import { Button } from '../../components/ui/Button';
import { notifications } from '../../prototype/data';
import { useState } from 'react';

const iconByType = {
  comment: MessageSquare,
  ai: Bot,
  rating: Star,
  member: Users,
  deadline: Clock,
};

const colorByType = {
  comment: '#A78BFA',
  ai: '#B45309',
  rating: '#FB923C',
  member: '#34D399',
  deadline: '#F87171',
};

export default function Notifications() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const list = filter === 'unread' ? notifications.filter((n) => n.unread) : notifications;
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <PrototypeLayout>
      <StageBackLink />
      <h1 className="text-2xl font-bold tracking-tighter text-primary mb-1">알림</h1>
      <p className="text-[13px] text-muted mb-5">
        {unreadCount > 0 ? `읽지 않은 알림 ${unreadCount}개` : '모두 읽었어요'}
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-colors ${
            filter === 'all' ? 'bg-primary text-paper' : 'bg-surface border border-border text-muted'
          }`}
        >
          전체 ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-colors ${
            filter === 'unread' ? 'bg-primary text-paper' : 'bg-surface border border-border text-muted'
          }`}
        >
          읽지 않음 ({unreadCount})
        </button>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<CheckCheck size={13} />}
          className="ml-auto !text-[12px]"
        >
          모두 읽음
        </Button>
      </div>

      <div className="space-y-2">
        {list.map((n) => {
          const Icon = iconByType[n.type];
          const color = colorByType[n.type];
          return (
            <Link
              key={n.id}
              to={n.target || '#'}
              className={`flex items-start gap-3 p-3 rounded-md border transition-colors ${
                n.unread
                  ? 'bg-accent-soft/15 border-accent-soft/40 hover:bg-accent-soft/25'
                  : 'bg-surface border-border hover:bg-surface-alt'
              }`}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}25`, color }}
              >
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-primary leading-relaxed">{n.text}</p>
                <p className="text-[11px] text-muted mt-0.5">{n.time}</p>
              </div>
              {n.unread && (
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
              )}
            </Link>
          );
        })}
        {list.length === 0 && (
          <p className="text-center text-[12px] text-muted py-12">
            새 알림이 없어요
          </p>
        )}
      </div>
    </PrototypeLayout>
  );
}
