import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  featured?: boolean;
  children: ReactNode;
}

export function Card({ featured, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`
        bg-surface rounded-lg p-5 transition-all
        ${featured ? 'border-2 border-accent' : 'border border-border'}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
