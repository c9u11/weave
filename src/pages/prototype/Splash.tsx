import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { WeaveMark } from '../../components/brand/WeaveMark';

/**
 * Splash — 윙·웨이브 마크가 부드럽게 떠오르며 "Weave" 워드마크 노출.
 * Landing 진입 전 짧은 브랜드 인트로 (~2.2s).
 */
export default function Splash() {
  const navigate = useNavigate();
  const [nonce, setNonce] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 2200);
    return () => window.clearTimeout(t);
  }, [nonce]);

  const replay = () => {
    setDone(false);
    setNonce((n) => n + 1);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-6">
      <div key={nonce} className="flex flex-col items-center">
        <WeaveMark className="splash-mark w-[200px] sm:w-[240px] h-auto text-primary" />

        <div className="splash-label mt-6 text-center">
          <div className="text-[32px] font-bold tracking-tight text-primary-dark">
            Weave
          </div>
          <div className="text-sm text-muted mt-1">
            시작에 헤매는 시간을 없애다
          </div>
        </div>
      </div>

      <div
        className={`mt-10 flex items-center gap-3 transition-opacity duration-500 ${
          done ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={replay}
          className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-primary-dark px-3 py-2 rounded-lg border border-border bg-surface transition-colors"
        >
          <RotateCcw size={13} />
          다시 보기
        </button>
        <button
          onClick={() => navigate('/prototype/landing')}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-primary px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          시작하기
          <ArrowRight size={13} />
        </button>
      </div>

      <a
        href="/prototype"
        className="fixed top-4 left-4 text-xs text-muted hover:text-primary-dark transition-colors"
      >
        ← 프로토타입 메뉴
      </a>
    </div>
  );
}
