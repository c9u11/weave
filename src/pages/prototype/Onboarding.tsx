import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lightbulb, Hammer, Rocket, GraduationCap, MoreHorizontal,
  Check, Sparkles, Info, Users, MessageCircle, Copy, Clock,
} from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Stepper } from '../../components/ui/Stepper';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import {
  recommendSchedule, toDDay, type ScheduledStage,
  plans, type PlanDef,
  topicPresets, criterionPresets,
} from '../../prototype/data';

const projectTypes = [
  { key: 'ideathon', icon: Lightbulb, name: '아이디어톤·해커톤', desc: '대회·심사 통과 목표' },
  { key: 'side', icon: Hammer, name: '사이드 프로젝트', desc: '가볍게 시작·지속 가능성' },
  { key: 'startup', icon: Rocket, name: '창업·MVP', desc: '시장성·BM 검증' },
  { key: 'school', icon: GraduationCap, name: '학교 과제', desc: '조별 과제·보고서' },
  { key: 'etc', icon: MoreHorizontal, name: '기타', desc: '직접 설정' },
];

const policyOptions = [
  { key: 'hybrid', name: '하이브리드 (권장)', desc: '평가는 익명, 코멘트는 실명' },
  { key: 'anonymous', name: '전체 익명', desc: '솔직한 피드백 우선' },
  { key: 'named', name: '전체 실명', desc: '책임감·추적성 우선' },
];

const defaultDeadline = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
};

