// Mock data for the Weave prototype demo

export type PersonaKey = 'user' | 'skeptic' | 'realist' | 'judge';
export type Stage = 'collect' | 'review' | 'feedback' | 'vote' | 'mediate' | 'brief';
export type Plan = 'free' | 'plus' | 'pro';

export interface TeamMember {
  id: string;
  name: string;
  initial: string;
  color: string;
  isHost: boolean;
  status: 'active' | 'writing' | 'waiting';
  ideasCount: number;
}

export interface PersonaCritique {
  key: PersonaKey;
  name: string;
  initial: string;
  color: string;
  quote: string;
  detail: string;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorColor: string;
  target?: string;
  text: string;
  time: string;
}

export interface Idea {
  id: string;
  authorId: string;
  authorName: string;
  authorColor: string;
  title: string;
  emoji: string;
  gradient: string;
  rawText: string;
  organized: {
    problem: string;
    feature: string;
    target: string;
    differentiator: string;
    risk: string;
  };
  personas: PersonaCritique[];
  comments: Comment[];
  rating: number;
  commentsCount: number;
}

export interface NotificationItem {
  id: string;
  type: 'comment' | 'ai' | 'rating' | 'member' | 'deadline';
  text: string;
  time: string;
  unread: boolean;
  target?: string;
}

export const team = {
  name: '멋사 아이디어톤 - 우리 팀',
  daysLeft: 7,
  stage: 'vote' as Stage,
  plan: 'plus' as Plan,
};

// 투표 기준 (대회 심사 기준에서 따옴)
export const voteCriteria = [
  { key: 'overall', label: '종합', desc: '전반적으로 가장 좋은 아이디어' },
  { key: 'feasibility', label: '실현 가능성', desc: '우리 팀이 실제로 만들 수 있는' },
  { key: 'pitch', label: '발표 가능성', desc: '심사위원에게 잘 전달될' },
  { key: 'unique', label: '차별성', desc: '기존 서비스와 가장 다른' },
];

// 사전 투표 결과 (mock)
export const initialVotes: Record<string, number> = {
  i1: 1,
  i2: 0,
  i3: 1,
  i4: 0,
};

// 현재 로그인 사용자 (mock)
export const currentUser = {
  id: 'me',
  name: '나',
  initial: '나',
  color: '#1E1B4B',
};

export const members: TeamMember[] = [
  { id: 'm1', name: '김채원', initial: '채', color: '#FB923C', isHost: true, status: 'active', ideasCount: 2 },
  { id: 'm2', name: '박준혁', initial: '준', color: '#A78BFA', isHost: false, status: 'writing', ideasCount: 1 },
  { id: 'm3', name: '이서진', initial: '서', color: '#34D399', isHost: false, status: 'waiting', ideasCount: 1 },
];

export const personaTemplates: PersonaCritique[] = [
  {
    key: 'user',
    name: '사용자 입장',
    initial: '사',
    color: '#FB923C',
    quote: '이거 매주 한 번씩 켤 만큼 좋아? 카톡으로도 되는데.',
    detail: '내가 진짜 쓸까? 왜 필요해? 쓰기 귀찮지 않아? — 본인 시간·돈 관점에서 솔직하게.',
  },
  {
    key: 'skeptic',
    name: '회의적 동료',
    initial: '회',
    color: '#A78BFA',
    quote: '문제 정의는 좋은데, 우선순위가 높은 문제인지 데이터가 없네요.',
    detail: '이게 진짜 문제인가? 이미 X가 해결하지 않나? 근거가 약하지 않나? — 모든 가정에 "왜?"를 4번 묻는 분석가.',
  },
  {
    key: 'realist',
    name: '현실 체크',
    initial: '현',
    color: '#34D399',
    quote: 'D-7 안에 4개 기능은 무리. 핵심 1개만 우선 배포하면 가산점은 확보.',
    detail: '실현 가능성·일정·자원 균형 감각. N일 안에 만들 수 있어? 기술·인력·예산 가능?',
  },
  {
    key: 'judge',
    name: '심사위원',
    initial: '심',
    color: '#F87171',
    quote: '문제 정의 8/10, 차별성 6/10. "왜 우리가 처음 했나"를 명확히.',
    detail: '대회 통과 관점. 차별성? 5분 안에 와닿나? 심사 기준 부합?',
  },
];

