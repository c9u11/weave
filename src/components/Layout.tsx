import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LayoutProps {
  title?: string;
  children: import('react').ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const isHome = useLocation().pathname === '/';

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-10 bg-paper/90 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          {!isHome && (
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              메뉴
            </Link>
          )}
          <Link to="/" className="flex items-center gap-2 ml-auto">
            <img
              src="/logo.svg"
              alt="Weave"
              className="w-7 h-7 [&_path]:fill-primary"
            />
            <span className="font-bold text-primary tracking-tighter text-lg">
              Weave
            </span>
          </Link>
        </div>
        {title && (
          <div className="max-w-5xl mx-auto px-6 pb-4">
            <h1 className="text-2xl font-bold text-primary tracking-tighter">
              {title}
            </h1>
          </div>
        )}
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
