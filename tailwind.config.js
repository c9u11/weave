/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core (Thread direction)
        primary: '#1E1B4B',
        accent: '#B45309',
        'accent-soft': '#FCD34D',
        paper: '#F5F0E6',
        surface: '#FFFAF0',
        'surface-alt': '#FAFAF9',
        border: '#E7DFD0',
        muted: '#78716C',
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
        sm: '0 1px 2px rgba(15,23,42,0.05)',
        md: '0 4px 12px rgba(15,23,42,0.08)',
        lg: '0 12px 32px rgba(15,23,42,0.12)',
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
