interface StepperProps {
  total: number;
  current: number; // 1-indexed
  className?: string;
}

export function Stepper({ total, current, className = '' }: StepperProps) {
  return (
    <div className={`flex gap-1.5 ${className}`}>
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;
        const state = step < current ? 'done' : step === current ? 'active' : 'pending';
        return (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-colors ${
              state === 'done' ? 'bg-accent' : state === 'active' ? 'bg-primary' : 'bg-border'
            }`}
          />
        );
      })}
    </div>
  );
}
