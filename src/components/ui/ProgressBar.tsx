interface ProgressBarProps {
  /** 0..1 사이 비율 */
  value: number;
  className?: string;
}

/** 라이너 진행바 (헤더 아래 단계 표시용) */
export function ProgressBar({ value, className = '' }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div
      className={`h-1.5 w-full rounded-full bg-surface-alt overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-primary transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%`, backgroundColor: '#566CCC' }}
      />
    </div>
  );
}
