import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';

interface PrototypeLayoutProps {
  title?: string;
  subtitle?: string;
  backTo?: string;
  showBell?: boolean;
  bellCount?: number;
  rightSlot?: ReactNode;
  children: ReactNode;
  /** mobile-bound width for phone-first screens */
  phoneWidth?: boolean;
  /** wider canvas (for screens like idea-detail with sidebar) */
  wide?: boolean;
}

export function PrototypeLayout({
  title,
  subtitle,
  backTo = '/prototype',
  showBell,
  bellCount,
  rightSlot,
  children,
  phoneWidth = true,
  wide = false,
}: PrototypeLayoutProps) {
  const maxW = wide ? 'max-w-5xl' : phoneWidth ? 'max-w-md' : 'max-w-3xl';

  return (
    <div className="min-h-screen bg-paper">
      {/* Top bar — outside the phone frame so it's clearly "prototype chrome" */}
      <div className="sticky top-0 z-20 bg-paper/90 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-3">
          <Link
            to={backTo}
            className="flex items-center gap-1 text-[13px] text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={15} />
            프로토타입 메뉴
          </Link>
          <Link to="/" className="ml-auto flex items-center gap-2">
            <img src="/logo.svg" alt="Weave" className="w-6 h-6 [&_path]:fill-primary" />
            <span className="font-bold text-primary text-sm tracking-tighter">Weave</span>
          </Link>
        </div>
      </div>

      <main className={`${maxW} mx-auto px-4 py-6 sm:px-6 sm:py-8`}>
        {(title || subtitle || rightSlot) && (
          <header className="mb-5 flex items-start justify-between gap-3">
            <div>
              {title && (
                <h1 className="text-xl font-bold text-primary tracking-tighter">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-[13px] text-muted mt-1">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {showBell && (
                <Link
                  to="/prototype/notifications"
                  className="relative w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-primary hover:bg-surface-alt transition-colors"
                >
                  <Bell size={16} />
                  {bellCount && bellCount > 0 ? (
                    <span className="absolute -top-1 -right-1 bg-danger text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {bellCount}
                    </span>
                  ) : null}
                </Link>
              )}
              {rightSlot}
            </div>
          </header>
        )}
        {children}
      </main>
    </div>
  );
}
