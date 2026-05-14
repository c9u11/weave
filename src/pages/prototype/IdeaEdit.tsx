import { useState, type FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, Lock, Wand2, Check } from 'lucide-react';
import { PrototypeLayout } from '../../prototype/PrototypeLayout';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { ideas, currentUser, getCurrentPlan, isPaidPlan, type Idea } from '../../prototype/data';

const organizeKeys = [
  { key: 'problem' as const, label: '문제 정의' },
  { key: 'feature' as const, label: '핵심 기능' },
  { key: 'target' as const, label: '타깃' },
  { key: 'differentiator' as const, label: '차별점' },
  { key: 'risk' as const, label: '리스크' },
];

export default function IdeaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idea = ideas.find((i) => i.id === id);
  const plan = getCurrentPlan();
  const paid = isPaidPlan(plan);

  const [rawText, setRawText] = useState(idea?.rawText ?? '');
  const [organized, setOrganized] = useState<Idea['organized']>(
    idea?.organized ?? { problem: '', feature: '', target: '', differentiator: '', risk: '' }
  );
  const [aiState, setAiState] = useState<'idle' | 'running' | 'done'>('idle');
  const [saved, setSaved] = useState(false);

  if (!idea) {
    return (
      <PrototypeLayout title="아이디어를 찾을 수 없어요">
        <Link to="/prototype/ideas" className="text-primary">← 모아보기로</Link>
      </PrototypeLayout>
    );
  }

  const isMine = idea.authorId === currentUser.id;

  const runAIReorganize = () => {
    setAiState('running');
    setTimeout(() => {
      // 모의 — 실제로는 LLM 호출. 여기서는 rawText 첫 줄을 problem 으로, 두 번째 줄을 feature 로 흉내.
      setOrganized((o) => ({
        ...o,
        problem: o.problem + (o.problem ? ' ' : '') + '(AI 보강)',
        feature: o.feature + (o.feature ? ' ' : '') + '(AI 보강)',
      }));
      setAiState('done');
      setTimeout(() => setAiState('idle'), 1800);
    }, 1200);
  };

  const save = (e: FormEvent) => {
    e.preventDefault();
    // 프로토타입 — 실제 저장 없음. 토스트만 띄우고 detail 로.
    setSaved(true);
    setTimeout(() => navigate(`/prototype/idea/${idea.id}`), 900);
  };

  return (
    <PrototypeLayout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] text-muted mb-4 flex-wrap">
        <Link to={`/prototype/idea/${idea.id}`} className="flex items-center gap-1 hover:text-primary">
          <ArrowLeft size={14} /> 상세로
        </Link>
        <span>·</span>
        <Avatar initial={idea.authorName[0]} color={idea.authorColor} size="sm" className="!w-5 !h-5 !text-[10px]" />
        <span className="text-primary-dark font-semibold">{idea.authorName}</span>
        {!isMine && <Badge variant="soft" className="!text-[10px]">읽기 + 수정 제안</Badge>}
      </div>

      <h1 className="text-2xl font-bold tracking-tighter text-primary-dark">
        아이디어 수정
      </h1>
      <p className="text-[13px] text-muted mt-1 mb-5">
        {paid ? (
          <>AI 가 정리한 항목까지 자유롭게 다듬을 수 있어요.</>
        ) : (
          <>원문 텍스트만 수정 가능 — AI 재정리는 <strong className="text-primary">Plus</strong>부터 사용 가능해요.</>
        )}
      </p>

      <form onSubmit={save} className="space-y-5">
        {/* 원문 */}
        <div>
          <label className="text-[12px] font-bold text-muted">원문</label>
          <textarea
            rows={6}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            className="input mt-1.5 leading-relaxed"
            placeholder="두서 없어도 괜찮아요. 떠오르는 대로 적어주세요."
          />
        </div>

        {/* AI 재정리 */}
        <div
          className={`rounded-md border p-3 flex items-start gap-3 ${
            paid ? 'bg-accent-soft border-primary-light/40' : 'bg-surface-alt border-border'
          }`}
        >
          {paid ? (
            <Sparkles size={16} className="text-primary mt-0.5 flex-shrink-0" />
          ) : (
            <Lock size={16} className="text-muted mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <div className="text-[13px] font-bold text-primary-dark flex items-center gap-2 flex-wrap">
              AI 재정리
              {!paid && <Badge variant="soft" className="!text-[10px]">Plus</Badge>}
            </div>
            <p className="text-[11.5px] text-muted leading-relaxed mt-0.5">
              원문을 다시 분석해 문제 정의·핵심 기능·차별점을 재구성해요.
            </p>
          </div>
          <Button
            type="button"
            variant={paid ? 'primary' : 'outline'}
            size="sm"
            disabled={!paid || aiState === 'running'}
            leftIcon={
              aiState === 'running' ? <Wand2 size={13} className="animate-pulse" /> :
              aiState === 'done' ? <Check size={13} /> :
              <Wand2 size={13} />
            }
            onClick={runAIReorganize}
          >
            {aiState === 'running' ? '정리 중...' : aiState === 'done' ? '완료!' : '재정리'}
          </Button>
        </div>

        {/* 정리 항목 */}
        <div className={`space-y-3 ${paid ? '' : 'opacity-60 pointer-events-none'}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold text-muted uppercase tracking-wider">
              AI 정리
            </h3>
            {!paid && (
              <span className="text-[10px] text-muted flex items-center gap-1">
                <Lock size={10} /> Plus 부터 수정 가능
              </span>
            )}
          </div>
          {organizeKeys.map(({ key, label }) => (
            <div key={key}>
              <label className="text-[12px] font-bold text-primary-dark">{label}</label>
              <textarea
                rows={2}
                value={organized[key]}
                onChange={(e) => setOrganized((o) => ({ ...o, [key]: e.target.value }))}
                className="input mt-1 !text-[13px]"
              />
            </div>
          ))}
        </div>

        {/* 액션 */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/prototype/idea/${idea.id}`)}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-[2]"
            leftIcon={saved ? <Check size={14} /> : <Save size={14} />}
            disabled={saved}
          >
            {saved ? '저장됨!' : '저장'}
          </Button>
        </div>
      </form>
    </PrototypeLayout>
  );
}
