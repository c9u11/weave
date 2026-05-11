import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { screenList } from '../../prototype/data';
import Layout from '../../components/Layout';

export default function Launcher() {
  return (
    <Layout title="프로토타입 — 화면 데모">
      <p className="text-[14px] text-muted mb-6">
        13개 화면을 클릭해서 사용자 흐름을 확인할 수 있어요. 별표(★) 화면은 차별성 핵심 — 영상 시연용.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {screenList.map((s) => (
          <Link
            key={s.path}
            to={s.path}
            className="group flex items-start gap-3 p-4 rounded-lg border border-border bg-surface hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <span className="text-[10px] font-bold tracking-wider text-accent bg-accent-soft/40 px-2 py-1 rounded-sm flex-shrink-0">
              {s.num}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-[14px] font-bold text-primary tracking-tight">
                  {s.name}
                </h3>
                {s.star && <Star size={12} className="text-accent fill-accent-soft" />}
              </div>
              <p className="text-[12px] text-muted mt-0.5 leading-relaxed">
                {s.desc}
              </p>
            </div>
            <ArrowRight
              size={16}
              className="text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all"
            />
          </Link>
        ))}
      </div>
    </Layout>
  );
}
