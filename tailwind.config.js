/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core (Wave direction) — blue/purple scale
        primary: '#566CCC',         // 메인
        'primary-light': '#8694DF', // 보조
        'primary-dark': '#3C4883',  // 딥 강조
        // accent 토큰은 호환을 위해 유지하되 primary scale 의 alias 로 동작
        accent: '#3C4883',        // = primary-dark (강조)
        'accent-soft': '#E8EBF7', // 옅은 primary 틴트 (배지·하이라이트 bg)
        // Cool 뉴트럴 surfaces
        paper: '#F6F7FB',
        surface: '#FFFFFF',
        'surface-alt': '#EEF1F8',
        border: '#E3E6F0',
        muted: '#64748B',
        // Personas
        persona: {
          user: '#FB923C',
          skeptic: '#A78BFA',
          realist: '#34D399',
          judge: '#F87171',
          timekeeper: '#60A5FA',
          vc: '#F472B6',
        },
        // States
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
        // Kakao
        kakao: {
          DEFAULT: '#FEE500',
          text: '#181600',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        mono: ['SF Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '18px',
      },
      boxShadow: {
        // Blue-tinted shadows — base = primary-dark #3C4883
        sm: '0 1px 2px rgba(60,72,131,0.06)',
        md: '0 4px 14px rgba(60,72,131,0.10)',
        lg: '0 12px 36px rgba(60,72,131,0.14)',
      },
      transitionTimingFunction: {
        wave: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      transitionDuration: {
        wave: '600ms',
      },
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.03em',
        wide: '0.12em',
      },
    },
  },
  plugins: [],
};
