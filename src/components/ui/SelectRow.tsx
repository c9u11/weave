import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface SelectRowProps {
  label: string;
  value?: ReactNode;
  onClick?: () => void;
  /** chevron 숨김 (읽기 전용 row 용) */
  readOnly?: boolean;
}

/**
 * 라벨 + 보조값 + 우측 chevron 형태의 select row.
 * 그룹 카드 내부에서 사용. divide-y 로 row 사이 구분선 그림.
 */
export function SelectRow({ label, value, onClick, readOnly }: SelectRowProps) {
  const interactive = !readOnly && !!onClick;
  const Tag = interactive ? 'button' : 'div';

  return (
    <Tag
      onClick={interactive ? onClick : undefined}
      className={`w-full flex items-start justify-between gap-3 py-4 text-left ${
        interactive ? 'hover:bg-surface-alt/40 transition-colors -mx-2 px-2 rounded-lg' : ''
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="text-base font-semibold text-slate-900">{label}</div>
        {value !== undefined && (
          <div className="text-sm text-muted mt-1 leading-relaxed break-keep">
            {value}
          </div>
        )}
      </div>
      {!readOnly && (
        <ChevronRight size={20} className="text-muted flex-shrink-0 mt-0.5" />
      )}
    </Tag>
  );
}
