import Layout from '../components/Layout';
import { Rocket, Hammer } from 'lucide-react';

export default function Prototype() {
  return (
    <Layout title="프로토타입">
      <div className="card flex flex-col items-center text-center py-16">
        <div className="w-16 h-16 rounded-lg bg-accent-soft/40 flex items-center justify-center text-accent mb-5">
          <Rocket size={28} />
        </div>
        <h2 className="text-xl font-bold text-primary tracking-tight">
          MVP 프로토타입 — 개발 중
        </h2>
        <p className="text-[14px] text-muted mt-2 max-w-md leading-relaxed">
          13개 화면을 React + Tailwind로 구현 중입니다. 문서 정리가 끝나는 대로 인터랙티브 데모가 여기에 올라옵니다.
        </p>
        <div className="flex items-center gap-2 text-[12px] text-accent mt-6 font-semibold">
          <Hammer size={14} />
          P0 (1차 마감 전): 카카오 로그인 · F1 · F2 · F4 · 카톡 공유
        </div>
      </div>
    </Layout>
  );
}
