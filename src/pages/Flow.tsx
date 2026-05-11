import Layout from '../components/Layout';
import { ExternalLink } from 'lucide-react';

export default function Flow() {
  return (
    <Layout title="전체 흐름 (와이어프레임)">
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <p className="text-[14px] text-muted">
          13개 화면 · 모바일 우선 · 사용자 여정 다이어그램 포함
        </p>
        <a
          href="/wireframe.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[13px] text-accent font-semibold hover:underline"
        >
          새 창에서 열기 <ExternalLink size={14} />
        </a>
      </div>
      <div className="rounded-lg border border-border overflow-hidden bg-surface">
        <iframe
          src="/wireframe.html"
          title="Weave Wireframe"
          className="w-full"
          style={{ height: 'calc(100vh - 220px)', minHeight: '600px' }}
        />
      </div>
    </Layout>
  );
}
