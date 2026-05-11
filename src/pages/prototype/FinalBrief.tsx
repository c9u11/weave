import { useNavigate } from 'react-router-dom';
import {
  Copy,
  FileText,
  MessageCircle,
  FileImage,
  Hash,
  Notebook,
  Sparkles,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const md = `# 친구 메뉴 투표 앱

## 문제
친구들과 배달 메뉴 합의 과정이 번거롭다. 카톡으로 의견 모으면 흩어지고,
누가 어디 좋아하는지 추적 어려움.

## 핵심 기능
실시간 그룹 메뉴 투표 + AI 추천 (입맛 학습).

## 타깃
20대 친구 그룹 배달 주문자 (대학생·신입사회인).

## 차별점
입맛 학습 알고리즘 + 카톡 외 매끄러운 합의 UX.

## MVP
그룹 내 메뉴 5개 중 투표 1개 기능 (1차).
`;

export default function FinalBrief() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PrototypeLayout>
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        5단계 — 최종 기획안
      </p>
      <h1 className="text-2xl font-bold tracking-tighter text-primary">기획안 완성</h1>
      <p className="text-[14px] text-muted mt-2 mb-5">
        익숙한 도구로 그대로 떠나보내세요. Weave는 여기서 빠집니다.
      </p>

      {/* Preview */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden mb-5">
        <div
          className="h-32 flex items-center justify-center text-6xl"
          style={{ background: 'linear-gradient(135deg, #FCD34D55, #FB923C55)' }}
        >
          🍔
        </div>
        <div className="p-4 max-h-72 overflow-y-auto">
          <pre className="text-[12px] font-mono text-primary whitespace-pre-wrap leading-relaxed">
            {md}
          </pre>
        </div>
      </div>

      {/* Export options */}
      <h2 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3">
        Export
      </h2>
      <div className="grid grid-cols-2 gap-2 mb-5">
        <Button
          variant="outline"
          leftIcon={copied ? <Check size={14} /> : <Copy size={14} />}
          onClick={copy}
        >
          {copied ? '복사됨!' : '클립보드'}
        </Button>
        <Button variant="outline" leftIcon={<FileImage size={14} />}>
          PDF
        </Button>
        <Button variant="outline" leftIcon={<Notebook size={14} />}>
          Notion <Badge variant="soft" className="ml-1">Plus</Badge>
        </Button>
        <Button variant="outline" leftIcon={<Hash size={14} />}>
          Slack <Badge variant="soft" className="ml-1">Plus</Badge>
        </Button>
      </div>

      <Button
        variant="kakao"
        fullWidth
        size="lg"
        leftIcon={<MessageCircle size={16} />}
      >
        카톡으로 공유 + 좋아요 부탁
      </Button>

      <div className="bg-accent-soft/30 border border-accent-soft/60 rounded-md p-3 mt-4 flex items-start gap-2">
        <Sparkles size={14} className="text-accent flex-shrink-0 mt-0.5" />
        <div className="text-[12px] text-primary leading-relaxed">
          <strong>외부 친구 좋아요</strong>는 심사 점수 20%에 직결돼요. 카톡으로 공유한 링크로 멋사 커뮤니티에서 좋아요를 받으세요.
        </div>
      </div>

      <Button
        variant="ghost"
        fullWidth
        leftIcon={<FileText size={14} />}
        className="mt-5"
        onClick={() => navigate('/prototype')}
      >
        프로토타입 메뉴로
      </Button>
    </PrototypeLayout>
  );
}
