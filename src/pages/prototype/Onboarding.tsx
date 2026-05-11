import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Hammer, Rocket, GraduationCap, MoreHorizontal, Check, Sparkles, Info } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Stepper } from '../../components/ui/Stepper';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { recommendSchedule, toDDay, type ScheduledStage } from '../../prototype/data';

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

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('ideathon');
  const [policy, setPolicy] = useState('hybrid');
  const [projectDeadline, setProjectDeadline] = useState(defaultDeadline());
  const [schedule, setSchedule] = useState<ScheduledStage[]>(() => recommendSchedule(defaultDeadline()));
  const [scheduleDirty, setScheduleDirty] = useState(false);
  const navigate = useNavigate();

  // 마감일 변경 시 일정 자동 재계산 (사용자가 수동 수정 안 한 경우)
  useEffect(() => {
    if (!scheduleDirty) {
      setSchedule(recommendSchedule(projectDeadline));
    }
  }, [projectDeadline, scheduleDirty]);

  const recommendAgain = () => {
    setSchedule(recommendSchedule(projectDeadline));
    setScheduleDirty(false);
  };

  const updateStageDate = (key: ScheduledStage['key'], newDate: string) => {
    setSchedule((prev) => prev.map((s) => (s.key === key ? { ...s, deadline: newDate } : s)));
    setScheduleDirty(true);
  };

  const next = () => {
    if (step < 3) setStep(step + 1);
    else {
      sessionStorage.setItem('weave:schedule', JSON.stringify(schedule));
      sessionStorage.setItem('weave:projectDeadline', projectDeadline);
      navigate('/prototype/plan');
    }
  };
  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <PrototypeLayout>
      <div className="mb-6">
        <Stepper total={3} current={step} className="mb-2" />
        <p className="text-[12px] text-muted">Step {step} / 3 · 팀장 온보딩</p>
      </div>

      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold tracking-tighter text-primary">
            어떤 프로젝트인가요?
          </h1>
          <p className="text-[14px] text-muted mt-2 mb-5">
            선택한 유형에 따라 AI 페르소나·평가 기준이 자동 조정돼요.
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
                      active ? 'bg-primary text-paper' : 'bg-accent-soft/40 text-accent'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-bold text-primary">{name}</div>
                    <div className="text-[12px] text-muted">{desc}</div>
                  </div>
                  {active && <Check size={18} className="text-primary" />}
                </button>
              );
            })}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="text-2xl font-bold tracking-tighter text-primary">
            프로젝트 정보·일정
          </h1>
          <p className="text-[14px] text-muted mt-2 mb-5">
            전체 마감일을 정하면 각 단계의 추천 일정이 자동 계산돼요.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-bold text-muted">주제·키워드</label>
              <input className="input mt-1.5" defaultValue="멋사 아이디어톤 - 우리 팀" />
            </div>

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

            {/* ============= 단계별 일정 추천 ============= */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[12px] font-bold text-muted flex items-center gap-1.5">
                  <Sparkles size={12} className="text-accent" />
                  단계별 추천 일정
                </label>
                {scheduleDirty && (
                  <button
                    onClick={recommendAgain}
                    className="text-[11px] text-accent font-bold hover:underline"
                  >
                    다시 추천받기
                  </button>
                )}
              </div>

              <div className="bg-accent-soft/20 border border-accent-soft/40 rounded-md p-2.5 mb-3 flex items-start gap-2">
                <Info size={12} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-primary leading-relaxed">
                  프로젝트 마감일 기준 비율 분배 — 각 단계 마감일은 자유롭게 수정 가능
                </p>
              </div>

              <div className="space-y-2">
                {schedule.map((s, idx) => (
                  <div
                    key={s.key}
                    className="flex items-center gap-3 p-3 bg-surface border border-border rounded-md"
                  >
                    <div className="w-7 h-7 rounded-full bg-accent-soft/40 text-accent text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-primary">{s.label}</div>
                      <div className="text-[11px] text-muted">{s.desc}</div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <input
                        type="date"
                        value={s.deadline}
                        onChange={(e) => updateStageDate(s.key, e.target.value)}
                        className="text-[12px] text-primary bg-transparent border border-border rounded-md px-2 py-1 focus:outline-none focus:border-primary"
                      />
                      <Badge variant="soft" className="!text-[10px]">
                        {toDDay(s.deadline!)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[12px] font-bold text-muted">심사 기준 (선택)</label>
              <textarea
                rows={3}
                className="input mt-1.5"
                defaultValue="문제 정의 20% · 차별성 20% · 시장 반응도 20% · 실현 가능성 15% · 비즈니스 임팩트 15% · 전달력 10%"
              />
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="text-2xl font-bold tracking-tighter text-primary">팀 설정</h1>
          <p className="text-[14px] text-muted mt-2 mb-5">팀원 규모와 피드백 정책을 정해주세요.</p>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-bold text-muted">팀 규모</label>
              <input className="input mt-1.5" type="number" min={2} max={6} defaultValue={4} />
            </div>
            <div>
              <label className="text-[12px] font-bold text-muted block mb-1.5">
                피드백 공개 정책 <span className="text-accent">(팀 단위 결정)</span>
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
                        <div className="text-[13px] font-bold text-primary">{name}</div>
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
          {step === 3 ? '플랜 선택 →' : '다음'}
        </Button>
      </div>
    </PrototypeLayout>
  );
}
