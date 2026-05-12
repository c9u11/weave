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
import { StageBackLink } from '../../prototype/StageBackLink';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const md = `# AI 팀 프로젝트 매니저

## 문제
팀 프로젝트의 병목은 초기 기획 단계다. 일정이 안 맞아 회의가 어렵고,
아이디어는 카톡·메모장·구글 문서에 흩어진다. 기획안을 정해도 산출물·역할·일정이
불분명해 팀장 한두 명이 모든 부담을 떠안는다.

## 핵심 기능
비동기 아이디어 작성·댓글·투표 → AI 아이디어 분석(공감성·실현성·차별성·리스크)
→ 기준별 투표로 기획안 선정 → 산출물·역할·일정 구조 자동 생성 → 진행 알림
→ Claude MCP 연동 PPT 초안 생성.

## 타깃
대학생 조별과제 팀, 공모전·아이디어톤·해커톤 팀, 창업동아리, 신입사원 교육 팀.

## 차별점
카톡(대화 속 유실)·Notion(직접 구조화)·Trello(아이디어 평가·구조화 불가)와 달리,
흩어진 아이디어를 "제출 가능한 결과물"로 바꿔주는 AI 팀 프로젝트 매니저.

## MVP
아이디어 수렴 → AI 분석 → 투표 → 산출물 구조화까지 (PPT 자동 생성은 2차).
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
      <StageBackLink />
      <p className="text-[11px] text-muted mb-1 uppercase tracking-wider font-bold">
        5단계 — 최종 기획안
      </p>
      <h1 className="text-2xl font-bold tracking-tighter text-primary">기획안 완성</h1>
      <p className="text-[14px] text-muted mt-2 mb-5">
        익숙한 도구로 그대로 떠나보내세요. Weave는 여기서 빠집니다.
      </p>

      {/* Preview */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden mb-5">
        <div className="h-44 overflow-hidden bg-surface-alt">
          <img
            src="/ideas/i8.jpg"
            alt="AI 팀 프로젝트 매니저"
            className="w-full h-full object-cover object-top"
          />
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
