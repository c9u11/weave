import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { screenList } from '../../prototype/data';
import Layout from '../../components/Layout';

/**
 * 프로토타입 dev 메뉴 — 모든 화면을 한 곳에서 진입.
 * 시연 흐름 외에 개별 화면 점검·영상 시연용 인덱스.
 */
export default function Launcher() {
  return (
    <Layout title="프로토타입 — 화면 데모">
      <p className="text-sm text-muted mb-6">
        {screenList.length}개 화면을 클릭해 사용자 흐름을 확인할 수 있어요.{' '}
        <Star size={12} className="inline -mt-0.5 text-primary fill-primary" />
        표시된 화면은 핵심 시연용.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {screenList.map((s) => (
          <Link
            key={s.path}
            to={s.path}
            className="group flex items-start gap-3 p-4 rounded-2xl border border-border bg-white hover:border-primary/40 transition-colors"
          >
            <span className="text-[10px] font-bold tracking-wider text-primary bg-accent-soft px-2 py-1 rounded-md flex-shrink-0">
              {s.num}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold tracking-tight text-slate-900">
                  {s.name}
                </h3>
                {s.star && (
                  <Star size={12} className="text-primary fill-primary" />
                )}
              </div>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                {s.desc}
              </p>
            </div>
            <ArrowRight
              size={16}
              className="text-muted group-hover:text-primary-dark group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
            />
          </Link>
        ))}
      </div>
    </Layout>
  );
}
