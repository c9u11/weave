/**
 * Weave 브랜드 마크 (윙·웨이브 형태).
 * 색상은 currentColor 상속 — 부모에서 text-* 로 제어.
 * 원본: `assets/logo.svg`
 *
 * `animated` 가 true 면 좌→우로 path 가 그려지는 reveal 애니메이션 재생.
 * 두꺼운 horizontal stroke 를 mask 로 사용해, dashoffset 이 풀리며 채워진 wing 이 드러남.
 */
export function WeaveMark({
  className = '',
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const maskId = 'weave-reveal-mask';
  return (
    <svg
      viewBox="0 0 93 60"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Weave"
    >
      {animated && (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="93" height="60">
            <rect x="0" y="0" width="93" height="60" fill="black" />
            <path
              className="weave-draw"
              d="M 0 30 L 93 30"
              stroke="white"
              strokeWidth="80"
              strokeLinecap="round"
              fill="none"
              pathLength="1"
            />
          </mask>
        </defs>
      )}
      <path
        d="M20.6689 0C29.9221 2.59775e-05 38.1894 4.29643 43.6504 11.0361C48.1198 8.66168 53.3424 7.29691 58.9229 7.29688C69.6101 7.29688 78.9871 12.2993 84.2695 19.8213C84.9333 17.6145 85.288 15.2949 85.2881 12.9014C85.2881 10.9789 85.0587 9.10389 84.625 7.29688C89.8098 12.0895 93.0001 18.61 93 25.7949C92.9999 31.3645 91.3826 36.9885 88.6621 41.502C84.2701 48.7882 76.1917 57.9036 65.208 60C70.842 55.1536 74.3467 48.3519 74.3467 40.8203C74.3467 26.5319 61.7348 14.8707 45.8955 14.2041C48.7758 18.8694 50.4434 24.389 50.4434 30.3057C50.4433 44.8575 40.3662 57.011 26.9277 59.9375C32.5408 54.4257 36.0332 46.6914 36.0332 38.126C36.0331 21.3887 22.7027 7.82031 6.25879 7.82031C4.11173 7.82032 2.01815 8.05368 0 8.49316C5.35507 3.23501 12.6406 0 20.6689 0Z"
        {...(animated ? { mask: `url(#${maskId})` } : {})}
      />
    </svg>
  );
}
