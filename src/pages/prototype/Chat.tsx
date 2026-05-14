import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, Lock, ArrowRight, Bot } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { StageBackLink } from '../../prototype/StageBackLink';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { getCurrentPlan, isPaidPlan, members, currentUser, team } from '../../prototype/data';

interface ChatMsg {
  id: string;
  author: 'me' | 'ai' | string; // member id
  name: string;
  color: string;
  text: string;
  time: string;
  isAI?: boolean;
}

const AI_COLOR = '#566CCC';

const seed: ChatMsg[] = [
  {
    id: 's1', author: 'm1', name: '병찬', color: '#F87171',
    text: '오늘 점심 회의 가능한 사람? AI 한테 1위 아이디어 한 줄 요약 좀 받자.',
    time: '12:01',
  },
  {
    id: 's2', author: 'ai', name: 'Weave AI', color: AI_COLOR, isAI: true,
    text: '1위 아이디어 "AI 팀 프로젝트 매니저"의 한 줄 요약입니다.\n— 흩어진 아이디어를 평가·구조화해 "제출 가능한 결과물"로 바꿔주는 AI 협업 매니저.',
    time: '12:01',
  },
  {
    id: 's3', author: 'm2', name: '현준', color: '#FB923C',
    text: '오 좋네요. 발표 슬라이드 첫 장에 그대로 박아도 될 듯.',
    time: '12:03',
  },
  {
    id: 's4', author: 'm3', name: '영준', color: '#A78BFA',
    text: '근데 Notion/Trello 대비 차별점은 어떻게 보여주죠?',
    time: '12:04',
  },
  {
    id: 's5', author: 'ai', name: 'Weave AI', color: AI_COLOR, isAI: true,
    text: '경쟁 비교 표를 한 슬라이드로 정리해드릴 수 있어요. "평가 → 구조화 → 산출물" 흐름을 축으로 잡고, 다른 도구는 한 단계만 수행한다는 점을 강조하면 효과적입니다.',
    time: '12:04',
  },
];

export default function Chat() {
  const navigate = useNavigate();
  const plan = getCurrentPlan();
  const paid = isPaidPlan(plan);

  const [messages, setMessages] = useState<ChatMsg[]>(seed);
  const [draft, setDraft] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, aiTyping]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const mine: ChatMsg = {
      id: `m-${Date.now()}`,
      author: 'me',
      name: currentUser.name,
      color: currentUser.color,
      text,
      time,
    };
    setMessages((prev) => [...prev, mine]);
    setDraft('');

    // mock AI 응답
    setAiTyping(true);
    setTimeout(() => {
      const reply: ChatMsg = {
        id: `a-${Date.now()}`,
        author: 'ai',
        name: 'Weave AI',
        color: AI_COLOR,
        isAI: true,
        text: '확인했어요. 팀 컨텍스트와 1위 아이디어를 기반으로 정리해드릴게요. 좀 더 구체적으로 어떤 부분이 궁금하세요? (예: 차별점 한 줄, 발표 스크립트, PPT 슬라이드 1장)',
        time,
      };
      setMessages((prev) => [...prev, reply]);
      setAiTyping(false);
    }, 1400);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // ===== 페이월 =====
  if (!paid) {
    return (
      <PrototypeLayout>
        <StageBackLink />
        <div className="text-center pt-8">
          <div className="w-14 h-14 rounded-full bg-accent-soft border border-primary-light/40 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">
            AI 채팅은 유료 기능이에요
          </h1>
          <p className="text-[14px] text-muted mt-2 mb-6 leading-relaxed">
            팀원과 AI 가 함께 대화하는 채팅은 <strong className="text-primary">Plus</strong> 부터 사용할 수 있어요.
            AI 가 팀의 맥락(주제·심사기준·1위 아이디어)을 알고 답해요.
          </p>

          <div className="bg-surface border border-border rounded-lg p-4 text-left mb-6">
            <div className="text-[12px] font-bold text-primary-dark flex items-center gap-1.5 mb-2">
              <Sparkles size={13} className="text-primary" />
              어떤 일을 할 수 있나요?
            </div>
            <ul className="space-y-1.5 text-[12px] text-primary-dark/85">
              <li>• 1위 아이디어 한 줄 요약</li>
              <li>• 발표 스크립트 초안 / 핵심 메시지</li>
              <li>• 경쟁 서비스 비교표</li>
              <li>• 팀 컨텍스트 기반 Q&amp;A</li>
            </ul>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={<ArrowRight size={16} />}
            onClick={() => navigate('/prototype/plan')}
          >
            플랜 업그레이드
          </Button>
        </div>
      </PrototypeLayout>
    );
  }

  // ===== 채팅 본화면 =====
  return (
    <PrototypeLayout>
      <StageBackLink />

      <div className="flex items-center gap-3 bg-surface border border-border rounded-lg p-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-primary text-paper flex items-center justify-center flex-shrink-0">
          <Bot size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-bold text-primary-dark">{team.name}</div>
          <div className="text-[11px] text-muted">
            팀원 {members.length + 1}명 · Weave AI 가 함께 있어요
          </div>
        </div>
        <Badge variant="accent" className="!text-[10px]">Plus</Badge>
      </div>

      {/* 메시지 리스트 */}
      <div className="bg-paper border border-border rounded-lg p-3 mb-3 max-h-[480px] overflow-y-auto space-y-3">
        {messages.map((m) => {
          const mine = m.author === 'me';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2 ${mine ? 'flex-row-reverse' : ''}`}
            >
              <Avatar
                initial={m.isAI ? '✨' : m.name[0]}
                color={m.color}
                size="sm"
                className="!w-7 !h-7 !text-[11px] flex-shrink-0"
              />
              <div className={`max-w-[78%] ${mine ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`flex items-center gap-1.5 mb-0.5 ${mine ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[11px] font-bold text-primary-dark">
                    {mine ? '나' : m.name}
                  </span>
                  {m.isAI && <Badge variant="soft" className="!text-[9px]">AI</Badge>}
                  <span className="text-[10px] text-muted">{m.time}</span>
                </div>
                <div
                  className={`text-[12.5px] leading-relaxed rounded-2xl px-3.5 py-2.5 whitespace-pre-wrap ${
                    mine
                      ? 'bg-primary text-paper rounded-tr-sm'
                      : m.isAI
                      ? 'bg-accent-soft text-primary-dark border border-primary-light/40 rounded-tl-sm'
                      : 'bg-surface text-primary-dark border border-border rounded-tl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            </div>
          );
        })}

        {aiTyping && (
          <div className="flex items-start gap-2">
            <Avatar initial="✨" color={AI_COLOR} size="sm" className="!w-7 !h-7 !text-[11px] flex-shrink-0" />
            <div className="bg-accent-soft border border-primary-light/40 rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.15s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* 입력 */}
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          placeholder="AI 또는 팀원에게 말 걸기..."
          className="input flex-1"
        />
        <Button
          variant="primary"
          onClick={send}
          disabled={!draft.trim()}
          className="!px-4"
        >
          <Send size={14} />
        </Button>
      </div>
      <p className="text-[10px] text-muted mt-2 text-center">
        AI 는 팀의 주제·심사기준·1위 아이디어 컨텍스트를 알고 답해요.
      </p>
    </PrototypeLayout>
  );
}
