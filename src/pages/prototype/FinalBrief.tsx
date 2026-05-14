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
  Presentation,
  ThumbsUp,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { useState } from 'react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { StageBackLink } from '../../prototype/StageBackLink';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { isPaidPlan } from '../../prototype/data';

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

const pros = [
  {
    title: '문제 공감성 강함',
    body: '"팀플 초반 기획이 제일 막힌다"는 보편 경험을 정확히 짚어 팀원·심사위원 모두 즉시 공감.',
  },
  {
    title: '데모가 곧 사용 사례',
    body: '아이디어톤 발표를 우리 팀이 이 도구로 진행하는 메타 구조 — 설명보다 보여줄 수 있음.',
  },
  {
    title: '명확한 차별점',
    body: 'Notion·Trello·ChatGPT 가 한 단계만 하는 데 비해 "평가→구조화→산출물" 의 전 흐름을 묶음.',
  },
];

const cautions = [
  {
    title: '범위 과욕 주의',
    body: 'PPT 자동 생성·Notion 연동까지 한 번에 보이면 데모 안정성 위험 — 핵심 4단계로 좁혀 시연.',
  },
  {
    title: 'AI 산출물 품질의 변동성',
    body: '시연 중 AI 응답이 어색하면 차별점이 약해짐 — 백업 출력본을 준비.',
  },
  {
    title: '경쟁툴과의 비교 한 문장',
    body: '"Notion 이랑 뭐가 달라요?" 가 무조건 나옴. 한 문장으로 못 박을 답변 준비.',
  },
];

export default function FinalBrief() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const paid = isPaidPlan();

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
      <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">기획안 완성</h1>
      <p className="text-[14px] text-muted mt-2 mb-5">
        AI 가 좋은점·주의점까지 정리했어요. 익숙한 도구로 그대로 떠나보내세요.
      </p>

      {/* ===== 기획안 미리보기 ===== */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden mb-5">
        <div className="h-44 overflow-hidden bg-surface-alt">
          <img
            src="/ideas/i8.jpg"
            alt="AI 팀 프로젝트 매니저"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="p-4 max-h-72 overflow-y-auto">
          <pre className="text-[12px] font-mono text-primary-dark whitespace-pre-wrap leading-relaxed">
            {md}
          </pre>
        </div>
      </div>

      {/* ===== AI 요약: 좋은점 · 주의점 ===== */}
      <h2 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <Sparkles size={12} className="text-primary" />
        AI 요약
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* 좋은점 */}
        <div className="bg-success/10 border-l-4 border-success rounded-r-md p-3.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <ThumbsUp size={14} className="text-success" />
            <span className="text-[12px] font-bold text-success uppercase tracking-wider">
              좋은점 ({pros.length})
            </span>
          </div>
          <ul className="space-y-2.5">
            {pros.map((p) => (
              <li key={p.title}>
                <div className="text-[12.5px] font-bold text-primary-dark">{p.title}</div>
                <div className="text-[11.5px] text-primary-dark/85 leading-relaxed mt-0.5">
                  {p.body}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 주의점 */}
        <div className="bg-warning/10 border-l-4 border-warning rounded-r-md p-3.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <AlertTriangle size={14} className="text-warning" />
            <span className="text-[12px] font-bold text-warning uppercase tracking-wider">
              주의점 ({cautions.length})
            </span>
          </div>
          <ul className="space-y-2.5">
            {cautions.map((c) => (
              <li key={c.title}>
                <div className="text-[12.5px] font-bold text-primary-dark">{c.title}</div>
                <div className="text-[11.5px] text-primary-dark/85 leading-relaxed mt-0.5">
                  {c.body}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== Export ===== */}
      <h2 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3">
        Export
      </h2>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Button
          variant="outline"
          leftIcon={copied ? <Check size={14} /> : <Copy size={14} />}
          onClick={copy}
        >
          {copied ? '복사됨!' : '텍스트'}
        </Button>
        <Button variant="outline" leftIcon={<FileImage size={14} />}>
          PDF
        </Button>
        <Button
          variant="outline"
          leftIcon={paid ? <Presentation size={14} /> : <Lock size={14} />}
          disabled={!paid}
        >
          <span className="flex items-center gap-1">
            PPT 초안
            {!paid && <Badge variant="soft" className="!text-[9px]">Plus</Badge>}
          </span>
        </Button>
        <Button
          variant="outline"
          leftIcon={paid ? <Notebook size={14} /> : <Lock size={14} />}
          disabled={!paid}
        >
          <span className="flex items-center gap-1">
            Notion
            {!paid && <Badge variant="soft" className="!text-[9px]">Plus</Badge>}
          </span>
        </Button>
        <Button
          variant="outline"
          leftIcon={paid ? <Hash size={14} /> : <Lock size={14} />}
          disabled={!paid}
        >
          <span className="flex items-center gap-1">
            Slack
            {!paid && <Badge variant="soft" className="!text-[9px]">Plus</Badge>}
          </span>
        </Button>
        <Button variant="outline" leftIcon={<FileText size={14} />}>
          기획안 (.md)
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

      <div className="bg-accent-soft border border-primary-light/40 rounded-md p-3 mt-4 flex items-start gap-2">
        <Sparkles size={14} className="text-primary flex-shrink-0 mt-0.5" />
        <div className="text-[12px] text-primary-dark leading-relaxed">
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
