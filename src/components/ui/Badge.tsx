import type { ReactNode } from 'react';

type Variant = 'default' | 'accent' | 'soft' | 'success' | 'warning' | 'danger' | 'new';

interface BadgeProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  default: 'bg-border text-primary',
  accent: 'bg-accent text-white',
  soft: 'bg-accent-soft/40 text-accent',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
  new: 'bg-success/20 text-success',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
