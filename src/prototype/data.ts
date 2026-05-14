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
  /** 댓글에 달리는 답글 (1단계 깊이만 허용) */
  replies?: Reply[];
}

export interface Reply {
  id: string;
  authorId: string;
  authorName: string;
  authorColor: string;
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
  /** PDF 기획안에서 추출한 목업 이미지 (public/ideas/*.jpg). 없으면 emoji + gradient 사용 */
  image?: string;
  /** 마지막 업데이트 텍스트 (mock) */
  updatedAt?: string;
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
  i5: 1,
  i6: 0,
  i7: 0,
  i8: 2,
};

// 현재 로그인 사용자 (mock)
export const currentUser = {
  id: 'me',
  name: '나',
  initial: '나',
  color: '#3C4883',
};

// ============= 일정 ============= //

export type ScheduleKey = 'collect' | 'feedback' | 'vote' | 'wrap';

export interface ScheduledStage {
  key: ScheduleKey;
  label: string;
  desc: string;
  /** false면 자동 계산 (사용자 수정 불가) */
  editable: boolean;
  /** 사용자가 정한 마감일 (ISO yyyy-mm-dd) */
  deadline?: string;
}

export const scheduleTemplate: ScheduledStage[] = [
  { key: 'collect', label: '아이디어 제출', desc: '팀원이 각자 자유롭게 작성', editable: true },
  { key: 'feedback', label: '피드백', desc: 'AI 분석 + 팀원 댓글·평가', editable: true },
  { key: 'vote', label: '투표', desc: '4가지 기준으로 최종 아이디어 선정', editable: true },
  { key: 'wrap', label: '마무리 (충돌 중재 + 기획안)', desc: 'AI가 정리 → Export', editable: false },
];

/**
 * 프로젝트 마감일 → 단계별 추천 일정
 * - wrap (충돌 중재 + 기획안): 프로젝트 마감일 당일 (1일)
 * - vote: 1일 (wrap 직전)
 * - feedback: 남은 일정의 40%
 * - collect: 나머지
 */
export function recommendSchedule(projectDeadline: string): ScheduledStage[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(projectDeadline);
  end.setHours(0, 0, 0, 0);
  const totalDays = Math.max(2, Math.ceil((end.getTime() - today.getTime()) / 86400000));

  const wrapDays = 1;
  const voteDays = 1;
  const remaining = Math.max(2, totalDays - wrapDays - voteDays);
  const feedbackDays = Math.max(1, Math.round(remaining * 0.4));
  const collectDays = Math.max(1, remaining - feedbackDays);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const add = (base: Date, days: number) => {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d;
  };

  const collectDeadline = add(today, collectDays);
  const feedbackDeadline = add(collectDeadline, feedbackDays);
  const voteDeadline = add(feedbackDeadline, voteDays);

  return [
    { ...scheduleTemplate[0], deadline: fmt(collectDeadline) },
    { ...scheduleTemplate[1], deadline: fmt(feedbackDeadline) },
    { ...scheduleTemplate[2], deadline: fmt(voteDeadline) },
    { ...scheduleTemplate[3], deadline: projectDeadline },
  ];
}

/** team.stage (6개) → 사용자 화면 키 (4개) */
export const stageToScheduleKey: Record<Stage, ScheduleKey> = {
  collect: 'collect',
  review: 'collect',
  feedback: 'feedback',
  vote: 'vote',
  mediate: 'wrap',
  brief: 'wrap',
};

/**
 * D-N 형태로 변환 (오늘 = D-Day)
 */
export function toDDay(isoDate: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(isoDate);
  target.setHours(0, 0, 0, 0);
  const days = Math.round((target.getTime() - today.getTime()) / 86400000);
  if (days === 0) return 'D-Day';
  if (days > 0) return `D-${days}`;
  return `D+${-days}`;
}