export const ideas: Idea[] = [
  {
    id: 'i1',
    authorId: 'm1',
    authorName: '채원',
    authorColor: '#FB923C',
    title: '친구 메뉴 투표 앱',
    emoji: '🍔',
    gradient: 'linear-gradient(135deg, #FCD34D55, #FB923C55)',
    rawText:
      '배달앱이 너무 많아서 뭐 시킬지 모르겠음. 친구들이랑 같이 고르면 좋겠는데 카톡으로 하면 귀찮음. 누가 어디 좋아하는지도 모르고 결국 마트에서 다 골라야 함. AI가 우리 입맛 학습해서 추천해주고 투표도 한 곳에서 하면 30초만에 끝날 듯.',
    organized: {
      problem: '친구들과 배달 메뉴 합의 과정이 번거롭다',
      feature: '실시간 그룹 메뉴 투표 + AI 추천 (입맛 학습)',
      target: '20대 친구 그룹 배달 주문자',
      differentiator: '입맛 학습 알고리즘 + 카톡 외 매끄러운 합의 UX',
      risk: '데이터 수집 어려움 / 배달앱과의 경쟁',
    },
    personas: personaTemplates,
    comments: [
      {
        id: 'c1',
        authorId: 'm2',
        authorName: '준혁',
        authorColor: '#A78BFA',
        target: '문제 정의',
        text: '이거 카톡 투표로도 되지 않아? 차별점이 약해 보여.',
        time: '3분 전',
      },
      {
        id: 'c2',
        authorId: 'm3',
        authorName: '서진',
        authorColor: '#34D399',
        target: '타깃',
        text: '30대도 포함 가능할 것 같아요. 직장인 점심 메뉴 결정도 비슷한 문제.',
        time: '10분 전',
      },
      {
        id: 'c3',
        authorId: 'm2',
        authorName: '준혁',
        authorColor: '#A78BFA',
        text: '핵심은 좋은데, MVP 정의를 1줄로 명확히 했으면 좋겠어요.',
        time: '15분 전',
      },
    ],
    rating: 4.2,
    commentsCount: 5,
  },
  {
    id: 'i2',
    authorId: 'm1',
    authorName: '채원',
    authorColor: '#FB923C',
    title: '자취생 식단 캘린더',
    emoji: '🍳',
    gradient: 'linear-gradient(135deg, #34D39955, #FCD34D55)',
    rawText: '자취하면서 식단 관리 어려운데 냉장고 재료 보고 AI가 1주일 식단을 짜주면 좋겠음.',
    organized: {
      problem: '자취생이 매일 뭘 먹을지 결정·장보기·요리하기 어렵다',
      feature: '냉장고 재료 입력 → AI 식단 추천 + 장보기 리스트',
      target: '자취 1~3년차 대학생·사회 초년생',
      differentiator: '재료 베이스 추천 (낭비 ↓) + 영양 균형',
      risk: '재료 입력 UX / 사용자 지속 유입',
    },
    personas: personaTemplates,
    comments: [],
    rating: 3.8,
    commentsCount: 2,
  },
  {
    id: 'i3',
    authorId: 'm2',
    authorName: '준혁',
    authorColor: '#A78BFA',
    title: '동아리 회비 관리',
    emoji: '💰',
    gradient: 'linear-gradient(135deg, #A78BFA55, #B4530955)',
    rawText: '동아리 회비를 카톡으로 일일이 확인하기 너무 귀찮음. 누가 안 냈는지도 모르고.',
    organized: {
      problem: '동아리 회비·정산이 모두 수기·카톡으로 비효율적',
      feature: '회비 입력·확인 자동화 + 정산 알림',
      target: '대학 동아리 회장·총무',
      differentiator: '소규모 그룹 전용 단순 UI (vs 토스/카뱅 모임통장)',
      risk: '금융 정보 보안 / 시장 크기',
    },
    personas: personaTemplates,
    comments: [],
    rating: 4.5,
    commentsCount: 7,
  },
  {
    id: 'i4',
    authorId: 'm3',
    authorName: '서진',
    authorColor: '#34D399',
    title: '중고책 매칭',
    emoji: '📚',
    gradient: 'linear-gradient(135deg, #FB923C55, #A78BFA55)',
    rawText: '학기 끝나면 전공책 쓸 데가 없는데 후배는 사느라 비쌈. 매칭 플랫폼.',
    organized: {
      problem: '대학 전공책 거래 시 정보 비대칭·신뢰 부족',
      feature: '학교·전공·과목별 책 매칭 + 학생증 인증',
      target: '대학생 (구매·판매 양쪽)',
      differentiator: '학교 인증으로 신뢰 ↑ + 지역 한정 (택배 X)',
      risk: '계절성 (학기말만 활성) / 사용자 잔존',
    },
    personas: personaTemplates,
    comments: [],
    rating: 3.2,
    commentsCount: 3,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'comment',
    text: '준혁님이 내 아이디어 \'친구 메뉴 투표 앱\'의 "문제 정의"에 댓글을 달았어요',
    time: '3분 전',
    unread: true,
    target: '/prototype/idea/i1',
  },
  {
    id: 'n2',
    type: 'ai',
    text: 'AI 페르소나 비평이 완료됐어요 (4명)',
    time: '5분 전',
    unread: true,
    target: '/prototype/idea/i1',
  },
  {
    id: 'n3',
    type: 'rating',
    text: '서진님이 내 아이디어에 별점 4.5를 매겼어요',
    time: '10분 전',
    unread: true,
  },
  {
    id: 'n4',
    type: 'member',
    text: '서진님이 팀에 합류했어요',
    time: '2시간 전',
    unread: false,
  },
  {
    id: 'n5',
    type: 'deadline',
    text: '마감 D-7 · 아이디어 작성 마감까지 7일',
    time: '오늘',
    unread: false,
  },
];