const TOTAL_STEPS = 6;
const INVITE_LINK = 'https://weave.app/i/AbCd12';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // STEP1
  const [type, setType] = useState('ideathon');
  // STEP2
  const [projectDeadline, setProjectDeadline] = useState(defaultDeadline());
  const [schedule, setSchedule] = useState<ScheduledStage[]>(() => recommendSchedule(defaultDeadline()));
  const [scheduleDirty, setScheduleDirty] = useState(false);
  // STEP3
  const [topic, setTopic] = useState('멋사 아이디어톤 - 우리 팀');
  const [topicTags, setTopicTags] = useState<string[]>(['AI 협업툴']);
  const [criteria, setCriteria] = useState<string[]>(['feasibility', 'unique', 'pitch']);
  const [criteriaNote, setCriteriaNote] = useState('');
  // STEP4
  const [teamSize, setTeamSize] = useState(4);
  const [policy, setPolicy] = useState('hybrid');
  // STEP5
  const [plan, setPlan] = useState<PlanDef['key']>('plus');
  // STEP6
  const [copied, setCopied] = useState(false);

  // 마감일 변경 시 일정 자동 재계산
  useEffect(() => {
    if (!scheduleDirty) setSchedule(recommendSchedule(projectDeadline));
  }, [projectDeadline, scheduleDirty]);

  // 팀 규모와 플랜 자동 추천: 5인 이상이면 Pro 제안 (사용자가 명시적으로 바꾸기 전까지만)
  const [planManuallySet, setPlanManuallySet] = useState(false);
  useEffect(() => {
    if (planManuallySet) return;
    if (teamSize >= 5) setPlan('pro');
    else if (teamSize >= 3) setPlan('plus');
    else setPlan('free');
  }, [teamSize, planManuallySet]);

  const recommendAgain = () => {
    setSchedule(recommendSchedule(projectDeadline));
    setScheduleDirty(false);
  };
  const updateStageDate = (key: ScheduledStage['key'], newDate: string) => {
    setSchedule((prev) => prev.map((s) => (s.key === key ? { ...s, deadline: newDate } : s)));
    setScheduleDirty(true);
  };
  const toggleTopicTag = (t: string) =>
    setTopicTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const toggleCriterion = (k: string) =>
    setCriteria((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));

  const copyLink = () => {
    navigator.clipboard?.writeText(INVITE_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const next = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }
    // 마지막 step: 팀 홈으로
    sessionStorage.setItem('weave:schedule', JSON.stringify(schedule));
    sessionStorage.setItem('weave:projectDeadline', projectDeadline);
    sessionStorage.setItem('weave:plan', plan);
    navigate('/prototype/team');
  };
  const prev = () => step > 1 && setStep(step - 1);

  const stepLabel = ['유형', '마감', '주제·기준', '팀', '플랜', '완료'][step - 1];
  const nextLabel = step === 5 ? `${plans.find((p) => p.key === plan)?.name} 선택하고 계속 →` :
                    step === TOTAL_STEPS ? '팀 홈으로 →' : '다음';

  return (
    <PrototypeLayout>
      <div className="mb-6">
        <Stepper total={TOTAL_STEPS} current={step} className="mb-2" />
        <p className="text-[12px] text-muted">
          Step {step} / {TOTAL_STEPS} · <span className="text-primary-dark font-semibold">{stepLabel}</span>
        </p>
      </div>

      {/* ============= STEP 1 — 유형 ============= */}
      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">
            어떤 프로젝트인가요?
          </h1>
          <p className="text-[14px] text-muted mt-2 mb-5">
            선택한 유형이 AI 의 역할과 평가 기준의 베이스로 들어가요.
          </p>
          <div className="space-y-2">
            {projectTypes.map(({ key, icon: Icon, name, desc }) => {
              const active = type === key;
              return (
                <button
                  key={key}
                  onClick={() => setType(key)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all ${
                    active
                      ? 'border-primary bg-surface shadow-sm'
                      : 'border-border bg-surface hover:border-primary/30'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-md flex items-center justify-center ${
                      active ? 'bg-primary text-paper' : 'bg-accent-soft text-primary'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-bold text-primary-dark">{name}</div>
                    <div className="text-[12px] text-muted">{desc}</div>
                  </div>
                  {active && <Check size={18} className="text-primary" />}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* ============= STEP 2 — 마감 ============= */}
      {step === 2 && (
        <>
          <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">
            언제까지인가요?
          </h1>
          <p className="text-[14px] text-muted mt-2 mb-5">
            전체 마감일만 정하면, AI 가 단계별 추천 일정을 자동으로 짜드려요.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-bold text-muted">
                프로젝트 마감일 (1차 예선 제출 등)
              </label>
              <input
                className="input mt-1.5"
                type="date"
                value={projectDeadline}
                onChange={(e) => setProjectDeadline(e.target.value)}
              />
              <p className="text-[11px] text-muted mt-1.5">
                오늘부터 <strong className="text-primary">{toDDay(projectDeadline).replace('D-', '')}</strong>일 — {toDDay(projectDeadline)}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[12px] font-bold text-muted flex items-center gap-1.5">
                  <Sparkles size={12} className="text-primary" />
                  단계별 추천 일정
                </label>
                {scheduleDirty && (
                  <button
                    onClick={recommendAgain}
                    className="text-[11px] text-primary font-bold hover:underline"
                  >
                    다시 추천받기
                  </button>
                )}
              </div>

              <div className="bg-accent-soft border border-primary-light/40 rounded-md p-2.5 mb-3 flex items-start gap-2">
                <Info size={12} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-primary-dark leading-relaxed">
                  프로젝트 마감일 기준 비율 분배 — 각 단계 마감일은 자유롭게 수정 가능
                </p>
              </div>

              <div className="space-y-2">
                {schedule.map((s, idx) => (
                  <div
                    key={s.key}
                    className={`flex items-center gap-3 p-3 rounded-md border ${
                      s.editable ? 'bg-surface border-border' : 'bg-surface-alt border-border'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full text-[12px] font-bold flex items-center justify-center flex-shrink-0 ${
                        s.editable ? 'bg-accent-soft text-primary' : 'bg-border text-muted'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-primary-dark">{s.label}</div>
                      <div className="text-[11px] text-muted">{s.desc}</div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      {s.editable ? (
                        <input
                          type="date"
                          value={s.deadline}
                          onChange={(e) => updateStageDate(s.key, e.target.value)}
                          className="text-[12px] text-primary-dark bg-transparent border border-border rounded-md px-2 py-1 focus:outline-none focus:border-primary"
                        />
                      ) : (
                        <div className="text-[11px] text-muted px-2 py-1">
                          프로젝트 마감일 (1일)
                        </div>
                      )}
                      <Badge variant={s.editable ? 'soft' : 'default'} className="!text-[10px]">
                        {toDDay(s.deadline!)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ============= STEP 3 — 주제 · 심사기준 ============= */}
      {step === 3 && (
        <>
          <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">
            무엇을 만드나요?
          </h1>
          <p className="text-[14px] text-muted mt-2 mb-5">
            주제와 심사기준을 알려주면 AI 가 그 맥락 위에서 아이디어를 평가해요.
          </p>

          <div className="space-y-5">
            <div>
              <label className="text-[12px] font-bold text-muted">주제·키워드</label>
              <input
                className="input mt-1.5"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="예: 멋사 아이디어톤 - AI 협업툴"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {topicPresets.map((t) => {
                  const active = topicTags.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleTopicTag(t)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                        active
                          ? 'bg-primary text-paper border-primary'
                          : 'bg-surface text-muted border-border hover:border-primary/40'
                      }`}
                    >
                      {active && '✓ '}{t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-[12px] font-bold text-muted block mb-1.5">
                심사기준 <span className="text-muted/70">(복수 선택)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {criterionPresets.map(({ key, label }) => {
                  const active = criteria.includes(key);
                  return (
                    <button
                      key={key}
                      onClick={() => toggleCriterion(key)}
                      className={`flex items-center gap-2 p-2.5 rounded-md border text-left text-[12px] font-semibold transition-colors ${
                        active
                          ? 'border-primary bg-accent-soft text-primary-dark'
                          : 'border-border bg-surface text-muted hover:border-primary/30'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                          active ? 'border-primary bg-primary' : 'border-border'
                        }`}
                      >
                        {active && <Check size={10} className="text-paper" strokeWidth={3} />}
                      </span>
                      {label}
                    </button>
                  );
                })}
              </div>
              <textarea
                rows={2}
                className="input mt-3 !text-[13px]"
                placeholder="추가 기준이나 가중치가 있다면 자유롭게 (선택)"
                value={criteriaNote}
                onChange={(e) => setCriteriaNote(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {/* ============= STEP 4 — 팀 ============= */}
      {step === 4 && (
        <>
          <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">팀 설정</h1>
          <p className="text-[14px] text-muted mt-2 mb-5">
            팀원 규모와 피드백 정책을 정해주세요.
          </p>
          <div className="space-y-5">
            <div>
              <label className="text-[12px] font-bold text-muted flex items-center gap-1.5">
                <Users size={12} /> 팀 규모
              </label>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  className="input !w-24 text-center"
                  type="number"
                  min={2}
                  max={10}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Math.max(2, Math.min(10, Number(e.target.value) || 2)))}
                />
                <span className="text-[13px] text-muted">명</span>
                <span className="text-[11px] text-muted ml-auto">
                  {teamSize <= 2 && 'Free 로 시작하기 좋아요'}
                  {teamSize >= 3 && teamSize <= 4 && '4인 기준 — Plus 추천'}
                  {teamSize >= 5 && '5인 이상 — Pro 추천'}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[12px] font-bold text-muted block mb-1.5">
                피드백 공개 정책 <span className="text-primary">(팀 단위 결정)</span>
              </label>
              <div className="space-y-2">
                {policyOptions.map(({ key, name, desc }) => {
                  const active = policy === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setPolicy(key)}
                      className={`w-full flex items-start gap-3 p-3 rounded-md border text-left transition-all ${
                        active ? 'border-primary bg-surface' : 'border-border bg-surface'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                          active ? 'border-primary bg-primary' : 'border-border'
                        }`}
                      >
                        {active && (
                          <Check size={10} className="text-paper m-auto" strokeWidth={3} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] font-bold text-primary-dark">{name}</div>
                        <div className="text-[12px] text-muted">{desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ============= STEP 5 — 플랜 ============= */}
      {step === 5 && (
        <>
          <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">
            플랜을 골라주세요
          </h1>
          <p className="text-[14px] text-muted mt-2 mb-5">
            팀 규모 <strong className="text-primary-dark">{teamSize}인</strong> 기준 추천 플랜을 미리 선택해뒀어요.
            프로젝트 단위 1회 결제 · 구독 X.
          </p>

          <div className="space-y-3">
            {plans.map((p) => {
              const active = plan === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => { setPlan(p.key); setPlanManuallySet(true); }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    active
                      ? 'border-primary bg-surface shadow-sm'
                      : 'border-border bg-surface hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[16px] font-bold text-primary-dark">{p.name}</span>
                        {p.recommended && <Badge variant="accent">RECOMMENDED</Badge>}
                        {p.teamSize && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted bg-surface-alt border border-border rounded-full px-2 py-0.5">
                            <Users size={10} />
                            {p.teamSize}
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        <span className="text-[20px] font-bold text-primary">{p.price}</span>
                        <span className="text-[12px] text-muted ml-1">{p.sub}</span>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-1 ${
                        active ? 'border-primary bg-primary' : 'border-border'
                      }`}
                    >
                      {active && <Check size={12} className="text-paper" strokeWidth={3} />}
                    </div>
                  </div>
                  <ul className="space-y-1.5 mt-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[12px] text-primary-dark/85">
                        <Check size={12} className="text-primary mt-1 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* ============= STEP 6 — 완료 · 초대 ============= */}
      {step === 6 && (
        <>
          <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">
            거의 다 됐어요
          </h1>
          <p className="text-[14px] text-muted mt-2 mb-5">
            팀원에게 초대 링크를 보내고 시작하세요. 최대 {Math.max(teamSize, 4)}명까지.
          </p>

          <div className="bg-surface border border-border rounded-lg p-4 mb-5">
            <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">
              우리 팀 요약
            </div>
            <dl className="space-y-1.5 text-[13px]">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">유형</dt>
                <dd className="text-primary-dark font-semibold">
                  {projectTypes.find((t) => t.key === type)?.name}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">마감</dt>
                <dd className="text-primary-dark font-semibold">
                  {projectDeadline} <span className="text-primary">({toDDay(projectDeadline)})</span>
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">주제</dt>
                <dd className="text-primary-dark font-semibold text-right">
                  {topic}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">팀 규모</dt>
                <dd className="text-primary-dark font-semibold">{teamSize}명</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">플랜</dt>
                <dd className="text-primary font-bold">
                  {plans.find((p) => p.key === plan)?.name}
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-muted">초대 링크</label>
            <div className="flex items-center gap-2 bg-surface-alt border border-border rounded-md px-3 py-2.5">
              <input
                readOnly
                value={INVITE_LINK}
                className="flex-1 bg-transparent text-[13px] text-primary-dark font-mono outline-none"
              />
            </div>
            <Button
              variant="outline"
              fullWidth
              leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
              onClick={copyLink}
            >
              {copied ? '복사됨!' : '링크 복사'}
            </Button>
            <Button variant="kakao" fullWidth leftIcon={<MessageCircle size={16} />}>
              카카오톡으로 초대
            </Button>
          </div>

          <div className="mt-6">
            <h2 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">
              초대된 팀원 (1/{teamSize})
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-md">
                <Avatar initial="병" color="#F87171" size="sm" />
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-primary-dark">병찬 (나)</div>
                  <div className="text-[11px] text-muted">호스트</div>
                </div>
              </div>
              {Array.from({ length: Math.max(0, teamSize - 1) }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-surface border border-dashed border-border rounded-md text-muted"
                >
                  <Clock size={20} className="text-muted/50" />
                  <span className="text-[13px]">대기 중...</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ============= 하단 네비 ============= */}
      <div className="mt-8 flex items-center gap-3">
        {step > 1 && (
          <Button variant="ghost" onClick={prev}>
            이전
          </Button>
        )}
        <Button
          variant="primary"
          fullWidth={step === 1}
          onClick={next}
          className={step > 1 ? 'flex-1' : ''}
        >
          {nextLabel}
        </Button>
      </div>
    </PrototypeLayout>
  );
}
