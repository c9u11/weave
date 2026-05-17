import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant =
  | 'primary'
  | 'accent'
  | 'outline'
  | 'ghost'
  | 'kakao'
  | 'google'
  | 'danger';

type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// kakao/google는 rounded-lg, 나머지는 rounded-2xl
const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:opacity-90 rounded-2xl',
  accent: 'bg-accent text-white hover:opacity-90 rounded-2xl',
  outline:
    'bg-white border border-border text-primary-dark hover:bg-surface-alt rounded-2xl',
  ghost: 'bg-transparent text-muted hover:text-primary-dark rounded-2xl',
  kakao: 'bg-kakao text-kakao-text hover:opacity-90 rounded-lg',
  google:
    'bg-white border border-border text-slate-900 hover:bg-surface-alt rounded-lg',
  danger: 'bg-danger text-white hover:opacity-90 rounded-2xl',
};

// lg = 메인 CTA(h-14), md/sm은 보조 버튼·인라인 액션용
const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-[13px]',
  md: 'h-11 px-4 text-sm',
  lg: 'h-14 px-5 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      fullWidth,
      leftIcon,
      rightIcon,
      className = '',
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold tracking-tight
        transition-all duration-150 active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}
      `}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  ),
);
Button.displayName = 'Button';