export const members: TeamMember[] = [
  { id: 'm1', name: '병찬', initial: '병', color: '#F87171', isHost: true, status: 'active', ideasCount: 3 },
  { id: 'm2', name: '현준', initial: '현', color: '#FB923C', isHost: false, status: 'active', ideasCount: 1 },
  { id: 'm3', name: '영준', initial: '영', color: '#A78BFA', isHost: false, status: 'writing', ideasCount: 1 },
  { id: 'm4', name: '희진', initial: '희', color: '#34D399', isHost: false, status: 'active', ideasCount: 1 },
  { id: 'm5', name: '재창', initial: '재', color: '#F472B6', isHost: false, status: 'waiting', ideasCount: 1 },
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
    authorId: 'm2',
    authorName: '현준',
    authorColor: '#FB923C',
    title: 'AI 일정 매니저',
    emoji: '📅',
    gradient: 'linear-gradient(135deg, #566CCC22, #8694DF44)',
    image: '/ideas/i1.jpg',
    rawText:
      '일정이 카톡, 포스터, 메모 여기저기 흩어져 있어서 캘린더에 다시 옮겨 적는 게 너무 귀찮음. 약속 시간 정하는 것도 매번 똑같은 고민이고. AI한테 그냥 공유만 하면 일정이 자동으로 생기고, 여러 일정 비교해서 최적 시간까지 잡아주면 좋겠음. 통제하는 게 아니라 옆에서 도와주는 느낌으로. "쓰는 게 아니라 넘기면 끝."',
    organized: {
      problem:
        '일정이 카톡·포스터·메모에 흩어져 있어 일일이 캘린더에 옮기기 번거롭고, 약속 조율 같은 반복 선택에서 결정 피로가 쌓인다. 문제는 관리가 아니라 입력의 번거로움 + 선택의 부담.',
      feature:
        '공유·이미지·음성만 하면 자동 일정 생성 / 여러 일정 비교 후 최적 시간 추천·자동 확정 / 생활패턴 학습 기반 시간 제안 / 과부하·이동 불가·휴식 필요 시 부담 완화 알림',
      target: '일정 많은 대학생·직장인, 팀 단위 사용자 (→ 메신저·캘린더 연동으로 개인 AI 매니저로 확장)',
      differentiator:
        '입력을 없앤다(쓰는 게 아니라 넘기면 끝) / 결정을 대신한다(추천이 아니라 확정까지) / 앱이 필요 없다(공유·드래그·음성 UX) / 제한하지 않는다(통제가 아닌 보조)',
      risk: '메신저·캘린더 연동 권한 / 잘못된 자동 확정에 대한 신뢰 / 기존 캘린더·일정 앱과의 경쟁',
    },
    personas: personaTemplates,
    comments: [
      {
        id: 'c1-1',
        authorId: 'm1',
        authorName: '병찬',
        authorColor: '#F87171',
        target: '핵심 기능',
        text: '"공유만 하면 자동 생성"이 핵심인데, 잘못 인식했을 때 되돌리는 UX가 같이 있어야 신뢰가 갈 듯.',
        time: '8분 전',
      },
      {
        id: 'c1-2',
        authorId: 'm4',
        authorName: '희진',
        authorColor: '#34D399',
        target: '차별점',
        text: '"확정까지"가 매력적이긴 한데 데모에서 어디까지 보여줄 수 있을지 범위를 정하면 좋겠어요.',
        time: '20분 전',
      },
    ],
    rating: 4.0,
    commentsCount: 4,
  },
  {
    id: 'i2',
    authorId: 'm3',
    authorName: '영준',
    authorColor: '#A78BFA',
    title: 'AI 숏폼 체크인',
    emoji: '🎬',
    gradient: 'linear-gradient(135deg, #8694DF33, #566CCC22)',
    image: '/ideas/i2.jpg',
    rawText:
      '과제하다 잠깐 쉬려고 쇼츠 켰는데 정신 차리면 한 시간 지나있음. 더 문제는 그 다음에 다시 과제로 돌아가기가 너무 힘듦. 차단 앱은 막기만 해서 짜증나고 결국 다른 데서 시간 버림. 막는 게 아니라 "왜 보고 싶은지" 물어보고, 잘 쉬게 해주고, 빨리 돌아오게 도와주는 게 핵심. 목표는 사용시간 감소가 아니라 복귀 시간 감소.',
    organized: {
      problem:
        '쉬려고 켠 숏폼이 알고리즘 추천으로 길어지고, 그 후 공부·과제로 복귀하지 못한다. 차단 서비스는 쉬고 싶은 욕구를 막아 반발하거나 다른 자극으로 이동하게 만든다.',
      feature:
        '숏폼 앱 실행 전 상태 체크인(피곤·회피·습관·심심·자기 전) → 상태별 대안 휴식 추천(눈 쉬기·물 마시기·짧은 산책·할 일 쪼개기·저자극 콘텐츠·오디오 휴식) → 예상 사용시간 알림 → 복귀 체크 → 휴식 리포트(진입 이유·대안 선택 횟수·평균 복귀 시간·회복 점수)',
      target: '과제·시험공부 중 집중이 자주 깨지는 대학생·수험생',
      differentiator:
        '차단하지 않는다(막는 게 아니라 보고 싶은 이유를 묻는다) / 휴식을 인정한다(쉬지 말라가 아니라 잘 쉬게 한다) / 복귀까지 돕는다(빠르게 다시 돌아오는 데 집중) / 사용 패턴과 휴식 반응을 학습',
      risk: '체크인 단계의 마찰감 / OS 차원 앱 사용 제어 권한 / 사용자가 체크인을 건너뛸 동기',
    },
    personas: personaTemplates,
    comments: [
      {
        id: 'c2-1',
        authorId: 'm2',
        authorName: '현준',
        authorColor: '#FB923C',
        text: '"복귀 시간 감소"라는 지표 설정이 좋네요. 회복 점수를 어떻게 계산할지가 관건일 듯.',
        time: '12분 전',
      },
    ],
    rating: 3.6,
    commentsCount: 2,
  },
  {
    id: 'i3',
    authorId: 'm4',
    authorName: '희진',
    authorColor: '#34D399',
    title: '음성으로 찾는 재취업',
    emoji: '🎙️',
    gradient: 'linear-gradient(135deg, #8694DF22, #E8EBF7AA)',
    image: '/ideas/i3.jpg',
    rawText:
      '고령층이나 경력단절 여성분들이 고용24, 정부24 같은 데서 일자리 찾으려면 회원가입·본인인증·신청서·파일 업로드... 이게 다 벽임. "집 근처 주 3일 일자리 찾아줘" 하고 말로 물어보면 AI가 찾아주고, 신청까지 단계별로 같이 해주면 좋겠음. 큰 글씨, 단순한 버튼으로. 보호자(자녀·요양보호사)가 연동해서 도와줄 수도 있게.',
    organized: {
      problem:
        '고용24·정부24 등 플랫폼은 많지만 복잡한 회원가입·본인인증·신청서 작성·파일 업로드가 디지털 취약계층에게 높은 진입장벽이다. 정보를 이해하고 실행하는 과정 자체에서 접근 장벽이 발생한다.',
      feature:
        '음성 검색("집 근처 주3일 가능한 일자리") → 연령·경력·생활패턴·지역 기반 일자리 추천 → 회원가입·신청서 작성·제출 서류 준비 단계별 안내 → 큰 글씨·단순 버튼·단계형 진행 UI → 이용 패턴 학습으로 재취업 프로그램·공공 교육 추천 → 가족 연동(보호자 도움) 기능',
      target: '정년퇴임 후 재취업 희망 고령층, 경력단절 여성, 디지털 취약계층',
      differentiator:
        '복잡한 공고·신청 절차를 AI가 쉬운 언어와 단계형 UX/UI로 재구성하고, 상황에 맞는 현실적인 일자리를 추천해 "실행"까지 동행 — 정보 탐색부터 서류 제출까지 디지털 피로도를 줄인다',
      risk: '공공 채용 데이터/API 연동 / 본인인증·개인정보 처리 책임 / 고령층 발화에 대한 음성 인식 정확도',
    },
    personas: personaTemplates,
    comments: [],
    rating: 4.1,
    commentsCount: 3,
  },
  {
    id: 'i4',
    authorId: 'm5',
    authorName: '재창',
    authorColor: '#F472B6',
    title: '펫 라이프 AI 가계부',
    emoji: '🐾',
    gradient: 'linear-gradient(135deg, #566CCC22, #8694DF44)',
    rawText:
      '반려동물 키우면 사료·간식·미용·병원비... 돈이 새는데 얼마나 쓰는지 감이 안 옴. 의료비는 예측도 안 되고. 카드 내역이랑 영수증 넣으면 카테고리별로 정리해주고, 품종·나이별 질병 확률이랑 비용 증가 그래프도 보여주고, 재고 떨어지면 자동 주문까지 해주는 가계부. "펫 라이프의 새어나감을 없앤다."',
    organized: {
      problem:
        '반려동물 양육비는 사료·간식·미용 같은 반복 지출에 예측 불가능한 의료비까지 더해지지만, 소비와 건강이 연결되지 않아 어디서 새는지 알기 어렵다.',
      feature:
        '카드·영수증 자동 분류(식비/병원비/미용비/용품비) + 소비 패턴 분석·시뮬레이션 / 품종·나이별 질병 확률 데이터와 비용 증가 그래프 / 행동 기반 소비 원인 추론(예: 간식 증가 + 특정 시간대 집중 → 분리불안 가능성) / 일일 소비량 기반 재고·구독 자동 관리 및 자동 주문',
      target: '지출 부담을 느끼는 반려동물 보호자 (특히 다견·다묘 가정)',
      differentiator:
        '기존 AI 펫 서비스가 진단·관리 중심이라면, 이건 "소비"를 중심에 둔 AI 가계부 — 건강 이력과 지출을 연결해 낭비를 찾아내고 줄여준다. 이커머스·보험·병원 연계로 확장 가능.',
      risk: '카드·영수증 데이터 연동과 정확한 분류 / 의료비 예측 모델의 신뢰도 / 기존 가계부 앱이 기능 추가로 모방 가능',
    },
    personas: personaTemplates,
    comments: [],
    rating: 3.5,
    commentsCount: 2,
  },
  {
    id: 'i5',
    authorId: 'me',
    authorName: '나',
    authorColor: '#3C4883',
    title: '어디까지 했더라',
    emoji: '🗂️',
    gradient: 'linear-gradient(135deg, #3C488322, #566CCC44)',
    image: '/ideas/i5.jpg',
    rawText:
      '하루에도 전공 수업, 동아리, 사이드 프로젝트... 모드를 계속 바꾸는데 그때마다 "어디까지 했더라" 떠올리고 앱이랑 자료 다시 세팅하는 데 시간 다 씀. Mac 노치에 모드별 환경 두고, 모드 켜면 뒤에서 조용히 클립보드랑 방문 URL 모아두고, 모드 끄면 AI가 요약해주고, 다시 들어오면 그 요약이랑 자주 쓰던 앱 바로 띄워주면 좋겠음. 노치에 던지기만 하면 끝.',
    organized: {
      problem:
        '대학생·직장인은 하루에도 여러 모드(전공/교양/동아리/업무/사이드)를 오가는데, 전환할 때마다 "어디까지 했더라"를 떠올리고 관련 앱·자료를 다시 세팅하느라 시간을 쓴다. 미처 기록하지 못했거나 오래 지나 돌아오면 다시 불러오는 데 비용이 든다.',
      feature:
        'Mac 노치 영역으로 학습/직장/프로젝트 등 현재 모드에 맞는 환경으로 전환 → 모드 중 클립보드·방문 URL 자동 수집(원하면 파일도) → 모드 실행 중 이전 세션 정보 불러오기·검색 → 모드 종료 시 AI 요약 생성·자주 쓴 앱 기록 → 재진입 시 이전 세션 요약 + 환경 복원 → 수집 데이터 기반 블로그 초안·주간 리포트·다음 활동 제안',
      target: '여러 맥락을 빠르게 오가는 대학생·지식 노동자 (Mac 사용자)',
      differentiator:
        '기존 클립보드 앱은 임시 보관·표시 도구 — 이건 모드별로 보관·분석·리포트·재활용까지. 원본은 사용자 기기에만 머무르고 분석 전 1차 필터링으로 개인정보 유출 방지. 저장에 그치지 않고 리포트·활동 추천으로 더 나은 활동을 유도.',
      risk: 'macOS 노치/백그라운드 수집 권한과 샌드박스 제약 / 자동 수집의 프라이버시 우려 / Mac 한정으로 시장 제한',
    },
    personas: personaTemplates,
    comments: [
      {
        id: 'c5-1',
        authorId: 'm1',
        authorName: '병찬',
        authorColor: '#F87171',
        target: '차별점',
        text: '노치 UX가 데모에서 제일 인상적일 것 같아요. 다만 "수집"이 무섭게 느껴질 수 있어서 프라이버시 메시지를 앞에 세우면 좋겠어요.',
        time: '5분 전',
      },
    ],
    rating: 3.9,
    commentsCount: 3,
  },
  {
    id: 'i6',
    authorId: 'm1',
    authorName: '병찬',
    authorColor: '#F87171',
    title: 'AI 발표 연습 코치',
    emoji: '🎤',
    gradient: 'linear-gradient(135deg, #3C488322, #566CCC33)',
    rawText:
      'PPT는 만들었는데 막상 뭐라고 말해야 할지 모르겠고, 발표문 써도 말하면 어색함. 외우려고 반복해서 읽는 건 너무 비효율적임. 기존 AI 도구는 대본 만들어주고 끝이라 연습은 결국 혼자 해야 됨. PPT 올리면 발표문 만들어주고, AI가 진짜 발표하듯 읽어주고(억양·강조·쉬는 타이밍), 이동 중에 반복해서 들으면서 흐름을 체화하고, 내가 연습하면 말 속도·버벅임 피드백까지. "발표는 암기가 아니라 익숙함에서 나온다."',
    organized: {
      problem:
        '발표 준비에서 PPT는 만들지만 어떻게 말할지 모르고, 직접 쓴 발표문은 어색하며, 반복해 외우는 방식은 비효율적이고 피로하다. 혼자 연습해 자신의 문제점을 객관적으로 보기 어렵다. 기존 AI 도구는 "대본 생성"에서 끝나 연습·체화를 돕지 않는다.',
      feature:
        'PPT 업로드 → 흐름·핵심 키워드·발표 목적·예상 시간 분석해 발표문 자동 생성 / 스타일별 버전(교수 발표형·TED·스타트업 IR·간결형·스토리텔링형) / AI 음성 발표(억양·강조·쉬는 타이밍·속도 반영) / 반복 청취 기반 체화 / 사용자 발표 녹음 분석 피드백(말 속도·발음·버벅임·반복 표현·긴장 구간)',
      target: '발표를 앞둔 대학생, 취업 면접·PT 준비자, 공모전·발표 대회 참가자',
      differentiator:
        '기존 발표 AI가 "발표문 생성" 중심이라면, 이건 "발표 연습과 체화" 중심 — AI 음성 반복 청취 + 발표 스타일 최적화 + 발표자 맞춤 피드백으로 기존 발표 준비 방식의 비효율을 개선한다.',
      risk: '고품질 음성 합성 비용 / PPT 의미 분석의 정확도 / 발표 피드백 모델의 신뢰성 / 기존 발표 AI의 기능 확장',
    },
    personas: personaTemplates,
    comments: [
      {
        id: 'c6-1',
        authorId: 'm3',
        authorName: '영준',
        authorColor: '#A78BFA',
        text: '아이디어톤 발표 자체에도 우리가 써볼 수 있겠는데요 ㅋㅋ 데모랑 메타가 잘 맞음.',
        time: '7분 전',
      },
      {
        id: 'c6-2',
        authorId: 'm2',
        authorName: '현준',
        authorColor: '#FB923C',
        target: '핵심 기능',
        text: '음성 합성 비용이 부담될 수 있어서, MVP는 텍스트 발표문 + 스타일 변환까지만 잡는 것도 방법.',
        time: '14분 전',
      },
    ],
    rating: 4.3,
    commentsCount: 5,
  },
  {
    id: 'i7',
    authorId: 'm1',
    authorName: '병찬',
    authorColor: '#F87171',
    title: 'DJ 곡 구조 분석기',
    emoji: '🎧',
    gradient: 'linear-gradient(135deg, #8694DF22, #3C488333)',
    rawText:
      'DJ가 믹싱 전에 곡 일일이 들으면서 인트로 몇 마디인지, 훅 어디서 시작하는지, 아웃트로 몇 마디 남았는지, 어디서 다음 곡 넣어야 자연스러운지 다 직접 분석해야 됨. 특히 K-POP은 구조 변화 빠르고 보컬 중심이라 초보는 더 어려움. 기존 DJ 프로그램은 BPM, Key, 파형만 보여줌. 음원 올리면 구간별 마디 수 자동으로 뽑아주고 큐 포인트도 찍어주면 좋겠음.',
    organized: {
      problem:
        'DJ는 믹싱 전 곡을 직접 들으며 Intro/Verse/Hook/Outro 마디 수와 믹스 인·아웃 지점을 분석해야 한다. 특히 K-POP은 곡 구조 변화가 빠르고 보컬 중심이라 초보 DJ에게 진입장벽이며, 기존 DJ 소프트웨어는 BPM·Key·Waveform 중심 정보만 준다.',
      feature:
        '음원 업로드 → BPM·다운비트·Phrase·마디 단위 구조 자동 분석 / 구간별 마디 수 자동 표시(Intro 8 / Verse 16 / Pre-Hook 8 / Hook 16 / Bridge 8 / Outro 8) / 자동 Cue Point(Mix In·Out, 훅 시작, 보컬 진입, 드롭 직전) / 플레이 보조("32마디 후 믹스 인 추천", 보컬 겹침 위험, 에너지 전환 타이밍, Loop 추천 구간) / K-POP 특화 구조 모델(프리훅-훅 중심, 브릿지 전환, 보컬 밀도 변화)',
      target: '초보 DJ, K-POP DJ, 개인 믹스셋 준비자 (B2B: rekordbox·Serato 플러그인, DJ 학원·교육 플랫폼)',
      differentiator:
        'BPM·Key·Beatgrid 분석을 넘어 "DJ의 실제 workflow(곡 구조 이해, 다음 곡 진입 타이밍)"를 분석·자동화 — K-POP 특유의 빠른 전개에 특화해 반복 작업을 줄이고 입문자 진입장벽을 낮춘다.',
      risk: '음원 구조 인식 모델의 정확도 / 음원 저작권·업로드 처리 / 니치한 사용자층 / rekordbox·Serato 등 외부 플랫폼 의존',
    },
    personas: personaTemplates,
    comments: [],
    rating: 3.3,
    commentsCount: 2,
  },
  {
    id: 'i8',
    authorId: 'm1',
    authorName: '병찬',
    authorColor: '#F87171',
    title: 'AI 팀 프로젝트 매니저',
    emoji: '🧶',
    gradient: 'linear-gradient(135deg, #3C488333, #8694DF44)',
    image: '/ideas/i8.jpg',
    rawText:
      '팀플 진짜 병목은 초반 기획임. 시간 안 맞아서 모이기도 힘들고 아이디어는 카톡·메모장·구글 문서에 다 흩어짐. 기획안 정해도 산출물 목록, 역할 분담, 일정이 불분명해서 팀장 한두 명이 다 떠안음. 흩어진 아이디어 한 곳에 모으고, AI가 비동기로 평가하고, 투표로 정하면 AI가 산출물·역할·일정 구조로 자동 변환하고 PPT 초안까지 만들어주는 거. 단순 협업 공간이 아니라 아이디어를 "제출 가능한 결과물"로 바꿔주는 매니저.',
    organized: {
      problem:
        '팀 프로젝트의 실질적 병목은 초기 기획 단계 — 일정이 달라 대면 회의가 어렵고, 아이디어는 카톡·메모장·구글 문서에 흩어진다. 기획안 선정 이후에도 산출물 목록·역할 분담·일정 수립이 불분명해 팀장 한두 명이 모든 부담을 떠안는다. 아이디어 수렴 → 기획안 선정 → 역할 분담 → 실행 계획 → 발표자료 제작까지의 흐름이 끊긴다.',
      feature:
        '비동기 아이디어 작성·댓글·투표 / AI 아이디어 분석(문제 공감성·실현 가능성·차별성·리스크 기준 자동 비교) / 기준별 투표로 기획안 선정 / 선정안을 문제 정의·핵심 기능·비즈니스 모델·발표 대본 등 작업 단위로 AI 산출물 구조화 / 특기·작업량·마감 고려한 AI 역할 분담 / 진행 알림·리마인드(오늘 할 일·마감 위험 작업·미제출 자료·전체 진행률) / Claude MCP 연동 PPT 자동 생성',
      target: '대학생 조별과제 팀, 공모전·아이디어톤·해커톤 참가 팀, 창업동아리, 팀 프로젝트 기반 수업, 기업 신입사원 교육 팀',
      differentiator:
        '카톡(아이디어·결정이 대화 속에 유실), Notion(구조를 직접 만들어야), Google Docs(역할·진행 관리 없음), Trello/Asana(아이디어 평가·기획 구조화 불가), ChatGPT(팀 전체 흐름을 지속 관리 안 함)와 달리 — 단순 협업 공간이 아닌, 아이디어를 제출 가능한 결과물로 바꿔주는 AI 팀 프로젝트 매니저.',
      risk: 'AI 산출물 구조화의 품질 / 팀원 전원의 비동기 참여 유도 / 외부 연동(Notion·Google Drive·MCP)의 안정성 / 범용 협업툴과의 경쟁',
    },
    personas: personaTemplates,
    comments: [
      {
        id: 'c8-1',
        authorId: 'm2',
        authorName: '현준',
        authorColor: '#FB923C',
        text: '지금 우리 팀이 겪고 있는 그 문제 그대로네요. 우리가 이걸로 이 아이디어톤을 진행하는 그림이 제일 설득력 있을 듯.',
        time: '4분 전',
        replies: [
          {
            id: 'r8-1-1',
            authorId: 'm1',
            authorName: '병찬',
            authorColor: '#F87171',
            text: '맞아요, 메타로 가는 게 발표에서 가장 강한 그림이에요.',
            time: '3분 전',
          },
          {
            id: 'r8-1-2',
            authorId: 'me',
            authorName: '나',
            authorColor: '#3C4883',
            text: '저도 동의. 데모에서 우리 팀 화면을 그대로 보여주는 메타가 임팩트 좋을 거예요.',
            time: '1분 전',
          },
        ],
      },
      {
        id: 'c8-2',
        authorId: 'm3',
        authorName: '영준',
        authorColor: '#A78BFA',
        target: '차별점',
        text: 'Notion·Trello랑 뭐가 다르냐는 질문이 무조건 나올 텐데, "평가→구조화→산출물"이 차별점이라는 걸 한 문장으로 못 박아두면 좋겠어요.',
        time: '11분 전',
        replies: [
          {
            id: 'r8-2-1',
            authorId: 'm2',
            authorName: '현준',
            authorColor: '#FB923C',
            text: '"아이디어를 제출 가능한 결과물로 바꿔주는 매니저" — 이 한 줄을 hero에 박아두면 어떨까요?',
            time: '8분 전',
          },
        ],
      },
      {
        id: 'c8-3',
        authorId: 'm4',
        authorName: '희진',
        authorColor: '#34D399',
        target: '핵심 기능',
        text: 'PPT 자동 생성까지는 데모 시간상 무리일 수 있으니, 아이디어 수렴 → AI 분석 → 투표 → 산출물 구조화까지를 핵심 시연 범위로 잡는 게 안전할 것 같아요.',
        time: '18분 전',
      },
    ],
    rating: 4.6,
    commentsCount: 8,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'comment',
    text: '병찬님이 내 아이디어 \'어디까지 했더라\'의 "차별점"에 댓글을 달았어요',
    time: '5분 전',
    unread: true,
    target: '/prototype/idea/i5',
  },
  {
    id: 'n2',
    type: 'ai',
    text: 'AI 페르소나 비평이 완료됐어요 (4명) — \'어디까지 했더라\'',
    time: '8분 전',
    unread: true,
    target: '/prototype/idea/i5',
  },
  {
    id: 'n3',
    type: 'rating',
    text: '희진님이 내 아이디어에 별점 4.0을 매겼어요',
    time: '12분 전',
    unread: true,
  },
  {
    id: 'n4',
    type: 'member',
    text: '재창님이 팀에 합류했어요',
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

// ============= 플랜 (Wave 비즈니스 모델) ============= //
export interface PlanDef {
  key: Plan;
  name: string;
  price: string;
  sub: string;
  /** 추천 팀 규모 (Plus 4인 / Pro 6인) */
  teamSize?: string;
  recommended?: boolean;
  /** AI 기능 포함 여부 (Free=false, Plus/Pro=true) */
  aiIncluded: boolean;
  features: string[];
}

export const plans: PlanDef[] = [
  {
    key: 'free',
    name: 'Free',
    price: '무료',
    sub: '체험·소규모',
    aiIncluded: false,
    features: [
      '게시판형 아이디어 공유 · 댓글 · 답글',
      '1v1 토너먼트 투표',
      '단계별 일정 관리',
      '최종 기획안 피드백 (텍스트)',
    ],
  },
  {
    key: 'plus',
    name: 'Plus',
    price: '9,900원',
    sub: '/ 팀 / 프로젝트',
    teamSize: '4인 기준 추천',
    recommended: true,
    aiIncluded: true,
    features: [
      'Free 의 모든 기능',
      'AI 페르소나 비평·요약',
      'AI 썸네일 자동 생성',
      'AI 최종 산출물 (PPT 초안 · 기획안 · 좋은점/주의점 요약)',
      'AI 채팅 (사용량 제한)',
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '19,900원',
    sub: '/ 팀 / 프로젝트',
    teamSize: '6인 기준 추천',
    aiIncluded: true,
    features: [
      'Free + Plus 의 모든 기능',
      'AI 사용량 대폭 확대 (장문 산출물·대량 비평)',
      '우선 처리 (응답 속도)',
      'PPT · PDF · Notion · Google Docs export',
    ],
  },
];

// ============= 온보딩 STEP3 프리셋 ============= //
export const topicPresets = [
  'AI 협업툴',
  '교육·러닝',
  '헬스케어',
  '환경·지속가능성',
  '라이프스타일',
  '엔터테인먼트',
  '핀테크',
  '커뮤니티',
];

export const criterionPresets = [
  { key: 'feasibility', label: '실현 가능성' },
  { key: 'unique', label: '차별성' },
  { key: 'pitch', label: '발표 가능성' },
  { key: 'market', label: '시장성' },
  { key: 'impact', label: '임팩트' },
  { key: 'tech', label: '기술 난이도' },
];

// ============= 런타임 헬퍼 ============= //

/** 현재 팀의 플랜 (온보딩에서 sessionStorage 저장, 없으면 team.plan) */
export function getCurrentPlan(): Plan {
  if (typeof window === 'undefined') return team.plan;
  const stored = sessionStorage.getItem('weave:plan') as Plan | null;
  return stored ?? team.plan;
}

/** 유료 플랜 여부 — Plus/Pro 만 AI 기능 사용 가능 */
export function isPaidPlan(plan: Plan = getCurrentPlan()): boolean {
  return plan !== 'free';
}

/** id 기반 mock 업데이트 시간 (i1~i8 에 일관되게 매핑) */
const mockUpdates = ['방금', '5분 전', '12분 전', '30분 전', '1시간 전', '3시간 전', '6시간 전', '어제'];
export function mockUpdatedAt(ideaId: string): string {
  const idx = ideas.findIndex((i) => i.id === ideaId);
  if (idx === -1) return '최근';
  return mockUpdates[idx % mockUpdates.length];
}

// 화면 리스트 (런처용)
export const screenList = [
  { num: '00', path: '/prototype/splash', name: '스플래시', desc: '0 → W → 1 로고 애니메이션', star: true },
  { num: '01', path: '/prototype/landing', name: 'Landing', desc: '서비스 소개 + 카카오 로그인' },
  { num: '03', path: '/prototype/onboarding', name: '온보딩', desc: '유형 → 마감 → 주제·기준 → 팀 → 플랜 → 완료 (6 step)' },
  { num: '04', path: '/prototype/plan', name: '결제 플랜 선택', desc: 'Free / Plus(4인) / Pro(6인) — 업그레이드 전용' },
  { num: '05', path: '/prototype/invite', name: '팀원 초대', desc: '카톡 공유 + 링크 복사' },
  { num: '06', path: '/prototype/join', name: '초대 수락', desc: '팀원이 카톡 링크 클릭 시' },
  { num: '07', path: '/prototype/team', name: '팀 홈', desc: '진행 단계 + 아이디어 피드 + 플로팅 액션', star: true },
  { num: '08', path: '/prototype/idea/new', name: '아이디어 작성', desc: '두서없이 작성 → AI 가 정리' },
  { num: '09', path: '/prototype/ideas', name: '아이디어 목록', desc: '카드 그리드 + 정렬' },
  { num: '10', path: '/prototype/idea/i8', name: '아이디어 상세', desc: 'AI 정리 · 페르소나 · 댓글·답글', star: true },
  { num: '11', path: '/prototype/idea/i8/edit', name: '아이디어 수정', desc: '무료: 텍스트 수정 · 유료: AI 재정리' },
  { num: '12', path: '/prototype/vote', name: '투표', desc: '1v1 라운드로빈 대결' },
  { num: '13', path: '/prototype/vote/result', name: '투표 결과', desc: '순위만 공개 · 재투표 요청', star: true },
  { num: '14', path: '/prototype/brief', name: '최종 기획안', desc: '좋은점·주의점 요약 + Export', star: true },
  { num: '15', path: '/prototype/chat', name: 'AI 채팅', desc: '유료 전용 — 팀과 AI 가 함께 (페이월)' },
  { num: '16', path: '/prototype/notifications', name: '알림', desc: '댓글·평가·AI 알림' },
  { num: '17', path: '/prototype/mediate', name: 'AI 충돌 중재 (legacy)', desc: '구버전 — FinalBrief 의 요약으로 흡수됨' },
];
