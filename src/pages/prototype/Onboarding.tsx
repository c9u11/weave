import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, Users, Check, Minus, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { SelectRow } from '../../components/ui/SelectRow';

/**
 * 온보딩 1단계 — 프로젝트 세부 설정 (Figma "수정_온보딩 단계_01-1").
 * 항목별 입력 화면을 순차로 보여주고, 마지막에 요약 카드 노출.
 *
 * Step:
 *   1) 프로젝트 명
 *   2) 유형
 *   3) 마감 일자
 *   4) 주제
 *   5) 심사기준
 *   6) 팀원 수
 *   7) 피드백 공개 정책
 *   8) 요약 (확인 후 다음 → /prototype/plan)
 */

type Policy = 'named' | 'anon' | 'hybrid';

interface State {
  projectName: string;
  type: string;
  deadline: string;
  topic: string;
  criteria: string;
  teamSize: number;
  policy: Policy;
}

const DEFAULTS: State = {
  projectName: '멋사 해커톤 프로젝트',
  type: '아이디어 · 해커톤',
  deadline: '2026. 05. 18 (월)  15:00',
  topic: 'AI로 세상을 없앤다면',
  criteria: '문제 정의 20%, 차별성 20%, 시장 반응도 20%, 실현 가능성 15%, 비즈니스 임팩트 15%, 전달력 10%',
  teamSize: 6,
  policy: 'named',
};

const TYPE_OPTIONS = [
  '아이디어 · 해커톤',
  '사이드 프로젝트',
  '창업 · MVP',
  '학교 과제',
  '기타',
];

const POLICY_OPTIONS: { key: Policy; name: string; desc: string }[] = [
  { key: 'hybrid', name: '하이브리드 (권장)', desc: '평가는 익명, 코멘트는 실명' },
  { key: 'anon', name: '전체 익명', desc: '솔직한 피드백 우선' },
  { key: 'named', name: '전체 실명', desc: '책임감·추적성 우선' },
];

const TOTAL_STEPS = 8;

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<State>(DEFAULTS);

  const back = () => {
    if (step <= 1) navigate('/prototype/landing');
    else setStep(step - 1);
  };
  const next = () => {
    if (step >= TOTAL_STEPS) navigate('/prototype/plan');
    else setStep(step + 1);
  };

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <main className="flex-1 max-w-[440px] w-full mx-auto px-5 pt-3 pb-32">
        <button
          onClick={back}
          className="-ml-2 p-2 text-slate-900 hover:text-primary transition-colors"
          aria-label="뒤로"
        >
          <ArrowLeft size={24} />
        </button>

        <ProgressBar value={step / TOTAL_STEPS} className="mt-4" />

        {step === 1 && (
          <StepWrap title="프로젝트 명" hint="어떤 프로젝트인가요? 한 줄로 적어주세요.">
            <TextInput
              value={state.projectName}
              onChange={(v) => set('projectName', v)}
              placeholder="예: 멋사 해커톤 프로젝트"
            />
          </StepWrap>
        )}

        {step === 2 && (
          <StepWrap title="유형" hint="프로젝트 성격에 맞는 유형을 골라주세요.">
            <RadioCards
              options={TYPE_OPTIONS.map((t) => ({ key: t, label: t }))}
              value={state.type}
              onChange={(v) => set('type', v)}
            />
          </StepWrap>
        )}

        {step === 3 && (
          <StepWrap title="마감 일자" hint="언제까지 끝나야 하나요?">
            <TextInput
              value={state.deadline}
              onChange={(v) => set('deadline', v)}
              placeholder="예: 2026. 05. 18 (월)  15:00"
            />
          </StepWrap>
        )}

        {step === 4 && (
          <StepWrap title="주제" hint="어떤 주제를 다루나요?">
            <TextInput
              value={state.topic}
              onChange={(v) => set('topic', v)}
              placeholder="예: AI로 세상을 없앤다면"
            />
          </StepWrap>
        )}

        {step === 5 && (
          <StepWrap
            title="심사기준"
            hint="평가 비중을 조정하거나 그대로 사용해도 좋아요."
          >
            <textarea
              value={state.criteria}
              onChange={(e) => set('criteria', e.target.value)}
              rows={4}
              className="w-full p-4 rounded-2xl border border-border bg-white text-sm text-slate-900 leading-relaxed focus:outline-none focus:border-primary transition-colors"
            />
          </StepWrap>
        )}

        {step === 6 && (
          <StepWrap title="팀원 수" hint="몇 명이 함께 작업하나요?">
            <NumberStepper
              value={state.teamSize}
              min={1}
              max={20}
              onChange={(v) => set('teamSize', v)}
            />
          </StepWrap>
        )}

        {step === 7 && (
          <StepWrap
            title="피드백 공개 정책"
            hint="팀원 의견을 어떻게 공개할까요?"
          >
            <RadioCards
              options={POLICY_OPTIONS.map((p) => ({
                key: p.key,
                label: p.name,
                sub: p.desc,
              }))}
              value={state.policy}
              onChange={(v) => set('policy', v as Policy)}
            />
          </StepWrap>
        )}

        {step === 8 && <SummaryStep state={state} />}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-paper">
        <div className="max-w-[440px] mx-auto px-5 pb-6 pt-3">
          <Button variant="primary" fullWidth size="lg" onClick={next}>
            {step === TOTAL_STEPS ? '다음' : '계속'}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============ Step shell ============ */