// 화면 리스트 (런처용)
export const screenList = [
  { num: '01', path: '/prototype/landing', name: 'Landing', desc: '서비스 소개 + 카카오 로그인' },
  { num: '03', path: '/prototype/onboarding', name: '온보딩', desc: '프로젝트 유형 → 정보 → 팀 설정' },
  { num: '04', path: '/prototype/plan', name: '결제 플랜 선택', desc: 'Free / Plus / Pro 비교' },
  { num: '05', path: '/prototype/invite', name: '팀원 초대', desc: '카톡 공유 + 링크 복사' },
  { num: '06', path: '/prototype/join', name: '초대 수락', desc: '팀원이 카톡 링크 클릭 시' },
  { num: '07', path: '/prototype/team', name: '팀 홈', desc: '5단계 progress + 팀원 상태' },
  { num: '08', path: '/prototype/idea/new', name: 'F1 자유 입력', desc: '두서없이 아이디어 작성' },
  { num: '09', path: '/prototype/ideas', name: '아이디어 모아보기', desc: '카드 그리드 (AI 이미지 썸네일)' },
  { num: '10', path: '/prototype/idea/i1', name: '아이디어 상세', desc: 'AI 정리 + 페르소나 + 댓글', star: true },
  { num: '11', path: '/prototype/vote', name: '투표', desc: '최종 아이디어 선정 (4가지 기준)' },
  { num: '12', path: '/prototype/mediate', name: 'AI 충돌 중재', desc: '선정된 아이디어의 합의/충돌 분리', star: true },
  { num: '13', path: '/prototype/brief', name: '최종 기획안', desc: '1페이지 + Export' },
  { num: '14', path: '/prototype/notifications', name: '알림', desc: '댓글·평가·AI 알림' },
];
