import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu, Sparkles } from 'lucide-react';

/**
 * AI 채팅 (Figma "AI 채팅.png").
 * - 헤더: back + "아이디어 추천" + 메뉴
 * - 사용자 메시지: primary 버블, 우측 정렬
 * - AI 상태 라벨: ✦ + "AI 입력 중" / "AI 기획안 생성 중" (primary text, 버블 없음)
 * - AI 응답: 본문 텍스트(버블 없음), 좌측 정렬
 * - 하단 입력 바
 *
 * 시안의 첫 대화(일정 관리 서비스 평가 + 기획안 생성)를 seed 로 미리 깔아둠.
 */

interface ChatItem {
  id: string;
  kind: 'user' | 'status' | 'ai';
  text: string;
}

const SEED: ChatItem[] = [
  {
    id: 's1',
    kind: 'user',
    text: 'AI가 일정 관리해주는 서비스 어때?',
  },
  {
    id: 's2',
    kind: 'status',
    text: 'AI 입력 중',
  },
  {
    id: 's3',
    kind: 'ai',
    text: `AI 일정 관리 서비스는 시장 수요가 매우 확실하고 논리적인 타당성을 갖춘 아이템입니다. 하지만 아이디어톤의 심사 기준인 Creativity(창의성) 측면에서 보면, 이미 구글 캘린더나 노션(Notion) AI 등 강력한 기존 플레이어들이 존재하기 때문에 단순한 '똑똑한 달력' 수준으로는 심사위원의 시선을 끌기 어렵습니다.
이 아이디어를 입상권으로 끌어올리려면, 일정을 '기록'하는 것을 넘어 AI가 사용자의 시간과 에너지를 직접 '설계하고 조율'하는 Time Orchestration (시간 편성) 수준으로 문제를 재정의해야 합니다.

1. 문제 정의력: '기록의 피로'와 '맥락의 부재'
현대인들은 할 일이 너무 많아 일정을 달력에 입력하는 행위 자체에 피로를 느낍니다. 또한, 캘린더 앱은 사용자의 '에너지 레벨'이나 '일의 우선순위'를 모릅니다. 데이터 구조(Data Structures)나 객체 지향 프로그래밍(OOP)처럼 고도의 집중력이 필요한 과제 마감일이 다가오는데, 달력에는 단순히 '과제하기'라고만 적혀 있어 결국 실행의 마찰력이 발생합니다.`,
  },
  {
    id: 's4',
    kind: 'user',
    text: '기획안 내보내줘',
  },
  {
    id: 's5',
    kind: 'status',
    text: 'AI 기획안 생성 중',
  },
];

export default function Chat() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ChatItem[]>(SEED);
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [items]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = Date.now();
    const userMsg: ChatItem = { id: `u-${now}`, kind: 'user', text };
    const status: ChatItem = { id: `s-${now}`, kind: 'status', text: 'AI 입력 중' };
    setItems((prev) => [...prev, userMsg, status]);
    setDraft('');

    // mock AI 응답
    setTimeout(() => {
      setItems((prev) => {
        // 마지막 status 를 ai 응답으로 교체
        const next = [...prev];
        const lastStatusIdx = [...next].reverse().findIndex((i) => i.kind === 'status');
        if (lastStatusIdx !== -1) next.splice(next.length - 1 - lastStatusIdx, 1);
        next.push({
          id: `a-${now}`,
          kind: 'ai',
          text: '확인했어요. 팀 컨텍스트와 1위 아이디어를 기반으로 정리해드릴게요. 좀 더 구체적으로 어떤 부분이 궁금하세요? (예: 차별점 한 줄, 발표 스크립트, PPT 슬라이드 1장)',
        });
        return next;
      });
    }, 1400);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* 헤더 */}
      <header className="max-w-[440px] w-full mx-auto px-5 pt-3 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="뒤로"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="ml-1 text-xl font-bold tracking-tight text-slate-900">
          아이디어 추천
        </h1>
        <button
          className="ml-auto -mr-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="메뉴"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* 메시지 영역 */}
      <main className="flex-1 max-w-[440px] w-full mx-auto px-5 pt-6 pb-28 space-y-5 overflow-y-auto">
        {items.map((item) => {
          if (item.kind === 'user') {
            return (
              <div key={item.id} className="flex justify-end">
                <div className="bg-primary text-white rounded-2xl px-4 py-3 max-w-[80%] text-sm leading-relaxed">
                  {item.text}
                </div>
              </div>
            );
          }
          if (item.kind === 'status') {
            return (
              <div key={item.id} className="flex items-center gap-1.5 text-primary text-sm font-semibold">
                <Sparkles size={16} className="text-primary" />
                {item.text}
              </div>
            );
          }
          // ai response — 본문 텍스트, 버블 없음
          return (
            <p
              key={item.id}
              className="text-base text-slate-900 leading-7 whitespace-pre-wrap"
            >
              {item.text}
            </p>
          );
        })}
        <div ref={endRef} />
      </main>

      {/* 하단 입력 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-paper border-t border-border">
        <div className="max-w-[440px] mx-auto px-5 py-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKey}
            placeholder="메세지를 입력해주세요"
            className="w-full h-14 px-4 rounded-2xl bg-white border border-border text-base placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