function StepWrap({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <>
      <h1 className="mt-8 text-[22px] font-bold tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted">{hint}</p>
      <div className="mt-6">{children}</div>
    </>
  );
}

/* ============ Inputs ============ */
function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-14 px-4 rounded-2xl border border-border bg-white text-base text-slate-900 placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
    />
  );
}

interface Option {
  key: string;
  label: string;
  sub?: string;
}
function RadioCards({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-colors ${
              active
                ? 'border-primary bg-accent-soft'
                : 'border-border bg-white hover:border-primary/40'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
                active ? 'border-primary bg-primary' : 'border-border'
              }`}
            >
              {active && <Check size={12} className="text-white" strokeWidth={3} />}
            </div>
            <div className="flex-1">
              <div className="text-base font-semibold text-slate-900">{opt.label}</div>
              {opt.sub && (
                <div className="text-sm text-muted mt-0.5">{opt.sub}</div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function NumberStepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-14 h-14 rounded-full bg-white border border-border text-slate-900 hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
        aria-label="감소"
      >
        <Minus size={20} />
      </button>
      <div className="text-center min-w-[80px]">
        <div className="text-5xl font-bold tracking-tight text-slate-900">{value}</div>
        <div className="text-sm text-muted mt-1">명</div>
      </div>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-14 h-14 rounded-full bg-white border border-border text-slate-900 hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
        aria-label="증가"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}

/* ============ Summary (step 8) ============ */
function SummaryStep({ state }: { state: State }) {
  const policyLabel =
    POLICY_OPTIONS.find((p) => p.key === state.policy)?.name ?? '전체 실명';

  return (
    <>
      <h1 className="mt-8 text-[22px] font-bold tracking-tight text-slate-900">
        프로젝트 세부 설정
      </h1>
      <p className="mt-2 text-sm text-muted">
        설정한 내용을 확인하고 다음으로 진행하세요
      </p>

      <GroupCard
        icon={<Folder size={20} fill="currentColor" />}
        title="프로젝트"
        className="mt-6"
      >
        <SelectRow label="프로젝트 명" value={state.projectName} readOnly />
        <SelectRow label="유형" value={state.type} readOnly />
        <SelectRow label="마감 일자" value={state.deadline} readOnly />
        <SelectRow label="주제" value={state.topic} readOnly />
        <SelectRow label="심사기준" value={state.criteria} readOnly />
      </GroupCard>

      <GroupCard icon={<Users size={20} />} title="팀 설정" className="mt-5">
        <SelectRow label="팀원 수" value={`${state.teamSize}명`} readOnly />
        <SelectRow label="피드백 공개 정책" value={policyLabel} readOnly />
      </GroupCard>
    </>
  );
}

function GroupCard({
  icon,
  title,
  className = '',
  children,
}: {
  icon: ReactNode;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`bg-white border border-border rounded-2xl px-5 ${className}`}
    >
      <header className="flex items-center gap-3 pt-5 pb-2">
        <span className="text-primary">{icon}</span>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
      </header>
      <div className="divide-y divide-border">{children}</div>
    </section>
  );
}
