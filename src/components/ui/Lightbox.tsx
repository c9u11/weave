import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface LightboxProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const STEP = 0.5;

/**
 * 이미지 라이트박스 — 다크 배경 + 확대/축소 + 드래그 pan.
 * - +/- 버튼으로 1x ~ 3x 확대
 * - 확대된 상태에서 마우스/터치 드래그로 위치 조정
 * - X 버튼 또는 배경 클릭으로 닫힘
 */
export function Lightbox({ src, alt = '확대 보기', onClose }: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);

  // ESC 로 닫힘
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, +(s + STEP).toFixed(2)));
  const zoomOut = () => {
    const next = Math.max(MIN_SCALE, +(scale - STEP).toFixed(2));
    setScale(next);
    if (next === MIN_SCALE) setPan({ x: 0, y: 0 });
  };
  const reset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (scale <= 1) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.panX + dx, y: dragRef.current.panY + dy });
  };
  const onPointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragRef.current) return;
    (e.target as Element).releasePointerCapture(e.pointerId);
    dragRef.current = null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 sheet-backdrop-enter flex items-center justify-center p-6">
      {/* 배경 클릭으로 닫힘 */}
      <button
        onClick={onClose}
        className="absolute inset-0"
        aria-label="배경 클릭으로 닫기"
      />

      {/* 컨트롤 */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <ZoomButton onClick={zoomOut} disabled={scale <= MIN_SCALE} aria-label="축소">
          <ZoomOut size={18} />
        </ZoomButton>
        <span className="text-white/80 text-xs font-semibold w-10 text-center select-none">
          {Math.round(scale * 100)}%
        </span>
        <ZoomButton onClick={zoomIn} disabled={scale >= MAX_SCALE} aria-label="확대">
          <ZoomIn size={18} />
        </ZoomButton>
        <ZoomButton onClick={reset} disabled={scale === 1 && pan.x === 0 && pan.y === 0} aria-label="초기화">
          <RotateCcw size={18} />
        </ZoomButton>
        <ZoomButton onClick={onClose} aria-label="닫기">
          <X size={20} />
        </ZoomButton>
      </div>

      {/* 이미지 */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="lightbox-enter relative max-w-full max-h-full object-contain rounded-xl select-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transition: dragRef.current ? 'none' : 'transform 180ms ease-out',
          cursor: scale > 1 ? (dragRef.current ? 'grabbing' : 'grab') : 'default',
          touchAction: 'none',
        }}
      />
    </div>
  );
}

function ZoomButton({
  onClick,
  disabled,
  children,
  ...rest
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
} & React.AriaAttributes) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      {...rest}
    >
      {children}
    </button>
  );
}
