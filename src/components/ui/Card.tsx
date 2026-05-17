import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 선택된 상태 — primary 보더 + soft 틴트 bg (예: 플랜 선택) */
  selected?: boolean;
  /** soft 톤 카드 (정보 노티스용 — accent-soft 배경 + 보더 없음) */
  tone?: 'default' | 'soft';
  /** @deprecated `selected` 사용 */
  featured?: boolean;
  children: ReactNode;
}

export function Card({
  selected,
  featured,
  tone = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  const isSelected = selected ?? featured;

  const base = 'rounded-2xl p-5 transition-colors';
  const variant = isSelected
    ? 'border-2 border-primary bg-accent-soft'
    : tone === 'soft'
      ? 'bg-accent-soft'
      : 'bg-surface border border-border';

  return (
    <div className={`${base} ${variant} ${className}`} {...props}>
      {children}
    </div>
  );
}
