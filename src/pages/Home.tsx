import { Link } from 'react-router-dom';
import {
  FileText,
  Lightbulb,
  Palette,
  GitBranch,
  Rocket,
  ArrowRight,
} from 'lucide-react';

const menu = [
  {
    to: '/brief',
    icon: FileText,
    title: '아이디어톤 설명',
    desc: '멋사대학 아이디어톤 대회 요강·일정·심사 기준',
  },
  {
    to: '/plan',
    icon: Lightbulb,
    title: '우리 아이디어 기획안',
    desc: 'Weave 서비스 PRD — 컨셉·기능·BM·일정',
  },
  {
    to: '/design',
    icon: Palette,
    title: '디자인 컨셉 및 로고',
    desc: 'Thread 팔레트·타이포·컴포넌트 토큰',
  },
  {
    to: '/flow',
    icon: GitBranch,
    title: '전체 흐름 (와이어프레임)',
    desc: '13개 화면 사용자 여정 + 모바일 우선 와이어프레임',
  },
  {
    to: '/prototype',
    icon: Rocket,
    title: '프로토타입',
    desc: 'MVP 인터랙티브 데모 (개발 중)',
    soon: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <header className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <img
          src="/logo.svg"
          alt="Weave"
          className="w-16 h-16 mx-auto mb-6 [&_path]:fill-primary"
        />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-primary leading-tight">
          AI로 시작에 헤매는
          <br />
          시간을 없앤다면?
        </h1>
        <p className="mt-4 text-[15px] text-muted">
          멋사대학 아이디어톤 출품작 — Weave 기획·디자인·프로토타입 한곳에서
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {menu.map(({ to, icon: Icon, title, desc, soon }) => (
            <Link
              key={to}
              to={to}
              className="group card hover:border-primary/30 transition-all flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-md bg-accent-soft/40 flex items-center justify-center text-accent">
                  <Icon size={20} strokeWidth={2} />
                </div>
                {soon && (
                  <span className="text-[10px] font-bold tracking-wide uppercase text-accent bg-accent-soft/40 px-2 py-1 rounded-sm">
                    Soon
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-base font-bold text-primary tracking-tight">
                  {title}
                </h2>
                <p className="text-[13px] text-muted leading-relaxed mt-1">
                  {desc}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-accent font-semibold mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                열기
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted/70 tracking-wide">
          2026 멋사대학 아이디어톤 · 1차 마감 2026-05-18 15:00
        </p>
      </section>
    </main>
  );
}
