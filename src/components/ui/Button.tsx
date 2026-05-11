import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'kakao' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-paper hover:opacity-90',
  accent: 'bg-accent text-white hover:opacity-90',
  outline: 'bg-transparent border-[1.5px] border-primary text-primary hover:bg-primary hover:text-paper',
  ghost: 'bg-transparent text-primary hover:bg-surface',
  kakao: 'bg-kakao text-kakao-text hover:opacity-90',
  danger: 'bg-danger text-white hover:opacity-90',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-2 text-[13px]',
  md: 'px-5 py-3 text-[15px]',
  lg: 'px-6 py-3.5 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', fullWidth, leftIcon, rightIcon, className = '', children, ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={`
        inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight
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
  )
);
Button.displayName = 'Button';
