import { Sparkles } from 'lucide-react';

function App() {
  return (
    <main className="min-h-screen bg-paper flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <img
          src="/logo.svg"
          alt="Weave"
          className="w-20 h-20 mx-auto mb-8 [&_path]:fill-primary"
        />

        <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tighter text-primary">
          AI로 시작에 헤매는
          <br />
          시간을 없앤다면?
        </h1>

        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          두서없는 아이디어를 팀 합의된 1페이지 기획안으로.
          <br />
          0→1만 책임지고, 그 다음은 익숙한 도구로.
        </p>

        <div className="mt-10 space-y-3">
          <button className="btn btn-kakao w-full">
            <Sparkles size={18} />
            카카오로 시작하기
          </button>
          <button className="btn btn-outline w-full">
            팀에서 초대받았어요
          </button>
        </div>

        <p className="mt-12 text-xs text-muted/70 tracking-wide">
          입력 → AI 정리 → 익숙한 도구로 Export
        </p>
      </div>
    </main>
  );
}

export default App;
