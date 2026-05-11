interface AvatarProps {
  initial: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-7 h-7 text-[11px]',
  md: 'w-9 h-9 text-[14px]',
  lg: 'w-12 h-12 text-[18px]',
};

export function Avatar({ initial, color, size = 'md', className = '' }: AvatarProps) {
  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${sizes[size]} ${className}`}
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  );
}
