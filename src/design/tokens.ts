/**
 * Weave 디자인 토큰 (TS export)
 *
 * Tailwind 클래스로 못 다루는 경우(인라인 스타일, SVG fill, JS 계산, canvas 등)에서
 * 가져다 쓸 수 있도록 한 곳에서 export. 값 출처는 `tailwind.config.js` / `src/index.css` / `design/DESIGN_SYSTEM.md`와 동일.
 *
 * **단일 출처 원칙**: 같은 색을 두 곳에 hex로 박지 말 것. 새 컴포넌트는 가급적 Tailwind 클래스를 쓰고,
 * 클래스로 안 되는 경우에만 여기서 import.
 */

export const color = {
  primary: '#566CCC',
  primaryLight: '#8694DF',
  primaryDark: '#3C4883',
  accent: '#3C4883',
  accentSoft: '#E8EBF7',

  surface: '#FFFFFF',
  paper: '#F6F7FB',
  surfaceAlt: '#EEF1F8',
  border: '#E3E6F0',
  muted: '#64748B',
  text: '#0F172A',

  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',

  kakao: '#FEE500',
  kakaoText: '#181600',
} as const;

export const persona = {
  user: '#FB923C',
  skeptic: '#A78BFA',
  realist: '#34D399',
  judge: '#F87171',
  timekeeper: '#60A5FA',
  vc: '#F472B6',
} as const;

export type PersonaKey = keyof typeof persona;

/** 8pt grid */
export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const radius = {
  md: 10,
  lg: 14,
  xl: 18,
  '2xl': 20,
  full: 9999,
} as const;

/** primary-dark 베이스의 푸른 그림자. shadow가 필요한 경우에만 사용. */
export const shadow = {
  sm: '0 1px 2px rgba(60,72,131,0.06)',
  md: '0 4px 14px rgba(60,72,131,0.10)',
  lg: '0 12px 36px rgba(60,72,131,0.14)',
} as const;

export const motion = {
  ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  durationPage: 600,
  durationTap: 150,
} as const;

/** 페이지 컨테이너 폭 — iPhone 14 Pro 기준 + 데스크탑 여유 */
export const layout = {
  pageMaxWidth: 440,
  pagePaddingX: 20,
  headerHeight: 56,
  bottomCTAReservedHeight: 96,
} as const;
